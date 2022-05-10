#!/bin/bash

#VARIABLES MODIFICABLES
cliente=edesur

#VARIABLES FIJAS
dirTmp=/clientes/tmp/$cliente
dirDatosIn=/clientes/in/$cliente
dirDatosOut=/clientes/out/$cliente
dirProcesados=/clientes/procesados
dirServidorOut=/clientes/in/$cliente
dirServidorIn=/clientes/in/$cliente

if [[ ! -e $dirDatosIn ]];
    then
    mkdir -p $dirDatosIn
    mkdir -p $dirDatosOut
    mkdir -p $dirTmp
fi

for arch in `ssh puma -o StrictHostKeyChecking=no -f ls $dirServidorIn/`*.pdf
do
        archivo=`basename $arch`
		#copia el archivo de puma hacia el docker
        scp -o StrictHostKeyChecking=no puma:$dirServidorIn/$archivo $dirTmp
		#md5sum id, es un checkzoom, corrobora que el archivo este bien si esta con el mismo ID ya esta. sino error 
        localmd5=`md5sum $dirTmp/$archivo`
        sleep 5
        remotemd5=`ssh puma -o StrictHostKeyChecking=no -f csum -h MD5 $dirServidorIn/$archivo`
        localmd5cutted=`echo $localmd5 | cut -d" " -f1`
        remotemd5cutted=`echo $remotemd5 | cut -d" " -f1`
        if [ "$localmd5cutted" != "$remotemd5cutted" ]
            then
                    rm $dirTmp/$archivo
			else 
                    nombreModificado=`echo $dirTmp/$archivo | cut -d'_' -f 12`
			        mv $dirTmp/$archivo $dirDatosIn/$nombreModificado 
			        chmod -R 774 $dirDatosIn
        fi
		ssh puma -o StrictHostKeyChecking=no -f rm $dirDatosIn/$archivo
done
