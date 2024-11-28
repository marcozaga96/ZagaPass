const initialState = {
  filmsList: [],
  selectedTrailer: null,
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILMS":
      return { ...state, filmsList: action.payload };
    case "SET_TRAILER":
      return { ...state, selectedTrailer: action.payload };
    default:
      return state;
  }
};

export default filmsReducer;
