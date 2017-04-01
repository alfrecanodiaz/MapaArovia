<!DOCTYPE html>
<!--*
 * @author  Alfredo Cano
 * @license   http://www.gnu.org/licenses/gpl-2.0.html
 *
 * -->
<html>
  <head>
    <title>Mapa Social - Arovia</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Con esta herramienta podrás encontrar toda la información referente a los proyectos, servicios, comités y voluntarios del programa AROVIA." />
    <meta name="keywords" content="" />
    <meta name="author" content="Alfredo Cano" />
    <link rel="shortcut icon" type="image/png" href="favicon.ico" />
    <!-- Bootstrap -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="vendor/bootstrap/css/simple-sidebar.css" rel="stylesheet" />
    <!-- Styles -->
    <link href="css/styles.css" rel="stylesheet" />
    <!-- CartoDB -->
    <link rel="stylesheet" href="http://geo.stp.gov.py/dist/themes/css/cartodb.css" />
    <!-- Leaflet -->
    <link rel="stylesheet" href="vendor/leaflet/css/MarkerCluster.Default.css" />
    <link rel="stylesheet" href="vendor/leaflet/css/leaflet.awesome-markers.css" />
    <link rel="stylesheet" href="css/custom-maker-cluster.css" />
    <!-- FontAwesome -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <!-- Custom -->
    <link rel="stylesheet" href="css/arovia.css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9] >
      <script src="js/IE/html5shiv.js"></script>
      <script src="js/IE/respond.min.js"></script>
    <![endif]-->

  </head>
  <body>

    <?php require 'partials/header.php' ?>

    <div class="page-content">

      <div class="row parent-row">

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12 a-map-container">
            <div class="content-box-large parent-map">
                <div id="loader">
                    <div class="map-slider-loading"><!--Loading...--></div>
                    <h3 class="map-slider-loading-label">Cargando</h3>
                </div>
                <div id='ui-filtros-parent'>
                    <div id="ui-filtros">
                        F<br>I<br>L<br>T<br>R<br>O<br>S
                    </div>
                </div>
                <div id="map" class="panel-body sidebar-map"></div>
            </div>
          </div>
      </div>
    </div>
    </div>

    <?php require 'partials/footer.php' ?>

    <?php include 'partials/infowindow/right-modal.php' ?>

    <?php include 'partials/infowindow/left-modal.php' ?>

    </div>

  <!-- jQuery -->
  <script src="vendor/jQuery/jquery.js"></script>
  <!-- Bootstrap -->
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
  <!-- CartoDB -->
  <script src="http://geo.stp.gov.py/cartodb.js/v3/3.15/cartodb.js"></script>
  <!-- Leaflet -->
  <script src="vendor/leaflet/js/leaflet.markercluster.js"></script>
  <script src="vendor/leaflet/js/leaflet.awesome-markers.min.js"></script>
  <!-- Custom -->
  <script src="js/main.js"></script>
  <script src="js/custom.js"></script>

  </body>
</html>