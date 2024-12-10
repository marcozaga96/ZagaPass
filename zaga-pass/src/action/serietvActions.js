export const setSerietv = (serietv) => ({
  type: "SET_SERIETV",
  payload: serietv,
});
export const setCurrentSerietv = (serietv) => ({
  type: "SET_CURRENT_SERIETV",
  payload: serietv,
});
export const setTopSerietv = (serietv) => ({
  type: "SET_TOP_SERIETV",
  payload: serietv,
});
export const setTrailer = (trailerUrl) => ({
  type: "SET_TRAILER",
  payload: trailerUrl,
});
export const setPage = (page) => ({
  type: "SET_PAGE",
  payload: page,
});
export const searchResultsSerieTV = (serietv) => ({
  type: "SET_SEARCH_RESULTS_SERIETV",
  payload: serietv,
});
export const setSerietvDetails = (serietv) => ({
  type: "GET_SERIETV_DETAILS_SUCCESS",
  payload: serietv,
});
export const fetchSerietv = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/serietv?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setSerietv(data._embedded.serieTVModels));
    dispatch(setPage(page));
  };
};
export const fetchCurrentSerietv = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/serietv/playing-now?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setCurrentSerietv(data._embedded.serieTVModels));
    dispatch(setPage(page));
  };
};
export const fetchTopSerietv = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/serietv/top?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setTopSerietv(data._embedded.serieTVModels));
    dispatch(setPage(page));
  };
};

export const fetchTrailer = (serietvId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/serietv/${serietvId}/videos`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    const trailer = data.find((video) => video.type === "Trailer");
    const trailerUrl = trailer
      ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
      : null;
    dispatch(setTrailer(trailerUrl));
  };
};
export const fetchSerieTVByQuery =
  (query, page = 0) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `http://localhost:3001/api/serietv?query=${query}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la ricerca dei film.");
      }

      const data = await response.json();
      dispatch(searchResultsSerieTV(data._embedded.serieTVModels));
      dispatch(setPage(page));
      console.log("data ricercati", data);
    } catch (error) {
      console.error("Errore nella ricerca dei film:", error);
    }
  };
export const getSerieTVDetails = (serietvId) => {
  return async (dispatch) => {
    try {
      console.log("Fetching details for serietvId:", serietvId);

      const token = localStorage.getItem("Access Token");
      if (!token) {
        console.error("Access Token mancante.");
        return dispatch({
          type: "GET_SERIETV_DETAILS_FAILURE",
          payload: "Token non trovato.",
        });
      }

      const response = await fetch(
        `http://localhost:3001/api/serietv/${serietvId}/full`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data ricevuti dal server:", data);

      dispatch(setSerietvDetails(data));
    } catch (error) {
      console.error(
        "Errore durante il recupero dei dettagli della serietv:",
        error.message || error
      );
      dispatch({
        type: "GET_SERIETV_DETAILS_FAILURE",
        payload: error.message || "Errore sconosciuto.",
      });
    }
  };
};
