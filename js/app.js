$(document).ready(function() {

  //save endpoint for reuse
  var baseURL = "http://www.omdbapi.com/";

  //create handlebars template
  var source = $("#movie-card-template").html();
  var movieTemplate = Handlebars.compile(source);

  $("#movie-search-form").on("submit", function(event) {
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
        //on succces, cycle through results and grab imdbID if response != False
        if (movies.Response === "False") {
          alert("Movie info not found.")
        } else {
          $("#search-input-box").hide();

          movies.Search.forEach(function(movie) {
            $.ajax({
              type: "GET",
              url: baseURL,
              data: {
                i: movie.imdbID
              },
              success: function(movie) {
                //on success, append movie data using handlebars template
                $("#movie-card-container").append(movieTemplate(movie));
              },
              error: function() {
                alert("Error getting movie via ID!");
              }
            });
          });
        };
      },
      error: function() {
        alert("Error retrieving movie info!");
      }
    });
  });
});
