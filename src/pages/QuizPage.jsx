import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum age to be eligible to vote in most democratic countries?",
    options: ["16", "18", "21", "25"],
    answer: 1
  },
  {
    id: 2,
    question: "What does EVM stand for in the context of elections?",
    options: [
      "Electronic Voting Machine",
      "Electoral Voter Module",
      "Election Validation Method",
      "Electoral Verification Machine"
    ],
    answer: 0
  },
  {
    id: 3,
    question: "Why is voting usually done secretly?",
    options: [
      "To save paper",
      "To prevent bribery and coercion",
      "To make counting faster",
      "It is an old tradition"
    ],
    answer: 1
  },
  {
    id: 4,
    question: "What is a constituency?",
    options: [
      "A type of ballot box",
      "A specific geographical area represented by a seat",
      "A political party",
      "The governing body for elections"
    ],
    answer: 1
  },
  {
    id: 5,
    question: "What should you carry to the polling booth?",
    options: [
      "Only your mobile phone",
      "A valid photo ID and voter slip",
      "Your birth certificate",
      "Nothing is required"
    ],
    answer: 1
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (optionIndex) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    setSelectedOption(optionIndex);
    const correct = optionIndex === quizQuestions[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    // Auto move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Election Knowledge Quiz</h1>
        <p className="text-lg text-slate-600">Test what you've learned about the democratic process.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
        {showScore ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
            <p className="text-xl text-slate-600 mb-8">
              You scored <span className="font-bold text-primary-600">{score}</span> out of {quizQuestions.length}
            </p>
            
            <p className="text-lg font-medium text-slate-800 mb-8">
              {score === quizQuestions.length ? "Perfect! You're an election expert! 🌟" : 
               score >= quizQuestions.length / 2 ? "Great job! You know your stuff! 👍" : 
               "Good try! Check out the guide to learn more. 📚"}
            </p>

            <button 
              onClick={restartQuiz}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="bg-primary-50 text-primary-700 font-semibold px-3 py-1 rounded-full text-sm">
                Score: {score}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                let buttonStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300";
                
                if (selectedOption !== null) {
                  if (index === quizQuestions[currentQuestion].answer) {
                    buttonStyle = "bg-green-50 border-green-500 text-green-800"; // Correct answer highlights green
                  } else if (index === selectedOption) {
                    buttonStyle = "bg-red-50 border-red-500 text-red-800"; // Wrong answer highlights red
                  } else {
                    buttonStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${buttonStyle}`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {selectedOption !== null && index === quizQuestions[currentQuestion].answer && (
                      <CheckCircle className="text-green-600 shrink-0" />
                    )}
                    {selectedOption === index && index !== quizQuestions[currentQuestion].answer && (
                      <XCircle className="text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
