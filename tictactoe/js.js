const a = document.querySelectorAll('.action');
let player = 'x';
let stop = false;
let xPlayed = false;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
const boardStatus = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
};
const acceptedValues = [''];

function filter(myObject) {
  const obj = Object.assign({}, myObject);
  Object.keys(obj).forEach((key) => {
    if (acceptedValues.indexOf(obj[key]) < 0) delete obj[key];
  });
  return obj;
}

function wins(symbol) {
  winCombos.forEach((comb) => {
    const fEl = boardStatus[comb[0]];
    const sEl = boardStatus[comb[1]];
    const lEl = boardStatus[comb[2]];
    const p0 = a[comb[0]].parentElement;
    const p1 = a[comb[1]].parentElement;
    const p2 = a[comb[2]].parentElement;
    if (fEl === symbol && sEl === symbol && lEl === symbol) {
      console.log(`${symbol} wins`);
      if (symbol === 'x') {
        p0.classList.remove('xback');
        p1.classList.remove('xback');
        p2.classList.remove('xback');
      } else {
        p0.classList.remove('oback');
        p1.classList.remove('oback');
        p2.classList.remove('oback');
      }
      p0.classList.add('win');
      p1.classList.add('win');
      p2.classList.add('win');
      stop = true;
    }
  });
}
a.forEach((e) => {
  e.addEventListener('click', () => {
    if (!stop) {
      const index = Array.prototype.indexOf.call(a, e);
      if (boardStatus[index] !== 'x' && boardStatus[index] !== 'o') {
        boardStatus[index] = player;
        console.log(boardStatus[index]);
        filter(boardStatus);
        if (player === 'x') {
          e.classList.add('x');
          e.parentElement.classList.add('xback');
          wins(player);
          player = 'o';
          xPlayed = true;
        } else {
          e.classList.add('circle');
          e.parentElement.classList.add('oback');
          wins(player);
          player = 'x';
        }
      }
    }
    if (xPlayed) {
      xPlayed = false;
      const left = Object.keys(filter(boardStatus));
      let rand = left[Math.floor(Math.random() * left.length)];
      window.setInterval(() => {
        a[rand].click();
      }, 400);
    }
  });
});