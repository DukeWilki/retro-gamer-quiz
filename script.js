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
    questionText: "In the original Donkey Kong game, Jumpman soon became known as what?",
    answers: [
      { text: "Luigi", isCorrect: false },
      { text: "Toad", isCorrect: false },
      { text: "Mario", isCorrect: true },
      { text: "Peach", isCorrect: false },
    ],
  },
  {
    questionText: "In Tekken, what species is Roger?",
    answers: [
      { text: "Dinosaur", isCorrect: false },
      { text: "Human", isCorrect: false },
      { text: "Ent", isCorrect: false },
      { text: "Kangaroo", isCorrect: true },
    ],
  },
  {
    questionText: "In WarGames, the fate of the world is solved by making the computer play itself in what game? ",
    answers: [
      { text: "Chess", isCorrect: false },
      { text: "Checkers", isCorrect: false },
      { text: "Tic Tac Toe", isCorrect: true },
      { text: "Paper Scissors Rock", isCorrect: false },
    ],
  },
  {
    questionText: "The Sega Genesis was marketed as what outside of North America?",
    answers: [
      { text: "Sega Mega Drive", isCorrect: true },
      { text: "Sega Master System", isCorrect: false },
      { text: "Sega Saturn", isCorrect: false },
      { text: "Sega Genesis", isCorrect: false },
    ],
  },
  {
    questionText: "What was the first gaming console to be used with a television set?",
    answers: [
      { text: "Atari 2600", isCorrect: false },
      { text: "Magnavox Odyssey", isCorrect: true },
      { text: "Coleco Telstar", isCorrect: false },
      { text: "Mettel Intellivision", isCorrect: false },
    ],
  },
  {
    questionText: "What was the first video game to save your high score?",
    answers: [
      { text: "Pong", isCorrect: false },
      { text: "Space Invaders", isCorrect: true },
      { text: "Donkey kong", isCorrect: false },
      { text: "Pac Man", isCorrect: false },
    ],
  },
  {
    questionText: "In Pac Man, what colour do the ghosts turn when they become edible?",
    answers: [
      { text: "Blue", isCorrect: true },
      { text: "Pink", isCorrect: false },
      { text: "Yellow", isCorrect: false },
      { text: "Violet", isCorrect: false },
    ],
  },
  {
    questionText: "The actor of Steve Urkel also played what video game charachter in a 1990's cartoon series?",
    answers: [
      { text: "Eartworm Jim", isCorrect: false },
      { text: "Zelda", isCorrect: false },
      { text: "Carmen Sandiego", isCorrect: false },
      { text: "Sonic the Hedgehog", isCorrect: true },
    ],
  },
  {
    questionText: "What game was included free on Windows 3.1?",
    answers: [
      { text: "Minecraft", isCorrect: false },
      { text: "Lemmings", isCorrect: false },
      { text: "Lemonaide Stand", isCorrect: false },
      { text: "Minesweeper", isCorrect: true },
    ],
  },
  {
    questionText: "In the Japanese release of Street Fighter, what was the name of the charachter that comes from Spain?",
    answers: [
      { text: "Balrog", isCorrect: true },
      { text: "Vega", isCorrect: false },
      { text: "Blanka", isCorrect: false },
      { text: "M. Bison", isCorrect: false },
    ],
  },
  {
    questionText: "What gives Sonic the Hedgehog his 'Super Sonic' powers?",
    answers: [
      { text: "Rings", isCorrect: false },
      { text: "Gems", isCorrect: false },
      { text: "Emeralds", isCorrect: true },
      { text: "Coins", isCorrect: false },
    ],
  },
];
