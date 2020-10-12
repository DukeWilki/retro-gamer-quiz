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
// DOM Cause of Death Array
const death = document.getElementById("death");
const causeOfDeath = document.getElementById("causeOfDeath");

// Global question shuffle elements
let questionSelector;
let currentQuestionIndex;

// Global timer elements
let timer = 45;
let interval;
let spaceInvaderIntervalId;

// Global score elements and constraints
let questionCounter = 0;
let points = 0;
let currentScore = localStorage.getItem("currentScore");
scoreBoard.innerText = currentScore;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// Decide cause of death
const killers = ["measles", "snakebite", "exhaustion", "typhoid", "cholera", "dysentery", "drowning", "accidental gunshot", "a broken arm", "a broken Leg", "fever", "diphtheria"];
let killer = killers[Math.floor(Math.random() * killers.length)];
causeOfDeath.innerHTML = killer;

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

// Background animation
// Set staring image
function setBodyBackgroundImg(img){
  document.querySelector("body").style = 'background-image: url("' + img + '")'
}
setBodyBackgroundImg('./assets/spacies0.jpg');
// Start animation
function animateSpaceInvader(){
  let img1 = './assets/spacies1.jpg';
  let img2 = './assets/spacies2.jpg';
  let currentBackground = img1;
  spaceInvaderIntervalId = setInterval(() => {
    // swap the image
    if(currentBackground === img1){
      setBodyBackgroundImg(img2)
      currentBackground = img2
    }else{
      setBodyBackgroundImg(img1);
      currentBackground = img1;
    }
    // every half second
  }, 500);
}

// Functions
function startGame() {
  // Hide & display sections
  goodluckEmoji.classList.add("hidden");
  thinkingEmoji.classList.remove("hidden");
  hudContainer.classList.remove("hidden");
  questionContainer.classList.remove("hidden");
  answerContainer.classList.remove("hidden");
  startButton.classList.add("hidden");
  animateSpaceInvader();
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

// Time watcher
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
  Array.from(answerButtons.children).forEach((button) => {
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

function clearStatusClass(element) {
  wrongEmoji.classList.add("hidden");
  correctEmoji.classList.add("hidden");
  thinkingEmoji.classList.remove("hidden");
}

function endGame() {
  clock.classList.add("hidden");
  nextButton.classList.add("hidden");
  emojis.classList.add("hidden");
  death.classList.remove("hidden");
  gameOver.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  answerContainer.classList.add("hidden");
  userFormContainer.classList.remove("hidden");
  playAgainButton.classList.remove("hidden");
  clearInterval(spaceInvaderIntervalId);
}

function recordScore() {
  saveHighScore = (e) => {
    e.preventDefault();
    currentScore = localStorage.getItem("currentScore");
    const score = {
      score: currentScore,
      name: username.value,
    };
    highscores.push(score);
    // Rank highscores
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    highscoreContainer.classList.remove("hidden");
    highScoresList.innerHTML = highscores
      .map((score) => {
        return `<li class="high-score">${score.name}: ${score.score}</li>`;
      })
      .join("");
  };
}


function spaceInvaders() {
  var curImgId = 0;
  var numberOfImages = 2; // Change this to the number of background images
  window.setInterval(function() {
      $('body').css('background-image','url(/assets/species' + curImgId + '.jpg)');
      curImgId = (curImgId + 1) % numberOfImages;
  }, 15 * 1000);
};

// Questions
const questionArray = [
  {
    questionText: "In the original Donkey Kong game, what is the playable charachter called?",
    answers: [
      { text: "Luigi", isCorrect: false },
      { text: "Donkey Kong", isCorrect: false },
      { text: "Jumpman", isCorrect: true },
      { text: "Toad", isCorrect: false },
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
    questionText: "In WarGames, the world is saved by making the computer play itself in what game? ",
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
    questionText: "The voice actor of Sonic the Hedgehog also played what TV charachter?",
    answers: [
      { text: "Elmo", isCorrect: false },
      { text: "The Joker (Batman Animated)", isCorrect: false },
      { text: "Bart Simpson", isCorrect: false },
      { text: "Steve Urkel", isCorrect: true },
    ],
  },
  {
    questionText: "In Pokemon, what does Onix evolve into?",
    answers: [
      { text: "Coalix", isCorrect: false },
      { text: "Steelix", isCorrect: true },
      { text: "Alumix", isCorrect: false },
      { text: "Stonix", isCorrect: false },
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
    questionText: "In the Japanese release, what is Street Fighter's Spanish charachter?",
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
  {
    questionText: "'Where in ___ is Carmen Sandiego' is not a real video game?",
    answers: [
      { text: "North Daktota", isCorrect: false },
      { text: "the U.S.A.", isCorrect: false },
      { text: "the U.S.S.R.", isCorrect: true },
      { text: "Space", isCorrect: false },
    ],
  },
  {
    questionText: "What was the first video game played in space?",
    answers: [
      { text: "Tetris", isCorrect: true },
      { text: "Pong", isCorrect: false },
      { text: "Donkey Kong", isCorrect: false },
      { text: "Pokemon", isCorrect: false },
    ],
  },
  {
    questionText: "Canteloupe, hair tonic and toasters are traded commodities in which game?",
    answers: [
      { text: "Airline Tycoon Deluxe", isCorrect: false },
      { text: "Turmoil", isCorrect: false },
      { text: "Lemonaide Stand", isCorrect: false },
      { text: "Gazillionaire Deluxe", isCorrect: true },
    ],
  },
  {
    questionText: "Charachters of 'The Sims' speak which language?",
    answers: [
      { text: "Simplish", isCorrect: false },
      { text: "Singlish", isCorrect: false },
      { text: "Gibberish", isCorrect: false },
      { text: "Simlish", isCorrect: true },
    ],
  },
  {
    questionText: "Which famous video game character was originally called Laura Cruz?",
    answers: [
      { text: "Sonya Blade", isCorrect: false },
      { text: "Tifa Lockhart", isCorrect: false },
      { text: "Jill Valentine", isCorrect: false },
      { text: "Lara Croft", isCorrect: true },
    ],
  },
  {
    questionText: "Waht is the world record for blowing cartrages (in 20 seconds)?",
    answers: [
      { text: "43 cartrages", isCorrect: true },
      { text: "38 cartrages", isCorrect: false },
      { text: "208 cartrages", isCorrect: false },
      { text: "978 cartrages", isCorrect: false },
    ],
  },
  {
    questionText: "Chex Quest was the first video game to included free with what?",
    answers: [
      { text: "Volvo Cars", isCorrect: false },
      { text: "Breakfast Cereal", isCorrect: true },
      { text: "Laptops", isCorrect: false },
      { text: "Encylopedias", isCorrect: false },
    ]
  },
  {
    questionText: "What was the first video game to become a live action movie?",
    answers: [
      { text: "Double Dragon", isCorrect: false },
      { text: "Super Mario Bros", isCorrect: true },
      { text: "Street Fighter", isCorrect: false },
      { text: "Shinobi", isCorrect: false },
    ],
  },
];
