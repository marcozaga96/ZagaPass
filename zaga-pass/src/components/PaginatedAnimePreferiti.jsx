import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import AnimeComponets from "./AnimeComponents";

const PaginatedAnimePreferiti = () => {
  const anime = useSelector((state) => state.animes.animesList);
  const topAnime = useSelector((state) => state.animes.topAnimesList);
  const currentAnime = useSelector(
    (state) => state.animes.currentSeasonAnimesList
  );
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);

  const combinedAnime = [...anime, ...topAnime, ...currentAnime];

  const uniqueAnime = [];
  const seenIds = new Set();

  combinedAnime.forEach((anime) => {
    if (!seenIds.has(anime.mal_id)) {
      seenIds.add(anime.mal_id);
      uniqueAnime.push(anime);
    }
  });

  const favoriteAnime = uniqueAnime.filter((anime) =>
    favoritesList.some((fav) => fav.mediaId === anime.mal_id)
  );
  console.log("ciao", favoriteAnime);
  return (
    <Container fluid className="pt-4 background">
      <h1 className="text-white">Anime</h1>
      <AnimeComponets animeList={favoriteAnime} />
    </Container>
  );
};

export default PaginatedAnimePreferiti;
