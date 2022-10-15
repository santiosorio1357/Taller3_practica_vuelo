const ingresar = () => {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    if (nombre != "" && cedula != "") {
        datos = { nombre, cedula }
        localStorage.setItem("datos", JSON.stringify(datos));
        console.log(localStorage.getItem("datos"))
        window.location.href = "./vistas/avion.html"
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes ingresar todos los datos requeridos!',

        })
    }

}