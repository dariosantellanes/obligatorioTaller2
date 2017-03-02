function inicializar() {


    iniciarValidacionFormularios();

    $(".oculto").hide();

    $("#busqueda_boton_mostrar").click(function () {
        $(".oculto").hide();
        $("#busqueda_pestania").show();
        $("#busqueda_resultado").empty();
    });
}

function vecSerAObjeto(vectorSerializado) {
    objeto = {};
    for (var i = 0; i < vectorSerializado.length; i++) {
        objeto[vectorSerializado[i]['name']] = vectorSerializado[i]['value'];
    }
    return objeto;
}


function generarItemCatalogo(p) {
    var li = $("<li />");

    li.append($("<h3 />").text(p.titulo));
    if (p.operacion == "A") {
        li.append($("<span />").text("Precio: " + p.precio + "$"));
    } else {
        li.append($("<span />").text("Precio: " + p.precio + "U$D"));
    }
    li.append($("<span />").text("Banios: " + p.banios));
    li.append($("<span />").text("Metros Cuadrados: " + p.mts2));
    li.append($("<span />").text("Habitaciones: " + p.habitaciones));
    if (p.garage == 1) {
        li.append($("<span />").text("Garage: Si"));
    } else {
        li.append($("<span />").text("Garage: No"));

    }

    li.append($("<span />").text("Barrio: " + p.nombre_barrio));
    li.append($("<span />").text("Ciudad: " + p.nombre_ciudad));
    li.append($("<p />").text("Descripción: " + p.texto));

    return li;
}

function poblarSelector(datos, selector, defecto) {
    selector.empty();
    selector.append($("<option />").val("").text(defecto));
    if (datos != null) {
        for (i = 0; i < datos.length; i++) {
            selector.append($("<option />").val(datos[i].value).text(datos[i].text));
        }
    }
}

function iniciarSelectoresBusqueda(selCiudad, selBarrio) {
    $.ajax({
        type: "GET",
        url: "busqueda.php",
        dataType: 'json',
        //timeout: 5000,
        data: {accion: "poblarCiudades"}
    }).done(function (datos) {
        poblarSelector(datos, selCiudad, "----Ciudad----");
    }).fail(function () {
        poblarSelector(null, selCiudad, "----Ciudad----");
        //mas cosas
    }).always(function () {
        selCiudad.change();
    });

    selCiudad.change(function () {
        var ciudad = $(this).val();
        $.ajax({
            type: "GET",
            url: "busqueda.php",
            dataType: 'json',
            //timeout: 5000,
            data: {accion: "poblarBarrios", ciudad: ciudad}
        }).done(function (datos) {
            poblarSelector(datos, selBarrio, "----Barrio----");
        }).fail(function () {
            poblarSelector(null, selBarrio, "----Barrio----");
            //mas cosas
        });
    });

}
function cargarPropiedades(parametros) {
    var divBusquedaOrden = "busqueda_resultado_orden";
    var divBusquedaPropiedades = "busqueda_resultado_propiedades"
    var divBusquedaNavegacion = "busqueda_resultado_navegacion"


    if (!parametros["pagina"]) {
        parametros["pagina"] = 1;
    }
    $.ajax({
        type: "GET",
        url: "busqueda.php",
        dataType: 'json',
        //timeout: 5000,
        data: parametros
    }).done(function (datos) {

        var lstOrden = $("<ul/>");
        var lstPropiedades = $("<ul/>");
        var lstNavegacion = $("<ul/>");

        $("#busqueda_resultado").empty();
        $("#busqueda_resultado").append($("<div id=" + divBusquedaOrden + "/>").append(lstOrden));
        $("#busqueda_resultado").append($("<div id=" + divBusquedaPropiedades + "/>").append(lstPropiedades));
        $("#busqueda_resultado").append($("<div id=" + divBusquedaNavegacion + "/>").append(lstNavegacion));

        //ordenamiento
        var ordenarMts2Asc = $("<label>").text("Orden ascendente mts2").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '1'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 1;
                cargarPropiedades(parametros);
            }
        }));

        var ordenarMts2Desc = $("<label>").text("Orden descendente mts2").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '2'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 2;
                cargarPropiedades(parametros);

            }
        }));

        var ordenarPrecioAsc = $("<label>").text("Orden ascendente precio").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '3'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 3;
                cargarPropiedades(parametros);

            }
        }));

        var ordenarPrecioDesc = $("<label>").text("Orden descendente precio").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '4'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 4;
                cargarPropiedades(parametros);

            }
        }));

        lstOrden.append($("<li>").append(ordenarMts2Asc));
        lstOrden.append($("<li>").append(ordenarMts2Desc));
        lstOrden.append($("<li>").append(ordenarPrecioAsc));
        lstOrden.append($("<li>").append(ordenarPrecioDesc));

        //settear checkeado el radio de valor datos.orden
        $(lstOrden.find(":input[name=orden][value=" + datos.orden + "]")).attr({
            checked: true
        });

        //propiedades
        for (i = 0; i < datos.propiedades.length; i++) {
            lstPropiedades.append(generarItemCatalogo(datos.propiedades[i]));
        }

        //navegacion
        var paginaPrimera = $('<input/>').attr({
            type: "button",
            name: "primera",
            value: 'primera'
        }).click(function () {
            parametros["pagina"] = 1;
            cargarPropiedades(parametros);
        });
        var paginaAnterior = $('<input/>').attr({
            type: "button",
            name: "anterior",
            value: 'anterior'
        }).click(function () {
            parametros["pagina"] = datos.paginaAnterior;
            cargarPropiedades(parametros);
        });
        var paginaNumero = $('<span/>').text(parametros["pagina"]);
        var paginaSiguiente = $('<input/>').attr({
            type: "button",
            name: "siguiente",
            value: 'siguiente'
        }).click(function () {
            parametros["pagina"] = datos.paginaSiguiente;
            cargarPropiedades(parametros);
        });
        var paginaUltima = $('<input/>').attr({
            type: "button",
            name: "ultima",
            value: 'ultima'
        }).click(function () {
            parametros["pagina"] = datos.paginaUltima;
            cargarPropiedades(parametros);
        });
        lstNavegacion.append(paginaPrimera);
        lstNavegacion.append(paginaAnterior);
        lstNavegacion.append(paginaNumero);
        lstNavegacion.append(paginaSiguiente);
        lstNavegacion.append(paginaUltima);
    });
}
