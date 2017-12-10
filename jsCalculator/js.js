const bValues = document.querySelectorAll('.bValue');
const result = document.querySelector('#result');
const h = document.querySelector('h1');
const h3 = document.querySelector('h3');
const cf = document.querySelector('#cf');
const clear = document.querySelector('#clear');
let pressed = true;
function clearIt() {
  h.textContent = 0;
  h3.textContent = 0;
  pressed = true;
}
bValues.forEach(v => v.addEventListener('click', () => {
  if (pressed) {
    h.textContent = '';
    pressed = false;
  }
  if (h.textContent.length > 17) {
    h.textContent = '';
    h3.textContent = 'too long';
    pressed = true;
  }
  h.textContent += v.value;
}));
result.addEventListener('click', () => {
  h3.textContent = h.textContent;
  const num = eval(h.textContent);
  h.textContent = num % 1 === 0 ? num : num.toFixed(2);
});

cf.addEventListener('click', () => {
  h.textContent = h.textContent.slice(0, -1);
  if (h.textContent === '') {
    clearIt();
  }
});

clear.addEventListener('click', () => {
  clearIt();
});

