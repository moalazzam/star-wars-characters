import React from 'react';
import { NavLink } from 'react-router-dom';

const CharactersListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <article className="CharactersListItem">
      <NavLink className="CharactersListItemLink" to={`/characters/${id}`}>
        {name}
      </NavLink>
    </article>
  );
};

export default CharactersListItem;
