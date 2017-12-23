const colors = document.querySelectorAll('.c');
const arr = [];
const playerArr = [];
let counter = 0;
let stop = false;
let mStrict = false;
const speed = [1000, 800, 600];
let s = 0;

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

function reset() {
  playerArr.length = 0;
  arr.length = 0;
  counter = 0;
  $('#counter p').text('--');
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
      s += 1;
      if (s === 3) {
        s = 0;
      }
    }
  }, speed[s]);
}

function check() {
  for (let i = 0; i < playerArr.length; i++) {
    if (JSON.stringify(playerArr) === JSON.stringify(arr)) {
      playerArr.length = 0;
      arr.push(Math.floor(Math.random() * 3.99));
      ai();
      counter += 1;
      $('#counter p').text(counter);
    } else if (playerArr[i] !== arr[i] && mStrict) {
      arr.push(Math.floor(Math.random() * 3.99));
      reset();
      ai();
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
        const key = Array.prototype.indexOf.call(colors, e);
        playerArr.push(key);
        setLight(e);
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
player();
$('input').click(() => {
  if ($('input').is(':checked')) {
    $('button').prop('disabled', false);
    $('#strict').prop('disabled', false);
    $('#counter p').text('--');
    stop = true;
  } else {
    $('button').prop('disabled', true);
    $('#strict').prop('disabled', true);
    $('#counter p').text('');
    reset();
    stop = true;
  }
});

$('#strict').click(() => {
  if (mStrict) {
    mStrict = false;
    $('#strict').text('NORMAL');
  } else {
    mStrict = true;
    $('#strict').text('STRICT');
  }
  reset();
});

$('#start').click(() => {
  reset();
  arr.push(Math.floor(Math.random() * 3.99));
  ai();
  stop = false;
});
