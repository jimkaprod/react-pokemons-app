import React, { FunctionComponent, useEffect, useState } from 'react';
import PokemonTypes from '../../models/pokemonTypes';
import PokemonService from '../../services/pokemon-service';
import './pokemon-filter.scss'
type Props = {}

const PokemonFilter: FunctionComponent<Props> = () => {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonTypes[]>([]);

  useEffect(() => {
        PokemonService.getPokemonsTypes()
        .then((pokemonTypes) => {
          return setPokemonTypes(pokemonTypes)
        });
  }, []);

  const filterByType = (typeId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log('You clicked submit.>>>', typeId);
  }

  return (
      <div className="filter-container">
        {pokemonTypes.map(type => (
            <button 
              key={type.id}
              onClick={(e) => filterByType(type.id, e)}
              className="waves-effect waves-light btn"
            >
              {type.name}
            </button>
        ))}
      </div>
  );
}

export default PokemonFilter;
