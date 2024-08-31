import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctOption: "Paris"
    },
    {
      id: 2,
      question: "What is the capital of India?",
      options: ["Berlin", "Delhi", "Paris", "Rome"],
      correctOption: "Delhi"
    },
    {
      id: 3,
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
      correctOption: "Tokyo"
    },
    {
      id: 4,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctOption: "Canberra"
    },
    {
      id: 5,
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correctOption: "Ottawa"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let interval;
    if (time > 0 && !show) {
      interval = setInterval(() => {
        setTime((tim) => tim - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShow(true);
    }
    
    return () => clearInterval(interval);
  }, [time, show]);

  const handleAnswer = (ans) => {
    if (ans.toLowerCase() === questions[currentQuestion].correctOption.toLowerCase()) {
      setScore((scr) => scr + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((cur) => cur + 1);
      setTime(10); // Reset timer for the next question
    } else {
      setShow(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShow(false);
    setTime(10);
  };

  return (
    <div className="quiz-container">
      {show ? (
        <div className="result">
          <h4>Your score: {score}</h4>
          <button className="restart-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : (
        <div className="question-section">
          <h3>{questions[currentQuestion].id}.{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            Timer: {time}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
