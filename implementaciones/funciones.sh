#!/bin/bash
#. ./parametros.sh
. /mnt/c/clientes/repos/scriptsRicoh/implementaciones/parametros.sh

# -----------------------------------------------
# FUNCTIONS START
# -----------------------------------------------------------------------------
# Nombre:  espera 
# Descripcion : comprueba que este conectado a la VPN, sino lo esta espera
#               que se realice la conexion 
# -----------------------------------------------------------------------------
espera(){
        clear
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


# -----------------------------------------------------------------------------
# Nombre:  cargarDatos
# Descripcion: Carga los datos necesarios para el uso del mennu
# -----------------------------------------------------------------------------
cargarDatos(){
        clear
        tput cup 10 10
        echo -e $BLINKSTARTCYAN"Por favor espere se estan cargando los datos para el menu..." $NORMAL
        ssh manganga 'cd '$DIRESPEJOMANGANGA'/ ; ls -p |cut -s -d"/" -f1' | grep -v "tmp" > $ListaServidores
        for i in  `cat $ListaServidores`
        do
                SERVIDOR=$i
                ListaClientes=$DIRTMP/listaClientes-$SERVIDOR.txt
                ssh manganga 'cd '$DIRESPEJOMANGANGA'/'$SERVIDOR'/recursos/clientes/; ls -p |cut -s -d"/" -f1' | grep -v "zzTmpBackup" > $ListaClientes
        done
}


# -----------------------------------------------------------------------------
# Nombre: MenuServidor
# salida:  Nombre del Servidor seleccionado dentro de la lista
# ------------------------------------------------------------------------------
menuServidor(){
# declaracion de variables locales
typeset cont
typeset cont_ult
typeset opcion
typeset pag
typeset aux
typeset dif
ListaServidores=$DIRTMP/listaServidores.txt
clear

let lineas_pant=26
cant_lineas=`cat $ListaServidores| wc -l`
#cant_lineas=`printf "%02s" $cant_lineas`
let total_lineas=$cant_lineas
#let lineas_pasadas=1
#let lineas=$lineas_pant
let cont=0

if [ $errorOpcion == 1 ]
then
        tput cup 41 0
        echo -e $RED "ATENCIÓN. Ingresá un servidor válido" $NORMAL
fi


function MuestraListaServidores
{
	if [ test $lineas_pasadas 2>/dev/null ]
        then
		let lineas_pasadas=1
		let cont_ult=0
                let lineas=$lineas_pant #+'1'
	else
		#let cont=$lineas_pasadas
		#let lineas=$lineas+$lineas_pasadas
		#let cont=$cont-'1'
		let cont=0
		let cont_ult=0
 	fi
 	while [ $lineas_pasadas ]
	do
		let dif=$lineas_pasadas-'1'
 		if [ $dif -ge $cant_lineas ]
			then
				let lineas_pasadas=$lineas_pasadas-$lineas_pant
				let lineas=$lineas-$lineas_pant
			else
				break
 		fi
	done
	let pos=8
        for i in  `cat $ListaServidores`
        do
                let cont=$cont+'1'
		if [ $cont -eq $lineas_pasadas -o $cont -ge $lineas_pasadas -a $cont_ult -le $cont ]
                then
                        #me fijo que la lista entre en pantalla
                        #let pag=$cont%$lineas
                        let pag=$lineas-$cont
                        if [ $pag != 0 ]
                        then    
				let pos=pos+1
				tput cup $pos 38
				echo "$cont) $i"
                        else
				let cont_ult=$cont
				return
                        fi
                fi
        done
        let cont=$cont+'1'
	return
}



    	let cont='0'
	tput cup 4 34
	echo -e $YELLOW$BOLD"Menu de seleccion de Servidor" $NORM$NORMAL
	tput cup 5 34
	echo -e $YELLOW$BOLD"---- -- --------- -- --------" $NORM$NORMAL
	MuestraListaServidores
	tput cup 20 24
	echo "x) SALIR"
	tput cup 22 0
        read -r -p "Ingresá el nombre de un servidor: " opcion     
        case $opcion in
          *[[:digit:]]* ) # se ingres un numero
        	        let cont=$cont-'1'
                        if [ $opcion -le $cont -a $opcion -ge $lineas_pasadas ]
                        then
			    	SERVIDOR=`cat $ListaServidores| head -$opcion | tail -1`
				errorOpcion=0
                        else    
				errorOpcion=1
				menuServidor 
                        fi
                        ;;
           	    x|X )
                        cd -
			errorOpcion=0
                        exit
                        ;;
                      * )
			errorOpcion=1
		       	menuServidor
		       	;;
	esac
}

# -----------------------------------------------------------------------------
# Nombre: MenuCliente
# salida: Nombre del Cliente seleccionado dentro de la lista
# ------------------------------------------------------------------------------
menuCliente(){
# declaracion de variables locales
typeset cont
typeset cont_ult
typeset opcion
typeset pag
typeset aux
typeset dif

clear
ListaClientes=$DIRTMP/listaClientes-$SERVIDOR.txt

let lineas_pant=25
let cant_lineas=`cat $ListaClientes| wc -l`
cant_lineas=`printf "%02s" $cant_lineas`
let total_lineas=$cant_lineas
let lineas_pasadas=1
#let lineas=$lineas_pant
let cont=0

function MuestraListaClientes
{
        if [ test $lineas_pasadas 2>/dev/null ]
        then
                let lineas_pasadas=1
                let cont_ult=0
                let lineas=$lineas_pant +'1'
        else
                #let cont=$lineas_pasadas
                #let lineas=$lineas+$lineas_pasadas
                #let cont=$cont-'1'
                let cont=0
                let cont_ult=0
        fi
        while [ $lineas_pasadas ]
        do
                let dif=$lineas_pasadas-'1'
                if [ $dif -ge $cant_lineas ]
                        then
                                let lineas_pasadas=$lineas_pasadas-$lineas_pant
                                let lineas=$lineas-$lineas_pant
                        else
                                break
                fi
        done
        let pos=5
        for i in  `cat $ListaClientes`
        do
                let cont=$cont+'1'
                if [ $cont -ge $lineas_pasadas -a $cont_ult -le $cont ]
                then
                        #me fijo que la lista entre en pantalla
                        #let pag=$cont%$lineas
                        let pag=$lineas-$cont
                        if [ $pag != 0 ]
                        then
                                let pos=pos+1
                                tput cup $pos 38
                                echo "$cont) $i"
                        else
                                let cont_ult=$cont
                                return
                        fi
                fi
        done
        let cont=$cont+'1'
        return
}

while [ 1 ]
        do
        clear
        if [ $errorOpcion == 1 ]
        then
                tput cup 41 0
                echo -e $BLINKSTARTRED "ATENCIÓN. Ingresá un opción válida" $NORMAL
        fi
	#let cont='0'
        tput cup 1 34
        echo -e $YELLOW$BOLD"Menu de seleccion de Cliente" $NORM$NORMAL
        tput cup 2 34
        echo -e $YELLOW$BOLD"---- -- --------- -- -------" $NORM$NORMAL
	tput cup 3 34
        echo -e $YELLOW$BOLD"Servidor actual seleccionada: $SERVIDOR\n" $NORM$NORMAL

    	tput cup 5 45
	MuestraListaClientes

	tput cup 40 24
	if [ $total_lineas -ge $lineas_pant ]
        then if [ $lineas_pasadas -eq '1' ]
                then
		tput cup 33 24
               	echo "a) AVANZAR    (Total Clientes = "$total_lineas")"
		tput cup 34 24
               	echo "x) VOLVER AL MENU ANTERIOR"
               	else if [ $lineas_pasadas -ge '1' -a $lineas -le $total_lineas ]
                       	then
			tput cup 33 24
               		echo "a) AVANZAR    (Total Clientes = "$total_lineas")"
			tput cup 34 24
               		echo "r) RETROCEDER (Total Clientes = "$total_lineas")"
			tput cup 35 24
               		echo "x) VOLVER AL MENU ANTERIOR"
               		else if [ $lineas_pasadas -ge '1' -o $lineas -ge $total_lineas ]
                       		then
				tput cup 33 24
       				echo "r) RETROCEDER (Total Clientes = "$total_lineas")"
				tput cup 34 24
       				echo "x) VOLVER AL MENU ANTERIOR"
               			fi
               		fi
		fi
        else
		tput cup 33 24
                echo "x) VOLVER AL MENU ANTERIOR"
	fi

	tput cup 42 0
        read -r -p "Ingresá el nombre de un cliente: " opcion
        case $opcion in
          *[[:digit:]]* ) # se ingres un numero
                        let cont=$cont-'1'
                        if [ $opcion -le $cont -a $opcion -ge $lineas_pasadas ]
                        then
 				CLIENTE=`cat $ListaClientes| head -$opcion | tail -1`
			else
                                errorOpcion=1
                                return
				#cant_lineas=`cat $ListaClientes| wc -l`
                                # cant_lineas=`printf "%02s" $cant_lineas`
                                # let total_lineas=$cant_lineas
			fi
                        ;;
                a|A)    if [ $lineas -ge $total_lineas -a $lineas != $total_lineas ]
                        then
 	                       errorOpcion=1
                        else
                        	let lineas_pasadas=$lineas_pasadas+$lineas_pant
                        	let lineas=$lineas_pant+$lineas_pasadas
                        	cont=0
				errorOpcion=0
			fi
			;;
                r|R)    if [ $lineas_pasadas -eq '1' ]
                        then
				errorOpcion=1
                        else
                        	let lineas_pasadas=$lineas_pasadas-$lineas_pant
                        	let lineas=$lineas_pant+$lineas_pasadas
                        	cont=0
				errorOpcion=0
                        fi
                        ;;
		x|X)    return 0
			;;
                  *)    errorOpcion=1   
                        cant_lineas=`ls $dir_impresion|wc -l`
                        cant_lineas=`printf "%02s" $cant_lineas`
                        let total_lineas=$cant_lineas
                        ;;
        esac

done
}

# FUNCTIONS END
# ----------------------------------------------
