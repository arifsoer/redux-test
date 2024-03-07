import { Inter } from "next/font/google";
import { useEffect } from "react";
import PokemonList from "./pokemon-list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPokemonData } from "@/redux/pokemon-slice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();

  const {
    items: pokeList,
    isLoading,
    next,
    prev,
  } = useAppSelector((state) => state.pokemonList);

  const navigation = { next, prev };

  useEffect(() => {
    dispatch(getPokemonData());
  }, []);

  const onNavHandle = (type: "prev" | "next") => {
    dispatch(
      getPokemonData(
        type === "next" ? navigation.next ?? "" : navigation.prev ?? ""
      )
    );
  };

  return (
    <PokemonList
      isLoading={isLoading}
      isFetching={false}
      navigation={navigation}
      onNavHandle={onNavHandle}
      pokeList={pokeList}
    />
  );
}
