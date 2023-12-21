document.addEventListener('DOMContentLoaded', function () {

    const marcas = document.getElementById('marcas');
    const modelo = document.getElementById('modelo');

    POBLAR_MARCAS();
    POBLAR_MODELOS();
    POBLAR_OPCIONES();

});
// función para poblar el select de marcas
function POBLAR_MARCAS() {
    let marcas = TRAER_DATOS('marcas');
    console.log(marcas);
    return marcas;
};

function POBLAR_MODELOS() {
    let modelo = TRAER_DATOS('modelo');
    console.log(modelo);
    return modelo;
};

function POBLAR_OPCIONES() {
    let opciones = TRAER_DATOS('opciones');
    console.log(opciones);
    return opciones;
};

function TRAER_DATOS(tabla) {
    let respuesta;
    const XHR = new XMLHttpRequest();
    XHR.open('GET', 'acceso_bd.php?&tabla=' + tabla, true);
    XHR.send();
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            respuesta = (JSON.parse(XHR.responseText));
            return respuesta;
        }
    }
};
