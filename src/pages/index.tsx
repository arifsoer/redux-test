import { Inter } from "next/font/google";
import { useEffect } from "react";
import PokemonList from "../components/pokemon-list";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPokemonData } from "@/redux/pokemon-slice";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const menuList = [
    {
      title: "React Hooks",
      url: "/hooks",
    },
    {
      title: "Redux Slice",
      url: "/redux-slice",
    },
    {
      title: "RTK Query",
      url: "/rtk-query",
    },
  ];

  return (
    <div>
      <h1 className="text-center mb-5">Pick One to check the result</h1>
      <div className="d-flex justify-content-around">
        {menuList.map((item) => (
          <button
            key={item.title}
            className="btn btn-primary"
            onClick={() => router.push(item.url)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
