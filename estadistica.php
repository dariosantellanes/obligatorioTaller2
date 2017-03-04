<?php

session_start();

include_once("config_BD.php");

$accion = strlen($_GET["accion"]) ? $_GET["accion"] : $accion;

if (strlen($accion)) {
    if ($accion == estadistica) {
        $conn->conectar();

        $sql = "SELECT "
                . "barrios.nombre AS barrio "
                . ",COUNT(*) AS cantidad "
                . ",SUM(propiedades.precio) AS ppromedio "
                . ",SUM(propiedades.mts2) AS mts2promedio "
                . "FROM propiedades "
                . "INNER JOIN barrios ON propiedades.barrio_id = barrios.id "
                . "INNER JOIN ciudades ON barrios.ciudad_id = ciudades.id "
                . "WHERE ciudades.id=:ciudad AND propiedades.operacion=:operacion "
                . "GROUP BY barrio";

        $parametros = array(
            array("ciudad", $_GET["ciudad"]),
            array("operacion", $_GET["operacion"]),
        );
        $conn->consulta($sql, $parametros);
        $result = $conn->restantesRegistros();
        $conn->desconectar();
        echo json_encode($result);
        exit();
    }
}
?>

