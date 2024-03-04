import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokemonData, PokemonDetail } from '../../types';

export interface InitialState {
  pokemonList: PokemonData[];
  pokemonSelected: PokemonDetail;
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
    setPokemonSelected: (state, action: PayloadAction<PokemonDetail>) => {
      state.pokemonSelected = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setPokemonList, setPokemonSelected } = pokemonSlice.actions;

export default pokemonSlice.reducer;
