const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.types = types;
  pokemon.type = types[0];
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  //Detalhes
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  const abilities = pokeDetail.abilities.map(
    (abilitySlot) => abilitySlot.ability.name
  );
  pokemon.abilities = abilities;
  pokemon.ability = abilities[0];
  pokemon.gender = pokeDetail.species.gender_rate;

  if (pokeDetail.species.genera != undefined) {
    pokemon.species = pokeDetail.species.genera[7].genus;
  } else {
    pokemon.species = 'Unknown';
  }

  if (pokeDetail.species.egg_groups != undefined) {
    pokemon.eggGroups = pokeDetail.species.egg_groups.map(
      (group) => group.name
    );
  } else {
    pokemon.eggGroups = ['Unknown'];
  }

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonById = (id) => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  return Promise.all([
    fetch(pokemonUrl).then((response) => response.json()),
    fetch(speciesUrl).then((response) => response.json()),
  ]).then(([pokemonDetail, speciesDetail]) => {
    const combinedDetail = { ...pokemonDetail, species: speciesDetail };
    return convertPokeApiDetailToPokemon(combinedDetail);
  });
};
