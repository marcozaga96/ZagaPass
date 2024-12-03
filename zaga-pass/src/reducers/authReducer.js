const initialState = {
  isAuthenticated: false,
  email: "",
  token: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        email: "",
        token: "",
      };
    default:
      return state;
  }
};

export default authReducer;
