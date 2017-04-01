$(document).ready(function() {

    var map;
    var myGeoJson;

    map = L.map('map', {
        zoomControl: true,
        center: [-24.778172, -55.906013],
        zoom: 8,
        maxZoom: 11
    });

    var layerGroupMain = L.layerGroup().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'MapBox'
    }).addTo(map);

    $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=" +
        "SELECT * FROM paraguay_2012_departamentos WHERE arovia IN ('si') AND arovia IS NOT NULL", function (data) {
        var departamentos = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                myGeoJson = L.geoJson(layer.toGeoJSON(), {
                    style: DepartamentosMapStyle,
                    onEachFeature: function (feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight
                        });
                    }
                }).addTo(map, 0);
            }
        });
        queryTotalsData();
        addAsentamientos(1);
    });

    function addAsentamientos(status) {
        if (status == 0) {
            showLoader();
            show_reset_button();
            layerGroupMain.clearLayers();
        }
        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_asentamiento", function(data) {
            if (status == 0) {
                hideLoader();
            }
            var markers = L.markerClusterGroup();
            var datosPorAsentamiento = L.geoJson(data, {
                style: ComunidadesMapStyle,
                onEachFeature: function (feature, layer) {

                    var title = "<h2 align='center'>" + feature.properties.nombre + "</h2>";

                    var content_tab_1 =
                        "<img class='img-content-map' src='" + feature.properties._url + "'>" +
                        "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                        "<tbody class='info-content'>" +
                        "<tr>" +
                        "<td class='col-md-4'><b>Origen asentamiento:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.origen_asentamiento + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Fecha de creaciòn:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.fecha_de_creacion + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Poblacion:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.poblacion + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Superficie:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.superficie + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Infraestructura local:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.infraestrucutra_local + "</td>" +
                        "</tr>" +
                        "</tbody>" +
                        "</table>";

                    var content_tab_2 =
                        "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                        "<tbody class='info-content'>" +
                        "<tr>" +
                        "<td class='col-md-4'><b>Caracteristicas:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.caracteristicas + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Dedicaciòn de la comunidad:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.dedicacion_de_la_comunidad + "</td>" +
                        "</tr>" +
                        "</tbody>" +
                        "</table>";

                    layer.on('click', function (e) {
                        $("#modal-map-title").html(title);
                        $("#option-tab-2").removeClass("active");
                        $("#tab-content-2").removeClass("active").html(content_tab_2);
                        $("#option-tab-1").addClass("active");
                        $("#tab-content-1").addClass("active").html(content_tab_1);
                        map.setView(e.latlng, 9);
                        $("#infoMapRight").modal();
                    });

                }
            });
            markers.addLayer(datosPorAsentamiento);
            markers.addTo(layerGroupMain);
            if (status == 1) {
                addDistritos(1);
            }
        });
    }

    function addDistritos(status) {
        if (status == 0) {
            showLoader();
            show_reset_button();
            layerGroupMain.clearLayers();
        }
        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_distrito", function(data) {
            if (status == 1) {
                hideLoader();
            } else if (status == 0) {
                hideLoader();
            }
            var datosPorDistrito = L.geoJson(data, {
                onEachFeature: function (feature, layer) {

                    var title = "<h2 align='center'>" + feature.properties.nombre_municipio + "</h2>";

                    var content_tab_1 =
                        "<img class='img-content-map' src='" + feature.properties._url + "'>" +
                        "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                        "<tbody class='info-content'>" +
                        "<tr>" +
                        "<td class='col-md-4'><b>Fecha de creaciòn:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.fecha_creacion + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Superficie:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.superficie + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Poblacion:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.poblacion + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Poblacion rural:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.poblacion_rural + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Poblacion urbana:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.poblacion_urbana + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Consejo de desarrollo distrital:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.consejo_de_desarrollo_distrital + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Plan de desarrollo distrital:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.nro_comunidades + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Nùmero de comunidades:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.poblacion_urbana + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Descargar plan:</b></td> " +
                        "<td class='col-md-8'>" + '<a href="' + feature.properties.enlace_nube + '">Descargar plan<a/></td>' +
                        "</tr>" +
                        "</tbody>" +
                        "</table>";

                    var content_tab_2 =
                        "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                        "<tbody class='info-content'>" +
                        "<tr>" +
                        "<td class='col-md-4'><b>Caracteristica municipal:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.caracteristica_municipal + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Actividades economicas:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.actividades_economicas + "</td>" +
                        "</tr>" + "<tr>" +
                        "<td class='col-md-4'><b>Temas prioritarios distritales:</b></td> " +
                        "<td class='col-md-8'>" + feature.properties.temas_prioritarios_distritales + "</td>" +
                        "</tr>" +
                        "</tbody>" +
                        "</table>";

                    layer.on('click', function (e) {
                        $("#modal-map-title").html(title);
                        $("#option-tab-2").removeClass("active");
                        $("#tab-content-2").removeClass("active").html(content_tab_2);
                        $("#option-tab-1").addClass("active");
                        $("#tab-content-1").addClass("active").html(content_tab_1);
                        map.setView(e.latlng, 9);
                        $("#infoMapRight").modal();
                    });

                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.AwesomeMarkers.icon({
                            icon: 'university',
                            markerColor: 'cadetblue',
                            prefix: 'fa',
                            spin: false
                        })
                    });
                }
            }).addTo(layerGroupMain);
        });
    }

    function DepartamentosMapStyle(feature) {
        var fill_color;
        var stroke_color;
        switch(feature.properties.dpto_desc) {
            case "ALTO PARANA":
                fill_color = "#a6cee3";
                stroke_color = "#7794A3";
                break;
            case "CAAGUAZU":
                fill_color = "#B2DF8A";
                stroke_color = "#7F9F63";
                break;
            case "CANINDEYU":
                fill_color = "#33a02c";
                stroke_color = "#1F601A";
                break;
            case "SAN PEDRO":
                fill_color = "#fb9a99";
                stroke_color = "#BB7372";
                break;
            case "ASUNCION":
                fill_color = "#0F3B82";
                stroke_color = "#081E42";
                break;
            case "CENTRAL":
                fill_color = "#FF6600";
                stroke_color = "#BF4C00";
                break;
        }
        return {
            fillColor: fill_color,
            weight: 2,
            opacity: 1,
            color: stroke_color,
            dashArray: '3',
            fillOpacity: 0.7,
            className: "map-layer-1"
        };
    }

    function highlightFeature(e) {
        var layer = e.target;
        var fill_color;
        var stroke_color;
        switch (layer.feature.properties.dpto_desc) {
            case "ALTO PARANA":
                fill_color = "#93B7C9";
                stroke_color = "#647D89";
                break;
            case "CAAGUAZU":
                fill_color = "#9EC57A";
                stroke_color = "#6B8553";
                break;
            case "CANINDEYU":
                fill_color = "#2B8625";
                stroke_color = "#174613";
                break;
            case "SAN PEDRO":
                fill_color = "#E18A89";
                stroke_color = "#A16362";
                break;
            case "ASUNCION":
                fill_color = "#0C2F68";
                stroke_color = "#061733";
                break;
            case "CENTRAL":
                fill_color = "#E55C00";
                stroke_color = "#A54200";
                break;
        }
        layer.setStyle({
            fillColor: fill_color,
            weight: 4,
            color: stroke_color,
            dashArray: '3',
            fillOpacity: 1
        });
    }

    function resetHighlight(e) {
        myGeoJson.resetStyle(e.target);
    }

    function ComunidadesMapStyle(feature) {
        return {
            fillColor: "#6B0FB2",
            weight: 2,
            opacity: 1,
            color: '#610EA2',
            dashArray: '3',
            fillOpacity: 0.7,
            className: "map-layer-2"
        };
    }

    $('#ui-filtros-parent').click(function() {
        $("#infoMapLeft").modal();
    });

    $('.map-filter-rb').click(function () {
       switch (this.id) {
           case "map-rb-distritos":
               addDistritos(0);
               break;
           case "map-rb-comunidades":
               addAsentamientos(0);
               break
       }
    });

    $('.map-filter-btn').click(function() {
        var query;
        var maker_class;
        var maker_color;
        switch (this.id) {
            case "map-filter-proyectos":
                query = "proyectos_por_distritos";
                maker_class = "cluster-proyectos";
                maker_color = 'orange';
                break;
            case "map-filter-servicios":
                query = "servicios_por_distrito";
                maker_class = "cluster-servicios";
                maker_color = 'blue';
                break;
            case "map-filter-comites":
                maker_color = 'green';
                query = "comites_por_distritos";
                maker_class = "cluster-comites";
                break;
            case "map-filter-voluntarios":
                maker_color = 'red';
                query = "voluntarios_por_distritos";
                maker_class = "cluster-voluntarios";
                break;
        }
        queryFilterMap(query, maker_class, maker_color);
    });
    
    function queryFilterMap(query, maker_class, maker_color) {
        showLoader();
        clearCheckedFilters();
        show_reset_button();
        layerGroupMain.clearLayers();
        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM " + query, function(data) {
            hideLoader();
            var markers = new L.markerClusterGroup({
                iconCreateFunction: function (cluster) {
                    var childCount = cluster.getChildCount();
                    return new L.DivIcon({
                        html: '<div><span>' + childCount + '</span></div>', className: maker_class, iconSize: new L.Point(40, 40)
                    });
                }
            });
             var dataFilter = L.geoJson(data, {
                onEachFeature: function (feature, layer) {

                    var content;

                    switch (query) {
                        case "proyectos_por_distritos":
                            content =
                                "<article class='infobox_map infobox_proyectos'>" +
                                "<header class='infobox_header'>" +
                                "<h3 class='infobox_title'>" + feature.properties.nombre_del_proyecto + "</h3>" +
                                "<p class='infobox_item'> Ubicación </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.comunidad + "</h4>" +
                                "<p class='infobox_item'> Instituciones </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.institucion + "</h4>" +
                                "<div class='row'>"+
                                "<div class='col-sm-6'>" +
                                "<p class='infobox_item'> Objetivo </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.objetivo + "</h4>" +
                                "</div>" +
                                "<div class='col-sm-6 col-border'>" +
                                "<p class='infobox_item'> Monto Solicitado </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.monto_solicitado + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "<div class='text-center'>" +
                                "<p class='infobox_item'> Beneficiarios </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.beneficiarios + "</h4>" +
                                "</div>" +
                                "</header>" +
                                "</article>";

                            layer.bindPopup(content);
                            break;

                        case "servicios_por_distrito":
                            content =
                                "<article class='infobox_map infobox_servicios'>" +
                                "<header class='infobox_header'>" +
                                "<h3 class='infobox_title'>" + feature.properties.programa + "</h3>" +
                                "<p class='infobox_item'> Ubicación </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.comunidad + "</h4>" +
                                "<p class='infobox_item'> Institución </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.institucion + "</h4>" +
                                "<div class='row'>"+
                                "<div class='col-sm-6'>" +
                                "<p class='infobox_item'> Unidad de Medida </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.unidad_de_medida + "</h4>" +
                                "<p class='infobox_item'> Cantidad </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.cantidad + "</h4>" +
                                "</div>" +
                                "<div class='col-sm-6 col-border'>" +
                                "<p class='infobox_item'> Observación </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.observacion + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "<div class='text-center'>" +
                                "<p class='infobox_item'> Beneficiarios </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.beneficiarios + "</h4>" +
                                "</div>" +
                                "</header>" +
                                "</article>";

                            layer.bindPopup(content);
                            break;

                        case "comites_por_distritos":
                            content =
                                "<article class='infobox_map infobox_comites'>" +
                                "<header class='infobox_header'>" +
                                "<h3 class='infobox_title'>" + feature.properties.nombre + "</h3>" +
                                "<p class='infobox_item'> Ubicación </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.distrito + "</h4>" +
                                "<p class='infobox_item'> Objetivo del comité </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.objetivo_del_comite + "</h4>" +
                                "<div class='row'>"+
                                "<div class='col-sm-6'>" +
                                "<p class='infobox_item'> Representante </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.representante + "</h4>" +
                                "</div>" +
                                "<div class='col-sm-6 col-border'>" +
                                "<p class='infobox_item'> Número de Integrantes </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.nro_de_integrantes + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "<div class='text-center'>" +
                                "<p class='infobox_item'> Rol de Arovia </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.rol_de_arovia + "</h4>" +
                                "</div>" +
                                "</header>" +
                                "</article>";

                            layer.bindPopup(content);
                            break;

                        case "voluntarios_por_distritos":
                            content =
                                "<article class='infobox_map infobox_voluntarios'>" +
                                "<header class='infobox_header'>" +
                                "<h3 class='infobox_title'>" + feature.properties.distrito + "</h3>" +
                                "<p class='infobox_item'> Comunidad Asignada </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.comunidad_asignada + "</h4>" +
                                "<div class='row'>"+
                                "<div class='col-sm-6'>" +
                                "<p class='infobox_item'> Nombre del Voluntario </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.nombre + "</h4>" +
                                "</div>" +
                                "<div class='col-sm-6 col-border'>" +
                                "<p class='infobox_item'> Profesión </p>"+
                                "<h4 class='infobox_property'>" + feature.properties.profesion + "</h4>" +
                                "</div>" +
                                "</div>" +
                                "</header>" +
                                "</article>";

                            layer.bindPopup(content);
                            break;
                    }

                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.AwesomeMarkers.icon({
                            icon: 'map-marker',
                            // markerColor: 'cadetblue',
                            markerColor: maker_color,
                            prefix: 'fa',
                            spin: false
                        })
                    });
                }
            });
            markers.addLayer(dataFilter);
            markers.addTo(layerGroupMain);
        });
    }

    function clearCheckedFilters() {
        $("#map-rb-distritos").prop('checked', false);
        $("#map-rb-comunidades").prop('checked', false);
    }

    function hideLoader() {
        $('#loader').fadeOut(1000);
    }
    function showLoader() {
        $('#loader').fadeIn(1000);
    }

    function show_reset_button() {
        var content = $('#div_reset_map');
        if (content.hasClass('hide_reset_btn')) {
            content.removeClass( 'hide_reset_btn' ).addClass( 'show_reset_btn' );
        }
    }

    $('#btn_reset_map').click(function() {
        location.reload();
    });

    function queryTotalsData() {

        var tables = ["proyectos_por_distritos", "servicios_por_distrito", "comites_por_distritos", "voluntarios_por_distritos"];

        tables.forEach(function(value) {

            $.ajax({
                method: "GET",
                url: "http://geo.stp.gov.py/user/arovia/api/v2/sql?q=SELECT * FROM "+value+" COUNT(cartodb_id)"
            }).done(function(data) {
                $('.count_'+value).text('Total: '+data.total_rows);
            }).fail(function() {

            });

        });
    }

});