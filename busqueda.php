<?php

session_start();

include_once("config_BD.php");

$cantidadElementosPorPagina = 10;

$pagina = strlen($_GET["pagina"]) ? $_GET["pagina"] : 1;
$orden = strlen($_GET["orden"]) ? $_GET["orden"] : 0;

if (strlen($pagina)) {

    $conn->conectar();

    $parametros = array();

    $conteo = "SELECT "
            . "COUNT(*) AS cantidad ";

    $columnas = "SELECT "
            . "propiedades.tipo, "
            . "propiedades.operacion, "
            . "propiedades.precio, "
            . "propiedades.mts2, "
            . "propiedades.habitaciones, "
            . "propiedades.banios, "
            . "propiedades.garage, "
            . "propiedades.titulo, "
            . "propiedades.texto, "
            . "barrios.nombre AS nombre_barrio, "
            . "ciudades.nombre AS nombre_ciudad ";


    $limite = " LIMIT :offset, :cantidad";

    $sql = "FROM propiedades "
            . "INNER JOIN barrios ON propiedades.barrio_id = barrios.id "
            . "INNER JOIN ciudades ON barrios.ciudad_id = ciudades.id ";

    if (strlen($_GET["operacion"])) {
        $sql = $sql . " WHERE " . "propiedades.operacion = :operacion";
        array_push($parametros, array("operacion", $_GET["operacion"], "int"));
    }
    if (strlen($_GET["ciudad"])) {
        $sql = $sql . " AND " . "ciudades.id = :ciudad";
        array_push($parametros, array("ciudad", $_GET["ciudad"], "int"));
    }
    if (strlen($_GET["barrio"])) {
        $sql = $sql . " AND " . "barrios.id = :barrio";
        array_push($parametros, array("barrio", $_GET["barrio"], "int"));
    }
    if (strlen($_GET["tipo"])) {
        $sql = $sql . " AND " . "propiedades.tipo = :tipo";
        array_push($parametros, array("tipo", $_GET["tipo"], "int"));
    }
    if (strlen($_GET["habitaciones"])) {
        $sql = $sql . " AND " . "propiedades.habitaciones = :habitaciones";
        array_push($parametros, array("habitaciones", $_GET["habitaciones"], "int"));
    }
    if (strlen($_GET["precioDesde"])) {
        $sql = $sql . " AND " . "propiedades.precio >= :precioDesde";
        array_push($parametros, array("precioDesde", $_GET["precioDesde"], "int"));
    }
    if (strlen($_GET["precioHasta"])) {
        $sql = $sql . " AND " . "propiedades.precio <= :precioHasta";
        array_push($parametros, array("precioHasta", $_GET["precioHasta"], "int"));
    }
    if (strlen($_GET["garage"])) {
        $sql = $sql . " AND " . "propiedades.garage = :garage";
        array_push($parametros, array("garage", $_GET["garage"], "int"));
    }
    if (strlen($_GET["orden"])) {
        if ($_GET["orden"] == 1) {
            $sql = $sql . " ORDER BY propiedades.mts2 ASC";
        }
        if ($_GET["orden"] == 2) {
            $sql = $sql . " ORDER BY propiedades.mts2 DESC";
        }
        if ($_GET["orden"] == 3) {
            $sql = $sql . " ORDER BY propiedades.precio ASC";
        }
        if ($_GET["orden"] == 4) {
            $sql = $sql . " ORDER BY propiedades.precio DESC";
        }
    }


    $conn->consulta($conteo . $sql, $parametros);
    $result = $conn->siguienteRegistro();

    $cantidad = (int) $result["cantidad"];

    $paginaUltima = ceil($cantidad / $cantidadElementosPorPagina);
    $paginaSiguiente = ($pagina == $paginaUltima) ? $paginaUltima : $pagina + 1;
    $paginaAnterior = ($pagina == 1) ? 1 : $pagina - 1;


    array_push($parametros, array("offset", ($pagina - 1) * $cantidadElementosPorPagina, "int"));
    array_push($parametros, array("cantidad", $cantidadElementosPorPagina, "int"));

    $pepe = $columnas . $sql . $limite;
    $conn->consulta($pepe, $parametros);


    $result = $conn->restantesRegistros();
    $datos = array("propiedades" => $result
        , "paginaActual" => $pagina
        , "paginaUltima" => $paginaUltima
        , "paginaSiguiente" => $paginaSiguiente
        , "paginaAnterior" => $paginaAnterior
        , "orden" => $orden
    );

    $conn->desconectar();
    echo json_encode($datos);
    exit();
}
?>

