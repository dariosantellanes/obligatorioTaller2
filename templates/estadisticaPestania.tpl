{*Smarty*}
<!DOCTYPE html>

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