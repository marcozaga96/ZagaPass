import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { fetchTopAnimes } from "../action/animeActions";
import { setPage } from "../action/animeActions";
import AnimeComponets from "./AnimeComponents";

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
    <Container fluid className="pt-4 background">
      <AnimeComponets animeList={animes} />
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Precedente
        </Button>
        <span>Pagina {currentPage + 1}</span>
        <Button variant="secondary" onClick={handleNext}>
          Successivo
        </Button>
      </div>
    </Container>
  );
};

export default PaginatedAnimePiùVotati;
