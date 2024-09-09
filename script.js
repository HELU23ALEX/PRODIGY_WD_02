let startTime;
let updatedTime;
let difference;
let running = false;
let interval;
const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    interval = setInterval(updateTime, 100);
    running = true;
  }
}

function stopTimer() {
  clearInterval(interval);
  running = false;
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00";
  lapsContainer.innerHTML = "";
}

// function updateTime() {
//   updatedTime = new Date().getTime();
//   difference = updatedTime - startTime;

//   const hours = Math.floor(
//     (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//   display.innerHTML =
//     (hours < 10 ? "0" + hours : hours) +
//     ":" +
//     (minutes < 10 ? "0" + minutes : minutes) +
//     ":" +
//     (seconds < 10 ? "0" + seconds : seconds);
// }
function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Calculate microseconds
  microseconds = Math.floor((difference % 1000) * 1000); // Get the microseconds

  display.innerHTML =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    "." +
    (microseconds < 10
      ? "00" + microseconds
      : microseconds < 100
      ? "0" + microseconds
      : microseconds); // Format microseconds
}

function recordLap() {
  const lapTime = display.innerHTML;
  const lapElement = document.createElement("div");
  lapElement.textContent = lapTime;
  lapsContainer.appendChild(lapElement);
}
