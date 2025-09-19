import { useDispatch, useSelector } from "react-redux";
import { deleteResult, setSortOrder } from "../redux/leaderboardSlice";
import "../css/Leaderboard.css";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const { results, sortOrder } = useSelector((state) => state.leaderboard);

  const groupByRegion = (allResultsFromLocalStorage) => {
    const groupedResultsByRegion = {}; 

    allResultsFromLocalStorage.forEach((oneUserResult) => {
      const userRegion = oneUserResult.region;

      if (!groupedResultsByRegion[userRegion]) {
        groupedResultsByRegion[userRegion] = [];
      }

      groupedResultsByRegion[userRegion].push(oneUserResult);
    });

    return groupedResultsByRegion;
  };

  const groupedResults = groupByRegion(results);

  Object.keys(groupedResults).forEach((region) => {
    groupedResults[region].sort((a, b) =>
      sortOrder === "asc" ? a.score - b.score : b.score - a.score
    );
  });

  const handleDelete = (username, region) => {
    dispatch(deleteResult({ username, region }));
  };

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>

      <div className="sort-controls">
        <button
          className={sortOrder === "desc" ? "active" : ""}
          onClick={() => dispatch(setSortOrder("desc"))} 
        >
          🔝 High → Low
        </button>
        <button
          className={sortOrder === "asc" ? "active" : ""}
          onClick={() => dispatch(setSortOrder("asc"))} 
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
                      <span className="name">
                        {res.username || "Anonymous"}
                      </span>
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
