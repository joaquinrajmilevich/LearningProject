const a = document.querySelectorAll('.action');
const x = document.querySelector('#x');
const o = document.querySelector('#o');
const popup = document.querySelector('#popup');
const table = document.querySelector('table');
let stop = false;
let huPlayer;
let aiPlayer;
let c1 = 'x';
let c2 = 'o';
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
const boardStatus = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function filterIt(board) {
  return board.filter(s => s !== 'o' && s !== 'x');
}
function winning(board, player) {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  }
  return false;
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
      if (winning(boardStatus, huPlayer)) {
        p0.classList.remove('xback');
        p1.classList.remove('xback');
        p2.classList.remove('xback');
        p0.classList.add('win');
        p1.classList.add('win');
        p2.classList.add('win');
      } else {
        p0.classList.remove('oback');
        p1.classList.remove('oback');
        p2.classList.remove('oback');
        p0.classList.add('wino');
        p1.classList.add('wino');
        p2.classList.add('wino');
      }

      stop = true;
    }
  });
}

function minimax(board, cplay) {
  const emptySpots = filterIt(boardStatus);
  if (winning(board, huPlayer)) {
    return { score: -10 };
  } else if (winning(board, aiPlayer)) {
    return { score: 10 };
  } else if (emptySpots.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  for (let spot = 0; spot < emptySpots.length; spot++) {
    const move = {};
    move.index = board[emptySpots[spot]];
    boardStatus[emptySpots[spot]] = cplay;
    if (cplay === aiPlayer) {
      const result = minimax(board, huPlayer);
      move.score = result.score;
    } else {
      const result = minimax(board, aiPlayer);
      move.score = result.score;
    }
    boardStatus[emptySpots[spot]] = move.index;
    moves.push(move);
  }
  let bestMove;

  if (cplay === aiPlayer) {
    let bestScore = -10000;
    for (let el = 0; el < moves.length; el++) {
      if (moves[el].score > bestScore) {
        bestScore = moves[el].score;
        bestMove = el;
      }
    }
  } else {
    let bestScore = 10000;
    for (let el = 0; el < moves.length; el++) {
      if (moves[el].score < bestScore) {
        bestScore = moves[el].score;
        bestMove = el;
      }
    }
  }
  return moves[bestMove];
}
x.addEventListener('click', () => {
  console.log(popup);
  huPlayer = 'x';
  aiPlayer = 'o';
  popup.classList.add('hide');
  table.classList.add('show');
});
o.addEventListener('click', () => {
  console.log(popup);
  huPlayer = 'o';
  aiPlayer = 'x';
  c1 = 'oa';
  c2 = 'xa';
  popup.classList.add('hide');
  table.classList.add('show');
  const move = minimax(boardStatus, aiPlayer).index;
  boardStatus[move] = aiPlayer;
  a[move].classList.add(c2);
  a[move].parentElement.classList.add('oback');
});
a.forEach((e) => {
  e.addEventListener('click', () => {
    if (!stop) {
      const index = Array.prototype.indexOf.call(a, e);
      if (boardStatus[index] !== huPlayer && boardStatus[index] !== aiPlayer) {
        boardStatus[index] = huPlayer;
        e.classList.add(c1);
        e.parentElement.classList.add('xback');
        if (winning(boardStatus, huPlayer)) {
          console.log('you win');
          wins(huPlayer);
        } else {
          window.setTimeout(() => {
            const move = minimax(boardStatus, aiPlayer).index;
            boardStatus[move] = aiPlayer;
            a[move].classList.add(c2);
            a[move].parentElement.classList.add('oback');
            if (winning(boardStatus, aiPlayer)) {
              console.log('you lose');
              wins(aiPlayer);
            }
          }, 500);
        }
      }
    }
  });
});
