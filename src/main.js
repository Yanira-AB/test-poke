/* eslint-disable linebreak-style */
/* eslint-disable no-new */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import POKEMON from './data/pokemon/pokemon.js';
import {
  ordenarAZ, ordenarZA, ordenarNumber, searchPokemonByName,
  findPokemonByCandy, appearsPokemons, filterType, filterWeak,
  searchPokemonById, orderByHeight, orderByWeight, orderByEggs, orderWeaknesses, orderStronger,
  searchInputPokemonByName,
} from './data.js';

const listPokemones = POKEMON;
const colorsTypeWeak = [['Fighting', '#B04508'], ['Grass', '#59EC10'], ['Poison', '#5910EC'], ['Fire', '#EC4510'], ['Ice', '#10DBEC'], ['Flying', '#7A3B0D'], ['Psychic', '#F31190'], ['Water', '#040496'], ['Ground', '#B98D03'], ['Rock', '#777673'], ['Electric', '#F5B902'], ['Normal', '#A6A9A6'], ['Dragon', '#A90904'], ['Fairy', '#FA70CF'], ['Ghost', '#5D0642'], ['Dark', '#090909'], ['Steel', '#626060'], ['Bug', '#156506']];
let listPokemonCandy = '';

const cleanPopup = () => {
  document.querySelector('.popupSection1').innerHTML = '';
  document.querySelector('.popupSection2').innerHTML = '';
  document.querySelector('.popupSection3').innerHTML = '';
};

const cleanPage = () => {
  document.querySelector('#sectionFilterTypeWeakness').innerHTML = '';
  document.querySelector('#sectionFastPokemon').innerHTML = '';
  document.querySelector('.sectionCandyPokemon').innerHTML = '';
  document.querySelector('.sectionInitPokemon').innerHTML = '';
};

document.querySelector('.closePopup').addEventListener('click', () => {
  document.querySelector('.modal').classList.remove('opacity-active');
  document.querySelector('.modal').classList.add('opacity-desactive');
  cleanPopup();
});

const paintPopupProperty = (pokemon) => {
  const popupSection1 = document.querySelector('.popupSection1');
  const divInformation = document.createElement('div');
  divInformation.classList.add('popupDivInformation');
  const divProterty = document.createElement('div');
  divProterty.classList.add('popupDivProperty');
  const subDivProterty1 = document.createElement('div');
  subDivProterty1.classList.add('subDivProperty');
  const subDivProterty2 = document.createElement('div');
  subDivProterty2.classList.add('subDivProperty');
  const subDivProterty3 = document.createElement('div');
  subDivProterty3.classList.add('subDivProperty');
  const pokemonImg = document.createElement('img');
  pokemonImg.src = pokemon[0].img;
  const num = document.createElement('h4');
  num.textContent = pokemon[0].num;
  const name = document.createElement('h4');
  name.textContent = `${pokemon[0].name} - No.${num.textContent}`;
  const height = document.createElement('h4');
  height.textContent = `Altura: ${pokemon[0].height}`;
  height.classList.add('h4Section1');
  const weight = document.createElement('h4');
  weight.textContent = `Peso: ${pokemon[0].weight}`;
  weight.classList.add('h4Section2');
  const multip = document.createElement('h4');
  multip.classList.add('h4Section1');
  if (pokemon[0].multipliers != null) { multip.textContent = `Multiplicadores: ${pokemon[0].multipliers}`; } else { multip.textContent = 'Multiplicadores: -'; }
  const candy = document.createElement('h4');
  candy.classList.add('h4Section2');
  if (pokemon[0].candy_count !== undefined) { candy.textContent = `Candy: ${pokemon[0].candy_count}`; } else { candy.textContent = 'Candy:-'; }
  const egg = document.createElement('h4');
  egg.classList.add('h4Section1');
  if (pokemon[0].egg === 'Not in Eggs') { egg.textContent = 'Huevos: -'; } else { egg.textContent = `Huevos: ${pokemon[0].egg}`; }

  subDivProterty1.appendChild(height);
  subDivProterty1.appendChild(weight);
  subDivProterty2.appendChild(egg);
  subDivProterty2.appendChild(candy);
  subDivProterty3.appendChild(multip);
  divProterty.appendChild(subDivProterty1);
  divProterty.appendChild(subDivProterty2);
  divProterty.appendChild(subDivProterty3);

  divInformation.appendChild(name);
  divInformation.appendChild(divProterty);
  popupSection1.appendChild(pokemonImg);
  popupSection1.appendChild(divInformation);
};

const paintPopupTypeWeaknes = (pokemon) => {
  const popupSection2 = document.querySelector('.popupSection2');
  const type = document.createElement('h4');
  type.textContent = 'Tipo: ';
  const arrayType = pokemon[0].type;
  const weaknesses = document.createElement('h4');
  weaknesses.textContent = 'Debilidad: ';
  const arrayWeaknesses = pokemon[0].weaknesses;
  arrayType.forEach((element) => {
    const span = document.createElement('span');
    let i = 0;
    while (colorsTypeWeak[i].indexOf(element) !== 0) {
      i += 1;
    }
    span.style.color = colorsTypeWeak[i][1];
    span.textContent += ` ${element}`;
    type.appendChild(span);
  });
  arrayWeaknesses.forEach((element) => {
    const span = document.createElement('span');
    let j = 0;
    while (colorsTypeWeak[j].indexOf(element) !== 0) {
      j += 1;
    }
    span.style.color = colorsTypeWeak[j][1];
    span.textContent += ` ${element}`;
    weaknesses.appendChild(span);
  });
  popupSection2.appendChild(type);
  popupSection2.appendChild(weaknesses);
};

const paintCardEvolution = (array) => {
  const popupSection3 = document.querySelector('.popupSection3');
  if (array !== undefined) {
    array.forEach((element) => {
      const pokemons = searchPokemonByName(POKEMON, element.name);
      const cardEvolution = document.createElement('div');
      cardEvolution.classList.add('cardEvolution');
      cardEvolution.id = pokemons[0].id;
      const cardName = document.createElement('h5');
      cardName.textContent = element.name;
      const cardImg = document.createElement('img');
      cardImg.src = pokemons[0].img;
      const cardNum = document.createElement('h5');
      cardNum.textContent = element.num;
      cardEvolution.appendChild(cardName);
      cardEvolution.appendChild(cardImg);
      cardEvolution.appendChild(cardNum);

      popupSection3.appendChild(cardEvolution);
    });
  }
};

const paintPopupEvolution = (pokemon) => {
  const arrayPreviousEvolution = pokemon[0].prev_evolution;
  const arrayNextEvolution = pokemon[0].next_evolution;
  paintCardEvolution(arrayPreviousEvolution);
  paintCardEvolution(pokemon);
  paintCardEvolution(arrayNextEvolution);
  const elements = document.querySelectorAll('.cardEvolution');
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      cleanPopup();
      // eslint-disable-next-line no-use-before-define
      showPokemon(element.getAttribute('id'));
    });
  });
};

const showPokemon = (idPokemon) => {
  const pokemon = searchPokemonById(POKEMON, parseInt(idPokemon, 10));
  cleanPopup();
  // section-popup-1
  paintPopupProperty(pokemon);
  // section-popup-2
  paintPopupTypeWeaknes(pokemon);
  // section-popup-3
  paintPopupEvolution(pokemon);
  document.querySelector('.modal').classList.remove('opacity-desactive');
  document.querySelector('.modal').classList.add('opacity-active');
};

const paintPokemones = (listPaintOfPokemon, sectionPaint, indexEnd) => {
  const sectionCards1 = document.querySelector(sectionPaint);
  for (let j = 0; j < indexEnd; j += 1) {
    const cardPokemon = document.createElement('article');
    cardPokemon.classList.add('style-card-pokemon');
    const pokemonName = document.createElement('h3');
    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('style-card-img');
    const pokemonNum = document.createElement('h4');
    cardPokemon.id = listPaintOfPokemon[j].id;
    pokemonName.textContent = listPaintOfPokemon[j].name;
    pokemonImg.src = listPaintOfPokemon[j].img;
    if (sectionPaint === '#sectionFastPokemon') {
      pokemonNum.textContent = `Hora: ${listPaintOfPokemon[j].spawn_time}`;
    } else if (sectionPaint === '.sectionCandyPokemon') {
      pokemonNum.textContent = `${listPaintOfPokemon[j].candy}`;
    } else {
      pokemonNum.textContent = `No. ${listPaintOfPokemon[j].num}`;
    }
    cardPokemon.appendChild(pokemonName);
    cardPokemon.appendChild(pokemonImg);
    cardPokemon.appendChild(pokemonNum);
    sectionCards1.appendChild(cardPokemon);
  }
  const elements = document.querySelectorAll('.style-card-pokemon');
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      showPokemon(element.getAttribute('id'));
    });
  });
};

const searchTypeWeakness = () => {
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
};

const paintCanvas = (listPaintOfPokemon, number) => {
  const sectionFastPokemon = document.querySelector('#sectionFastPokemon');
  const sectionCanvas = document.createElement('section');
  sectionCanvas.classList.add('sectionCanvas');
  const canvas = document.createElement('canvas');
  sectionCanvas.appendChild(canvas);
  sectionFastPokemon.appendChild(sectionCanvas);
  const ctx = canvas.getContext('2d');
  const pokemonName = [];
  const pokemonSpawns = [];
  for (let index = 0; index < number; index += 1) {
    pokemonName.push(listPaintOfPokemon[index].name);
    pokemonSpawns.push(listPaintOfPokemon[index].spawn_chance);
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
};

document.querySelector('#buttonShowSearchType').addEventListener('click', () => {
  const section = document.querySelector('.sectionFilterType');
  section.classList.toggle('hide');
  section.classList.toggle('flex');
  if (section.getAttribute('class') === 'sectionFilterType flex') {
    document.querySelector('#buttonShowSearchType').innerHTML = 'Ocultar &#9650';
    document.querySelector('#buttonShowSearchType').classList.add('style_btn_ocultar');
    document.querySelector('#buttonTypeWeakness').classList.remove('hide');
  } else {
    document.querySelector('#buttonShowSearchType').innerHTML = 'Búsqueda avanzada &#9660';
    document.querySelector('#buttonTypeWeakness').classList.add('hide');
  }
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

document.getElementById('topWeaknesses').addEventListener('change', (event) => {
  event.preventDefault();
  const ordenarValue = document.getElementById('topWeaknesses').value;
  let listPaintOfPokemon = '';
  if (ordenarValue === '1') {
    listPaintOfPokemon = orderStronger(listPokemones);
  } else {
    listPaintOfPokemon = orderWeaknesses(listPokemones);
  }
  document.querySelector('#sectionFilterTypeWeakness').innerHTML = '';
  paintPokemones(listPaintOfPokemon, '#sectionFilterTypeWeakness', listPaintOfPokemon.length);
});

document.getElementById('fieldOrdenar').addEventListener('change', (event) => {
  event.preventDefault();
  const ordenarValue = document.getElementById('fieldOrdenar').value;
  let listPaintOfPokemon = '';
  if (ordenarValue === '1') {
    listPaintOfPokemon = ordenarAZ(listPokemones);
  } else if (ordenarValue === '2') {
    listPaintOfPokemon = ordenarZA(listPokemones);
  } else if (ordenarValue === '3') {
    listPaintOfPokemon = ordenarNumber(listPokemones);
  } else if (ordenarValue === '4') {
    listPaintOfPokemon = orderByWeight(listPokemones);
  } else if (ordenarValue === '5') {
    listPaintOfPokemon = orderByHeight(listPokemones);
  } else {
    listPaintOfPokemon = orderByEggs(listPokemones);
  }
  document.querySelector('.sectionInitPokemon').innerHTML = '';
  paintPokemones(listPaintOfPokemon, '.sectionInitPokemon', listPaintOfPokemon.length);
});

document.getElementById('fieldOrdenarCandy').addEventListener('change', (event) => {
  event.preventDefault();
  const ordenarValue = document.getElementById('fieldOrdenarCandy').value;
  parseInt(document.querySelector('#inputCandy').value, 10);
  let listPaintPokemonCandy;
  if (ordenarValue === '1') {
    listPaintPokemonCandy = ordenarAZ(listPokemonCandy);
  } else if (ordenarValue === '2') {
    listPaintPokemonCandy = ordenarZA(listPokemonCandy);
  } else {
    listPaintPokemonCandy = ordenarNumber(listPokemonCandy);
  }
  // eslint-disable-next-line no-console
  console.log(listPaintPokemonCandy);
  document.querySelector('.sectionCandyPokemon').innerHTML = '';
  paintPokemones(listPaintPokemonCandy, '.sectionCandyPokemon', listPaintPokemonCandy.length);
});

document.querySelector('#buttonFindCandy').addEventListener('click', () => {
  document.querySelector('.sectionCandyPokemon').innerHTML = '';
  const numberOfCandy = parseInt(document.querySelector('#inputCandy').value, 10);
  listPokemonCandy = findPokemonByCandy(listPokemones, numberOfCandy);
  paintPokemones(listPokemonCandy, '.sectionCandyPokemon', listPokemonCandy.length);
});

document.querySelector('#buttonFastPokemon').addEventListener('click', () => {
  const number = parseInt(document.querySelector('#inputNumber').value, 10);
  document.querySelector('#sectionFastPokemon').innerHTML = '';
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon, number);
  paintPokemones(listPaintOfPokemon, '#sectionFastPokemon', number);
});

document.querySelector('#textSearch').addEventListener('keyup', () => {
  document.querySelector('.sectionInitPokemon').innerHTML = '';
  const input = document.querySelector('#textSearch').value;
  const listPaintOfPokemon = searchInputPokemonByName(POKEMON, input);
  paintPokemones(listPaintOfPokemon, '.sectionInitPokemon', listPaintOfPokemon.length);
});

document.querySelector('.section-1').addEventListener('click', () => {
  document.querySelector('#headers').classList.remove('hide');
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('hide');
  document.querySelector('.page-1').classList.add('flex');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  document.querySelector('.body').classList.remove('background-none');
  document.querySelector('.body').classList.add('background');
  cleanPage();
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('.section-2').addEventListener('click', () => {
  document.querySelector('#headers').classList.remove('hide');
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('hide');
  document.querySelector('.page-2').classList.add('flex');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  document.querySelector('.body').classList.remove('background-none');
  document.querySelector('.body').classList.add('background');
  cleanPage();
});

document.querySelector('.section-3').addEventListener('click', () => {
  document.querySelector('#headers').classList.remove('hide');
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('hide');
  document.querySelector('.page-3').classList.add('flex');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  document.querySelector('.body').classList.remove('background-none');
  document.querySelector('.body').classList.add('background');
  cleanPage();
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon, 10);
  paintPokemones(listPaintOfPokemon, '#sectionFastPokemon', 10);
});

document.querySelector('.section-4').addEventListener('click', () => {
  document.querySelector('#headers').classList.remove('hide');
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('hide');
  document.querySelector('.page-4').classList.add('flex');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  document.querySelector('.body').classList.remove('background-none');
  document.querySelector('.body').classList.add('background');
  cleanPage();
});

document.querySelector('#linkMenu1-movil').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('hide');
  document.querySelector('.page-1').classList.add('flex');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('#linkMenu2-movil').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('hide');
  document.querySelector('.page-2').classList.add('flex');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
});

document.querySelector('#linkMenu3-movil').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('hide');
  document.querySelector('.page-3').classList.add('flex');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon, 10);
  paintPokemones(listPaintOfPokemon, '#sectionFastPokemon', 10);
});

document.querySelector('#linkMenu4-movil').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('hide');
  document.querySelector('.page-4').classList.add('flex');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
});

document.querySelector('#img-logo').addEventListener('click', () => {
  document.querySelector('#headers').classList.remove('flex');
  document.querySelector('#headers').classList.add('hide');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('hide');
  document.querySelector('.page-0').classList.add('flex');
  document.querySelector('.body').classList.remove('background');
  document.querySelector('.body').classList.add('background-none');
  cleanPage();
});

document.querySelector('#img-logo-movil').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('hide');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.add('flex');
  cleanPage();
});

document.querySelector('.linkMenu1').addEventListener('click', () => {
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  document.querySelector('#headers').classList.remove('hide');
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('hide');
  document.querySelector('.page-1').classList.add('flex');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.body').classList.remove('background-none');
  document.querySelector('.body').classList.add('background');
  cleanPage();
  paintPokemones(listPokemones, '.sectionInitPokemon', listPokemones.length);
});

document.querySelector('.linkMenu2').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('hide');
  document.querySelector('.page-2').classList.add('flex');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
});

document.querySelector('.linkMenu3').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('hide');
  document.querySelector('.page-3').classList.add('flex');
  document.querySelector('.page-4').classList.remove('flex');
  document.querySelector('.page-4').classList.add('hide');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
  const listPaintOfPokemon = appearsPokemons(listPokemones);
  paintCanvas(listPaintOfPokemon, 10);
  paintPokemones(listPaintOfPokemon, '#sectionFastPokemon', 10);
});

document.querySelector('.linkMenu4').addEventListener('click', () => {
  document.querySelector('#headers').classList.add('flex');
  document.querySelector('.page-1').classList.remove('flex');
  document.querySelector('.page-1').classList.add('hide');
  document.querySelector('.page-2').classList.remove('flex');
  document.querySelector('.page-2').classList.add('hide');
  document.querySelector('.page-3').classList.remove('flex');
  document.querySelector('.page-3').classList.add('hide');
  document.querySelector('.page-4').classList.remove('hide');
  document.querySelector('.page-4').classList.add('flex');
  document.querySelector('.page-0').classList.remove('flex');
  document.querySelector('.page-0').classList.add('hide');
  cleanPage();
});

document.querySelector('#btn-menu-movil').addEventListener('mouseover', () => {
  const listMenuMovil = document.querySelector('.menu-movil');
  listMenuMovil.classList.remove('hide');
});

document.querySelector('.menu-movil').addEventListener('mouseover', () => {
  const listMenuMovil = document.querySelector('.menu-movil');
  listMenuMovil.classList.remove('hide');
});

document.querySelector('.menu-movil').addEventListener('mouseout', () => {
  const listMenuMovil = document.querySelector('.menu-movil');
  listMenuMovil.classList.add('hide');
});
