# -----------------------------------------------
# GLOBAL VARS START
# DIRECTORIOS

DIRSCRIPT=/mnt/c/clientes/repos/scriptsRicoh/implementaciones
DIRBASE=/mnt/c/clientes/repos
DIRESPEJO=$DIRBASE
DIRESPEJOMANGANGA=/servidoresEspejo
DIRTMP=$DIRESPEJO/tmp
DIRTMPMANGANGA=$DIRESPEJOMANGANGA/tmp
DIRTIF=$DIRBASE/varios
DIROVL=recursos/scripts/generacionOvls

# VARIABLES
ListaServidores=$DIRTMP/listaServidores.txt
ListaClientes=$DIRTMP/listaClientes-$SERVIDOR.txt
#SERVIDOR=""
#CLIENTE=""
errorOpcion=0
TIF=""
TIFMANGANGA=""

# GLOBAL VARS END
# -----------------------------------------------

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
BLINKSTARTYELLOW="\033[33;5m"
BLINKSTARTRED="\033[31;5m"
BLINKSTARTCYAN="\033[36;5m"
BLINKEND="\033[0m"
BOLD=$(tput bold)
NORM=$(tput srg0)

# COLOR VARS END
# -----------------------------------------------

