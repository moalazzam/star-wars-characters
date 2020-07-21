import React, { useState, useEffect } from 'react';
import CharactersList from './CharactersList';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

function useFetch(url) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [response, loading, error];
}

function App() {
  const [response, loading, error] = useFetch(endpoint + '/characters');
  const characters = (response && response.characters) || [];

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
