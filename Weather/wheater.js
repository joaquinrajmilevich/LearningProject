let api = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;
let place = document.getElementById("place");

function getPos(lat, lon) {
  api = api + lat + lon;
}

$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = "lat=" + position.coords.latitude;
    let lon = "&lon=" + position.coords.longitude;
    getPos(lat, lon);
    update(api);
  });
});
function update(api) {
  $.getJSON(api, function(json) {
    place.textContent = json.name;
  });
};
