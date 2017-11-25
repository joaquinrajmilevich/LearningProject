const ai = document.querySelector('p');
const user = document.querySelector('input');
const aiMem = {};
const userMem = [];
const button = document.querySelector('button');
let c = false;
let c1 = false;
let c2 = false;
let c3 = false;

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
    c1 = true;
  }
}

function estado(val) {
  const pos = ['como estas?', '¿como estas?', 'que tal?', '¿que tal?'];
  if (isIn(pos, val) && c1) {
    ai.textContent = 'Bien, tu?';
    userMem.push(val);
    c2 = true;
  }
}

function askName(val) {
  const pos = ['bien', 'regular', 'normal', 'genial', 'muy bien'];
  if (isIn(pos, val) && c2) {
    ai.textContent = 'Como te llamas?';
    userMem.push(val);
    c3 = true;
  }
}

function name(val) {
  if (!isIn(userMem, val) && c === false && c3) {
    ai.textContent = `Un gusto ${val}, cuantos años tienes?`;
    Object.defineProperty(aiMem, 'name', {
      value: val,
    });
    userMem.push(val);
    c = true;
  }
}

function years(val) {
  if (!isIn(userMem, val) && !isNaN(val) && c) {
    ai.textContent = 'interesante, yo tengo un dia';
    Object.defineProperty(aiMem, 'years', {
      value: val,
    });
    console.log(aiMem);
    userMem.push(val);
  }
  if (!isIn(userMem, val) && !Number.isInteger(val) && c) {
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
