import { TFetchResponse } from "@/types/pokemon.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getPokemon: builder.query<TFetchResponse, string | undefined>({
      query: (url) => url ?? "https://pokeapi.co/api/v2/pokemon",
    }),
  }),
});

export const { useGetPokemonQuery } = pokemonApi;
export default pokemonApi;
