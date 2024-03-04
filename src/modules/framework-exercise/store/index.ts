import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slice/pokemonSlice';
import api from '../api';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export default store;
