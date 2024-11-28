const initialState = {
  serietvList: [],
  selectedTrailer: null,
};

const serieTVReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERIETV":
      return { ...state, serietvList: action.payload };
    case "SET_TRAILER":
      return { ...state, selectedTrailer: action.payload };
    default:
      return state;
  }
};

export default serieTVReducer;
