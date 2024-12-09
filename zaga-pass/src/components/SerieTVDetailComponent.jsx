import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSerieTVDetails } from "../action/serietvActions";
import CommentSection from "./CommentSection";

const SerieTVDetailComponent = () => {
  const { serietvId } = useParams();
  const dispatch = useDispatch();
  const serieTV = useSelector((state) => state.serietv.serieTVDetails);
  const state = useSelector((state) => state);
  console.log("Redux state:", state);
  const selectedTrailer = useSelector((state) => state.serietv.selectedTrailer);

  useEffect(() => {
    dispatch(getSerieTVDetails(serietvId));
  }, [dispatch, serietvId]);

  console.log(serieTV, serietvId);
  return (
    <div className="p-4 background">
      <Row>
        <Col md={4}>
          <Image
            src={
              serieTV && serieTV.poster_path
                ? `https://image.tmdb.org/t/p/w500${serieTV.poster_path}`
                : "default-placeholder-image.jpg"
            }
            fluid
          />
        </Col>
        <Col md={8}>
          <h1>{serieTV.name}</h1>
          <p>{serieTV.overview}</p>
          <p>
            <strong>Data di rilascio:</strong> {serieTV.release_date}
          </p>
          <p>
            <strong>Valutazione:</strong> {serieTV.vote_average}/10
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
