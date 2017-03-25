$(document).ready(function() {

    var map;
    var myGeoJson;

    map = L.map('map', {
        zoomControl: true,
        center: [-24.778172, -55.906013],
        zoom: 8,
        maxZoom: 11
    });
    
    // Create group for your layers and add it to the map
    var layerGroupMain = L.layerGroup().addTo(map);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'MapBox'
    }).addTo(map);

    $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=" +
        "SELECT * FROM paraguay_2012_departamentos WHERE arovia IN ('si') AND arovia IS NOT NULL", function (data) {
        var departamentos = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                myGeoJson = L.geoJson(layer.toGeoJSON(), {
                    style: DepartamentosMapStyle
                }).addTo(map, 0);
            }
        });
        addAsentamientos(1);
    });

    function addAsentamientos(status) {
        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_asentamiento", function(data) {
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
                        $("#option-tab-2").removeClass("active");
                        $("#tab-content-2").removeClass("active");
                        $("#option-tab-1").addClass("active");
                        $("#tab-content-1").addClass("active");
                        document.getElementById("modal-map-title").innerHTML = title;
                        document.getElementById("tab-content-1").innerHTML = content_tab_1;
                        document.getElementById("tab-content-2").innerHTML = content_tab_2;
                        $("#infoMapRight").modal();
                    });

                }
            });
            markers.addLayer(datosPorAsentamiento);
            markers.addTo(layerGroupMain);
            console.log(status);
            if (status == 1) {
                addDistritos();
            }
        });
    }

    function addDistritos() {

        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_distrito", function(data) {
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
    
    $('#remove_layers').click(function() {
      layerGroupMain.clearLayers();
    });

    $('#ui-filtros-parent').click(function() {
        $("#infoMapLeft").modal();
    });

    $('.map-filter-btn').click(function() {
        var query;
        switch (this.id) {
            case "map-filter-proyectos":
                query = "proyectos_por_distritos";
                queryFilterMap(query);
                break;
            case "map-filter-servicios":
                query = "servicios_por_distrito";
                queryFilterMap(query);
                break;
            case "map-filter-comites":
                query = "comites_por_distritos";
                queryFilterMap(query);
                break;
            case "map-filter-voluntarios":
                query = "voluntarios_por_distritos";
                queryFilterMap(query);
                break;
        }
    });
    
    function queryFilterMap(query) {
        layerGroupMain.clearLayers();
        /*console.log("tiene el layer; " + map.hasLayer(dataFilter));
        if (map.hasLayer(dataFilter)) {
            map.removeLayer(dataFilter);
        }*/
        /*map.eachLayer(function (layer) {
            console.dir(layer);
        });*/
        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM " + query, function(data) {
            var markers = L.markerClusterGroup();
             var dataFilter = L.geoJson(data, {
                onEachFeature: function (feature, layer) {

                    console.dir(feature);

                },
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.AwesomeMarkers.icon({
                            icon: 'map-marker',
                            markerColor: 'cadetblue',
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

});