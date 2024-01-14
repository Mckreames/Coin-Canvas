`use strict`;

function crypData(symbol, embedderClass) {
  var baseUrl = "https://widgets.cryptocompare.com/";
  var embedder = document.querySelector(embedderClass);
  var cccTheme = {
    General: {
      background: "white",
      borderColor: "#d3e2f2",
    },
    Header: {
      background: "#d3e2f2",
      displayFollowers: false,
    },
    Data: {
      priceColor: "#f7931a",
    },
    Chart: {
      animation: true,
      fillColor: "#ffc681",
      borderColor: "#f7931a",
    },
  };

  (function () {
    var appName = encodeURIComponent(window.location.hostname);
    if (appName == "") {
      appName = "local";
    }
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    var theUrl = baseUrl + "serve/v1/coin/chart?fsym=" + symbol + "&tsym=USD";

    theUrl += "&cccTheme=" + encodeURIComponent(JSON.stringify(cccTheme));

    s.src = theUrl + (theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;

    if (embedder.parentNode != null) {
      embedder.parentNode.appendChild(s);
    }
  })();
}

// Bitcoin
crypData("BTC", ".bitcoin");

// Ethereum
crypData("ETH", ".ethereum");

//
//
// Text API
function fetchCryptoText() {
  const baseUrl = "http://api.coinlayer.com/api/";
  const apiKey = "b1e26d8d9f504814e70c70815a7a1209";

  const apiUrl = `${baseUrl}live?access_key=${apiKey}&symbols=BTC,ETH,USDT,BNB,SOL,USDC,XRP,ADA,AVAX`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error! StatusL: ${response.status}");
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      // Update html with data
      for (let i = 1; i <= 9; i++) {
        let textDataDiv = document.querySelector(`.invested${i}`);
        textDataDiv.inner;
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
