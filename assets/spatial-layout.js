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

  function usableArea(width, height, viewportInsets, homeInsets) {
    const inset = (edge) =>
      Math.max(
        ...[viewportInsets, homeInsets].map((source) => {
          const value = Number(source?.[edge]);
          return Number.isFinite(value) ? Math.max(0, value) : 0;
        }),
      );
    function axis(size, before, after) {
      // During a toolbar reflow or the first hidden layout the two measured
      // overlays can briefly occupy more than the stage itself.
      const floor = Math.min(size, Math.max(1, Math.min(32, size * 0.1)));
      const ratio = Math.min(1, (size - floor) / Math.max(1, before + after));
      return [before * ratio, size - after * ratio];
    }
    const [left, right] = axis(width, inset("left"), inset("right"));
    const [top, bottom] = axis(height, inset("top"), inset("bottom"));
    return {
      left,
      right,
      top,
      bottom,
      width: right - left,
      height: bottom - top,
    };
  }

  function frame(nodes, anchor, desired, area, padding, maxScale) {
    const b = bounds(nodes);
    const left = area.left + padding.x,
      right = area.right - padding.x;
    const top = area.top + padding.top,
      bottom = area.bottom - padding.bottom;
    const scale = Math.min(
      maxScale,
      (right - left) / Math.max(1, b.right - b.left),
      (bottom - top) / Math.max(1, b.bottom - b.top),
    );
    return {
      scale,
      x: clamp(
        desired.x - scale * anchor.x,
        left - b.left * scale,
        right - b.right * scale,
      ),
      y: clamp(
        desired.y - scale * anchor.y,
        top - b.top * scale,
        bottom - b.bottom * scale,
      ),
    };
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
    viewportInsets,
    homeInsets,
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
    const safeRect = usableArea(
      w,
      h,
      viewportInsets,
      atHome ? homeInsets : null,
    );
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
    const roomyPortrait =
      phone &&
      w >= 360 &&
      h > w &&
      safeRect.width >= 320 &&
      safeRect.height >= 425;
    const roomyDesktop =
      !phone && w >= 660 && safeRect.width >= 510 && safeRect.height >= 390;
    // On a tall phone, the two papers on Athena's branch occupy the free
    // vertical space. The translation preview would cost a column of width.
    const previewCount = roomyPortrait ? 2 : roomyDesktop ? 3 : 0;
    const peek = atHome
      ? publicPreview
          .slice(0, previewCount)
          .filter((id) => parents.has(id))
          .map(paperKey)
      : [];
    for (const key of peek) visible.add(key);

    const anchor = world[focusKey];
    const aw = safeRect.width,
      ah = safeRect.height;
    const centerX = safeRect.left + aw / 2,
      centerY = safeRect.top + ah / 2;
    const padding = {
      x: Math.min(aw * 0.165, phone ? 60 : 108),
      top: Math.min(ah * 0.13, phone ? 44 : 57),
      bottom: Math.min(ah * 0.19, phone ? 73 : 101),
    };
    // A wide atlas with a floating title has room to move slightly right.
    // When the title already reserves the left edge, center in the remainder.
    const homeBias = !phone && w >= 900 && safeRect.left < w * 0.18 ? 0.055 : 0;
    const homeCenter = {
      x: centerX + aw * homeBias,
      y: safeRect.top + ah * (peek.length ? 0.56 : 0.48),
    };
    const openCenter = { x: centerX, y: safeRect.top + ah * 0.47 };
    const overviewZoom = phone ? 0.86 : 2.35;
    let camera;
    if (reading) {
      const scale = phone ? 1.06 : Math.min(1.68, 1.22 + aw * 0.00039);
      const gap = Math.min(ah * 0.14, phone ? 61 : 65);
      const preferredY = ah * (cardHeight > ah * 0.55 ? 0.17 : 0.21);
      const topRoom = Math.min(32, ah * 0.15);
      const requestedRoom = Number.isFinite(cardHeight)
        ? Math.max(0, cardHeight)
        : 0;
      const focusY =
        safeRect.top +
        Math.max(
          topRoom,
          Math.min(
            preferredY,
            ah - requestedRoom - gap - Math.min(12, ah * 0.04),
          ),
        );
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
      // Keep the parent central even on a screen with an open side rail.
      const branchZoom = Math.min(
        phone ? 1.12 : 1.85,
        (aw * 0.68 - padding.x) / reach,
      );
      camera = frame(family, anchor, openCenter, safeRect, padding, branchZoom);
    } else if (theoryVisible && !atHome) {
      camera = frame(
        [centre, ...theoryKeys.map((k) => world[k])],
        centre,
        openCenter,
        safeRect,
        padding,
        phone ? 1.2 : 1.83,
      );
    } else {
      const overview = ["core", ...fieldKeys, ...peek].map((k) => world[k]);
      camera = frame(
        overview,
        centre,
        homeCenter,
        safeRect,
        padding,
        overviewZoom,
      );
    }
    const disclosed = [...visible].map((k) => world[k]);
    const extent = bounds(disclosed);
    const midpoint = {
      x: (extent.left + extent.right) / 2,
      y: (extent.top + extent.bottom) / 2,
    };
    const fitCamera = frame(
      disclosed,
      midpoint,
      {
        x: atHome ? homeCenter.x : centerX,
        y: centerY - (padding.bottom - padding.top) / 2,
      },
      safeRect,
      padding,
      overviewZoom,
    );
    const points = {};
    for (const key of visible) {
      const p = world[key];
      points[key] = {
        x: p.x * camera.scale + camera.x,
        y: p.y * camera.scale + camera.y,
      };
    }
    const focusPoint = points[focusKey];
    const cardTop = focusPoint.y + Math.min(ah * 0.14, phone ? 61 : 65);
    const paperSlot = reading
      ? {
          x: focusPoint.x,
          y: cardTop,
          top: cardTop,
          centerX: focusPoint.x,
          width: Math.max(
            1,
            Math.min(
              phone ? 410 : 535,
              aw - Math.min(aw * 0.08, phone ? 24 : 40),
            ),
          ),
          availableHeight: Math.max(
            0,
            safeRect.bottom - cardTop - Math.min(12, ah * 0.04),
          ),
        }
      : null;
    return {
      world,
      camera,
      fitCamera,
      safeRect,
      points,
      focusKey,
      focusPoint,
      paperSlot,
    };
  }

  window.constellationSpace = { layout };
})();
