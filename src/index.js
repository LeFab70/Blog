import "./app/app.js";
import "./assets/styles/styles.scss";
import "../index.scss";

const articleContainer = document.querySelector(".articles-container");
articleContainer.innerHTML = "<h1>List of articles</h1>";
const URL_BASE = new URL("https://restapi.fr/api/articlesFakes");
const fetchArticles = async () => {
  try {
    const response = await fetch(URL_BASE);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchArticles:", error);
    throw error;
  }
};
const articles = await fetchArticles();
//console.table(articles);
//console.info(Math.floor(Math.random() * 100).toString());

const createArticleCard = (article) => {
  const articleCard = document.createElement("div");
  articleCard.classList.add("article");
  console.info(article);
  articleCard.innerHTML = `
 <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100).toString()}.jpg" alt="profile"/>
    <h2>${article.category}</h2>
    <p class="article-author">${article.author}</p>
    <p class="article-content">By: ${article.content}</p>
    <p class="article-category">Category: ${article.category}</p>
     <div class="article-actions">
              <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
              <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
            </div>
  `;
  return articleCard;
};
articles.forEach((article) => {
  const articleCard = createArticleCard(article);
  articleContainer.append(articleCard);
  const deleteButtons = articleCard.querySelectorAll(".btn-danger");
  console.info(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const articleId = event.target.dataset.id;
      console.info(articleId, button);
      try {
        const response = await fetch(`${URL_BASE}/${articleId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        articleCard.remove();
        alert("Article deleted successfully");
      } catch (error) {
        console.error("Error deleting article:", error);
        alert("An error occurred while deleting the article.");
      }
    });
  })
    //const updateButtons = articleCard.querySelectorAll(".btn-primary");
});
