export const setAnimes = (animes) => ({
  type: "SET_ANIMES",
  payload: animes,
});
export const setCurrentSeasonAnimes = (animes) => ({
  type: "SET_CURRENT_SEASON_ANIMES",
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
