import React, { useReducer, useEffect } from 'react';
import CharactersList from './CharactersList';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

const initialState = {
  response: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      response: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      response: action.payload.response,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      response: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

function useFetch(url) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING' });

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response } });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', payload: { error } });
      });
  }, [url]);

  return [state.response, state.loading, state.error];
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
