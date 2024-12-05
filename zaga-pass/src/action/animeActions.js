export const setAnimes = (animes) => ({
  type: "SET_ANIMES",
  payload: animes,
});
export const setCurrentSeasonAnimes = (animes) => ({
  type: "SET_CURRENT_SEASON_ANIMES",
  payload: animes,
});
export const setTopAnimes = (animes) => ({
  type: "SET_TOP_ANIMES",
  payload: animes,
});
export const setPage = (page) => ({
  type: "SET_PAGE",
  payload: page,
});
export const setLoader = (loader) => ({
  type: "SET_LOADER",
  payload: loader,
});
export const searchResultsAnime = (animes) => ({
  type: "SET_SEARCH_RESULTS_ANIME",
  payload: animes,
});
export const fetchAnimes = (page = 0) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Access Token");
      const response = await fetch(
        `http://localhost:3001/api/anime?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setAnimes(data._embedded.animeModels));
      dispatch(setPage(page));
      dispatch(setLoader(false));
    } catch (error) {
      console.error("Error fetching animes:", error);
    }
  };
};
export const fetchCurrentSeasonAnimes = (page = 0) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Access Token");
      const response = await fetch(
        `http://localhost:3001/api/anime/season-now?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response data:", data);
      dispatch(setCurrentSeasonAnimes(data._embedded.animeModels));
      dispatch(setPage(page));
      dispatch(setLoader(false));
    } catch (error) {
      console.error("Error fetching animes:", error);
    }
  };
};
export const fetchTopAnimes = (page = 0) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("Access Token");
      const response = await fetch(
        `http://localhost:3001/api/anime/top?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response data:", data);
      dispatch(setTopAnimes(data._embedded.animeModels));
      dispatch(setPage(page));
      dispatch(setLoader(false));
    } catch (error) {
      console.error("Error fetching animes:", error);
    }
  };
};
export const fetchAnimesByQuery =
  (query, page = 0) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `http://localhost:3001/api/anime?query=${query}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la ricerca degli anime.");
      }

      const data = await response.json();
      dispatch(searchResultsAnime(data._embedded.animeModels));
      dispatch(setPage(page));
      console.log("data ricercati", data);
    } catch (error) {
      console.error("Errore nella ricerca degli anime:", error);
    }
  };
