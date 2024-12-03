export const addRecensione = (recensioneDTO) => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("Invio recensione: ", recensioneDTO); // Log del corpo della richiesta
  console.log("Token di autorizzazione: ", token); // Log del token

  try {
    const response = await fetch("http://localhost:3001/api/recensioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Includi il token di autorizzazione
      },
      body: JSON.stringify(recensioneDTO),
    });

    const data = await response.json();
    console.log("Risposta del backend: ", data); // Log della risposta del backend

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
    ); // Log della richiesta

    try {
      const response = await fetch(
        `http://localhost:3001/api/recensioni/${mediaType}/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includi il token di autorizzazione
          },
        }
      );

      const data = await response.json();
      console.log("Recensioni recuperate: ", data); // Log della risposta del backend

      if (!response.ok) {
        throw new Error("Failed to fetch recensioni");
      }

      dispatch({ type: "FETCH_RECENSIONI_SUCCESS", payload: data });
    } catch (error) {
      console.error("Errore durante il recupero delle recensioni:", error);
      dispatch({ type: "FETCH_RECENSIONI_FAILURE", payload: error });
    }
  };
