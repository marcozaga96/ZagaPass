const initialState = {
  favoritesList: [],
  loading: false,
  error: null,
};

const preferitiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return {
        ...state,
        favoritesList: action.payload,
        loading: false,
      };
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
    case "SET_FAVORITES_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_FAVORITES_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default preferitiReducer;
