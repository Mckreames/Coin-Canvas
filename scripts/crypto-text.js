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

// fetchData();
