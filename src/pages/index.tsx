import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import PokemonList from "./pokemon-list";

const inter = Inter({ subsets: ["latin"] });

export type TPokemonItem = {
  name: string;
  url: string;
};

export type TNavigationObj = {
  next: string | null;
  prev: string | null;
};

export default function Home() {
  const [pokeList, setPokeList] = useState<TPokemonItem[]>([]);
  const [navigation, setNavigation] = useState<TNavigationObj>({
    next: null,
    prev: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((result): void => {
        setPokeList(result.results);
        setNavigation({
          next: result.next,
          prev: result.previous,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onNavHandle = (type: "prev" | "next") => {
    setIsLoading(true);
    fetch(type === "next" ? navigation.next ?? "" : navigation.prev ?? "")
      .then((res) => res.json())
      .then((result): void => {
        setPokeList(result.results);
        setNavigation({
          next: result.next,
          prev: result.previous,
        });
      })
      .finally(() => setIsLoading(false));
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
