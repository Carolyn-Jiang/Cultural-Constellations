(() => {
  // Coordinates are in atlas units. Expanding a branch adds visible keys;
  // only the camera changes the screen position of an existing node.
  const centre = { x: 0, y: 0 };
  const domainRadius = 330;
  const theory = {
    anthropology: { x: -118, y: -100 },
    disciplines: { x: 118, y: -100 },
    processes: { x: -118, y: 106 },
    ai: { x: 118, y: 106 },
  };
  const publicPreview = ["pothen", "polytropos", "diting"];
  const clamp = (n, a, b) => Math.max(a, Math.min(n, b));
  const paperKey = (id) => "paper-" + id;
  const fieldKey = (id) => "field-" + id;
  const theoryKey = (id) => "theory-" + id;

  function makeWorld(fields) {
    const world = { core: centre };
    const parents = new Map();
    fields.forEach((field, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / fields.length;
      const nx = Math.cos(angle),
        ny = Math.sin(angle);
      const anchor = { x: nx * domainRadius, y: ny * domainRadius };
      world[fieldKey(field.id)] = anchor;
      const count = field.papers.length;
      field.papers.forEach((id, i) => {
        const position = count > 1 ? 1 - (2 * i) / (count - 1) : 0;
        // The public museum papers flank the top branch; DITING sits above
        // its translation siblings on the outside of the pentagon.
        const tangent =
          position * (count > 2 ? 147 : 131) * (index === 0 ? -1 : 1);
        const radial = 155 + (count > 2 ? 82 * (1 - Math.abs(position)) : 0);
        world[paperKey(id)] = {
          x: anchor.x + nx * radial - ny * tangent,
          y: anchor.y + ny * radial + nx * tangent,
        };
        parents.set(id, field);
      });
    });
    for (const [id, position] of Object.entries(theory))
      world[theoryKey(id)] = position;
    return { world, parents };
  }

  function bounds(points) {
    const xs = points.map((p) => p.x),
      ys = points.map((p) => p.y);
    return {
      left: Math.min(...xs),
      right: Math.max(...xs),
      top: Math.min(...ys),
      bottom: Math.max(...ys),
    };
  }

  function frame(
    nodes,
    anchor,
    desired,
    width,
    height,
    padX,
    top,
    bottom,
    maxScale,
  ) {
    const b = bounds(nodes);
    const scale = Math.min(
      maxScale,
      (width - 2 * padX) / Math.max(1, b.right - b.left),
      (height - top - bottom) / Math.max(1, b.bottom - b.top),
    );
    const x = clamp(
      desired.x - scale * anchor.x,
      padX - b.left * scale,
      width - padX - b.right * scale,
    );
    const y = clamp(
      desired.y - scale * anchor.y,
      top - b.top * scale,
      height - bottom - b.bottom * scale,
    );
    return { x, y, scale };
  }

  function layout({
    width,
    height,
    mobile,
    fields = [],
    groups = new Set(),
    peers = new Set(),
    relations = [],
    focus = {},
    cardHeight = 0,
    theoryOpen = false,
  }) {
    const w = Math.max(1, Number(width) || 1),
      h = Math.max(1, Number(height) || 1);
    const phone = mobile ?? w < 610;
    const { world, parents } = makeWorld(fields);
    const owner = parents.get(focus.id);
    const branch =
      focus.kind === "paper" ? owner : fields.find((f) => f.id === focus.id);
    const concept = String(focus.id || "")
      .replace(/^theory-/, "")
      .split("/")[0];
    const focusKey =
      focus.kind === "paper" && owner
        ? paperKey(focus.id)
        : focus.kind === "field" && branch
          ? fieldKey(branch.id)
          : focus.kind === "concept" && world[theoryKey(concept)]
            ? theoryKey(concept)
            : "core";
    const atHome = focus.kind === "home" || !focus.kind;
    const reading =
      focusKey.startsWith("paper-") || focusKey.startsWith("theory-");
    const theoryVisible =
      theoryOpen || focus.kind === "concept" || focus.kind === "theory";
    const fieldKeys = fields.map((field) => fieldKey(field.id));
    const theoryKeys = Object.keys(theory).map(theoryKey);
    const visible = new Set(["core", ...fieldKeys]);
    for (const field of fields) {
      if (groups.has(field.id) || field === branch) {
        for (const id of field.papers) visible.add(paperKey(id));
      }
    }
    for (const id of peers) if (parents.has(id)) visible.add(paperKey(id));
    if (focus.kind === "paper" && owner) {
      for (const row of relations) {
        const neighbour =
          row.a === focus.id ? row.b : row.b === focus.id ? row.a : null;
        if (parents.has(neighbour)) visible.add(paperKey(neighbour));
      }
    }
    if (theoryVisible) for (const key of theoryKeys) visible.add(key);
    const peek =
      atHome && w >= 660
        ? publicPreview.filter((id) => parents.has(id)).map(paperKey)
        : [];
    for (const key of peek) visible.add(key);

    const anchor = world[focusKey];
    const centerX = w / 2;
    const padX = Math.min(w * 0.17, phone ? 60 : 92);
    const top = Math.min(h * 0.13, phone ? 48 : 53);
    const bottom = Math.min(h * 0.19, phone ? 76 : 82);
    let camera;
    if (reading) {
      const scale = phone ? 1.06 : Math.min(1.68, 1.22 + w * 0.00039);
      const focusY = h * (cardHeight > h * 0.55 ? 0.17 : 0.21);
      camera = {
        scale,
        x: centerX - anchor.x * scale,
        y: focusY - anchor.y * scale,
      };
    } else if (focusKey.startsWith("field-")) {
      const family = [
        anchor,
        ...branch.papers.map((id) => world[paperKey(id)]),
      ];
      const extent = bounds(family);
      const reach = Math.max(
        1,
        anchor.x - extent.left,
        extent.right - anchor.x,
      );
      // Wide one-sided fans otherwise push their parent to the phone's edge.
      const branchZoom = phone
        ? Math.min(1.12, (w * 0.68 - padX) / reach)
        : 1.66;
      camera = frame(
        family,
        anchor,
        { x: centerX, y: h * 0.47 },
        w,
        h,
        padX,
        top,
        bottom,
        branchZoom,
      );
    } else if (theoryVisible && !atHome) {
      camera = frame(
        [centre, ...theoryKeys.map((k) => world[k])],
        centre,
        { x: centerX, y: h * 0.47 },
        w,
        h,
        padX,
        top,
        bottom,
        phone ? 1.12 : 1.63,
      );
    } else {
      const overview = ["core", ...fieldKeys, ...peek].map((k) => world[k]);
      camera = frame(
        overview,
        centre,
        { x: centerX, y: h * (peek.length ? 0.56 : 0.47) },
        w,
        h,
        padX,
        top,
        bottom,
        phone ? 0.68 : 0.85,
      );
    }
    const points = {};
    for (const key of visible) {
      const p = world[key];
      points[key] = {
        x: p.x * camera.scale + camera.x,
        y: p.y * camera.scale + camera.y,
      };
    }
    const focusPoint = points[focusKey];
    const cardTop = focusPoint.y + (phone ? 61 : 65);
    const paperSlot = reading
      ? {
          x: focusPoint.x,
          y: cardTop,
          top: cardTop,
          centerX: focusPoint.x,
          width: Math.min(phone ? 410 : 535, w - (phone ? 24 : 40)),
          availableHeight: Math.max(0, h - cardTop - 16),
        }
      : null;
    return { world, camera, points, focusKey, focusPoint, paperSlot };
  }

  window.constellationSpace = { layout };
})();
