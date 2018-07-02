var apiKey = "kXGGQUfiUFkoRamOkULORlLupHPzrA1L";
var limit = 10;
var rating = "G";
var queryURL = "https://api.giphy.com/v1/gifs/search"
var animalsArray = ["Axolotl", "Chinchilla", "Colugo", "Mantis Shrimp", "Pangolin", "Quokka", "Red Panda", "Shoebill", "Sun Bear", "Tapir", "Tarsier", "Wombat" ];

function addButton(addAnimal) {
    var animalButton = $("<button>");
    animalButton.addClass("animal-click");
    animalButton.addClass("button-styling");
    animalButton.html(addAnimal);
    $("#button-box").append(animalButton);
}

$(document.body).ready(function(){
    
    for (var i = 0; i < animalsArray.length; i++) {
        addButton(animalsArray[i]);
    }

    $("#animal-submit").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        if ((animal !== "") && (animalsArray.indexOf(animal) === -1)) {
            animalsArray.push(animal);
            addButton(animal);
        }
        $("#animal-input").val('');
    });

    $(document.body).on("click", ".animal-click", function(event) {

        event.preventDefault();

        queryURL += '?' + $.param({
            'api_key': apiKey,
            'q': event.target.textContent,
            'limit': limit,
            'rating': rating
        });

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(result) {

            var resultArray = result.data;
            $("#gif-box").empty();

            for (var i = 0; i < resultArray.length; i++) {
                
                var gifCard = $("<div>");
                gifCard.addClass("gif-card");

                var gifCardImg = $("<img>");
                gifCardImg.addClass("gif-card-img");
                gifCardImg.attr("src", resultArray[i].images.fixed_width_still.url);
                gifCardImg.attr("data-still", resultArray[i].images.fixed_width_still.url);
                gifCardImg.attr("data-animate", resultArray[i].images.fixed_width.url);
                gifCardImg.attr("data-state", "still");
                

                var gifCardFooter = $("<p>");
                gifCardFooter.addClass("gif-card-footer");
                gifCardFooter.text("Rating: " + resultArray[i].rating);

                gifCard.append(gifCardImg);
                gifCard.append(gifCardFooter);
                
                $("#gif-box").append(gifCard);
            }

        }).fail(function(err) {
            throw err;
        });

    });

    $(document.body).on("click", ".gif-card-img", function(event) {

        if ($(this).attr("data-state") === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

    });

});