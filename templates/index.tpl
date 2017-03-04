{*Smarty*}
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Altavista Inmobiliaria</title>
        <link rel="stylesheet" href="css/estilos.css" type="text/css"/>
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
                    <li><button id="mantenimiento_propiedades_boton" class="boton">Mantenimiento de propiedades</button></li>
                    <li><button id="responder_preguntas_boton" class="boton">Responder pregunas</button></li>
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
            <div id="busqueda_pestania" class="oculto clearfix" hidden>
                <div id="busqueda">
                    <form id="busqueda_form">
                        <table>
                            <tr>
                                <td>Operacion(*):</td>
                                <td> 
                                    <div class="seleccion">
                                        <div>
                                            <input type="radio" value="A" name="operacion">Alquiler
                                        </div>
                                        <div>
                                            <input type="radio" value="V" name="operacion">Venta
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Ciudad(*):</td>
                                <td>
                                    <div class="seleccion">
                                        <select name="ciudad"></select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Barrio:</td>
                                <td>
                                    <div class="seleccion">
                                        <select name="barrio"></select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Tipo de propiedad:</td>
                                <td>
                                    <div class="seleccion">
                                        <div>
                                            <input type="radio" value="C" name="tipo">Casa
                                        </div>
                                        <div>
                                            <input type="radio" value="A" name="tipo">Apartamento
                                        </div>
                                        <div>
                                            <input type="radio" value="" name="tipo">Indistinto
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Habitaciones:</td>
                                <td>
                                    <input type="text" name="habitaciones" class="campo">
                                </td>
                            </tr>
                            <tr>
                                <td>Precio Desde:</td>
                                <td>
                                    <input type="text" name="precioDesde" class="campo">
                                </td>
                            </tr>
                            <tr>
                                <td>Precio Hasta:</td>
                                <td>
                                    <input type="text" name="precioHasta" class="campo">
                                </td>
                            </tr>
                            <tr>
                                <td>Posee Garage:</td>
                                <td>
                                    <div class="seleccion">
                                        <div>
                                            <input type="radio" value="1" name="garage">Si
                                        </div>
                                        <div>
                                            <input type="radio" value="0" name="garage">No
                                        </div>
                                        <div>
                                            <input type="radio" value="" name="garage">Indistinto
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit">Buscar</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <div id="busqueda_form_msg" class="msg-error"><ul></ul></div>
                </div>
                <div id="busqueda_resultado"></div>    
            </div>
            <div id="estadistica_pestania" class="oculto clearfix" hidden>
                <div id="estadistica">
                    <form id="estadistica_form">
                        <table>
                            <tr>
                                <td>Operacion(*):</td>
                                <td> 
                                    <div class="seleccion">
                                        <div>
                                            <input type="radio" value="A" name="operacion">Alquiler
                                        </div>
                                        <div>
                                            <input type="radio" value="V" name="operacion">Venta
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Ciudad(*):</td>
                                <td>
                                    <div class="seleccion">
                                        <select name="ciudad"></select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit">Buscar</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <div id="estadistica_form_msg" class="msg-error"><ul></ul></div>
                </div>
                <div id="estadistica_resultado"></div>    
            </div>            
            <div id="mantenimientoPropiedades" class="oculto" hidden>
                {include file="mantenimientoPropiedades.tpl"}
            </div>
        </div>

    </body>
</html>
