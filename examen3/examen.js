document.addEventListener('DOMContentLoaded', () => {
    
    const MARCAS = document.getElementById('marcas');
    const MODELOS = document.getElementById('modelo');

    MODELOS.disabled = true;

    PopulateMarcas(MARCAS);

    MARCAS.addEventListener('change', () => {
        if (MARCAS.value != '') {
            MODELOS.disabled = false;
            MODELOS.innerHTML = '';
            PopulateModelos(MODELOS, MARCAS.value);
        } else {
            MODELOS.disabled = true;
            MODELOS.innerHTML = '';
            MODELOS.value = '';
        }
    });

    MODELOS.addEventListener('change', () => {
        if (MODELOS.value != '') {
            if ('undefined' == typeof(OPCIONES)){
                const OPCIONES = document.createElement('select');
                OPCIONES.id = 'opciones';
                OPCIONES.name = 'opciones';
                MODELOS.parentNode.appendChild(OPCIONES);                
                PopulateOpciones(OPCIONES, MODELOS.value);
            }
        }else{
            console.log(typeof(OPCIONES));

            if (document.getElementById('opciones') != null){
                (document.getElementById('opciones') != null).parentNode.removeChild(document.getElementById('opciones'));
            }
        }
    });

});

const LoadData = (table) => {
    return new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        XHR.open('POST', './acceso_bd.php', true);
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XHR.send('table=' + table);
        XHR.onreadystatechange = () => {
            if (XHR.readyState == 4 && XHR.status == 200) {
                resolve(JSON.parse(XHR.responseText));
            }
        }
    });
}

const createInitialOption = (selectObject) => {
    const OPTION = document.createElement('option');
    OPTION.value = '';
    OPTION.text = 'Seleccione una opción';
    selectObject.appendChild(OPTION);
}

const CreateOptions = (selectObject, table, filterName = "", filerValue = "", idField, idName) => {
    const DATA = LoadData(table).then((data) => {
        const lista = [];
        if (filterName != "") {
            data.forEach(element => {
                if (element[filterName] == filerValue) {
                    lista.push(element);
                }
            });
            data = lista;
        }
        
        createInitialOption(selectObject);
        data.forEach(element => {
            const OPTION = document.createElement('option');
            OPTION.value = element[idField];
            OPTION.text = element[idName];
            selectObject.appendChild(OPTION);
        });
    });
}

const PopulateMarcas = (MARCAS) => {
    CreateOptions(MARCAS, 'marcas', '', '', 'id_marca', 'nombre');
}

const PopulateModelos = (MODELOS, id_marca = '') => {
    CreateOptions(MODELOS, 'modelo', 'id_marca', id_marca, 'id_modelo', 'modelo');
}
const PopulateOpciones = (OPCIONES, id_modelo = '') => {
    CreateOptions(OPCIONES, 'opciones', 'id_modelo', id_modelo, 'cod_opcion', 'nombre');
}
