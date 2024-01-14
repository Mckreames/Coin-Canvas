`use strict`;

// FyGraph API AND Key From RapidAPI.com via GraphQL
const url = "https://fygraph.p.rapidapi.com/graphql";
const dataOptions = {
  method: "POST",
  headers: {
    "x-rapidapi-key": "fa40ea65a6msha68e6f5343e548dp10595ajsn6d26736be691",
    "x-rapidapi-host": "fygraph.p.rapidapi.com",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: `query MyQuery {
        getCryptoLatest(code: "", limit: 10) {
            date 
            code 
            delta {
                day 
                hour 
                month 
                quarter 
                week 
                year
            } 
            id 
            marketCap 
            name 
            rank 
            volume 
            rate
        }
    }`,
  }),
};

async function fetchData() {
  try {
    const response = await fetch(url, dataOptions);
    const result = await response.json();
    console.log(result);

    // Assign the result to the cryptoData variable
    const cryptoData = result;

    // Iterate through each crypto div
    for (let i = 1; i <= 9; i++) {
      const cryptoDiv = document.querySelector(`.crypto${i}`);
      const cryptoInfo = cryptoData.data.getCryptoLatest[i - 1]; // Adjust the index

      if (cryptoInfo) {
        // Construct the content using the data
        const content = `
            <p>Code: ${cryptoInfo.code} </p>
            <p>Rank: ${cryptoInfo.rank} </p>
            <p>Volume: ${cryptoInfo.volume} </p>
            <p>Rate: ${cryptoInfo.rate} </p>
            <p>Market Cap: ${cryptoInfo.marketCap} </p>
            <p>Delta (Day): ${cryptoInfo.delta.hour}</p>
          `;

        // Update the content of the crypto div
        cryptoDiv.innerHTML = "";
        cryptoDiv.innerHTML = content;
      } else {
        // Handle the case where there's no data for the div
        cryptoDiv.innerHTML = "<p>No data available</p>";
      }
    }
  } catch (error) {
    console.error(error);
  }
}

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

  // suggestionList.find("li").on("click", function () {
  //   const cryptoId = $(this).attr("class").split(" ")[1]; //Find cryptoId
  //   const targetGraph = $(`#${cryptoId}/graph`); //Find targetGraph
  //   scrollToGraph(targetGraph);
  // });
}

// function scrollToGraph(targetGraph) {
//   console.log("Suggestion Clicked!");
//   console.log("Target Graph:", targetGraph);

//   if (targetGraph.length > 0) {
//     $("html, body").animate(
//       {
//         scrollTop: targetGraph.offset().top,
//       },
//       1000
//     );
//   } else {
//     console.error("Target graph not found or is empty.");
//   }
// }

// suggestionList.on("click", ".suggestion-item", function () {
//   const cryptoId = $(this).data("cryptoid");
//   const targetGraph = $(`#${cryptoId} .crypto-list .graph`);

//   console.log("Clicked Suggestion:", cryptoId);
//   console.log("Target Graph Element:", targetGraph);

//   if (targetGraph.length) {
//     scrollToGraph(targetGraph);
//   } else {
//     console.error("Target graph not found or is empty.");
//   }
//   scrollToGraph(targetGraph);
// });

// const bitcoinResult = document.querySelector(".searchBitcoin");
// const ethereumResult = document.querySelector(".searchEtherium");
// const tetherResult = document.querySelector(".searchTether");
// const binanceCoinResult = document.querySelector(".searchBinance");
// const solanaResult = document.querySelector(".searchSolana");
// const usdCoinResult = document.querySelector(".searchUSD");
// const rippleResult = document.querySelector(".searchRipple");
// const cardanoResult = document.querySelector(".searchCardano");
// const avalancheResult = document.querySelector(".searchAvalanche");

// const bitcoinGraph = document.querySelector(".bitcoin");
// const ethereumGraph = document.querySelector(".etherium");
// const tetherGraph = document.querySelector(".tether");
// const binanceCoinGraph = document.querySelector(".binance-coin");
// const solanaGraph = document.querySelector(".solana");
// const usdCoinGraph = document.querySelector(".usd-coin");
// const rippleGraph = document.querySelector(".ripple");
// const cardanoGraph = document.querySelector(".cardano");
// const avalancheGraph = document.querySelector(".avalanche");

// function ifMonstrosity() {
//   if (bitcoinResult) {
//     bitcoinResult.addEventListener("click", scrollToGraph(bitcoinGraph));
//   }
//   if (ethereumResult) {
//     ethereumResult.addEventListener("click", scrollToGraph(ethereumGraph));
//   }
//   if (tetherResult) {
//     tetherResult.addEventListener("click", scrollToGraph(tetherGraph));
//   }
//   if (binanceCoinResult) {
//     binanceCoinResult.addEventListener(
//       "click",
//       scrollToGraph(binanceCoinGraph)
//     );
//   }
//   if (solanaResult) {
//     solanaResult.addEventListener("click", scrollToGraph(solanaGraph));
//   }
//   if (usdCoinResult) {
//     usdCoinResult.addEventListener("click", scrollToGraph(usdCoinGraph));
//   }
//   if (rippleResult) {
//     rippleResult.addEventListener("click", scrollToGraph(rippleGraph));
//   }
//   if (cardanoResult) {
//     cardanoResult.addEventListener("click", scrollToGraph(cardanoGraph));
//   }
//   if (avalancheResult) {
//     avalancheResult.addEventListener("click", scrollToGraph(avalancheGraph));
//   }
// }

//
//
//
// baseUrl = "https://widgets.cryptocompare.com/";
// var ethereum = document.querySelector(".ethereum");
// var embedder = ethereum[ethereum.length - 1];
// var cccTheme = {
//   General: { background: "white", borderColor: "#d3e2f2" },
//   Header: { background: "#d3e2f2", displayFollowers: false },
//   Data: { priceColor: "#f7931a" },
//   Chart: { animation: true, fillColor: "#ffc681", borderColor: "#f7931a" },
// };
// (function () {
//   var appName = encodeURIComponent(window.location.hostname);
//   if (appName == "") {
//     appName = "local";
//   }
//   var s = document.createElement("script");
//   s.type = "text/javascript";
//   s.async = true;
//   var theUrl = baseUrl + "serve/v1/coin/chart?fsym=ETH&tsym=USD";
//   s.src = theUrl + (theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
//   embedder.parentNode.appendChild(s);
// })();

// New Call for Crypto Data since my old API ran out of calls by mistake
