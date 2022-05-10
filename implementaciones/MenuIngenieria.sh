#!/bin/bash
# CARGA PARAMETROS
#. /home/erivero/script/implementaciones/parametros.sh
. /mnt/c/clientes/repos/scriptsRicoh/implementaciones/parametros.sh
# CARGA FUNCIONES
. ./funciones.sh

typeset cont
typeset cont_ult
typeset opcion
typeset pag
typeset aux
typeset dif

cd $dirScripts
let cont=0

espera
cargarDatos

# trap ctrl-c and call ctrl_c()
#trap '' INT

while [ 1 ]
        do
        clear
	if [ $errorOpcion == 1 ]
	then
        	tput cup 41 0
        	echo -e $BLINKSTARTRED "ATENCIÓN. Ingresá un opción válida" $NORMAL
	fi

	tput cup 2 40
        echo -e $YELLOW "Menu de Implementacion" $NORMAL
	tput cup 3 40
        echo -e $YELLOW "---- -- --------------" $NORMAL
        #listo todos los elemento del menu
        cont=0
        tput cup 8 24
        echo "1) Crear Overlays"
        tput cup 9 24
        echo "2) Enviar archivos al servidor"
        tput cup 10 24
        echo "3) Restaurar Backup"
        tput cup 11 24
        echo "4) Borrar Backup"
        tput cup 13 24
        echo "x) SALIR"
        tput cup 22 0
        read -r -p "ingrese una opcion: " opcion
        case $opcion in
                x|X)
			cd -
                        exit
			;;
                1 )     errorOpcion=0
			menuServidor
			menuCliente
			$DIRSCRIPT/creacionOvls.sh $SERVIDOR $CLIENTE
			;;
                2 )     errorOpcion=0
                        menuServidor
                        menuCliente
			$DIRSCRIPT/sendAndBackupFiles.sh $SERVIDOR $CLIENTE
                        ;;
                3 )     errorOpcion=0
                        menuServidor
                        menuCliente
			$DIRSCRIPT/restoreClientBackup.sh $SERVIDOR $CLIENTE
                        ;;
                4 )     errorOpcion=0
                        menuServidor
                        menuCliente
			$DIRSCRIPT/deleteBackup.sh $SERVIDOR $CLIENTE
                        ;;

                *)      errorOpcion=1
                        ;;
        esac
done


