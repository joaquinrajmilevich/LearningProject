let b = document.querySelector("button");
let i = document.querySelector("input");
let p = document.querySelector("p");
i.addEventListener("keypress", function (e) {
  let key = e.which || e.keyCode;
  if (key === 13) {
  	setApi();
  }
});

function setApi() {
	let api = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=";
	let format = "&format=jsonfm";
  let v = document.getElementById("search").value;
  api = api + v;
  showResults(api);
}

function showResults(api) {
	let a = document.querySelectorAll("a");
	$.getJSON(api, function(json) {
  	for (let i = 0; i < json[1].length; i++) {
  		a[i].textContent = json[1][i];
  		a[i].setAttribute("href", json[3][i]);
  	}
  });
}