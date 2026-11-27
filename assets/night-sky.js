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
  // A few stars of each layer twinkle: they live as dots in a twin layer
  // that drifts with it, each brightening and dimming slowly on its own.
  const twinkleLayers = ["sky-distant", "sky-near"].map((name) => {
    const layer = document.createElement("div");
    layer.className = name + " twinkle";
    sky.append(layer);
    return layer;
  });
  document.body.prepend(sky);

  const colors = ["188,206,225", "222,227,227", "226,204,164"];
  // The sky stays quiet behind the map: stars at 70% of their original
  // brightness and 88% of their original number.
  const glow = 0.7,
    density = 0.88;
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
    const count = Math.round(
      density *
        (foreground ? Math.min(185, area / 10200) : Math.min(890, area / 2750)),
    );
    const twinkling = [];
    for (let i = 0; i < count; i++) {
      const x = random() * width;
      const y = random() * height;
      const radius = foreground
        ? 0.67 + 0.55 * random()
        : 0.34 + 0.51 * random();
      const alpha =
        glow * (foreground ? 0.55 + 0.28 * random() : 0.26 + 0.35 * random());
      const color = colors[Math.floor(random() * colors.length)];
      if (foreground ? i % 3 === 1 : i % 20 === 7) {
        twinkling.push(twinkleDot(x, y, radius, color, alpha));
        continue;
      }
      if (foreground && i % 13 === 0) {
        const halo = context.createRadialGradient(x, y, 0, x, y, radius * 4.5);
        halo.addColorStop(0, "rgba(" + color + "," + 0.3 * glow + ")");
        halo.addColorStop(1, "rgba(" + color + ",0)");
        context.fillStyle = halo;
        context.fillRect(x - 6, y - 6, 12, 12);
      }
      context.fillStyle = "rgba(" + color + "," + alpha + ")";
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    twinkleLayers[foreground ? 1 : 0].replaceChildren(...twinkling);
  }
  // Slow and shallow: each dims to 60–80% and back over 6–12 s.
  function twinkleDot(x, y, radius, color, alpha) {
    const dot = document.createElement("i");
    const half = 3 + Math.random() * 3;
    dot.style.cssText =
      "left:" +
      x.toFixed(1) +
      "px;top:" +
      y.toFixed(1) +
      "px;width:" +
      (radius * 2).toFixed(2) +
      "px;height:" +
      (radius * 2).toFixed(2) +
      "px;background:rgba(" +
      color +
      "," +
      alpha.toFixed(2) +
      ");--dim:" +
      (0.6 + Math.random() * 0.2).toFixed(2) +
      ";animation-duration:" +
      half.toFixed(2) +
      "s;animation-delay:-" +
      (Math.random() * half * 2).toFixed(2) +
      "s";
    return dot;
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
  // Shooting stars cross the open part of the sky from upper left to lower
  // right. Each is a small four-pointed star a quarter to two-fifths the size
  // of a lit star on the map, much fainter, with a fine trail that brightens
  // towards it. For the first 9–15 s none come, so the sky seems still; then
  // one comes every 6–14 s, at first only of middling length. The first long
  // one, crossing most of the sky, is the second, third or fourth to come;
  // after it, about one in four is long.
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  let meteorTimer = 0,
    starInk = 0,
    meteorsSeen = 0;
  const firstLong = 2 + Math.floor(Math.random() * 3);
  // The visible size of a lit star: the ink of its glyph, not its box.
  function litStarSize() {
    if (starInk) return starInk;
    const star = document.querySelector(".pnode.public .star");
    const pen = document.createElement("canvas").getContext("2d");
    if (!star || !pen) return 16;
    const style = getComputedStyle(star);
    pen.font = style.fontSize + " " + style.fontFamily;
    const ink = pen.measureText(star.textContent.trim() || "✦");
    const size = Math.max(
      ink.actualBoundingBoxLeft + ink.actualBoundingBoxRight,
      ink.actualBoundingBoxAscent + ink.actualBoundingBoxDescent,
    );
    if (size > 4) starInk = size;
    return size > 4 ? size : 16;
  }
  // The sky the foundation rail (or, on phones, its sheet) leaves in view.
  function openSky() {
    const w = window.innerWidth,
      h = window.innerHeight;
    const open = { left: 0, top: 0, right: w, bottom: h };
    const rail = document.getElementById("foundation")?.getBoundingClientRect();
    if (rail && rail.width && rail.height) {
      if (rail.left <= 1 && rail.height > h * 0.6 && rail.right < w * 0.7)
        open.left = Math.max(0, rail.right);
      else if (rail.bottom >= h - 1 && rail.width > w * 0.6)
        open.bottom = Math.min(h, rail.top);
    }
    return open;
  }
  function launch(long) {
    const open = openSky();
    const width = open.right - open.left,
      height = open.bottom - open.top;
    if (width < 140 || height < 120) return false;
    const head = litStarSize() * (0.25 + Math.random() * 0.15);
    // A tall strip of sky (a phone) takes a steeper path, so long ones fit.
    const angle =
      height > width * 1.1 ? 38 + Math.random() * 20 : 26 + Math.random() * 16;
    const cos = Math.cos((angle * Math.PI) / 180),
      sin = Math.sin((angle * Math.PI) / 180);
    // Path length: a share of the open sky's diagonal, never more than fits.
    const share = long
      ? 0.72 + Math.random() * 0.23
      : 0.36 + Math.random() * 0.26;
    const room = Math.min(width / cos, height / sin) * 0.97;
    const travel = Math.min(share * Math.hypot(width, height), room);
    const dx = travel * cos,
      dy = travel * sin;
    const meteor = document.createElement("i");
    meteor.className = "meteor";
    const trail = document.createElement("b"),
      spark = document.createElement("b");
    trail.className = "meteor-trail";
    spark.className = "meteor-star";
    meteor.append(trail, spark);
    meteor.style.setProperty("--head", head.toFixed(1) + "px");
    // Longer paths draw longer trails.
    meteor.style.setProperty(
      "--tail",
      Math.round(Math.min(240, Math.max(head * 12, travel * 0.2))) + "px",
    );
    meteor.style.setProperty("--turn", angle.toFixed(1) + "deg");
    meteor.style.left =
      open.left + Math.random() * Math.max(1, width - dx) + "px";
    meteor.style.top =
      open.top + Math.random() * Math.max(1, height - dy) + "px";
    meteor.style.rotate = angle.toFixed(1) + "deg";
    sky.append(meteor);
    // About a third of a pixel per millisecond across a typical path.
    const duration = (700 + travel * 1.5) / 1.3;
    const path = meteor.animate(
      [{ translate: "0 0" }, { translate: dx + "px " + dy + "px" }],
      { duration, easing: "cubic-bezier(.3,.55,.45,1)" },
    );
    meteor.animate(
      [
        { opacity: 0 },
        { opacity: 0.85, offset: 0.16 },
        { opacity: 0.85, offset: 0.58 },
        { opacity: 0 },
      ],
      { duration },
    );
    // The trail lengthens as the star enters the sky.
    trail.animate(
      [{ scale: "0.2 1" }, { scale: "1 1", offset: 0.36 }, { scale: "1 1" }],
      { duration, easing: "ease-out" },
    );
    path.onfinish = path.oncancel = () => meteor.remove();
    return true;
  }
  function planMeteor() {
    clearTimeout(meteorTimer);
    if (still.matches || document.hidden) return;
    const first = meteorsSeen === 0;
    meteorTimer = setTimeout(
      () => {
        const next = meteorsSeen + 1;
        const long =
          next === firstLong || (next > firstLong && Math.random() < 0.25);
        if (launch(long)) meteorsSeen++;
        planMeteor();
      },
      first ? 9000 + Math.random() * 6000 : 6000 + Math.random() * 8000,
    );
  }

  function syncVisibility() {
    sky.classList.toggle("sky-paused", document.hidden);
    if (!document.hidden) scheduleDraw();
    planMeteor();
  }
  window.addEventListener("resize", scheduleDraw, { passive: true });
  document.addEventListener("visibilitychange", syncVisibility);
  still.addEventListener("change", planMeteor);
  syncVisibility();
})();
