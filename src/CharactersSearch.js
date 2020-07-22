import React, { useState, useEffect } from 'react';

const endpoint = 'https://star-wars-character-search.glitch.me/api';

function searchCharacters(dispatch, query) {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/search/' + query)
    .then((response) => response.json())
    .then((response) =>
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      }),
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
}

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
