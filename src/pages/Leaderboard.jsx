import {useState,useEffect} from 'react'

const Leaderboard = () => {
  const [results, setResults] = useState([]);

  useEffect(()=> {
    const savedInStorage = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(savedInStorage);
  },[])

  return (
    <div>
    <h2> Leaderboard</h2>
     <h3>Users Results</h3>
    {results.lenght === 0 ? (
      <p>No results yet!</p>
    ) : (
      <ul>
        {results.map((userResult,index)=> (
          <li key={index}>{userResult.username} - 
          {userResult.score}  points in {""}
          ({userResult.region})
          </li>
        ) )}
      </ul>
    )}
   
    </div>
  )
}

export default Leaderboard;