import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesRegion } from "../redux/countriesSlice";
import {
  incrementScore,
  nextQuestion,
  resetQuiz,
  setStage,
  setQuestions,
  setFeedback,
  setUserAnswer,
  setUsername,
  setRegion,
} from "../redux/quizSlice";
import { addResult } from "../redux/leaderboardSlice"; 
import "../css/Quiz.css";

const Quiz = () => {
  const dispatch = useDispatch();

  const {
    score,
    currentIndex,
    stage,
    questions,
    feedback,
    userAnswer,
    username,
    region,
  } = useSelector((state) => state.quiz);

  const countries = useSelector((state) => state.countries.list);
  const status = useSelector((state) => state.countries.status);

  const shuffleArray = (countries) => {
    const copied = [...countries];
    return copied
      .map((country) => ({ country, randomNumber: Math.random() }))
      .sort((a, b) => a.randomNumber - b.randomNumber)
      .map((item) => item.country);
  };

  const handleStartQuiz = () => {
    if (!username.trim()) {
      alert("Oops! You forgot your username ");
      return;
    }
    dispatch(fetchCountriesRegion(region.toLowerCase()));
    dispatch(resetQuiz());
    dispatch(setUsername(username)); 
    dispatch(setRegion(region));
    dispatch(setStage("inProgress"));
  };

  useEffect(() => {
    if (status === "success" && countries.length > 0) {
      const randomQuestions = shuffleArray(countries).slice(0, 15);
      dispatch(setQuestions(randomQuestions));
      dispatch(setFeedback(""));
    }
  }, [status, countries, dispatch]);

  const handleSubmitAnswer = () => {
    const currentCountry = questions[currentIndex];
    let finalScore = score;
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      currentCountry.name.common.toLowerCase();

    if (isCorrect) {
      finalScore = score + 1;
      dispatch(incrementScore());
      dispatch(setFeedback("Correct!"));
    } else {
      dispatch(
        setFeedback(`Wrong! the correct answer was ${currentCountry.name.common}`)
      );
    }
    dispatch(setUserAnswer(""));

    if (currentIndex + 1 < questions.length) {
      dispatch(nextQuestion());
    } else {
      dispatch(
        addResult({
          username: username.trim(),
          region,
          score: finalScore,
        })
      );
      setTimeout(() => {
        dispatch(setStage("finished"));
      }, 1500);
    }
  };

  return (
    <div className="quiz-page">
      {status === "loading" && <p>Loading quiz data...</p>}
      {status === "failed" && <p>Failed to load quiz data. Please try again.</p>}

      {stage === "start" && (
        <section className="quiz-start">
          <h2>Start Quiz</h2>
          <h3>Select Region</h3>

          <select
            className="quiz-select"
            value={region}
            onChange={(e) => dispatch(setRegion(e.target.value))}
          >
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
            <option value="Africa">Africa</option>
          </select>

          <h3>Enter Username</h3>
          <div className="input-container">
            <input
              type="text"
              className="quiz-input"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              required
            />
            <label className="quiz-label">Your name</label>
            <span className="top-line"></span>
            <span className="bottom-line"></span>
          </div>

          <button className="quiz-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </section>
      )}

      {stage === "inProgress" && (
        <div className="quiz-progress">
          <h3>
            Question {currentIndex + 1} / {questions.length}
          </h3>
          {questions[currentIndex] && (
            <>
              <img
                src={questions[currentIndex].flags.png}
                alt={questions[currentIndex].name.common}
                className="quiz-flag"
              />

              <div className="input-container">
                <input
                  type="text"
                  className="quiz-input"
                  value={userAnswer}
                  onChange={(e) => dispatch(setUserAnswer(e.target.value))}
                  required
                />
                <label className="quiz-label">Your answer</label>
                <span className="top-line"></span>
                <span className="bottom-line"></span>
              </div>

              <button className="quiz-button" onClick={handleSubmitAnswer}>
                Submit
              </button>
              <p
                className={`feedback ${
                  feedback.includes("Correct")
                    ? "correct"
                    : feedback.includes("Wrong")
                    ? "wrong"
                    : ""
                }`}
              >
                {feedback}
              </p>
            </>
          )}
        </div>
      )}

      {stage === "finished" && (
        <div className="quiz-finished">
          <h2>Quiz Finished!</h2>
          <p>
            {username} your score: {score} / {questions.length} in {region}
          </p>
          <button
            className="quiz-button"
            onClick={() => {
              dispatch(resetQuiz());
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
