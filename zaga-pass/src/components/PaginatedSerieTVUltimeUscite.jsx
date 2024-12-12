import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { fetchCurrentSerietv } from "../action/serietvActions";
import { setPage } from "../action/serietvActions";
import SerieTVComponents from "./SerieTVComponents";
import Carosello from "./Carosello";

const PaginatedSerieTVUltimeUscite = () => {
  const serietv = useSelector((state) => state.serietv.currentSerietvList);
  const currentPage = useSelector((state) => state.serietv.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentSerietv(currentPage));
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
      <SerieTVComponents tvShowList={serietv} />
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="dark"
          onClick={handlePrevious}
          className="mybutton"
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

export default PaginatedSerieTVUltimeUscite;
