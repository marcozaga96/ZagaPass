import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import FilmComponents from "./FilmComponents";

const PaginatedFilmPreferiti = () => {
  const films = useSelector((state) => state.films.filmsList);
  const topFilms = useSelector((state) => state.films.topFilmsList);
  const currentFilms = useSelector((state) => state.films.currentFilmsList);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);

  const combinedFilms = [...films, ...topFilms, ...currentFilms];

  const uniqueFilms = [];
  const seenIds = new Set();

  combinedFilms.forEach((movie) => {
    if (!seenIds.has(movie.id)) {
      seenIds.add(movie.id);
      uniqueFilms.push(movie);
    }
  });

  const favoriteMovies = uniqueFilms.filter((movie) =>
    favoritesList.some((fav) => fav.mediaId === movie.id)
  );

  return (
    <Container fluid className="pt-4 background">
      <h1>Film Preferiti</h1>
      <FilmComponents movieList={favoriteMovies} />
    </Container>
  );
};

export default PaginatedFilmPreferiti;
