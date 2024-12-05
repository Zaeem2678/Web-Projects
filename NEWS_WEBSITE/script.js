const apiKey = "fd36649bea9942e49f9eb9e684fbe9cc";
const apiUrl = "https://newsapi.org/v2/everything?q=";

const formSubmit = document.getElementById("form-submit");
let isInitialSearch = true;
const searchInput = document.getElementById("search-input");
const cardData = document.getElementById("card-data");
const text = document.getElementById("text-para");

async function checkNews(Searchvalue) {
  const response = await fetch(apiUrl + Searchvalue + `&apiKey=${apiKey}`);
  var data = await response.json();
  console.log(data.articles);
  if (!isInitialSearch) {
    text.innerHTML = "You Searched : " + Searchvalue;
  } else {
    isInitialSearch = false;
  }
  displayNews(data.articles);
}

checkNews("neymar");

formSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = searchInput.value.trim();
  if (search !== "") {
    checkNews(searchInput.value);

    searchInput.value = "";
  }
});

function navClick(navValue) {
  checkNews(navValue);
}

function displayNews(articles) {
  cardData.innerHTML = "";
  articles.forEach((article) => {
    const cardContent = document.createElement("div");
    cardContent.classList.add("inner-card");
    cardContent.innerHTML = `
  <img src="${article.urlToImage || "https://via.placeholder.com/150"}" alt="">
      <h3>${article.title || "No Title Available"}</h3>
      <p>${article.description || "No description available."}</p>
    `;
    cardData.appendChild(cardContent);

    cardData.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
        window.open(article.url);
      }
    });
  });
}
