import React, { useState, useEffect } from 'react';
import CharactersList from './CharactersList';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

function App() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setCharacters(null);
    setError(null);

    fetch(endpoint + '/characters')
      .then((response) => response.json())
      .then(({ characters }) => {
        setCharacters(characters);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading…</p>
          ) : (
            <CharactersList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
