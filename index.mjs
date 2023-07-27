let alumns = [];

function fetchMaterias () {
    fetch('http://localhost:3000/getMaterias')
    .then(response => response.json())
    .then(data => {

         let option = data.materias.map(item => `<option value="${item.materia}">${item.materia}</option>`)

        document.getElementById("selecter-materias")
        .innerHTML = option
    })
}

fetchMaterias()

fetch('http://localhost:3000/obtenerAlumnos')
.then(response => response.json())
.then(data => {
    alumns = data.alumnos;
    console.log(alumns);
    showAlumnos(alumns)
})
.catch(error => console.log(error));



function showAlumnos(array) {
    const table = document.getElementById("listStudents");
    const modal = document.getElementById("container-modal");
    let tableContent

    array.forEach((item, index) => {
        tableContent  +=  ` <tr>
            <th scop="row" class="table-background">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.boleta}</td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarAlumno('${item.id}')">Eliminar</button></td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${item.id}">
            Ver detalle</button></td>
        </tr>`;

        modal.innerHTML += `
        <div class="modal fade" id='${item.id}' data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">${item.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <p>e-mail:  ${item.email} </p>
          <p>Boleta:  ${item.boleta}  </p>
          <p>Materia:  ${item.materias[0].name} </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>

        `
        
        }
    );
    table.innerHTML = tableContent;

}

function showStudents() {
    document.getElementById("tableStuden").style.display = "block";
    document.getElementById("container-student").style.display = "none";
}

function showForm(){
    document.getElementById("tableStuden").style.display = "none";
    document.getElementById("container-student").style.display = "block";
}


function eliminarAlumno(id){

    fetch(`http://localhost:3000/borrarAlumno/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        if (data.status) {
            document.getElementById('listStudents').innerHTML = ''
            showAlumnos(data.alumnosFilter)
            alert("Alumno eliminado")
        } else {
            alert("Alumno no eliminado")    
        }
    })
    .catch(error => console.log(error));

}