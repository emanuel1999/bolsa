# parametros
# 	1 ) entrada
# 	2 ) salida
# 	3 ) archivo de logs
# 	4 ) id del producto


typeset cliente=libros

typeset -r entrada=$1
typeset -r salida=$2
typeset -r log=$3
typeset -r prod=$4

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh

#extension=${entrada##*.}

#if [ $extension = "AFP" ]
#then
	# Convertir el archivo a PDF
	#$dirScripts/afp2pdf/afp2pdf -o $salida $entrada
	
#else
	mv $entrada $salida
	error=0
#fi

return $error
