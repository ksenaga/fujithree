(() => {
  const container = document.getElementById("balls");
  if (!container) return;

  const balls = [];

  const getBallCount = () => {
    const w = window.innerWidth;
    if (w <= 480) return 3;
    if (w <= 768) return 3;
    if (w <= 1024) return 5;
    return 6;
  };

  const createBall = () => {
    const el = document.createElement("div");
    el.className = "ball";

    const size = 140 + Math.random() * 150;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    return {
      el,
      size,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18
    };
  };

  const init = () => {
    const BALL_COUNT = getBallCount();

    [...Array(BALL_COUNT)].forEach(() => {
      const ball = createBall();
      container.appendChild(ball.el);
      balls.push(ball);
    });
  };

  const animate = () => {
    balls.forEach(b => {
      b.x += b.dx;
      b.y += b.dy;

      if (b.x < -b.size || b.x > innerWidth + b.size) b.dx *= -1;
      if (b.y < -b.size || b.y > innerHeight + b.size) b.dy *= -1;

      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    });

    requestAnimationFrame(animate);
  };

  init();
  animate();
})();
