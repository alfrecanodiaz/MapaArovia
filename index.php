<!DOCTYPE html>
<html>
  <head>
    <title>Mapa Social Arovia</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="bootstrap/css/simple-sidebar.css" rel="stylesheet" />
    <!-- styles -->
    <link href="css/styles.css" rel="stylesheet" />
	<!-- Map -->
<!--	  <link rel="stylesheet" href="css/cartodb/cartodb.css" />-->
	  <link rel="stylesheet" href="http://geo.stp.gov.py/dist/themes/css/cartodb.css" />
	  <link rel="stylesheet" href="css/leaflet/MarkerCluster.Default.css" />
      <link rel="stylesheet" href="css/leaflet/leaflet.awesome-markers.css">
      <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
      <link rel="stylesheet" href="css/arovia.css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="js/IE/html5shiv.js"></script>
      <script src="js/IE/respond.min.js"></script>
    <![endif]-->

  </head>
  <body>

    <?php include 'partials/header.php'?>

    <div class="page-content">

    	<div class="row parent-row">

		  <div class="col-md-12">
		  	<div class="row">
		  		<div class="col-md-12 a-map-container">
		  			<div class="content-box-large parent-map">
		  				<!--<div class="panel-heading">-->
							<!--<div class="panel-title">Contenedor del mapa</div>-->

							<!--<div class="panel-options">-->
								<!--<a href="#" data-rel="collapse"><i class="glyphicon glyphicon-refresh"></i></a>-->
							<!--</div>-->
						<!--</div>-->
		  				<div id="map" class="panel-body sidebar-map">


		  				</div>
		  			</div>
		  		</div>
		  </div>
		</div>
    </div>

    <?php include 'partials/footer.php'?>

    <?php include 'partials/infowindow/right-modal.php'?>

    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/jquery.waitforimages.js"></script>
	<!-- Map -->
<!--	<script src="js/cartodb/cartodb.js"></script>-->
	<script src="http://geo.stp.gov.py/cartodb.js/v3/3.15/cartodb.js"></script>
	<script src="js/leaflet/leaflet.markercluster.js"></script>
    <script src="js/leaflet/leaflet.awesome-markers.min.js"></script>
	<!-- Custom -->
    <script src="js/custom.js"></script>

    <?php include 'partials/functions/main.php'?>

  	<script>

        function query() {

            $.getJSON("http://geo.stp.gov.py/user/arovia/api/v2/sql?format=GeoJSON&q=SELECT * FROM proyectos_por_distritos", function (data) {
                var markers = L.markerClusterGroup();
                var geojson = L.geoJson(data, {
                    onEachFeature: function (feature, layer) {
                        // ADD A POPUP WITH SOME INFO
                        //console.log("datos");
                        //console.dir(feature);

                        var content = "<h2 align='center'>" + feature.properties.distrito + "</h2>" +
                            "<h4 align='center'><b>Comunidad: " + feature.properties.comunidad + "</b></h4>" +
                            "<hr><p><b>Nombre del Proyecto:</b> " + feature.properties.nombre_del_proyecto + "</p>" +
                            "<p><b>Objetivo:</b> " + feature.properties.objetivo + "</p>" +
                            "<p><b>Monto:</b> $" + feature.properties.monto_solicitado + "</p>" +
                            "<p><b>Institucion:</b> " + feature.properties.institucion + "</p>" +
                            "</p>" + "<p><b>Estado:</b> " + feature.properties.estado + "</p>";

                        /*                        layer.bindPopup(
                         "<h2 align='center'>" + feature.properties.distrito + "</h2>" +
                         "<h4 align='center'><b>Comunidad: " + feature.properties.comunidad + "</b></h4>" +
                         "<hr><p><b>Nombre del Proyecto:</b> " + feature.properties.nombre_del_proyecto + "</p>" +
                         "<p><b>Objetivo:</b> " + feature.properties.objetivo + "</p>" +
                         "<p><b>Monto:</b> $" + feature.properties.monto_solicitado + "</p>" +
                         "<p><b>Institucion:</b> " + feature.properties.institucion + "</p>" +
                         "</p>" + "<p><b>Estado:</b> " + feature.properties.estado + "</p>");*/

                        layer.on('click', function (e) {
//                            alert("clickeo");
                            //document.getElementById("data-container").innerHTML = content;
                            //$( "#data-container" ).append( content );
                        });

                    }
                });
                markers.addLayer(geojson);
                // CONSTRUCT THE MAP
                markers.addTo(map);
            });

        }


        window.onload = main;

	</script>

    <!-- Custom JS Map -->
    <!--<script>

        $(document).ready(function () {

        });
    </script>-->

  </body>
</html>