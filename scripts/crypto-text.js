`use strict`;

// New Call for Crypto Data since my old API ran out of calls by mistake

const baseUrl = "http://api.coinlayer.com/";
const endpoint = "live";
const access_key = "b1e26d8d9f504814e70c70815a7a1209";
const target = "USD";
const symbols = "BTC,ETH,USDT,BNB,SOL,USDC,XRP,ADA,AVAX";
const expand = "1";
const callback = "";
const fullUrl = `${baseUrl}${endpoint}?access_key=${access_key}&target=${target}&symbols=${symbols}&expand=${expand}`;

async function fetchData() {
  fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      const cryptoData = data;
      console.log(cryptoData);

      if (cryptoData.rates) {
        // Iterate through each crypto div
        for (let i = 1; i <= 6; i++) {
          const cryptoDiv = document.querySelector(`.crypto${i + 1}`);
          const symbolsArray = ["ADA", "AVAX", "BNB", "BTC", "ETH", "USDT"];
          const symbol = symbolsArray[i - 1];
          const cryptoInfo = cryptoData.rates[symbol];

          if (cryptoInfo) {
            const content = `
              <img src="../Logos/coin${i}.png" class="coin-img" alt="Coin Logo" />
              <p><span class="bold">${symbol}</span> || 
              <span class="orange bold underline">Volume</span>: ${cryptoInfo.vol}</p>
              <p><span class="orange bold underline">Market Cap</span>: ${cryptoInfo.cap}</p>
              <p>
              <span class="orange bold underline">High</span>: ${cryptoInfo.high}
              <span class="orange bold underline">Low</span>: ${cryptoInfo.low}</p>
              <p><span class="orange bold underline">Rate</span>: ${cryptoInfo.rate}
              <span class="orange bold underline">Change</span>: ${cryptoInfo.change}</p>
            `;

            cryptoDiv.innerHTML = "";
            cryptoDiv.innerHTML = content;
          } else {
            cryptoDiv.innerHTML = "<p>No data available</p>";
          }
        }
      } else {
        console.error("Rates property not found in the response");
      }
    })
    .catch((error) => console.error("Fetch Error", error));
}

// setInterval(fetchData, 1000);
fetchData();
