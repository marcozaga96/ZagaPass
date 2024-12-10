import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../action/animeActions";
import CommentSection from "./CommentSection";
import { Alert, Col, Image, Row } from "react-bootstrap";

const AnimeDetailComponent = () => {
  const dispatch = useDispatch();
  const { mal_id } = useParams();

  const animeDetails = useSelector((state) => state.animes.animeDetails);

  useEffect(() => {
    dispatch(getAnimeDetails(mal_id));
  }, [dispatch, mal_id]);
  console.log(mal_id);

  if (!animeDetails) {
    return (
      <div className="p-4 background">
        <Alert variant="warning">Dettagli dell'anime non disponibili.</Alert>
      </div>
    );
  }
  return (
    <div className="p-4 background">
      <Row>
        <Col md={4}>
          <Image
            src={animeDetails.images?.jpg.large_image_url}
            alt={animeDetails.title}
            fluid
          />
        </Col>
        <Col md={8}>
          <h1>{animeDetails.title}</h1>
          <p>{animeDetails.synopsis}</p>
          <p>
            Genres: {animeDetails.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p>Score: {animeDetails.score}</p>
          <p>Episodes: {animeDetails.episodes}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <h2>Trailer</h2>
          <iframe
            width="100%"
            height="500"
            src={animeDetails.trailer?.embed_url}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
          <CommentSection mediaId={animeDetails.mal_id} mediaType="anime" />
        </Col>
      </Row>
    </div>
  );
};

export default AnimeDetailComponent;
