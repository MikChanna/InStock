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
    url: dailyQueryURL,
    method: "GET",
    success: function (data) {
      console.log(data);
      var resultsBody = $("<div>").addClass("card-body");
      var resultsDiv = $("#results-list").addClass(
        "card col-md-2 ml-3 bg-dark text-white fixed-right"
      );
      var tickerText = searchTerm.toUpperCase();
      var tickerString = $("<p>")
        .addClass("card-title text-center")
        .text(tickerText);
      var openPriceString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Open Price: " + data["Time Series (Daily)"]["2020-03-09"]["1. open"]
        );
      var closingPriceString = $("<p>")
        .addClass("card-text text-center")
        .text("Closing Price: ");
      var closingPriceP = $("<p>")
        .addClass("card-text text-center")
        .text(data["Time Series (Daily)"]["2020-03-09"]["4. close"]);
      var volumeString = $("<p>")
        .addClass("card-text text-center")
        .text("Volume: ");
      var volumeP = $("<p>")
        .addClass("card-text text-center")
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

function GetStockPrice(symbol, imgUrl) {
  const apiKey = "362XYH6WP6R5F90Q";
  const fiveMinQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
    symbol +
    "&interval=5min&apikey=" +
    apiKey;

  $.ajax({
    url: fiveMinQueryURL,
    method: "GET",
    success: function (data5min) {
      console.log(data5min);

      var indicesDiv = $("#indices-div");
      var indicesCard = $("<div>").addClass(
        "card col-2 col-sm-2 col-md-2 col-lg-2 ml-2 bg-dark text-white"
      );
      var indicesBody = $("<div>").addClass("card-body");
      var nasdaqImg = $("<img>").attr("src", imgUrl).addClass("card-img");
      var tickerText = symbol.toUpperCase();
      var tickerString = $("<p>")
        .addClass("card-title text-center")
        .text(tickerText);
      var openPriceString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Open Price: $" +
            parseFloat(
              data5min["Time Series (5min)"]["2020-07-02 15:30:00"]["1. open"]
            ).toFixed(2)
        );
      var closingPriceString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Closing Price: $" +
            parseFloat(
              data5min["Time Series (5min)"]["2020-07-02 15:30:00"]["4. close"]
            ).toFixed(2)
        );
      var volumeString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Volume: " +
            numberWithCommas(
              data5min["Time Series (5min)"]["2020-07-02 15:30:00"]["5. volume"]
            )
        );

      indicesBody.prepend(
        nasdaqImg,
        tickerString,
        openPriceString,
        closingPriceString,
        volumeString
      );
      indicesCard.append(indicesBody);
      indicesDiv.append(indicesCard);
    },
  });
}

function GetCryptoPrice(symbol, imgUrl) {
  const apiKey = "362XYH6WP6R5F90Q";
  const targetMarket = "USD";
  const cryptoQueryURL =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" +
    symbol.toUpperCase() +
    "&market=" +
    targetMarket +
    "&apikey=" +
    apiKey;

  $.ajax({
    url: cryptoQueryURL,
    method: "GET",
    success: function (data) {
      console.log(data);
      var cryptosDiv = $("#cryptos-div");
      var cryptosCard = $("<div>").addClass(
        "card col-2 col-sm-2 col-md-2 col-lg-2 ml-2 bg-dark text-white"
      );
      var cryptosBody = $("<div>").addClass("card-body");
      var bitcoinImg = $("<img>").attr("src", imgUrl).addClass("card-img");
      var tickerText = symbol.toUpperCase();
      var tickerString = $("<p>")
        .addClass("card-title text-center")
        .text(tickerText);
      var openPriceString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Open Price: " +
            parseFloat(
              data["Time Series (Digital Currency Daily)"]["2020-07-01"][
                "1a. open (USD)"
              ]
            ).toFixed(2)
        );
      var closingPriceString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Closing Price: " +
            parseFloat(
              data["Time Series (Digital Currency Daily)"]["2020-07-01"][
                "4a. close (USD)"
              ]
            ).toFixed(2)
        );

      var volumeString = $("<p>")
        .addClass("card-text text-center")
        .text(
          "Volume: " +
            numberWithCommas(
              parseFloat(
                data["Time Series (Digital Currency Daily)"]["2020-07-01"][
                  "5. volume"
                ]
              ).toFixed(0)
            )
        );

      cryptosBody.prepend(
        bitcoinImg,
        tickerString,
        openPriceString,
        closingPriceString,
        volumeString
      );
      cryptosCard.append(cryptosBody);
      cryptosDiv.append(cryptosCard);
    },
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

GetStockPrice("ndaq", "https://logo.clearbit.com/nasdaq.com?size=80");
GetStockPrice("tsla", "https://logo.clearbit.com/tesla.com?size=80");
GetStockPrice("dia", "https://logo.clearbit.com/dowjones.com?size=80");
GetCryptoPrice("btc", "https://logo.clearbit.com/bitcoin.org?size=80");
GetCryptoPrice("eth", "https://logo.clearbit.com/ethereum.org?size=80");
GetCryptoPrice("ltc", "https://logo.clearbit.com/litecoinbank.org?size=80");
