function searchTicker(searchTerm) {
  console.log("in search");
  const queryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    searchTerm +
    "&apikey=362XYH6WP6R5F90Q";

  //www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo

  $.ajax({
    url: queryURL,
    method: "GET",
    success: function (data) {
      console.log(data);
      var resultsDiv = $("#results-list");
      var tickerText = searchTerm.toUpperCase();
      var tickerString = $("<p>").text(tickerText);
      var openPriceString = $("<p>").text("Open Price: ");
      var openPriceP = $("<p>").text(
        data["Time Series (Daily)"]["2020-02-07"]["1. open"]
      );
      var closingPriceString = $("<p>").text("Closing Price: ");
      var closingPriceP = $("<p>").text(
        data["Time Series (Daily)"]["2020-02-07"]["4. close"]
      );
      var volumeString = $("<p>").text("Volume: ");
      var volumeP = $("<p>").text(
        data["Time Series (Daily)"]["2020-02-07"]["5. volume"]
      );

      resultsDiv.prepend(
        tickerString,
        openPriceString,
        openPriceP,
        closingPriceString,
        closingPriceP,
        volumeString,
        volumeP
      );

      console.log(data["Time Series (Daily)"]["2020-02-07"]["1. open"]);
    },
    error: function (jqXHR, textStatus, error) {
      console.log(error);
    },
  });
  return false;
}

$("#searchBtn").on("click", function () {
  // get the value of the input from user
  ticker = $("#search").val();
  searchTicker(ticker);
});
