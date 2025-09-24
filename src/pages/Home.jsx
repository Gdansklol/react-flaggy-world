import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1 className="home__title">Welcome to</h1>

      <div className="banner">
        <div className="title">
          <svg
            width="800"
            height="200"
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="textGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#e74c3c">
                  <animate
                    attributeName="stop-color"
                    values="#e74c3c;#f39c12;#27ae60;#2980b9;#8e44ad;#e74c3c"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#8e44ad">
                  <animate
                    attributeName="stop-color"
                    values="#8e44ad;#2980b9;#27ae60;#f39c12;#e74c3c;#8e44ad"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="url(#textGradient)"
              fontSize="80"
              fontFamily="cursive"
            >
              Flag World 🌐
            </text>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              fontSize="80"
              fontFamily="cursive"
              className="draw-text"
            >
              Flag World 🌐
            </text>
          </svg>
        </div>
      </div>

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
