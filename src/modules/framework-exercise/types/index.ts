export interface Pokemon {
  id: number;
  name: string;
}

export interface PokemonData {
  name: string;
  url: string;
}
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  sprites: Sprites;
  abilities: Ability[];
}

export interface Type {
  slot: number;
  type: PokemonData;
}

export interface Ability {
  ability: PokemonData;
  is_hidden: boolean;
  slot: number;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}
export interface Response {
  count: number;
  results: PokemonData[];
}

export interface User {
  username: string;
}
