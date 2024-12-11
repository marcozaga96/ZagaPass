import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchSerietv } from "../action/serietvActions";
import { setPage } from "../action/serietvActions";
import SerieTVComponents from "./SerieTVComponents";

const PaginatedSerieTV = () => {
  const serietv = useSelector((state) => state.serietv.serietvList);
  const currentPage = useSelector((state) => state.serietv.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSerietv(currentPage));
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
      <SerieTVComponents tvShowList={serietv} />
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

export default PaginatedSerieTV;
