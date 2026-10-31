// --- Registro do Service Worker (PWA) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrado com sucesso:', reg.scope))
      .catch(err => console.error('Falha ao registrar o Service Worker:', err));
  });
}

// --- Elementos do DOM ---
const themeToggle = document.getElementById('theme-toggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Relógio
const clockDisplay = document.getElementById('clock-display');
const dateDisplay = document.getElementById('date-display');

// Pomodoro
const timerDisplay = document.getElementById('timer-display');
const pomoModeBtns = document.querySelectorAll('.pomo-mode-btn');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Tema Claro / Escuro ---
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('clockpomo_theme', newTheme);
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('clockpomo_theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

// --- Sistema de Abas ---
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// --- Relógio Digital ---
function updateClock() {
  const now = new Date();
  
  // Hora formato HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  // Data formatada
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  dateDisplay.textContent = now.toLocaleDateString('pt-BR', options);
}

setInterval(updateClock, 1000);
updateClock();

// --- Pomodoro ---
let totalSeconds = 1500; // Padrão: 25 minutos
let remainingSeconds = totalSeconds;
let timerInterval = null;
let isRunning = false;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
  document.title = isRunning ? `(${formatTime(remainingSeconds)}) ClockPomo` : 'ClockPomo';
}

pomoModeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (isRunning) stopTimer();
    pomoModeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    totalSeconds = parseInt(btn.dataset.time);
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
  });
});

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  pomoModeBtns.forEach(b => b.disabled = true);

  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
    } else {
      stopTimer();
      alert('Tempo concluído!');
      resetTimer();
    }
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  pomoModeBtns.forEach(b => b.disabled = false);
  document.title = 'ClockPomo';
}

function resetTimer() {
  stopTimer();
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay();
