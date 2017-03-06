function iniciarSelectores() {

    var selBusquedaCiudad = busquedaForm.find(':input[name=ciudad]');
    var selEstadisticaCiudad = estadisticaForm.find(':input[name=ciudad]');

    var selBusquedaBarrio = busquedaForm.find(':input[name=barrio]');

    cargarSelectHabitacionesBaños("cantidad-habitaciones");
    cargarSelectHabitacionesBaños("cantidad-baños");

    $("#ciudad").change(function () {
        $.ajax({
            type: "POST",
            url: "mantenimiento.php",
            dataType: 'json',
            data: {accion: "cambio-ciudad", ciudadSeleccionada: this.value}
        }).done(function (datos) {

            cargarSelectBarrios(datos.nuevosBarrios);
        });
    });

    //codigo para poblar selectores
    $.ajax({
        type: "GET",
        url: "utilidad.php",
        dataType: 'json',
        //timeout: 5000,
        data: {accion: "poblarCiudades"}
    }).done(function (datos) {
        poblarSelector(datos, selBusquedaCiudad, "----Ciudad----");
        poblarSelector(datos, selEstadisticaCiudad, "----Ciudad----");
    }).fail(function () {
        poblarSelector(null, selBusquedaCiudad, "----Ciudad----");
        poblarSelector(null, selEstadisticaCiudad, "----Ciudad----");        //mas cosas
    }).always(function () {
        selEstadisticaCiudad.change();
        selBusquedaCiudad.change();
    });

    selBusquedaCiudad.change(function () {
        var ciudad = $(this).val();
        $.ajax({
            type: "GET",
            url: "utilidad.php",
            dataType: 'json',
            //timeout: 5000,
            data: {accion: "poblarBarrios", ciudad: ciudad}
        }).done(function (datos) {
            poblarSelector(datos, selBusquedaBarrio, "----Barrio----");
        }).fail(function () {
            poblarSelector(null, selBusquedaBarrio, "----Barrio----");
            //mas cosas
        });
    });

}
function cargarSelectHabitacionesBaños(idSelectAcargar) {
    for (var i = 1; i <= 100; i++) {
        var opcion = $("<option />");
        opcion.attr("value", i);
        opcion.text(i);
        $("#" + idSelectAcargar).append(opcion);
    }
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

