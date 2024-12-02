const initialState = {
  animesList: [],
  currentPage: 0,
  loader: true,
};

const animesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANIMES":
      return { ...state, animesList: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_LOADER":
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};

export default animesReducer;