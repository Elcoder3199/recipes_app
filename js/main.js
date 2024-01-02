let searchRecipe = document.querySelector(".search-recipe"),
btnSearch = document.querySelector(".btn-search"),
recipesAreaContainer = document.querySelector(".recipes-area-container"),
recipeDetail = document.querySelector(".recipe-detail"),
searchPlace = document.querySelector(".search-place"),
searchArea = document.querySelector(".search-area"),
loading = document.querySelector(".loading");

btnSearch.addEventListener("click", () =>  {
    if (window.navigator.onLine) {
      loading.classList.add("load");
    }
})

function getRecipes() {
  let searchItem = searchRecipe.value;
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchItem}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    showRecipes (data);
    });
}

btnSearch.addEventListener("click", function () {
  if (searchRecipe.value != "") {
    getRecipes();
  }
});

function showRecipes (recipes) {
  if (recipes.meals === null) {
    recipesAreaContainer.innerHTML = "";
    let resault = document.createElement("div");
    resault.className = "resault";
    resault.innerHTML = "No Data";
    recipesAreaContainer.appendChild(resault);
    loading.classList.remove("load");
  }
  else {
    recipesAreaContainer.innerHTML = "";
    recipes.meals.forEach (recipe => {
      loading.classList.remove("load")
    let card = document.createElement("div");
    card.className = "card";
    let imgBox = document.createElement("div");
    imgBox.className = "img";
  
    let recipeImage = document.createElement("img");
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = "Meal Image";
    imgBox.appendChild(recipeImage);
    card.appendChild(imgBox);
  
    recipeName = document.createElement("h1");
    recipeName.className = "recipe-name";
    recipeNameText = document.createTextNode(recipe.strMeal);
    recipeName.appendChild(recipeNameText);
    card.appendChild(recipeName);
  
    let getRecipe = document.createElement("button");
    getRecipe.className = "get-recipe";
    getRecipe.innerHTML = "Get Recipe";
    getRecipe.setAttribute("data-id", recipe.idMeal)
    card.appendChild(getRecipe);
  
    recipesAreaContainer.appendChild(card);
  
    })
  }

}

// Lookup full meal details by id 

recipesAreaContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("get-recipe")) {
    recipeDetail.innerHTML = "";
    console.log(e.target.getAttribute("data-id"));
    recipeDetail.classList.add("show");
    searchPlace.classList.add("hidden");
    let id = e.target.getAttribute("data-id"),
    apiUrlDe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiUrlDe).then(response => response.json()).then(data => {
      showRecipesDe (data);
    })
  }
})

function showRecipesDe (recipeDe) {

  recipeDe.meals.forEach (detail => {
    
    let closeDetail = document.createElement("div");
    closeDetail.innerHTML = "x";
    closeDetail.className = "close-detail";
    recipeDetail.appendChild(closeDetail);

    let headingRecipes = document.createElement("div");
    headingRecipes.innerHTML = detail.strMeal;
    headingRecipes.className = "heading-recipes";
    recipeDetail.appendChild(headingRecipes);

    let recipeDetails = document.createElement("p");
    recipeDetails.className = "recipe-details";
    recipeDetails.innerHTML = detail.strInstructions;

    recipeDetail.appendChild(recipeDetails);
  })
  searchArea.appendChild(recipeDetail)
}

recipeDetail.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-detail")) {
    recipeDetail.classList.remove("show");
    searchPlace.classList.remove("hidden");
  }
})
