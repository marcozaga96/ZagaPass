import React from "react";
import CommentSection from "./CommentSection";

const SerieTVDetail = ({ serieTV }) => {
  return (
    <div>
      <h1>{serieTV.title}</h1>
      <p>{serieTV.description}</p>
      <iframe
        src={serieTV.trailerUrl}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <CommentSection mediaId={serieTV.id} mediaType="serieTV" />
    </div>
  );
};

export default SerieTVDetail;
