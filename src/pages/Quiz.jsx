import { useState } from "react";

const Quiz = () => {
  const [quizStage, setQuizStage] = useState("start"); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("Europe");

  const shuffleArray = (countries) => {
    let countriesCopied = [...countries];

    let countriesWithRandom =countriesCopied.map((country)=> {
      return {
        country,
        randomCountryNumber: Math.random()
      }
    })

    countriesWithRandom.sort(
      (a,b) => a.randomCountryNumber - b.randomCountryNumber
    );

    let shuffledCountries = countriesWithRandom.map((countriesWithRandom)=>countriesWithRandom .country);

    return shuffledCountries;

  }
  



  const handleStartClick = async () => {
    if (!username) {
      alert("Oops! You forgot your username.");
      return;
    }
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region.toLowerCase()}`
    );
    const data = await res.json();
    const shuffledQuestions = shuffleArray(data);
    setQuestions(shuffledQuestions);
    setQuizStage("inProgress");
    } 
    catch (error) {
      console.log(error);
      alert("Oops! Faild to load countris quiz data.");
    }
  };

  const handleSubmit = () => {
    const currentCountry = questions[currentQuestionIndex];
    if (
      userAnswer.trim().toLowerCase() ===
      currentCountry.name.common.toLowerCase()
    ) {
      setScore(score + 1);
      alert(" Correct!");
    } else {
      alert(` Wrong! It was ${currentCountry.name.common}`);
    }

    setUserAnswer("");

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizStage("finished");
    }
  };

  return (
    <div>
      {quizStage === "start" && (
        <section>
          <h2>Start Quiz</h2>

          <h3>Select Region</h3>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
            <option value="Africa">Africa</option>
          </select>

          <h3>Enter Username</h3>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button onClick={handleStartClick}>Start Quiz</button>
        </section>
      )}

      {quizStage === "inProgress" && (
        <div>
          <h3>
            Question {currentQuestionIndex + 1} / {questions.length}
          </h3>
          {questions[currentQuestionIndex] && (
            <>
              <img
                src={questions[currentQuestionIndex].flags.png}
                alt={questions[currentQuestionIndex].name.common}
                width="150"
              />
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          )}
        </div>
      )}

      {quizStage === "finished" && (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            {username}, your score: {score} / {questions.length} in {region}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
