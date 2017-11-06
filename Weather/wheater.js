let api = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;
let change = document.querySelector("button");
function getPos(lat, lon) {
  api = api + lat + lon;
}
let unit = "celsius";

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
    $("#place").html(json.name);
    $("#status").html(json.weather[0].main);
    $("#icon").attr("src", json.weather[0].icon);
    temperature(json.main.temp);
  });
};
function temperature(t) {
  $("#temp").html(t + " °C");
  change.addEventListener("click", function () {
    if (unit == "celsius") {
      t = Math.round(t * 9 / 5 + 32);
      $("#temp").html(t + " °F");
      unit = "fahrenheit";
      change.textContent = "Fahrenheit to Celsius"
    } else {
      t = Math.round((t - 32) * 5 / 9);
      $("#temp").html(t + " °C");
      unit = "celsius";
      change.textContent = "Celsius to Fahrenheit"
    }
  });
}
