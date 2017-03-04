{*Smarty*}
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Altavista Inmobiliaria</title>
        <link rel="stylesheet" href="css/estilos.css" type="text/css"/>
        <link rel="stylesheet" href="css/estilosDelCarrusel.css" type="text/css"/>
        <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
        <script type="text/javascript" src="js/funciones.js"></script>
        <script type="text/javascript" src="js/funcionesDelCarrusel.js"></script>
        <script type = "text/javascript">
            $(document).ready(inicializar);
        </script> 
    </head>

    <body>
        <div id="listadoOpcionesMantenimiento">
            <ul>
                <li><button id="btnAgregarPropiedad">Agregar propiedad</button></li>
                <li><button>Editar propiedad</button></li>
                <li><button>Dar de baja propiedad</button></li>
            </ul>
        </div>

        <div id="caja-opcionMantenimiento">
            <div id="opcion-AgregarMantenimiento">

                <table id="datos-extas">

                    <tr>
                        <td>
                            <label>Indique el tipo de propiedad: </label>
                        </td>
                        <td>
                            <select size ="1" id="tipo-propiedad"> 
                                <option>Casa</option>
                                <option>Apartamento</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Operacion:</label>
                        </td>
                        <td>
                            <select size ="1" id="operacion"> 
                                <option>Alquiler</option>
                                <option>Venta</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Ciudad: </label>
                        </td>
                        <td><select size ="1" id="ciudad"> 
                                <!--Se cargan con las ciudades de la base de datos(cargarSelectCiudad(listaCiudades))-->
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Barrio: </label>
                        </td>
                        <td><select size ="1" id="barrio"> 
                                <!--Se cargan con los barrios de la base de datos de la ciudad seleccionada(cargarSelectCarrio(listaBarrios))-->
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Precio:
                        </td>
                        <td>
                            <input type="text" id="precio" placeholder="Ingrese el precio">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Metros cuadrados:
                        </td>
                        <td>
                            <input type="text" id="metros-cuadrados" placeholder="Ingrese los metros cuadrados">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Cantidad de habitaciones:
                        </td>
                        <td>
                            <select id="cantidad-habitaciones">
                                <!--Se cargan automaticamente en funciones cargarSelectHabitacionesBaños(idSelectAcargar)-->
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Cantidad de baños:
                        </td>
                        <td>
                            <select id="cantidad-baños">
                                <!--Se cargan automaticamente en funciones cargarSelectHabitacionesBaños(idSelectAcargar)-->
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Garage:
                        </td>
                        <td>
                            <input type="checkbox" id="garage">
                        </td>
                    </tr>
                    
                    <tr>
                        <td><input type="button" id="btnAceptarMantenimiento" value="Aceptar"></td>
                        <td><input type="button" id="btnCancelarMantenimiento" value="Cancelar"></td>
                            
                        </tr>
                </table>

            </div>
        </div>
    </body>
</html>
