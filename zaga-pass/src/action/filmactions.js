export const setFilms = (films) => ({
  type: "SET_FILMS",
  payload: films,
});
export const setCurrentFilms = (films) => ({
  type: "SET_CURRENT_FILMS",
  payload: films,
});
export const setTopFilms = (films) => ({
  type: "SET_TOP_FILMS",
  payload: films,
});
export const setTrailer = (trailerUrl) => ({
  type: "SET_TRAILER",
  payload: trailerUrl,
});
export const setPage = (page) => ({
  type: "SET_PAGE",
  payload: page,
});
export const setSearchResults = (films) => ({
  type: "SET_SEARCH_RESULTS",
  payload: films,
});

export const fetchFilms = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/films?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFilms(data._embedded.filmModels));
    dispatch(setPage(page));
  };
};
export const fetchCurrentFilms = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/films/playing-now?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setCurrentFilms(data._embedded.filmModels));
    dispatch(setPage(page));
  };
};
export const fetchTopFilms = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/films/top?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setTopFilms(data._embedded.filmModels));
    dispatch(setPage(page));
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
export const fetchFilmsByQuery =
  (query, page = 0) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `http://localhost:3001/api/films?query=${query}&page=${page}`,
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
      dispatch(setSearchResults(data._embedded.filmModels));
      dispatch(setPage(page));
      console.log("data ricercati", data);
    } catch (error) {
      console.error("Errore nella ricerca dei film:", error);
    }
  };
