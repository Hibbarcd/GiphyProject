$( document ).ready(function() {

    var animals = ["Crocodile", "Hawk", "PitBull", "Elephant", "Buffalo", "Porcupine"];

    function displayGifButtons(){
        $("#animal-view").empty(); 
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("animal");
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#animalbtn").prepend(gifButton);
        }
    }
    // add new action button======================

        $("#add-animal").on("click", function(event){
        event.preventDefault();    
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
        console.log(animal);
        
        var gifButton = $("<button>");
        gifButton.addClass("animal");
        gifButton.attr("data-name", animal);
        gifButton.text(animal);
        $("#animalbtn").prepend(gifButton);
            // addNewButton();
            if (animal == ""){
                return false; 
            // user cannot add a blank button
            }
        });
        displayGifButtons(); 
    });

    function displayGifs(){
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=lrsooYRr3F7AO9WPm7K3vvOnXt3OGcZB&limit=10&rating=pg-13";
        console.log(queryURL); 

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // response test
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i = 0; i < results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                // rating of gif==============================
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>")

                gifImage.attr("src", results[i].images.fixed_height_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                $("#animal-view").prepend(gifDiv);
            }
        });
    }

    // displayGifButtons(); 

    $(document).on("click", ".animal", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
   