import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomLogin from "./components/CustomLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRegister from "./components/CustomRegister.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<CustomLogin />} />
        <Route path="/register" element={<CustomRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
