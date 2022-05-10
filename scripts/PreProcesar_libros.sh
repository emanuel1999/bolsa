# Recibe un archivo y le corre los programas y scripts necesarios para dejarlo apto para genenerar el AFP
# paramentros
#	1 ) entrada 
#	2 ) nombre base del archivo de salida 
# 	3 ) extension salida

entrada=$1
baseSalida=$2
extSalida=$3

typeset cliente=libros

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh

cp $dirDatos/$entrada $dirDatos/$baseSalida.$extSalida 
