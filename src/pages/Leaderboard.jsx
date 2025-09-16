import {useState,useEffect} from 'react'

const Leaderboard = () => {
  const [results, setResults] = useState([]);

  useEffect(()=> {
    const savedInStorage = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(savedInStorage);
  },[]);

  const regionsGroup = {};
  results.forEach((userResult)=> {
    const regionOfStorage = userResult.region;
    if(!regionsGroup[regionOfStorage]) {
      regionsGroup[regionOfStorage] = [];
    }
      regionsGroup[regionOfStorage].push(userResult)

      console.log(regionsGroup);
  })
 
  return (
    <div>
    <h2> Leaderboard</h2>
     <h3>Users Results</h3>

    {results.length === 0 ? (
      <p>No results yet!</p>
    ) : (
      <>
      {Object.entries(regionsGroup).map(([region,users]) => (
        <section key={region}>
          <h3>{region}</h3>
      <ul>
        {users.map((userResult,index)=> (
          <li key={index}>
            {userResult.username} - 
          {userResult.score}  points in {""}
          ({userResult.region})
          </li>
        ))}
      </ul>
       </section>
    ))}
   </>
  )}
    </div>
  );
};

export default Leaderboard;