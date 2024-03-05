import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokemonData, PokemonDetail } from '../../types';

export interface InitialState {
  pokemonList: PokemonData[];
  pokemonSelected: PokemonDetail;
}

const initialState: InitialState = {
  pokemonList: [],
  pokemonSelected: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonList: (state, action: PayloadAction<PokemonData[]>) => {
      state.pokemonList = action.payload;
    },
    setPokemonSelected: (state, action: PayloadAction<PokemonDetail>) => {
      state.pokemonSelected = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setPokemonList, setPokemonSelected } = pokemonSlice.actions;

export default pokemonSlice.reducer;
