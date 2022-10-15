function bloquearAsiento(idAsiento) {
    const asiento = document.getElementById(idAsiento);
    console.log(asiento)
    asiento.setAttribute('disabled', '');
}

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes escoger mas de tres asientos!',
    
            })
        }
    }
    else{
        sillasEscogidas.splice(sillasEscogidas.indexOf(objeto.id),1)
    }

    console.log(sillasEscogidas)
}
const reservar=()=>{
    if(sillasEscogidas.length>0){
        Swal.fire({
        
            icon: 'success',
            title: 'Reserva realizada',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){
            window.location.href = "../index.html"
          },2000)
          
    }else{
        Swal.fire({
        
            icon: 'error',
            title: 'Seleccione al menos 1 silla',
            showConfirmButton: false,
            timer: 2000
          })
    }
    
}