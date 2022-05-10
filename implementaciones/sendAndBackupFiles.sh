#!/bin/bash
. /mnt/c/clientes/repos/scriptsRicoh/implementaciones/parametros.sh

CLIENTE=$2
SERVIDOR=$1

# -----------------------------------------------
# MAIN START

clear
echo -e $YELLOW$BOLD"\t \t \t \t \t Envío y backups de archivos a servidores AIX" $NORM$NORMAL
echo -e $YELLOW$BOLD"\t \t \t \t \t --------------------------------------------" $NORM$NORMAL
echo ""

# -----------------------------------------------
# GLOBAL VARS START

BASEPATHAIX=/servidoresAIX/$SERVIDOR/recursos/clientes
BASEPATHESPEJO=/servidoresEspejo/$SERVIDOR/recursos/clientes
BASEPATHESPEJOBKP=$BASEPATHESPEJO/zzTmpBackup
BASEPATHESPEJOLOGS=$BASEPATHESPEJO/$CLIENTE/logsDeEnvio
BASEPATHAIXFISICO=/recursos/clientes/$CLIENTE
BASEPATHESPEJOLOCAL=$DIRESPEJO/$SERVIDOR
BASEPATHESPEJOLOCALLOGS=$BASEPATHESPEJOLOCAL/$CLIENTE/logsDeEnvio

FECHA=$(date +%Y%m%d)

# GLOBAL VARS END
# -----------------------------------------------

read -p "$(echo -e $CYAN"Si querés agregá el motivo del cambio para guardar en el nombre del backup: " $NORMAL)" CAMBIO

if ssh manganga "test -d $BASEPATHESPEJOBKP/$CLIENTE"; then
    echo ""
    echo "Ya existe el directorio zzTmpBackup/$CLIENTE"
    echo ""
else
    echo ""
    echo "Creando directorio backup de $CLIENTE"
    echo ""
    ssh manganga "mkdir -p $BASEPATHESPEJOBKP/$CLIENTE"
fi

if ssh manganga "test -d $BASEPATHESPEJOLOGS"; then
    echo "------------------------------------------------------------"
    echo -e $GREEN"Ya existe el directorio $CLIENTE/logsDeEnvio" $NORMAL
    echo "------------------------------------------------------------"
else
    echo "------------------------------------------------------------"
    echo -e $GREEN"Creando directorio logsDeEnvio de $CLIENTE" $NORMAL
    echo "------------------------------------------------------------"
    ssh manganga "mkdir -p $BASEPATHESPEJOLOGS"
fi

# Se crea backup del cliente en el Espejo en caso de que no exista uno con fecha de hoy.
if ssh manganga "test -e $BASEPATHESPEJOBKP/$CLIENTE/$CLIENTE-BKP-$FECHA-$CAMBIO.tar.gz"; then
    echo "------------------------------------------------------------"
    echo -e $GREEN"Ya existe un backup con fecha de hoy del cliente: $CLIENTE" $NORMAL
    echo "------------------------------------------------------------"
    echo ""
else 
    echo "---------------------------------"
    echo -e $GREEN"Realizando backup de $CLIENTE" $NORMAL
    echo "---------------------------------"
    ssh manganga tar -czf $BASEPATHESPEJOBKP/$CLIENTE/$CLIENTE-BKP-$FECHA-$CAMBIO.tar.gz -C $BASEPATHAIX $CLIENTE
    echo ""
fi

# Se envía la nueva estructura de archivos (nuevos, modificados, borrados) al directorio del cliente en el servidor AIX correspondiente.
echo "------------------------"
echo -e $GREEN"Enviando modificaciones a Manganga" $NORMAL
echo "------------------------"
rsync -avhz --log-file=$BASEPATHESPEJOLOCALLOGS/envioAManganga$FECHA.log $BASEPATHESPEJOLOCAL/$CLIENTE manganga:$BASEPATHESPEJO --delete
echo ""

echo "------------------------"
echo -e $GREEN"Enviando modificaciones" $NORMAL
echo "------------------------"
ssh manganga rsync -avh --log-file=$BASEPATHESPEJOLOGS/envio$FECHA.log $BASEPATHESPEJO/$CLIENTE $BASEPATHAIX --delete
echo ""

echo -e $CYAN"Cambiando permisos en el directorio del cliente $CLIENTE de los servidores MANGANGA y $SERVIDOR..." $NORMAL

# Cambio de permisos, user y grupo en MANGANGA
ssh manganga sudo chown -R ftss:site $BASEPATHESPEJO/$CLIENTE
ssh manganga sudo chmod -R 770 $BASEPATHESPEJO/$CLIENTE

# Cambia de permisos, user y group en AIX
if [ $SERVIDOR == "cayman" ]; then
    ssh manganga "ssh root@172.21.38.18 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.18 chmod -R 770 $BASEPATHAIXFISICO"
    echo ""
    echo -e $GREEN"Los siguientes archivos/directorios fueron modificados el día de hoy en el cliente $CLIENTE en el servidor $SERVIDOR:" $NORMAL
    ssh manganga "ssh root@172.21.38.18 find $BASEPATHAIXFISICO -mtime 0"
    echo ""
elif [ $SERVIDOR == "puma" ]; then
    ssh manganga "ssh root@172.21.38.12 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.12 chmod -R 770 $BASEPATHAIXFISICO"
    echo ""
    echo -e $GREEN"Los siguientes archivos/directorios fueron modificados el día de hoy en el cliente $CLIENTE en el servidor $SERVIDOR:" $NORMAL
    ssh manganga "ssh root@172.21.38.12 find $BASEPATHAIXFISICO -mtime 0"
    echo ""
elif [ $SERVIDOR == "zebra" ]; then
    ssh manganga "ssh root@172.21.38.10 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.10 chmod -R 770 $BASEPATHAIXFISICO"
    echo ""
    echo -e $GREEN"Los siguientes archivos/directorios fueron modificados el día de hoy en el cliente $CLIENTE en el servidor $SERVIDOR:" $NORMAL
    ssh manganga "ssh root@172.21.38.10 find $BASEPATHAIXFISICO -mtime 0"
    echo ""
fi

sleep 2 

echo -e $CYAN"Proceso finalizado." $NORMAL
read "Pulse una tecla para continuar" op
# MAIN END
# -----------------------------------------------
