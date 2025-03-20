import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Quizzes.css";
import Goals from "./Goals";

const dummyQuestions = [
  {
    _id: "q1",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    _id: "q2",
    question: "Which is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Jupiter",
  },
  {
    _id: "q3",
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo", "Nikola Tesla"],
    correct: "Albert Einstein",
  },
];

const Quizzes = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState(dummyQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    let storedNickname = localStorage.getItem("nickname");
    let storedEmail = localStorage.getItem("email");

    if (!storedNickname || !storedEmail) {
      let userNickname = prompt("Enter your nickname:");
      let userEmail = prompt("Enter your email:");

      if (userNickname && userEmail) {
        localStorage.setItem("nickname", userNickname);
        localStorage.setItem("email", userEmail);
        setNickname(userNickname);
        setEmail(userEmail);
      }
    } else {
      setNickname(storedNickname);
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/quiz/leaderboard")
      .then((res) => {
        setLeaderboard(res.data.slice(0, 10)); // Top 10 names
      })
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  const handleStartQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      if (response.data.length > 0) {
        setQuestions(response.data);
      }
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuizStarted(true);
    }
  };

  const handleOptionClick = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = async () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q._id] === q.correct) {
        calculatedScore += 10;
      }
    });

    setScore(calculatedScore);

    try {
      await axios.post("http://localhost:5000/api/submit", {
        nickname,
        email,
        score: calculatedScore,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="quizzes-container">
     <div className="leaderboard-section">
  <h2 className="leaderboard-title">Leaderboard</h2>
  <ul className="leaderboard-list">
    {leaderboard
      .sort((a, b) => b.highestScore - a.highestScore) // Highest Score wale top pe aaye
      .slice(0, 5) // Sirf top 5 players
      .map((player, index) => (
        <li key={index} className="leaderboard-item">
          {index + 1}. {player.nickname} - {player.highestScore}
        </li>
      ))}
  </ul>
</div>


      <div className="quiz-content">
        {!quizStarted ? (
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome, {nickname}!</h2>
            {/* <p className="welcome-email">Email: {email}</p> */}
            <button className="start-quiz-button" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        ) : quizCompleted ? (
          <div className="result-section">
            <h2 className="result-title">Quiz Completed!</h2>
            <button className="submit-button" onClick={handleSubmitQuiz}>
              Submit Quiz
            </button>
            {score !== null && (
              <>
                <p className="score-text">Your Score: {score}</p>
                <button className="leaderboard-button" onClick={() => navigate("/leaderboard")}>
                  {/* View Leaderboard */}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="quiz-section">
            <h2 className="quiz-title">Quiz</h2>
            <div className="question-container">
              <p className="question-text">{questions[currentQuestionIndex].question}</p>
              <div className="options-container">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(questions[currentQuestionIndex]._id, option)}
                    className={`option-button ${
                      selectedAnswers[questions[currentQuestionIndex]._id] === option
                        ? "selected"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="goals-wrapper">
        <Goals />
      </div>
    </div>


  );
};



export default Quizzes;
