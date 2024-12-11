import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchAnimes } from "../action/animeActions";
import { setPage } from "../action/animeActions";
import AnimeComponents from "./AnimeComponents";

const PaginatedAnime = () => {
  const animes = useSelector((state) => state.animes.animesList);
  const currentPage = useSelector((state) => state.animes.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimes(currentPage));
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
      <AnimeComponents animeList={animes} />
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="dark"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Precedente
        </Button>
        <span>Pagina {currentPage + 1}</span>
        <Button variant="dark" onClick={handleNext}>
          Successivo
        </Button>
      </div>
    </>
  );
};

export default PaginatedAnime;
