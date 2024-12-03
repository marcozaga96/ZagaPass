import React from "react";
import CommentSection from "./CommentSection";

const AnimeDetail = ({ anime }) => {
  return (
    <div>
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>
      <iframe
        src={anime.trailerUrl}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <CommentSection mediaId={anime.malId} mediaType="anime" />
    </div>
  );
};

export default AnimeDetail;
