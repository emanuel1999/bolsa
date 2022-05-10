function knowLastPage (numero) {
    let numeroEnString=String(numero)
    let numeroEnArray=numeroEnString.split("")
    let ultimoDigitoNumeroEnArray=numeroEnArray[numeroEnArray.length-1]
    numeroEnArray.pop()
    let numeroRecortadoEnString=numeroEnArray.join("")
    let numeroRecortado=Number(numeroRecortadoEnString)
    if (ultimoDigitoNumeroEnArray==0) {
        return numeroRecortado
    } else {
        return numeroRecortado+1
    }
    
}

module.exports=knowLastPage