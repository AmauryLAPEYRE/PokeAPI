
// At click on a pokemon, I add them to my favorites (dropdown) //
/*document.querySelector("main").addEventListener('click', function(clickedElement) {
  let click = clickedElement.target;
  let myPokemon = click.textContent;
  let display = document.querySelector(".notification")
  sessionStorage.setItem(myPokemon, myPokemon);
  let p = document.createElement('p');
  p.innerHTML = sessionStorage.getItem(myPokemon);
  if (click.id == "pokemon") {
    document.querySelector('.dropdown').appendChild(p);
    display.classList.add("display")
  }
});*/
// ********************************************************** //
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
document.querySelector('main').addEventListener('click', function(el) {
    addItem(el);

});

function addItem(el) {
  
    let click = el.target;
    let myPokemon = click.textContent;

    let display = document.querySelector(".notification");

    if (favorites.includes(myPokemon)) {
      // Do nothing
    } else if (click.id == "pokemon") {

      let p = document.createElement("P");
      p.innerHTML = myPokemon;
      document.querySelector('.dropdown').appendChild(p);

      display.classList.add("display")
      favorites.push(myPokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));

    }
}

// I create a counter to my user when I add a pokemon to my favorites //
function saveFavoris(number) {
  sessionStorage.setItem("myPokemon", number);
}

document.querySelector("main").addEventListener('click', function(el) {
  let click = el.target;
  let myPokemon = click.textContent;
  sessionStorage.setItem(myPokemon, myPokemon);
  let p = document.createElement('p');
  p.innerHTML = sessionStorage.getItem(myPokemon);
  if (el.target.id == "pokemon") {
    score += 1;
    document.querySelector(".favoris").innerHTML = score;
    saveFavoris();
  }
});
// ********************************************************** //

// At the click of my user the dropdown appears //
document.querySelector(".user_img").addEventListener('click', function() {
  let hidden = document.querySelector(".dropdown");
  hidden.classList.toggle("hidden");
});
// ********************************************************** //

// At click on a pokemon, the dropdown opens automatically //
document.querySelector('main').addEventListener('click', function (al) {
  let click = al.target;
  let visible_dropdown = document.querySelector(".dropdown")
  if (al.target.id == "pokemon") {
    visible_dropdown.classList.add("hidden");
  }
})
// ********************************************************** //

// I'm going to catch my pokemons in my API ! //
document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.currentPage <= 0) {
        sessionStorage.currentPage = 1;
    }

$(document).ready(function(){
  let data = fetch('https://pokeapi.co/api/v2/pokemon/').then(function(response){
	return response.json();
});

  fetch('https://pokeapi.co/api/v2/pokemon/')
  .then((resp) => resp.json())
  .then(function(data) {
    let currentPage = 0;
    sessionStorage.setItem('currentPage', currentPage);

    if(!(sessionStorage.getItem('prev_page') && sessionStorage.getItem('next_page'))) {
      sessionStorage.setItem('prev_page', 0);
      sessionStorage.setItem('next_page', 10)
    }

    let nextPage = document.querySelector('.next');
    let prevPage = document.querySelector('.prev');

    prevPage.addEventListener('click', function() {
      sessionStorage.prev_page = parseInt(sessionStorage.prev_page) - 10;
      sessionStorage.next_page = parseInt(sessionStorage.next_page) - 10;
      sessionStorage.currentPage = parseInt(sessionStorage.currentPage) - 1;
      let pokemons = data.results.slice(sessionStorage.prev_page, sessionStorage.next_page);
      location.reload();
    });

    nextPage.addEventListener('click', function() {
      sessionStorage.prev_page = parseInt(sessionStorage.prev_page) + 10;
      sessionStorage.next_page = parseInt(sessionStorage.next_page) + 10;
      sessionStorage.currentPage = parseInt(sessionStorage.currentPage) + 1;
      let pokemons = data.results.slice(sessionStorage.prev_page, sessionStorage.next_page);
      location.reload();
    });

    let pokemons = data.results.slice(sessionStorage.prev_page, sessionStorage.next_page);
    for (let i = 0; i < pokemons.length; i++) {

    fetch(pokemons[i].url)
    .then((resp) => resp.json())
    .then(function(data) {

      let target = document.querySelector("main");
      let div_1 = document.createElement("DIV");
      let div_2 = document.createElement("DIV");
      let div_3 =document.createElement("DIV");
      let name = document.createElement("H1");
      let image = document.createElement("IMG");
      let type = document.createElement("P");
      let height = document.createElement("P");
      let weight = document.createElement("P");

      name.innerHTML = data.name;
      name.id = "pokemon";
      image.src = data.sprites.front_default;
      type.innerHTML = data.types[0].type.name;
      weight.innerHTML = "Poids : " + data.weight/10 + " kg";
      height.innerHTML = "Taille : " + data.height/10 + " m";

      div_1.classList.add("flex_container");
      div_1.appendChild(div_2);
      div_2.classList.add("container")
      div_2.appendChild(name);
      div_2.appendChild(image);
      div_2.appendChild(div_3)
      div_3.appendChild(type)
      div_3.classList.add(data.types[0].type.name)
      div_2.appendChild(height);
      div_2.appendChild(weight);
      target.appendChild(div_1);
      })
    }
  })
});
});

let score = 0;
