<?php

session_start();

include_once("config_BD.php");

$accion = strlen($_GET["accion"]) ? $_GET["accion"] : $accion;

if (strlen($accion)) {
    if ($accion == poblarCiudades) {
        $conn->conectar();
        $sql = "SELECT ciudades.id AS value, ciudades.nombre AS text FROM ciudades ORDER BY ciudades.nombre";
        $conn->consulta($sql);
        $result = $conn->restantesRegistros();
        $conn->desconectar();
        echo json_encode($result);
        exit();
    }
    if ($accion == poblarBarrios) {
        $conn->conectar();
        $sql = "SELECT barrios.id AS value, barrios.nombre AS text FROM barrios WHERE barrios.ciudad_id = :ciudad ORDER BY barrios.nombre";

        $parametros = array(
            array("ciudad", $_GET["ciudad"]),
        );
        $conn->consulta($sql, $parametros);
        $result = $conn->restantesRegistros();
        $conn->desconectar();
        echo json_encode($result);
        exit();
    }
}
?>

