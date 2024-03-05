import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slice/pokemonSlice';
import favoriteReducer from './slice/favoriteSlice';
import userReducer from './slice/userSlice';
import api from '../api';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  favorites: favoriteReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
