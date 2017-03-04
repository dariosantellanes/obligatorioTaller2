function iniciarValidacionFormularios() {

    var ingresoForm = $("#ingreso_form");
    var ingresoFormMsg = $("#ingreso_form_msg");

    var busquedaForm = $("#busqueda_form");
    var busquedaFormMsg = $("#busqueda_form_msg");

    var estadisticaForm = $("#estadistica_form");
    var estadisticaFormMsg = $("#estadistica_form_msg");


    var selBusquedaCiudad = busquedaForm.find('[name=ciudad]');
    var selEstadisticaCiudad = estadisticaForm.find('[name=ciudad]');

    var selBusquedaBarrio = busquedaForm.find('[name=barrio]');

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

    ingresoForm.parent().append($(ingresoFormMsg));

    ingresoForm.validate({
        focusInvalid: false,
        errorLabelContainer: ingresoFormMsg.find("ul"),
        errorElement: 'li',
        groups: {
            ingreso: "usuario clave"
        },
        rules: {
            usuario: {
                required: true,
                nowhitespace: true
            },
            clave: {
                required: true,
                nowhitespace: true
            }
        },
        messages: {
            usuario: {
                required: "Campo de usuario en blanco.",
                nowhitespace: "No puede ingresar espacios en blanco."
            },
            clave: {
                required: "Campo de contraseña en blanco.",
                nowhitespace: "No puede ingresar espacios en blanco."
            }
        },
        highlight: function (element) {
            $(element).addClass("campo-error");
        },
        unhighlight: function (element) {
            $(element).removeClass("campo-error");
        },
        submitHandler: function (form) {
            var envio = vecSerAObjeto($(form).serializeArray());
            envio["accion"] = "login";
            $.ajax({
                type: "POST",
                url: "login.php",
                dataType: 'json',
                //timeout: 5000,
                data: envio
            }).done(function (datos) {
                if (datos.ok === true) {
                    document.location = "index.php";
                } else {
                    ingresoForm.validate().showErrors({
                        "usuario": "",
                        "clave": "Usuario o contraseña invalidos."
                    });
                }
            }).fail(function () {
                ingresoForm.validate().showErrors({
                    "usuario": "",
                    "clave": "Ocurrio un error, intente mas tarde."
                });
            }).always(function () {
            });
        }
    });

    busquedaForm.validate({
        focusInvalid: false,
        errorLabelContainer: busquedaFormMsg.find("ul"),
        errorElement: 'li',
        groups: {
            busqueda: "operacion ciudad barrio tipo habitaciones precioDesde precioHasta garage"
        },
        rules: {
            operacion: {
                required: true
            },
            ciudad: {
                required: true,
                min: 1
            },
            barrio: {
                required: false
            },
            tipo: {
                required: false
            },
            habitaciones: {
                required: false,
                nowhitespace: true,
                digits: true
            },
            precioDesde: {
                required: false,
                nowhitespace: true,
                digits: true
            },
            precioHasta: {
                required: false,
                digits: true,
                nowhitespace: true,
                min: {
                    param: function () {
                        return parseInt(busquedaForm.find(':input[name=precioDesde]').val());
                    },
                    depends: function () {
                        return parseInt(busquedaForm.find(':input[name=precioDesde]').val());
                    }
                }

            },
            garage: {
                required: false
            }
        },
        messages: {
            operacion: {
                required: "Seleccione una operacion."
            },
            ciudad: {
                required: "Seleccione una ciudad",
                min: "Seleccione una ciudad"
            },
            habitaciones: {
                nowhitespace: "Ingrese un valor sin espacios",
                digits: "Ingrese un valor numerico"
            },
            precioDesde: {
                nowhitespace: "Ingrese un valor sin espacios",
                digits: "Ingrese un valor numerico"
            },
            precioHasta: {
                nowhitespace: "Ingrese un valor sin espacios",
                digits: "Ingrese un valor numerico",
                min: function () {
                    return "Ingrese un valor mayor o igual a " + busquedaForm.find(':input[name=precioDesde]').val();
                }
            }
        },
        highlight: function (element) {
            if ($(element).hasClass("campo")) {
                $(element).addClass("campo-error");
            } else {
                $(element).closest(".seleccion").addClass("seleccion-error");
            }
        },
        unhighlight: function (element) {
            if ($(element).hasClass("campo")) {
                $(element).removeClass("campo-error");
            } else {
                $(element).closest(".seleccion").removeClass("seleccion-error");
            }
        },
        submitHandler: function (form) {
            cargarPropiedades(vecSerAObjeto($(form).serializeArray()));
        }
    });
    
    estadisticaForm.validate({
        focusInvalid: false,
        errorLabelContainer: estadisticaFormMsg.find("ul"),
        errorElement: 'li',
        groups: {
            busqueda: "operacion ciudad"
        },
        rules: {
            operacion: {
                required: true
            },
            ciudad: {
                required: true,
                min: 1
            }
        },
        messages: {
            operacion: {
                required: "Seleccione una operacion."
            },
            ciudad: {
                required: "Seleccione una ciudad",
                min: "Seleccione una ciudad"
            }
        },
        highlight: function (element) {
            if ($(element).hasClass("campo")) {
                $(element).addClass("campo-error");
            } else {
                $(element).closest(".seleccion").addClass("seleccion-error");
            }
        },
        unhighlight: function (element) {
            if ($(element).hasClass("campo")) {
                $(element).removeClass("campo-error");
            } else {
                $(element).closest(".seleccion").removeClass("seleccion-error");
            }
        },
        submitHandler: function (form) {
            cargarEstadisticas(vecSerAObjeto($(form).serializeArray()));
        }
    });    
}
