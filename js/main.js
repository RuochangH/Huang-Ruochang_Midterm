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


var dataset = "https://raw.githubusercontent.com/RuochangH/Huang-Ruochang_Midterm/master/jsMidterm.geojson";
var featureGroup;

//Read user input
var hour = $('#aioConceptName').find(":selected").text();
function wk(value) {if ()}
var Observed = L.geoJson(dataset, {filter: show}).addTo(map);
function show(feature) {
  if (feature.properties.Week === week && feature.properties.Hour === hour) {return true;}
}

var myStyle = function(feature) {
  var colors = {MON: "#F8B195",TUE:"#F67280",WED:"#C06C84",THU:"#6C5B7B",FRI:"#355C7D"};
  return {fillColor:colors[feature.properties.COLLDAY],fillOpacity:0.8, weight:2, color: "#ccc"};
};

var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};

var colldays=[];
var eachFeatureFunction = function(layer) {
  colldays.push(layer.feature.properties.COLLDAY);
  layer.on('click', function (event) {
    /* =====================
    The following code will run every time a layer on the map is clicked.
    Check out layer.feature to see some useful data about the layer that
    you can use in your application.
    ===================== */
    console.log(layer.feature.properties.COLLDAY);
    showResults();
    var day = function (val) {if(val=="MON") {return "Monday";} else if (
      val=="TUE") {return "Tuesday";} else if (
        val=="WED") {return "Wedsday";} else if (
          val=="THU"){return "Thursday";} else if (
            val=="FRI"){return "Friday";}};
    var fulday = day(layer.feature.properties.COLLDAY);
    $('.day-of-week').text(fulday);
  });
};

var myFilter = function(feature) {
  if(feature.properties.COLLDAY != " "){
  return true;}
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
    console.log(_.unique(colldays));
  });
});
