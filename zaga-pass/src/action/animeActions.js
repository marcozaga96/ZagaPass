export const setAnimes = (animes) => ({
  type: "SET_ANIMES",
  payload: animes,
});
export const setPage = (page) => ({
  type: "SET_PAGE",
  payload: page,
});
export const fetchAnimes = (page = 0) => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch(
      `http://localhost:3001/api/anime?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setAnimes(data._embedded.animeModels));
    dispatch(setPage(page));
  };
};
