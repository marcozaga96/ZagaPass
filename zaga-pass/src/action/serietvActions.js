export const setSerietv = (serietv) => ({
  type: "SET_SERIETV",
  payload: serietv,
});
export const setTrailer = (trailerUrl) => ({
  type: "SET_TRAILER",
  payload: trailerUrl,
});
export const fetchSerietv = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch("http://localhost:3001/api/serietv", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setSerietv(data._embedded.serieTVModels));
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
