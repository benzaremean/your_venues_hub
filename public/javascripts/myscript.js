var apiKey = '66fbb0e43eb647e7aa930936d2dce669';
var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
//var map = L.map('map').setView([51.505, -0.09], 12);
var openStreetMap =  'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
var cloudMade = 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png';

// add an OpenStreetMap tile layer
//L.tileLayer(cloudMade, {
//    attribution: attribution,
//    key: apiKey,
//    styleId: 997,
//    maxZoom: 18
//}).addTo(map);
//
//var popup = L.popup();
//
//function onMapClick(e) {
//    popup
//        .setLatLng(e.latlng)
//        .setContent("You clicked the map at " + e.latlng.toString())
//        .openOn(map);
//}
//
//map.on('click', onMapClick);
//
//$.get('venues/listVenues', function (data) {
//    $.each(data, function (index, venue) {
//        $("#venues-list").append('<li>' + venue.name + '</li>');
//        var marker = L.marker([venue.address.latitude, venue.address.longitude]).addTo(map);
//         marker.bindPopup("<b>"+ venue.name +"</b>").openPopup();
//    });
//});

function pagination() {
    if($("#searchResults").length == 0) {
        return;
    }
    var page = $("#searchResults").data("page").toString();
    var liCount = $(".pagination li").length;
    $(".pagination li").find("a").each(function() {
        if ($(this).text() === page) {
            $(this).closest("li").addClass("active");
            if ($(this).text() === "1") {
                $("#prev").remove();
                liCount = liCount - 1;
            }
        }
    });
    var activeLi = $(".pagination li.active");
    if($(".pagination li").index(activeLi) === liCount - 2) {
        $("#next").remove();
    }
}

$('#refineYourSearch a').click(function() {
    if($(this).find('i.icon-chevron-right').length != 0) {
        $(this).find('i.icon-chevron-right').removeClass('icon-chevron-right').addClass('icon-chevron-down');
    } else {
        $(this).find('i.icon-chevron-down').removeClass('icon-chevron-down').addClass('icon-chevron-right');
    }
});

$('.carousel').carousel();

function pinLocationOnResultsPage() {
    var $pageDisplay =  $('#page-display');
    if($pageDisplay.length != 0) {
        var $long = $pageDisplay.data("longitude");
        var $lat = $pageDisplay.data("latitude");
        //add an OpenStreetMap tile layer
        var map = L.map('map').setView([$lat, $long], 12);
        L.tileLayer(cloudMade, {
            attribution: attribution,
            key: apiKey,
            styleId: 997,
            maxZoom: 18
        }).addTo(map);
        L.marker([$lat, $long]).addTo(map);
    }
}

function setMapForView() {
    if($("#views #map").length == 0) {
        return;
    }
    var map = L.map('map').setView([51.505, -0.09], 12);
    L.tileLayer(cloudMade, {
        attribution: attribution,
        key: apiKey,
        styleId: 997,
        maxZoom: 18
    }).addTo(map);
    $.get('venues/listVenues', function (data) {
        $.each(data, function (index, venue) {
            $("#venues-list").append('<li>' + venue.name + '</li>');
            var marker = L.marker([venue.address.latitude, venue.address.longitude]).addTo(map);
             marker.bindPopup("<b>"+ venue.name +"</b>").openPopup();
        });
    });

}

function removeAlert() {
    $(".alert").delegate("button", "click", function() {
        sessionStorage.setItem("alert-dismissed", "true");
    });

}

function selectThings() {
    $(".cont").delegate("input[type='checkbox']", "click", function() {
        $(this).closest(".cont").toggleClass("selected");
    });
    $("#thumbnails-view").delegate("input[type='checkbox']", "click", function() {
        $(this).closest("li").toggleClass("selected");
    });
}

function compare(ev) {
    ev.preventDefault();
    var selectedForComparison = $(".selected");
    var buildComparators = "";
    $.each(selectedForComparison, function(index, value){
        buildComparators += value.getAttribute("id") + "%";
    });
    //alert(buildComparators);
    $('#compare-form').attr('action', '/venues/compare?cmp=' + buildComparators);
}

jQuery(document).ready(function($) {
    function switchView(e) {
        e.preventDefault();
        $("#display-views").find("a.active").removeClass("active");
        $(this).addClass("active");
        showView($(this).attr("href"));
    }

    function showView(active) {
        $("#views .views").hide();
        $(active).show();
        sessionStorage.setItem("view", active);
    }

    setMapForView();

    removeAlert();
    if(sessionStorage.getItem("alert-dismissed") === "true") {
        $(".alert").hide();
    }

    $("#display-views").delegate("a", "click", switchView);
    if(sessionStorage.getItem("view")) {
        $('#display-views a[href="' + sessionStorage.getItem("view") + '"]').click();
    } else {
        $("#display-views a:eq(0)").click();
    }

    pagination();

    pinLocationOnResultsPage();

    selectThings();

    $("#compare-form").delegate("button", "click", compare);





});





