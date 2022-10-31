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
    console.log("silla")
    event.preventDefault()
    let clase = document.getElementById("clase").value;
    let fila = document.getElementById("fila").value;
    let columna = document.getElementById("columna").value;
    let precio = document.getElementById("precio").value;

    if (clase != "" && fila != "" && columna != "" && precio != "") {
        let silla = {
            "clase": clase,
            "ubicacion": fila + columna,
            "precio": precio,
            "estado": 1

        }
        console.log(clase, fila, columna, precio)
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
}