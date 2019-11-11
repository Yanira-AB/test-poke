/* eslint-disable linebreak-style */
import {
  example, searchPokemonByName, findPokemonByCandy, filterType, filterWeak, readPokemon,
} from '../src/data';

describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof example).toBe('function');
  });
});

describe('searchPokemonByName', () => {
  it('debería ser una función', () => {
    expect(typeof searchPokemonByName).toBe('function');
  });
  it('debería retornar un array con un obj con el nombre buscado', () => {
    const data = [{ name: 'Bulbasaur' }, { name: 'Ivysaur' }, { name: 'Venusaur' }];
    const result = [{ name: 'Ivysaur' }];
    expect(searchPokemonByName(data, 'Ivysaur')).toStrictEqual(result);
  });
});

describe('findPokemonByCandy', () => {
  it('debería ser una función', () => {
    expect(typeof findPokemonByCandy).toBe('function');
  });
  it('debería retornar un array con un obj con el # de candys buscado', () => {
    const data = [{ candy_num: 50 }, { candy_num: 25 }, { candy_num: 30 }];
    const result = [{ candy_num: 25 }];
    expect(findPokemonByCandy(data, 25)).toStrictEqual(result);
  });
});

describe('filterType', () => {
  it('debería ser una función', () => {
    expect(typeof filterType).toBe('function');
  });
  it('debería retornar un array con un obj con los tipos de pokemon buscados', () => {
    const data = [{ type: ['Fire', 'Bug', 'Rock'] }, { type: ['Fire', 'Bug'] }, { type: ['Poison'] }];
    const result = [{ type: ['Fire', 'Bug', 'Rock'] }, { type: ['Fire', 'Bug'] }];
    expect(filterType(data, ['Bug', 'Fire'])).toStrictEqual(result);
  });
});

describe('filterWeak', () => {
  it('debería ser una función', () => {
    expect(typeof filterWeak).toBe('function');
  });
  it('debería retornar un array con un obj con las debilidades de los pokemons buscados', () => {
    const data = [{ weaknesses: ['Fire', 'Bug', 'Rock'] }, { weaknesses: ['Fire', 'Bug'] }, { weaknesses: ['Poison'] }];
    const result = [{ weaknesses: ['Fire', 'Bug', 'Rock'] }, { weaknesses: ['Fire', 'Bug'] }];
    expect(filterWeak(data, ['Bug', 'Fire'])).toStrictEqual(result);
  });
});

describe('readPokemon', () => {
  it('debería ser una función', () => {
    expect(typeof readPokemon).toBe('function');
  });
  it('debería retornar un array con un obj con las debilidades de los pokemons buscados', () => {
    const data = [{
      id: 1,
      num: '001',
      peso: 48,
      altura: 1.50,
      name: 'Pikachu',
      img: 'pokemon.img',
      candy: 'candy pika',
      candy_count: 25,
      egg: 4,
      spawn_chance: 69,
      spawn_time: '8:30',
    }];
    const result = [{
      id: 1,
      num: '001',
      name: 'Pikachu',
      img: 'pokemon.img',
      candy: 'candy pika',
      candy_num: 25,
      spawns: 69,
      time: '8:30',
    }];
    expect(readPokemon(data)).toStrictEqual(result);
  });
});
