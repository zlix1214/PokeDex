import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backIcon from '../assets/back-to-home.svg';
import leftArrowIcon from '../assets/chevron_left.svg';
import rightArrowIcon from '../assets/chevron_right.svg';
import weightIcon from '../assets/weight.svg';
import heightIcon from '../assets/height.svg';
import pokedex from '../assets/pokedex.svg';
import logo from '../assets/felixLogo.png';

const MAX_POKEMON = 649;

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const statNames = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    const pokemonID = parseInt(id, 10);

    if (pokemonID < 1 || pokemonID > MAX_POKEMON) {
      navigate('/');
    } else {
      loadPokemon(pokemonID);
    }
  }, [id, navigate]);

  const loadPokemon = async (id) => {
    try {
      const [pokemonData, pokemonSpeciesData] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
      ]);
      setPokemon(pokemonData);
      setPokemonSpecies(pokemonSpeciesData);
    } catch (error) {
      console.error("An error occurred while fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    if (pokemon) {
      setTypeBackgroundColor(pokemon);
      setProgressBarStyles(pokemon);
    }
  }, [pokemon]);

  const setTypeBackgroundColor = (pokemon) => {
    const mainType = pokemon.types[0].type.name;
    const color = typeColors[mainType];

    if (!color) {
      console.warn(`Color not defined for type: ${mainType}`);
      return;
    }

    const element = document.querySelector('.detail-main');
    if (element) {
      element.style.backgroundColor = color;
    } else {
      console.warn("Element with class 'detail-main' not found");
    }
  };

  const setProgressBarStyles = (pokemon) => {
    const mainType = pokemon.types[0].type.name;
    const color = typeColors[mainType];

    if (!color) {
      console.warn(`Color not defined for type: ${mainType}`);
      return;
    }

    const rgbaColor = rgbaFromHex(color);
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .stats-wrap .progress-bar::-webkit-progress-bar {
          background-color: rgba(${rgbaColor}, 0.5);
      }
      .stats-wrap .progress-bar::-webkit-progress-value {
          background-color: ${color};
      }
    `;
    document.head.appendChild(styleTag);
  };

  const rgbaFromHex = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const navigatePokemon = (newId) => {
    if (newId < 1 || newId > MAX_POKEMON) {
      navigate('/');
    } else {
      navigate(`/detail/${newId}`);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  if (!pokemon || !pokemonSpecies) {
    return <div>Loading...</div>;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const getEnglishFlavorText = (pokemonSpecies) => {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry.language.name === "en") {
        let flavor = entry.flavor_text.replace(/\f/g, " ");
        return flavor;
      }
    }
    return "";
  };

  const { name, types, weight, height, abilities, stats } = pokemon;
  const capitalizePokemonName = capitalizeFirstLetter(name);

  return (
    <main className={`detail-main main  ${name.toLowerCase()}`}>
      <header className="header">
        <div className="header-wrapper">
          <div className="header-wrap">
            <button onClick={goBack} className="back-btn-wrap back-btn-bg">
              <img src={backIcon} alt="back to home" className="back-btn" id="back-btn" />
            </button>
            <div className="name-wrap">
              <h1 className="name detail-name">{capitalizePokemonName}</h1>
            </div>
          </div>
          <div className="pokemon-id-wrap">
            <p className="body2-fonts">#{String(id).padStart(3, "0")}</p>
          </div>
        </div>
      </header>
      <div className="featured-img">
        <a href="#" className="arrow left-arrow" id="leftArrow" onClick={() => navigatePokemon(parseInt(id, 10) - 1)}>
          <img src={leftArrowIcon} alt="back" />
        </a>
        <div className="detail-img-wrapper">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={name}
          />
        </div>
        <a href="#" className="arrow right-arrow" id="rightArrow" onClick={() => navigatePokemon(parseInt(id, 10) + 1)}>
          <img src={rightArrowIcon} alt="forward" />
        </a>
      </div>
      <div className="detail-card-detail-wrapper">
        <div className="power-wrapper">
          {types.map(({ type }, index) => (
            <p key={index} className="body3-fonts type" style={{ backgroundColor: typeColors[type.name] }}>
              {type.name}
            </p>
          ))}
        </div>
        <p className="body2-fonts about-text">About</p>
        <div className="pokemon-detail-wrapper">
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={weightIcon} alt="weight" />
              <p className="body3-fonts weight">{`${weight / 10}kg`}</p>
            </div>
            <p className="caption-fonts">Weight</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail">
              <img src={heightIcon} alt="height" className="straighten" />
              <p className="body3-fonts height">{`${height / 10}m`}</p>
            </div>
            <p className="caption-fonts">Height</p>
          </div>
          <div className="pokemon-detail-wrap">
            <div className="pokemon-detail move">
              {abilities.map(({ ability }, index) => (
                <p key={index} className="body3-fonts">
                  {ability.name}
                </p>
              ))}
            </div>
            <p className="caption-fonts">Move</p>
          </div>
        </div>
        <p className="body3-fonts pokemon-description">{getEnglishFlavorText(pokemonSpecies)}</p>
        <p className="body2-fonts about-text">Base Stats</p>
        <div className="stats-wrapper">
          {stats.map(({ stat, base_stat }, index) => (
            <div key={index} className="stats-wrap" data-stat={stat.name}>
              <p className="body3-fonts stats">{statNames[stat.name] || stat.name.toUpperCase()}</p>
              <p className="body3-fonts">{String(base_stat).padStart(3, "0")}</p>
              <progress value={base_stat} max="150" className="progress-bar"></progress>
            </div>
          ))}
        </div>
      </div>
      <img src={logo} alt="logo" className="detail-bg" />
    </main>
  );
};

export default Detail;