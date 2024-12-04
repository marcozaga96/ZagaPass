export const addRecensione = (recensioneDTO) => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("Invio recensione: ", recensioneDTO);
  console.log("Token di autorizzazione: ", token);

  try {
    const response = await fetch("http://localhost:3001/api/recensioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recensioneDTO),
    });

    const data = await response.json();
    console.log("Risposta del backend: ", data);

    if (!response.ok) {
      throw new Error("Failed to add recensione");
    }

    dispatch({ type: "ADD_RECENSIONE_SUCCESS", payload: data });
  } catch (error) {
    console.error("Errore durante l'aggiunta della recensione:", error);
    dispatch({ type: "ADD_RECENSIONE_FAILURE", payload: error });
  }
};

export const fetchRecensioniPerMedia =
  (mediaId, mediaType) => async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log(
      "Recupero recensioni per mediaId: ",
      mediaId,
      " e tipo: ",
      mediaType
    );

    try {
      const response = await fetch(
        `http://localhost:3001/api/recensioni/${mediaType}/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Recensioni recuperate: ", data);

      if (!response.ok) {
        throw new Error("Failed to fetch recensioni");
      }

      dispatch({ type: "FETCH_RECENSIONI_SUCCESS", payload: data });
    } catch (error) {
      console.error("Errore durante il recupero delle recensioni:", error);
      dispatch({ type: "FETCH_RECENSIONI_FAILURE", payload: error });
    }
  };
