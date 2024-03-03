import { configureStore } from "@reduxjs/toolkit";
import pokemonListSlice from "./pokemon-slice";

export const store = configureStore({
  reducer: {
    [pokemonListSlice.reducerPath]: pokemonListSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
