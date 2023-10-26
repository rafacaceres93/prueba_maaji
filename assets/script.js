const edadForm = document.getElementById("edadForm");
const fechaNacimientoInput = document.getElementById("fechaNacimiento");
const resultadoEdad = document.getElementById("resultadoEdad");
const form = document.getElementById("formRegistro");
const nombreInput = document.getElementById("nombreInput");
const apellidoInput = document.getElementById("apellidoInput");
const telefonoInput = document.getElementById("telefonoInput");
const emailInput = document.getElementById("emailInput");
const tableBody = document.getElementById("tableBody");

function getEdad(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--
    }
    return edad

}

edadForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fechaNacimiento = fechaNacimientoInput.value;
    const edad = getEdad(fechaNacimiento);
    resultadoEdad.textContent = `Edad Actual: ${edad} años`;
});

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;
    const email = emailInput.value;

    if ((nombre && apellido) || (telefono && email)) {
        const newData = { nombre, apellido, telefono, email };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    } else {
        alert("Rellene todos los campos ")
    }
});

function saveDataToLocalStorage() {
    localStorage.setItem("formData", JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = "";

    data.forEach(function (item, index) {
        const row = document.createElement("tr");
        const nombreCell = document.createElement("td");
        const apellidoCell = document.createElement("td");
        const telefonoCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        nombreCell.textContent = item.nombre || "";
        apellidoCell.textContent = item.apellido || "";
        telefonoCell.textContent = item.telefono || "";
        emailCell.textContent = item.email || "";

        editButton.textContent = "Editar";
        deleteButton.textContent = "Eliminar";

        editButton.classList.add("button", "botonEdit");
        deleteButton.classList.add("button", "botonDelete");

        editButton.addEventListener("click", function () {
            editData(index);
            alert("seguro quiere editar esta imformacion ")
        });

        deleteButton.addEventListener("click", function () {
            deleteData(index);
            alert("¿ Quieres eliminar esta imformacion ? ")
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nombreCell);
        row.appendChild(apellidoCell);
        row.appendChild(telefonoCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function editData(index) {
    const item = data[index];
    nombreInput.value = item.nombre || "";
    apellidoInput.value = item.apellido || "";
    telefonoInput.value = item.telefono || "";
    emailInput.value = item.email || "";
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
