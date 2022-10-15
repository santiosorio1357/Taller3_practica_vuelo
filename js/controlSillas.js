function bloquearAsiento(idAsiento) {
    const asiento = document.getElementById(idAsiento);
    console.log(asiento)
    asiento.setAttribute('disabled', '');
}


var boton = document.getElementsByTagName('input');
console.log(boton)

let sillasEscogidas = [];
/**
    Función para añadir sillas a una lista
    y restringir que no se seleccionen mas de tres
 */
function seleccionMaxima(objeto){
    if(sillasEscogidas.indexOf(objeto.id) == -1){
        if(sillasEscogidas.length < 3){
            sillasEscogidas.push(objeto.id)
        }
        else{
            objeto.checked = false;
            console.log('No puedes escoger más sillas.')
        }
    }
    else{
        sillasEscogidas.splice(sillasEscogidas.indexOf(objeto.id),1)
    }

    console.log(sillasEscogidas)
}