$(document).ready(function() {

  //save endpoint for reuse
  var baseURL = "http://www.omdbapi.com/";

  //create handlebars template
  var source = $("#movie-card-template").html();
  var movieTemplate = Handlebars.compile(source);

  $("#movie-search-form").on("submit", function() {
    event.preventDefault();

    //grab value within input box
    var movieTitle =  $("#movie-title").val();
    // console.log(movieTitle);

    //execute ajax request to bring back search results from input
    $.ajax({
      type: "GET",
      url: baseURL,
      data: {
        s: movieTitle
      },
      success: function(movies, textStatus, jqXHR) {
        //on succces, cycle through results and grab imdbID
        for (i = 0; i < movies.Search.length; i++) {
          var imdbID = movies.Search[i].imdbID;

          //execute another ajax request using imdbID for full movie info
          $.ajax({
            type: "GET",
            url: baseURL,
            data: {
              i: imdbID
            },
            success: function(movie) {
              //on success, append movie data using handlebars template
              $("#search-input-box").fadeOut("slow", function() {
                $("#movie-card-container").append(movieTemplate(movie));
              });
            },
            error: function() {
              alert("Error!");
            }
          });
        };
      },
      error: function() {
        alert("No movies found!");
      }
    });
  });
});
