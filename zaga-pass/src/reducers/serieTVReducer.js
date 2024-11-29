const initialState = {
  serietvList: [],
  selectedTrailer: null,
  currentPage: 0,
};

const serieTVReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERIETV":
      return { ...state, serietvList: action.payload };
    case "SET_TRAILER":
      return { ...state, selectedTrailer: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default serieTVReducer;
