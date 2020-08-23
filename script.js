window.onload = function() {
  var mymap = L.map('mapid', {
    center: [40.731701, -73.993411],
    zoom: 14,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Max Taxi',
  }).addTo(mymap);
  var myIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/iconic/open-iconic/master/png/map-marker-8x.png',
    iconSize: [32, 32],
    iconAnchor: [16,32]
  });
  var startMarker=L.marker([52.55, 13.47], {icon: myIcon}).addTo(mymap);
  var endMarker=undefined;

  mymap.on('dblclick', function(e) {
    let latlnt=mymap.getCenter();
    console.log(latlnt);
    if(endMarker === undefined) {
      endMarker=L.marker([latlnt.lat+0.3, latlnt.lng+0.3], {icon: myIcon}).addTo(mymap);
    }
    else {
      alert('Done');
    }
  });
  mymap.doubleClickZoom.disable(); 
  var sl, el;
  mymap.on("zoomstart", function(e) {
    sl=mymap.getCenter();
  });
  mymap.on("zoomend", function(e) {
    startMarker.setLatLng(sl);
    mymap.panTo(sl);
  });
  mymap.on('move', function () {
    if(endMarker === undefined) {
      startMarker.setLatLng(mymap.getCenter());
    }
    else {
      endMarker.setLatLng(mymap.getCenter());
    }
  });
}
