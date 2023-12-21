<?php
    //usar esta cabecera para trabajar con datos de la BD
    header("Content-Type: application/json; charset=UTF-8");
    error_reporting(0);
    //capturamos un objeto, estamos recibiendo el objeto de la BD   
    // $objeto = json_decode($_POST["objeto"], false);
    
    //Parámetro de conexion de la BD por defecto
    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $bbdd = "coches";

    //Creamos la conexión a la BD
    $conexion = new mysqli($servidor, $usuario, $password, $bbdd);

    //Comprobamos la conexion
    if ($conexion -> connect_error) {
        die("Error en la conexion: " + $conexion -> connect_error);
    }
    else {  //conexión correcta
        //Creamos la consulta SQL

        $tabla = $_GET['tabla'];

        $sql = "SELECT * FROM " . $tabla ;
        
        $resultado = $conexion ->query($sql);
        $salida = [];
        $salida = $resultado->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($salida);
    }
    $conexion->close();
?>