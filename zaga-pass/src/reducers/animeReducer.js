const initialState = {
  animesList: [],
  currentSeasonAnimesList: [],
  topAnimesList: [],
  searchResults: [],
  currentPage: 0,
  loader: true,
};

const animesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANIMES":
      return { ...state, animesList: action.payload };
    case "SET_CURRENT_SEASON_ANIMES":
      return { ...state, currentSeasonAnimesList: action.payload };
    case "SET_TOP_ANIMES":
      return { ...state, topAnimesList: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_LOADER":
      return { ...state, loader: action.payload };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default animesReducer;
