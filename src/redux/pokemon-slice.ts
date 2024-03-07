import { TPokemonItem, TResponse } from "@/types/pokemon.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type PokemonListState = {
  isLoading: boolean;
  isFetching: boolean;
  next: string | null;
  prev: string | null;
  items: TPokemonItem[];
};

const initialState: PokemonListState = {
  isLoading: false,
  isFetching: false,
  items: [],
  next: null,
  prev: null,
};

export const getPokemonData = createAsyncThunk(
  "pokemon/getData",
  (getUrl: string | undefined = "https://pokeapi.co/api/v2/pokemon") =>
    axios
      .get(getUrl)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err))
);

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
  extraReducers: (builder) => {
    builder.addCase(
      getPokemonData.fulfilled,
      (state, action: PayloadAction<TResponse>) => {
        const { results, next, previous } = action.payload;
        state = {
          ...state,
          items: results,
          next,
          prev: previous,
          isFetching: false,
          isLoading: false,
        };
      }
    );
    builder.addCase(getPokemonData.pending, (state, action) => {
      state.isLoading = true;
      state.isFetching = true;
    });
    builder.addCase(getPokemonData.rejected, (state, action) => {
      state.isLoading = false;
      state.isFetching = false;
    });
  },
});

export const { setDataPokemon, setLoading } = pokemonList.actions;
export default pokemonList;
