const a = document.querySelectorAll('.action');
let stop = false;
let xPlayed = false;
const huPlayer = 'x';
const aiPlayer = 'o';
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


function wins(symbol) {
  winCombos.forEach((comb) => {
    const p0 = a[comb[0]].parentElement;
    const p1 = a[comb[1]].parentElement;
    const p2 = a[comb[2]].parentElement;
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
  });
}
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
function minimax(board, cplay) {
  let emptySpots = filterIt(boardStatus);
  if (winning(board, huPlayer)) {
    return { score: -10 };
  } else if (winning(board, aiPlayer)) {
    return { score: 10 };
  } else if (emptySpots.length === 0) {
    return { score: 0 };
  }
  const moves = [];
  for (let spot = 0; spot < emptySpots.length; spot++) {
    let move = {};
    move.index = board[emptySpots[spot]];
    boardStatus[emptySpots[spot]] = cplay;
    if (cplay === aiPlayer) {
      let result = minimax(board, huPlayer);
      move.score = result.score;
    } else {
      let result = minimax(board, aiPlayer);
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
function filterIt(board) {
  return board.filter(s => s !== 'o' && s !== 'x');
}
a.forEach((e) => {
  e.addEventListener('click', () => {
    if (!stop) {
      const index = Array.prototype.indexOf.call(a, e);
      if (boardStatus[index] !== huPlayer && boardStatus[index] !== aiPlayer) {
        boardStatus[index] = huPlayer;
        e.classList.add(huPlayer);
        e.parentElement.classList.add('xback');
        if (winning(boardStatus, huPlayer)) {
          console.log('you win');
          wins(huPlayer);
        } else {
          const move = minimax(boardStatus, aiPlayer).index;
          console.log(move);
          boardStatus[move] = aiPlayer;
          a[move].classList.add('circle');
          a[move].parentElement.classList.add('oback');
          if (winning(boardStatus, aiPlayer)) {
            console.log('you lose');
            wins(aiPlayer);
          }
        }
      }
    }
  });
});
