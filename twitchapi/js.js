const channels = [
  'ESL_SC2', 'OgamingSC2', 'cretetion',
  'freecodecamp', 'storbeck', 'habathcx',
  'RobotCaleb', 'noobs2ninjas',
];
const li = document.querySelectorAll('li');
const link = 'https://wind-bow.glitch.me/twitch-api/';
function url(type, name) {
  return `${link + type}/${name}?jsoncallback=?;`;
}
function addStuff(i) {
  $.getJSON(url('streams', channels[i]), (json) => {
    let status;
    let gamep;
    if (json.stream === null) {
      status = 'Offline';
      gamep = '';
    } else if (json.stream === undefined) {
      status = 'This channel no longer exists';
      gamep = '';
    } else {
      status = 'Online Playing - ';
      gamep = json.stream.game;
    }
    li[i].textContent = `${channels[i]}:${status}${gamep}`;
  });
}

for (let i = 0; i < channels.length; i += 1) {
  addStuff(i);
}

