# Chequea un dir por la llegada de archivos y si estos se terminaron de copiar los mueve a la carperta tmp
#  anteponiendo el nombre de la carpeta origen y los descomprime.
# Parametros de entrada: 
# 	1) nombre del cliente
# 	2) tiempo de espera para validar la finalizacion de la tx de archivos

typeset cliente=libros
typeset tiempoEspera=2

. /recursos/scripts/Parametros.sh 
. /recursos/clientes/$cliente/scripts/Parametros_$cliente.sh 

# Busca archivos Comprimidos
for i in `ls -tr $dirIn/*.$extGzip 2>/dev/null`
do
    	nombreBase=`basename $i`
    	if [ -f $dirIn/$nombreBase ]
           then $dirProgsGlobal/ChequearFinTx.exe $dirIn/$nombreBase $tiempoEspera
                if [ $? -eq 0 ]
	           then #termino de transmitirse 
		        nombreMinusculas=`$dirScriptsGlobal/ConvAMinusculas.sh $cliente $nombreBase`
			nombreMinusculasSinExt=${nombreMinusculas%%.$extGzip}
		        mv $dirIn/$nombreBase $dirDatos/$nombreMinusculas
			gzip -d $dirDatos/$nombreMinusculas
			chmod 770 $dirDatos/$nombreMinusculasSinExt
			mv $dirDatos/$nombreMinusculasSinExt $dirDatos/$nombreMinusculasSinExt.$extOk 
                fi
        fi
done

# Busca archivos pdf sin comprimir
for i in `ls -tr $dirIn/*.$extpdf 2>/dev/null`
do
    	nombreBase=`basename $i`
    	if [ -f $dirIn/$nombreBase ]
           then $dirProgsGlobal/ChequearFinTx.exe $dirIn/$nombreBase $tiempoEspera
                if [ $? -eq 0 ]
	           then #termino de transmitirse 
		        nombreMinusculas=`$dirScriptsGlobal/ConvAMinusculas.sh $cliente $nombreBase`
		        mv $dirIn/$nombreBase $dirDatos/$nombreMinusculas
			chmod 770 $dirDatos/$nombreMinusculas
			mv $dirDatos/$nombreMinusculas $dirDatos/$nombreMinusculas.$extOk 
                fi
        fi
done

# Busca archivos PDF sin comprimir
for i in `ls -tr $dirIn/*.$extPdf 2>/dev/null`
do
        nombreBase=`basename $i`
        if [ -f $dirIn/$nombreBase ]
           then $dirProgsGlobal/ChequearFinTx.exe $dirIn/$nombreBase $tiempoEspera
                if [ $? -eq 0 ]
                   then #termino de transmitirse
                        nombreMinusculas=`$dirScriptsGlobal/ConvAMinusculas.sh $cliente $nombreBase`
                        mv $dirIn/$nombreBase $dirDatos/$nombreMinusculas
                        chmod 770 $dirDatos/$nombreMinusculas
                        mv $dirDatos/$nombreMinusculas $dirDatos/$nombreMinusculas.$extOk
                fi
        fi
done

