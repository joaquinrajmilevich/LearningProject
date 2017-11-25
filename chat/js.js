const ai = document.querySelector('p');
const user = document.querySelector('input');
const aiMem = {};
const userMem = [];
const button = document.querySelector('button');
let c = false;
function isIn(x, val) {
  let t;
  for (let i = 0; i < x.length; i++) {
    if (x[i] === val) {
      t = true;
    }
  }
  return t;
}

function saludos(val) {
  const pos = ['hola', 'saludos', 'hi', 'holi'];
  if (isIn(pos, val)) {
    ai.textContent = 'Hola!';
    userMem.push(val);
  }
}

function estado(val) {
  const pos = ['como estas?', '¿como estas?', 'que tal?', '¿que tal?'];
  if (isIn(pos, val)) {
    ai.textContent = 'Bien, tu?';
    userMem.push(val);
  }
}

function askName(val) {
  const pos = ['bien', 'regular', 'normal', 'genial', 'muy bien'];
  if (isIn(pos, val)) {
    ai.textContent = 'Como te llamas?';
    userMem.push(val);
  }
}

function name(val) {
  if (!isIn(userMem, val) && c === false) {
    ai.textContent = `Un gusto ${val}, cuantos años tienes?`;
    Object.defineProperty(aiMem, 'name', {
      value: val,
    });
    userMem.push(val);
    c = true;
  }
}

function years(val) {
  if (!isIn(userMem, val) && !isNaN(val)) {
    ai.textContent = 'interesante, yo tengo un dia';
    Object.defineProperty(aiMem, 'years', {
      value: val,
    });
    console.log(aiMem);
    userMem.push(val);
  } if (!isIn(userMem, val) && !Number.isInteger(val)) {
    ai.textContent = 'Necesito un numero valido';
  }
}


function conversation() {
  const val = user.value.toLowerCase();
  saludos(val);
  estado(val);
  askName(val);
  name(val);
  years(val);
}

button.addEventListener('click', () => {
  conversation();
  user.value = '';
});
