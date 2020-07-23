import React, { useState, useEffect } from 'react';

import { searchCharacters } from '../utils/api-actions';

const CharactersSearch = React.memo(({ dispatch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch((dispatch) => {
      searchCharacters(dispatch, query);
    });
  }, [dispatch, query]);

  return (
    <input
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search Here"
      type="search"
      value={query}
    />
  );
});

export default CharactersSearch;
