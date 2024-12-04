const initialState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const preferitiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE_SUCCESS":
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload],
      };
    case "REMOVE_FAVORITE_SUCCESS":
      return {
        ...state,
        favoritesList: state.favoritesList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "ADD_FAVORITE_FAILURE":
    case "REMOVE_FAVORITE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default preferitiReducer;
