var timeLeft = 60;
var score = 0;
var index = 0;
var highScores = JSON.parse(localStorage.getItem("High Scores"));

var startScreen = document.querySelector(".start-screen");
var timerEl = document.querySelector("#timer");
var quiz = document.querySelector(".question-block");
var scorebox = document.querySelector(".scorebox");
var initials = document.querySelector("#initials");
var addScore = document.querySelector("#addScore");
var scoreBoard = document.querySelector(".scoreboard");
var scores = document.querySelector("#scoreboard");

var question = document.querySelector("#question");
var button1 = document.querySelector("#choice1");
var button2 = document.querySelector("#choice2");
var button3 = document.querySelector("#choice3");
var button4 = document.querySelector("#choice4");

// Global variable used later, but declared with the rest of the variables
var clickedID = "";
var currentQuestion;

// Actual quiz questions
var question1 = {
  question: ".addEventListener is an example of which of the following?",
  choice1: "Function",
  choice2: "Variable",
  choice3: "Method",
  choice4: "Keyboard Event",
  answer: "choice3"
}

var question2 = {
  question: "Which of the following isn't a primitive type of JavaScript data?",
  choice1: "Boolean",
  choice2: "Object",
  choice3: "String",
  choice4: "Null",
  answer: "choice2"
}
// Puts all questions into an array
var questions = [question1, question2];

quiz.setAttribute("style", "display: none")
scorebox.setAttribute("style", "display: none");
scoreBoard.setAttribute("style", "display: none")

// Listens for a click on the 'start game' button, and starts the game when clicked
var startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", startGame);

// Gets a random index from an array
function getRandom(array) {
  index = Math.floor(Math.random() * array.length);
  return array[index];
}

// Listens for a click in the quiz area
quiz.addEventListener("click", function(event) {
  var clicked = event.target;
  // Checks if the click in the quiz area was a button
  if( clicked.matches("button") ){
    clickedID = clicked.getAttribute("id");
    if (clickedID === currentQuestion.answer) {
      // Removes the question that was just used from the array of possible questions
      questions.splice(index, 1);
      if (questions.length > 0) {
        setQuestion();
      }
      else {
        endGame();
      }
    }
    else if (clickedID != currentQuestion.answer) {
      timeLeft -= 5;
    }
  }
})

// displays the question on the screen (with its choices)
function setQuestion() {
  // randomly picks a question from the array and sets it to currentQuestion
  currentQuestion = getRandom(questions);
  // fills out the question on screen with the contents of currentQuestion
  question.textContent = currentQuestion.question;
  button1.textContent = currentQuestion.choice1;
  button2.textContent = currentQuestion.choice2;
  button3.textContent = currentQuestion.choice3;
  button4.textContent = currentQuestion.choice4;
}

// This function will run when either time runs out, or all questions have been answered correctly
function endGame() {
  score = Math.ceil(timeLeft);
  quiz.setAttribute("style", "display: none");
  scorebox.setAttribute("style", "display: initial");
  document.querySelector("#yourScore").textContent = `Your score was ${score}!`;
}


// Updates the scores when the user submits their initials
addScore.addEventListener("click", function(event) {
  var newScore = {
    initials: initials.value,
    score: score,
  }
  highScores.push(newScore);
  highScores.sort(function(a, b){return b.score - a.score});
  while (highScores.length > 10) {
    highScores.pop();}
  console.log(highScores);
  localStorage.setItem("High Scores", JSON.stringify(highScores));
  scorebox.setAttribute("style", "display: none")
  // startScreen.setAttribute("style", "display: initial");
  quiz.setAttribute("style", "display: none");
  // This refills the array of questions in case the user would like to play again.
  questions = [question1, question2];
  initials = "";
  scoreboard();

})

function scoreboard() {
  scores.innerHTML = "";
  highScores.forEach(function(item) {
    var nextName = item.initials;
    var nextScore = item.score;
    var nextChild = document.createElement("li");
    nextChild.textContent = `${nextName}       ${nextScore}`;
    scores.appendChild(nextChild);
    scoreBoard.setAttribute("style", "display: initial");
  })
}


// Sets the time
function setTimer() {
  var timeInterval = setInterval(function(){
    var displayTime = Math.ceil(timeLeft);
    timerEl.textContent =  `${displayTime} second(s) remaining`;
    timeLeft -= 0.5;

    if (timeLeft < 0 || questions.length === 0) {
      clearInterval(timeInterval);
      timerEl.textContent = "";
      endGame();
    }
  }, 500);
}

// Runs the game. This function is called when the 'start game' button is clicked
function startGame() {
  setTimer();
  startScreen.setAttribute("style", "display: none");
  quiz.setAttribute("style", "display: initial");
  setQuestion();

}