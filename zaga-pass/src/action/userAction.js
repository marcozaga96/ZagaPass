export const setUserProfile = (profile) => ({
  type: "SET_USER_PROFILE",
  payload: profile,
});

export const setUserLoading = (isLoading) => ({
  type: "SET_USER_LOADING",
  payload: isLoading,
});

export const setUserError = (error) => ({
  type: "SET_USER_ERROR",
  payload: error,
});

export const fetchUserProfile = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");

    dispatch(setUserLoading(true));

    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante il recupero del profilo utente.");
      }

      const data = await response.json();
      dispatch(setUserProfile(data));
    } catch (error) {
      console.error("Errore nel recupero del profilo utente:", error);
      dispatch(setUserError(error.message));
    } finally {
      dispatch(setUserLoading(false));
    }
  };
};
