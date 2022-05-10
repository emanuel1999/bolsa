#!/bin/bash
nombreBase=$1
echo "lectura de archivos"
#cat $nombreBase
let count=0
esResto=0
let resto=1
	echo $nombreBase
head -1 $nombreBase > etiqueta_$nombreBase
while IFS= read line
do
	
	if [ $count -ne 0 ]
	then
		let resto=$count%400
	fi
	if [ $count -eq 1 ]
	then
		echo $line >> etiqueta_$nombreBase
	elif [ $resto -eq 0 ]  
	then
		#como cargo esta esIgual= echo $line | cut -b686-696
		echo $line >> etiqueta_$nombreBase
		
		esResto=1
	elif [ $esResto == 1 ]
	then
		echo $line >> etiqueta_$nombreBase
		esResto=0
		
	fi
	let count=count+1
done < $nombreBase
tail -2 $nombreBase >> etiqueta_$nombreBase
mv $nombreBase $nombreBase.echo

