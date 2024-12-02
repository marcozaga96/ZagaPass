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
