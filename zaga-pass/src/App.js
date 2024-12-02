import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomLogin from "./components/CustomLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRegister from "./components/CustomRegister.jsx";
import CustomHome from "./components/CustomHome.jsx";
import AnimeComponets from "./components/AnimeComponents.jsx";
import FilmComponents from "./components/FilmComponents.jsx";
import SerieTVComponents from "./components/SerieTVComponents.jsx";
import CustomNavbar from "./components/CustomNavbar.jsx";
import { useSelector } from "react-redux";
import AnimeComponets2 from "./components/AnimeComponents2.jsx";
import FilmComponents2 from "./components/FilmComponents2.jsx";
import SerieTVComponents2 from "./components/SerieTVComponents2.jsx";
import AnimeComponets3 from "./components/AnimeComponents3.jsx";
import FilmComponents3 from "./components/FilmComponents3.jsx";
import SerieTVComponents3 from "./components/SerieTVComponents3.jsx";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/login" element={<CustomLogin />} />
        <Route path="/" element={<CustomLogin />} />
        <Route path="/register" element={<CustomRegister />} />
        <Route path="/home" element={<CustomHome />} />
        <Route
          path="/anime"
          element={
            <AnimeComponets
              animeList={useSelector((state) => state.animes.animesList)}
            />
          }
        />
        <Route
          path="/anime/season-now"
          element={
            <AnimeComponets2
              animeList={useSelector(
                (state) => state.animes.currentSeasonAnimesList
              )}
            />
          }
        />
        <Route
          path="/anime/top"
          element={
            <AnimeComponets3
              animeList={useSelector((state) => state.animes.topAnimesList)}
            />
          }
        />

        <Route
          path="/films"
          element={
            <FilmComponents
              movieList={useSelector((state) => state.films.filmsList)}
            />
          }
        />
        <Route
          path="/films/playing-now"
          element={
            <FilmComponents2
              movieList={useSelector((state) => state.films.currentFilmsList)}
            />
          }
        />
        <Route
          path="/films/top"
          element={
            <FilmComponents3
              movieList={useSelector((state) => state.films.topFilmsList)}
            />
          }
        />

        <Route
          path="/serietv"
          element={
            <SerieTVComponents
              tvShowList={useSelector((state) => state.serietv.serietvList)}
            />
          }
        />
        <Route
          path="/serietv/playing-now"
          element={
            <SerieTVComponents2
              tvShowList={useSelector(
                (state) => state.serietv.currentSerietvList
              )}
            />
          }
        />
        <Route
          path="/serietv/top"
          element={
            <SerieTVComponents3
              tvShowList={useSelector((state) => state.serietv.topSerietvList)}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
