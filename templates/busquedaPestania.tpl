{*Smarty*}
<!DOCTYPE html>

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