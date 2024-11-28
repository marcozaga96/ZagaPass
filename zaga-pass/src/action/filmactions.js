export const setFilms = (films) => ({
  type: "SET_FILMS",
  payload: films,
});

export const setTrailer = (trailerUrl) => ({
  type: "SET_TRAILER",
  payload: trailerUrl,
});

export const fetchFilms = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch("http://localhost:3001/api/films", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setFilms(data._embedded.filmModels));
  };
};

export const fetchTrailer = (movieId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/films/${movieId}/videos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const trailer = data.find((video) => video.type === "Trailer");
    const trailerUrl = trailer
      ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
      : null;
    dispatch(setTrailer(trailerUrl));
  };
};
