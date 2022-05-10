#!/bin/bash
. /mnt/c/clientes/repos/scriptsRicoh/implementaciones/parametros.sh
# CLIENTE=$1
# SERVIDOR=$2

# -----------------------------------------------
# COLOR VARS START

BLACK="\033[30m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
PINK="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"
NORMAL="\033[0;39m"

# EFFECTS
BLINKSTART="\033[33;5m"
BLINKEND="\033[0m"
BOLD=$(tput bold)
NORM=$(tput srg0)

# COLOR VARS END
# -----------------------------------------------

# -----------------------------------------------
# FUNCTIONS START

espera(){
    echo ""
    echo -e $CYAN"Por favor conectarse a la VPN de Ricoh Argentina." $NORMAL
    echo -e $CYAN"Presione 'Ctrl + c' para cancelar" $NORMAL
    echo ""
    echo -e $CYAN"Estableciendo conexión con el servidor ..." $NORMAL

    # Puntitos de espera ... Fuente: https://askubuntu.com/questions/929659/bash-wait-for-a-ping-success
    while ! ping -c1 -n -w 1 172.21.39.119 &> /dev/null
    do
        sleep 1
        printf "%c" "."
        
    done
    printf "\n%s\n"  "Conexión establecida!"
    printf "\n%s\n"  "Comenzando proceso."
    echo ""
}

menuServidor(){
    read -r -p "Ingresá el nombre de un servidor: " SERVIDOR
    case "$SERVIDOR" in
        puma | zebra | cayman | tigre | zorro ) 
            LISTACLIENTES=$(ls $DIRESPEJO/$SERVIDOR/recursos/clientes > $DIRTMP/listaClientes-$SERVIDOR-.txt ; tr '\r\n' ' ' < $DIRTMP/listaClientes-$SERVIDOR-.txt > $DIRTMP/listaClientes-$SERVIDOR-SinSaltoLinea.txt ; tr ' ' '|' < $DIRTMP/listaClientes-$SERVIDOR-SinSaltoLinea.txt > $DIRTMP/listaClientes-$SERVIDOR-ConPipe.txt ; sed s/\|/\ \|\ /g $DIRTMP/listaClientes-$SERVIDOR-ConPipe.txt > $DIRTMP/listaClientes-$SERVIDOR-ConEspacioYPipe.txt ; rev $DIRTMP/listaClientes-$SERVIDOR-ConEspacioYPipe.txt | cut -c 4- | rev > $DIRTMP/listaClientes-$SERVIDOR-Final.txt)

            echo "Seleccionaste: "
            echo -e $GREEN "$SERVIDOR" $NORMAL
            echo ""
            
            rm $DIRTMP/listaClientes-$SERVIDOR-.txt $DIRTMP/listaClientes-$SERVIDOR-SinSaltoLinea.txt $DIRTMP/listaClientes-$SERVIDOR-ConPipe.txt $DIRTMP/listaClientes-$SERVIDOR-ConEspacioYPipe.txt
            ;;
        *)
            echo ""
            echo -e $YELLOW "ATENCIÓN. Ingresá un servidor válido -> puma - zebra - cayman - tigre - zorro - lemur" $NORMAL
            echo "" ; menuServidor ;;
    esac
}

menuCliente(){
    MOSTRARCLIENTES=$(cat $DIRTMP/listaClientes-$SERVIDOR-Final.txt)
    read -r -p "Ingresá un cliente: " CLIENTE
    eval 'case "$CLIENTE" in
        '$MOSTRARCLIENTES') 

            echo "Seleccionaste: "
            echo -e $GREEN "$CLIENTE" $NORMAL
            echo ""
            TIF=/home/eas/varios/$CLIENTE
            ;;
        *)
            echo -e $YELLOW"ATENCIÓN. Ingrese un cliente válido." $NORMAL ; echo -e $YELLOW $MOSTRARCLIENTES $NORMAL ; echo "" ; menuCliente ;;
        esac'
}

# FUNCTIONS END
# -----------------------------------------------

DIRESPEJO=/home/eas/servidoresEspejo
DIRTMP=$DIRESPEJO/tmp



# -----------------------------------------------
# MAIN START

clear
echo -e $YELLOW$BOLD"\t \t \t \t \t Recuperación de backups de clientes en AIX" $NORM$NORMAL
echo -e $YELLOW$BOLD"\t \t \t \t \t ------------------------------------------" $NORM$NORMAL
echo ""
espera
menuServidor
menuCliente

# -----------------------------------------------
# GLOBAL VARS START

BASEPATHAIX=/servidoresAIX/$SERVIDOR/recursos/clientes
BASEPATHESPEJOTMP=/servidoresEspejo/tmp/
BASEPATHESPEJO=/servidoresEspejo/$SERVIDOR/recursos/clientes
BASEPATHESPEJOBKP=$BASEPATHESPEJO/zzTmpBackup/$CLIENTE
BASEPATHESPEJOLOGS=$BASEPATHESPEJO/$CLIENTE/logsDeEnvio
BACKUPSANTIGUOS=$(ssh manganga ls -A $BASEPATHESPEJOBKP > /dev/null)
BASEPATHAIXFISICO=/recursos/clientes/$CLIENTE
# FECHA=$(date +%Y%m%d)

# GLOBAL VARS END
# -----------------------------------------------

echo ""

echo -e $CYAN"Los backups antiguos de $CLIENTE son: " $NORMAL
echo -e $CYAN"(Los archivos están ordenados del mas antiguo al mas nuevo)" $NORMAL
ssh manganga "ls -1tr $BASEPATHESPEJOBKP"

echo ""

# Lógica para la restauración del backup

read -p "Ingresá la fecha del backup a restaurar. El formato debe ser YYYYMMDD: " FECHA
read -p "Ahora ingresá el comentario del backup a restaurar. Si no tiene comentarios, solo apretá ENTER: " COMENTARIO

echo -e $CYAN"El backup seleccionado es $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz" $NORMAL
echo ""
echo -e $YELLOW"Estás a punto de restaurar el backup $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz" $NORMAL

read -r -p "$(echo -e $BLINKSTART$RED$BOLD"ESTA OPERACION NO SE PUEDE DESHACER - Lo restauramos? [y/N] " $BLINKEND$NORM$NORMAL)" response
case "$response" in
        [yY][eE][sS]|[yY]) 
            echo -e $GREEN"Restaurando backup $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz en Espejo..." $NORMAL
            ssh manganga "tar -xvzf $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz -C $BASEPATHESPEJO"
            echo ""
            echo -e $GREEN"Restaurando backup $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz en AIX $SERVIDOR" $NORMAL
            ssh manganga "tar -xvzf $BASEPATHESPEJOBKP/$CLIENTE-BKP-$FECHA-$COMENTARIO.tar.gz -C $BASEPATHESPEJOTMP"
            ssh manganga rsync -avh --log-file=$BASEPATHESPEJOLOGS/restoreBackup$FECHA.log $BASEPATHESPEJOTMP/$CLIENTE $BASEPATHAIX --delete 
            ;;
        *)
            echo -e $PINK"No se restauró ningún backup."$NORMAL
            echo ""
            # Borrando temporales
            rm -rf $BASEPATHESPEJOTMP/$CLIENTE 
            rm $DIRTMP/listaClientes-$SERVIDOR-Final.txt
            exit
            ;;
esac

echo ""

# Cambia de permisos, user y group en AIX
if [ $SERVIDOR == "cayman" ]; then
    ssh manganga "ssh root@172.21.38.18 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.18 chmod -R 770 $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.18 ls -ltr $BASEPATHAIXFISICO"
elif [ $SERVIDOR == "puma" ]; then
    ssh manganga "ssh root@172.21.38.12 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.12 chmod -R 770 $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.12 ls -ltr $BASEPATHAIXFISICO"
elif [ $SERVIDOR == "zebra" ]; then
    ssh manganga "ssh root@172.21.38.10 chown -R ftss:site $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.10 chmod -R 770 $BASEPATHAIXFISICO"
    ssh manganga "ssh root@172.21.38.10 ls -ltr $BASEPATHAIXFISICO"
fi

echo -e $CYAN"Backup restaurado. Proceso finalizado." $NORMAL

# Borrando temporales
rm -rf $BASEPATHESPEJOTMP/$CLIENTE 
rm $DIRTMP/listaClientes-$SERVIDOR-Final.txt

# MAIN END
# -----------------------------------------------
