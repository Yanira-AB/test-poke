/* eslint-disable linebreak-style */
import { example, searchPokemonByName } from '../src/data';

describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof example).toBe('function');
  });
});

describe('searchPokemonByName', () => {
  it('debería ser una función', () => {
    expect(typeof searchPokemonByName).toBe('function');
  });
  it('debería retornar un obj con el nombre buscado', () => {
    const data = [{ name: 'Bulbasaur' }, { name: 'Ivysaur' }, { name: 'Venusaur' }];
    const result = [{ name: 'Ivysaur' }];
    expect(searchPokemonByName(data, 'Ivysaur')).toStrictEqual(result);
  });
});
