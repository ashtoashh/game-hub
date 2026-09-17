const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");

const GRID = 20;
const CELLS = canvas.width / GRID;
const BEST_KEY = "snake-best-score";

let snake, dir, nextDir, food, score, best, gameOver, loopId;

function reset() {
  snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
  dir = { x: 1, y: 0 };
  nextDir = dir;
  score = 0;
  gameOver = false;
  best = Number(localStorage.getItem(BEST_KEY) || 0);
  placeFood();
  scoreEl.textContent = score;
  bestEl.textContent = best;
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * CELLS),
      y: Math.floor(Math.random() * CELLS),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
}

function tick() {
  if (gameOver) return;

  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  const hitWall = head.x < 0 || head.y < 0 || head.x >= CELLS || head.y >= CELLS;
  const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);

  if (hitWall || hitSelf) {
    gameOver = true;
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
    }
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreEl.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#161922";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ef5350";
  ctx.fillRect(food.x * GRID + 1, food.y * GRID + 1, GRID - 2, GRID - 2);

  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? "#81c784" : "#4caf50";
    ctx.fillRect(s.x * GRID + 1, s.y * GRID + 1, GRID - 2, GRID - 2);
  });

  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f0f1f5";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "14px sans-serif";
    ctx.fillText("Press space to restart", canvas.width / 2, canvas.height / 2 + 16);
  }
}

const KEY_DIRS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

window.addEventListener("keydown", (e) => {
  if (gameOver && e.code === "Space") {
    reset();
    return;
  }

  const next = KEY_DIRS[e.key];
  if (!next) return;

  // Prevent reversing directly into the snake's own body.
  if (next.x === -dir.x && next.y === -dir.y) return;

  nextDir = next;
});

reset();
draw();
loopId = setInterval(tick, 110);
