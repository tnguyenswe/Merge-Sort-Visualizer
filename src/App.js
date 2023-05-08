import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
