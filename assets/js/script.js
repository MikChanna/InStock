function searchTicker(searchTerm) {
  console.log("in search");

  const apiKey = "362XYH6WP6R5F90Q";

  const cryptoQueryURL =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=" +
    apiKey;

  const fiveMinQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
    searchTerm +
    "&interval=5min&apikey=" +
    apiKey;

  const dailyQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    searchTerm +
    "&apikey=" +
    apiKey;

  const monthlyQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
    searchTerm +
    "&apikey=" +
    apiKey;

  $.ajax({
    url: fiveMinQueryURL,
    method: "GET",
    success: function (data5min) {
      console.log(data5min);
    },
  });

  $.ajax({
    url: monthlyQueryURL,
    method: "GET",
    success: function (dataMonthly) {
      console.log(dataMonthly);
    },
  });

  $.ajax({
    url: dailyQueryURL,
    method: "GET",
    success: function (data) {
      console.log(data);
      var resultsBody = $("<div>").addClass("card-body");
      var resultsDiv = $("#results-list").addClass(
        "card col-md-2 ml-3 bg-dark text-white"
      );
      var tickerText = searchTerm.toUpperCase();
      var tickerString = $("<p>").addClass("card-title").text(tickerText);
      var openPriceString = $("<p>").addClass("card-text").text("Open Price: ");
      var openPriceP = $("<p>")
        .text(data["Time Series (Daily)"]["2020-03-09"]["1. open"])
        .addClass("card-text");
      // .text(data["Time Series (Daily)"]["2020-03-09"]["1. open"]);
      var closingPriceString = $("<p>")
        .addClass("card-text")
        .text("Closing Price: ");
      var closingPriceP = $("<p>")
        .addClass("card-text")
        .text(data["Time Series (Daily)"]["2020-03-09"]["4. close"]);
      var volumeString = $("<p>").addClass("card-text").text("Volume: ");
      var volumeP = $("<p>")
        .addClass("card-text")
        .text(data["Time Series (Daily)"]["2020-03-09"]["5. volume"]);

      resultsBody.prepend(
        tickerString,
        openPriceString,
        openPriceP,
        closingPriceString,
        closingPriceP,
        volumeString,
        volumeP
      );

      resultsDiv.append(resultsBody);

      console.log(data["Time Series (Daily)"]["2020-03-09"]["1. open"]);
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

// The pageLoadIndices option will run when the page is loaded and automatically append the values of BTC, and the SPY
function pageLoadIndices() {
  const apiKey = "362XYH6WP6R5F90Q";
  const searchTerm = "SPY";
  const fiveMinQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
    searchTerm +
    "&interval=5min&apikey=" +
    apiKey;

  const searchTermCrypto = "BTC";
  const targetMarket = "USD";
  const cryptoQueryURL =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" +
    searchTermCrypto +
    "&market=" +
    targetMarket +
    "&apikey=" +
    apiKey;

  $.ajax({
    url: fiveMinQueryURL,
    method: "GET",
    success: function (data5min) {
      console.log(data5min);
      var indicessBody = $("<div>").addClass("card-body");
      var indicesDiv = $("#indices-div").addClass(
        "card col-md-2 ml-3 bg-dark text-white"
      );
      var tickerText = searchTerm.toUpperCase();
      var tickerString = $("<p>")
        .addClass("card-title text-center")
        .text(tickerText);
      var openPriceString = $("<p>")
        .addClass("card-text text-center")
        .text("Open Price: ");
      var openPriceP = $("<p>")
        .addClass("card-text text-center")
        .text(data5min["Time Series (5min)"]["2020-07-01 14:25:00"]["1. open"]);
      var closingPriceString = $("<p>")
        .addClass("card-text text-center")
        .text("Closing Price: ");
      var closingPriceP = $("<p>")
        .addClass("card-text text-center")
        .text(
          data5min["Time Series (5min)"]["2020-07-01 14:25:00"]["4. close"]
        );
      var volumeString = $("<p>")
        .addClass("card-text text-center")
        .text("Volume: ");
      var volumeP = $("<p>")
        .addClass("card-text text-center")
        .text(
          data5min["Time Series (5min)"]["2020-07-01 14:25:00"]["5. volume"]
        );

      indicessBody.prepend(
        tickerString,
        openPriceString,
        openPriceP,
        closingPriceString,
        closingPriceP,
        volumeString,
        volumeP
      );
      indicesDiv.append(indicessBody);
    },
  });

  $.ajax({
    url: cryptoQueryURL,
    method: "GET",
    success: function (data) {
      console.log(data);
      var cryptosBody = $("<div>").addClass("card-body");
      var cryptosDiv = $("#cryptos-div").addClass(
        "card col-md-2 ml-3 bg-dark text-white"
      );
      var tickerText = searchTermCrypto.toUpperCase();
      var tickerString = $("<p>")
        .addClass("card-title text-center")
        .text(tickerText);
      var openPriceString = $("<p>")
        .addClass("card-text text-center")
        .text("Open Price: ");
      var openPriceP = $("<p>")
        .addClass("card-text text-center")
        .text(
          data["Time Series (Digital Currency Daily)"]["2020-07-01"][
            "1a. open (USD)"
          ]
        );
      var closingPriceString = $("<p>")
        .addClass("card-text text-center")
        .text("Closing Price: ");
      var closingPriceP = $("<p>")
        .addClass("card-text text-center")
        .text(
          data["Time Series (Digital Currency Daily)"]["2020-07-01"][
            "4a. close (USD)"
          ]
        );
      var volumeString = $("<p>")
        .addClass("card-text text-center")
        .text("Volume: ");
      var volumeP = $("<p>")
        .addClass("card-text text-center")
        .text(
          data["Time Series (Digital Currency Daily)"]["2020-07-01"][
            "5. volume"
          ]
        );

      cryptosBody.prepend(
        tickerString,
        openPriceString,
        openPriceP,
        closingPriceString,
        closingPriceP,
        volumeString,
        volumeP
      );
      cryptosDiv.append(cryptosBody);
    },
  });
}

pageLoadIndices();
