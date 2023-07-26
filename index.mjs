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
    let tableContent

    array.forEach((item, index) => {
        tableContent  +=  ` <tr>
            <th scop="row" class="table-background">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.boleta}</td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarAlumno('${item.id}')">Eliminar</button></td>
        </tr>`;
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