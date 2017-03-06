function inicializar() {

    ingresoForm = $("#ingreso_form");
    ingresoFormMsg = $("#ingreso_form_msg");

    busquedaForm = $("#busqueda_form");
    busquedaFormMsg = $("#busqueda_form_msg");

    estadisticaForm = $("#estadistica_form");
    estadisticaFormMsg = $("#estadistica_form_msg");

    iniciarCarrusel();
    iniciarValidacionFormularios();
    iniciarSelectores();

    $(".oculto").hide();
    $("#inicio_pestania").show();


    $("#inicio_boton_mostrar").click(function () {
        $(".oculto").hide();
        $("#inicio_pestania").show();
    });

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

    $("#mantenimiento_boton_mostrar").click(function () {
        $(".oculto").hide();
        $("#mantenimientoPropiedades").show();

        $.ajax({
            type: "POST",
            url: "mantenimiento.php",
            dataType: 'json',
            data: {accion: "mantenimiento-propiedades", ciudadSeleccionada: "1"}
        }).done(function (datos) {
            cargarSelectCiudad(datos.ciudades);
            cargarSelectBarrios(datos.barrios);
        });
    });

    $("#btnAgregarPropiedad").click(function () {
        $("#opcion-AgregarPropiedad").show();
    });



    $("#btnAceptarMantenimiento").click(function () {
        todosLosCamposCorrectos();
        if (todosLosCamposCorrectos()) {
            $.ajax({
                type: "POST",
                url: "mantenimiento.php",
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

    $("#btnEditarPropiedad").click(function () {
        $("#opcion-EditarPropiedad").show();
        cargarPropiedadesEdicion({});
    });
}


function cargarPropiedadesBusqueda(parametros) {
    var divContenedor = $("#busqueda_resultado");

    $.ajax({
        type: "GET",
        url: "busqueda.php",
        dataType: 'json',
        //timeout: 5000,
        data: parametros
    }).done(function (datos) {

        $(divContenedor).empty();

        var divOrden = $("<div/>").attr({
            id: divContenedor.attr('id') + "_orden"
        });

        var divPropiedades = $("<div/>").attr({
            id: divContenedor.attr('id') + "_propiedades"
        });

        var divNavegacion = $("<div/>").attr({
            id: divContenedor.attr('id') + "_navegacion"
        });

        $(divOrden).append($("<span>Ordenar Por:</span>"));

        $(divOrden).append(generarOrdenamiento(datos.orden, parametros, cargarPropiedadesBusqueda));
        $(divPropiedades).append(generarCatalogoBusqueda(datos.propiedades));
        $(divNavegacion).append(generarNavegacion(datos.navegacion, parametros, cargarPropiedadesBusqueda));


        $(divContenedor).append($(divOrden));
        $(divContenedor).append($(divPropiedades));
        $(divContenedor).append($(divNavegacion));
    }).fail({
        //hacer
    });
}

function cargarPropiedadesEdicion(parametros) {

    var divContenedor = $("#opcion-EditarPropiedad").empty();

    $.ajax({
        type: "GET",
        url: "busqueda.php",
        dataType: 'json',
        //timeout: 5000,
        data: parametros
    }).done(function (datos) {

        $(divContenedor).empty();


        var divPropiedades = $("<div/>").attr({
            id: divContenedor.attr('id') + "_propiedades"
        });

        var divNavegacion = $("<div/>").attr({
            id: divContenedor.attr('id') + "_navegacion"
        });

        $(divPropiedades).append(generarCatalogoEdicion(datos.propiedades));
        $(divNavegacion).append(generarNavegacion(datos.navegacion, parametros, cargarPropiedadesEdicion));

        $(divContenedor).append($(divPropiedades));
        $(divContenedor).append($(divNavegacion));

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

    if (campo.trim().length == 0) {
        return false;
    }

    return true;
}

function generarOrdenamiento(orden, parametros, accion) {
    var lstOrden = $("<ul/>");
    //ordenamiento
    var ordenarMts2Asc = $("<label>").text("Ascendente mts2").prepend($('<input/>').attr({
        type: "radio",
        name: "orden",
        value: '1'
    }).change(function () {
        if (this.checked) {
            parametros["orden"] = 1;
            accion(parametros);
        }
    }));

    var ordenarMts2Desc = $("<label>").text("Descendente mts2").prepend($('<input/>').attr({
        type: "radio",
        name: "orden",
        value: '2'
    }).change(function () {
        if (this.checked) {
            parametros["orden"] = 2;
            accion(parametros);
        }
    }));

    var ordenarPrecioAsc = $("<label>").text("Ascendente precio").prepend($('<input/>').attr({
        type: "radio",
        name: "orden",
        value: '3'
    }).change(function () {
        if (this.checked) {
            parametros["orden"] = 3;
            accion(parametros);
        }
    }));

    var ordenarPrecioDesc = $("<label>").text("Descendente precio").prepend($('<input/>').attr({
        type: "radio",
        name: "orden",
        value: '4'
    }).change(function () {
        if (this.checked) {
            parametros["orden"] = 4;
            accion(parametros);
        }
    }));

    lstOrden.append($("<li>").append(ordenarMts2Asc));
    lstOrden.append($("<li>").append(ordenarMts2Desc));
    lstOrden.append($("<li>").append(ordenarPrecioAsc));
    lstOrden.append($("<li>").append(ordenarPrecioDesc));


    //settear checkeado el radio de valor datos.orden
    $(lstOrden.find(":input[name=orden][value=" + orden + "]")).attr({
        checked: true
    });

    return lstOrden;
}

function generarNavegacion(navegacion, parametros, accion) {
    var lstNavegacion = $("<ul/>");
    //navegacion
    var paginaPrimera = $('<input/>').attr({
        type: "button",
        name: "primera",
        value: 'primera'
    }).click(function () {
        parametros["pagina"] = navegacion.paginaPrimera;
        accion(parametros);
    });
    var paginaAnterior = $('<input/>').attr({
        type: "button",
        name: "anterior",
        value: 'anterior'
    }).click(function () {
        parametros["pagina"] = navegacion.paginaAnterior;
        accion(parametros);
    });
    var paginaNumero = $('<span/>').text(navegacion.paginaActual);
    var paginaSiguiente = $('<input/>').attr({
        type: "button",
        name: "siguiente",
        value: 'siguiente'
    }).click(function () {
        parametros["pagina"] = navegacion.paginaSiguiente;
        accion(parametros);
    });
    var paginaUltima = $('<input/>').attr({
        type: "button",
        name: "ultima",
        value: 'ultima'
    }).click(function () {
        parametros["pagina"] = navegacion.paginaUltima;
        accion(parametros);
    });

    lstNavegacion.append($("<li>").append(paginaPrimera));
    lstNavegacion.append($("<li>").append(paginaAnterior));
    lstNavegacion.append($("<li>").append(paginaNumero));
    lstNavegacion.append($("<li>").append(paginaSiguiente));
    lstNavegacion.append($("<li>").append(paginaUltima));

    return lstNavegacion;
}

function generarCatalogoBusqueda(propiedades) {
    var lstPropiedades = $("<ul/>");
    for (i = 0; i < propiedades.length; i++) {
        var li = $("<li />");

        li.append($("<a href=#></a>").text(propiedades[i].titulo));

        if (propiedades[i].operacion == "A") {
            li.append($("<span />").text("Precio: " + propiedades[i].precio + "$"));
        } else {
            li.append($("<span />").text("Precio: " + propiedades[i].precio + "U$D"));
        }
        li.append($("<span />").text("Banios: " + propiedades[i].banios));
        li.append($("<span />").text("Metros Cuadrados: " + propiedades[i].mts2));
        li.append($("<span />").text("Habitaciones: " + propiedades[i].habitaciones));
        if (propiedades[i].garage == 1) {
            li.append($("<span />").text("Garage: Si"));
        } else {
            li.append($("<span />").text("Garage: No"));

        }
        li.append($("<span />").text("Barrio: " + propiedades[i].nombre_barrio));
        li.append($("<span />").text("Ciudad: " + propiedades[i].nombre_ciudad));
        if (propiedades[i].texto.length > 150) {
            li.append($("<p />").text("Descripción: " + propiedades[i].texto.substring(0, 150) + "..."));
        } else {
            li.append($("<p />").text("Descripción: " + propiedades[i].texto));
        }
        lstPropiedades.append(li);
    }
    return lstPropiedades;
}

function generarCatalogoEdicion(propiedades) {
    var lstPropiedades = $("<ul/>");
    for (i = 0; i < propiedades.length; i++) {
        var li = $("<li />");
        li.append($("<a href=#></a>").text(propiedades[i].titulo));
        lstPropiedades.append(li);
    }
    return lstPropiedades;
}

//esta funcion toma un form serializado y lo convierte en un objeto
function vecSerAObjeto(vectorSerializado) {
    objeto = {};
    for (var i = 0; i < vectorSerializado.length; i++) {
        objeto[vectorSerializado[i]['name']] = vectorSerializado[i]['value'];
    }
    return objeto;
}
