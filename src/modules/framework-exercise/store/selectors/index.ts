import { PokemonData } from '../../types';
import { InitialState } from '../slice/pokemonSlice';

export const getAllPokemons = (state: InitialState): PokemonData[] =>
  state.pokemonList;
