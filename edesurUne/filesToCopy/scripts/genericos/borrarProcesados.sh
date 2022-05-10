#!/bin/bash
dirProcesados=/clientes/procesados

find $dirProcesados/*.PROCESADO -mtime +5 -exec rm {} \;

