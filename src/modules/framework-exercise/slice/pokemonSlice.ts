import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: [
      { name: "bulbasaur", id: 1 },
      { name: "ivysaur", id: 2 },
      { name: "venusaur", id: 3 },
      { name: "charmander", id: 4 },
      { name: "charmeleon", id: 5 },
      { name: "charizard", id: 6 },
      { name: "squirtle", id: 7 },
      { name: "wartortle", id: 8 },
      { name: "blastoise", id: 9 },
      { name: "caterpie", id: 10 },
      { name: "metapod", id: 11 },
      { name: "butterfree", id: 12 },
    ],
    pokemonSelected: {},
    listQuantity: 12,
  },
  reducers: {},
  extraReducers: () => {},
});

export default pokemonSlice.reducer;

export const getAllPokemons = (state) => state.pokemon.data;
