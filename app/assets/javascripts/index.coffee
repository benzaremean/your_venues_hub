# add an OpenStreetMap tile layer
###onMapClick = (e) ->
  popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn map

apiKey = "66fbb0e43eb647e7aa930936d2dce669"

map = L.map("map").setView([51.505, -0.09], 12)

L.tileLayer("http://{s}.tile.cloudmade.com/" + apiKey + "/997/256/{z}/{x}/{y}.png",
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://cloudmade.com\">CloudMade</a>"
  maxZoom: 18
).addTo map

popup = L.popup()
map.on "click", onMapClick



$.get "venues/listVenues", (data) ->
  if data.length is 0
    $("#venue-nos").text "No venues were found"
  else
    $("#venue-nos").text data.length + " Venue(s) found"
  $.each data, (index, venue) ->
    $("#venues-list").append "<li>#{venue.name}</li>"
    marker = L.marker([venue.address.latitude, venue.address.longitude]).addTo(map)
    marker.bindPopup("<b>" + venue.name + "</b>").openPopup()###