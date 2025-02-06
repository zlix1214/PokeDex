// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import Detail from './components/Detail';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('number');

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main className="main mainBG">
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              clearSearch={clearSearch}
            />
            <PokemonList searchTerm={searchTerm} filterBy={filterBy} />
          </main>
        } />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;