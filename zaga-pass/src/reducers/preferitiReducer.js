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
        favoritesList: state.favoritesList.filter((item) => {
          const id = parseInt(action.payload, 10);
          if (isNaN(id)) {
            console.error("Payload is not a valid number:", action.payload);
            return true;
          }
          return item.id !== id;
        }),
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
