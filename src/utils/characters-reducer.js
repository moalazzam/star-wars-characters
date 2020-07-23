const charactersReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      response: [],
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
      response: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

export default charactersReducer;
