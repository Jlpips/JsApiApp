'use strict';
let searchBtn = document.getElementById('search-btn');
let cocktailValue = document.getElementById('cocktail');
let result = document.getElementById('result');


async function fetchInitialCocktails() {
  let cocktails = [];
  for (let i = 0; i < 4; i++) {
    let response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    let data = await response.json();
    if (data.drinks) {
      cocktails.push(data.drinks[0]);
    }
  }

  if (cocktails.length > 0) {
    let html = '<div class="grid-container">';
    cocktails.forEach(drink => {
      html += `<div class="cocktail">
    <img src="${drink.strDrinkThumb}" class="cocktail-img">
    <h2>${drink.strDrink}</h2>
    <p>${drink.strInstructions}</p>
    <h4>Ingredients:</h4>
    <ul>
      ${createIngredientList(drink)}
    </ul>
  </div>`;
    });
    html += '</div>';
    result.innerHTML = html;
  } else {
    result.innerHTML = `<h3>No cocktails found</h3>`;
  }
}

fetchInitialCocktails();

function handleSearch() {
  let cocktailDrink = cocktailValue.value;
  if (cocktailDrink === '') {
    result.innerHTML = '<h3>Please enter a cocktail name</h3>';
    return;
  }

  fetchCocktail(cocktailDrink);
}

async function fetchCocktail(cocktailDrink) {
  let response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailDrink}`
  );

  let parseData = await response.json();
  console.log(parseData);
  if (parseData.drinks) {
    let html = '<div class="grid-container">';
    parseData.drinks.forEach(drink => {
      html += `<div class="cocktail">
    <img src="${drink.strDrinkThumb}" class="cocktail-img">
    <h2>${drink.strDrink}</h2>
    <p>${drink.strInstructions}</p>
    <h4>Ingredients:</h4>
    <ul>
      ${createIngredientList(drink)}
    </ul>
  </div>`;
    });
    html += '</div>';
    result.innerHTML = html;
  } else {
    result.innerHTML = `<h3>No cocktail found</h3>`;
  }
}

function createIngredientList(drink) {
  let ingredientList = '';
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredientList += `<li>${ingredient} - ${measure}</li>`;
    } else if (ingredient) {
      ingredientList += `<li>${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
}

searchBtn.addEventListener('click', handleSearch);

cocktailValue.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
