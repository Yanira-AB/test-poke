/* eslint-disable linebreak-style */
/* eslint-disable no-new */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import POKEMON from './data/pokemon/pokemon.js';
import {
  readPokemon, ordenarAZ, ordenarZA, ordenarNumber, searchPokemonByName,
  findPokemonByCandy, appearsPokemons, filterType, filterWeak, example,
} from './data.js';

example();

const listPokemones = readPokemon(POKEMON);

function paintPokemones(listPaintOfPokemon, sectionPaint, index) {
  const sectionCards1 = document.querySelector(sectionPaint);
  for (let j = 0; j < index; j += 1) {
    const cardPokemon = document.createElement('article');
    cardPokemon.classList.add('style-card-pokemon');
    const pokemonName = document.createElement('h3');
    pokemonName.classList.add('style-card-name');
    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('style-card-img');
    const pokemonNum = document.createElement('h4');
    pokemonNum.classList.add('style-card-num');

    cardPokemon.id = listPaintOfPokemon[j].id;
    pokemonName.textContent = listPaintOfPokemon[j].name;
    pokemonImg.src = listPaintOfPokemon[j].img;
    pokemonNum.textContent = `No. ${listPaintOfPokemon[j].num}`;

    cardPokemon.appendChild(pokemonName);
    cardPokemon.appendChild(pokemonImg);
    cardPokemon.appendChild(pokemonNum);

    sectionCards1.appendChild(cardPokemon);
  }
}

function searchTypeWeakness() {
  const checkboxes = document.getElementsByTagName('input');
  const type = [];
  const weakness = [];
  for (let i = 0; i < checkboxes.length; i += 1) {
    if (checkboxes[i].type === 'checkbox' && checkboxes[i].checked === true) {
      const name = checkboxes[i].name;
      if (checkboxes[i].value === 'type') {
        type.push(name);
      } else {
        weakness.push(name);
      }
    }
  }
  let listPaintOfPokemon;
  if (type.length === 0) {
    listPaintOfPokemon = filterWeak(POKEMON, weakness);
    paintPokemones(listPaintOfPokemon, '#sectionFilterTypeWeakness', listPaintOfPokemon.length);
  } else if (weakness.length === 0) {
    listPaintOfPokemon = filterType(POKEMON, type);
    paintPokemones(listPaintOfPokemon, '#sectionFilterTypeWeakness', listPaintOfPokemon.length);
  } else if (type.length > 0 && weakness.length > 0) {
    listPaintOfPokemon = filterWeak(filterType(POKEMON, type), weakness);
    paintPokemones(listPaintOfPokemon, '#sectionFilterTypeWeakness', listPaintOfPokemon.length);
  }
}

function paintCanvas(listPaintOfPokemon) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const pokemonName = [];
  const pokemonSpawns = [];
  for (let index = 0; index < 10; index += 1) {
    pokemonName.push(listPaintOfPokemon[index].name);
    pokemonSpawns.push(listPaintOfPokemon[index].spawns);
  }
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: pokemonName,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: ['#C66E3E', '#8B4E93', '#D19433', '#1FA8FF', '#E84D2C', '#FF120D', '#F0BD1B', '#74B560', '#C49E4D', 'FFDC00'],
        borderColor: ['#C66E3E', '#8B4E93', '#D19433', '#1FA8FF', '#E84D2C', '#FF120D', '#F0BD1B', '#74B560', '#C49E4D', 'FFDC00'],
        data: pokemonSpawns,

      }],
    },
    // Configuration options go here
    options: {
      legend: {
        position: 'right',
        align: 'center',
      },
    },
  });
}

document.querySelector('#page-1').style.display = 'none';
document.querySelector('#page-2').style.display = 'none';
document.querySelector('#page-3').style.display = 'none';
document.querySelector('#page-4').style.display = 'none';

document.querySelector('.img-section-1').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-1').style.display = 'flex';
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('#link-start-1').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-1').style.display = 'flex';
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('.linkMenu1').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-2').style.display = 'none';
  document.querySelector('#page-3').style.display = 'none';
  document.querySelector('#page-4').style.display = 'none';
  document.querySelector('#page-1').style.display = 'flex';
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('.img-section-2').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-2').style.display = 'flex';
});

document.querySelector('#link-start-2').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-2').style.display = 'flex';
});

document.querySelector('.linkMenu2').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-1').style.display = 'none';
  document.querySelector('#page-2').style.display = 'flex';
  document.querySelector('#page-4').style.display = 'none';
  document.querySelector('#page-3').style.display = 'none';
});

document.querySelector('.img-section-3').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-3').style.display = 'flex';
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon);
  paintPokemones(listPaintOfPokemon, '.section10Pokemon', 10);
});

document.querySelector('#link-start-3').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-3').style.display = 'flex';
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon);
  paintPokemones(listPaintOfPokemon, '.section10Pokemon', listPaintOfPokemon.length);
});

document.querySelector('.linkMenu3').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-1').style.display = 'none';
  document.querySelector('#page-2').style.display = 'none';
  document.querySelector('#page-4').style.display = 'none';
  document.querySelector('#page-3').style.display = 'flex';
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon);
  paintPokemones(listPaintOfPokemon, '.section10Pokemon', 10);
});

document.querySelector('.img-section-4').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-4').style.display = 'flex';
});

document.querySelector('#link-start-4').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-4').style.display = 'flex';
});

document.querySelector('.linkMenu4').addEventListener('click', () => {
  document.querySelector('#page-0').style.display = 'none';
  document.querySelector('#page-1').style.display = 'none';
  document.querySelector('#page-2').style.display = 'none';
  document.querySelector('#page-3').style.display = 'none';
  document.querySelector('#page-4').style.display = 'flex';
});

document.querySelector('#buttonTypeWeakness').addEventListener('click', () => {
  document.querySelector('#sectionFilterTypeWeakness').innerHTML = '';
  searchTypeWeakness();
});

document.getElementById('buttonSearch').addEventListener('click', () => {
  const name = document.getElementById('textSearch').value;
  const listPaintOfPokemon = searchPokemonByName(listPokemones, name);
  document.querySelector('.sectionInitPokemon').innerHTML = '';
  paintPokemones(listPaintOfPokemon, '.sectionInitPokemon', listPaintOfPokemon.length);
});

document.getElementById('fieldOrdenar').addEventListener('change', (event) => {
  event.preventDefault();
  const ordenarValue = document.getElementById('fieldOrdenar').value;
  let listPaintOfPokemon = '';
  if (ordenarValue === '1') {
    listPaintOfPokemon = ordenarAZ(listPokemones);
  } else if (ordenarValue === '2') {
    listPaintOfPokemon = ordenarZA(listPokemones);
  } else {
    listPaintOfPokemon = ordenarNumber(listPokemones);
  }
  document.querySelector('.sectionInitPokemon').innerHTML = '';
  paintPokemones(listPaintOfPokemon, '.sectionInitPokemon', listPaintOfPokemon.length);
});

document.querySelector('#buttonFindCandy').addEventListener('click', () => {
  const numberOfCandy = parseInt(document.querySelector('#inputCandy').value, 10);
  const listPaintOfPokemon = findPokemonByCandy(listPokemones, numberOfCandy);
  paintPokemones(listPaintOfPokemon, '.sectionCandyPokemon', listPaintOfPokemon.length);
});

document.querySelector('#buttonFastPokemon').addEventListener('click', () => {
  const number = parseInt(document.querySelector('#inputNumber').value, 10);
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  document.querySelector('.section10Pokemon').innerHTML = '';
  paintCanvas(listPaintOfPokemon);
  paintPokemones(listPaintOfPokemon, '.section10Pokemon', number);
});
