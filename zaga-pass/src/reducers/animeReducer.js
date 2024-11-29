const initialState = {
  animesList: [],
  currentPage: 0,
};

const animesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANIMES":
      return { ...state, animesList: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default animesReducer;
