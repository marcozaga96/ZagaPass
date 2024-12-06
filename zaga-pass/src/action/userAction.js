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

export const updateUserProfile = (updatedData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento del profilo");
      }

      const data = await response.json();
      dispatch(setUserProfile(data));
    } catch (error) {
      console.error("Errore durante l'aggiornamento del profilo:", error);
      dispatch(setUserError(error.message));
    }
  };
};

export const deleteUserProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserLoading(true));
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/users/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante la cancellazione del profilo");
      }

      localStorage.removeItem("Access Token");
      dispatch(setUserProfile(null));
    } catch (error) {
      dispatch(setUserError(error.message));
    } finally {
      dispatch(setUserLoading(false));
    }
  };
};
