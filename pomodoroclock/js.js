const p = document.querySelector('p');
const time = document.querySelector('h1');
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
const less = document.querySelector('#less');
const more = document.querySelector('#more');
let s = Number(p.dataset.num);
let t = 59;
let timer = null;
time.textContent = `${s}:00`;
less.addEventListener('click', () => {
  clearInterval(timer);
  s -= 1;
  time.textContent = `${s}:00`;
  p.textContent = s;
  t = 0;
  if (s <= 1) {
    s = 2;
  }
});
more.addEventListener('click', () => {
  clearInterval(timer);
  s += 1;
  time.textContent = `${s}:00`;
  p.textContent = s;
  t = 0;
  if (s >= 60) {
    s = 59;
  }
});


function clear() {
  clearInterval(timer);
  s = Number(p.textContent);
  time.textContent = `${s}:00`;
  t = 0;
}

function setTime() {
  if (s === 0 && t === 0) {
    clear();
  } else if (t === 0) {
    s -= 1;
    t = 60;
  } else if (t === 60) {
    time.textContent = `${s}:00`;
  } else if (t < 10) {
    time.textContent = `${s}:0${t}`;
  } else {
    time.textContent = `${s}:${t}`;
  }
  t -= 1;
}

start.addEventListener('click', () => {
  clear();
  timer = setInterval(setTime, 1000);
});

reset.addEventListener('click', () => {
  clear();
});
