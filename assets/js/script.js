function searchTicker(searchTerm) {
  const apiKey = "6BRCLD9N4HU06JWN";

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
      var latestTimeKey = Object.keys(data["Time Series (Daily)"])[0];
      var tickerText = searchTerm.toUpperCase();
      $(".modal-card-title").text(tickerText);

      $("#results-open").text(
        "Open Price: $" +
          parseFloat(
            data["Time Series (Daily)"][latestTimeKey]["1. open"]
          ).toFixed(2)
      );

      $("#results-close").text(
        "Closing Price: $" +
          parseFloat(
            data["Time Series (Daily)"][latestTimeKey]["4. close"]
          ).toFixed(2)
      );

      $("#results-volume").text(
        "Volume: " +
          numberWithCommas(
            data["Time Series (Daily)"][latestTimeKey]["5. volume"]
          )
      );
    },
    error: function (jqXHR, textStatus, error) {
      console.log(error);
    },
  });
  return false;
}

function clearInput() {
  $("#search").val("");
}

$("#searchBtn").on("click", function () {
  // get the value of the input from user
  ticker = $("#search").val();
  searchTicker(ticker);

  ToggleResultModal();
  createChart();
});

function ToggleResultModal() {
  $(".modal").toggleClass("is-active");
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GetStockPrice(symbol, imgUrl) {
  const apiKey = "6BRCLD9N4HU06JWN";
  const fiveMinQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
    symbol +
    "&interval=5min&apikey=" +
    apiKey;

  $.ajax({
    url: fiveMinQueryURL,
    method: "GET",
    success: function (data5min) {
      var latestTimeKey = Object.keys(data5min["Time Series (5min)"])[0];

      var indicesDiv = $("#indices-div");
      var indicesCol = $("<div>").addClass("column center");
      var indicesCard = $("<div>").addClass("card");
      var indicesBody = $("<div>").addClass("card-content");
      var companyImg = $("<img>").attr("src", imgUrl).addClass("media center");
      var tickerText = symbol.toUpperCase();
      var tickerString = $("<p>").addClass("title center").text(tickerText);
      var openPriceString = $("<p>")
        .addClass("content")
        .text(
          "Open Price: $" +
            parseFloat(
              data5min["Time Series (5min)"][latestTimeKey]["1. open"]
            ).toFixed(2)
        );
      var closingPriceString = $("<p>")
        .addClass("content")
        .text(
          "Closing Price: $" +
            parseFloat(
              data5min["Time Series (5min)"][latestTimeKey]["4. close"]
            ).toFixed(2)
        );
      var volumeString = $("<p>")
        .addClass("content")
        .text(
          "Volume: " +
            numberWithCommas(
              data5min["Time Series (5min)"][latestTimeKey]["5. volume"]
            )
        );

      indicesBody.prepend(
        companyImg,
        tickerString,
        openPriceString,
        closingPriceString,
        volumeString
      );
      indicesCard.append(indicesBody);
      indicesCol.append(indicesCard);
      indicesDiv.append(indicesCol);
    },
  });
}

function GetForexPrice(symbol, imgUrl) {
  const apiKey = "6BRCLD9N4HU06JWN";
  const targetMarket = "USD";
  const ForexQueryURL =
    "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
    symbol +
    "&to_currency=" +
    targetMarket +
    "&apikey=" +
    apiKey;

  $.ajax({
    url: ForexQueryURL,
    method: "GET",
    success: function (data) {
      var bidPriceKey = Object.keys(data["Realtime Currency Exchange Rate"])[7];
      var askPriceKey = Object.keys(data["Realtime Currency Exchange Rate"])[8];

      var indicesDiv = $("#indices-div");
      var indicesCol = $("<div>").addClass("column center");
      var indicesCard = $("<div>").addClass("card");
      var indicesBody = $("<div>").addClass("card-content");
      var companyImg = $("<img>").attr("src", imgUrl).addClass("media center");
      var tickerText = symbol.toUpperCase() + "/USD";
      var tickerString = $("<p>").addClass("title center").text(tickerText);
      var openPriceString = $("<p>")
        .addClass("content")
        .text(
          "Bidding Price: $" +
            parseFloat(
              data["Realtime Currency Exchange Rate"]["8. Bid Price"]
            ).toFixed(4)
        );
      var closingPriceString = $("<p>")
        .addClass("content")
        .text(
          "Asking Price: $" +
            parseFloat(
              data["Realtime Currency Exchange Rate"]["9. Ask Price"]
            ).toFixed(4)
        );
      var volumeString = $("<p>")
        .addClass("content")
        .text(
          "Exchange Rate: $" +
            parseFloat(
              data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
            ).toFixed(4)
        );

      indicesBody.prepend(
        companyImg,
        tickerString,
        openPriceString,
        closingPriceString,
        volumeString
      );
      indicesCard.append(indicesBody);
      indicesCol.append(indicesCard);
      indicesDiv.append(indicesCol);
    },
  });
}

function GetCryptoPrice(symbol, imgUrl) {
  const apiKey = "6BRCLD9N4HU06JWN";
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
      var latestTimeKeyCrypto = Object.keys(
        data["Time Series (Digital Currency Daily)"]
      )[0];
      var cryptosDiv = $("#cryptos-div");
      var cryptosCol = $("<div>").addClass("column center");
      var cryptosCard = $("<div>").addClass("card");
      var cryptosBody = $("<div>").addClass("card-content");
      var bitcoinImg = $("<img>").attr("src", imgUrl).addClass("media center");
      var tickerText = symbol.toUpperCase();
      var tickerString = $("<p>").addClass("title center").text(tickerText);
      var openPriceString = $("<p>")
        .addClass("content")
        .text(
          "Open Price: $" +
            parseFloat(
              data["Time Series (Digital Currency Daily)"][latestTimeKeyCrypto][
                "1a. open (USD)"
              ]
            ).toFixed(2)
        );
      var closingPriceString = $("<p>")
        .addClass("content")
        .text(
          "Closing Price: $" +
            parseFloat(
              data["Time Series (Digital Currency Daily)"][latestTimeKeyCrypto][
                "4a. close (USD)"
              ]
            ).toFixed(2)
        );

      var volumeString = $("<p>")
        .addClass("content")
        .text(
          "Volume: " +
            numberWithCommas(
              parseFloat(
                data["Time Series (Digital Currency Daily)"][
                  latestTimeKeyCrypto
                ]["5. volume"]
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
      cryptosCol.append(cryptosCard);
      cryptosDiv.append(cryptosCol);
    },
  });
}

function SetupCrypto() {
  GetCryptoPrice("btc", "https://logo.clearbit.com/bitcoin.org?size=80");
  GetCryptoPrice("eth", "https://logo.clearbit.com/ethereum.org?size=80");
  GetCryptoPrice("ltc", "https://logo.clearbit.com/litecoinbank.org?size=80");
  GetCryptoPrice("xrp", "https://logo.clearbit.com/xrp.io?size=80");
}

function SetupIndices() {
  GetStockPrice("ndaq", "https://logo.clearbit.com/nasdaq.com?size=80");
  GetStockPrice("dia", "https://logo.clearbit.com/dowjones.com?size=80");
  GetStockPrice("spy", "https://logo.clearbit.com/spycoupon.in?size=80");
  GetForexPrice("eur", "https://logo.clearbit.com/eurusd.it?size=80");
}

function Setup() {
  // update prices every 5m
  setInterval(SetupIndices(), 300000);

  // set crypto price
  SetupCrypto();
}

Setup();

function createChart() {
  var closePrices = [];
  var sixmonths = [];
  var ticker = $("#search").val();
  var searchTerm = ticker.toUpperCase();
  const apiKey = "6BRCLD9N4HU06JWN";
  const monthlyQueryURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
    searchTerm +
    "&apikey=" +
    apiKey;
  $.ajax({
    url: monthlyQueryURL,
    method: "GET",
    success: function (monthlydata) {
      for (var i = 0; i < 6; i++) {
        var months = Object.keys(monthlydata["Monthly Time Series"])[i];
        var formatMonth = moment(months).format("MMMM");
        sixmonths.unshift(formatMonth);

        var close = monthlydata["Monthly Time Series"][months]["4. close"];
        var closeParse = parseInt(close);
        var closeFixed = closeParse.toFixed(2);
        closePrices.unshift(closeFixed);
      }

      var ctx = $("#myChart");
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: sixmonths,
          datasets: [
            {
              label: "Closing Price Trends",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: closePrices,
            },
          ],
        },

        // Configuration options go here
        options: {},
      });
    },
  });
}
