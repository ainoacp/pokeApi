let pokemonList = [];

let divPokemon$$ = document.querySelector(".pokemonList");
let divSearch$$ = document.querySelector(".search");

const getPokemon = async () => {
    for (i = 1; i < 152; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseJson = await response.json();
        pokemonList = [...pokemonList, responseJson];
    }
};

const mapPokemon = (pokemonList) => {
  return pokemonList.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default,
    type: pokemon.types.map(type => type.type.name).join(', '),
  }));

};

const drawPokemon = (pokemonList) => {
  divPokemon$$.innerHTML = "";
  for (const pokemon of pokemonList) {
    let pokemonDiv = document.createElement("div");
    pokemonDiv.className = "pokemon-card";

    let pokemonName = document.createElement("h4");
    pokemonName.className = 'pokemon-name';
    pokemonName.textContent = pokemon.name;

    let pokemonImage = document.createElement("img");
    pokemonImage.setAttribute("src", pokemon.image);
    pokemonImage.setAttribute("alt", pokemon.name);

    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(pokemonImage);

    divPokemon$$.appendChild(pokemonDiv);
  }
};

const drawInputSearch = () => {
  let input$$ = document.createElement("input");
  input$$.placeholder = ('search pokemon');
  divSearch$$.appendChild(input$$);
  input$$.addEventListener("input", () =>
    searchPokemon(input$$.value, pokemonList)
  );
};

const searchPokemon = (filtro, pokemonList) => {
  let searchedPokemon = pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(filtro.toLowerCase()) ||
      pokemon.type.toLowerCase().includes(filtro.toLowerCase()) ||
      pokemon.id == filtro
  );
  console.log(searchedPokemon);
  drawPokemon(searchedPokemon);
};

const drawButtonsFilter = () => {

  const pokemonTypes = ['normal', 'grass', 'fire', 'water', 
                        'bug', 'electric', 'rock', 'ghost', 
                        'poison', 'psychic', 'fighting', 
                        'ground', 'dragon'];

  let filterButtons$$ = document.createElement('div');
  filterButtons$$.className = 'filterBtns';
  divSearch$$.appendChild(filterButtons$$);
  
  for (const type of pokemonTypes) {
    let typeBtn$$ = document.createElement('button')
    typeBtn$$.textContent = type;
    typeBtn$$.className = 'button-type';
    filterButtons$$.appendChild(typeBtn$$);
    typeBtn$$.addEventListener('click', () => 
      filterPokemon(type, pokemonList)
    )
  };

  let resetBtn$$ = document.createElement('button');
  resetBtn$$.textContent = ('reset');
  resetBtn$$.className = 'button-reset';
  divSearch$$.appendChild(resetBtn$$);
  resetBtn$$.addEventListener('click', () => 
    drawPokemon(pokemonList));
};

const filterPokemon = (type, pokemonList) => {
  let filteredPokemon = pokemonList.filter(
    (pokemon) => {
      return pokemon.type.includes(type);
    });
  drawPokemon(filteredPokemon);
};

const init = async () => {
  await getPokemon();
  pokemonList = [...mapPokemon(pokemonList)];

  drawPokemon(pokemonList);

  drawInputSearch();
  drawButtonsFilter();
};

init();