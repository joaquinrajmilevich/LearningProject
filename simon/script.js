const colors = document.querySelectorAll('.c');
const arr = [];
const playerArr = [];
let counter = 0;
let stop = false;
let mStrict = false;
function setLight(el) {
  const audio = $(el).children()[0];
  $(el).addClass('contrast');
  if (!audio) return;
  audio.currentTime = 0;
  audio.pause();
  audio.play();
}

function removeLight(el) {
  $(el).removeClass('contrast');
}

function ai() {
  let a = 0;
  stop = true;
  const light = setInterval(() => {
    setLight(colors[arr[a]]);
    const timeout = setTimeout(() => {
      removeLight(colors[arr[a]]);
      a += 1;
    }, 500);
    if (a === arr.length) {
      clearTimeout(timeout);
      clearInterval(light);
      stop = false;
    }
  }, 1000);
}

function check() {
  for (let i = 0; i < playerArr.length; i++) {
    console.log(i);
    if (JSON.stringify(playerArr) === JSON.stringify(arr)) {
      playerArr.length = 0;
      arr.push(Math.floor(Math.random() * 3.99));
      ai();
      counter += 1;
      $('#counter p').text(counter);
    } else if (playerArr[i] !== arr[i] && mStrict) {
      playerArr.length = 0;
      arr.length = 0;
      arr.push(Math.floor(Math.random() * 3.99));
      ai();
      counter = 0;
      $('#counter p').text('--');
    } else if (playerArr[i] !== arr[i]) {
      playerArr.length = 0;
      ai();
    }
  }
}

function player() {
  colors.forEach((e) => {
    $(e).mousedown(() => {
      if (!stop) {
        setLight(e);
        playerArr.push(Array.prototype.indexOf.call(colors, e));
        window.setTimeout(check, 250);
      }
    });
    $(e).mouseup(() => {
      if (!stop) {
        removeLight(e);
      }
    });
  });
}

$('input').click(() => {
  if ($('input').is(':checked')) {
    $('button').prop('disabled', false);
    $('#counter p').text('--');
  } else {
    $('button').prop('disabled', true);
    $('#counter p').text('');
  }
});

$('#strict').click(() => {
  if (mStrict) {
    mStrict = false;
  }
  mStrict = true;
  playerArr.length = 0;
  arr.length = 0;
  arr.push(Math.floor(Math.random() * 3.99));
  ai();
  counter = 0;
  $('#counter p').text('--');
});

$('#start').click(() => {
  arr.push(Math.floor(Math.random() * 3.99));
  stop = false;
  ai();
  player();
});
