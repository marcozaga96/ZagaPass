export const loginSuccess = (email, token) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { email, token },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const { accessToken } = data;
    dispatch(loginSuccess(email, accessToken));
    localStorage.setItem("Access Token", accessToken);
  } catch (error) {
    console.error("Errore durante il login:", error);
  }
};