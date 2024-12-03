import React from "react";
import CommentSection from "./CommentSection";

const FilmDetail = ({ film }) => {
  return (
    <div>
      <h1>{film.title}</h1>
      <p>{film.description}</p>
      <iframe
        src={film.trailerUrl}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <CommentSection mediaId={film.id} mediaType="film" />
    </div>
  );
};

export default FilmDetail;
