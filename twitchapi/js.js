let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let li = document.querySelector("li");
  channels.forEach(function (channel) {
    function url(type, name) {
      return "https://wind-bow.glitch.me/twitch-api/" + type + "/" + name + "?jsoncallback=?";
    }
    $.getJSON(url("streams", channel), function(json){
      let status, game;
      if (json.stream === null) {
        status = "Offline";
        game = "";
      }
      else if (json.stream === undefined) {
        status = "This channel no longer exists";
        game = "";
      }
      else {
        status = "Online";
        game = json.stream.game;
      }
    });
    for (var i = 0; i < li.length; i++) {
      console.log(li[i].textContent = status);
    }

  });
}
