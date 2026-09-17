const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const bestEl = document.getElementById("best");
const restartBtn = document.getElementById("restart");

const ICONS = ["🍕", "🚀", "🐙", "🎸", "🌵", "🎲", "🧩", "🍩"];
const BEST_KEY = "memory-best-moves";

let flipped, matchedCount, moves, lockBoard;

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function render() {
  const deck = shuffled([...ICONS, ...ICONS]);
  boardEl.innerHTML = "";
  flipped = [];
  matchedCount = 0;
  moves = 0;
  lockBoard = false;
  movesEl.textContent = moves;

  const best = localStorage.getItem(BEST_KEY);
  bestEl.textContent = best ? best : "—";

  deck.forEach((icon) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.icon = icon;
    card.addEventListener("click", () => onFlip(card));
    boardEl.appendChild(card);
  });
}

function onFlip(card) {
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flipped.push(card);

  if (flipped.length < 2) return;

  moves += 1;
  movesEl.textContent = moves;
  lockBoard = true;

  const [a, b] = flipped;
  if (a.dataset.icon === b.dataset.icon) {
    a.classList.add("matched");
    b.classList.add("matched");
    matchedCount += 1;
    flipped = [];
    lockBoard = false;

    if (matchedCount === ICONS.length) {
      const best = Number(localStorage.getItem(BEST_KEY) || Infinity);
      if (moves < best) {
        localStorage.setItem(BEST_KEY, String(moves));
        bestEl.textContent = moves;
      }
    }
  } else {
    setTimeout(() => {
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      a.textContent = "";
      b.textContent = "";
      flipped = [];
      lockBoard = false;
    }, 700);
  }
}

restartBtn.addEventListener("click", render);

render();
