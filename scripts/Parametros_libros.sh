# Parametros a utlizar para este cliente
# parametros de entrada:
# 	NINGUNO

typeset cliente=libros

# **************************************************************************
# INICIO DE PARAMETROS ESPECIALES
# **************************************************************************
typeset -r codCliente=105
typeset -r productoTapa=371
typeset -r productolibro=370
typeset -r prodRiverside=374
typeset -r prodEdhasa=375
typeset -r prodBruja=376
typeset -r prodZorzal=377
typeset -r prodAlsina=378
typeset -r prodGaitan=379
typeset -r prodMariscal=380
typeset -r prodDyp=381
typeset -r prodUnPlata=382
typeset -r prodUnSarmiento=383
typeset -r prodLea=384
typeset -r prodEdicol=385
typeset -r prodMinistroNacion=386
typeset -r prodMusicBrocker=388
typeset -r prodCadam=389
typeset -r prodZemborain=390
typeset -r prodCetrogar=391
typeset -r prodCajaNegra=392
typeset -r prodCuencoPlata=393
typeset -r prodAteneo=394
typeset -r prodVeronese=395
typeset -r prodAgl=396
typeset -r prodAtdl=397
typeset -r prodRiveraMedica=398
typeset -r prodPeniel=399
typeset -r prodDiazSanto=400
typeset -r prodPuertoCreativo=401
typeset -r prodCepa=402
typeset -r prodAlphatex=403
typeset -r prodMacromarca=404
typeset -r prodAgea=405
typeset -r prodOsa=406
typeset -r prodMutualDagostino=407
typeset -r prodEspacioEditorial=408
typeset -r prodRiverEdhasa=387
typeset -r prodAlfaomega=409
typeset -r prodLetra_Impresa=415
typeset -r prodBonum=416
typeset duplex=NO
# **************************************************************************
# FIN DE PARAMETROS ESPECIALES
# **************************************************************************


#datos validos solo para el cliente 
typeset -r dirIn=/clientes/in/$cliente
typeset -r dirDatos=/clientes/tmp/$cliente
typeset -r dirTmp=/clientes/tmp/$cliente
typeset -r dirImpresion=/clientes/out/$cliente
typeset -r dirReportes=/clientes/reportes/$cliente
typeset -r dirLogs=/clientes/logs/$cliente

typeset -r dirRecursos=/recursos/clientes/$cliente
typeset -r dirProgs=$dirRecursos/progs
typeset -r dirScripts=$dirRecursos/scripts
typeset -r dirQuerys=$dirRecursos/scripts
typeset -r dirOvls=$dirRecursos/ovl
typeset -r dirFDef=$dirRecursos/progs
typeset -r dirPDef=$dirRecursos/progs
typeset -r dirUserLib=$dirOvls:$dirFonts
typeset -r dirResLib=$dirOvls:$dirFonts

typeset -r progPreProcesar=$dirScripts/PreProcesar_$cliente.sh
typeset -r progGenerarAfp=$dirScripts/GenerarAfp_$cliente.sh
typeset -r progContarHojas=$dirScripts/ContarHojas_$cliente.sh

typeset -r ParametrosAcifListoSinRec=$dirScripts/AcifListoSinRec_$cliente.parmdd
typeset -r ParametrosAcifPlano=$dirScripts/AcifPlano_$cliente.parmdd
typeset -r ParametrosPdpr=$dirScripts/Pdpr_$cliente.parmdd


typeset -r logGeneracion=$dirLogs/Generacion.log
typeset -r logImpresion=$dirLogs/Impresion.log
typeset -r logErrores=$dirLogs/Errores.log

