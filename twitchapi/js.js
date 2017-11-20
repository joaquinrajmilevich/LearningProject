const channels = [
  'Fortnite', 'OgamingSC2', 'imaqtpie',
  'xqcow', 'moonducktv', 'asmongold',
  'savjz', 'camak',
];
const a = document.querySelectorAll('a');
const h2 = document.querySelectorAll('h2');
const p = document.querySelectorAll('p');
const img = document.querySelectorAll('img');
const link = 'https://wind-bow.glitch.me/twitch-api/';

function url(type, name) {
  return `${link + type}/${name}?jsoncallback=?;`;
}
function setColors(status, i) {
  if (status === 'Playing - ') {
    a[i].style.backgroundColor = '#15ff00';
  } else {
    a[i].style.backgroundColor = '#ff2600';
  }
}
function setStream(i) {
  $.getJSON(url('streams', channels[i]), (json) => {
    const name = channels[i];
    let status;
    let gamep;
    if (json.stream === null) {
      status = 'Offline';
      gamep = '';
    } else if (json.stream === undefined) {
      status = 'This channel no longer exists';
      gamep = '';
    } else {
      status = 'Playing - ';
      gamep = json.stream.game;
    }
    h2[i].textContent = name.toUpperCase();
    p[i].textContent = `${status + gamep}`;
    setColors(status, i);
  });
}
function setChannel(i) {
  $.getJSON(url('channels', channels[i]), (json) => {
    img[i].setAttribute('src', json.logo);
    a[i].setAttribute('href', json.url);
  });
}

function addStuff(i) {
  setStream(i);
  setChannel(i);
}

for (let i = 0; i < channels.length; i += 1) {
  addStuff(i);
}

