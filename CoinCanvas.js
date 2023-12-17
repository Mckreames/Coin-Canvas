`use strict`;

// PyGraph API AND Key From RapidAPI.com

const url = "https://fygraph.p.rapidapi.com/graphql";
const options = {
  method: "POST",
  headers: {
    "x-rapidapi-key": "fa40ea65a6msha68e6f5343e548dp10595ajsn6d26736be691",
    "x-rapidapi-host": "fygraph.p.rapidapi.com",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `query {getCryptoLatest {code marketCap name rank volume rate}}`,
  }),
};

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
    } else {
      displayData(result);
    }

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function displayData(data) {
  console.log(data);
  const cryptoInfoSection = document.querySelector(".crypto-info");
  const cryptoData = data.data.getCryptoLatest;

  const htmlContent = cryptoData
    .map(
      (item) => `
            <div>
                <p>Name: ${item.name}</p>
                <p>Code: ${item.code}</p>
                <p>Rank: ${item.rank}</p>
                <p>Market Cap: ${item.marketCap}</p>
            </div>
            `
    )
    .join("");

  cryptoInfoSection.innerHTML = htmlContent;
}

fetchData();
