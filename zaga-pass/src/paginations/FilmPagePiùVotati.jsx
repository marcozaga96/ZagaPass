import React from "react";
import PaginatedFilmPiùVotati from "../components/PaginatedFIlmPiùVotati";

const FilmPagePiùVotati = () => {
  return (
    <div className="p-4 background">
      <h2 className="text-white">Film</h2>
      <PaginatedFilmPiùVotati />
    </div>
  );
};

export default FilmPagePiùVotati;
