import { useEffect, useState } from "react";
import "../css/Leaderboard.css";

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); 

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(storedResults);
  }, []);

  const groupByRegion = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.region]) acc[item.region] = [];
      acc[item.region].push(item);
      return acc;
    }, {});
  };

  const groupedResults = groupByRegion(results);
  Object.keys(groupedResults).forEach((region) => {
    groupedResults[region].sort((a, b) =>
      sortOrder === "asc" ? a.score - b.score : b.score - a.score
    );
  });

  const handleDelete = (username, region) => {
    const updated = results.filter(
      (r) => !(r.username === username && r.region === region)
    );
    setResults(updated);
    localStorage.setItem("quizResults", JSON.stringify(updated));
  };

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>

      <div className="sort-controls">
        <button
          className={sortOrder === "desc" ? "active" : ""}
          onClick={() => setSortOrder("desc")}
        >
          🔝 High → Low
        </button>
        <button
          className={sortOrder === "asc" ? "active" : ""}
          onClick={() => setSortOrder("asc")}
        >
          🔽 Low → High
        </button>
      </div>

      <div className="leaderboard-container">
        {Object.keys(groupedResults).length > 0 ? (
          Object.keys(groupedResults).map((region) => (
            <div key={region} className="region-board">
              <h3>{region}</h3>
              <ul className="leaderboard-list">
                {groupedResults[region].map((res, index) => (
                  <li key={index} className="leaderboard-item">
                    <div className="left">
                      <span className="rank">#{index + 1}</span>
                      <span className="name">{res.username || "Anonymous"}</span>
                    </div>
                    <div className="right">
                      <span className="score">{res.score} points</span>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(res.username, res.region)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
