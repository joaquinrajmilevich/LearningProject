let api = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;
let place = document.getElementById("place");
$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = "lat=" + position.coords.latitude;
    let lon = "&lon=" + position.coords.longitude;
    getPos(lat, lon);
  });
});

function getPos(lat, lon) {
  api = api + lat + lon;
}

$.getJSON(api, function(json) {
  console.log(json);
})