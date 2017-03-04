/*Variables globales*/
var listaDeCasas = ["casa-1", "casa-2", "casa-3", "casa-4", "casa-5", "casa-6", "casa-7"];
var cantidadTotalNumeros = 4;
var listaPaginaCasas = [["casa-1", "casa-2", "casa-3", "casa-4"], ["casa-5", "casa-6", "casa-7"]];


function inicioCarrusel() {
    $("#icono-next").click(hiceClickAdelante);
    $("#icono-previous").click(hiceClickAtras);
    $(".numerosImagenesCarrusel").click(hiceClickEnNumero);
    cargarNumeros(1, 4);
    pintarDespintarNumeros(1, "pintar");

    //setInterval(cambia, 3000);
}


function hiceClickAdelante() {
    var casaActual = agarrarIdImagenActual();
    var idCasaSiguiente = parseInt(casaActual) + 1;

    //Array circular
    if (idCasaSiguiente - listaDeCasas.length > 0) {
        //Si entro es porque estoy parado en la ultima casa
        idCasaSiguiente = 1;
        cargarNumeros(1, 4);
    }

    //Estoy en la ultima casa de los numeros
    if (casaActual % cantidadTotalNumeros == 0) {

        //Arreglar el tope
        var i = idCasaSiguiente;
        var contador = 1;
        while (i < listaDeCasas.length && contador <= cantidadTotalNumeros) {
            i++;
            contador++;
        }

        cargarNumeros(idCasaSiguiente, i);
    }



    cambiarImagenId(casaActual, idCasaSiguiente);
    pintarDespintarNumeros(idCasaSiguiente, "pintar");
    pintarDespintarNumeros(casaActual, "despintar");
}

function hiceClickAtras() {
    var casaActual = agarrarIdImagenActual();
    var idCasaAtras = parseInt(casaActual) - 1;

    //Array circular
    if (idCasaAtras == 0) {
        //Si entro es porque estoy parado en la primera casa de todas
        idCasaAtras = listaDeCasas.length;
        elementosPorPagina(casaActual);
    }
    elementosPorPagina(casaActual);
    cambiarImagenId(casaActual, idCasaAtras);
    pintarDespintarNumeros(idCasaAtras, "pintar");
    pintarDespintarNumeros(casaActual, "despintar");
}

function hiceClickEnNumero() {
    var idCasaVieja = agarrarIdImagenActual();
    var idCasaNueva = this.text;
    alert();
    cambiarImagenId(idCasaVieja, idCasaNueva);
    pintarDespintarNumeros(idCasaNueva, "pintar");
    pintarDespintarNumeros(idCasaVieja, "despintar");
}

function agarrarIdImagenActual() {
    var casaActual = $("img")[0].id;
    casaActual = casaActual.split("-")[1];

    return casaActual;
}

function cambiarImagenId(idCasaVieja, idNuevaCasa) {
    $("#casa-" + idCasaVieja).attr("src", "ImagenesDeCasas/casa" + idNuevaCasa + ".jpg");
    $("#casa-" + idCasaVieja).attr("id", "casa-" + idNuevaCasa);
}

function pintarDespintarNumeros(idCasaActual, pintar) {
    if (pintar == "pintar") {
        $("#" + idCasaActual).css({"background": "#fff",
            "color": "#000"});
    } else {
        $("#" + idCasaActual).css({"background": "url(Iconos/slidebox_thumb.png)",
            "color": "#fff"});
    }

}

function cargarNumeros(desdeCantidadNumeros, hastaCantidadNumeros) {
    $("#thumbs").empty();
    $("#thumbs").append("<label id=" + desdeCantidadNumeros + ">" + desdeCantidadNumeros + "</label>");

    $("#" + desdeCantidadNumeros).attr("class", "numerosImagenesCarrusel");
    for (var i = desdeCantidadNumeros + 1; i <= hastaCantidadNumeros; i++) {
        var numeroAnterior = i - 1;
        $("#" + numeroAnterior).after("<label id=" + i + ">" + i + "</label>");
        $("#" + i).attr("class", "numerosImagenesCarrusel");
    }
}


function cambia() {
    var cont = cont % 2;

    if (cont != 1) {
        hiceClickAdelante();
    }

    cont++;
}

function elementosPorPagina(idCasaBorde) {
    $totalPaginas = Math.ceil(listaDeCasas.length / cantidadTotalNumeros);

    //Si entro es porque quiero ir a la ultima
    if (idCasaBorde == 1) {
        var listaUltimasCasas = listaPaginaCasas[listaPaginaCasas.length - 1];

        var desdeCasa = listaUltimasCasas[0];
        var hastaCasa = listaUltimasCasas[listaUltimasCasas.length - 1];

        var idDesdeCasa = desdeCasa.split("-")[1];
        var idHastaCasa = hastaCasa.split("-")[1];

        cargarNumeros(parseInt(idDesdeCasa), parseInt(idHastaCasa));

    } else {
        //Busco si el idCasaBorde es efectivamente una casa que esta en el borde
        var encontre = false;
        for (var i = 1; i < listaPaginaCasas.length && !encontre; i++) {
            var listaCasa = listaPaginaCasas[i];
            if (listaCasa[0].split("-")[1] == idCasaBorde) {
                var listaCasasNuevas = listaPaginaCasas[i - 1];

                var desdeCasa = listaCasasNuevas[0];
                var hastaCasa = listaCasasNuevas[listaCasasNuevas.length - 1];

                var idDesdeCasa = desdeCasa.split("-")[1];
                var idHastaCasa = hastaCasa.split("-")[1];

                cargarNumeros(parseInt(idDesdeCasa), parseInt(idHastaCasa));
                encontre = true;
            }
        }
    }

}