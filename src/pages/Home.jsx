import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1 className="home__title">Welcome to Flagg World 🌍</h1>

      <section className="home__buttons">
        <button onClick={() => navigate("/countries")}>Study countries</button>
        <button onClick={() => navigate("/collection")}>Collection</button>
        <button onClick={() => navigate("/quiz")}>Quiz</button>
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
      </section>
    </main>
  );
};

export default Home;
