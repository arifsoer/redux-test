import PokemonList from "@/components/pokemon-list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPokemonData } from "@/redux/pokemon-slice";
import { FC, useEffect } from "react";

const ReduxSlice: FC = () => {
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
    <>
      <h3 className="text-center">Manage by Redux Tooklkit createSlice</h3>
      <PokemonList
        isLoading={isLoading}
        isFetching={false}
        navigation={navigation}
        onNavHandle={onNavHandle}
        pokeList={pokeList}
      />
    </>
  );
};

export default ReduxSlice;
