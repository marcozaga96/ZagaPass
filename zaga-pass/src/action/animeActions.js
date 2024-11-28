export const setAnimes = (animes) => ({
  type: "SET_ANIMES",
  payload: animes,
});
export const fetchAnimes = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("Access Token");
    const response = await fetch("http://localhost:3001/api/anime", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAnimes(data._embedded.animeModels));
  };
};
