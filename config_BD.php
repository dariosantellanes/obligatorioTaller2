<?php

include_once 'libs/class.Conexion.BD.php';

define('HOST', 'localhost');
define('BASE', 'inmobiliaria');
define('USUARIO', 'root');
define('CLAVE', 'root');

$conn = new ConexionBD('mysql', HOST, BASE, USUARIO, CLAVE);

?>