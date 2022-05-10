#!/bin/bash

#VARIABLES MODIFICABLES
cliente=edesur
extension=pdf

#VARIABLES FIJAS
dirTmp=/clientes/tmp/$cliente
dirDatosIn=/clientes/in/$cliente
dirDatosOut=/clientes/out/$cliente
dirProcesados=/clientes/procesados
dirSalida=/clientes/in/$cliente
fecha=`date +%Y%m%d`

if [[ ! -e $dirDatosIn ]]; 
	then
    mkdir -p $dirDatosIn
    mkdir -p $dirDatosOut
    mkdir -p $dirTmp
fi

# Verifico que no existan mas de un archivo procesandose.
if [ `ls $dirDatosOut/*.pdf 2>/dev/null |wc -l` -ge 1 ]
  then
  exit
fi

#Tomando solo la primer linea
primerArchivo=`ls $dirDatosIn/ | head -1`
	sucursal=`echo $primerArchivo | cut -b 0-4`
	archivoSalida=$dirDatosOut/Edesur-sucursal-$sucursal-$fecha.pdf
	pdftk $dirDatosIn/$sucursal*.PDF output $archivoSalida
  for i in `ls -tr $dirDatosIn/$sucursal*.PDF 2>/dev/null`
    do
      nombreBase=`basename $i`
      if [ -f $dirDatosIn/$nombreBase ]
      then
        mv $dirDatosIn/$nombreBase  $dirProcesados/$nombreBase.PROCESADO
      fi
    done
    scp -o StrictHostKeyChecking=no $archivoSalida puma:$dirSalida
    ssh puma -o StrictHostKeyChecking=no -f chown cronuser:site $dirSalida/*.pdf
    ssh puma -o StrictHostKeyChecking=no -f chmod 774 $dirSalida/*.pdf

rm $dirDatosOut/*.pdf
