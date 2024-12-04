import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CustomLogin from "./components/CustomLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRegister from "./components/CustomRegister.jsx";
import CustomHome from "./components/CustomHome.jsx";
import CustomNavbar from "./components/CustomNavbar.jsx";
import AnimePage from "./paginations/AnimePage.jsx";
import AnimePageUltimeUscite from "./paginations/AnimaPageUltimeUscite.jsx";
import AnimePagePiùVotati from "./paginations/AnimaPagePiùVotati.jsx";
import FilmPage from "./paginations/FilmPage.jsx";
import FilmPagePiùVotati from "./paginations/FilmPagePiùVotati.jsx";
import FilmPageUltimeUscite from "./paginations/FilmPageUltimeUscite.jsx";
import SerieTVPage from "./paginations/SerieTVPage.jsx";
import SerieTVPagePiùVotati from "./paginations/SerieTVPagePiùVotati.jsx";
import SerieTVPageUltimeUscite from "./paginations/SerieTVPageUltimeUscite.jsx";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/login" element={<CustomLogin />} />
        <Route path="/" element={<CustomLogin />} />
        <Route path="/register" element={<CustomRegister />} />
        <Route path="/home" element={<CustomHome />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/anime/playing-now" element={<AnimePageUltimeUscite />} />
        <Route path="/anime/top" element={<AnimePagePiùVotati />} />
        <Route path="/films" element={<FilmPage />} />
        <Route path="/films/playing-now" element={<FilmPageUltimeUscite />} />
        <Route path="/films/top" element={<FilmPagePiùVotati />} />
        <Route path="/serietv" element={<SerieTVPage />} />
        <Route
          path="/serietv/playing-now"
          element={<SerieTVPageUltimeUscite />}
        />
        <Route path="/serietv/top" element={<SerieTVPagePiùVotati />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
