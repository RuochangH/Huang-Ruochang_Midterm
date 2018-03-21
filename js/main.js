/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [41.880684,-87.630630],
  zoom: 13
});

//mapboxgl.accessToken = 'pk.eyJ1IjoicnVvY2hhbmciLCJhIjoiY2plMGN5NmduNTBzMzJ3cXA4OHJqbTg1MCJ9.hVntg2f96UxD239bHHlQFw';
//var map = new mapboxgl.Map({
  //container: 'map',
  //center:[ -87.630630,41.880684],
  //zoom: 13,
  //style: 'mapbox://styles/ruochang/cjeutr1ns0uik2sp5e1sgmmnj'
//});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = "https://raw.githubusercontent.com/RuochangH/Huang-Ruochang_Midterm/master/map.geojson";
//var featureGroup;

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

//Plot
$('button').click(function(){
  var hour = $('#ahour').find(":selected").text();
  function date() {switch ($('#aweek').find(":selected").text()){
    case 'Weekday': return 8;
    case 'Weekend': return 13;}}
  var week = date();
  function show(feature) {
    if (feature.properties.Week == 8 && feature.properties.Hour === 12) {return true;}
  }
  $(document).ready(function(){
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      L.geoJson(parsedData, {
      PointToLayer: function (feature,latlng) {
        return L.circleMarker(latlng,geojsonMarkerOptions);},
      //filter: show
      }).addTo(map);
    });
  });
});
