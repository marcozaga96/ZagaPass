import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSerieTVDetails } from "../action/serietvActions";
import CommentSection from "./CommentSection";

const SerieTVDetailComponent = () => {
  const { serietvId } = useParams();
  const dispatch = useDispatch();
  const serieTVDetails = useSelector((state) => state.serietv.serieTVDetails);
  const state = useSelector((state) => state);
  console.log("Redux state:", state);
  const selectedTrailer = useSelector((state) => state.serietv.selectedTrailer);

  useEffect(() => {
    dispatch(getSerieTVDetails(serietvId));
  }, [dispatch, serietvId]);
  if (!serieTVDetails) {
    return (
      <div className="p-4 background">
        <Alert variant="warning">Dettagli delle serieTV non disponibili.</Alert>
      </div>
    );
  }

  console.log(serieTVDetails, serietvId);
  return (
    <div className="p-4 background">
      <Row>
        <Col md={4}>
          <Image
            src={
              serieTVDetails && serieTVDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${serieTVDetails.poster_path}`
                : "default-placeholder-image.jpg"
            }
            fluid
          />
        </Col>
        <Col md={8}>
          <h1>{serieTVDetails.name}</h1>
          <p>{serieTVDetails.overview}</p>
          <p>
            <strong>Data di rilascio:</strong> {serieTVDetails.release_date}
          </p>
          <p>
            <strong>Valutazione:</strong> {serieTVDetails.vote_average}/10
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <div>
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
          <CommentSection mediaId={serietvId} mediaType="serieTV" />
        </Col>
      </Row>
    </div>
  );
};

export default SerieTVDetailComponent;
