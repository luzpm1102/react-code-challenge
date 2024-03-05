import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../../types';

interface FavoritesState {
  favorites: Pokemon[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
