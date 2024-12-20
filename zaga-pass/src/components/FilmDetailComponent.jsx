import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilmDetails } from "../action/filmactions";
import CommentSection from "./CommentSection";

const FilmDetailComponent = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.films.filmDetails);
  const state = useSelector((state) => state);
  console.log("Redux state:", state);
  const selectedTrailer = useSelector((state) => state.films.selectedTrailer);

  useEffect(() => {
    dispatch(getFilmDetails(movieId));
  }, [dispatch, movieId]);
  if (!movieDetails) {
    return (
      <div className="p-4 background">
        <Alert variant="warning">Dettagli del film non disponibili.</Alert>
      </div>
    );
  }

  console.log(movieDetails, movieId);
  return (
    <div className="p-4 background text-white">
      <Row>
        <Col md={3}>
          <Image
            src={
              movieDetails && movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : "default-placeholder-image.jpg"
            }
            fluid
          />
        </Col>
        <Col md={7}>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <p>
            <strong>Genere: </strong>
            {movieDetails.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Data di rilascio:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Durata:</strong> {movieDetails.runtime} minuti
          </p>
          <p>
            <strong>Budget:</strong> {movieDetails.budget}
          </p>
          <p>
            <strong>Popolarità:</strong> {movieDetails.popularity}
          </p>
          <p>
            <strong>Valutazione:</strong>{" "}
            {Math.round(movieDetails.vote_average)}/10
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <div>
            <h2>Trailer</h2>
            <iframe
              width="100%"
              height="500"
              src={selectedTrailer}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
          <CommentSection mediaId={movieId} mediaType="film" />
        </Col>
      </Row>
    </div>
  );
};

export default FilmDetailComponent;
