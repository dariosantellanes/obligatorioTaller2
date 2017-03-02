<?php

session_start();

include_once("config_BD.php");

$accion = strlen($_POST["accion"]) ? $_POST["accion"] : $_GET["accion"];

if ($accion == "login") {
    $usuario = $_POST['usuario'];
    $clave = $_POST['clave'];
    $conn->conectar();

    $sql = "SELECT * FROM usuarios WHERE usuario=:usuario AND clave=:clave";

    $datos = array(
        array("usuario", $usuario, "string"),
        array("clave", $clave, "string")
    );

    $conn->consulta($sql, $datos);
    $result = $conn->siguienteRegistro();

    $respuesta = array("ok" => true);

    if (!empty($result)) {
        $_SESSION["usuario"] = array(
            "estaLogueado" => true,
            "nombre" => $usuario
        );
    } else {
        $respuesta["ok"] = false;
    }
    $conn->desconectar();
    echo json_encode($respuesta);
    exit();
    
} 
if ($accion == "logout") {
    unset($_SESSION["usuario"]);
    session_destroy();
    header("location: index.php");
    exit();
}

?>