# contador de HOJAS para PDF

archivo=$1
typeset cliente=libros

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh

typeset -r salidaTMP=$dirDatos/contarHojas.$$.tmp

let pag=0
let hojas=0
let doc=0
let imagenes=0
#pag=$(strings < $archivo | sed -n 's|.*/Count -\{0,1\}\([0-9]\{1,\}\).*|\1|p' | sort -rn | head -n 1)
#changing the sheet counter
pag=$(strings < $archivo | grep "/Count" | sed -n 's|.*/Count -\{0,1\}\([0-9]\{1,\}\).*|\1|p' | sort -rn | head -n 1)
if [ -z "$pag" ]
then
	pag=1
fi

imagenes=`echo $pag`
hojas=$pag
echo $imagenes,$hojas,$doc
rm -f $salidaTMP
