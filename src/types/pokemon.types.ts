export type TPokemonItem = {
  name: string;
  url: string;
};

export type TNavigationObj = {
  next: string | null;
  prev: string | null;
};

export type TResponse = {
  next: string | null;
  previous: string | null;
  results: TPokemonItem[];
};
