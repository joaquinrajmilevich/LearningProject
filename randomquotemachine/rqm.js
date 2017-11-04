 $(document).ready(function() {
 	$("#getMessage").on("click", function() {
 		$.getJSON("https://gist.githubusercontent.com/dmakk767/9375ff01aff76f1788aead1df9a66338/raw/491f8c2e91b7d3b8f1c8230e32d9c9bc1a1adfa6/Quotes.json%2520", function(json) {
 			var r = Math.floor(Math.random() * (json.length - 0)) + 0;
 			$("#quote").html(JSON.stringify(json[r].quote));
 			$("#name").html(" ~ " + json[r].name.replace(/\"/g, ""));
		});
 	});

 	$("#tweet").click(function (){
 		var q = $("#quote").text();
 		var n = $("#name").text();
 		window.open('https://twitter.com/intent/tweet?text="' + q + '"' + n + '"', '_blank')
 	})
 });

