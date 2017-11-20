const inp = document.querySelector('input');
const desc = document.getElementsByClassName('desc');
const title = document.getElementsByClassName('title');
const res = document.getElementById('results');

function showResults(api) {
  const a = document.getElementsByClassName('des');
  $.getJSON(api, (json) => {
    for (let i = 0; i < json[1].length; i++) {
      title[i].textContent = json[1][i];
      desc[i].textContent = json[2][i];
      a[i].setAttribute('href', json[3][i]);
    }
  });
}

function setApi() {
  let api =
    'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=';
  const v = document.getElementById('search').value;
  api += v;
  showResults(api);
}
inp.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) {
    setApi();
    res.style.visibility = 'visible';
    res.style.opacity = 1;
  }
});
