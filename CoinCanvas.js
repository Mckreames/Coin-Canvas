`use strict`;

// Typing animation
// const type = new Type(".auto-type", {
//   strings: ["Fortune", "Confidence", "Success", "Investments"],
//   typeSpeed: 80,
//   backSpeed: 40,
//   loop: true,
// });

// Modal Window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClosedModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
console.log(btnsOpenModal);

const openModal = function () {
  console.log("open Modal called");
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeModal = function () {
  console.log("close Modal called");
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener(`click`, openModal);
  //   modal.style.display = `block`;
}

// btnClosedModal.addEventListener(`click`, closeModal);
// overlay.addEventListener(`click`, closeModal);

document.addEventListener(`keydown`, function (e) {
  console.log(e.key);

  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
});

// PyGraph API AND Key From RapidAPI.com via GraphQL
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

// fetchData();
// setInterval(fetchData, 1000);

baseUrl = "https://widgets.cryptocompare.com/";
var bitcoin = document.querySelector(".bitcoin");
var embedder = bitcoin;
var cccTheme = {
  Header: { background: "#d3e2f2", displayFollowers: false },
  Followers: { color: "#f7931a" },
  Data: { priceColor: "#f7931a" },
  Chart: { animation: true, fillColor: "#ffc681", borderColor: "#f7931a" },
  Trend: { colorUnchanged: "#f7931a" },
};
(function () {
  var appName = encodeURIComponent(window.location.hostname);
  if (appName == "") {
    appName = "local";
  }
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  var theUrl = baseUrl + "serve/v1/coin/chart?fsym=BTC&tsym=USD";
  s.src = theUrl + (theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
  embedder.parentNode.appendChild(s);
})();
