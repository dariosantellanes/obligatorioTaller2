{*Smarty*}
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Altavista Inmobiliaria</title>
        <link rel="stylesheet" href="css/estilos.css" type="text/css"/>
        <link rel="stylesheet" href="css/estilosDelCarrusel.css" type="text/css"/>
        <script type="text/javascript" src="js/funciones.js"></script>
        <script type="text/javascript" src="js/validaciones.js"></script>
        <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
        <script type="text/javascript" src="js/jquery.validate.min"></script>
        <script type="text/javascript" src="js/additional-methods.min"></script>
        <script type="text/javascript" src="js/funcionesDelCarrusel.js"></script>
        <script type = "text/javascript" >
            $(document).ready(inicializar);
        </script> 
    </head>

    <body>
        <div id="menu">
            <ul class="nivel-principal">
                <li><button id="inicio_boton_mostrar" class="boton">Inicio</button></li>
                <li>
                    <button id="propiedades_boton_mostrar" class="boton">Propiedades</button>
                    <ul class="primer-nivel">
                        <div id="propiedades">
                            <li><button id="busqueda_boton_mostrar" class="boton">Busqueda</button></li>
                            <li><button id="estadistica_boton_mostrar" class="boton">Estadistcas</button></li>
                        </div>
                    </ul>
                </li>


                {if {$estaLogueado==0}}

                    <li>
                        <button id="ingreso_boton_mostrar" class="boton">Ingresar</button>
                        <ul class="primer-nivel">
                            <div id = "ingreso">
                                <form id="ingreso_form">
                                    <div>
                                        <input class="campo" type="text" name="usuario" placeholder="Nombre de usuario" />
                                    </div>
                                    <div>
                                        <input class="campo" type = "password" name="clave" placeholder="Contraseña" />
                                    </div>
                                    <div>
                                        <button  type="submit" class="boton">Ingresar</button>
                                    </div>
                                </form>
                                <div id="ingreso_form_msg" class="msg-error"><ul></ul></div>
                            </div>
                        </ul>
                    </li>
                {else}
                    <li><button id="mantenimiento_boton_mostrar" class="boton">Mantenimiento de propiedades</button></li>
                    <li><button id="responder_preguntas_boton_mostrar" class="boton">Responder pregunas</button></li>
                    <li>
                        <form action = "login.php" method = "post">
                            <input type = "hidden" name = "accion" value = "logout" />
                            <button class="boton" type = "submit">Salir</button>
                        </form>
                    </li>
                {/if}
            </ul>
        </div>

        <div id="carrusel">
            <div id="icono-next" class="next flechas" ></div>
            <div id="icono-previous" class="previous flechas"></div>    
            <div id="caja-imagenes">
                <div id="thumbs">
                    <!--Se cargan los numeros desde el javaScript con el metodo cargarNumeros(desdeCantidadNumeros,hastaCantidadNumero)-->
                </div>
                <img id="casa-1" class="imagenesCasas" src="img/ImagenesDeCasas/casa1.jpg" alt="Imágen de casa en venta">
            </div>
        </div>

        <div id="contenido">
            {include file="busquedaPestania.tpl"}
            {include file="estadisticaPestania.tpl"}
            {include file="mantenimientoPestania.tpl"}
        </div>

    </body>
</html>
