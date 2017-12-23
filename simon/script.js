const colors = document.querySelectorAll('.c');
const arr = [];
const playerArr = [];
let counter = 0;
let stop = false;
$('input').removeAttr('checked');
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
  arr.push(Math.floor(Math.random() * 3.99));
  let a = 0;
  const light = setInterval(() => {
    setLight(colors[arr[a]]);
    const timeout = setTimeout(() => {
      removeLight(colors[arr[a]]);
      a += 1;
    }, 500);
    if (a === arr.length) {
      clearTimeout(timeout);
      clearInterval(light);
    }
  }, 1000);
  return true;
}
function player() {
  colors.forEach((e) => {
    $(e).mousedown(() => {
      if (!stop) {
        setLight(e);
        playerArr.push(Array.prototype.indexOf.call(colors, e));
        for (let i = 0; i < playerArr.length; i++) {
          console.log(i);
          if (JSON.stringify(playerArr) === JSON.stringify(arr)) {
            playerArr.length = 0;
            ai();
            counter += 1;
            $('#counter p').text(counter);
          } else if (playerArr[i] !== arr[i]) {
            playerArr.length = 0;
            alert('You lose');
            arr.length = 0;
            $('#counter p').text('--');
            stop = true;
            counter = 0;
          }
        }
      }
    });
    $(e).mouseup(() => {
      removeLight(e);
    });
  });
}

function game() {
  ai();
  player();
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

$('#start').click(() => {
  stop = false;
  game();
});
