export const addFavoriteItem = (preferitiDTO) => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await fetch("http://localhost:3001/preferiti/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferitiDTO),
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    const data = await response.json();
    dispatch({
      type: "ADD_FAVORITE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.error("Errore durante l'aggiunta del preferito:", error);
    dispatch({
      type: "ADD_FAVORITE_FAILURE",
      payload: error,
    });
  }
};

export const removeFavoriteItem = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  try {
    const response = await fetch(
      `http://localhost:3001/preferiti/remove/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove favorite");
    }

    dispatch({
      type: "REMOVE_FAVORITE_SUCCESS",
      payload: id,
    });
  } catch (error) {
    console.error("Errore durante la rimozione del preferito:", error);
    dispatch({
      type: "REMOVE_FAVORITE_FAILURE",
      payload: error,
    });
  }
};

export const fetchFavorites = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await fetch("http://localhost:3001/preferiti", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    const data = await response.json();
    const detailedFavorites = await Promise.all(
      data.map(async (preferiti) => {
        const mediaUrl =
          preferiti.mediaType === "film"
            ? `http://localhost:3001/api/films/${preferiti.mediaId}`
            : preferiti.mediaType === "serieTV"
            ? `http://localhost:3001/api/serietv/${preferiti.mediaId}`
            : `http://localhost:3001/api/anime/${preferiti.mediaId}`;
        const mediaResponse = await fetch(mediaUrl);
        const mediaData = await mediaResponse.json();
        console.log(
          `Details for ${preferiti.mediaType} ${preferiti.mediaId}:`,
          mediaData
        );
        return { ...preferiti, ...mediaData };
      })
    );
    dispatch({ type: "FETCH_FAVORITES_SUCCESS", payload: detailedFavorites });
  } catch (error) {
    console.error("Errore durante il recupero dei preferiti:", error);
    dispatch({ type: "FETCH_FAVORITES_FAILURE", payload: error });
  }
};
