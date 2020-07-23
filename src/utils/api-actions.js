import endpoint from '../config/endpoint';

export const fetchCharacters = (dispatch) => {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/characters')
    .then((response) => response.json())
    .then((response) =>
      dispatch({ type: 'RESPONSE_COMPLETE', payload: { response } }),
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};

export const searchCharacters = (dispatch, query) => {
  dispatch({ type: 'LOADING' });
  fetch(endpoint + '/search/' + query)
    .then((response) => response.json())
    .then((response) =>
      dispatch({ type: 'RESPONSE_COMPLETE', payload: { response } }),
    )
    .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
};
