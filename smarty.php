<?php
require_once('libs/Smarty.class.php');

define('DIR', dirname($_SERVER['SCRIPT_FILENAME']));

define('TEMPLATE_DIR', DIR . '/templates/');
define('COMPILER_DIR', DIR . '/templates_c/');
define('CONFIG_DIR', DIR . '/config/');
define('CACHE_DIR', DIR . '/cache/');

$smarty = new Smarty();

//COLOCO LA DESIGNACION DE DIRECTORIOS
$smarty->template_dir = TEMPLATE_DIR;
$smarty->compile_dir = COMPILER_DIR;
$smarty->config_dir = CONFIG_DIR;
$smarty->cache_dir = CACHE_DIR;

