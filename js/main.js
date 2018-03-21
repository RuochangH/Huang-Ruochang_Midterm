/* =====================
Leaflet Configuration
===================== */

//var map = L.map('map', {
//  center: [40.000, -75.1090],
//  zoom: 11
//});
/*
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
*/


var dataset = $.ajax("https://raw.githubusercontent.com/RuochangH/Huang-Ruochang_Midterm/master/jsMidterm.geojson");
//var featureGroup;

//Plot
$('button').click(function(){
  var hour = $('#ahour').find(":selected").text();
  function date() {switch ($('#aweek').find(":selected").text()){
    case 'Weekday': return 8;
    case 'Weekend': return 13;}}
  var week = date();
  function show(feature) {
    if (feature.properties.Week === week && feature.properties.Hour === hour) {return true;}
  }
  dataset.done(function(data) {
    var parsedData = JSON.parse(data);
    var featureGroup = L.geoJson(parsedData, {
        //style: myStyle,
      //filter: show
    }).addTo(map);
  });
});
