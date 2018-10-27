var topics = ["Walleye", "Crappie", "Small-Mouth Bass", "Large-Mouth Bass", "Blue Gill", "Yellow Perch", "Northern Pike", "Muskellunge"];

var makeButtons = function() {
	for (i = 0; i < topics.length; i++) {
		var newButton = $("<button type=button class=btn onclick=appendGifs()>");
		newButton.attr("data-fish", topics[i])
		newButton.text(topics[i]);
		$("#button-div").append(newButton);
	};
};

$(document).ready(makeButtons);

function addButton() {
	var fishInput = $("#fish-input").val().trim();
	topics.push(fishInput);
	$("#button-div").empty();
	makeButtons();
};

function appendGifs() {
	var fish = $(this).attr("data-fish");
	console.log(fish)

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fish + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
       	url: queryURL,
       	method: "GET"
   	}).then(function(response) {
       	var results = response.data;
       	console.log(results)
         	for (var i = 0; i < results.length; i++) {
          		var gifDiv = $("<div class=item>");
            	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating);
            	var fishImage = $("<img class=gif>");
            	fishImage.attr("onclick", changeState());
            	fishImage.attr("src", results[i].images.fixed_height.url);
            	fishImage.attr("data-animate", results[i].images.fixed_height_still.url);
            	fishImage.attr("data-still", results[i].images.fixed_height.url);
            	fishImage.attr("data-state", "still");
            	gifDiv.prepend(p);
            	gifDiv.prepend(fishImage);
            	$("#gif-div").prepend(gifDiv);
            };
    });
};

function changeState() {
    var state = $(this).attr("data-state");
    console.log(state);
	    if (state == "still") {
	        $(this).attr("data-state", "animate");
	        $(this).attr("src", $(this).attr("data-animate"));
	    };

	    if (state == "animate") {
	        $(this).attr("data-state", "still");
	        $(this).attr("src", $(this).attr("data-still"));
	    };
};