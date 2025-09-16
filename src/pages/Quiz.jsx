import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCountriesRegion} from "../redux/countriesSlice";

const Quiz = () => {
  const [quizStage, setQuizStage] = useState("start");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [userScore, setUserScore] = useState(0);

  const [username, setUsername] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Europe");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state)=> state.countries.list);
  const status = useSelector((state)=> state.countries.status);
  const error = useSelector((state)=> state.countries.error);

  const shuffleArray = (countries) => {
    let copied = [...countries];

    let countriesWithRandom = copied.map((country) => ({
      country,
      randomNumber: Math.random(),
    }));

    countriesWithRandom.sort((a, b) => a.randomNumber - b.randomNumber);

    let shuffled = countriesWithRandom.map(
      (countryWithRandom) => countryWithRandom.country
    );

    return shuffled;
  };

  const handleStartQuiz = async () => {
    if (!username.trim()) {
      alert("Oops! You forgot your username ");
      return;
    }
    
      dispatch(fetchCountriesRegion(selectedRegion.toLowerCase()))
      setQuizStage("inProgress");
   
  };

  useEffect(()=> {
    if(status === "success" && countries.length > 0) {
      const randomQuestions = shuffleArray(countries).slice(0, 15);
      setQuizQuestions(randomQuestions);
       setCurrentQuestionIndex(0);
      setUserScore(0);
      setFeedbackMsg("");
    }
  },[status, countries]);

  const handleSubmitAnswer = () => {
    const currentCountry = quizQuestions[currentQuestionIndex];
    let newScore = userScore;

    if (
      userAnswer.trim().toLowerCase() ===
      currentCountry.name.common.toLowerCase()
    ) {
      newScore = userScore + 1;
      setUserScore(newScore);
      setFeedbackMsg(" Correct!");
    } else {
      setFeedbackMsg(
        ` Wrong! The correct answer was ${currentCountry.name.common}`
      );
    }

    setUserAnswer("");

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveResultToLocalStorage(newScore); 
      setQuizStage("finished");
    }
  };

  const saveResultToLocalStorage = (finalScore) => {
    const newResult = {
      username,
      region: selectedRegion,
      score: finalScore,
    };

    const storedResults =
      JSON.parse(localStorage.getItem("quizResults")) || [];

    storedResults.push(newResult);

    localStorage.setItem("quizResults", JSON.stringify(storedResults));
  };

  return (
    <div>
      {status === "loading" && <p>Loading quiz data...</p>}
      {status === "failed" && <p> Failed to load quiz data. Please try again.</p>}

      {quizStage === "start" && (
        <section>
          <h2>Start Quiz</h2>

          <h3>Select Region</h3>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
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
         
          <p>
            {username}, your score: {userScore} / {quizQuestions.length} in{" "}
            {selectedRegion}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
