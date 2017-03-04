function inicializar() {

    inicioCarrusel();
    iniciarValidacionFormularios();

    $(".oculto").hide();

    $("#busqueda_boton_mostrar").click(function () {
        $(".oculto").hide();
        $("#busqueda_pestania").show();
        $("#busqueda_resultado").empty();
    });

    $("#estadistica_boton_mostrar").click(function () {
        $(".oculto").hide();
        $("#estadistica_pestania").show();
        $("#estadistica_resultado").empty();
    });

    //codigo daniel

    $("#mantenimiento_propiedades_boton").click(function () {
        $("#mantenimientoPropiedades").show();

        $.ajax({
            type: "POST",
            url: "mantenimientoPropiedades.php",
            dataType: 'json',
            data: {accion: "mantenimiento-propiedades", ciudadSeleccionada: "1"}
        }).done(function (datos) {

            cargarSelectCiudad(datos.ciudades);
            cargarSelectBarrios(datos.barrios);
        });
    });

    $("#btnAgregarPropiedad").click(function () {
        $("#opcion-AgregarMantenimiento").show();
    });

    $("#ciudad").change(function () {
        $.ajax({
            type: "POST",
            url: "mantenimientoPropiedades.php",
            dataType: 'json',
            data: {accion: "cambio-ciudad", ciudadSeleccionada: this.value}
        }).done(function (datos) {

            cargarSelectBarrios(datos.nuevosBarrios);
        });
    });

    $("#btnAceptarMantenimiento").click(function () {
        todosLosCamposCorrectos();
        if (todosLosCamposCorrectos()) {
            $.ajax({
                type: "POST",
                url: "mantenimientoPropiedades.php",
                dataType: 'json',
                data: {accion: "aceptar",
                    tipoPropiedad: $("#tipo-propiedad").val().charAt(0),
                    operacion: $("#operacion").val().charAt(0),
                    ciudad: $("#ciudad").val(),
                    barrio: $("#barrio").val(),
                    precio: $("#precio").val(),
                    metrosCuadrados: $("#metros-cuadrados").val(),
                    cantidadHabitaciones: $("#cantidad-habitaciones").val(),
                    cantidadBaños: $("#cantidad-baños").val(),
                    garage: $("#garage").val()
                }
            }).done(function (datos) {


            });
        } else {
            alert("Incorrecto");
        }

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

    li.append($("<a href=#></a>").text(p.titulo));
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
    if (p.texto.length > 150) {
        li.append($("<p />").text("Descripción: " + p.texto.substring(0, 150) + "..."));
    } else {
        li.append($("<p />").text("Descripción: " + p.texto));
    }

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
        $("#busqueda_resultado").append($("<div id=" + divBusquedaOrden + "/>").append($("<div><span>Ordenar Por:</span><div/>")).append(lstOrden));
        $("#busqueda_resultado").append($("<div id=" + divBusquedaPropiedades + "/>").append(lstPropiedades));
        $("#busqueda_resultado").append($("<div id=" + divBusquedaNavegacion + "/>").append(lstNavegacion));

        //ordenamiento
        var ordenarMts2Asc = $("<label>").text("Ascendente mts2").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '1'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 1;
                cargarPropiedades(parametros);
            }
        }));

        var ordenarMts2Desc = $("<label>").text("Descendente mts2").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '2'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 2;
                cargarPropiedades(parametros);

            }
        }));

        var ordenarPrecioAsc = $("<label>").text("Ascendente precio").prepend($('<input/>').attr({
            type: "radio",
            name: "orden",
            value: '3'
        }).change(function () {
            if (this.checked) {
                parametros["orden"] = 3;
                cargarPropiedades(parametros);

            }
        }));

        var ordenarPrecioDesc = $("<label>").text("Descendente precio").prepend($('<input/>').attr({
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
        lstNavegacion.append($("<li>").append(paginaPrimera));
        lstNavegacion.append($("<li>").append(paginaAnterior));
        lstNavegacion.append($("<li>").append(paginaNumero));
        lstNavegacion.append($("<li>").append(paginaSiguiente));
        lstNavegacion.append($("<li>").append(paginaUltima));
    }).fail({
        //hacer
    });
}

function cargarEstadisticas(parametros) {
    if (!parametros["accion"]) {
        parametros["accion"] = "estadistica";
    }
    $.ajax({
        type: "GET",
        url: "estadistica.php",
        dataType: 'json',
        //timeout: 5000,
        data: parametros
    }).done(function (datos) {
        console.log(datos);
    });
}

function cargarSelectCiudad(listaCiudades) {
    $("#ciudad").empty();
    for (i in listaCiudades) {
        var ciudad = listaCiudades[i];
        var opcion = $("<option />");
        opcion.attr("value", ciudad["id"]);
        opcion.text(ciudad["nombre"]);

        $("#ciudad").append(opcion);

    }
}

function cargarSelectBarrios(listaBarrios) {
    $("#barrio").empty();
    for (i in listaBarrios) {
        var barrio = listaBarrios[i];
        var opcion = $("<option />");
        opcion.attr("value", barrio["id"]);
        opcion.text(barrio["nombre"]);

        $("#barrio").append(opcion);

    }
}

function cargarSelectHabitacionesBaños(idSelectAcargar) {
    for (var i = 1; i <= 100; i++) {
        var opcion = $("<option />");
        opcion.attr("value", i);
        opcion.text(i);
        $("#" + idSelectAcargar).append(opcion);
    }
}

function todosLosCamposCorrectos() {
    var valorPrecio = $("#precio").val();
    var valorMetrosCuadrados = $("#metros-cuadrados").val();

    if (validaCampoVacio(valorPrecio) && validaCampoVacio(valorMetrosCuadrados)) {
        if (!isNaN(valorPrecio) && !isNaN(valorMetrosCuadrados)) {
            return true;
        }
    }

    return false;
}

//Retorna true si el campo no es vacio
function validaCampoVacio(campo) {
    
    if(campo.trim().length==0){
        return false;
    }
    
    return true;
}