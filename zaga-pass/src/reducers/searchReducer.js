const initialState = {
  query: "",
  context: "home",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, query: action.payload };
    case "SET_SEARCH_CONTEXT":
      return { ...state, context: action.payload };
    default:
      return state;
  }
};
