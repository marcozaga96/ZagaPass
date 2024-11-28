const initialState = [];

const animesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANIMES":
      return action.payload;
    default:
      return state;
  }
};

export default animesReducer;
