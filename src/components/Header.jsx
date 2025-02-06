// src/components/Header.js
import React, { useState } from 'react';
import pokeball from '../assets/pokeball.svg';
import searchIcon from '../assets/search.svg';
import closeIcon from '../assets/cross.svg';
import sortingIcon from '../assets/sorting.svg';
import logo from '../assets/felixLogo.png';

const Header = ({ searchTerm, setSearchTerm, filterBy, setFilterBy, clearSearch }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleSortClick = () => {
    setShowFilters(!showFilters); // 切換 showFilters 的狀態
  };

  return (
    <header className="header home">
      <div className="container">
        <div className="logo-wrapper">
          <img src={pokeball} alt="pokeball" />
          <h1>Pokedex</h1>
        </div>
        <div className="search-wrapper">
          <div className="search-wrap">
            <img src={searchIcon} alt="search icon" className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-input body3-fonts"
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src={closeIcon}
              alt="close icon"
              className={`search-close-icon ${searchTerm ? 'search-close-icon-visible' : ''}`}
              id="search-close-icon"
              onClick={clearSearch}
            />
          </div>
          <div className="sort-wrapper">
            <div className="sort-wrap" onClick={handleSortClick}>
              <img src={sortingIcon} alt="sorting" className="sort-icon" id="sort-icon" />
            </div>
            <div className={`filter-wrapper ${showFilters ? 'filter-wrapper-open' : ''}`}>
              <p className="body2-fonts">Sort by:</p>
              <div className="filter-wrap">
                <div>
                  <input
                    type="radio"
                    name="filters"
                    id="number"
                    className="sort-radio"
                    value="number"
                    checked={filterBy === 'number'}
                    onChange={() => setFilterBy('number')}
                  />
                  <label htmlFor="number" className="body3-fonts">Number</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="filters"
                    id="name"
                    className="sort-radio"
                    value="name"
                    checked={filterBy === 'name'}
                    onChange={() => setFilterBy('name')}
                  />
                  <label htmlFor="name" className="body3-fonts">Name</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;