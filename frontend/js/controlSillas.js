function bloquearAsiento(idAsiento) {
    const asiento = document.getElementById(idAsiento);

    asiento.setAttribute('disabled', '');
}
const todasLasSillas=[]
const llenarTodasLasSillas=async()=>{
    
    let sillas=document.getElementsByTagName("input")
    
    for (let i = 0; i < sillas.length; i++) {

        let response =await getSillaU(sillas[i].id)
        response=await response.json()
        if(response.length<1){
            sillas[i].setAttribute('disabled', '');
        }
        else if(response[0].estado==0){
            sillas[i].setAttribute('disabled', '');
        }
        
    }
    
}
llenarTodasLasSillas()
let sillasEscogidas = [];
/**
    Función para añadir sillas a una lista
    y restringir que no se seleccionen mas de tres
 */
function seleccionMaxima(objeto) {

    if (sillasEscogidas.indexOf(objeto.id) == -1) {
        if (sillasEscogidas.length < 3) {
            sillasEscogidas.push(objeto.id)
        }
        else {
            objeto.checked = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes escoger mas de tres asientos!',

            })
        }
    }
    else {
        sillasEscogidas.splice(sillasEscogidas.indexOf(objeto.id), 1)
    }


}
const reservar = async () => {
    if (sillasEscogidas.length > 0) {
        let cliente = JSON.parse(localStorage.getItem('datos'))
        let sillas = []
        for (let i = 0; i < sillasEscogidas.length; i++) {
            let silla = await getSillaU(sillasEscogidas[i])
            silla = await silla.json()
            sillas.push(silla[0])
        }
        let nombreCliente = cliente.nombre;
        let precioTotal = 0
        let cedulaCliente = cliente.cedula;
        
        sillas.forEach(async objeto => {
            objeto.estado=0
            precioTotal += objeto.precio
            await updateSilla(objeto)
        })
        let datos = {
            "precioTotal": precioTotal,
            "nombreCliente": nombreCliente,
            "cedulaCliente": cedulaCliente
        }
        let response=await setReserva(datos)
        response=await response.json()
        sillas.forEach(async element => {
            let idSilla=element.idSilla
            let precioSilla=element.precio
            let data={
                "idReserva":response,
                "idSilla":idSilla,
                "precioSilla":precioSilla
            }
            await setDetalle(data)
        });
        Swal.fire({
            icon: 'success',
            title: 'Reserva realizada',
            showConfirmButton: false,
            timer: 1500
        })
        
        setTimeout(function () {
            window.location.href="../index.html"
        }, 2000)

    } else {
        Swal.fire({

            icon: 'error',
            title: 'Seleccione al menos 1 silla',
            showConfirmButton: false,
            timer: 2000
        })
    }

}