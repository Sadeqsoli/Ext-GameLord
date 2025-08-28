import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

type Point = { x: number; y: number };

const Snake: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const tile = 16;
    const cols = 32;
    const rows = 24;
    canvas.width = cols * tile;
    canvas.height = rows * tile;

    let snake: Point[] = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    let dir: Point = { x: 1, y: 0 };
    let food: Point = { x: 12, y: 8 };
    let pendingDir: Point | null = null;
    let gameOver = false;

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
    }

    function onKey(e: KeyboardEvent) {
      const key = e.key;
      if (key === "ArrowUp" && dir.y !== 1) pendingDir = { x: 0, y: -1 };
      if (key === "ArrowDown" && dir.y !== -1) pendingDir = { x: 0, y: 1 };
      if (key === "ArrowLeft" && dir.x !== 1) pendingDir = { x: -1, y: 0 };
      if (key === "ArrowRight" && dir.x !== -1) pendingDir = { x: 1, y: 0 };
    }
    window.addEventListener("keydown", onKey);

    function update() {
      if (gameOver) return;
      if (pendingDir) {
        dir = pendingDir;
        pendingDir = null;
      }

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wrap
      head.x = (head.x + cols) % cols;
      head.y = (head.y + rows) % rows;

      // Self-collision
      if (snake.some((p) => p.x === head.x && p.y === head.y)) {
        gameOver = true;
        return;
      }

      snake.unshift(head);

      // Eat
      if (head.x === food.x && head.y === food.y) {
        placeFood();
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Food
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(food.x * tile, food.y * tile, tile, tile);

      // Snake
      ctx.fillStyle = "#22c55e";
      for (const p of snake) {
        ctx.fillRect(p.x * tile, p.y * tile, tile - 1, tile - 1);
      }

      if (gameOver) {
        ctx.fillStyle = "#fff";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          "Game Over - Reload to Restart",
          canvas.width / 2,
          canvas.height / 2
        );
      }
    }

    let acc = 0;
    const stepMs = 120;
    let last = performance.now();
    let raf = 0;
    function loop(now: number) {
      const dt = now - last;
      last = now;
      acc += dt;
      while (acc >= stepMs) {
        update();
        acc -= stepMs;
      }
      draw();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Snake />
  </React.StrictMode>
);
