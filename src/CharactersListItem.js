import React from 'react';

const CharactersListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharactersListItem">
      <a className="CharactersListItemLink" href={`/characters/${id}`}>
        {name}
      </a>
    </article>
  );
};

export default CharactersListItem;
