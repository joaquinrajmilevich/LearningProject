const action = document.querySelectorAll('.action');
let player = true;
action.forEach((e) => {
  e.addEventListener('mouseup', () => {
    if (player) {
      e.classList.add('x');
      player = false;
    } else if (!player) {
      e.classList.add('circle');
      player = true;
    }
  });
});
