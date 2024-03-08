export type TPokemonItem = {
  name: string;
  url: string;
};

export type TNavigationObj = {
  next: string | null;
  prev: string | null;
};

export type TDataResponse = {
  next: string | null;
  previous: string | null;
  results: TPokemonItem[];
};

export type TFetchResponse = {
  code: number;
  data: TDataResponse;
};
