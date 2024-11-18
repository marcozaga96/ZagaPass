import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomLogin from "./components/CustomLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<CustomLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
