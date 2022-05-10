# Encola en el Infoprint los archivos seleccionados
# parametros de entrada:
#      	1 ) directorio cliente.
#	2 ) nombre de la impresora logica.
#	3 ) rango desde de imagenes a encolar.
#	4 ) rango hasta de imagenes a encolar.
#	5 ) id de usuario que encolo los archivos.
#      	6 ) lista de codigos de archivos seleccionados para encolar.
#      	7 ) nombreDelProcuto

cliente=$1
impresora=$2
rangoDesde=$3
rangoHasta=$4
codUsuario=$5
listaCodArchivos=$6
nomProd=$7

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh

typeset -r queryTmp=$dirTmp/encolar.$$.queryTmp.tmp

# Obtengo la lista de archivos (Nombre y producto)
$dirQuerysGlobal/ListaArchivosEncolar.sh $cliente $listaCodArchivos $queryTmp

mesAnio=`date +"%m%Y"`

for archivo in `cat $queryTmp`
do
	idArchivo=`echo $archivo| cut -f1 -d","`
	nombreArchivo=`echo $archivo| cut -f2 -d","`
	imagenesFinal=`echo $archivo| cut -f4 -d","`

	if [ $rangoDesde = INICIO ]
	then
		rangoDesdePdpr=`echo 1`
	else
		rangoDesdePdpr=$rangoDesde
	fi

	if [ $rangoHasta = FIN ]
	then
		rangoHastaPdpr=`echo $imagenesFinal`
	else
		rangoHastaPdpr=$rangoHasta
	fi

	echo "lp -d $impresora -o page-ranges=$rangoDesdePdpr-$rangoHastaPdpr $dirImpresionCOYOTE/$cliente/$nombreArchivo" >> $dirLogsGlobal/comandoLPR.$mesAnio.txt
	lp -d $impresora -o page-ranges=$rangoDesdePdpr-$rangoHastaPdpr $dirImpresionCOYOTE/$cliente/$nombreArchivo
	if [ $? != 0 ]
	then  echo "Error al encolar el archivo generado"
		# Actualizo el estado del archivo a  EncoladoMAL
		$dirQuerysGlobal/ActualizarCampo.sh $cliente archivosGenerados idEstado=$EncoladoMAL idArchivoGenerado=$idArchivo
	else # doy de alta el archivo en la tabla de impresos
		$dirQuerysGlobal/AltaImpreso.sh $cliente $impresora $idArchivo $Impreso $rangoDesdeAlta $rangoHastaAlta $codUsuario
		if [ $? != 0 ]
		then
			echo "Error al intentar dar de alta el archivo encolado"
		fi
	fi
done

rm -f $queryTmp

