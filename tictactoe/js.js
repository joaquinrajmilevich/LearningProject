const a = document.querySelectorAll('.action');
const x = document.querySelector('#x');
const o = document.querySelector('#o');
const popup = document.querySelector('#popup');
const popup1 = document.querySelector('#popup1');
const table = document.querySelector('table');
const p = document.querySelector('p');
let stop = false;
let huPlayer;
let aiPlayer;
let c1 = 'x';
let c2 = 'o';
let count = 0;
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
function wins() {
  if (winning(boardStatus, aiPlayer)) {
    p.innerHTML = 'YOU<br>LOSE!';
    popup1.classList.add('show');
    table.classList.add('filter');
    popup1.style.visibility = 'visible';
    stop = true;
  } else if (winning(boardStatus, huPlayer)) {
    p.innerHTML = 'YOU <br> WIN!';
    popup1.classList.add('show');
    table.classList.add('filter');
    popup1.style.visibility = 'visible';
    stop = true;
  } else if (count > 8) {
    p.innerHTML = "It's a<br>TIE!";
    popup1.classList.add('show');
    table.classList.add('filter');
    popup1.style.visibility = 'visible';
  }
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
  huPlayer = 'x';
  aiPlayer = 'o';
  popup.classList.add('hide');
  popup.style.visibility = 'hidden';
  table.classList.add('show');
});
o.addEventListener('click', () => {
  huPlayer = 'o';
  aiPlayer = 'x';
  c1 = 'oa';
  c2 = 'xa';
  count += 2;
  popup.classList.add('hide');
  popup.style.visibility = 'hidden';
  table.classList.add('show');
  const move = minimax(boardStatus, aiPlayer).index;
  boardStatus[move] = aiPlayer;
  a[move].classList.add(c2);
  a[move].parentElement.classList.add('oback');
});

a.forEach((e) => {
  e.addEventListener('click', () => {
    count += 1;
    if (!stop) {
      count += 1;
      window.setTimeout(wins, 1600);
      const index = Array.prototype.indexOf.call(a, e);
      if (boardStatus[index] !== huPlayer && boardStatus[index] !== aiPlayer) {
        boardStatus[index] = huPlayer;
        e.classList.add(c1);
        e.parentElement.classList.add('xback');
        if (winning(boardStatus, huPlayer)) {
          console.log('you win');
          window.setTimeout(wins, 1600);
        } else {
          window.setTimeout(() => {
            const move = minimax(boardStatus, aiPlayer).index;
            boardStatus[move] = aiPlayer;
            a[move].classList.add(c2);
            a[move].parentElement.classList.add('oback');
            if (winning(boardStatus, aiPlayer)) {
              console.log('you lose');
              window.setTimeout(wins, 1600);
            }
          }, 500);
        }
      }
    }
  });
});

popup1.addEventListener("click", () => history.go(0));
