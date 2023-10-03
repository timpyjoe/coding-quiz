var timeLeft = 10;
var timerEl = document.querySelector("#timer");


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

// setTimer();