"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Lightbulb, Award, ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  points: number;
}

interface QuizConfig {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questionCount: number;
}

const defaultQuizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary cause of climate change?",
    options: [
      "Natural climate cycles",
      "Increased greenhouse gases from human activities",
      "Solar radiation changes",
      "Volcanic eruptions"
    ],
    correctAnswer: 1,
    explanation: "The primary cause of current climate change is the increased concentration of greenhouse gases in the atmosphere, primarily from burning fossil fuels.",
    hint: "Think about human activities and their impact on the atmosphere.",
    points: 50,
  },
  {
    id: 2,
    question: "Which renewable energy source is most abundant globally?",
    options: [
      "Wind energy",
      "Solar energy",
      "Hydroelectric power",
      "Geothermal energy"
    ],
    correctAnswer: 1,
    explanation: "Solar energy is the most abundant renewable energy source globally, with the potential to meet world energy demand many times over.",
    hint: "Consider which energy source is available everywhere during daytime.",
    points: 50,
  },
  {
    id: 3,
    question: "What is the carbon footprint of an average person in the United States?",
    options: [
      "2 tons CO2 per year",
      "8 tons CO2 per year",
      "16 tons CO2 per year",
      "25 tons CO2 per year"
    ],
    correctAnswer: 2,
    explanation: "The average carbon footprint for a person in the United States is approximately 16 tons CO2 per year, one of the highest in the world.",
    hint: "The US has one of the highest per capita emissions globally.",
    points: 50,
  },
  {
    id: 4,
    question: "Which of these actions would have the biggest impact on reducing your carbon footprint?",
    options: [
      "Using LED light bulbs",
      "Taking shorter showers",
      "Reducing meat consumption",
      "Using reusable bags"
    ],
    correctAnswer: 2,
    explanation: "Reducing meat consumption, particularly red meat, can have the biggest impact on your carbon footprint as livestock production accounts for about 14.5% of global greenhouse gas emissions.",
    hint: "Consider which activity affects the entire supply chain and energy consumption.",
    points: 50,
  },
  {
    id: 5,
    question: "What percentage of Earth's water is fresh water available for human use?",
    options: [
      "3%",
      "1%",
      "0.5%",
      "0.01%"
    ],
    correctAnswer: 1,
    explanation: "Only about 1% of Earth's water is fresh water available for human use, with 2.5% being fresh water and most of that locked in glaciers and ice caps.",
    hint: "Most fresh water is frozen in glaciers.",
    points: 50,
  },
  {
    id: 6,
    question: "Which gas contributes most to the greenhouse effect?",
    options: [
      "Carbon dioxide",
      "Methane",
      "Water vapor",
      "Nitrous oxide"
    ],
    correctAnswer: 2,
    explanation: "Water vapor is the most significant greenhouse gas and contributes the most to the greenhouse effect, though CO2 is the primary driver of climate change due to human activities.",
    hint: "This gas is abundant in the atmosphere and occurs naturally.",
    points: 50,
  },
  {
    id: 7,
    question: "What is the main benefit of planting trees?",
    options: [
      "They provide shade",
      "They prevent soil erosion only",
      "They absorb carbon dioxide and produce oxygen",
      "They look beautiful"
    ],
    correctAnswer: 2,
    explanation: "Trees are crucial for absorbing carbon dioxide and producing oxygen, helping to combat climate change.",
    hint: "Think about what trees do with air.",
    points: 50,
  },
];

function QuizzesContent() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(defaultQuizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [showQuizSetup, setShowQuizSetup] = useState(true);
  const [quizConfig, setQuizConfig] = useState<QuizConfig>({
    topic: "",
    difficulty: "medium",
    questionCount: 5
  });
  const [generatedTopic, setGeneratedTopic] = useState<string>("");

  const generateQuiz = async () => {
    if (!quizConfig.topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsGeneratingQuiz(true);
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: quizConfig.topic,
          difficulty: quizConfig.difficulty,
          questionCount: quizConfig.questionCount
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate quiz');
      }

      const data = await response.json();
      setQuizQuestions(data.questions);
      setGeneratedTopic(data.topic);
      setShowQuizSetup(false);
      resetQuizState();
      toast.success(`Quiz generated successfully for ${data.topic}!`);
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      toast.error(error.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const resetQuizState = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setScore(0);
    setTotalPoints(0);
    setQuizCompleted(false);
  };

  const startDefaultQuiz = () => {
    setQuizQuestions(defaultQuizQuestions);
    setGeneratedTopic("Environment");
    setShowQuizSetup(false);
    resetQuizState();
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
      return;
    }

    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setTotalPoints(totalPoints + question.points);
      toast.success(`Correct! +${question.points} points`);
    } else {
      toast.error("Incorrect answer");
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    resetQuizState();
  };

  const handleNewQuiz = () => {
    setShowQuizSetup(true);
    resetQuizState();
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Quiz Setup Screen
  if (showQuizSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
        <Header />
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-eco-green-200"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center mb-4"
                >
                  <img 
                    src="/gemini.svg" 
                    alt="Gemini AI" 
                    className="w-32 h-16 object-contain"
                  />
                </motion.div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">AI Quiz Generator</h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-2">Generate unique quizzes on any topic with GEMINI AI</p>
                <p className="text-sm text-gray-500">No quiz will ever be the same!</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic for Quiz
                  </label>
                  <input
                    type="text"
                    value={quizConfig.topic}
                    onChange={(e) => setQuizConfig({...quizConfig, topic: e.target.value})}
                    placeholder="e.g., Climate Change, Space Exploration, Ancient History"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["easy", "medium", "hard"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setQuizConfig({...quizConfig, difficulty: level})}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          quizConfig.difficulty === level
                            ? "bg-eco-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions: {quizConfig.questionCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={quizConfig.questionCount}
                    onChange={(e) => setQuizConfig({...quizConfig, questionCount: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <AuthGuard fallback={
                  <button
                    className="w-full bg-eco-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate Quiz
                  </button>
                }>
                  <button
                    onClick={generateQuiz}
                    disabled={isGeneratingQuiz || !quizConfig.topic.trim()}
                    className="w-full bg-eco-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGeneratingQuiz ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating Quiz...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Quiz
                      </>
                    )}
                  </button>
                </AuthGuard>
                <AuthGuard fallback={
                  <button
                    className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Use Default Quiz
                  </button>
                }>
                  <button
                    onClick={startDefaultQuiz}
                    className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Use Default Quiz
                  </button>
                </AuthGuard>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
        <Header />
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 text-center border border-eco-green-200"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Award className="w-24 h-24 text-eco-green-600 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
              <p className="text-xl sm:text-2xl text-eco-green-600 font-semibold mb-2">
                Score: {score} / {quizQuestions.length}
              </p>
              <p className="text-lg sm:text-xl text-gray-600 mb-2">
                Total Points Earned: <span className="font-bold text-eco-green-600">{totalPoints}</span>
              </p>
              <p className="text-base sm:text-lg text-gray-500 mb-6">
                Topic: {generatedTopic}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto bg-eco-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-eco-green-700 transition-colors"
                >
                  Take Quiz Again
                </button>
                <button
                  onClick={handleNewQuiz}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate New Quiz
                </button>
                <a
                  href="/dashboard"
                  className="w-full sm:w-auto bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors text-center"
                >
                  Go to Dashboard
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span>Score: {score} / {quizQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 h-3 rounded-full"
              />
            </div>
            {generatedTopic && (
              <div className="mt-2 text-center">
                <span className="inline-block px-3 py-1 bg-eco-green-100 text-eco-green-700 rounded-full text-sm font-medium">
                  Topic: {generatedTopic}
                </span>
              </div>
            )}
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-eco-green-200"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = showExplanation;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? showResult
                          ? isCorrect
                            ? "border-eco-green-600 bg-eco-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-eco-green-600 bg-eco-green-50"
                        : showResult && isCorrect
                        ? "border-eco-green-600 bg-eco-green-50"
                        : "border-gray-200 hover:border-eco-green-300 hover:bg-eco-green-50"
                    } ${showExplanation ? "cursor-default" : "cursor-pointer"}`}
                    whileHover={!showExplanation ? { scale: 1.02 } : {}}
                    whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{option}</span>
                      {showResult && (
                        <>
                          {isCorrect && <CheckCircle className="w-6 h-6 text-eco-green-600" />}
                          {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                        </>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && !showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Hint:</p>
                      <p className="text-yellow-700">{question.hint}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-eco-green-50 border border-eco-green-200 rounded-lg"
                >
                  <p className="font-semibold text-eco-green-800 mb-2">Explanation:</p>
                  <p className="text-eco-green-700">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-4">
              {!showExplanation && (
                <>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    <Lightbulb className="w-5 h-5" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="flex-1 bg-eco-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                </>
              )}
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-eco-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    "Finish Quiz"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Quizzes() {
  return (
    <ProtectedRoute>
      <QuizzesContent />
    </ProtectedRoute>
  );
}
