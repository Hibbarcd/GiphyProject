const animals = [ "Elephant", "Penguin", "Crocodile", "Mermaid", "Pit Bull"];

      function renderButtons() {
        const animalView = $("#animalbtn");
        animalView.empty();


        for (let i = 0; i < animals.length; i++) {

          var button = $("<button>");

          button.addClass("animal");
          button.attr("data-name", animals[i]);
          button.text(animals[i]);

          $("#animalbtn").append(button);
        }
      }

      $("#add-animal").on("click", function(event) {
      event.preventDefault();
        let animal = $("#animal-input").val().trim();
        animals.push(animal);
        renderButtons();
       
      });
      

      renderButtons();
//=======created buttons functional================================================
        $("#animal-input").on("click", function() {
            let animal = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q?" + animal + "&api_key=lrsooYRr3F7AO9WPm7K3vvOnXt3OGcZB&limit=2";

//=====================original array===================================================
            });  
            $("#animalbtn").on("click", function() {
              let animal = $(this).attr("data-animal");
              var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              animal + "&api_key=lrsooYRr3F7AO9WPm7K3vvOnXt3OGcZB&limit=2";
  
      $.ajax({
          url: queryURL, method: "GET"}).then(function(response) {
              var results = response.data;
                  for ( let i = 0; i < results.length; i++ ) {
  
                      var animalDiv = $("<div>");          
                      var rating = results[i].rating;          
                      var p = $("<p>").text("Rating: " + rating);        
                      var animalImage = $("<img>");
                      animalDiv.addClass("animalImg");
                      animalImage.attr("src", results[i].images.fixed_height.url);
            
                      animalDiv.append(p);
                      animalDiv.append(animalImage);
                      $("#animal-view").prepend(animalDiv);
                    }
                  });

              }); 
