
const timer = document.getElementById("timer");
const statusText = document.getElementById("status");

let elapsed = Number(localStorage.getItem("neonElapsed")) || 0;
let running = localStorage.getItem("neonRunning") === "true";
let startedAt = running
  ? Number(localStorage.getItem("neonStartedAt")) || Date.now()
  : 0;

function getElapsed() {
  return elapsed + (running ? Date.now() - startedAt : 0);
}

function formatTime(ms) {
  const centiseconds = Math.floor(ms / 10);
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor(centiseconds / 100) % 60;
  const cs = centiseconds % 100;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function saveState() {
  localStorage.setItem("neonElapsed", elapsed);
  localStorage.setItem("neonRunning", running);
  localStorage.setItem("neonStartedAt", startedAt);
}

function update() {
  timer.textContent = formatTime(getElapsed());
  saveState();
}

function startTimer() {
  if (running) return;

  startedAt = Date.now();
  running = true;
  statusText.textContent = "ÇALIŞIYOR";
  statusText.style.color = "#00f5ff";
  saveState();
  update();
}

function pauseTimer() {
  if (!running) return;

  elapsed = getElapsed();
  running = false;
  startedAt = 0;
  statusText.textContent = "DURAKLATILDI";
  statusText.style.color = "#ae8bff";
  saveState();
  update();
}

function resetTimer() {
  running = false;
  elapsed = 0;
  startedAt = 0;

  statusText.textContent = "SIFIRLANDI";
  statusText.style.color = "#9caec9";

  saveState();
  update();
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    running ? pauseTimer() : startTimer();
  }

  if (event.key.toLowerCase() === "r") {
    resetTimer();
  }
});

setInterval(update, 30);
update();

if (running) {
  statusText.textContent = "ÇALIŞIYOR";
  statusText.style.color = "#00f5ff";
}
