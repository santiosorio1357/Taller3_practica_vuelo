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
const createSilla=()=>{
    let contenido = document.getElementById("contenido")
    contenido.innerHTML=`
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