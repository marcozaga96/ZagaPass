import React from "react";
import PaginatedFilmPreferiti from "../components/PaginatedFilmPreferiti";
import PaginatedSerieTVPreferiti from "../components/PaginatedSerieTVPreferiti";
import PaginatedAnimePreferiti from "../components/PaginatedAnimePreferiti";

const PreferitiPage = () => {
  return (
    <div className="p-4 background">
      <h1>Pagina dei Preferiti</h1>
      <PaginatedFilmPreferiti />
      <PaginatedSerieTVPreferiti />
      <PaginatedAnimePreferiti />
    </div>
  );
};

export default PreferitiPage;
