import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [pokemonData, setPokemonData] = useState("");
  const [error, setError] = useState("");

  const buscarPokemon = (e) => {
    e.preventDefault()
    if (busqueda) {
 
      axios.get(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`)
        .then((response) => {
          setPokemonData(response.data);

        })
        .catch((err) => {
          setError('Pokemon no encontrado');

        });
    }
  }

  useEffect(() => {
    setPokemonData("")
    setError("")
  }, [busqueda]); //para asegurarnos de que la petición a la API se realice cada vez que searchTerm cambie.

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  return (
    <div className="App">
      <h1>Pokédex</h1>
      <form onSubmit={buscarPokemon}>
      <input
        type="text"
        placeholder="Enter Pokemon name"
        value={busqueda}
        onChange={handleSearch}
      />
      <button type="button">buscar pokemon</button>
      </form>
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default App;
