// DOM Elements Emoji Section
const goodluckEmoji = document.getElementById("goodluck");
const thinkingEmoji = document.getElementById("thinking");
const correctEmoji = document.getElementById("correct");
const wrongEmoji = document.getElementById("wrong");
// DOM Elements HUD Section
const hudContainer = document.getElementById("hud");
const scoreBoard = document.getElementById("scoreBoard");
const clock = document.getElementById("clock");
const gameOver = document.getElementById("gameOver");
// DOM Elements Question Section
const questionContainer = document.getElementById("question-panel");
const questionEl = document.getElementById("question");
// DOM Elements Answer Section
const answerContainer = document.getElementById("answer-panel");
const answerButtons = document.getElementById("answer-buttons");
// DOM Elements Player Section
const userFormContainer = document.getElementById("user-form");
const username = document.getElementById("username");
const saveMyScore = document.getElementById("saveMyScore");
// DOM Elements High Score Section
const highscoreContainer = document.getElementById("highscores");
// DOM Elements Control Section
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const playAgainButton = document.getElementById("again-button");

// Global question shuffle elements
let questionSelector;
let currentQuestionIndex;

// Global timer elements
let timer = 30;
let interval;

// Global score elements and constraints
let questionCounter = 0;
let points = 0;
const currentScore = localStorage.getItem("currentScore");
scoreBoard.innerText = currentScore;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// Listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
// Enable submission of username
username.addEventListener("keyup", () => {
  saveMyScore.disabled = !username.value;
  recordScore();
});

// Functions
function startGame() {
  // Hide & display sections
  goodluckEmoji.classList.add("hidden");
  thinkingEmoji.classList.remove("hidden");
  hudContainer.classList.remove("hidden");
  questionContainer.classList.remove("hidden");
  answerContainer.classList.remove("hidden");
  startButton.classList.add("hidden");
  // Start timer
  setInterval(startTimer, 1000);
  startTimer();
  clock.innerHTML = timer;
  // Reset score
  points = 0;
  localStorage.setItem("currentScore", points);
  scoreBoard.innerText = "Score: " + points;
  // Select question
  questionSelector = questionArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function startTimer() {
  if (timer > 0) {
    clock.textContent = timer;
    timer--;
  } else {
    clock.textContent = timer;
    endGame();
    clearInterval(interval);
  }
}

function setNextQuestion() {
  resetQuestion();
  showQuestion(questionSelector[currentQuestionIndex]);
  questionCounter++;
}

function showQuestion(question) {
  questionEl.innerText = question.questionText;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("button");
    if (answer.isCorrect) {
      button.dataset.isCorrect = answer.isCorrect;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetQuestion() {
  clearStatusClass(document.body);
  nextButton.classList.add("hidden");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selection = e.target;
  const isCorrect = selection.dataset.isCorrect;
  setStatusClass(document.body, isCorrect);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.isCorrect);
  });
  if (questionSelector.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    endGame();
  }
  if ((selection.dataset = isCorrect)) {
    // Hide & display sections
    thinkingEmoji.classList.add("hidden");
    correctEmoji.classList.remove("hidden");
    // Adjust score reward
    points += 10;
    scoreBoard.innerText = "Score: " + points;
    localStorage.setItem("currentScore", points);
  } else if (selection.dataset != isCorrect) {
    // Hide & display sections
    thinkingEmoji.classList.add("hidden");
    wrongEmoji.classList.remove("hidden");
    // Adjust score and time penalty
    timer -= 3;
    points -= 3;
    scoreBoard.innerText = "Score: " + points;
    localStorage.setItem("currentScore", points);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  wrongEmoji.classList.add("hidden");
  correctEmoji.classList.add("hidden");
  thinkingEmoji.classList.remove("hidden");
}

function endGame() {
  clock.classList.add("hidden");
  gameOver.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  answerContainer.classList.add("hidden");
  userFormContainer.classList.remove("hidden");
  playAgainButton.classList.remove("hidden");
}

function recordScore() {
  saveHighScore = (e) => {
    console.log("clicked the save button");
    e.preventDefault();
    const score = {
      score: currentScore,
      name: username.value,
    };
    highscores.push(score);
    // Rank highscores
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    console.log(highscores);
    highscoreContainer.classList.remove("hidden");
    highScoresList.innerHTML = highscores
      .map((score) => {
        return `<li class="high-score">${score.name}: ${score.score}</li>`;
      })
      .join("");
  };
}

// Questions
const questionArray = [
  {
    questionText: "Commonly used data types DO NOT inlude:",
    answers: [
      { text: "alerts", isCorrect: true },
      { text: "booleans", isCorrect: false },
      { text: "numbers", isCorrect: false },
      { text: "strings", isCorrect: false },
    ],
  },
  {
    questionText:
      "The condition in an if/else statement is enclosed within __________",
    answers: [
      { text: "curly braces", isCorrect: false },
      { text: "parenthesis", isCorrect: true },
      { text: "quotes", isCorrect: false },
      { text: "square brackets", isCorrect: false },
    ],
  },
  {
    questionText: "Arrays in JavaScript can be used to store __________",
    answers: [
      { text: "booleans", isCorrect: false },
      { text: "numbers and strings", isCorrect: true },
      { text: "other arrays", isCorrect: false },
      { text: "all of the above", isCorrect: false },
    ],
  },
  {
    questionText:
      "String values must be enclosed within __________ when being assigned to variables.",
    answers: [
      { text: "commas", isCorrect: false },
      { text: "curly braces", isCorrect: false },
      { text: "quotes", isCorrect: true },
      { text: "parenthesis", isCorrect: false },
    ],
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the degugger is:",
    answers: [
      { text: "JavaScript", isCorrect: false },
      { text: "terminal/bash", isCorrect: false },
      { text: "for loops", isCorrect: false },
      { text: "console.log", isCorrect: true },
    ],
  },
];
