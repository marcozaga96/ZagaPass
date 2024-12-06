const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_PROFILE":
      return { ...state, profile: action.payload, error: null };
    case "SET_USER_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USER_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
