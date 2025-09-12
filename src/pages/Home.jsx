import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Welcome to React Flaggy World 🌍</h1>

       <section>
        <button onClick={()=> navigate("/countries")}>Study countries</button>
        <button onClick={()=> navigate("/collection")}>Collection</button>
        <button onClick={()=> navigate("/quiz")}>Quiz</button>
        <button onClick={()=> navigate("/leaderboard")}>Leaderboard</button>
       </section>

    </main>

   
  )
}

export default Home;