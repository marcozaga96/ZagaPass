import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomLogin from "./components/CustomLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRegister from "./components/CustomRegister.jsx";
import CustomHome from "./components/CustomHome.jsx";
import AnimeComponets from "./components/AnimeComponents.jsx";
import FilmComponents from "./components/FilmComponents.jsx";
import SerieTVComponents from "./components/SerieTVComponents.jsx";
import CustomNavbar from "./components/CustomNavbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/login" element={<CustomLogin />} />
        <Route path="/register" element={<CustomRegister />} />
        <Route path="/home" element={<CustomHome />} />
        <Route path="/anime" element={<AnimeComponets />} />
        <Route path="/films" element={<FilmComponents />} />
        <Route path="/serietv" element={<SerieTVComponents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
