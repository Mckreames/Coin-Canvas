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

// setInterval(fetchData, 1000);
// fetchData();

// Bitcoin
crypData("BTC", ".bitcoin");

// Ethereum
crypData("ETH", ".ethereum");

// Tether
crypData("USDT", ".tether");

// Binance Coin
crypData("BNB", ".binance-coin");

// XRP
crypData("XRP", ".ripple");

// Solana
crypData("SOL", ".solana");

// USD Coin
crypData("USDC", ".usd-coin");

// Cardano
crypData("ADA", ".cardano");

// Avalanche
crypData("AVAX", ".avalanche");

//
//
// Search Bar
const cryptoData = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "tether", name: "Tether" },
  { id: "binance-coin", name: "Binance Coin" },
  { id: "solana", name: "Solana" },
  { id: "usd-coin", name: "USD Coin" },
  { id: "ripple", name: "Ripple" },
  { id: "cardano", name: "Cardano" },
  { id: "avalanche", name: "Avalanche" },
];

const searchBar = $(".search-bar");
const suggestionList = $("#suggestionList");

searchBar.on("keyup", function () {
  const query = searchBar.val().toLowerCase();
  updateSuggestions(query);
});

function updateSuggestions(query) {
  suggestionList.empty();
  const filteredSuggestions = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(query)
  );

  for (let i = 0; i < Math.min(filteredSuggestions.length, 5); i++) {
    suggestionList.append(
      `<a class="list-group-item suggestion-item" href="#${filteredSuggestions[i].id}"><li>${filteredSuggestions[i].name}</li></a>`
    );
    console.log(filteredSuggestions[i].id);
  }

  document
    .getElementById("suggestionList")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        const hrefValue = event.target.getAttribute("href");
        const rawHrefValue = hrefValue.slice(1);
        rawHrefValue.style.animation = "flash 1s 3";
        rawHrefValue.addEventListener("animationed", function () {
          rawHrefValue.style.animation = "";
        });
      }
    });
}
