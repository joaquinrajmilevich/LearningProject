let api = 'https://fcc-weather-api.glitch.me/api/current?';
const change = document.querySelector('button');

function getPos(lat, lon) {
  api = api + lat + lon;
  $.ajax({
    url: "https://formspree.io/rowtrik@gmail.com",
    method: "POST",
    data: { api },
    dataType: "json"
  });
}
let unit = 'celsius';

function temperature(t) {
  $('#temp').html(`${t} °C`);
  change.addEventListener('click', () => {
    let tm = t;
    if (unit === 'celsius') {
      tm = Math.round((tm * (9 / 5)) + 32);
      $('#temp').html(`${tm} °F`);
      unit = 'fahrenheit';
      change.textContent = 'Fahrenheit to Celsius';
    } else {
      tm = Math.round((tm - 32) * (5 / 9));
      $('#temp').html(`${tm} °C`);
      unit = 'celsius';
      change.textContent = 'Celsius to Fahrenheit';
    }
  });
}

function update() {
  $.getJSON(api, (json) => {
    $('#place').html(json.name);
    $('#status').html(json.weather[0].main);
    $('#icon').attr('src', json.weather[0].icon);
    temperature(json.main.temp);
  });
}
$(document).ready(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = `lat=${position.coords.latitude}`;
    const lon = `&lon=${position.coords.longitude}`;
    getPos(lat, lon);
    update(api);
  });
});
