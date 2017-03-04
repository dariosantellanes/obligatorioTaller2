<?php

session_start();

include_once("config_BD.php");

$accion = isset($_POST["accion"]) ? $_POST["accion"] : $_GET["accion"];
$ciudadSeleccionada = $_POST["ciudadSeleccionada"] ? $_POST["ciudadSeleccionada"] : $_GET["ciudadSeleccionada"];

if ($accion == "mantenimiento-propiedades") {
    $conn->conectar();

    $sql = "SELECT * FROM ciudades";
    $conn->consulta($sql);
    $ciudades = $conn->restantesRegistros();


    $sql = "SELECT * FROM barrios WHERE ciudad_id =:idCiudad";
    $datos = array(array("idCiudad", $ciudadSeleccionada, "string"));
    $conn->consulta($sql, $datos);

    $barrios = $conn->restantesRegistros();

    $conn->desconectar();

    $datos = array("ciudades" => $ciudades,
        "barrios" => $barrios);

    echo json_encode($datos);
    exit();
} else {
    if ($accion == "cambio-ciudad") {
        $conn->conectar();

        $sql = "SELECT * FROM barrios WHERE ciudad_id =:idCiudad";
        $datos = array(array("idCiudad", $ciudadSeleccionada, "string"));
        $conn->consulta($sql, $datos);

        $barrios = $conn->restantesRegistros();

        $conn->desconectar();

        $datos = array("nuevosBarrios" => $barrios);
        echo json_encode($datos);
        exit();
    } else {
        if ($accion == "aceptar") {
            $conn->conectar();

            $sql = "INSERT * INTO propiedades(tipo,operacion,barrio_id,precio.titulo,texto,eliminado) VALUES (t,o,b,p,m,h,ban,g,ti,te,eli,motivo))";
            $datos = array(array("t", $tipoPropiedad, "string"),
                array("o", $operacion, "string"),
                array("b", $barrio, "string"),
                array("p", $precio, "string"),
                array("m", $metros-cuadrados, "string"),
                array("h", $cantidad-habitaciones, "string"),
                array("ban", $cantidad-baños, "string"),
                array("g", $garage, "string"),
                array("ti", "No hay titulo", "string"),
                array("te", "No hay texto", "string"),
                array("eli", 0, int),);
            $conn->consulta($sql, $datos);

            //$barrios = $conn->restantesRegistros();

            $conn->desconectar();

            //$datos = array("nuevosBarrios" => $barrios);
            //echo json_encode($datos);
            //exit();
        }
    }
}
?>