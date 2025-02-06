// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_POKEMON = 649;

const PokemonList = ({ searchTerm, filterBy }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPokemons(data.results);
        setFilteredPokemons(data.results);
      });
  }, []);

  useEffect(() => {
    let filteredPokemon;
    if (filterBy === 'number') {
      filteredPokemon = allPokemons.filter((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        return pokemonID.startsWith(searchTerm);
      });
    } else if (filterBy === 'name') {
      filteredPokemon = allPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().startsWith(searchTerm);
      });
    } else {
      filteredPokemon = allPokemons;
    }
    setFilteredPokemons(filteredPokemon);
  }, [searchTerm, filterBy, allPokemons]);

  const handlePokemonClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <section className="pokemon-list">
      <div className="container">
        <div className="list-wrapper">
          {filteredPokemons.map((pokemon, index) => {
            const pokemonID = pokemon.url.split("/")[6];
            return (
              <div
                className="list-item"
                key={index}
                onClick={() => handlePokemonClick(pokemonID)}
              >
                <div className="number-wrap">
                  <p className="caption-fonts">#{pokemonID}</p>
                </div>
                <div className="img-wrap">
                  <img
                    src={`https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`}
                    alt={pokemon.name}
                  />
                </div>
                <div className="name-wrap">
                  <p className="body3-fonts">{pokemon.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="not-found-message" style={{ display: filteredPokemons.length === 0 ? 'block' : 'none' }}>
        Pokemon not found
      </div>
    </section>
  );
};

export default PokemonList;