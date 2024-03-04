import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pokemon, PokemonData } from '../../types';

export interface InitialState {
  pokemonList: PokemonData[];
  pokemonSelected: Pokemon;
  listQuantity: number;
}

const initialState: InitialState = {
  pokemonList: [],
  pokemonSelected: null,
  listQuantity: 12,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<PokemonData[]>) => {
      state.pokemonList = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setPokemonList } = pokemonSlice.actions;

export default pokemonSlice.reducer;
