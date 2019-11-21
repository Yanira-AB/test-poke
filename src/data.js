/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// eslint-disable-next-line arrow-body-style
export const arrayWeaknesses = (data) => {
  const arrayCopy = data.map((pokemon) => ({
    id: pokemon.id,
    num: pokemon.num,
    name: pokemon.name,
    img: pokemon.img,
    weaknesses: pokemon.weaknesses,
  }));
  return arrayCopy;
};

export const orderStronger = (data) => {
  const newData = arrayWeaknesses(data);
  return newData.sort((a, b) => a.weaknesses.length - b.weaknesses.length);
};

export const orderWeaknesses = (data) => {
  const newData = arrayWeaknesses(data);
  return newData.sort((a, b) => b.weaknesses.length - a.weaknesses.length);
};

export const arrayMap = (data) => {
  const arrayCopy = data.map((pokemon) => ({
    id: pokemon.id,
    num: pokemon.num,
    name: pokemon.name,
    img: pokemon.img,
    height: parseFloat(pokemon.height.split('m')),
    weight: parseFloat(pokemon.weight.split('kg')),
    candy: pokemon.candy,
    egg: pokemon.egg,
    spawn_chance: pokemon.spawn_chance,
    spawn_time: pokemon.spawn_time,
  }));
  return arrayCopy;
};

export const arrayMapEgg = (data) => {
  const arrayCopy = data.map((pokemon) => ({
    id: pokemon.id,
    num: pokemon.num,
    name: pokemon.name,
    img: pokemon.img,
    height: pokemon.height,
    weight: pokemon.weight,
    egg: parseInt(pokemon.egg.split('km'), 10),
  }));
  return arrayCopy;
};

export const ordenarAZ = (data) => {
  const dataCopy = arrayMap(data);
  return dataCopy.sort((a, b) => a.name.localeCompare(b.name));
};

export const ordenarZA = (data) => {
  const dataCopy = arrayMap(data);
  return dataCopy.sort((a, b) => b.name.localeCompare(a.name));
};

export const ordenarNumber = (data) => {
  const dataCopy = arrayMap(data);
  return dataCopy.sort((a, b) => (a.id - b.id));
};

export const orderByHeight = (data) => {
  const dataCopy = arrayMap(data);
  return dataCopy.sort((a, b) => (a.height - b.height));
};

export const orderByWeight = (data) => {
  const dataCopy = arrayMap(data);
  return dataCopy.sort((a, b) => (a.weight - b.weight));
};

export const orderByEggs = (data) => {
  let dataCopy = arrayMap(data);
  dataCopy = dataCopy.filter((item) => (item.egg !== 'Not in Eggs'));
  dataCopy = arrayMapEgg(dataCopy);
  return dataCopy.sort((a, b) => (a.egg - b.egg));
};

// eslint-disable-next-line no-shadow
export const searchPokemonByName = (data, name) => data.filter((data) => (data.name === name));
export const searchInputPokemonByName = (data, name) => {
  const pokemon = [];
  const dataMap = arrayMap(data);
  // eslint-disable-next-line array-callback-return
  dataMap.filter((element) => {
    const text = element.name.toLowerCase();
    if (text.indexOf(name) !== -1) {
      pokemon.push(element);
    }
  });
  return pokemon;
};
// eslint-disable-next-line no-shadow
export const searchPokemonById = (data, id) => data.filter((data) => (data.id === id));
// eslint-disable-next-line no-shadow
export const findPokemonByCandy = (data, number) => data.filter((data) => (data.candy_count === number));

export const appearsPokemons = (data) => {
  const dataMap = arrayMap(data);
  dataMap.sort((a, b) => (b.spawn_chance - a.spawn_chance));
  return dataMap;
};

export const filterType = (data, array) => {
  let count = 0;
  const pokemons = [];
  for (let index = 0; index < data.length; index += 1) {
    for (let index2 = 0; index2 < array.length; index2 += 1) {
      const element = data[index].type;
      // eslint-disable-next-line no-loop-func
      element.filter(((item) => {
        if (item === array[index2]) {
          count += 1;
        }
        if (data[index].type[data[index].type.length - 1] === item && count === array.length) {
          pokemons.push(data[index]);
          count = 0;
        }
        if (data[index].type[data[index].type.length - 1] === item && array[array.length - 1] === array[index2]) {
          count = 0;
        }
        return count;
      }));
    }
  }
  return pokemons;
};

export const filterWeak = (data, array) => {
  let count = 0;
  const pokemons = [];
  for (let index = 0; index < data.length; index += 1) {
    for (let index2 = 0; index2 < array.length; index2 += 1) {
      const element = data[index].weaknesses;
      // eslint-disable-next-line no-loop-func
      element.filter(((item) => {
        if (item === array[index2]) {
          count += 1;
        }
        if (data[index].weaknesses[data[index].weaknesses.length - 1] === item && count === array.length) {
          pokemons.push(data[index]);
          count = 0;
        }
        if (data[index].weaknesses[data[index].weaknesses.length - 1] === item && array[array.length - 1] === array[index2]) {
          count = 0;
        }
        return count;
      }));
    }
  }
  return pokemons;
};
