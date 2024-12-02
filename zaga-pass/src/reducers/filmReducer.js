const initialState = {
  filmsList: [],
  currentFilmsList: [],
  topFilmsList: [],
  selectedTrailer: null,
  currentPage: 0,
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILMS":
      return { ...state, filmsList: action.payload };
    case "SET_CURRENT_FILMS":
      return { ...state, currentFilmsList: action.payload };
    case "SET_TOP_FILMS":
      return { ...state, topFilmsList: action.payload };
    case "SET_TRAILER":
      return { ...state, selectedTrailer: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default filmsReducer;
