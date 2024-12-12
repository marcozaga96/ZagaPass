import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchTopAnimes } from "../action/animeActions";
import { setPage } from "../action/animeActions";
import AnimeComponets from "./AnimeComponents";
import Carosello from "./Carosello";

const PaginatedAnimePiùVotati = () => {
  const animes = useSelector((state) => state.animes.topAnimesList);
  const currentPage = useSelector((state) => state.animes.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopAnimes(currentPage));
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
      <AnimeComponets animeList={animes} />
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="dark"
          className="mybutton"
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

export default PaginatedAnimePiùVotati;
