<script>

    var map;
    var geojson;
    var myGeoJson;

    function main() {


        map = L.map('map', {
            zoomControl: true,
            center: [-24.765907, -55.332310],
            zoom: 8,
            maxZoom: 11
        });

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'MapBox'
        }).addTo(map);

        /*var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>"
        }).addTo(map);*/

        /*L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);*/

        //Map global variable
        //var map;
        //var executed = 0;

        /*map = L.map('map', {
         zoomControl: true,
         center: [-24.765907, -55.332310],
         zoom: 8,
         maxZoom: 11
         });

         L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: 'MapBox'
         }).addTo(map);*/

        $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=" +
            "SELECT * FROM paraguay_2012_departamentos WHERE arovia IN ('si') AND arovia IS NOT NULL", function (data) {
            //console.log("data");
            //console.dir(data);
            geojson = L.geoJson(data, {
                onEachFeature: function (feature, layer) {
                    //console.log("layer");
                    //console.dir(layer.toGeoJSON());
                    //L.geoJson(layer.toGeoJSON(), featureStyle).addTo(map);
                    myGeoJson = L.geoJson(layer.toGeoJSON(), {
                        style: DepartamentosMapStyle
                    }).addTo(map, 0);
                }
            });
            addAsentamientos();
        });

        function addDistritos() {

            $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_distrito", function(data) {
                //var markers = L.markerClusterGroup();
                //var markers = L.markerClusterGroup();
                geojson = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        // ADD A POPUP WITH SOME INFO
                        /*console.log("datos_por_distrito");
                        console.dir(feature);*/

                        var title = "<h2 align='center'>" + feature.properties.nombre_municipio + "</h2>";

                        var content_tab_1 =
                            "<img class='img-content-map' src='" + feature.properties._url + "'>"  +
                            "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                            "<tbody class='info-content'>" +
                            "<tr>"+
                            "<td class='col-md-4'><b>Fecha de creaciòn:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.fecha_creacion + "</td>" +
                            "</tr>" + "<tr>" +
                            "<td class='col-md-4'><b>Superficie:</b></td> " +
                            "<td class='col-md-8'>"+feature.properties.superficie + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Poblacion:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.poblacion + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Poblacion rural:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.poblacion_rural + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Poblacion urbana:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.poblacion_urbana + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Consejo de desarrollo distrital:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.consejo_de_desarrollo_distrital + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Plan de desarrollo distrital:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.nro_comunidades + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Nùmero de comunidades:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.poblacion_urbana + "</td>" +
                            "</tr>" + "<tr>"  +
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
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Temas prioritarios distritales:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.temas_prioritarios_distritales + "</td>" +
                            "</tr>" +
                            "</tbody>" +
                            "</table>";

                        layer.on('click', function (e) {
//                            alert("clickeo");
                            $("#option-tab-2").removeClass("active");
                            $("#tab-content-2").removeClass("active");
                            $("#option-tab-1").addClass("active");
                            $("#tab-content-1").addClass("active");
                            /*$("#modal-map-title").html(title);
                            $("#tab-content-1").html(content_tab_1);
                            $("#tab-content-2").html(content_tab_2);*/
                            document.getElementById("modal-map-title").innerHTML = title;
                            document.getElementById("tab-content-1").innerHTML = content_tab_1;
                            document.getElementById("tab-content-2").innerHTML = content_tab_2;
                            //$( "#data-container" ).append( content );
                            $("#infoMapRight").modal();
                        });

                    },
                    pointToLayer: function(feature, latlng) {
                        console.log(latlng, feature);
                        return L.marker(latlng, {
                            icon: L.AwesomeMarkers.icon({icon: 'university', markerColor: 'cadetblue', prefix: 'fa', spin:false})
                        });
                    }
                }).addTo(map);
                /*markers.addLayer(geojson , {
                    icon: L.AwesomeMarkers.icon({icon: 'spinner', markerColor: 'red', prefix: 'fa', spin:true})
                });*/
                // CONSTRUCT THE MAP
                //markers.addTo(map, 2);
            });
        }

        function addAsentamientos() {
            $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM datos_por_asentamiento", function(data) {
                var markers = L.markerClusterGroup();
                var geojson = L.geoJson(data, {
                    style: ComunidadesMapStyle,
                    onEachFeature: function (feature, layer) {
                        // ADD A POPUP WITH SOME INFO
                        /*console.log("datos_por_distrito");
                         console.dir(feature);*/

                        var title = "<h2 align='center'>" + feature.properties.nombre + "</h2>";

                        var content_tab_1 =
                            "<img class='img-content-map' src='" + feature.properties._url + "'>"  +
                            "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                            "<tbody class='info-content'>" +
                            "<tr>"+
                            "<td class='col-md-4'><b>Origen asentamiento:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.origen_asentamiento + "</td>" +
                            "</tr>" + "<tr>" +
                            "<td class='col-md-4'><b>Fecha de creaciòn:</b></td> " +
                            "<td class='col-md-8'>"+feature.properties.fecha_de_creacion + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Poblacion:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.poblacion + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Superficie:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.superficie + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Infraestructura local:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.infraestrucutra_local + "</td>" +
                            "</tr>" +
                            "</tbody>" +
                            "</table>";

                        var content_tab_2 =
                            "<table class='table table-striped table-condensed table-popup-content' cellspacing='10'>" +
                            "<tbody class='info-content'>" +
                            "<tr>"+
                            "<td class='col-md-4'><b>Caracteristicas:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.caracteristicas + "</td>" +
                            "</tr>" + "<tr>"  +
                            "<td class='col-md-4'><b>Dedicaciòn de la comunidad:</b></td> " +
                            "<td class='col-md-8'>" + feature.properties.dedicacion_de_la_comunidad + "</td>" +
                            "</tr>" +
                            "</tbody>" +
                            "</table>";

                        layer.on('click', function (e) {
//                            alert("clickeo");
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
                markers.addLayer(geojson);
                // CONSTRUCT THE MAP
                markers.addTo(map, 2);
                /*geojson = L.geoJson(data, {
                 onEachFeature: function (feature, layer) {
                 // ADD A POPUP WITH SOME INFO
                 console.log("asentamientos");
                 console.dir(feature)
                 //console.dir(layer.toGeoJSON());
                 myGeoJson = L.geoJson(layer.toGeoJSON(), {
                 style: ComunidadesMapStyle
                 }).addTo(map, 1);

                 layer.on('click', function (e) {
                 alert("clickeo");
                 });

                 var title = "<h2 align='center'>" + feature.properties.nombre + "</h2>";
                 var content =
                 '<img class="img-content-map" src="' + feature.properties._url + '">' +
                 "<hr><p><b>Origen asentamiento:</b> " + feature.properties.origen_asentamiento + "</p>" +
                 "<p><b>Fecha de creaciòn:</b> " + feature.properties.fecha_de_creacion + "</p>" +
                 "<p><b>Caracteristicas:</b> " + feature.properties.caracteristicas + "</p>" +
                 "<p><b>Poblacion:</b> $" + feature.properties.poblacion + "</p>" +
                 "<p><b>Superficie:</b> " + feature.properties.superficie + "</p>" +
                 "<p><b>Dedicaciòn de la comunidad:</b> " + feature.properties.dedicacion_de_la_comunidad + "</p>" +
                 "<p><b>Infraestructura local:</b> " + feature.properties.infraestrucutra_local + "</p>";

                 layer.on('click', function (e) {
                 document.getElementById("modal-map-title").innerHTML = title;
                 document.getElementById("modal-map-content").innerHTML = content;
                 $("#infoMapRight").modal();
                 });

                 }
                 });*/
                addDistritos();
            });
        }

        function DepartamentosMapStyle(feature) {
            //console.dir(feature.properties.dpto_desc);
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

    }

</script>