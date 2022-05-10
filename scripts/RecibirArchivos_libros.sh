# Da de alta los archivos del cliente que se encuentran en el dir tmp con extension OK.
# La determinacion del producto se hace con el siguiente criterio: (no es case sensitive)
# 		extension conrec -> archivos afp con recursos embebidos
# 		extension sinrec -> archivos afp sin recursos embebidos
# 		otra extension   -> archivos planos que generan un afp con acif

# parametros de entrada:
# 	NINGUNO

typeset cliente=libros

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh


typeset -r listaTmp=$dirDatos/lista.$$.tmp
typeset -r listaIdsArchivos=$dirDatos/listaIdsArchivos.$$.tmp

rm -f $listaTmp

cd $dirDatos
for archivo in `ls *.$extOk 2>/dev/null`
do
	nombreSinExt=${archivo%%.$extOk}
    	mv $archivo $nombreSinExt.$extPreRecibido
   	echo $nombreSinExt >> $listaTmp	
done

cd $dirDatos
for archivo in `cat $listaTmp 2>/dev/null`
do

    mv $archivo.$extPreRecibido $archivo.$extRecibido
    
# **************************************************************************
# INICIO DE PARAMETROS ESPECIALES - Determinacion del producto
# **************************************************************************
    tipoArchivo=`echo $archivo.$extRecibido | cut -f1 -d'.'`
    case $tipoArchivo in
        riverside*) prod=$prodRiverside;;
        edhasa*)prod=$prodEdhasa;;
        la_brujita_de_papel*)prod=$prodBruja;;
        del_zorzal*)prod=$prodZorzal;;
        alsina*)prod=$prodAlsina;;
        gaitan*)prod=$prodGaitan;;
        mariscal*)prod=$prodMariscal;;
        dyp*)prod=$prodDyp;;
        unversidad_nacional_de_la_plata*)prod=$prodUnPlata;;
        unversidad_general_sarmiento*)prod=$prodUnSarmiento;;
        lea*)prod=$prodLea;;
        edicol*)prod=$prodEdicol;;
        ministro_de_educacion*)prod=$prodMinistroNacion;;
        music_brocker*)prod=$prodMusicBrocker;;
        cadam*)prod=$prodCadam;;
        zemborain*)prod=$prodZemborain;;
        cetrogar*)prod=$prodCetrogar;;
        caja_negra*)prod=$prodCajaNegra;;
        cuenco_del_plata*)prod=$prodCuencoPlata;;
        ateneo*)prod=$prodAteneo;;
        veronese*)prod=$prodVeronese;;
        agl*)prod=$prodAgl;;
        atdl*)prod=$prodAtdl;;
        rivera_consulta_medica*)prod=$prodRiveraMedica;;
        peniel*)prod=$prodPeniel;;
        diaz_de_santo*)prod=$prodDiazSanto;;
        puerto_creativo*)prod=$prodPuertoCreativo;;
        cepa*)prod=$prodCepa;;
        alpha_text*)prod=$prodAlphatex;;
        macromarca*)prod=$prodMacromarca;;
        agea*)prod=$prodAgea;;
        osa*)prod=$prodOsa;;
        mutual_dagostino*)prod=$prodMutualDagostino;;
        espacio_editorial*)prod=$prodEspacioEditorial;;
        riverside_edhasa*)prod=$prodRiverEdhasa;;
        alfaomega*)prod=$prodAlfaomega;;
        letra_impresa*)prod=$prodLetra_Impresa;;
        bonum*)prod=$prodBonum
        *)prod=$productolibro;;



        esac



# **************************************************************************
# FIN DE PARAMETROS ESPECIALES
# **************************************************************************

    idArchivo=`$dirQuerysGlobal/IdAltaRecibido.sh $cliente $dirDatos/$archivo.$extRecibido $prod $RecibidoOKAuto`
    if [ $? -ne 0 ]
    then
		fechaActual=`date +"%d/%m/%Y %H:%M"` 
            	echo "$fechaActual-$0:Error al intentar dar de alta el archivo $archivo" >> $logErrores
            	mv $archivo.$extRecibido $archivo.$extError
    fi

    $dirScripts/Procesar_$cliente.sh $idArchivo 0 

done

rm -f $listaTmp


