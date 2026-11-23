(() => {
  const fields = [
    {
      id: "museum",
      art: "athena",
      name: ["博物馆藏品", "Museum objects"],
      guardian: ["雅典娜与猫头鹰", "Athena & the owl"],
      papers: ["pothen", "polytropos"],
    },
    {
      id: "rights",
      art: "themis",
      name: ["版权与来源归属", "Copyright & provenance"],
      guardian: ["忒弥斯与天平", "Themis & the scales"],
      papers: ["motif", "provenance"],
    },
    {
      id: "calligraphy",
      art: "fuxi",
      name: ["书法", "Calligraphy"],
      guardian: ["负屃", "Fùxì"],
      papers: ["composition", "handwriting"],
    },
    {
      id: "music",
      art: "qiuniu",
      name: ["音乐", "Music"],
      guardian: ["囚牛", "Qiúniú"],
      papers: ["qiuniu", "interpretation", "instrumental"],
    },
    {
      id: "translation",
      art: "diting",
      name: ["翻译", "Translation"],
      guardian: ["谛听", "Dìtīng"],
      papers: ["diting", "revision", "languages"],
    },
  ];
  const fieldById = Object.fromEntries(fields.map((d) => [d.id, d]));
  const owner = Object.fromEntries(
    fields.flatMap((d) => d.papers.map((p) => [p, d])),
  );
  const ui = {
    title: [
      "AI 如何解读并重塑文化？",
      "How Does AI Interpret and Reshape Culture?",
    ],
    intro: [
      "文化意义在哪里发生变化？从行动者网络理论出发",
      "Where does cultural meaning change? Start with actor-network theory",
    ],
    fields: ["五个研究领域", "Research fields"],
    foundation: ["人类学", "Anthropology"],
    anthropology: ["行动者网络理论", "Actor-network theory"],
    disciplines: ["认知科学六学科", "Six disciplines"],
    processes: ["六类认知过程", "Six cognitive processes"],
    ai: ["人工智能与认知科学", "AI and cognitive science"],
    open: [
      "选择一个领域，展开它的论文。",
      "Choose a field to uncover its papers.",
    ],
    pick: [
      "选择一篇论文，探索它与其他研究的联系。",
      "Choose a paper to explore its connections with other work.",
    ],
    compare: [
      "触碰金线阅读关联，选择相邻论文继续探索。",
      "Explore a gold line to read the connection, then follow a neighbouring paper.",
    ],
    return: ["返回五个领域", "All five fields"],
    close: ["收起文字", "Close reading"],
    graph: ["研究关系图谱", "Research connections"],
  };
  const lenses = {
    pothen: [
      "disciplines",
      5,
      ["从计算表征理解归属判断", "Explore computational representation"],
    ],
    polytropos: [
      "processes",
      4,
      ["哪些证据足以支持判断？", "What counts as evidence for a judgement?"],
    ],
    diting: [
      "disciplines",
      2,
      ["从语言学看隐含意义", "Explore implicit meaning in linguistics"],
    ],
  };
  const $ = (q) => document.querySelector(q);
  const stage = $("#graph-scene"),
    map = $("#map"),
    nodes = $("#nodes"),
    card = $("#node-card"),
    tip = $("#tip");
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const initialLang = new URLSearchParams(location.search).get("lang");
  let lang = Number(!navigator.language.toLowerCase().startsWith("zh"));
  try {
    const s = localStorage.getItem("atlas-language");
    if (s) lang = +(s === "en");
  } catch {}
  if (["en", "zh"].includes(initialLang)) lang = +(initialLang === "en");
  const l = (a) => a[lang],
    t = (k) => l(ui[k]);
  const traits = ["anthropology", "disciplines", "processes", "ai"];
  const fieldKey = (id) => "field-" + id,
    paperKey = (id) => "paper-" + id;
  let renderedLocation = location.href;
  let drawnWidth = 0, drawnHeight = 0;
  let state,
    frame = 0,
    positions = {},
    targets = {},
    edges = [],
    shownCard = false,
    pinnedEdge = null;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width:640px)");
  const controls = new Map();
  const relationKey = (r) => r.a + "--" + r.b;
  function parseRoute() {
    const [kind, id, index] = location.hash.slice(1).split("/");
    if (kind === "paper" && owner[id])
      return { view: "fields", field: owner[id].id, paper: id };
    if (kind === "field" && fieldById[id])
      return { view: "fields", field: id, paper: null };
    if (kind === "theory")
      return {
        view: traits.includes(id) ? id : "anthropology",
        index:
          index !== undefined && /^[0-5]$/.test(index) ? Number(index) : null,
      };
    return { view: "fields", field: null, paper: null };
  }
  function navigate(hash) {
    if (location.hash === hash) {
      applyRoute();
      return;
    }
    history.pushState(null, "", hash);
    applyRoute();
    const guide = $("#trail").hidden ? $(".graph-tools") : $("#trail");
    if (guide.getBoundingClientRect().top < -50)
      guide.scrollIntoView({ block: "start", behavior: "instant" });
  }
  window.exploreView = (view, index = null) => {
    if (view === "fields") navigate("#atlas");
    else if (traits.includes(view))
      navigate(
        "#theory/" + view + (Number.isInteger(index) ? "/" + index : ""),
      );
  };
  window.explorePaper = (id) => {
    if (owner[id]) navigate("#paper/" + id);
  };
  const goField = (id) => navigate(id ? "#field/" + id : "#atlas");
  function createNodes() {
    nodes.replaceChildren();
    controls.clear();
    function add(key, className, inner, action) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = className;
      button.innerHTML = inner;
      button.hidden = true;
      button.addEventListener("click", action);
      nodes.append(button);
      controls.set(key, button);
      return button;
    }
    const core = add(
      "core",
      "foundation",
      "<b>" + t("foundation") + "</b><span>" + t("anthropology") + "</span>",
      () => window.exploreView("anthropology", 1),
    );
    core.setAttribute(
      "aria-label",
      t("foundation") + " · " + t("anthropology"),
    );
    fields.forEach((d) => {
      const field = add(
        fieldKey(d.id),
        "dnode",
        '<span class="coin"><img draggable="false" alt="" src="' +
          ART[d.art] +
          '"></span><span aria-hidden="true" class="switch"></span><span class="node-label"><b>' +
          esc(l(d.name)) +
          "</b><small>" +
          esc(l(d.guardian)) +
          "</small></span>",
        () => goField(state.field === d.id && !state.paper ? null : d.id),
      );
      field.dataset.domain = d.id;
      field.setAttribute("aria-label", l(d.name) + " · " + l(d.guardian));
      for (const id of d.papers) {
        const item = CAT[id],
          released = item.links.length > 0;
        const paper = add(
          paperKey(id),
          "pnode " + (released ? "public" : "topic"),
          '<span class="star" aria-hidden="true">' +
            (released ? "✦" : "◇") +
            '</span><span class="node-label">' +
            esc(l(item.short)) +
            "</span>",
          () => {
            if (state.paper === id) {
              shownCard = !shownCard;
              updateCard();
              relayout(false);
            } else window.explorePaper(id);
          },
        );
        paper.dataset.project = id;
        paper.setAttribute("aria-label", l(item.title));
        paper.setAttribute("aria-controls", "node-card");
      }
    });
  }
  function buildTrail() {
    const trail = $("#trail");
    const route = (text, hash) =>
      '<button type="button" data-route="' +
      hash +
      '">' +
      esc(text) +
      "</button>";
    const current = (text) =>
      '<span aria-current="location">' + esc(text) + "</span>";
    let crumbs = [];
    if (state.view === "fields") {
      if (!state.field) {
        trail.hidden = true;
        return;
      }
      crumbs = [route(t("fields"), "#atlas")];
      const d = fieldById[state.field];
      if (state.paper)
        crumbs.push(
          route(l(d.name), "#field/" + d.id),
          current(l(CAT[state.paper].short)),
        );
      else crumbs.push(current(l(d.name)));
    } else {
      crumbs = [route(t("fields"), "#atlas")];
      if (state.view !== "anthropology")
        crumbs.push(route(t("anthropology"), "#theory/anthropology"));
      crumbs.push(current(t(state.view)));
    }
    trail.hidden = false;
    trail.innerHTML = crumbs.join('<i aria-hidden="true">›</i>');
  }
  function neighbours(id) {
    return PAPER_RELATIONS.filter((r) => r.a === id || r.b === id);
  }
  function buildEdges() {
    edges = [];
    const domainEdge = (d, p) => ({
      from: fieldKey(d),
      to: paperKey(p),
      label: l(CAT[p].short),
      detail: l(CAT[p].relation),
      id: p,
    });
    if (state.paper) {
      edges.push(domainEdge(state.field, state.paper));
      for (const r of neighbours(state.paper)) {
        edges.push({
          from: paperKey(state.paper),
          to: paperKey(r.a === state.paper ? r.b : r.a),
          id: relationKey(r),
          label: l(r.label),
          detail: l(r.text),
          paper: true,
        });
      }
    } else if (state.field)
      edges = fieldById[state.field].papers.map((id) =>
        domainEdge(state.field, id),
      );
    $("#edges").innerHTML = edges
      .map(
        (e, i) =>
          '<g role="button" tabindex="0" class="edge ' +
          (e.paper ? "paper-edge" : "field-edge") +
          '" ' +
          (e.paper ? "data-pair" : "data-edge") +
          '="' +
          e.id +
          '" data-idx="' +
          i +
          '" aria-label="' +
          esc(e.label) +
          '"><path class="hit"/><path class="domain-link"/><path class="gleam" pathLength="100"/></g>',
      )
      .join("");
    edges.forEach((e, i) => {
      e.el = $("#edges").children[i];
      e.paths = [...e.el.children];
    });
  }
  function layout() {
    const w = stage.clientWidth,
      h = stage.clientHeight,
      small = mobile.matches;
    const points = {};
    const put = (k, x, y) => {
      points[k] = { x, y };
    };
    const cx = w / 2,
      cy = h * 0.46;
    let r = small
      ? Math.min(w * 0.306, h * 0.35)
      : Math.min(w * 0.248, h * 0.342);
    let x = cx,
      y = cy;
    const di = fields.findIndex((d) => d.id === state.field),
      a = ((di * 72 - 90) * Math.PI) / 180,
      ux = Math.cos(a),
      uy = Math.sin(a);
    if (state.field && !state.paper && !small) {
      r *= 0.83;
      x -= ux * Math.min(w * 0.075, 83);
      y -= uy * h * 0.115;
    }
    if (state.paper) {
      const parent = fieldKey(state.field),
        selected = paperKey(state.paper);
      const compact = w < 900,
        near = neighbours(state.paper);
      const parentY = small ? 44 : 56,
        centerY = small ? 158 : 195;
      put(parent, cx, parentY);
      put(selected, cx, centerY);
      const labelHeight =
        controls.get(selected).querySelector(".node-label").offsetHeight || 32;
      const cardTop = centerY + Math.max(50, labelHeight + 34);
      const readingHeight = shownCard ? card.offsetHeight : 0;
      const connectorSpace = compact ? 53 : 63;
      const peerY =
        cardTop +
        (compact
          ? readingHeight + connectorSpace
          : Math.min(95, readingHeight * 0.4) + 48);
      const lowerY = Math.max(
        cardTop + readingHeight + 54,
        peerY + (compact ? 100 : 85),
      );
      const minHeight =
        (near.length > 2 ? lowerY : Math.max(peerY, cardTop + readingHeight)) +
        110;
      stage.style.minHeight = Math.ceil(minHeight) + "px";
      near.forEach((rel, i) => {
        const id = rel.a === state.paper ? rel.b : rel.a;
        const spread = compact ? w * 0.265 : Math.min(w * 0.335, 425);
        const point =
          i === 2 ? [cx, lowerY] : [cx + (i === 0 ? -spread : spread), peerY];
        put(paperKey(id), ...point);
      });
    } else if (w < 820 && state.field) {
      put(fieldKey(state.field), cx, h * 0.21);
      const papers = fieldById[state.field].papers;
      papers.forEach((id, i) => {
        const locations =
          papers.length === 2
            ? [
                [0.255, 0.55],
                [0.745, 0.55],
              ]
            : [
                [0.195, 0.53],
                [0.5, 0.68],
                [0.805, 0.53],
              ];
        const [px, py] = locations[i];
        put(paperKey(id), w * px, h * py);
      });
    } else {
      put("core", x, y);
      fields.forEach((d, i) => {
        const ang = ((i * 72 - 90) * Math.PI) / 180;
        put(fieldKey(d.id), x + r * Math.cos(ang), y + r * Math.sin(ang));
      });
      if (state.field) {
        const d = fieldById[state.field],
          base = points[fieldKey(d.id)];
        d.papers.forEach((id, i) => {
          const s = d.papers.length === 2 ? (i - 0.5) * 1.55 : i - 1;
          const side = s * Math.min(w * 0.142, 153),
            out = Math.min(w * 0.17, 185);
          const px = base.x + ux * out - uy * side,
            py = base.y + uy * Math.min(h * 0.157, 100) + ux * side;
          put(paperKey(id), clamp(px, 88, w - 88), clamp(py, 25, h - 49));
        });
      }
    }
    return points;
  }
  function clearTip() {
    for (const e of edges) {
      e.el.classList.remove("hot");
      e.el.removeAttribute("aria-describedby");
    }
    tip.hidden = true;
    tip.removeAttribute("data-on");
  }
  function inStage(node) {
    const rect = node.getBoundingClientRect(),
      base = stage.getBoundingClientRect();
    return {
      left: rect.left - base.left,
      top: rect.top - base.top,
      right: rect.right - base.left,
      bottom: rect.bottom - base.top,
    };
  }
  function overlap(a, b) {
    return (
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
      Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    );
  }
  function positionBox(box, p, avoid = [], isTip = false) {
    const bw = box.offsetWidth,
      bh = box.offsetHeight,
      w = stage.clientWidth,
      h = stage.clientHeight;
    const spare = 14,
      gap = isTip ? 15 : 29;
    const choices = [
      [p.x - bw / 2, p.y + gap + 13],
      [p.x + gap, p.y - bh / 2],
      [p.x - gap - bw, p.y - bh / 2],
      [p.x - bw / 2, p.y - gap - bh],
    ];
    let best = null;
    for (const [dx, dy] of choices) {
      const left = clamp(
          dx,
          spare / 2,
          Math.max(spare / 2, w - bw - spare / 2),
        ),
        top = clamp(dy, 5, Math.max(5, h - bh - 5));
      const rect = { left, top, right: left + bw, bottom: top + bh };
      const score =
        avoid.reduce((n, a) => n + overlap(a, rect), 0) * 20 +
        Math.abs(left - dx) +
        Math.abs(top - dy);
      if (!best || score < best.score) best = { ...rect, score };
    }
    box.style.left = best.left + "px";
    box.style.top = best.top + "px";
    return best;
  }
  function showTip(e) {
    if (!e) return;
    clearTip();
    e.el.classList.add("hot");
    e.el.setAttribute("aria-describedby", "tip");
    tip.hidden = false;
    tip.dataset.on = e.id;
    tip.innerHTML = "<strong>" + esc(e.label) + "</strong> " + esc(e.detail);
    const a = positions[e.from],
      b = positions[e.to];
    if (!a || !b) return;
    const avoid = [];
    for (const [k, el] of controls)
      if (targets[k]) {
        avoid.push(inStage(el));
        const label = el.querySelector(".node-label");
        if (label) avoid.push(inStage(label));
      }
    if (!card.hidden) avoid.push(inStage(card));
    const path = e.paths[0],
      point = path.getPointAtLength(path.getTotalLength() * 0.63);
    positionBox(tip, point, avoid, true);
  }
  function updateCard() {
    card.hidden = !state.paper || !shownCard || state.view !== "fields";
    $("#callout-line").setAttribute("hidden", "");
    if (!state.paper) return;
    const id = state.paper,
      item = CAT[id],
      lens = lenses[id],
      pub = item.links.length > 0;
    controls.get(paperKey(id)).setAttribute("aria-expanded", String(shownCard));
    if (card.hidden) return;
    card.classList.toggle("topic", !pub);
    card.dataset.anchor = id;
    const primary = item.links
      .map(
        (v) =>
          '<a href="' +
          esc(v.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(l(v.label)) +
          "</a>",
      )
      .join("");
    const theory = lens
      ? '<a href="#theory/' +
        lens[0] +
        "/" +
        lens[1] +
        '">' +
        esc(l(lens[2])) +
        "</a>"
      : "";
    card.innerHTML =
      '<button class="card-close" type="button" aria-label="' +
      t("close") +
      '">×</button><h2 id="card-title">' +
      esc(l(item.title)) +
      "</h2>" +
      (pub
        ? "<p>" +
          esc(l(item.description)) +
          '</p><div class="card-links">' +
          primary +
          theory +
          "</div>"
        : "");
  }
  function placeCard() {
    if (card.hidden) return;
    const key = paperKey(state.paper),
      p = positions[key];
    if (!p) return;
    const label = controls.get(key).querySelector(".node-label");
    const top = p.y + Math.max(50, label.offsetHeight + 34);
    const left = clamp(
      p.x - card.offsetWidth / 2,
      7,
      stage.clientWidth - card.offsetWidth - 7,
    );
    card.style.left = left + "px";
    card.style.top = top + "px";
    const q = {
      left,
      top,
      right: left + card.offsetWidth,
      bottom: top + card.offsetHeight,
    };
    const bx = clamp(p.x, q.left, q.right),
      by = clamp(p.y, q.top, q.bottom);
    const line = $("#callout-line");
    line.removeAttribute("hidden");
    line.setAttribute("d", "M" + p.x + " " + p.y + " L" + bx + " " + by);
  }
  function draw(p) {
    positions = p;
    for (const [key, el] of controls) {
      const point = p[key];
      if (!point) continue;
      el.style.left = point.x + "px";
      el.style.top = point.y + "px";
    }
    for (const e of edges) {
      const a = p[e.from],
        b = p[e.to];
      if (!a || !b) continue;
      let d = "M" + a.x + " " + a.y + " L" + b.x + " " + b.y;
      if (e.paper && shownCard && !card.hidden && stage.clientWidth < 900) {
        const side =
          b.x < a.x || (b.x === a.x && edges.indexOf(e) % 2 === 0) ? -1 : 1;
        const offset = Math.min(
          stage.clientWidth / 2 - 5,
          card.offsetWidth / 2 + 17,
        );
        const lane = a.x + side * offset;
        d =
          "M" +
          a.x +
          " " +
          a.y +
          " Q" +
          lane +
          " " +
          a.y +
          " " +
          lane +
          " " +
          (a.y + 55) +
          " L" +
          lane +
          " " +
          (b.y - 30) +
          " Q" +
          lane +
          " " +
          b.y +
          " " +
          b.x +
          " " +
          b.y;
      }
      for (const path of e.paths) path.setAttribute("d", d);
    }
    const order = [0, 2, 4, 1, 3];
    const f = order.map((i) => p[fieldKey(fields[i].id)]);
    $("#pentagram").setAttribute(
      "d",
      f.every(Boolean)
        ? f.map((v, i) => (i ? "L" : "M") + v.x + " " + v.y).join(" ") + " Z"
        : "",
    );
  }
  function relayout(animate) {
    if (state.view !== "fields" || !stage.clientWidth) return;
    cancelAnimationFrame(frame);
    targets = layout();
    drawnWidth = stage.clientWidth;
    drawnHeight = stage.clientHeight;
    const start = {};
    for (const [key, el] of controls) {
      const point = targets[key],
        wasHidden = el.hidden;
      el.hidden = !point;
      if (!point) continue;
      const parent = el.dataset.project
        ? fieldKey(owner[el.dataset.project].id)
        : key;
      const origin =
        state.paper && el.dataset.project && el.dataset.project !== state.paper
          ? paperKey(state.paper)
          : parent;
      start[key] =
        positions[key] || positions[origin] || targets[origin] || point;
      if (wasHidden && animate && !reduced.matches)
        el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 370,
          easing: "ease-out",
        });
    }
    if (!animate || reduced.matches) {
      draw(targets);
      placeCard();
      return;
    }
    const began = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - began) / 430),
        ease = 1 - Math.pow(1 - progress, 3);
      const p = {};
      for (const [key, end] of Object.entries(targets)) {
        const s = start[key];
        p[key] = {
          x: s.x + (end.x - s.x) * ease,
          y: s.y + (end.y - s.y) * ease,
        };
      }
      draw(p);
      placeCard();
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  function render(animate = true) {
    cancelAnimationFrame(frame);
    pinnedEdge = null;
    clearTip();
    const theory = state.view !== "fields";
    $("#theory").hidden = !theory;
    stage.hidden = theory;
    $(".graph-tools").hidden = theory;
    $("#enter-theory").hidden = theory;
    buildTrail();
    if (theory) {
      card.hidden = true;
      window.renderTheory(lang, state.view, state.index);
      return;
    }
    if (!state.paper) stage.style.minHeight = "";
    stage.classList.toggle("has-branch", !!state.field);
    stage.classList.toggle("paper-focus", !!state.paper);
    $("#graph-guide").textContent = t(
      state.paper ? "compare" : state.field ? "pick" : "open",
    );
    $("#all-fields").hidden = !state.field;
    $("#all-fields").textContent = t("return");
    buildEdges();
    for (const [k, el] of controls) {
      if (el.dataset.domain) {
        const active = el.dataset.domain === state.field;
        el.setAttribute("aria-expanded", String(active));
        el.querySelector(".switch").textContent = active ? "−" : "+";
      }
      if (el.dataset.project) {
        const id = el.dataset.project;
        el.setAttribute(
          "aria-expanded",
          String(id === state.paper && shownCard),
        );
        const label = el.querySelector(".node-label");
        label.textContent = l(CAT[id].short);
        const link =
          state.paper &&
          neighbours(state.paper).find((r) => r.a === id || r.b === id);
        if (link && id !== state.paper) {
          const caption = document.createElement("small");
          caption.className = "relation-label";
          caption.textContent = l(link.label);
          label.append(caption);
        }
      }
    }
    updateCard();
    relayout(animate);
  }
  function applyRoute() {
    renderedLocation = location.href;
    const previous = state;
    state = parseRoute();
    shownCard = !!state.paper;
    render(!!previous);
    const focus = document.activeElement;
    if (!focus || focus === document.body || focus.closest("[hidden]")) {
      const node =
        state.view === "fields"
          ? controls.get(
              state.paper
                ? paperKey(state.paper)
                : state.field
                  ? fieldKey(state.field)
                  : "core",
            )
          : $("#theory-inner");
      if (previous && node) node.focus({ preventScroll: true });
    }
  }
  function translate() {
    document.documentElement.lang = lang ? "en" : "zh-Hans";
    document.title = t("title") + " · Cultural Constellations";
    document
      .querySelectorAll("[data-i]")
      .forEach((el) => (el.textContent = t(el.dataset.i)));
    $("#zh").setAttribute("aria-pressed", String(!lang));
    $("#en").setAttribute("aria-pressed", String(!!lang));
    stage.setAttribute("aria-label", t("graph"));
    map.setAttribute("aria-label", t("graph"));
    createNodes();
    render(false);
  }
  function setLanguage(n) {
    if (lang === n) return;
    lang = n;
    try {
      localStorage.setItem("atlas-language", lang ? "en" : "zh");
    } catch {}
    const u = new URL(location.href);
    u.searchParams.set("lang", lang ? "en" : "zh");
    history.replaceState(null, "", u);
    renderedLocation = location.href;
    if (state.view !== "fields") {
      const selected = $("#theory-inner .fw-control[aria-pressed=true]");
      if (selected) state.index = Number(selected.dataset.id);
    }
    translate();
  }
  $("#zh").onclick = () => setLanguage(0);
  $("#en").onclick = () => setLanguage(1);
  $("#all-fields").onclick = () => goField(null);
  $("#enter-theory").onclick = () => window.exploreView("anthropology", 1);
  $("#trail").onclick = (e) => {
    const b = e.target.closest("[data-route]");
    if (b) navigate(b.dataset.route);
  };
  card.onclick = (e) => {
    const link = e.target.closest('a[href^="#theory/"]');
    if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigate(link.getAttribute("href"));
      return;
    }
    if (e.target.closest(".card-close")) {
      shownCard = false;
      updateCard();
      relayout(false);
      controls.get(paperKey(state.paper)).focus({ preventScroll: true });
    }
  };
  const edgeAt = (el) => {
    const g = el.closest(".edge");
    return g ? edges[Number(g.dataset.idx)] : null;
  };
  map.addEventListener("pointerover", (e) => {
    const edge = edgeAt(e.target);
    if (edge && e.pointerType !== "touch") showTip(edge);
  });
  map.addEventListener("pointerout", (e) => {
    const edge = edgeAt(e.target);
    if (edge && !edge.el.contains(e.relatedTarget))
      pinnedEdge ? showTip(pinnedEdge) : clearTip();
  });
  map.addEventListener("focusin", (e) => showTip(edgeAt(e.target)));
  map.addEventListener("focusout", () =>
    pinnedEdge ? showTip(pinnedEdge) : clearTip(),
  );
  function toggleEdge(e) {
    if (!e) return;
    pinnedEdge = pinnedEdge === e ? null : e;
    pinnedEdge ? showTip(pinnedEdge) : clearTip();
  }
  map.addEventListener("click", (e) => toggleEdge(edgeAt(e.target)));
  map.addEventListener("keydown", (e) => {
    if ([" ", "Enter"].includes(e.key)) {
      e.preventDefault();
      toggleEdge(edgeAt(e.target));
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || state.view !== "fields") return;
    if (!tip.hidden) {
      pinnedEdge = null;
      clearTip();
    } else if (state.paper && shownCard) {
      shownCard = false;
      updateCard();
      relayout(false);
      controls.get(paperKey(state.paper)).focus({ preventScroll: true });
    } else if (state.field) goField(state.paper ? state.field : null);
  });
  stage.addEventListener("click", (e) => {
    if (!e.target.closest(".edge")) {
      pinnedEdge = null;
      clearTip();
    }
  });
  function restoreHistory() {
    if (renderedLocation === location.href) return;
    applyRoute();
  }
  window.addEventListener("popstate", restoreHistory);
  window.addEventListener("hashchange", restoreHistory);
  new ResizeObserver(() => {
    if (state?.view === "fields" && (stage.clientWidth !== drawnWidth || stage.clientHeight !== drawnHeight)) {
      clearTip();
      relayout(false);
    }
  }).observe(stage);
  reduced.addEventListener("change", () => {
    if (state?.view === "fields") relayout(false);
  });
  state = parseRoute();
  shownCard = !!state.paper;
  translate();
})();
