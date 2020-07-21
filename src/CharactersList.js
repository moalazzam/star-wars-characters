import React from 'react';

import CharactersListItem from './CharactersListItem';

const CharactersList = ({ characters = [] }) => {
  return (
    <section className="CharactersList">
      {characters.map((character) => (
        <CharactersListItem key={character.id} character={character} />
      ))}
    </section>
  );
};

export default CharactersList;
