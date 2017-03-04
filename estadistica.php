<?php

session_start();

include_once("config_BD.php");


$accion = strlen($_GET["accion"]) ? $_GET["accion"] : $accion;

if (strlen($accion)) {
    if ($accion == estadistica) {
        $conn->conectar();

    $columnas = "SELECT "
            . "barrios.nombre AS nombre_barrio"
            . "FROM propiedades "
            . "INNER JOIN barrios ON propiedades.barrio_id = barrios.id "
            . "INNER JOIN ciudades ON barrios.ciudad_id = ciudades.id ";        
        
        $parametros = array(
            array("ciudad", $_GET["ciudad"]),
            array("operacion", $_GET["operacion"])
        );
        $conn->consulta($sql, $parametros);
        $result = $conn->restantesRegistros();
        $conn->desconectar();
        echo json_encode($result);
        exit();
    }
}
?>

