import React, { useState } from 'react';
import CharactersList from './CharactersList';
import dummyData from './dummy-data';

function App() {
  const [characters, setCharacters] = useState(dummyData);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharactersList characters={characters} />
        </section>
      </main>
    </div>
  );
}

export default App;
