// Paint once per viewport size. Only the two cached layers move during viewing.
(() => {
  const sky = document.createElement("div");
  sky.className = "night-sky";
  sky.setAttribute("aria-hidden", "true");
  const layers = ["sky-distant", "sky-near"].map((name) => {
    const canvas = document.createElement("canvas");
    canvas.className = name;
    sky.append(canvas);
    return canvas;
  });
  document.body.prepend(sky);

  const colors = ["188,206,225", "222,227,227", "226,204,164"];
  function drawLayer(canvas, foreground) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(
      window.devicePixelRatio || 1,
      1.5,
      Math.sqrt(3200000 / (width * height)),
    );
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(
      canvas.width / width,
      0,
      0,
      canvas.height / height,
      0,
      0,
    );

    let seed = foreground ? 12793 : 48847;
    function random() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    const area = width * height;
    const count = foreground
      ? Math.min(185, Math.round(area / 10200))
      : Math.min(890, Math.round(area / 2750));
    for (let i = 0; i < count; i++) {
      const x = random() * width;
      const y = random() * height;
      const radius = foreground
        ? 0.67 + 0.55 * random()
        : 0.34 + 0.51 * random();
      const alpha = foreground
        ? 0.55 + 0.28 * random()
        : 0.26 + 0.35 * random();
      const color = colors[Math.floor(random() * colors.length)];
      if (foreground && i % 13 === 0) {
        const halo = context.createRadialGradient(x, y, 0, x, y, radius * 4.5);
        halo.addColorStop(0, "rgba(" + color + ",0.30)");
        halo.addColorStop(1, "rgba(" + color + ",0)");
        context.fillStyle = halo;
        context.fillRect(x - 6, y - 6, 12, 12);
      }
      context.fillStyle = "rgba(" + color + "," + alpha + ")";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  let pending = 0;
  function draw() {
    pending = 0;
    drawLayer(layers[0], false);
    drawLayer(layers[1], true);
  }
  function scheduleDraw() {
    if (!pending && !document.hidden) pending = requestAnimationFrame(draw);
  }
  function syncVisibility() {
    sky.classList.toggle("sky-paused", document.hidden);
    if (!document.hidden) scheduleDraw();
  }
  window.addEventListener("resize", scheduleDraw, { passive: true });
  document.addEventListener("visibilitychange", syncVisibility);
  syncVisibility();
})();
