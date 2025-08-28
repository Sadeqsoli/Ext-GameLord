import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

const Pong: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const width = (canvas.width = 640);
    const height = (canvas.height = 360);

    // Game objects
    const paddleHeight = 60;
    const paddleWidth = 10;
    let leftY = height / 2 - paddleHeight / 2;
    let rightY = height / 2 - paddleHeight / 2;
    const speed = 5;
    const ball = { x: width / 2, y: height / 2, vx: 3, vy: 2, r: 6 };

    const keys: Record<string, boolean> = {};
    const onKey = (e: KeyboardEvent) => {
      keys[e.key] = e.type === "keydown";
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    function resetBall(direction: number) {
      ball.x = width / 2;
      ball.y = height / 2;
      ball.vx = 3 * direction;
      ball.vy = (Math.random() * 2 - 1) * 2.5;
    }

    function update() {
      // Input
      if (keys["w"]) leftY -= speed;
      if (keys["s"]) leftY += speed;
      if (keys["ArrowUp"]) rightY -= speed;
      if (keys["ArrowDown"]) rightY += speed;
      leftY = Math.max(0, Math.min(height - paddleHeight, leftY));
      rightY = Math.max(0, Math.min(height - paddleHeight, rightY));

      // Move ball
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Collide top/bottom
      if (ball.y - ball.r < 0 || ball.y + ball.r > height) ball.vy *= -1;

      // Collide with left paddle
      if (
        ball.x - ball.r < paddleWidth &&
        ball.y > leftY &&
        ball.y < leftY + paddleHeight
      ) {
        ball.vx = Math.abs(ball.vx);
      }

      // Collide with right paddle
      if (
        ball.x + ball.r > width - paddleWidth &&
        ball.y > rightY &&
        ball.y < rightY + paddleHeight
      ) {
        ball.vx = -Math.abs(ball.vx);
      }

      // Score
      if (ball.x < 0) resetBall(1);
      if (ball.x > width) resetBall(-1);
    }

    function draw() {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, width, height);

      // Mid line
      ctx.strokeStyle = "#333";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, leftY, paddleWidth, paddleHeight);
      ctx.fillRect(width - paddleWidth, rightY, paddleWidth, paddleHeight);

      // Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    }

    let raf = 0;
    function loop() {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
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
    <Pong />
  </React.StrictMode>
);
