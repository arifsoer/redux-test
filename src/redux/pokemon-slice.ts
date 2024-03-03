import { TPokemonItem } from "@/types/pokemon.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PokemonListState = {
  isLoading: boolean;
  isFetching: boolean;
  items: TPokemonItem[];
};

const initialState: PokemonListState = {
  isLoading: false,
  isFetching: false,
  items: [],
};

export const pokemonList = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDataPokemon: (state, action: PayloadAction<TPokemonItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setDataPokemon, setLoading } = pokemonList.actions;
export default pokemonList;
