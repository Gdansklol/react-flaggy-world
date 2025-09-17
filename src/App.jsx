import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import Collection from "./pages/Collection";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryName" element={<CountryDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
