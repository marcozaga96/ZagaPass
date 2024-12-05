import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import SerieTVComponents from "./SerieTVComponents";

const PaginatedSerieTVPreferiti = () => {
  const serietv = useSelector((state) => state.serietv.serietvList);
  const topSerietv = useSelector((state) => state.serietv.topSerietvList);
  const currentSerietv = useSelector(
    (state) => state.serietv.currentSerietvList
  );
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);

  const combinedSerieTV = [...serietv, ...topSerietv, ...currentSerietv];

  const uniqueSerieTV = [];
  const seenIds = new Set();

  combinedSerieTV.forEach((serieTV) => {
    if (!seenIds.has(serieTV.id)) {
      seenIds.add(serieTV.id);
      uniqueSerieTV.push(serieTV);
    }
  });

  const favoriteSerieTV = uniqueSerieTV.filter((movie) =>
    favoritesList.some((fav) => fav.mediaId === movie.id)
  );
  return (
    <Container fluid className="pt-4 background">
      <h1>Serie TV Preferite</h1>
      <SerieTVComponents tvShowList={favoriteSerieTV} />
    </Container>
  );
};

export default PaginatedSerieTVPreferiti;
