`use strict`;

// PyGraph API AND Key From RapidAPI.com via GraphQL
const url = "https://fygraph.p.rapidapi.com/graphql";
const options = {
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
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // Assign the result to the cryptoData variable
    const cryptoData = result;

    // Iterate through each crypto div
    for (let i = 1; i <= 10; i++) {
      const cryptoDiv = document.querySelector(`.crypto${i}`);
      const cryptoInfo = cryptoData.data.getCryptoLatest[i - 1]; // Adjust the index

      if (cryptoInfo) {
        // Construct the content using the data
        const content = `
            <p>Date: ${cryptoInfo.date} |
            Code: ${cryptoInfo.code} |
            Rank: ${cryptoInfo.rank} |
            Market Cap: ${cryptoInfo.marketCap} |
            Volume: ${cryptoInfo.volume} |
            Rate: ${cryptoInfo.rate} |
            Delta (Day): ${cryptoInfo.delta.day}</p>
            <!-- Add more fields as needed -->
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

fetchData();
// setInterval(fetchData, 1000);

// const url = "https://fygraph.p.rapidapi.com/graphql";
// const options = {
//   method: "POST",
//   headers: {
//     "x-rapidapi-key": "fa40ea65a6msha68e6f5343e548dp10595ajsn6d26736be691",
//     "x-rapidapi-host": "fygraph.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     query: `query {
//         getCryptoLatest {
//             code
//             marketCap
//             name
//             rank
//             volume
//             rate}}`,
//   }),
// };

// async function fetchData() {
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();

//     if (result.errors) {
//       console.error("GraphQL Errors:", result.errors);
//     } else {
//       //   displayData(result);
//     }

//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// const ctx = document.getElementById("myChart");

// new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });

// BitCoin Tools API

// (function (b, i, t, C, O, I, N) {
//   window.addEventListener(
//     "load",
//     function () {
//       if (b.getElementById(C)) return;
//       (I = b.createElement(i)), (N = b.getElementsByTagName(i)[0]);
//       I.src = t;
//       I.id = C;
//       N.parentNode.insertBefore(I, N);
//     },
//     false
//   );
// })(document, "script", "https://widgets.bitcoin.com/widget.js", "btcwdgt");

// Widgets from CryptoCompare.com

// function displayData(data) {
//   console.log(data);
//   const cryptoInfoSection = document.querySelector(".crypto-info");
//   const cryptoData = data.data.getCryptoLatest;

//   const htmlContent = cryptoData
//     .map(
//       (item) => `
//             <div>
//                 <p>Name: ${item.name}</p>
//                 <p>Code: ${item.code}</p>
//                 <p>Rank: ${item.rank}</p>
//                 <p>Market Cap: ${item.marketCap}</p>
//             </div>
//             `
//     )
//     .join("");

//   cryptoInfoSection.innerHTML = htmlContent;
// }

// fetchData();
