#!/bin/bash

version=$1
tag=$2
path=/home/erivero/pruebas
for ((c=10; c>=0; c--))
do
        wget --spider https://github.com/pre-commit/pre-commit/archive/refs/tags/v$1.$2.$c.zip 2>/dev/null
        if [ $? -ne 0  ]
        then
        echo "v$1.$2.$c.zip no existe"
        else
        echo "patch major v$1.$2.$c.zip"
        #wget -P /home/erivero/pruebas https://github.com/pre-commit/pre-commit/archive/refs/tags/v$1.$2.$c.zip 
        wget --directory-prefix=$path https://github.com/pre-commit/pre-commit/archive/refs/tags/v$1.$2.$c.zip 
        exit 
        fi
        
done
