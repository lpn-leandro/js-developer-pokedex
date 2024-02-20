const pokemonDetail = document.getElementById('pokeDetail');

function showPokemonDetailPage(pokemon) {
  return `
    <section class="content ${pokemon.type}">
        <header>
          <a href="index.html"
            ><span class="material-symbols-outlined btnToIndex"> arrow_back </span></a
          >
        </header>
        <div class="pokemonHeader"  id="pokemonChar">
          
  
    <div class="pokemonInfo">
      <div class="detail">
        <span class="name">${pokemon.name}</span>
        <ol class="types">
        ${
          pokemon.types
            ? pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join('')
            : ''
        }
        </ol>
      </div>
  
      <div class="id">
        <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
      </div>
    </div>
    <img
      src="${pokemon.photo}"
      alt="${pokemon.name}"
    />
  
    </div>
  
    <div class="pokemonDetails">
      <div class="detailContent">
        <div class="tabs">
          <button class="tab">About</button>
          <button class="tab">Base Stats</button>
          <button class="tab">Evolution</button>
          <button class="tab">Moves</button>
        </div>
  
        <div class="aboutInfo">
  
  
              <table>
                <tr>
                  <th class="infoName">Species</th>
                  <td class="info">${pokemon.species}</td>
                </tr>
                <tr>
                  <th class="infoName">Height</th>
                  <td class="info">${(pokemon.height / 10).toFixed(2)} cm</td>
                </tr>
                <tr>
                  <th class="infoName">Weight</th>
                  <td class="info">${pokemon.weight / 100} kg</td>
                </tr>
                <tr>
                  <th class="infoName">Abilities</th>
                  <td class="info">${
                    pokemon.abilities
                      ? pokemon.abilities
                          .map((abilities) => `${abilities}`)
                          .join(', ')
                      : ''
                  }</td>
                </tr>
                <tr class="infoTitle">
                  <th>Breeding</th>
                </tr>
                <tr>
                  <th class="infoName">Gender</th>
                  <td class="info">Male: ${
                    (pokemon.gender / 8) * 100
                  }%, Female: ${100 - (pokemon.gender / 8) * 100}%</td>
                </tr>
                <tr>
                  <th class="infoName">Egg Groups</th>
                  <td class="info">${
                    pokemon.eggGroups
                      ? pokemon.eggGroups.map((group) => group).join(', ')
                      : ''
                  }</td>
                </tr>
                <tr>
                  <th class="infoName">Egg Cycle</th>
                  <td class="info">${pokemon.type}</td>
                </tr>
              </table>
  
              </div>
              </div>
            </section>
      `;
}

function loadPokemonDetail(id) {
  pokeApi.getPokemonById(id).then((pokemon) => {
    console.log('Detalhes do Pokémon carregados:', pokemon);
    const newTable = showPokemonDetailPage(pokemon);
    pokemonDetail.innerHTML = newTable;
  });
}

function getPageId() {
  return window.location.search.substring(4);
}

window.onload = function () {
  loadPokemonDetail(getPageId());
};
