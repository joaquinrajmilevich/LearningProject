let i = document.querySelector("input");
let desc = document.getElementsByClassName("desc");
let title = document.getElementsByClassName("title");
let res = document.getElementById("results");
i.addEventListener("keypress", function(e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
        setApi();
        res.style.visibility = 'visible';
        res.style.opacity = 1;
    }
});

function setApi() {
    let api = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=";
    let v = document.getElementById("search").value;
    api = api + v;
    showResults(api);
}

function showResults(api) {
    let a = document.getElementsByClassName("des");
    $.getJSON(api, function(json) {
        for (let i = 0; i < json[1].length; i++) {
            title[i].textContent = json[1][i];
            desc[i].textContent = json[2][i];
            a[i].setAttribute("href", json[3][i]);
        }
    });
}