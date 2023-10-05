var timeLeft = 10;
var startScreen = document.querySelector(".start-screen");

var timerEl = document.querySelector("#timer");
var quiz = document.querySelector(".question-block");
var button1 = document.querySelector("#choice1");
var button2 = document.querySelector("#choice2");
var button3 = document.querySelector("#choice3");
var button4 = document.querySelector("#choice4");

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

var questions = [question1, question2];

var startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", function(event) {
  setTimer();
  startScreen.setAttribute("style", "visibility:hidden");
  quiz.setAttribute("style", "visibility:visible");

}
)



function setTimer() {
  var timeInterval = setInterval(function(){
    timerEl.textContent =  `${timeLeft} second(s) remaining`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timeInterval);
      timerEl.textContent = "";
    }
  }, 1000);
}


console.log(question1.choice4);
// setTimer();