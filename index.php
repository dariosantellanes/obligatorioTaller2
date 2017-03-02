<?php

session_start();
include_once("config_BD.php");

//ini_set('display_errors', 1);

if (!isset($_SESSION["usuario"])) {
    $_SESSION["usuario"] = array(
        "estaLogueado" => 0,
        "nombre" => ""
    );
}

include 'smarty.php';
$smarty->assign("estaLogueado", $_SESSION["usuario"]["estaLogueado"]);
$smarty->display("index.tpl");
?>

