#!/bin/bash
# CARGA PARAMETROS
. /mnt/c/clientes/repos/scriptsRicoh/implementaciones/parametros.sh
# CARGA FUNCIONES
#. ./funciones.sh

# -----------------------------------------------
# MAIN START

SERVIDOR=$1
CLIENTE=$2
errorCli=0
TIF=$DIRTIF/$CLIENTE
#TIF=/mnt/c/clientes/repos/varios/$CLIENTE
TIFMANGANGA=$DIRESPEJOMANGANGA/$SERVIDOR/$DIROVL/$CLIENTE


clear
echo -e $YELLOW$BOLD"\t \t \t \t \t Creación automática de OVLS" $NORM$NORMAL
echo -e $YELLOW$BOLD"\t \t \t \t \t ---------------------------" $NORM$NORMAL
echo ""
#let lineas_pant=26
#let cant_lineas=`cat $ListaClientes| wc -l`
#cant_lineas=`printf "%02s" $cant_lineas`
#let total_lineas=$cant_lineas
#let lineas_pasadas=1
#let lineas=$lineas_pant
#let cont=0


# Preguntamos por el nombre del TIF
echo "Los archivos TIF disponibles son: "
echo ""
ls $TIF --color
echo ""
read -p "Por favor escribí el nombre del TIF a enviar incluyendo la extensión: " ENTRADA

while [ ! -f $TIF/$ENTRADA ]
    do
    echo -e $RED"El nombre del archivo no existe." $NORMAL
    echo ""
    echo "Los archivos TIF disponibles son: "
    ls $TIF
    echo ""
    read -p "Por favor escribí el nombre del TIF a enviar incluyendo la extensión: " ENTRADA
    echo ""
done
echo ""

# Preguntamos el nombre del overlay que chequea si empieza con O1 y si tiene 8 caracteres.
read -p "Ahora el nombre del overlay. Debe comenzar con O1 y tener un total de 8 caracteres: " SALIDA
echo ""

while true
    do
    if [[ "$SALIDA" =~ ^O1.* ]] && [[ $(echo "$SALIDA" | wc -m) == 9 ]]; then
        break
    else
        echo "Recordá que el nombre del overlay debe comenzar con O1 y tener 8 caracteres."
        echo "" 
        read -p "Por favor seleccioná un nombre para el overlay que comience con O1 y tener un total de 8 caracteres: " SALIDA
        echo ""
    fi
done

# Seleccionamos el tamaño del papel a donde se va a utilizar el overlay.
read -p "Por último, seleccióná el tamaño del papel para el overlay. A4 - carta - Oficio: " TAMANIO
echo ""

while true
    do
    if [[ "$TAMANIO" == "A4" ]] || [[ "$TAMANIO" == "carta" ]] || [[ "$TAMANIO" == "Oficio" ]]; then
        break
    else
        echo "Recordá que el nombre del overlay debe comenzar con O1 y tener 8 caracteres."
        echo ""
        read -p "Por favor seleccioná un nombre para el overlay que comience con O1 y tener un total de 8 caracteres: " SALIDA
        echo ""
    fi
done

# creación dir $CLIENTE en manganga
ssh manganga mkdir -p $TIFMANGANGA


# envio de tif a $CLIENTE
echo -e $BLUE"Enviando archivo TIF a Manganga para su posterior conversión..." $NORMAL
echo ""
rsync -avz $TIF/$ENTRADA manganga:$TIFMANGANGA
ssh manganga sudo chown -R ftss:site $TIFMANGANGA
echo ""

# creación dir $CLIENTE en $SERVIDOR
ssh manganga "ssh root@172.21.38.12 mkdir -p /recursos/scripts/generacionOvls/$CLIENTE"

# copia de archivo tif a dir $CLIENTE en $SERVIDOR
ssh manganga "scp $TIFMANGANGA/$ENTRADA root@172.21.38.12:/recursos/scripts/generacionOvls/$CLIENTE"

#ejecución de la creación del ovls en $SERVIDOR
echo -e $BLUE"Generando overlay en $SERVIDOR..." $NORMAL
ssh manganga "ssh root@172.21.38.12 /$DIROVL/GenerarOvl_$TAMANIO.sh /$DIROVL/$CLIENTE/$ENTRADA /$DIROVL/$CLIENTE/$SALIDA"
echo ""

# Me traigo el O1 a manganga
ssh manganga scp root@172.21.38.12:/$DIROVL/$CLIENTE/$SALIDA $DIRTMPMANGANGA/

# Muevo a servidor final (zebra) LINEA A MODIFICAR POR CADA UNO DE LOS QUE USE ESTE SCRIPT

ssh manganga mv $DIRTMPMANGANGA/$SALIDA $DIRESPEJOMANGANGA/$SERVIDOR/recursos/clientes/$CLIENTE/ovls

echo -e $GREEN"Proceso finalizado. Por favor ejecutar script sendAndBackup." $NORMAL
echo ""
read tecla
# borra tif a transformar
ssh manganga rm $TIFMANGANGA/$ENTRADA
# MAIN END
# -----------------------------------------------


