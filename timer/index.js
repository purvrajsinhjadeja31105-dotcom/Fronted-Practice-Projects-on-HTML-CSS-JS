const timer = document.querySelector(".timer");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let startTime = 0;
let elapsedTime = 0;
let timeInterval;

function startTimer() {
  startTime = Date.now() - elapsedTime;

  timeInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timer.textContent = formatTimer(elapsedTime);
  }, 10);

  startBtn.disabled = true;
  stopBtn.disabled = false;
  
  // Add visual feedback
  timer.classList.add('running');
}

function formatTimer(elapsedTime) {
  const millisecond = Math.floor((elapsedTime % 1000) / 10);
  const second = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minute = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hour = Math.floor(elapsedTime / (1000 * 60 * 60));

  return (
    (hour ? (hour > 9 ? hour : "0" + hour) : "00") + ":" +
    (minute ? (minute > 9 ? minute : "0" + minute) : "00") + ":" +
    (second ? (second > 9 ? second : "0" + second) : "00")
  );
}

function stopTimer() {
  clearInterval(timeInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  
  // Remove visual feedback
  timer.classList.remove('running');
}

function resetTimer() {
  clearInterval(timeInterval);
  elapsedTime = 0;
  timer.textContent = "00:00:00";

  startBtn.disabled = false;
  stopBtn.disabled = true;
  
  // Remove visual feedback
  timer.classList.remove('running');
}

// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
