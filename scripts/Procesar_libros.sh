# parametros de entrada:
#      	1 ) lista de codigos de archivos seleccionados para generar
#	2 ) cod usuario que invoco la generacion

# Pasos que realiza este script
# PASO 1 ) setea el estado de estos archivos como GENERANDO
# PASO 2 ) para cada archivo :
#	    a ) resuelve el nombre del archivo
#           b ) generar las particiones/clasificaciones de archivo original
#           c ) para cada particion generada:
#			  i ) corre el script generador AFP
#			 ii ) cuenta la cantidad de hojas generadas
#			iii ) cuenta la cantidad de imagenes generadas
#			 iv ) cuenta la cantidad de documentos generados


nombreScript=$0

listaCodArchivos=$1
codUsuario=$2

typeset cliente=libros

. /recursos/scripts/Parametros.sh $cliente
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh

typeset -r dirImpresionRemoto=/clientes/$nombreServidorIPM/$cliente
typeset -r queryOut=$dirTmp/generar.$$.queryOut.tmp

function ContarImagenesHojasDocumentos
{
typeset contador

contador=`$progContarHojas $dirImpresion/$archivoAFP`

imagenes=`echo $contador | cut -d, -f1`
hojas=`echo $contador | cut -d, -f2`
documentos=`echo $contador | cut -d, -f3`
}

 
# Actualizo el estado de los archivos a generaNdo
$dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$Generando "idArchivoOriginal in ($listaCodArchivos)"
if [ $? -ne 0 ]
   then fechaActual=`date +"%d/%m/%Y %H:%M"`
        echo "$fechaActual-$nombreScript:Error al actualizar los archivos a generaNdo $listaCodArchivos" >> $logErrores
	return 1
fi
# Obtengo la lista de archivos (codArchivoOriginal,Nombre y producto)
$dirQuerysGlobal/ListaArchivos.sh $cliente $listaCodArchivos $queryOut 
if [ $? -ne 0 ]
   then $dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$GeneradoMAL "idArchivoOriginal in ($listaCodArchivos)" 
        fechaActual=`date +"%d/%m/%Y %H:%M"`
        echo "$fechaActual-$nombreScript:Error al recurperar informacion de los archivos $listaCodArchivos" >> $logErrores
        rm -f $queryOut
        return 1
fi

# PreProceso del archivo de entrada
for archivo in `cat $queryOut`
    do

    idArchivo=`echo $archivo| cut -f1 -d","`
    nombreArchivo=`echo $archivo| cut -f2 -d","`
    idProducto=`echo $archivo| cut -f3 -d","`

    # Actualizo el estado del archivo actual
    $dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$PreProcesando idArchivoOriginal=$idArchivo 
    if [ $? -ne 0 ]
       then fechaActual=`date +"%d/%m/%Y %H:%M"`
            echo "$fechaActual-$nombreScript:Error al actualizar los archivos a preprocesando $nombreArchivo" >> $logErrores
	    return 1
    fi

    nombreArchivoSinExt=${nombreArchivo%%.$extRecibido}
    
    $progPreProcesar $nombreArchivo $nombreArchivoSinExt $extPreProcesado  
    if [ $? -ne 0 ]
       then #hubo un error al preprocesar los archivos
            $dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$PreProMAL idArchivoOriginal=$idArchivo  
            mv $dirDatos/$nombreArchivo $dirDatos/$nombreArchivo.$extError 
            fechaActual=`date +"%d/%m/%Y %H:%M"`
            echo "$fechaActual-$nombreScript:Error al preprocesar el archivo $nombreArchivo" >> $logErrores
       else
            $dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$PreProOK idArchivoOriginal=$idArchivo 
            #Una vez preprocesado el archivo se GENERAN los archivos obtenidos
 	    error=0
            cd $dirDatos
            for archivoPrePro in `ls $nombreArchivoSinExt*.$extPreProcesado`
                do
                nombreTmp=${archivoPrePro%%.$extPreProcesado}
                archivoAFP=$nombreTmp.$extPdf
                archivoLOG=$nombreTmp.$extLog

		$progGenerarAfp $dirDatos/$archivoPrePro $dirImpresion/$archivoAFP $dirLogs/$archivoLOG $idProducto
                if [ $? -eq 0 ]
                   then # se genero OK
                        # doy de alta el archivo en la tabla de generados
                        ContarImagenesHojasDocumentos $dirImpresion/$archivoAFP
                        $dirQuerysGlobal/AltaGenerado.sh $cliente $dirImpresion/$archivoAFP $duplex NO NO $idArchivo $idProducto $GeneradoOK $codUsuario $imagenes $hojas $documentos
    			if [ $? -ne 0 ]
       			   then #hubo un error al dar de alta el archivo en la tabla Generados
            			fechaActual=`date +"%d/%m/%Y %H:%M"`
            			echo "$fechaActual-$nombreScript:Error al dar de alta el archivo $archivoAFP en la tabla Generados" >> $logErrores
			        mv $dirDatos/$archivoPrePro $dirDatos/$nombreTmp.$extError  			
				error=1
 			   else rm -f $dirDatos/$archivoPrePro
			fi
                   else error=1
			mv $dirDatos/$archivoPrePro $dirDatos/$nombreTmp.$extError  			
                fi
                if [ $error -eq 0 ]
                   then rm -f $dirDatos/$nombreArchivo
                        cp $dirImpresion/$archivoAFP $dirImpresionRemoto/$archivoAFP
                        #cp $dirImpresion/$archivoAFP $dirImpresionCOYOTE/$cliente/$archivoAFP
                        if [ $? -eq 0 ]
                           then # se copio OK al servidor con IPM
                                rm -f $dirImpresion/$archivoAFP
                                estado=$GeneradoOK
                           else # error al intentar copiar el archivo AFP al servidor con IPM
                                mv $dirImpresion/$archivoAFP $dirImpresion/$archivoAFP.extError
                                estado=$CopiadoMAL
                        fi
                   else mv $dirDatos/$nombreArchivo $dirDatos/$nombreArchivo.$extError
                        fechaActual=`date +"%d/%m/%Y %H:%M"`
                        echo "$fechaActual-$nombreScript-Error al generar el AFP del archivo $nombreArchivo" >> $logErrores
                        estado=$GeneradoMAL
                fi
                done
            $dirQuerysGlobal/ActualizarCampo.sh $cliente archivosRecibidos idEstado=$estado idArchivoOriginal=$idArchivo

    fi
    done

rm -f $queryOut
