import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchFilms } from "../action/filmactions";
import { setPage } from "../action/filmactions";
import FilmComponents from "./FilmComponents";
import Carosello from "./Carosello";

const PaginatedFilm = () => {
  const films = useSelector((state) => state.films.filmsList);
  const currentPage = useSelector((state) => state.films.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilms(currentPage));
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
      <FilmComponents movieList={films} />
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

export default PaginatedFilm;
