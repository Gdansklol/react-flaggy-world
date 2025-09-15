import { useState } from "react";

const Quiz = () => {
  const [quizStage, setQuizStage] = useState("start"); 
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [userScore, setUserScore] = useState(0);

  const [username, setUsername] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Europe");
  const [feedbackMsg, setFeedbackMasg] = useState("");

  const shuffleArray = (countries) => {
    let countriesCopied = [...countries];

    let countriesWithRandom =countriesCopied.map((country)=> {
      return {
        country,
        randomNumber: Math.random()
      }
    })

    countriesWithRandom.sort(
      (a,b) => a.randomNumber - b.randomNumber
    );

    let shuffledCountries = countriesWithRandom.map(
      (countryWithRandom)=>
      countryWithRandom.country);

    return shuffledCountries;
  }
  
  const handleStartQuiz = async () => {
    if (!username) {
      alert("Oops! You forgot your username.");
      return;
    }
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${selectedRegion.toLowerCase()}`
    );
    const data = await res.json();

    const randomQuestions = shuffleArray(data).slice(0, 15);

    setQuizQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setUserScore(0)
    setQuizStage("inProgress");
    } 
    catch (error) {
      console.log(error);
      alert("Oops! Faild to load countris quiz data.");
    }
  };

  const handleSubmitAnswer = () => {
    const currentCountry = quizQuestions[currentQuestionIndex];
    if (
      userAnswer.trim().toLowerCase() ===
      currentCountry.name.common.toLowerCase()
    ) {
      setUserScore(userScore + 1);
      setFeedbackMasg("correct!")
    } else {
      setFeedbackMasg(`Wrong! the correct answer was ${currentCountry.name.common}` );
    }

    setUserAnswer("");

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveResultToLocalStorage();
      setQuizStage("finished");
    }
  };

  const saveResultToLocalStorage = () => {
    const newResult = {
      username,
      region: selectedRegion,
      score: userScore,
    };

    const storedResults= JSON.parse(localStorage.getItem("quizResults")) || [];

    storedResults.push(newResult);

    localStorage.setItem("quizResults", JSON.stringify(storedResults));
  };

  return (
    <div>
      {quizStage === "start" && (
        <section>
          <h2>Start Quiz</h2>

          <h3>Select Region</h3>
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}>

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

          <button onClick={handleStartQuiz}>Start Quiz</button>
        </section>
      )}

      {quizStage === "inProgress" && (
        <div>
          <h3>
            Question {currentQuestionIndex + 1} / {quizQuestions.length}
          </h3>
          {quizQuestions[currentQuestionIndex] && (
            <>
              <img
                src={quizQuestions[currentQuestionIndex].flags.png}
                alt={quizQuestions[currentQuestionIndex].name.common}
                width="150"
              />
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <button onClick={handleSubmitAnswer}>Submit</button>

              <p>{feedbackMsg}</p>
            </>
          )}
        </div>
      )}

      {quizStage === "finished" && (
        <div>
          <h2>Quiz Finished!</h2>
          <p>{feedbackMsg}</p>
          <p>
            {username}, your score: {userScore} / {quizQuestions.length} in {""}
            {selectedRegion}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
