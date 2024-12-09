const initialState = {
  filmsList: [],
  currentFilmsList: [],
  topFilmsList: [],
  searchResults: [],
  filmDetails: null,
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
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "GET_FILM_DETAILS_SUCCESS":
      console.log("Setting film details:", action.payload);
      return { ...state, filmDetails: action.payload, error: null };
    case "GET_FILM_DETAILS_FAILURE":
      console.error("Error fetching film details:", action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default filmsReducer;
