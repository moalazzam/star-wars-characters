import React from 'react';
import { Route } from 'react-router-dom';

import useThunkReducer from '../hooks/use-thunk-reducer';
import charactersReducer from '../utils/characters-reducer';
import { fetchCharacters } from '../utils/api-actions';

import CharactersSearch from './CharactersSearch';
import CharactersList from './CharactersList';
import CharacterView from './CharacterView';

const initialState = {
  response: null,
  loading: true,
  error: null,
};

function App() {
  const [state, dispatch] = useThunkReducer(charactersReducer, initialState);
  const { characters } = state.response || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
        <button onClick={() => dispatch(fetchCharacters)}>
          Fetch Characters
        </button>
        <CharactersSearch dispatch={dispatch} />
      </header>
      <main>
        <section className="sidebar">
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
