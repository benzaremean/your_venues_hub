/*function prepareEventHandlers() {
	var search = document.getElementById("search");
	search.value = "";
} */

/*var apiKey = '66fbb0e43eb647e7aa930936d2dce669';

var map = L.map('map').setView([51.505, -0.09], 12);

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.cloudmade.com/' +apiKey+ '/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

$.get('venues/listVenues', function (data) {
    if (data.length === 0) {
        $("#venue-nos").text("No venues were found");
    } else {
        $("#venue-nos").text(data.length + " Venue(s) found");
    }
    $.each(data, function (index, venue) {
        $("#venues-list").append('<li>' + venue.name + '</li>');
        var marker = L.marker([venue.address.latitude, venue.address.longitude]).addTo(map);
         marker.bindPopup("<b>"+ venue.name +"</b>").openPopup();
    });
});*/

jQuery(document).ready(function($) {
    function switchView(e) {
        e.preventDefault();
        $("#display-views").find("a.active").removeClass("active");
        $(this).addClass("active");
        $("#list-view").hide("slow");
    }
    $("#display-views").find("a").on('click' , switchView);



});


