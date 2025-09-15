import {useState} from 'react'

const Quiz = () => {
 const [username, setUsername] = useState("");
 const [region, setRegion] = useState("Europe");

 const handleStart = () => {
  if(!username){
    alert("Oops! You forgot to enter your username!")
    return;
  }
    alert(`Quiz startd : ${username} in ${region}`)
 }

  return (
    <div>
      <section>
        <h2>Select region</h2>
        <select name="regions" id="regions" value={region}
        onChange={(e) => setRegion(e.target.value)}
        >
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
      </select>

        <h2>Enter Username</h2>
        <input 
        type="text"
        placeholder='Enter username...'
        value={username} 
        onChange={(e)=> setUsername(e.target.value)}/>

        <button onClick={handleStart}>Start Quiz</button>
      </section>
    </div>
  )
}

export default Quiz;