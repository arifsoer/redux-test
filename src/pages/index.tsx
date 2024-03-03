import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import PokemonList from "./pokemon-list";
import { TNavigationObj, TPokemonItem } from "@/types/pokemon.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDataPokemon, setLoading } from "@/redux/pokemon-slice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [navigation, setNavigation] = useState<TNavigationObj>({
    next: null,
    prev: null,
  });

  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useAppDispatch();

  const { items: pokeList, isLoading } = useAppSelector(
    (state) => state.pokemonList
  );

  useEffect(() => {
    dispatch(setLoading(true));
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((result): void => {
        // setPokeList(result.results);
        dispatch(setDataPokemon(result.results));
        setNavigation({
          next: result.next,
          prev: result.previous,
        });
      })
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const onNavHandle = (type: "prev" | "next") => {
    dispatch(setLoading(true));
    fetch(type === "next" ? navigation.next ?? "" : navigation.prev ?? "")
      .then((res) => res.json())
      .then((result): void => {
        dispatch(setDataPokemon(result.results));
        setNavigation({
          next: result.next,
          prev: result.previous,
        });
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <PokemonList
      isLoading={isLoading}
      isFetching={isFetching}
      navigation={navigation}
      onNavHandle={onNavHandle}
      pokeList={pokeList}
    />
  );
}
