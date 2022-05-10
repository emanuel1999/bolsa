#!/bin/bash
# CARGA PARAMETROS
. ./parametros.sh
# CARGA FUNCIONES
#. ./funciones.sh

SERVIDOR=$1
CLIENTE=$2
# -----------------------------------------------
# GLOBAL VARS START

BASEPATHAIX=/servidoresAIX/$SERVIDOR/recursos/clientes
BASEPATHESPEJO=/servidoresEspejo/$SERVIDOR/recursos/clientes
BASEPATHESPEJOBKP=$BASEPATHESPEJO/zzTmpBackup/$CLIENTE
BASEPATHESPEJOLOGS=$BASEPATHESPEJO/$CLIENTE/logsDeEnvio
BACKUPSANTIGUOS=$(ssh manganga ls -A $BASEPATHESPEJOBKP > /dev/null)
FECHA=$(date +%Y%m%d)

# GLOBAL VARS END
# -----------------------------------------------

# -----------------------------------------------
# MAIN START

clear
echo -e $YELLOW$BOLD"\t \t \t \t \t Borrado de backups de clientes en AIX" $NORM$NORMAL
echo -e $YELLOW$BOLD"\t \t \t \t \t -------------------------------------" $NORM$NORMAL
echo ""
#espera
#menuServidor
#menuCliente


echo ""

if ssh manganga "test -e $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-.tar.gz"; then
    echo ""
    echo -e $RED$BOLD"Se borrará el backup $CLIENTE-BKP-$FECHA-.tar.gz" $NORM$NORMAL
    read -r -p "$(echo -e $BLINKSTART$RED$BOLD"Está seguro? [y/N] " $BLINKEND$NORM$NORMAL)" response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            ssh manganga "rm $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-.tar.gz"
            ;;
        *)
            echo "No se borró ningún backup."
            ;;
    esac
    echo ""
    if [ ! -z "$BASEPATHESPEJOBKP" ]; then
    echo "Los backups antiguos de $CLIENTE son:"
    ssh manganga "ls -1 $BASEPATHESPEJOBKP"
    read -r -p "Desea borrarlos? [y/N] " response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            echo "Borrando backups antiguos..."
            ssh manganga "rm $BASEPATHESPEJOBKP/*"
            ;;
        *)
            echo "No se borró ningún backup."
            ;;
    esac        
    else
        echo "El directorio de backups del cliente $CLIENTE está vacio."
    fi
    echo ""
else 
    echo ""
    echo "No hay backups con fecha de hoy. Se listan a continuación los backups antiguos del cliente $CLIENTE:"
    echo ""
    if [ ! -z "$BASEPATHESPEJOBKP" ]; then
        echo "Los backups antiguos de $CLIENTE son:"
        ssh manganga "ls -1 $BASEPATHESPEJOBKP"
        read -r -p "Desea borrarlos? [y/N] " response
        case "$response" in
            [yY][eE][sS]|[yY]) 
                echo "Borrando backups antiguos..."
                ssh manganga "rm $BASEPATHESPEJOBKP/*"
                ;;
            *)
                echo "No se borró ningún backup."
                ;;
        esac        
    else

        echo "El directorio de backups del cliente $CLIENTE está vacio."
    fi
    echo ""
fi

# Borrado de archivos temporales
rm $DIRTMP/listaClientes-$SERVIDOR-Final.txt

# MAIN END
# -----------------------------------------------
