let timer;
let currentTime = 25 * 60; // default to focus session
let isRunning = false;
let sessionCount = 0;
let mode = "focus"; // could be "focus", "short", or "long"

const DURATIONS = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function updateDisplay() {
  const display = document.getElementById("timerDisplay");
  const session = document.getElementById("sessionType");
  if (display) display.textContent = formatTime(currentTime);
  if (session) session.textContent =
    mode === "focus"
      ? "Focus Session"
      : mode === "short"
      ? "Short Break"
      : "Long Break";
}

function switchMode(newMode) {
  mode = newMode;
  currentTime = DURATIONS[mode];
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;

      alert(`⏰ ${mode === "focus" ? "Focus" : mode === "short" ? "Short Break" : "Long Break"} session ended!`);

      if (mode === "focus") {
        sessionCount++;
        if (sessionCount % 5 === 0) {
          switchMode("long");
        } else {
          switchMode("short");
        }
        startTimer(); // auto-start next
      } else {
        switchMode("focus");
        startTimer(); // auto-start focus
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function setupPomodoro() {
  document.getElementById("focusBtn").addEventListener("click", () => {
    stopTimer();
    switchMode("focus");
  });

  document.getElementById("shortBreakBtn").addEventListener("click", () => {
    stopTimer();
    switchMode("short");
  });

  document.getElementById("longBreakBtn").addEventListener("click", () => {
    stopTimer();
    switchMode("long");
  });


  document.getElementById("startBtn").addEventListener("click", () => {
    startTimer();
  });

  document.getElementById("stopBtn").addEventListener("click", () => {
    stopTimer();
  });

  document.getElementById("refreshBtn").addEventListener("click", () => {
    stopTimer(); // stop if running
    currentTime = DURATIONS[mode]; // reset time based on current mode
    updateDisplay(); // update the UI
  });
  

  // Init display on page load
  switchMode("focus");
}
export { setupPomodoro };
