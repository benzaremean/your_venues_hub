var apiKey = '66fbb0e43eb647e7aa930936d2dce669';
var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
var map = L.map('map').setView([51.505, -0.09], 12);
var openStreetMap =  'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var cloudMade = 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png';

// add an OpenStreetMap tile layer
L.tileLayer(cloudMade, {
    attribution: attribution,
    key: apiKey,
    styleId: 997,
    maxZoom: 18
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

$.get('venues/listVenues', function (data) {
    $.each(data, function (index, venue) {
        $("#venues-list").append('<li>' + venue.name + '</li>');
        var marker = L.marker([venue.address.latitude, venue.address.longitude]).addTo(map);
         marker.bindPopup("<b>"+ venue.name +"</b>").openPopup();
    });
});

jQuery(document).ready(function($) {
    function switchView(e) {
        e.preventDefault();
        $("#display-views").find("a.active").removeClass("active").bind("click", switchView);
        $(this).addClass("active").unbind("click", switchView);
        showView($(this).attr("href"));
    }

    function showView(active) {
        $("#views .views").hide();
        $(active).show();
    }
    $("#display-views").find("a").on('click' , switchView);
    $("#display-views a:eq(0)").click();
});






//var noOfResults = $("searchResults").data("results");
//var y = noOfResults % 10 === 0 ? noOfResults / 10 : (noOfResults / 10) + 1;
//if(y > 1) {
//    for (var i = 1; i <= y; i++)
//        '<li><a href>"/venues?page=1"</a></li>'
//} else {
//    //do nothing
//}





