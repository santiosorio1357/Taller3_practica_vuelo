const ingresar = () => {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    if (nombre != "" && cedula != "") {
        datos = { nombre, cedula }
        localStorage.setItem("datos", JSON.stringify(datos));
        window.location.href = "vistas/avion.html"
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ingresar todos los datos requeridos!',

        })
    }

}
const RegistrarSilla = async () => {
    
    event.preventDefault()
    let clase = document.getElementById("clase").value;
    let fila = document.getElementById("fila").value;
    let columna = document.getElementById("columna").value;
    let precio = document.getElementById("precio").value;

    if (clase != "" && fila != "" && columna != "" && precio != "") {
        
        if ((clase=="0" && parseInt(fila,10)<3 &&columna!="E"&&columna!="F")||(clase=="1" && parseInt(fila,10)>2)){
            let silla = {
                "clase": clase,
                "ubicacion": fila + columna,
                "precio": precio,
                "estado": 1
    
            }
            
            let sillas = setSilla(silla);
            await sillas.then(async Response => {
                sillas = await Response.json()
            })
    
    
            if (sillas == 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Registrada exitosamente',
                    showConfirmButton: false,
                    timer: 2000
                })
                panelSillas()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'La silla ya existe',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'La silla no puede ser ubicada',
                showConfirmButton: false,
                timer: 2000
            })
        }
        
    }
}
const GuardarCambiosSilla = async (object) => {

    event.preventDefault()
    let idSilla = object.id
    let clase = document.getElementById("clase").value;
    let fila = document.getElementById("fila").value;
    let columna = document.getElementById("columna").value;
    let precio = document.getElementById("precio").value;
    let estado = document.getElementById("estado").value
    if (clase != "" && fila != "" && columna != "" && precio != "") {
        let silla = {
            "clase": clase,
            "ubicacion": fila + columna,
            "precio": precio,
            "estado": estado,
            "idSilla": idSilla
        }
        
        let sillas = updateSilla(silla);
        await sillas.then(async Response => {
            sillas = await Response.json()
        })

        await Swal.fire({
            icon: 'success',
            title: 'Editado exitosamente',
            showConfirmButton: false,
            timer: 2000
        })
        panelSillas()

    }
}
const deleteSilla = async (object) => {
    let detalles = await getdetalleBysilla(object.id)
    detalles = await detalles.json()
    
    await detalles.forEach(async element => {
        let reserva = await getReserva(element.idReserva)
        reserva = await reserva.json()
        reserva[0].precioTotal -= element.precioTotal
        await updateReserva(reserva[0])
    })


    let detalleResponse = await deleteDetalleBysilla(object.id)
    let sillaResponse = await deleteSillaApi(object.id)
    detalleResponse.json().then(async info => {
        sillaResponse.json().then(async info2 => {
            await Swal.fire({
                icon: 'success',
                title: 'Borrado exitosamente',
                showConfirmButton: false,
                timer: 2000
            })
            panelSillas()
        }).catch(async error => {
            await Swal.fire({
                icon: 'error',
                title: 'Intenta mas tarde',
                showConfirmButton: false,
                timer: 2000
            })
        })
    }).catch(async error => {
        await Swal.fire({
            icon: 'error',
            title: 'Intenta mas tarde',
            showConfirmButton: false,
            timer: 2000
        })
    })
}
const borrarReserva = async (object) => {

    let id = object.id
    let detalle = await getDetalleByReserva(id)
    detalle = await detalle.json()
    let sillasArray = []
    detalle.forEach(async element => {
        let sillas = await getSilla(element.idSilla)
        sillas = await sillas.json()
        sillas.forEach(async silla => {
            sillasArray.push(silla.idSilla)
            silla.estado = 1
            await updateSilla(silla)
        })
    });

    let response = await deleteReserva(id)
    await Swal.fire({
        icon: 'success',
        title: 'Borrado exitosamente',
        showConfirmButton: false,
        timer: 2000
    })
    panelReservas()


}
const borrarSillaReserva = async (object) => {
    let response = await getSilla(object.id)
    response = await response.json()
    let silla = response[0]
    silla.estado = 1
    await updateSilla(silla)
    let detalle = await getdetalleBysilla(object.id)
    detalle = await detalle.json()
    let reserva = await getReserva(detalle[0].idReserva)
    reserva = await reserva.json()
    reserva = reserva[0]
    reserva.precioTotal -= detalle[0].precioSilla
    
    await updateReserva(reserva)
    await deleteDetalleBysilla(object.id)
    let id = reserva.idReserva
    editReserva({ id })
}
const GuardarCambiosSillas = async () => {
    let idReserva = localStorage.getItem("reservaEditada")
    let reserva = await getReserva(idReserva)
    reserva = await reserva.json()
    reserva = reserva[0]

    for (let i = 0; i < sillasEscogidas.length; i++) {
        let silla = await getSillaU(sillasEscogidas[i])
        silla = await silla.json()
        silla = silla[0]
        silla.estado = 0
        let idSilla=silla.idSilla
        let precioSilla=silla.precio
        await updateSilla(silla)
        await setDetalle({
            "idReserva": idReserva,
            "idSilla": idSilla,
            "precioSilla": precioSilla
        })
        reserva.precioTotal += silla.precio
    }
    await updateReserva(reserva)
    await Swal.fire({
        icon: 'success',
        title: 'Editada exitosamente',
        showConfirmButton: false,
        timer: 2000
    })
    localStorage.removeItem("reservaEditada")
    window.location.href="admin.html"
}
