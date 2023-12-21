document.addEventListener("DOMContentLoaded", function () {
    const marcasSelect = document.getElementById("marcas");
    const modeloSelect = document.getElementById("modelo");

    populateMarcas(marcasSelect);

    marcasSelect.addEventListener("change", function () {
        const idMarca = marcasSelect.value || "";
        switch (idMarca) {
            case "":
                modeloSelect.innerHTML = "";
                modeloSelect.dispatchEvent(new Event("change"));
                break;
            default:
                populateModelos(modeloSelect, idMarca);
        }
    });

    modeloSelect.addEventListener("change", function () {
        const idModelo = modeloSelect.value || "";
        switch (idModelo) {
            case "":
                if (undefined != document.getElementById("opciones")) {
                    document.getElementById("opciones").remove();
                    document.getElementById("etiq_opciones").remove();
                }
                break;
            default:
                populateOpciones(idModelo);
        }
    });
});

function populate(objetoSelect, lista, campoId, campoNombre) {
    objetoSelect.innerHTML = "";
    const opcion = document.createElement("option");
    opcion.value = "";
    opcion.innerHTML = "Seleccione una opción";
    objetoSelect.appendChild(opcion);

    for (let i = 0; i < lista.length; i++) {
        const opcion = document.createElement("option");
        opcion.value = lista[i][campoId];
        opcion.innerHTML = lista[i][campoNombre];
        objetoSelect.appendChild(opcion);
    }
}

function populateMarcas(marcasSelect) {
    fetchData("marcas").then(function (listaMarcas) {
        populate(marcasSelect, listaMarcas, "id_marca", "nombre");
    });
}

function populateModelos(modeloSelect, idMarca) {
    fetchData("modelo").then(function (listaModelos) {
        const listaModelosFiltrada = listaModelos.filter(function (modelo) {
            if (modelo.id_marca == idMarca) {
                return true;
            }
        });

        populate(modeloSelect, listaModelosFiltrada, "id_modelo", "modelo");
    });
}

function populateOpciones(idModelo) {
    if (undefined == document.getElementById("opciones")) {
        const etiqueta = document.createElement("label");
        etiqueta.id = "etiq_opciones";
        etiqueta.htmlFor = "opciones";
        etiqueta.innerHTML = "Opciones: ";
        const opcionesSelect = document.createElement("select");
        opcionesSelect.id = "opciones";
        opcionesSelect.name = "opciones";
        document.body.appendChild(etiqueta);
        document.body.appendChild(opcionesSelect);
    }
    fetchData("opciones").then(function (listaOpciones) {
        const listaOpcionesFiltrada = listaOpciones.filter(function (opcion) {
            if (opcion.id_modelo == idModelo) {
                return true;
            }
        });
        if (
            undefined != document.getElementById("opciones") &&
            document.getElementById("opciones")
        ) {
            populate(
                document.getElementById("opciones"),
                listaOpcionesFiltrada,
                "id_opcion",
                "nombre"
            );
        }
    });
}

function fetchData(tabla) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "acceso_bd.php?tabla=" + tabla, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const respuesta = JSON.parse(xhr.responseText);
                    resolve(respuesta);
                } else {
                    reject("Error en la solicitud");
                }
            }
        };
    });
}
