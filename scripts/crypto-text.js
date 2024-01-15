// // FyGraph API AND Key From RapidAPI.com via GraphQL
// const url = "https://fygraph.p.rapidapi.com/graphql";
// const dataOptions = {
//   method: "POST",
//   headers: {
//     "x-rapidapi-key": "fa40ea65a6msha68e6f5343e548dp10595ajsn6d26736be691",
//     "x-rapidapi-host": "fygraph.p.rapidapi.com",
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     query: `query MyQuery {
//         getCryptoLatest(code: "", limit: 10) {
//             date
//             code
//             delta {
//                 day
//                 hour
//                 month
//                 quarter
//                 week
//                 year
//             }
//             id
//             marketCap
//             name
//             rank
//             volume
//             rate
//         }
//     }`,
//   }),
// };

// async function fetchData() {
//   try {
//     const response = await fetch(url, dataOptions);
//     const result = await response.json();
//     console.log(result);

//     // Assign the result to the cryptoData variable
//     const cryptoData = result;

//     // Iterate through each crypto div
//     for (let i = 1; i <= 9; i++) {
//       const cryptoDiv = document.querySelector(`.crypto${i}`);
//       const cryptoInfo = cryptoData.data.getCryptoLatest[i - 1]; // Adjust the index

//       if (cryptoInfo) {
//         // Construct the content using the data
//         const content = `
//             <p>Code: ${cryptoInfo.code} </p>
//             <p>Rank: ${cryptoInfo.rank} </p>
//             <p>Volume: ${cryptoInfo.volume} </p>
//             <p>Rate: ${cryptoInfo.rate} </p>
//             <p>Market Cap: ${cryptoInfo.marketCap} </p>
//             <p>Delta (Day): ${cryptoInfo.delta.hour}</p>
//           `;

//         // Update the content of the crypto div
//         cryptoDiv.innerHTML = "";
//         cryptoDiv.innerHTML = content;
//       } else {
//         // Handle the case where there's no data for the div
//         cryptoDiv.innerHTML = "<p>No data available</p>";
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

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
      //  Assign the result to the cryptoData variable
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
            // Construct the content using the data
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

            // Update the content of the crypto div
            cryptoDiv.innerHTML = "";
            cryptoDiv.innerHTML = content;
          } else {
            // Handle the case where there's no data for the div
            cryptoDiv.innerHTML = "<p>No data available</p>";
          }
        }
      } else {
        console.error("Rates property not found in the response");
      }
    })
    .catch((error) => console.error("Fetch Error", error));
}

// fetchData();

// $.ajax({
//   url: "http://api.coinlayer.com/" + endpoint + "?access_key=" + access_key,
//   success: function (json) {
//     console.log(JSON.stringify(json));

//     alert(sjon.rates.BTC);

//     alert(json.target);

//     alert(json.timestamp);
//   },
// });

// async function fetchTextData() {
//   const response = await fetch(baseUrl, access);
//   const result = await response.json();
//   console.log(result);

// }
