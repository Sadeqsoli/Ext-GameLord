(() => {
  const gameEl = document.getElementById("game");
  const dinoEl = document.getElementById("dino");
  const scoreEl = document.getElementById("score");
  const overlayEl = document.getElementById("overlay");
  const restartBtn = document.getElementById("restartBtn");

  const WORLD = {
    width: () => gameEl.clientWidth,
    height: () => gameEl.clientHeight,
    groundY: 4,
  };
  const DINO = {
    x: 40,
    y: 4,
    width: 36,
    height: 44,
    velY: 0,
    gravity: 0.0018,
    jumpVel: 0.55,
    isOnGround: true,
    runPhase: 0,
  };

  const obstacles = [];
  let nextSpawnIn = 300;
  let speed = 0.35;
  let score = 0;
  let running = true;
  let last = performance.now();

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
  function setDinoY() {
    dinoEl.style.bottom = DINO.y + "px";
  }
  function jump() {
    if (!running) return;
    if (DINO.isOnGround) {
      DINO.velY = DINO.jumpVel;
      DINO.isOnGround = false;
    }
  }

  function spawnObstacle() {
    const el = document.createElement("div");
    el.className = "cactus";
    const h = 22 + Math.floor(Math.random() * 20);
    el.style.height = h + "px";
    const w = 12 + Math.floor(Math.random() * 10);
    el.style.width = w + "px";
    const x = WORLD.width();
    el.style.left = x + "px";
    gameEl.appendChild(el);
    obstacles.push({ el, x, w, h });
    nextSpawnIn = 700 + Math.random() * 600;
  }

  function updateDino(dt) {
    if (DINO.isOnGround) {
      DINO.runPhase += dt * 0.02;
      const wiggle = Math.sin(DINO.runPhase) * 3;
      dinoEl.style.transform = "skewX(" + wiggle + "deg)";
    } else {
      dinoEl.style.transform = "none";
    }
    DINO.velY -= DINO.gravity * dt;
    DINO.y += DINO.velY * dt;
    const minY = WORLD.groundY;
    const maxY = WORLD.height() - DINO.height - 2;
    if (DINO.y <= minY) {
      DINO.y = minY;
      DINO.velY = 0;
      DINO.isOnGround = true;
    } else if (DINO.y > maxY) {
      DINO.y = maxY;
      DINO.velY = 0;
    }
    setDinoY();
  }

  function updateObstacles(dt) {
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const o = obstacles[i];
      o.x -= speed * dt * (1 + score * 0.00005);
      if (o.x + o.w < 0) {
        o.el.remove();
        obstacles.splice(i, 1);
        continue;
      }
      o.el.style.left = o.x + "px";

      const dLeft = DINO.x;
      const dRight = DINO.x + DINO.width;
      const dBottom = DINO.y + WORLD.groundY;
      const dTop = dBottom + DINO.height;

      const oLeft = o.x;
      const oRight = o.x + o.w;
      const oBottom = WORLD.groundY;
      const oTop = WORLD.groundY + o.h;

      const overlapX = dRight > oLeft && dLeft < oRight;
      const overlapY = dBottom < oTop && dTop > oBottom;
      if (overlapX && overlapY) {
        gameOver();
        return;
      }
    }
  }

  function updateScore(dt) {
    score += dt * 0.01;
    scoreEl.textContent = Math.floor(score).toString().padStart(5, "0");
  }
  function gameOver() {
    running = false;
    overlayEl.classList.add("show");
  }
  function restart() {
    for (const o of obstacles) o.el.remove();
    obstacles.length = 0;
    nextSpawnIn = 300;
    speed = 0.35;
    score = 0;
    scoreEl.textContent = "00000";
    DINO.y = WORLD.groundY;
    DINO.velY = 0;
    DINO.isOnGround = true;
    setDinoY();
    overlayEl.classList.remove("show");
    running = true;
    last = performance.now();
    spawnObstacle();
    requestAnimationFrame(loop);
  }

  function loop(now) {
    const dt = clamp(now - last, 0, 50);
    last = now;
    if (!running) return;
    speed += dt * 0.000003;
    nextSpawnIn -= dt;
    if (nextSpawnIn <= 0) spawnObstacle();
    updateDino(dt);
    updateObstacles(dt);
    updateScore(dt);
    requestAnimationFrame(loop);
  }

  const onKey = (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      jump();
    }
    if (
      !running &&
      (e.code === "Space" || e.code === "Enter" || e.code === "KeyR")
    ) {
      restart();
    }
    if (e.code === "KeyR") {
      restart();
    }
  };
  window.addEventListener("keydown", onKey, { passive: false });
  document.addEventListener("keydown", onKey, { passive: false });
  gameEl.addEventListener("pointerdown", () => jump());
  restartBtn.addEventListener("click", restart);

  dinoEl.style.left = DINO.x + "px";
  dinoEl.style.width = DINO.width + "px";
  dinoEl.style.height = DINO.height + "px";
  setDinoY();
  last = performance.now();
  spawnObstacle();
  requestAnimationFrame(loop);
})();
