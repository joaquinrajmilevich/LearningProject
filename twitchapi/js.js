const channels = [
  "ESL_SC2", "OgamingSC2", "cretetion", 
  "freecodecamp", "storbeck", "habathcx", 
  "RobotCaleb", "noobs2ninjas"
];
let li = document.querySelectorAll("li");
const link = "https://wind-bow.glitch.me/twitch-api/"

for (let i = 0; i < channels.length; i++) {
  addStuff(i);
}
function url(type, name) {
  return link + type + "/" + name + "?jsoncallback=?;";
}
function addStuff(i) {
  $.getJSON(url("streams", channels[i]), function (json) {
    let status;
    let game;
    if (json.stream === null) {
      status = "Offline";
      game = "";
    } else if (json.stream === undefined) {
      status = "This channel no longer exists";
      game = "";
    } else {
      status = "Online Playing - ";
      game = json.stream.game;
    }
    li[i].textContent = channels[i] + ": " + status + game;
  });
}