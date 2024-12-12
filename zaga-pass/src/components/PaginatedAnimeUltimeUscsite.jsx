import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchCurrentSeasonAnimes } from "../action/animeActions";
import { setPage } from "../action/animeActions";
import AnimeComponents from "./AnimeComponents";
import Carosello from "./Carosello";

const PaginatedAnimeUltimeUscite = () => {
  const animes = useSelector((state) => state.animes.currentSeasonAnimesList);
  const currentPage = useSelector((state) => state.animes.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentSeasonAnimes(currentPage));
  }, [dispatch, currentPage]);

  const handleNext = () => {
    dispatch(setPage(currentPage + 1));
  };
  const handlePrevious = () => {
    if (currentPage > 0) {
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <>
      <Carosello />
      <AnimeComponents animeList={animes} />
      <div className="d-flex justify-content-between mt-4">
        <Button
          className="mybutton"
          variant="dark"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Precedente
        </Button>
        <span>Pagina {currentPage + 1}</span>
        <Button variant="dark" onClick={handleNext} className="mybutton">
          Successivo
        </Button>
      </div>
    </>
  );
};

export default PaginatedAnimeUltimeUscite;
