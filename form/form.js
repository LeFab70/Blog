import("./form.scss");
import("../src/assets/styles/styles.scss");
const form = document.querySelector("form");
const errorsContainer = document.querySelector("#errors");
let errors = [];
const URL_BASE = new URL("https://restapi.fr/api/articlesFakes");
const addArticle = async (data) => {
  try {
    const response = await fetch(URL_BASE, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.info(responseData);
    return responseData;
  } catch (error) {
    console.error("Error in addArticle:", error);
    throw error;
  }
};
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  try {
    const data =JSON.stringify(Object.fromEntries(formData.entries()));

    if (!formIsValid(JSON.parse(data))) {
      return;
    }
    console.info(data);
    const result = await addArticle(data);
    alert("Article added successfully");
    form.reset();
  } catch (error) {
    console.error("Error adding article:", error);
    alert("An error occurred while adding the article.");
  }
});

const formIsValid = (article) => {
  errors = [];
  if (!article.author) {
    errors.push("author is required");
  }
  if (!article.content) {
    errors.push("Body is required");
  }
  if (!article.category) {
    errors.push("Category is required");
  }
  if (errors.length > 0) {
    errorsContainer.innerHTML = errors.map((err) => `<li>${err}</li>`).join("");
  } else {
    errorsContainer.innerHTML = "";
  }
  return errors.length === 0;
};
