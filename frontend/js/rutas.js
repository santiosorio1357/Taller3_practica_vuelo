const panelSillas = async () => {
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = `
    <center>
    <h4>Sillas</h4>
    <button onclick="createSilla()" class="btn btn-outline-dark">+ añadir</button>
    </center>
    <br>
    <table class="table table-striped" >
    <thead>
        <tr>
        <th>id de la silla</th>
        <th>clase</th>
        <th>estado</th>
        <th>ubicación</th>
        <th>precio</th>
        <th>acciones</th>
        </tr></thead>
    <tbody id="sillas"></tbody>
    </table>`
    let sillas = getSillas();
    await sillas.then(async Response => {
        sillas = await Response.json()
    })


    sillas.forEach(element => {
        if (element.estado == "1") {
            element.estado = "libre"
        } else {
            element.estado = "ocupado"
        }
        if (element.clase == "1") {
            element.clase = "general"
        } else {
            element.clase = "preferencial"
        }
        let tabla = document.getElementById("sillas")
        tabla.innerHTML += `
            <tr>
                <td>${element.idSilla}</td>
                <td>${element.clase}</td>
                <td>${element.estado}</td>
                <td>${element.ubicacion}</td>
                <td>${element.precio}</td>
                <td><a style=cursor:pointer id="${element.idSilla}" onclick="editSilla(this)"><img src="../img/edit.png" width="30"></a>
                <a style=cursor:pointer id="${element.idSilla}" onclick="deleteSilla(this)"><img src="../img/delete.png" width="30"></a></td>
            </tr>
        `
    });


}
const createSilla = () => {
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = `
    <div class="centrar form">
    <h4 class="centrar">Registrar Silla</h4>
    <form class="form-group">
  <div class="form-group ">
    <label for="clase">clase</label>
    <select class="form-control" id="clase">
        <option >Seleccione una opcion</option>
        <option value="0">Preferencial</option>
        <option value="1">General</option>
    </select>
  </div>
  <label for="ubicacion">Ubicación</label><br>
  <div class="form-group row align-items-start">
    <div class="col">
    <select class="form-control" id="fila">
        <option>Seleccione una fila</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        
    </select>
    </div>
    <div class="col">
    <select class="form-control col" id="columna">
        <option>Seleccione una columna</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
    </select>
    </div>
  </div>
  <div class="form-group ">
    <label for="precio">Precio</label>
    <input class="form-control" type="number" placeholder="precio" id=precio>
  </div>
  <center>
  <button onclick="RegistrarSilla()" class="btn btn-primary">Registrar</button>
  </center>
</form>
</div>
    `
}
const editSilla = async (object) => {
    let id = object.id
    let contenido = document.getElementById("contenido")
    contenido.innerHTML = `
    <div class="centrar form">
    <h4 class="centrar">Editar Silla</h4>
    <form class="form-group">
  <div class="form-group ">
    <label for="clase">clase</label>
    <select class="form-control" id="clase" disabled>
        <option >Seleccione una opcion</option>
        <option value="0">Preferencial</option>
        <option value="1">General</option>
    </select>
  </div>
  <label for="ubicacion">Ubicación</label><br>
  <div class="form-group row align-items-start">
    <div class="col">
    <select class="form-control" id="fila" disabled>
        <option>Seleccione una fila</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        
    </select>
    </div>
    <div class="col">
    <select class="form-control col" id="columna" disabled>
        <option>Seleccione una columna</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
    </select>
    </div>
  </div>
  <div class="form-group ">
    <label for="precio">Precio</label>
    <input class="form-control" type="number" placeholder="precio" id=precio>
  </div>
  <div class="form-group ">
    <label for="precio">Estado</label>
    <input class="form-control" type="number" placeholder="estado" id=estado disabled>
  </div>
  <center>
  <button id="${id}" onclick="GuardarCambiosSilla(this)" class="btn btn-primary">Guardar</button>
  </center>
</form>
</div>
    `
    let response=await getSilla(id);
    response=await response.json()
    document.getElementById("clase").value=response[0].clase
    document.getElementById("columna").value=response[0].ubicacion[1]
    document.getElementById("fila").value=response[0].ubicacion[0]
    document.getElementById("precio").value=response[0].precio
    if(response[0].estado==0){
        document.getElementById("estado").value="ocupado"
    }else{
        document.getElementById("estado").value="libre"
    }
    
}
const panelReservas=async()=>{
    let contenido=document.getElementById("contenido")
    contenido.innerHTML=`
    <center><h4>Reservas</h4></center>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id de reserva</th>
                    <th>Cédula cliente</th>
                    <th>Nombre cliente</th>
                    <th>Precio total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="reservas"></tbody>
        </table>
    `
    let reservas=document.getElementById("reservas")
    let response=await getReservas()
    response=await response.json()
    response.forEach(async reserva=>{
        reservas.innerHTML+=`
            <tr>
                <td>${reserva.idReserva}</td>
                <td>${reserva.cedulaCliente}</td>
                <td>${reserva.nombreCliente}</td>
                <td>${reserva.precioTotal}</td>
                <td><a style=cursor:pointer id="${reserva.idReserva}" onclick="editReserva(this)"><img src="../img/edit.png" width="30"></a>
                <a style=cursor:pointer id="${reserva.idReserva}" onclick="borrarReserva(this)"><img src="../img/delete.png" width="30"></a></td>
            </tr>
        `
    })
}
const editReserva=async (object)=>{
    let reserva=await getReserva(object.id)
    reserva=await reserva.json()
    let contenido=document.getElementById("contenido")
    contenido.innerHTML= `
    <center><h4>Sillas de la reserva: ${object.id}</h4>
        <h5>Precio de la reserva: </h5> ${reserva[0].precioTotal}
    </center>

        <table class="table table-striped">
            <thead>
                <tr>
                
                    
                    <th>Ubicacion</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                
                </tr>
            </thead>
            <tbody id="tabla"></tbody>
            <tbody id="footer"></tbody>
        </table>
    `
    let id=object.id
    let detalle=await getDetalleByReserva(id)
    detalle=await detalle.json()
    detalle.forEach(async element=>{
        let silla=await getSilla(element.idSilla)
        silla=await silla.json()
        
        let tabla=document.getElementById("tabla")
        tabla.innerHTML+=`
        <tr>
            
            <td>${silla[0].ubicacion}</td>
            <td>${element.precioSilla}</td>
            <td><a style=cursor:pointer id="${element.idSilla}" onclick="borrarSillaReserva(this)"><img src="../img/delete.png" width="30"></a></td>
        </tr>
        `
    })
    
    if(detalle.length<3){
        
        let tabla=document.getElementById("footer")
        tabla.innerHTML+=`
            <tr><td colspan=3><center><button class="btn btn-light" id="${object.id}" onclick="anadirSillaReserva(this)">+ Añadir</button></center></td></tr>
        `

    }
}
const anadirSillaReserva=(object)=>{
    let id=object.id;
    localStorage.setItem("reservaEditada",id)
    window.location.href="avion.admin.html"
}

