const initialState = {
  serietvList: [],
  currentSerietvList: [],
  topSerietvList: [],
  searchResultsSerieTV: [],
  serieTVDetails: null,
  selectedTrailer: null,
  currentPage: 0,
};

const serieTVReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SERIETV":
      return { ...state, serietvList: action.payload };
    case "SET_CURRENT_SERIETV":
      return { ...state, currentSerietvList: action.payload };
    case "SET_TOP_SERIETV":
      return { ...state, topSerietvList: action.payload };
    case "SET_TRAILER":
      return { ...state, selectedTrailer: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SEARCH_RESULTS_SERIETV":
      return {
        ...state,
        searchResultsSerieTV: action.payload,
      };
    case "GET_SERIETV_DETAILS_SUCCESS":
      console.log("Setting serietv details:", action.payload);
      return { ...state, serieTVDetails: action.payload, error: null };
    case "GET_SERIETV_DETAILS_FAILURE":
      console.error("Error fetching serietv details:", action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default serieTVReducer;
