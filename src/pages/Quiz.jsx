import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRegion } from "../redux/countriesSlice";
import {incrementScore, nextQuestion, resetQuiz, setStage} from "../redux/quizSlice";

const Quiz = () => {

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");

  const [username, setUsername] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Europe");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.list);
  const status = useSelector((state) => state.countries.status);

  const score = useSelector((state) => state.quiz.score);
  const currentIndex = useSelector((state) => state.quiz.currentIndex);
  const stage = useSelector((state) => state.quiz.stage);

  const shuffleArray = (countries) => {
    let copied = [...countries];
    let countriesWithRandom = copied.map((country) => ({
      country,
      randomNumber: Math.random(),
    }));
    countriesWithRandom.sort((a, b) => a.randomNumber - b.randomNumber);
    return countriesWithRandom.map((c) => c.country);
  };

  const handleStartQuiz = () => {
    if (!username.trim()) {
      alert("Oops! You forgot your username ");
      return;
    }
    dispatch(fetchCountriesRegion(selectedRegion.toLowerCase()));
    dispatch(resetQuiz());
    dispatch(setStage("inProgress"));
  };

  useEffect(() => {
    if (status === "success" && countries.length > 0) {
      const randomQuestions = shuffleArray(countries).slice(0, 15);
      setQuizQuestions(randomQuestions);
     
      setFeedbackMsg("");
    }
  }, [status, countries]);

  const handleSubmitAnswer = () => {
  const currentCountry = quizQuestions[currentIndex];
  let finalScore = score;

  const isCorrect = userAnswer.trim().toLowerCase() === currentCountry.name.common.toLowerCase();

  if (isCorrect) {
    finalScore = score + 1;
    dispatch(incrementScore());
    setFeedbackMsg("Correct!");
  } else {
    setFeedbackMsg(`Wrong! The correct answer was ${currentCountry.name.common}`);
  }

  setUserAnswer("");

  if (currentIndex + 1 < quizQuestions.length) {
    dispatch(nextQuestion());
  } else {
    saveResultToLocalStorage(finalScore);
    setTimeout(() => {
      dispatch(setStage("finished"));
    },2000);
  }
};

  const saveResultToLocalStorage = (finalScore) => {
    const newResult = { username, region: selectedRegion, score: finalScore };
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    storedResults.push(newResult);
    localStorage.setItem("quizResults", JSON.stringify(storedResults));
  };

  return (
    <div>
      {status === "loading" && <p>Loading quiz data...</p>}
      {status === "failed" && <p> Failed to load quiz data. Please try again.</p>}

      {stage === "start" && (
        <section>
          <h2>Start Quiz</h2>
          <h3>Select Region</h3>

          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
            <option value="Africa">Africa</option>
          </select>

          <h3>Enter Username</h3>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </section>
      )}

      {stage === "inProgress" && (
        <div>
          <h3>
            Question {currentIndex + 1} / {quizQuestions.length}
          </h3>
          {quizQuestions[currentIndex] && (
            <>
              <img
                src={quizQuestions[currentIndex].flags.png}
                alt={quizQuestions[currentIndex].name.common}
                width="150"
              />
              
              <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
              <button onClick={handleSubmitAnswer}>Submit</button>
              <p>{feedbackMsg}</p>
            </>
          )}
        </div>
      )}

      {stage === "finished" && (
        <div>
          <h2>Quiz Finished!</h2>
          {/* <p>{feedbackMsg}</p> */}
          <p>
            {username}, your score: {score} / {quizQuestions.length} in {selectedRegion}
          </p>
           <button onClick={() => {
              dispatch(resetQuiz());
              setQuizQuestions([]);
              dispatch(setStage("start"));
            }}
            >
              Restart Quiz 
            </button>
        </div>
      )}

     

    </div>
  );
};

export default Quiz;
