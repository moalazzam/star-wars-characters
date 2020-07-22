import React, { useReducer, useEffect, useCallback } from 'react';
import isFunction from 'lodash/isFunction';
import { Route } from 'react-router-dom';

import CharactersSearch from './CharactersSearch';
import CharactersList from './CharactersList';
import CharacterView from './CharacterView';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

const initialState = {
  characters: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action) => {
      if (isFunction(action)) {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );
  return [state, enhancedDispatch];
}

function fetchCharacters(dispatch) {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/characters')
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      }),
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
}

function App() {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { characters } = state;

  useEffect(() => {
    dispatch((dispatch) => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharactersSearch dispatch={dispatch} />
          <button onClick={() => dispatch(fetchCharacters)}>
            Fetch Characters
          </button>
          <CharactersList characters={characters} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
        </section>
      </main>
    </div>
  );
}

export default App;
