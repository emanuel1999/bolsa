archivo=$1
let pag=0
let doc=0
let imagenes=0
let hojas=0
pag=$(strings < $archivo | sed -n 's|.*/Count -\{0,1\}\([0-9]\{1,\}\).*|\1|p' | sort -rn | head -n1)
imagenes=`echo $pag`
hojas=$pag
echo $imagenes,$hojas,$doc

#pdfFile=$1
#echo "Processing $pdfFile"
#numberOfPages=$(/usr/local/bin/identify "$pdfFile" 2>/dev/null | wc -l | tr -d ' ')
#Identify gets info for each page, dump stderr to dev null
#count the lines of output
#trim the whitespace from the wc -l outout
#echo "The number of pages is: $numberOfPages"
