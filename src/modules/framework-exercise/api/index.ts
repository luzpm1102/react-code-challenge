import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetail, Response } from '../types';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://pokeapi.co/api/v2/`,
  }),
  endpoints: (build) => ({
    pokemonList: build.query<Response, void>({
      query() {
        return {
          url: 'pokemon',
          params: {
            limit: 12,
          },
          method: 'GET',
        };
      },
    }),
    pokemonDetail: build.query<PokemonDetail, { id: string }>({
      query: ({ id }) => `pokemon/${id}`,
    }),
  }),
});

export default api;
