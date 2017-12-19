const colors = document.querySelectorAll('.c');
const arr = [1, 3, 2, 0, 1, 2, 1, 0];
const els = [0, 1, 2, 3];

function game() {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      console.log(colors[i].trigger('mousedown'));
      setTimeout(() => {
        $(colors[i]).delay(900).trigger('mouseup');
      }, 500);
    }, 1500);
  }
}

arr.push(Math.floor(Math.random() * 3.99));
$('input').removeAttr('checked');

function startGame() {
  colors.forEach((e) => {
    const audio = $(e).children()[0];
    $(e).mousedown(() => {
      $(e).addClass('contrast');
      if (!audio) return;
      audio.currentTime = 0;
      audio.pause();
      audio.play();
    });
    $(e).mouseup(() => {
      $(e).removeClass('contrast');
    });
    game();
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

$('#start').click(() => startGame());