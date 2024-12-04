import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import {
  addFavoriteItem,
  removeFavoriteItem,
  fetchFavorites,
} from "../action/preferitiActions";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import AnimeComponets from "./AnimeComponents";

const PreferitiPage = () => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleFavoriteClick = (preferiti) => {
    if (favoritesList.some((item) => item.id === preferiti.id)) {
      dispatch(removeFavoriteItem(preferiti.id));
    } else {
      dispatch(addFavoriteItem(preferiti));
    }
  };

  const films = favoritesList.filter(
    (favorite) => favorite.mediaType === "film"
  );
  const seriesTV = favoritesList.filter(
    (favorite) => favorite.mediaType === "serieTV"
  );
  const anime = favoritesList.filter(
    (favorite) => favorite.mediaType === "anime"
  );

  console.log("favoritesList", favoritesList);
  console.log("Films:", films);
  console.log("Series TV:", seriesTV);
  console.log("Anime:", anime);
  return (
    <Container fluid className="pt-4">
      <h1>I Tuoi Preferiti</h1> <h2>Film</h2>
      <Row>
        {films.length > 0 ? (
          <FilmComponents movieList={films} />
        ) : (
          <p>Nessun film tra i preferiti.</p>
        )}
      </Row>
      <h2>Serie TV</h2>
      <Row>
        {seriesTV.length > 0 ? (
          <SerieTVComponents tvShowList={seriesTV} />
        ) : (
          <p>Nessuna serie TV tra i preferiti.</p>
        )}
      </Row>
      <h2>Anime</h2>
      <Row>
        {anime.length > 0 ? (
          <AnimeComponets animeList={anime} />
        ) : (
          <p>Nessun anime tra i preferiti.</p>
        )}
      </Row>
    </Container>
  );
};

export default PreferitiPage;
