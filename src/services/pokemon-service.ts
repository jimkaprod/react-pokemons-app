import Pokemon from "../models/pokemon";
import PokemonTypes from '../models/pokemonTypes';

export default class PokemonService {

  static getPokemons(typeId: number = 0): Promise<Pokemon[]> {
    return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .then(data => {
        if (typeId === 0) {
          return data;
        } else {
          return data.find((pokemon: Pokemon) => pokemon.types.includes(typeId));
        }

      })
      .catch(error => this.handleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
  }

  static updatePokemon(id: number): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
  }

  static getPokemonsTypes(): Promise<PokemonTypes[]> {
    return fetch(`http://localhost:3001/types`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error)
  }
}
