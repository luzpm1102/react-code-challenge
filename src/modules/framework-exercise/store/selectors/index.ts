import { RootState } from '..';
import { PokemonData, PokemonDetail } from '../../types';

export const getAllPokemons = (state: RootState): PokemonData[] =>
  state.pokemon.pokemonList;

export const getState = (state: RootState): RootState => state;

export const getPokemonSelected = (state: RootState): PokemonDetail =>
  state.pokemon.pokemonSelected;
