(() => {
  "use strict";

  // ── What the sky holds ─────────────────────────────────────────────────
  // Five constellations sit on the culture loop set out in the proposal:
  // understand and describe → retell → create → meet people → return.
  const fields = [
    {
      id: "museum",
      art: "athena",
      stage: 1,
      name: ["博物馆藏品", "Museum objects"],
      guardian: ["雅典娜与猫头鹰", "Athena & the owl"],
      step: ["理解与描述", "Understand & describe"],
      question: [
        "模型看到的是这一件藏品，还是它所属的类型？",
        "Does a model see this object, or only the type it belongs to?",
      ],
      lenses: ["disciplines/0", "disciplines/3", "processes/1"],
      papers: ["pothen", "polytropos"],
    },
    {
      id: "translation",
      art: "diting",
      stage: 2,
      name: ["翻译", "Translation"],
      guardian: ["谛听", "Dìtīng"],
      step: ["转述", "Retell"],
      question: [
        "AI 在文化之间转述时，保留的是具体的话语，还是它所属的类型？以谁的语言划分为准？",
        "When AI carries words between cultures, does it keep the particular utterance or only its type? Whose language draws the lines?",
      ],
      lenses: ["disciplines/2", "anthropology/1", "processes/4"],
      papers: ["diting", "revision", "languages"],
    },
    {
      id: "calligraphy",
      art: "fuxi",
      stage: 3,
      name: ["书法", "Calligraphy"],
      guardian: ["负屃", "Fùxì"],
      step: ["创作", "Create"],
      question: [
        "AI 写字时，是在再现已有文化的类型，还是回应这首诗、这件作品，产生新的文化？",
        "When AI writes, does it reproduce a cultural type, or answer this poem and this work and make new culture?",
      ],
      lenses: ["disciplines/1", "disciplines/4", "processes/5"],
      papers: ["composition", "handwriting"],
    },
    {
      id: "music",
      art: "qiuniu",
      stage: 4,
      name: ["音乐", "Music"],
      guardian: ["囚牛", "Qiúniú"],
      step: ["与人互动", "Meet the listener"],
      question: [
        "AI 能否把一首琵琶曲约定的情感与意象，变成听得到的演奏，并与人类演奏放在同一尺度上评价？",
        "Can AI turn the feeling and imagery a pipa piece carries into a performance we can hear, judged on the same scale as a human player?",
      ],
      lenses: ["disciplines/3", "disciplines/4", "processes/4"],
      papers: ["qiuniu", "interpretation", "instrumental"],
    },
    {
      id: "rights",
      art: "themis",
      stage: 5,
      name: ["版权与来源归属", "Copyright & provenance"],
      guardian: ["忒弥斯与天平", "Themis & the scales"],
      step: ["回流与归属", "Return & attribution"],
      question: [
        "一件作品被复制、引用、再训练之后，怎样追溯它由谁、从何而来？",
        "Once a work is copied, cited and trained on, how can we trace who made it and where it came from?",
      ],
      lenses: ["disciplines/1", "anthropology/1", "disciplines/0"],
      papers: ["motif", "provenance"],
    },
  ];
  // Each step of the loop hands something to the next.
  const LOOP = [
    {
      label: ["从描述到转述", "From describing to retelling"],
      text: [
        "只掌握“类型”的描述者，在文化之间转述时会保留什么？",
        "What does a describer that knows only the type keep when it carries words between cultures?",
      ],
    },
    {
      label: ["从转述到创作", "From retelling to making"],
      text: [
        "AI 不只转达已有的作品，还要回应一首诗、写出一幅字。",
        "AI no longer only passes works along; it answers a poem by writing it.",
      ],
    },
    {
      label: ["从笔迹到声音", "From the brush to the string"],
      text: [
        "意图怎样变成动作：毛笔的起、行、收，与琵琶的触弦，是同一个问题。",
        "How intention becomes movement: the start, travel and finish of a brushstroke and the touch on a pipa string pose the same question.",
      ],
    },
    {
      label: ["与人一同被聆听", "Heard alongside people"],
      text: [
        "AI 的作品与人类作品一同被聆听、学习；被引用与再训练时，由谁署名、从何而来？",
        "AI's works are heard and learned alongside human ones. When they are cited and trained on, who is credited, and where did they come from?",
      ],
    },
    {
      label: ["回到下一代模型", "Back to the next model"],
      text: [
        "AI 的产出被引用、学习、再训练，回到人类文化与下一代模型，又被用来描述文化：循环由此继续。",
        "Outputs are cited, learned from and trained on, returning to human culture and to the next models, which describe culture again.",
      ],
    },
  ];
  // The loop runs clockwise around the middle of the sky; papers fan outward.
  const PLACE = {
    loop: [0, 10],
    museum: [-430, -20],
    polytropos: [-600, -175],
    pothen: [-640, 115],
    translation: [-130, -270],
    diting: [-340, -400],
    revision: [-70, -470],
    languages: [140, -420],
    calligraphy: [300, -190],
    composition: [500, -330],
    handwriting: [575, -100],
    music: [320, 210],
    qiuniu: [575, 250],
    interpretation: [480, 425],
    instrumental: [235, 445],
    rights: [-80, 285],
    motif: [-330, 420],
    provenance: [-45, 490],
  };
  const lenses = {
    pothen: [
      "disciplines/5",
      ["从计算表征理解归属判断", "Explore computational representation"],
    ],
    polytropos: [
      "processes/4",
      ["哪些证据足以支持判断？", "What counts as evidence for a judgement?"],
    ],
    diting: [
      "disciplines/2",
      ["从语言学看隐含意义", "Explore implicit meaning in linguistics"],
    ],
  };
  const ui = {
    fieldsNav: ["五个领域", "Five fields"],
    theoryNav: ["理论与立场", "Theory & stance"],
    overview: ["全图", "Overview"],
    papersNav: ["论文与主题", "Papers & topics"],
    foundation: ["理论基础与立场", "Foundation & stance"],
    title: [
      "AI 如何解读<br>并<em>重塑文化</em>？",
      "How Does AI <em>Interpret</em> and Reshape Culture?",
    ],
    stance: [
      "AI 不只是记录文化的媒介。作为文化的新{field/museum:描述者}与新{field/calligraphy:创作者}，它正在成为编织{theory/anthropology/0:意义之网}的{theory/anthropology/1:行动者}。",
      "AI no longer only records culture. As its new {field/museum:describer} and {field/calligraphy:creator}, AI is becoming an {theory/anthropology/1:actor} in the {theory/anthropology/0:web of meaning}.",
    ],
    startLoop: ["沿文化循环探索", "Follow the culture loop"],
    loopName: ["文化循环", "The culture loop"],
    loopLine: [
      "AI 进入文化循环：理解、转述、创作、与人互动，再回到人类。",
      "AI enters a culture loop: understanding, retelling, creating, meeting people, and returning to them.",
    ],
    read: ["理论视角", "Read through"],
    next: ["下一环", "Next"],
    prev: ["上一环", "Back"],
    leave: ["退出循环", "Leave the loop"],
    lastStop: ["回到立场", "Back to the stance"],
    paperKind: ["公开论文", "Public paper"],
    topicKind: ["研究主题", "Research topic"],
    connections: ["沿研究关联继续", "Follow a research connection"],
    close: ["收起", "Close"],
    back: ["上一步", "Back"],
    theory: ["理论", "Theory"],
    graph: ["研究关系图谱", "Research connections"],
    guideHome: [
      "点选星座展开领域；拖动漫游，滚轮、双指或双击缩放。",
      "Select a constellation to open it. Drag to move • Scroll, pinch or double-click to zoom.",
    ],
    guideHomeTouch: [
      "轻点星座展开领域；拖动漫游，双指缩放。",
      "Tap a constellation to open it. Drag to move, pinch to zoom.",
    ],
    guideField: [
      "点选星点打开论文；金线悬停即可阅读。",
      "Select a star to open its paper; hover a gold line to read it.",
    ],
    guidePaper: [
      "点金线上的圆结阅读关联，或点相邻星点继续。",
      "Select a knot on a gold line to read a connection, or a neighbouring star to continue.",
    ],
    guideTheory: [
      "亮起的星座与这条理论相关，点选即可前往。",
      "The lit constellations draw on this idea; select one to go there.",
    ],
    guideTheoryPick: [
      "在左栏选一条理论，相关的星座会在这里亮起。",
      "Choose an idea in the foundation; the constellations it speaks to light up here.",
    ],
    tourKeys: ["← → 切换", "← → to move"],
    railOpen: ["展开理论基础与立场", "Open the foundation and stance"],
    railClose: ["收起理论", "Close the theory"],
    railTuck: ["收起侧栏", "Hide the side panel"],
    railShow: [
      "展开侧栏：理论基础与立场",
      "Show the side panel: foundation & stance",
    ],
  };

  // ── Shorthand ──────────────────────────────────────────────────────────
  const $ = (q) => document.querySelector(q);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const fieldById = Object.fromEntries(fields.map((f) => [f.id, f]));
  const owner = Object.fromEntries(
    fields.flatMap((f) => f.papers.map((p) => [p, f])),
  );
  const fieldKey = (id) => "field-" + id,
    paperKey = (id) => "paper-" + id;
  const keyId = (key) => key.replace(/^(field|paper)-/, "");
  const pairs = (id) => PAPER_RELATIONS.filter((r) => r.a === id || r.b === id);
  const other = (r, id) => (r.a === id ? r.b : r.a);
  const ring = (id) => fields.findIndex((f) => f.id === id);
  const nextField = (id) => fields[(ring(id) + 1) % fields.length];
  const prevField = (id) =>
    fields[(ring(id) + fields.length - 1) % fields.length];
  const mark = (f) => "①②③④⑤"[f.stage - 1];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const wide = matchMedia("(min-width: 900px)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const easeInOut = (u) =>
    u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;

  let lang = +!navigator.language.toLowerCase().startsWith("zh");
  try {
    const saved = localStorage.getItem("atlas-language");
    if (saved) lang = +(saved === "en");
  } catch {}
  const urlLang = new URL(location.href).searchParams.get("lang");
  if (["en", "zh"].includes(urlLang)) lang = +(urlLang === "en");
  const l = (pair) => pair[lang],
    t = (key) => l(ui[key]);
  const route = (hash, label, cls = "") =>
    '<a class="' + cls + '" href="' + esc(hash) + '">' + esc(label) + "</a>";
  // "{hash:words}" in a sentence becomes a link to that part of the map.
  const linked = (text) =>
    esc(text).replace(
      /\{([\w/]+):([^}]+)\}/g,
      (_, hash, words) =>
        '<a class="lead-link" href="#' +
        hash +
        '" data-target="' +
        hash +
        '">' +
        words +
        "</a>",
    );
  const theoryLabel = (lens) => {
    const [view, index] = lens.split("/");
    return window.theoryName?.(view, +index, lang) || view;
  };

  // ── Page parts ─────────────────────────────────────────────────────────
  const stage = $("#graph-scene"),
    atlas = $("#atlas"),
    header = $(".head"),
    rail = $("#foundation"),
    railScroll = $("#rail-scroll"),
    railHandle = $("#rail-handle"),
    toolbar = $(".sky-controls"),
    tourBar = $("#loop-tour"),
    sky = $(".night-sky"),
    map = $("#map"),
    layer = $("#nodes"),
    card = $("#node-card"),
    caption = $("#field-caption"),
    drawer = $("#index-drawer"),
    portals = $("#portals"),
    tip = $("#tip");

  // ── State ──────────────────────────────────────────────────────────────
  let active = { kind: "home" },
    showNote = false,
    indexOpen = false,
    railOpen = false,
    litPreview = null,
    camera = null,
    frame = 0,
    travelling = false,
    pinned = null,
    previewKey = null,
    tall = false,
    railStamp = "",
    railView = "stance",
    railIndex = null,
    revealTheory = false,
    railTucked = false,
    lastURL = location.href,
    noteEntrance = null,
    captionEntrance = null,
    surfacing = [];
  let world = {};
  const nodes = new Map(),
    links = new Map(),
    read = new Set();

  function placeWorld() {
    // A tall map turns the sky a quarter turn so the loop keeps its shape.
    world = {};
    for (const [id, [x, y]] of Object.entries(PLACE)) {
      const key =
        id === "loop" ? "loop" : fieldById[id] ? fieldKey(id) : paperKey(id);
      // Landscape skies are shallower than the plan, so the rows close up.
      world[key] = tall ? { x: -y * 0.92, y: x * 1.02 } : { x, y: y * 0.86 };
    }
  }

  // ── Nodes ──────────────────────────────────────────────────────────────
  function makeNode(key, cls) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = cls;
    el.dataset.key = key;
    layer.append(el);
    nodes.set(key, el);
    return el;
  }
  function createNodes() {
    makeNode("loop", "loopnode");
    for (const f of fields) {
      makeNode(fieldKey(f.id), "dnode").dataset.field = f.id;
      for (const id of f.papers) {
        const el = makeNode(
          paperKey(id),
          "pnode " + (CAT[id].links.length ? "public" : "topic"),
        );
        el.dataset.project = id;
      }
    }
    layer.addEventListener("click", (e) => {
      const el = e.target.closest("[data-key]");
      if (!el) return;
      const key = el.dataset.key;
      if (key === "loop") return navigate("#loop/" + fields[0].id);
      const id = keyId(key);
      if (key.startsWith("field-"))
        return navigate((active.loop ? "#loop/" : "#field/") + id);
      if (active.kind === "paper" && active.id === id && !indexOpen) {
        showNote = !showNote;
        update(false);
      } else navigate("#paper/" + id);
    });
  }

  // ── Lines ──────────────────────────────────────────────────────────────
  const SVG = "http://www.w3.org/2000/svg";
  function svg(tag, attrs = {}) {
    const el = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }
  function addLink(id, kind, a, b, words) {
    const group = svg("g", {
      class: "edge " + kind + "-edge",
      role: "button",
      tabindex: "-1",
      "data-id": id,
    });
    const hit = svg("path", { class: "hit" }),
      ink = svg("path", { class: "domain-link" }),
      gleam = svg("path", { class: "gleam", pathLength: 100 });
    group.append(hit, ink, gleam);
    const item = { id, kind, a, b, words, group, hit, ink, gleam };
    if (kind === "loop") {
      item.flow = svg("path", { class: "flow", pathLength: 1 });
      item.arrow = svg("path", { class: "arrow", d: "M-5 -4.5L2 0L-5 4.5" });
      group.insertBefore(item.flow, gleam);
      group.append(item.arrow);
    }
    if (kind === "relation") {
      item.knot = svg("circle", { class: "knot", r: 5.5 });
      group.append(item.knot);
    }
    $("#edges").append(group);
    links.set(id, item);
  }
  function createLinks() {
    fields.forEach((f, i) => {
      const n = fields[(i + 1) % fields.length];
      addLink("loop-" + f.id, "loop", fieldKey(f.id), fieldKey(n.id), () => [
        mark(f) + " → " + mark(n) + " · " + l(LOOP[i].label),
        l(LOOP[i].text),
      ]);
    });
    for (const f of fields)
      for (const p of f.papers)
        addLink("member-" + p, "member", fieldKey(f.id), paperKey(p), () => [
          l(CAT[p].short),
          l(CAT[p].relation),
        ]);
    for (const r of PAPER_RELATIONS)
      addLink(
        r.a + "--" + r.b,
        "relation",
        paperKey(r.a),
        paperKey(r.b),
        () => [l(r.label), l(r.text)],
      );
  }

  // ── Words ──────────────────────────────────────────────────────────────
  function translateStatic() {
    document.documentElement.lang = lang ? "en" : "zh-Hans";
    document.title =
      (lang
        ? "How Does AI Interpret and Reshape Culture?"
        : "AI 如何解读并重塑文化？") + " · Cultural Constellations";
    document
      .querySelectorAll("[data-i]")
      .forEach((el) => (el.textContent = t(el.dataset.i)));
    $("#en").setAttribute("aria-pressed", String(!!lang));
    $("#zh").setAttribute("aria-pressed", String(!lang));
    $("#rail-head").innerHTML =
      '<h1 id="site-title">' +
      t("title") +
      '</h1><p class="stance">' +
      linked(t("stance")) +
      '</p><p class="loop-line">' +
      esc(t("loopLine")) +
      '</p><div class="rail-actions">' +
      route("#loop/" + fields[0].id, t("startLoop"), "primary-action") +
      route("#papers", t("papersNav"), "secondary-action") +
      "</div>";
    railHandle.innerHTML =
      '<span class="handle-bar" aria-hidden="true"></span><span class="handle-text">' +
      esc(t("foundation")) +
      "</span>";
    $("#zoom-in").setAttribute("aria-label", lang ? "Zoom in" : "放大");
    $("#zoom-out").setAttribute("aria-label", lang ? "Zoom out" : "缩小");
    $("#zoom-in").title = (lang ? "Zoom in" : "放大") + " (+)";
    $("#zoom-out").title = (lang ? "Zoom out" : "缩小") + " (−)";
    $("#view-all").textContent = t("overview");
    $("#view-all").title =
      (lang ? "Show every constellation" : "显示全部星座") + " (Home)";
    const indexLink = $('#explore-nav a[data-mode="papers"]');
    indexLink.title =
      t("papersNav") + (lang ? " (shortcut /)" : "（快捷键 /）");
    indexLink.setAttribute("aria-keyshortcuts", "/");
    $("#back-step").textContent = "‹ " + t("back");
    for (const b of document.querySelectorAll(".float-close")) {
      b.textContent = "×";
      b.setAttribute("aria-label", t("close"));
    }
    const loop = nodes.get("loop");
    loop.innerHTML =
      '<span class="loop-glyph" aria-hidden="true">↻</span><span class="node-label">' +
      esc(t("loopName")) +
      "</span>";
    loop.setAttribute("aria-label", t("loopName") + " · " + t("startLoop"));
    for (const f of fields) {
      const el = nodes.get(fieldKey(f.id));
      el.setAttribute(
        "aria-label",
        mark(f) + " " + l(f.step) + " · " + l(f.name),
      );
      el.innerHTML =
        '<span class="coin"><img alt="" draggable="false" src="' +
        ART[f.art] +
        '"></span><span class="node-label"><em class="stage">' +
        mark(f) +
        " " +
        esc(l(f.step)) +
        "</em><b>" +
        esc(l(f.name)) +
        "</b><small>" +
        esc(l(f.guardian)) +
        "</small></span>";
      for (const id of f.papers) {
        const item = CAT[id],
          p = nodes.get(paperKey(id));
        p.setAttribute("aria-label", l(item.title));
        p.innerHTML =
          '<span class="star" aria-hidden="true">' +
          (item.links.length ? "✦" : "◇") +
          '</span><span class="node-label">' +
          esc(l(item.short)) +
          "</span>";
      }
    }
    stage.setAttribute("aria-label", t("graph"));
    stage.tabIndex = 0;
    railStamp = "";
  }

  // ── Routing ────────────────────────────────────────────────────────────
  function parse(hash) {
    const [kind, id, index] = hash.replace(/^#/, "").split("/");
    if ((kind === "paper" || kind === "guide") && owner[id])
      return { kind: "paper", id };
    if ((kind === "field" || kind === "loop") && fieldById[id])
      return { kind: "field", id, loop: kind === "loop" };
    if (kind === "theory") {
      const views = window.theoryViews || [];
      return {
        kind: "theory",
        view: views.includes(id) ? id : "stance",
        index: /^[0-5]$/.test(index || "") ? +index : null,
      };
    }
    return { kind: "home" };
  }
  function enter(hash) {
    indexOpen = hash === "#papers";
    if (!indexOpen) {
      active = parse(hash);
      showNote = active.kind === "paper";
      if (active.kind === "paper") read.add(active.id);
      // A view named without an item keeps the item last chosen in it.
      if (active.kind === "theory" && active.index === null)
        active.index = window.theorySelected?.(active.view) ?? null;
    }
    if (active.kind === "theory" && !indexOpen) {
      railOpen = true;
      railTucked = false;
      revealTheory = true;
    } else if (active.kind !== "home" || indexOpen) railOpen = false;
  }
  function navigate(hash) {
    if (location.hash === hash) {
      if (hash === "#papers") return closeIndex();
      if (active.kind === "paper") showNote = true;
      update(true);
      return;
    }
    history.pushState({ depth: (history.state?.depth || 0) + 1 }, "", hash);
    lastURL = location.href;
    enter(hash);
    update(true);
    if (indexOpen)
      drawer.querySelector("input")?.focus({ preventScroll: true });
  }
  function closeIndex() {
    if (!indexOpen) return;
    if (history.state?.depth > 0) return history.back();
    indexOpen = false;
    active = { kind: "home" };
    history.replaceState(null, "", "#atlas");
    lastURL = location.href;
    update(true);
  }
  function restore() {
    if (lastURL === location.href) return;
    lastURL = location.href;
    enter(location.hash);
    update(true);
  }
  window.explorePaper = (id) => owner[id] && navigate("#paper/" + id);
  window.exploreField = (id) => fieldById[id] && navigate("#field/" + id);
  window.exploreView = (view, idx = null) =>
    navigate("#theory/" + view + (Number.isInteger(idx) ? "/" + idx : ""));
  window.fieldName = (id, l2) => {
    const f = fieldById[id];
    return f ? mark(f) + " " + f.name[l2 === 1 ? 1 : 0] : id;
  };
  // A reader choosing an item in the theory rail moves the map's centre.
  window.onTheorySelect = (view, index) => {
    const hash = "#theory/" + view + "/" + index;
    railView = view;
    railIndex = index;
    railStamp = [lang, view, index].join("/");
    active = { kind: "theory", view, index };
    showNote = false;
    indexOpen = false;
    if (location.hash !== hash) {
      history.pushState({ depth: (history.state?.depth || 0) + 1 }, "", hash);
      lastURL = location.href;
    }
    update(true);
  };
  window.onTheoryHover = (view, index) => {
    litPreview = index === null ? null : new Set(theoryKeys(view, index));
    applyEmphasis();
  };
  function theoryKeys(view, index) {
    const ids = window.theoryFields?.(view, index) || [];
    return ids.flatMap((id) => [
      fieldKey(id),
      ...fieldById[id].papers.map(paperKey),
    ]);
  }

  // ── Rail ───────────────────────────────────────────────────────────────
  function syncRail() {
    if (active.kind === "theory" && !indexOpen) {
      railView = active.view;
      railIndex = active.index;
    }
    const stamp = [lang, railView, railIndex ?? ""].join("/");
    if (stamp !== railStamp) {
      const before = railScroll.scrollTop;
      railStamp = stamp;
      window.renderTheory(lang, railView, railIndex);
      // The theory re-renders in place; the reader's place in the rail stays.
      railScroll.scrollTop = before;
    }
    const tucked = railTucked && wide.matches;
    atlas.classList.toggle("rail-open", railOpen);
    atlas.classList.toggle("rail-tucked", tucked);
    rail.classList.toggle("is-open", railOpen);
    rail.classList.toggle("is-tucked", tucked);
    // Hidden content stays out of the keyboard's way.
    railScroll.inert = tucked;
    const label = wide.matches
      ? t(tucked ? "railShow" : "railTuck")
      : t(railOpen ? "railClose" : "railOpen");
    railHandle.setAttribute(
      "aria-expanded",
      String(wide.matches ? !tucked : railOpen),
    );
    railHandle.setAttribute("aria-label", label);
    railHandle.title = label;
  }
  // Bring the theory, and the first lines of its open reading, into view.
  function showTheory(animate) {
    const box = railScroll.getBoundingClientRect();
    const at = (el) =>
      el.getBoundingClientRect().top - box.top + railScroll.scrollTop;
    let top = at($(".rail-theory")) - 4;
    const reading = $("#fw-reading");
    if (reading && !reading.hidden) {
      const enough = at(reading) + Math.min(170, reading.offsetHeight);
      if (enough > top + railScroll.clientHeight)
        top = enough - railScroll.clientHeight;
    }
    railScroll.scrollTo({
      top: Math.max(0, top),
      behavior: animate && !reduced.matches ? "smooth" : "instant",
    });
  }

  // ── Controls ───────────────────────────────────────────────────────────
  function buildControls() {
    const mode = indexOpen
      ? "papers"
      : active.kind === "theory"
        ? "framework"
        : "fields";
    for (const b of document.querySelectorAll("#explore-nav a")) {
      if (b.dataset.mode === mode) b.setAttribute("aria-current", "location");
      else b.removeAttribute("aria-current");
    }
    const crumbs = [route("#atlas", t("overview"))];
    if (indexOpen) crumbs.push(esc(t("papersNav")));
    else if (active.kind === "field") {
      const f = fieldById[active.id];
      crumbs.push(esc(mark(f) + " " + l(f.name)));
    } else if (active.kind === "paper") {
      const f = owner[active.id];
      crumbs.push(
        route("#field/" + f.id, mark(f) + " " + l(f.name)),
        esc(l(CAT[active.id].short)),
      );
    } else if (active.kind === "theory")
      crumbs.push(
        esc(
          t("theory") +
            " · " +
            (Number.isInteger(active.index)
              ? window.theoryName?.(active.view, active.index, lang)
              : window.theoryName?.(active.view, null, lang) || ""),
        ),
      );
    $("#trail").innerHTML = crumbs.join('<i aria-hidden="true">/</i>');
    $("#back-step").hidden = !(
      history.state?.depth ||
      active.kind !== "home" ||
      indexOpen
    );
    $("#graph-guide").textContent =
      active.kind === "home"
        ? t(finePointer.matches ? "guideHome" : "guideHomeTouch")
        : active.kind === "field"
          ? t("guideField") +
            (active.loop && finePointer.matches ? " " + t("tourKeys") : "")
          : active.kind === "theory"
            ? theoryKeys(active.view, active.index).length
              ? t("guideTheory")
              : t("guideTheoryPick")
            : t("guidePaper");
    // The loop tour names every step and offers the next one.
    tourBar.hidden = !(active.kind === "field" && active.loop) || indexOpen;
    if (!tourBar.hidden) {
      const i = ring(active.id),
        next = fields[i + 1];
      tourBar.innerHTML =
        '<div class="tour-heading"><strong>' +
        esc(t("loopName")) +
        "</strong>" +
        route("#field/" + active.id, t("leave"), "leave-route") +
        '</div><div class="tour-links">' +
        fields
          .map(
            (f, n) =>
              '<a href="#loop/' +
              f.id +
              '" title="' +
              esc(mark(f) + " " + l(f.step) + " · " + l(f.name)) +
              '"' +
              (n === i ? ' aria-current="step"' : "") +
              '><span class="route-no">' +
              mark(f) +
              '</span><span class="route-label">' +
              esc(l(f.step)) +
              "</span></a>",
          )
          .join("<i></i>") +
        '</div><div class="tour-forward">' +
        route(
          next ? "#loop/" + next.id : "#theory/stance/2",
          next
            ? t("next") + " · " + mark(next) + " " + l(next.name)
            : t("lastStop"),
          "next-stop",
        ) +
        "</div>";
    }
  }

  // ── Notes ──────────────────────────────────────────────────────────────
  function renderCaption() {
    const f =
      active.kind === "field" && !indexOpen ? fieldById[active.id] : null;
    caption.hidden = !f;
    if (!f) return;
    const n = nextField(f.id),
      p = prevField(f.id),
      base = active.loop ? "#loop/" : "#field/";
    caption.innerHTML =
      '<p class="cap-stage">' +
      mark(f) +
      " " +
      esc(l(f.step)) +
      '</p><p class="cap-question">' +
      esc(l(f.question)) +
      '</p><p class="cap-lenses"><span>' +
      esc(t("read")) +
      "</span>" +
      f.lenses
        .map((lens) => route("#theory/" + lens, theoryLabel(lens), "cap-lens"))
        .join('<i aria-hidden="true">·</i>') +
      '</p><p class="cap-steps">' +
      route(base + p.id, "‹ " + mark(p) + " " + l(p.name), "cap-prev") +
      route(base + n.id, mark(n) + " " + l(n.name) + " ›", "cap-next") +
      "</p>";
  }
  function renderCard() {
    const paper = active.kind === "paper" && showNote && !indexOpen;
    card.hidden = !paper;
    if (!paper) return;
    const id = active.id,
      item = CAT[id],
      pub = item.links.length > 0,
      lens = lenses[id],
      home = owner[id];
    const resources = item.links
      .map(
        (v) =>
          '<a class="card-resource" href="' +
          esc(v.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(l(v.label)) +
          '<span aria-hidden="true"> ↗</span></a>',
      )
      .join("");
    const follow = pairs(id)
      .map(
        (r) =>
          '<a href="#paper/' +
          other(r, id) +
          '" data-paper="' +
          other(r, id) +
          '" data-pair="' +
          r.a +
          "--" +
          r.b +
          '"><b>' +
          esc(l(CAT[other(r, id)].short)) +
          "</b><span>" +
          esc(l(r.label)) +
          "</span></a>",
      )
      .join("");
    card.classList.toggle("topic", !pub);
    // Unpublished work shows only its topic; its links stay in the sky.
    card.innerHTML =
      '<button type="button" class="card-close" data-close="paper" aria-label="' +
      esc(t("close")) +
      '">×</button><p class="card-eyebrow">' +
      route("#field/" + home.id, mark(home) + " " + l(home.name)) +
      "<span>" +
      esc(t(pub ? "paperKind" : "topicKind")) +
      '</span></p><h2 id="card-title">' +
      esc(l(item.title)) +
      "</h2>" +
      (pub
        ? "<p>" +
          esc(l(item.description)) +
          '</p><div class="card-links">' +
          resources +
          (lens ? route("#theory/" + lens[0], l(lens[1]), "card-lens") : "") +
          '</div><nav class="follow-papers" aria-label="' +
          esc(t("connections")) +
          '"><strong>' +
          esc(t("connections")) +
          "</strong>" +
          follow +
          "</nav>"
        : "");
    card.scrollTop = 0;
  }
  function renderIndex() {
    drawer.hidden = !indexOpen;
    if (indexOpen) window.renderPaperIndex($("#paper-index"), lang, fields);
  }

  // ── Emphasis: what the current centre brings forward ───────────────────
  function emphasis() {
    const focus = new Set(),
      near = new Set();
    if (!indexOpen && active.kind === "field") {
      const f = fieldById[active.id];
      focus.add(fieldKey(f.id));
      for (const p of f.papers) {
        near.add(paperKey(p));
        for (const r of pairs(p)) near.add(paperKey(other(r, p)));
      }
      near.add(fieldKey(nextField(f.id).id));
      near.add(fieldKey(prevField(f.id).id));
    } else if (!indexOpen && active.kind === "paper") {
      focus.add(paperKey(active.id));
      near.add(fieldKey(owner[active.id].id));
      for (const r of pairs(active.id)) near.add(paperKey(other(r, active.id)));
    } else if (!indexOpen && active.kind === "theory")
      for (const k of theoryKeys(active.view, active.index)) focus.add(k);
    return { focus, near, lit: litPreview || new Set() };
  }
  function applyEmphasis() {
    const { focus, near, lit } = emphasis();
    const scoped = focus.size > 0;
    const shown = (k) => focus.has(k) || near.has(k);
    for (const [k, el] of nodes) {
      el.classList.toggle("is-focus", focus.has(k));
      el.classList.toggle("is-near", near.has(k));
      el.classList.toggle("is-lit", lit.has(k));
      el.classList.toggle(
        "is-far",
        k !== "loop" && scoped && !shown(k) && !lit.has(k),
      );
      if (el.dataset.project)
        el.classList.toggle(
          "is-read",
          read.has(el.dataset.project) && !focus.has(k),
        );
    }
    nodes.get("loop").classList.toggle("is-far", scoped);
    const fieldFocus = active.kind === "field" && !indexOpen ? active.id : null;
    for (const e of links.values()) {
      let state = "rest";
      if (scoped) {
        const touch = focus.has(e.a) || focus.has(e.b);
        const inField =
          fieldFocus &&
          e.kind === "relation" &&
          [e.a, e.b].some((k) => owner[keyId(k)]?.id === fieldFocus);
        const both = focus.has(e.a) && focus.has(e.b);
        state =
          touch || inField || (active.kind === "theory" && both)
            ? "near"
            : "far";
        if (active.kind === "theory" && !both) state = "far";
      }
      e.group.classList.toggle("is-near", state === "near");
      e.group.classList.toggle("is-far", state === "far");
      e.group.classList.toggle("is-lit", lit.has(e.a) && lit.has(e.b));
      e.group.setAttribute("aria-label", e.words()[0]);
    }
  }

  // ── Camera ─────────────────────────────────────────────────────────────
  function mapRect() {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    const top = Math.max(
      header.getBoundingClientRect().bottom,
      tourBar.hidden ? 0 : tourBar.getBoundingClientRect().bottom,
    );
    const left = !wide.matches
      ? 0
      : railTucked
        ? 30
        : rail.offsetLeft + rail.offsetWidth;
    const bottom = Math.min(
      toolbar.getBoundingClientRect().top,
      wide.matches ? h : rail.offsetTop,
      wide.matches || caption.hidden ? h : caption.offsetTop,
    );
    return {
      left: left + 12,
      right: w - 12,
      top: top + 10,
      bottom: Math.max(top + 60, bottom - 10),
    };
  }
  function frameKeys(keys, anchor, maxScale) {
    const r = mapRect();
    const pts = keys.map((k) => world[k]).filter(Boolean);
    const b = {
      left: Math.min(...pts.map((p) => p.x)),
      right: Math.max(...pts.map((p) => p.x)),
      top: Math.min(...pts.map((p) => p.y)),
      bottom: Math.max(...pts.map((p) => p.y)),
    };
    const phone = !wide.matches;
    const pad = {
      x: phone ? 46 : 84,
      top: phone ? 34 : 46,
      bottom: phone ? 52 : 74,
    };
    const left = r.left + pad.x,
      right = r.right - pad.x,
      top = r.top + pad.top,
      bottom = r.bottom - pad.bottom;
    const scale = clamp(
      Math.min(
        maxScale,
        (right - left) / Math.max(1, b.right - b.left),
        (bottom - top) / Math.max(1, b.bottom - b.top),
      ),
      0.18,
      2.4,
    );
    const centre = { x: (left + right) / 2, y: (top + bottom) / 2 };
    const a = anchor
      ? world[anchor]
      : {
          x: (b.left + b.right) / 2,
          y: (b.top + b.bottom) / 2,
        };
    return {
      scale,
      x: clamp(
        centre.x - scale * a.x,
        Math.min(left - b.left * scale, right - b.right * scale),
        Math.max(left - b.left * scale, right - b.right * scale),
      ),
      y: clamp(
        centre.y - scale * a.y,
        Math.min(top - b.top * scale, bottom - b.bottom * scale),
        Math.max(top - b.top * scale, bottom - b.bottom * scale),
      ),
    };
  }
  function targetCamera() {
    const phone = !wide.matches;
    if (!indexOpen && active.kind === "field") {
      const f = fieldById[active.id];
      const keys = [fieldKey(f.id)];
      for (const p of f.papers) {
        keys.push(paperKey(p));
        if (!phone) for (const r of pairs(p)) keys.push(paperKey(other(r, p)));
      }
      return frameKeys(keys, fieldKey(f.id), phone ? 0.95 : 1.12);
    }
    if (!indexOpen && active.kind === "paper") {
      const r = mapRect(),
        key = paperKey(active.id),
        p = world[key];
      const aw = r.right - r.left,
        ah = r.bottom - r.top;
      const scale = phone ? 0.9 : clamp(0.78 + aw * 0.00022, 0.9, 1.1);
      const cardHeight = card.hidden ? 0 : card.offsetHeight;
      const gap = phone ? 54 : 60;
      const y =
        r.top +
        Math.max(
          Math.min(34, ah * 0.12),
          Math.min(ah * 0.22, ah - cardHeight - gap - 12),
        );
      return { scale, x: r.left + aw / 2 - p.x * scale, y: y - p.y * scale };
    }
    if (!indexOpen && active.kind === "theory") {
      const keys = theoryKeys(active.view, active.index);
      if (keys.length) return frameKeys(keys, null, phone ? 0.9 : 1.05);
    }
    return frameKeys([...nodes.keys()], null, phone ? 0.8 : 1);
  }
  // A camera flight follows van Wijk and Nuij's smooth zoom: a long move
  // widens the view slightly, travels, then settles.
  function flight(from, to) {
    const W = stage.clientWidth || 1,
      H = stage.clientHeight || 1;
    const view = (c) => [
      (W / 2 - c.x) / c.scale,
      (H / 2 - c.y) / c.scale,
      W / c.scale,
    ];
    const [ux0, uy0, w0] = view(from),
      [ux1, uy1, w1] = view(to);
    const rho = 1.15,
      rho2 = rho * rho,
      rho4 = rho2 * rho2;
    const dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy;
    let S, at;
    if (d2 < 1e-6) {
      S = Math.log(w1 / w0) / rho;
      at = (s) => [ux0 + s * dx, uy0 + s * dy, w0 * Math.exp(rho * s * S)];
    } else {
      const d1 = Math.sqrt(d2),
        r0 = -Math.asinh(
          (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        ),
        r1 = -Math.asinh(
          (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        ),
        c0 = Math.cosh(r0);
      S = (r1 - r0) / rho;
      at = (s) => {
        const q = rho * s * S + r0;
        const u = (w0 / (rho2 * d1)) * (c0 * Math.tanh(q) - Math.sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, (w0 * c0) / Math.cosh(q)];
      };
    }
    const linear = (s) => ({
      x: from.x + (to.x - from.x) * s,
      y: from.y + (to.y - from.y) * s,
      scale: from.scale + (to.scale - from.scale) * s,
    });
    if (!Number.isFinite(S)) return { duration: 600, camAt: linear };
    return {
      duration: clamp((Math.abs(S) * 1000 * rho) / Math.SQRT2, 560, 1100),
      camAt(s) {
        if (s >= 1) return { ...to };
        const [cx, cy, width] = at(s),
          scale = W / width;
        const cam = { scale, x: W / 2 - cx * scale, y: H / 2 - cy * scale };
        return Number.isFinite(cam.x + cam.y + cam.scale) ? cam : linear(s);
      },
    };
  }
  function transition(animate, target = null, pace = {}) {
    cancelAnimationFrame(frame);
    const to = target || targetCamera();
    if (!camera || !animate || reduced.matches) {
      camera = to;
      travelling = false;
      paint();
      return;
    }
    const from = { ...camera },
      path = flight(from, to),
      began = performance.now();
    travelling = true;
    function tick(now) {
      const u = clamp((now - began) / (pace.duration || path.duration), 0, 1);
      camera = path.camAt((pace.ease || easeInOut)(u));
      paint();
      if (u < 1) frame = requestAnimationFrame(tick);
      else travelling = false;
    }
    frame = requestAnimationFrame(tick);
  }
  function stopTravel() {
    cancelAnimationFrame(frame);
    travelling = false;
    clearTip();
  }
  const project = (p) => ({
    x: p.x * camera.scale + camera.x,
    y: p.y * camera.scale + camera.y,
  });

  // ── Drawing ────────────────────────────────────────────────────────────
  // The control offset that lifts a straight line clear of each emblem it
  // would pass through (a quadratic curve moves 2t(1-t) of it at t).
  function bow(a, b, keep) {
    const dx = b.x - a.x,
      dy = b.y - a.y,
      len2 = dx * dx + dy * dy;
    if (len2 < 1) return 0;
    const len = Math.sqrt(len2),
      nx = -dy / len,
      ny = dx / len;
    let best = 0;
    for (const [p, r, drop] of keep) {
      if (!p) continue;
      const px = p.x,
        py = p.y + drop;
      const t = ((px - a.x) * dx + (py - a.y) * dy) / len2;
      if (t < 0.1 || t > 0.9) continue;
      const side = (px - a.x) * nx + (py - a.y) * ny;
      if (Math.abs(side) >= r) continue;
      const need =
        ((r - Math.abs(side)) * (side > 0 ? -1 : 1)) / (2 * t * (1 - t));
      if (Math.abs(need) > Math.abs(best)) best = need;
    }
    return clamp(best, -len * 0.6, len * 0.6);
  }
  function paint() {
    if (!camera) return;
    const w = stage.clientWidth,
      h = stage.clientHeight,
      screen = {};
    if (sky && !reduced.matches) {
      const shift = (v) => (14 * Math.tanh(v / 460)).toFixed(2) + "px";
      sky.style.setProperty("--sky-pan-x", shift(camera.x - w / 2));
      sky.style.setProperty("--sky-pan-y", shift(camera.y - h / 2));
    }
    stage.classList.toggle("distant", camera.scale < 0.5);
    stage.classList.toggle("far-off", camera.scale < 0.66);
    for (const [k, p] of Object.entries(world)) {
      const v = project(p);
      screen[k] = v;
      const el = nodes.get(k);
      el.style.transform =
        "translate3d(" +
        v.x.toFixed(2) +
        "px," +
        v.y.toFixed(2) +
        "px,0) translate(-50%,-50%)";
      el.tabIndex =
        v.x >= 10 && v.x < w - 10 && v.y >= 8 && v.y < h - 10 ? 0 : -1;
    }
    // Relation lines bow around the emblems they would cross, so no line
    // runs through a constellation it does not belong to.
    const keep = [[screen.loop, 92, 8]];
    for (const f of fields) keep.push([screen[fieldKey(f.id)], 62, 16]);
    for (const e of links.values()) {
      const a = screen[e.a],
        b = screen[e.b];
      let d = "M" + a.x + " " + a.y + "L" + b.x + " " + b.y,
        mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (e.kind === "relation") {
        const k = bow(a, b, keep);
        if (k) {
          const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
          const nx = -(b.y - a.y) / len,
            ny = (b.x - a.x) / len;
          const c = { x: mid.x + nx * k, y: mid.y + ny * k };
          d =
            "M" +
            a.x +
            " " +
            a.y +
            "Q" +
            c.x +
            " " +
            c.y +
            " " +
            b.x +
            " " +
            b.y;
          mid = { x: mid.x + (nx * k) / 2, y: mid.y + (ny * k) / 2 };
        }
      }
      e.mid = mid;
      e.hit.setAttribute("d", d);
      e.ink.setAttribute("d", d);
      e.gleam.setAttribute("d", d);
      if (e.flow) {
        e.flow.setAttribute("d", d);
        const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        const at = { x: a.x + (b.x - a.x) * 0.55, y: a.y + (b.y - a.y) * 0.55 };
        e.arrow.setAttribute(
          "transform",
          "translate(" + at.x + " " + at.y + ") rotate(" + angle + ")",
        );
      }
      if (e.knot) {
        e.knot.setAttribute("cx", mid.x);
        e.knot.setAttribute("cy", mid.y);
      }
      e.group.setAttribute(
        "tabindex",
        mid.x > 0 &&
          mid.x < w &&
          mid.y > 0 &&
          mid.y < h &&
          !e.group.classList.contains("is-far")
          ? "0"
          : "-1",
      );
    }
    const note = placeCard(screen, w, h);
    positionPortals(screen, w, h, note);
    placeCaption(screen, w, h);
  }
  function bounds(w, h) {
    const r = mapRect();
    return {
      left: clamp(r.left - 4, 0, w - 1),
      top: clamp(r.top - 4, 0, h - 1),
      right: Math.max(r.left + 1, r.right + 4),
      bottom: Math.max(r.top + 1, r.bottom + 4),
    };
  }
  const overlaps = (a, b, gap = 0) =>
    a.left < b.right + gap &&
    a.right > b.left - gap &&
    a.top < b.bottom + gap &&
    a.bottom > b.top - gap;
  function placeCard(screen, w, h) {
    const line = $("#callout-line");
    if (card.hidden || active.kind !== "paper") {
      line.setAttribute("hidden", "");
      return null;
    }
    const p = screen[paperKey(active.id)];
    if (!p || p.x < -9 || p.x > w + 9 || p.y < -12 || p.y > h) {
      card.style.visibility = "hidden";
      line.setAttribute("hidden", "");
      return null;
    }
    const room = bounds(w, h);
    const usableWidth = room.right - room.left,
      usableHeight = room.bottom - room.top;
    card.style.maxWidth =
      Math.floor(
        card.classList.contains("topic")
          ? Math.min(380, usableWidth)
          : usableWidth,
      ) + "px";
    const width = card.offsetWidth,
      gap = 40,
      baseHeight = Math.min(usableHeight, h * 0.67);
    const naturalHeight = Math.min(
      baseHeight,
      card.scrollHeight + card.offsetHeight - card.clientHeight,
    );
    const below = room.bottom - p.y - gap,
      above = p.y - gap - room.top,
      right = room.right - p.x - gap,
      left = p.x - gap - room.left;
    let side = "bottom",
      limit = baseHeight;
    if (below < naturalHeight) {
      if (above >= naturalHeight) side = "top";
      else if (Math.max(right, left) >= width)
        side = right >= left ? "right" : "left";
      else side = below >= above ? "bottom" : "top";
    }
    if (side === "top" || side === "bottom")
      limit = Math.min(
        baseHeight,
        Math.max(Math.min(usableHeight, 170), side === "top" ? above : below),
      );
    card.style.maxHeight = Math.max(1, Math.floor(limit)) + "px";
    const height = card.offsetHeight;
    let x = p.x - width / 2,
      y = side === "top" ? p.y - gap - height : p.y + gap;
    if (side === "left" || side === "right") {
      x = side === "left" ? p.x - gap - width : p.x + gap;
      y = p.y - height / 2;
    }
    x = clamp(x, room.left, Math.max(room.left, room.right - width));
    y = clamp(y, room.top, Math.max(room.top, room.bottom - height));
    card.style.left = x + "px";
    card.style.top = y + "px";
    card.style.visibility = "";
    const rect = { left: x, right: x + width, top: y, bottom: y + height };
    const lx = clamp(p.x, rect.left, rect.right),
      ly = clamp(p.y, rect.top, rect.bottom);
    if (Math.hypot(lx - p.x, ly - p.y) < 2) line.setAttribute("hidden", "");
    else {
      line.removeAttribute("hidden");
      line.setAttribute("d", "M" + p.x + " " + p.y + "L" + lx + " " + ly);
    }
    return rect;
  }
  // The question leans away from the emblem's papers, towards the loop's middle.
  function placeCaption(screen, w, h) {
    if (caption.hidden) return;
    if (!wide.matches) {
      caption.style.left = caption.style.top = caption.style.visibility = "";
      caption.dataset.align = "left";
      return;
    }
    const key = fieldKey(active.id),
      p = screen[key],
      el = nodes.get(key);
    if (!p || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
      caption.style.visibility = "hidden";
      return;
    }
    const r = el.offsetWidth / 2,
      label = el.querySelector(".node-label");
    const half = Math.max(r, (label?.offsetWidth || 0) / 2);
    const box = {
      left: p.x - half,
      right: p.x + half,
      top: p.y - r,
      bottom: Math.max(
        p.y + r,
        p.y - r + (label ? label.offsetTop + label.offsetHeight : 0),
      ),
    };
    const centre = screen.loop || { x: w / 2, y: h / 2 };
    let dx = centre.x - p.x,
      dy = centre.y - p.y;
    const length = Math.hypot(dx, dy);
    [dx, dy] = length < 1 ? [0, 1] : [dx / length, dy / length];
    const cx = (box.left + box.right) / 2,
      cy = (box.top + box.bottom) / 2;
    const exit = Math.min(
      Math.abs(dx) > 0.001 ? (box.right - cx) / Math.abs(dx) : Infinity,
      Math.abs(dy) > 0.001 ? (box.bottom - cy) / Math.abs(dy) : Infinity,
    );
    const ax = cx + dx * (exit + 18),
      ay = cy + dy * (exit + 18);
    const align = dx > 0.45 ? "left" : dx < -0.45 ? "right" : "center";
    if (caption.dataset.align !== align) caption.dataset.align = align;
    const cw = caption.offsetWidth,
      ch = caption.offsetHeight,
      room = bounds(w, h);
    const x = dx > 0.45 ? ax : dx < -0.45 ? ax - cw : ax - cw / 2;
    const y = dy > 0.45 ? ay : dy < -0.45 ? ay - ch : ay - ch / 2;
    caption.style.left =
      clamp(x, room.left, Math.max(room.left, room.right - cw)) + "px";
    caption.style.top =
      clamp(y, room.top, Math.max(room.top, room.bottom - ch)) + "px";
    caption.style.visibility = "";
  }
  // Connected papers that fall outside the view stay reachable at its edge.
  function syncPortals() {
    portals.replaceChildren();
    portals.setAttribute("aria-label", t("connections"));
    if (active.kind !== "paper" || indexOpen) return;
    for (const r of pairs(active.id)) {
      const id = other(r, active.id),
        a = document.createElement("a");
      a.className = "jump-node";
      a.dataset.jump = id;
      a.dataset.paper = id;
      a.dataset.pair = r.a + "--" + r.b;
      a.href = "#paper/" + id;
      a.textContent = l(CAT[id].short);
      a.setAttribute("aria-label", l(CAT[id].short) + " · " + l(r.label));
      a.hidden = true;
      portals.append(a);
    }
  }
  function positionPortals(screen, w, h, note) {
    const anchor = screen[paperKey(active.id)];
    if (!portals.children.length || !anchor) return;
    const room = bounds(w, h);
    const occupied = [
      {
        left: anchor.x - 56,
        right: anchor.x + 56,
        top: anchor.y - 16,
        bottom: anchor.y + 36,
      },
    ];
    if (note) occupied.push(note);
    for (const portal of portals.children) {
      const target = screen[paperKey(portal.dataset.jump)];
      const inRoom =
        target &&
        target.x >= room.left + 14 &&
        target.x <= room.right - 14 &&
        target.y >= room.top + 12 &&
        target.y <= room.bottom - 20;
      const nodeRect = target && {
        left: target.x - 14,
        right: target.x + 14,
        top: target.y - 11,
        bottom: target.y + 15,
      };
      if (!target || (inRoom && !(note && overlaps(nodeRect, note)))) {
        portal.hidden = true;
        continue;
      }
      portal.hidden = false;
      portal.style.maxWidth =
        Math.min(140, Math.floor(room.right - room.left)) + "px";
      const hw = portal.offsetWidth / 2,
        hh = portal.offsetHeight / 2;
      const xmin = room.left + hw,
        xmax = room.right - hw,
        ymin = room.top + hh,
        ymax = room.bottom - hh;
      if (xmax < xmin || ymax < ymin) {
        portal.hidden = true;
        continue;
      }
      const ax = clamp(anchor.x, xmin, xmax),
        ay = clamp(anchor.y, ymin, ymax);
      const dx = target.x - ax,
        dy = target.y - ay;
      const tx =
        dx > 0 ? (xmax - ax) / dx : dx < 0 ? (xmin - ax) / dx : Infinity;
      const ty =
        dy > 0 ? (ymax - ay) / dy : dy < 0 ? (ymin - ay) / dy : Infinity;
      const factor = Math.min(tx, ty);
      const ideal = Number.isFinite(factor)
        ? {
            x: clamp(ax + dx * factor, xmin, xmax),
            y: clamp(ay + dy * factor, ymin, ymax),
          }
        : { x: xmax, y: ay };
      const options = [ideal];
      for (let y = ymin; y <= ymax; y += Math.max(12, hh))
        options.push({ x: xmin, y }, { x: xmax, y });
      for (let x = xmin; x <= xmax; x += Math.max(22, hw))
        options.push({ x, y: ymin }, { x, y: ymax });
      const dist = (q) => Math.hypot(q.x - ideal.x, q.y - ideal.y);
      options.sort((a, b) => dist(a) - dist(b));
      const rect = (q) => ({
        left: q.x - hw,
        right: q.x + hw,
        top: q.y - hh,
        bottom: q.y + hh,
      });
      const pos = options.find((q) =>
        occupied.every((o) => !overlaps(rect(q), o, 5)),
      );
      if (!pos) {
        portal.hidden = true;
        continue;
      }
      occupied.push(rect(pos));
      portal.style.left = pos.x + "px";
      portal.style.top = pos.y + "px";
      portal.style.setProperty(
        "--bearing",
        Math.atan2(target.y - pos.y, target.x - pos.x) + "rad",
      );
    }
  }

  // ── Tips and previews ──────────────────────────────────────────────────
  function clearTip() {
    pinned = null;
    previewKey = null;
    tip.hidden = true;
    tip.classList.remove("node-tip");
    for (const e of links.values()) e.group.classList.remove("hot");
  }
  function placeTip(box, avoid) {
    const room = bounds(stage.clientWidth, stage.clientHeight);
    tip.style.maxWidth = Math.min(300, room.right - room.left) + "px";
    tip.hidden = false;
    const width = tip.offsetWidth,
      height = tip.offsetHeight,
      cx = (box.left + box.right) / 2,
      cy = (box.top + box.bottom) / 2;
    const fits = [
      { x: cx - width / 2, y: box.top - height - 10 },
      { x: cx - width / 2, y: box.bottom + 10 },
      { x: box.right + 12, y: cy - height / 2 },
      { x: box.left - width - 12, y: cy - height / 2 },
    ].map((p) => {
      const x = clamp(p.x, room.left, Math.max(room.left, room.right - width));
      const y = clamp(p.y, room.top, Math.max(room.top, room.bottom - height));
      return { left: x, right: x + width, top: y, bottom: y + height };
    });
    const pos =
      fits.find((r) => avoid.every((n) => !overlaps(r, n, 3))) || fits[0];
    tip.style.left = pos.left + "px";
    tip.style.top = pos.top + "px";
  }
  function noteRect() {
    if (card.hidden || card.style.visibility === "hidden") return null;
    return {
      left: card.offsetLeft,
      right: card.offsetLeft + card.offsetWidth,
      top: card.offsetTop,
      bottom: card.offsetTop + card.offsetHeight,
    };
  }
  function showTip(e, pin = false) {
    clearTip();
    if (pin) pinned = e.id;
    e.group.classList.add("hot");
    const [title, detail] = e.words();
    tip.innerHTML = "<strong>" + esc(title) + "</strong>" + esc(detail);
    const a = project(world[e.a]),
      b = project(world[e.b]);
    const mid = e.mid || { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const around = (p, r) => ({
      left: p.x - r,
      right: p.x + r,
      top: p.y - r,
      bottom: p.y + r,
    });
    const avoid = [around(a, 24), around(b, 24)];
    const note = noteRect();
    if (note) avoid.push(note);
    placeTip({ left: mid.x, right: mid.x, top: mid.y, bottom: mid.y }, avoid);
  }
  function previewOf(key) {
    if (key === "loop") return [t("loopName"), t("startLoop"), t("loopLine")];
    if (key.startsWith("field-")) {
      const f = fieldById[keyId(key)];
      return [mark(f) + " " + l(f.step), l(f.name), l(f.question)];
    }
    const item = CAT[keyId(key)];
    return [
      t(item.links.length ? "paperKind" : "topicKind"),
      l(item.title),
      l(item.relation),
    ];
  }
  function showPreview(el) {
    const key = el?.dataset.key;
    if (!key || key === previewKey || pinned || dragging || travelling) return;
    if (
      (active.kind === "field" && key === fieldKey(active.id)) ||
      (active.kind === "paper" && key === paperKey(active.id) && showNote)
    )
      return;
    const [kind, title, text] = previewOf(key);
    clearTip();
    previewKey = key;
    tip.classList.add("node-tip");
    tip.innerHTML =
      "<small>" +
      esc(kind) +
      "</small><strong>" +
      esc(title) +
      "</strong>" +
      esc(text);
    const s = stage.getBoundingClientRect();
    const box = {
      left: Infinity,
      right: -Infinity,
      top: Infinity,
      bottom: -Infinity,
    };
    for (const part of [el, el.querySelector(".node-label")]) {
      if (!part) continue;
      const r = part.getBoundingClientRect();
      box.left = Math.min(box.left, r.left - s.left);
      box.right = Math.max(box.right, r.right - s.left);
      box.top = Math.min(box.top, r.top - s.top);
      box.bottom = Math.max(box.bottom, r.bottom - s.top);
    }
    const avoid = [box];
    const note = noteRect();
    if (note) avoid.push(note);
    placeTip(box, avoid);
  }
  function hidePreview() {
    if (!previewKey) return;
    previewKey = null;
    tip.hidden = true;
    tip.classList.remove("node-tip");
  }
  function linkPreview(target, on) {
    const row = target.closest?.("[data-paper],[data-field],[data-target]");
    if (!row || row.closest("#theory-inner")) return;
    const ref = row.dataset.target;
    if (ref?.startsWith("field/") || row.dataset.field) {
      nodes
        .get(fieldKey(row.dataset.field || ref.slice(6)))
        ?.classList.toggle("is-lit", on);
      return;
    }
    if (ref) return;
    const id = row.dataset.paper;
    links
      .get(row.dataset.pair || "member-" + id)
      ?.group.classList.toggle("is-lit", on);
    nodes.get(paperKey(id))?.classList.toggle("is-lit", on);
  }

  // ── Measuring and updating ─────────────────────────────────────────────
  let surfaceSize = "";
  function measure() {
    const headBottom = Math.ceil(header.getBoundingClientRect().bottom);
    document.body.style.setProperty("--head-h", headBottom + 6 + "px");
    const sheet = wide.matches ? 0 : stage.clientHeight - rail.offsetTop;
    document.body.style.setProperty("--sheet-h", Math.max(0, sheet) + "px");
    const r = mapRect();
    const wasTall = tall;
    // On narrow screens the sky keeps one orientation while the sheet moves.
    tall = wide.matches
      ? (r.right - r.left) / Math.max(1, r.bottom - r.top) < 0.85
      : stage.clientWidth / Math.max(1, stage.clientHeight) < 0.85;
    if (tall !== wasTall || !Object.keys(world).length) placeWorld();
    // A thin band of sky (an open sheet) shows the stars without their words.
    stage.classList.toggle("cramped", r.bottom - r.top < 300);
    atlas.style.setProperty("--map-left", r.left - 12 + "px");
    atlas.style.setProperty("--map-safe-top", r.top - 10 + "px");
    atlas.style.setProperty(
      "--map-safe-bottom",
      stage.clientHeight - r.bottom - 10 + "px",
    );
    surfaceSize = [
      stage.clientWidth,
      stage.clientHeight,
      r.left,
      r.top,
      r.bottom,
      tall,
    ].join("/");
  }
  function update(animate = true) {
    clearTip();
    for (const e of links.values()) e.group.classList.remove("is-lit");
    for (const n of nodes.values()) n.classList.remove("is-lit");
    litPreview = null;
    atlas.dataset.focus = indexOpen ? "papers" : active.kind;
    atlas.classList.toggle("index-open", indexOpen);
    syncRail();
    buildControls();
    renderCaption();
    renderCard();
    renderIndex();
    syncPortals();
    applyEmphasis();
    measure();
    transition(animate);
    surface(animate);
    if (revealTheory) {
      revealTheory = false;
      showTheory(animate);
    }
  }
  function surface(animate) {
    noteEntrance?.cancel();
    captionEntrance?.cancel();
    for (const part of surfacing) part.cancel();
    surfacing = [];
    if (!animate || reduced.matches) return;
    const rise = [
      { opacity: 0, translate: "0 9px", filter: "blur(2px)" },
      { opacity: 1, translate: "0 0", filter: "blur(0)" },
    ];
    const shown = !drawer.hidden ? drawer : !card.hidden ? card : null;
    if (shown) {
      noteEntrance = shown.animate(
        [
          { opacity: 0, translate: "0 7px" },
          { opacity: 0, translate: "0 7px", offset: 0.24 },
          { opacity: 1, translate: "0 0" },
        ],
        { duration: 480, easing: "ease-out" },
      );
      const parts =
        shown === card
          ? card.querySelectorAll(":scope > :not(.card-close)")
          : drawer.querySelectorAll(".drawer-heading,.pi-toolbar,.pi-group");
      parts.forEach((part, i) =>
        surfacing.push(
          part.animate(rise, {
            duration: 480,
            delay: 170 + Math.min(i, 6) * 70,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          }),
        ),
      );
    }
    if (!caption.hidden)
      [...caption.children].forEach((part, i) =>
        surfacing.push(
          part.animate(rise, {
            duration: 560,
            delay: 300 + i * 90,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          }),
        ),
      );
  }

  // ── Camera controls ────────────────────────────────────────────────────
  function local(e) {
    const rect = stage.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function zoom(factor, at, smooth = false) {
    if (!camera) return;
    stopTravel();
    const old = camera.scale,
      scale = clamp(old * factor, 0.18, 2.4),
      ratio = scale / old;
    const dest = {
      x: at.x - (at.x - camera.x) * ratio,
      y: at.y - (at.y - camera.y) * ratio,
      scale,
    };
    if (smooth && !reduced.matches) transition(true, dest);
    else {
      camera = dest;
      paint();
    }
  }
  const centreOfMap = () => {
    const r = mapRect();
    return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
  };
  function overview() {
    if (location.hash !== "#atlas") return navigate("#atlas");
    active = { kind: "home" };
    indexOpen = false;
    update(true);
  }

  // ── Events ─────────────────────────────────────────────────────────────
  document.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close]");
    if (close) {
      if (close.dataset.close === "index") closeIndex();
      else {
        showNote = false;
        update(false);
        nodes.get(paperKey(active.id))?.focus({ preventScroll: true });
      }
      return;
    }
    const a = e.target.closest('a[href^="#"]');
    if (
      !a ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.metaKey
    )
      return;
    e.preventDefault();
    navigate(a.getAttribute("href"));
  });
  $("#zh").onclick = () => setLanguage(0);
  $("#en").onclick = () => setLanguage(1);
  $("#back-step").onclick = () => {
    if (history.state?.depth) return history.back();
    if (indexOpen) return closeIndex();
    if (active.kind === "paper") navigate("#field/" + owner[active.id].id);
    else navigate("#atlas");
  };
  $("#view-all").onclick = overview;
  $("#zoom-in").onclick = () => zoom(1.24, centreOfMap(), true);
  $("#zoom-out").onclick = () => zoom(1 / 1.24, centreOfMap(), true);
  railHandle.onclick = () => {
    if (wide.matches) railTucked = !railTucked;
    else railOpen = !railOpen;
    syncRail();
    measure();
    transition(true);
    if (!wide.matches && railOpen) showTheory(false);
  };
  function setLanguage(n) {
    if (n === lang) return;
    lang = n;
    try {
      localStorage.setItem("atlas-language", lang ? "en" : "zh");
    } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang ? "en" : "zh");
    history.replaceState(history.state, "", url);
    lastURL = location.href;
    translateStatic();
    update(false);
  }
  const getEdge = (target) => links.get(target.closest(".edge")?.dataset.id);
  map.addEventListener("pointerover", (e) => {
    const item = getEdge(e.target);
    if (
      item &&
      e.pointerType !== "touch" &&
      !travelling &&
      !item.group.classList.contains("is-far")
    )
      showTip(item);
  });
  map.addEventListener("pointerout", (e) => {
    const item = getEdge(e.target);
    if (item && !item.group.contains(e.relatedTarget) && !pinned) clearTip();
  });
  map.addEventListener("focusin", (e) => {
    const item = getEdge(e.target);
    if (item) showTip(item);
  });
  map.addEventListener("focusout", () => {
    if (!pinned) clearTip();
  });
  function toggleEdge(item) {
    if (!item) return;
    if (pinned === item.id) clearTip();
    else showTip(item, true);
  }
  map.addEventListener("click", (e) => toggleEdge(getEdge(e.target)));
  map.addEventListener("keydown", (e) => {
    if ([" ", "Enter"].includes(e.key)) {
      e.preventDefault();
      toggleEdge(getEdge(e.target));
    }
  });
  function trace(target, on) {
    const key = target.closest("[data-key]")?.dataset.key;
    if (!key) return;
    for (const e of links.values())
      if (e.a === key || e.b === key) e.group.classList.toggle("incident", on);
  }
  layer.addEventListener("pointerover", (e) => {
    trace(e.target, true);
    if (e.pointerType !== "touch") showPreview(e.target.closest("[data-key]"));
  });
  layer.addEventListener("pointerout", (e) => {
    trace(e.target, false);
    const el = e.target.closest("[data-key]");
    if (el && !el.contains(e.relatedTarget)) hidePreview();
  });
  layer.addEventListener("focusin", (e) => {
    trace(e.target, true);
    if (e.target.matches(":focus-visible"))
      showPreview(e.target.closest("[data-key]"));
  });
  layer.addEventListener("focusout", (e) => {
    trace(e.target, false);
    hidePreview();
  });
  for (const host of [card, caption, drawer, portals, $("#rail-head")]) {
    host.addEventListener("pointerover", (e) => linkPreview(e.target, true));
    host.addEventListener("pointerout", (e) => linkPreview(e.target, false));
    host.addEventListener("focusin", (e) => linkPreview(e.target, true));
    host.addEventListener("focusout", (e) => linkPreview(e.target, false));
  }

  const pointers = new Map();
  let drag = null,
    pinch = null,
    dragging = false,
    ignoreClick = false;
  const readingSurface = "#node-card,#index-drawer,#tip,#field-caption a";
  function pinchState() {
    const [a, b] = [...pointers.values()];
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  }
  function beginDrag() {
    if (dragging) return;
    dragging = true;
    ignoreClick = true;
    stopTravel();
    for (const id of pointers.keys()) stage.setPointerCapture(id);
    stage.classList.add("dragging");
    stage.focus({ preventScroll: true });
  }
  stage.addEventListener("pointerdown", (e) => {
    if (!pointers.size) ignoreClick = false;
    if (e.button !== 0 || e.target.closest(readingSurface)) return;
    const p = local(e);
    pointers.set(e.pointerId, p);
    drag = p;
    pinch = pointers.size === 2 ? pinchState() : null;
    if (pinch) beginDrag();
    else if (!e.target.closest("button,a,.edge"))
      stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    const p = local(e);
    if (!dragging && Math.hypot(p.x - drag.x, p.y - drag.y) < 5) return;
    beginDrag();
    pointers.set(e.pointerId, p);
    if (pointers.size === 2 && pinch) {
      const next = pinchState();
      zoom(next.distance / pinch.distance, pinch.mid);
      camera.x += next.mid.x - pinch.mid.x;
      camera.y += next.mid.y - pinch.mid.y;
      pinch = next;
    } else if (drag) {
      camera.x += p.x - drag.x;
      camera.y += p.y - drag.y;
    }
    drag = p;
    paint();
  });
  function release(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.delete(e.pointerId);
    pinch = null;
    drag = [...pointers.values()][0] || null;
    if (!drag) {
      dragging = false;
      stage.classList.remove("dragging");
    }
  }
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", release);
  stage.addEventListener("pointerout", (e) => {
    if (
      !dragging &&
      pointers.has(e.pointerId) &&
      !stage.contains(e.relatedTarget)
    )
      release(e);
  });
  stage.addEventListener(
    "click",
    (e) => {
      if (!ignoreClick || !e.detail) return;
      ignoreClick = false;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    true,
  );
  stage.addEventListener(
    "wheel",
    (e) => {
      if (e.target.closest(readingSurface)) return;
      e.preventDefault();
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? stage.clientHeight : 1;
      const speed = e.ctrlKey || e.metaKey ? 0.01 : 0.002;
      zoom(Math.exp(-clamp(e.deltaY * unit * speed, -0.7, 0.7)), local(e));
    },
    { passive: false },
  );
  stage.addEventListener("dblclick", (e) => {
    if (e.target.closest(readingSurface + ",button,a,.edge")) return;
    e.preventDefault();
    zoom(e.shiftKey ? 1 / 1.6 : 1.6, local(e), true);
  });
  stage.addEventListener("keydown", (e) => {
    if (e.target !== stage) return;
    const directions = {
      ArrowLeft: [55, 0],
      ArrowRight: [-55, 0],
      ArrowUp: [0, 55],
      ArrowDown: [0, -55],
    };
    if (directions[e.key]) {
      e.preventDefault();
      stopTravel();
      camera.x += directions[e.key][0];
      camera.y += directions[e.key][1];
      paint();
    } else if (["+", "=", "-"].includes(e.key)) {
      e.preventDefault();
      zoom(e.key === "-" ? 0.8 : 1.25, centreOfMap());
    } else if (e.key === "Home") {
      e.preventDefault();
      overview();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!tip.hidden) clearTip();
    else if (indexOpen) closeIndex();
    else if (showNote && active.kind === "paper") {
      showNote = false;
      update(false);
    } else if (railOpen && !wide.matches) {
      railOpen = false;
      syncRail();
      measure();
      transition(true);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = e.target instanceof Element ? e.target : document.body;
    if (target.closest("input,select,textarea,[contenteditable]")) return;
    if (e.key === "/") {
      e.preventDefault();
      if (indexOpen)
        drawer.querySelector("input")?.focus({ preventScroll: true });
      else navigate("#papers");
      return;
    }
    // The theory's own controls use the arrow keys; elsewhere they walk the loop.
    if (target === stage || target.closest(readingSurface + ",#theory-inner"))
      return;
    if (["+", "=", "-"].includes(e.key)) {
      e.preventDefault();
      zoom(e.key === "-" ? 1 / 1.24 : 1.24, centreOfMap(), true);
      return;
    }
    if (!(active.kind === "field" && active.loop) || indexOpen) return;
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const next = step && fields[ring(active.id) + step];
    if (next) {
      e.preventDefault();
      navigate("#loop/" + next.id);
    }
  });
  window.addEventListener("popstate", restore);
  window.addEventListener("hashchange", restore);
  const viewportObserver = new ResizeObserver(() => {
    const previous = surfaceSize;
    measure();
    if (previous !== surfaceSize) transition(travelling);
  });
  for (const el of [stage, header, toolbar, tourBar, rail])
    viewportObserver.observe(el);
  new ResizeObserver(() => camera && paint()).observe(card);
  reduced.addEventListener("change", () => transition(false));
  wide.addEventListener("change", () => {
    railOpen = false;
    syncRail();
    measure();
    transition(false);
  });

  // ── Entrance ───────────────────────────────────────────────────────────
  // The rail slides in and its words surface; the sky drifts closer while
  // the constellations light in the order of the culture loop, each
  // followed by its papers, then the lines between them, then the controls.
  function entrance() {
    document.documentElement.classList.remove("booting");
    if (reduced.matches || !camera) return;
    const soft = "cubic-bezier(.2,.7,.2,1)";
    const play = (el, from, delay, duration = 720, easing = soft) =>
      // A lone keyframe at offset 0 animates from it to the element's own style.
      el?.animate([{ ...from, offset: 0 }], {
        duration,
        delay,
        easing,
        fill: "backwards",
      });
    play(sky, { opacity: 0 }, 0, 1500, "ease-out");
    play(header, { opacity: 0 }, 260, 900);
    play(
      rail,
      { transform: wide.matches ? "translateX(-100%)" : "translateY(100%)" },
      120,
      1050,
      "cubic-bezier(.16,.84,.24,1)",
    );
    [...$("#rail-head").children, $(".rail-theory")].forEach((el, i) =>
      play(el, { opacity: 0, translate: "0 14px" }, 520 + i * 120, 780),
    );
    // The view starts a little farther out and settles on its frame.
    const target = targetCamera(),
      r = mapRect();
    const cx = (r.left + r.right) / 2,
      cy = (r.top + r.bottom) / 2,
      s0 = target.scale * 0.8;
    camera = {
      scale: s0,
      x: cx - ((cx - target.x) / target.scale) * s0,
      y: cy - ((cy - target.y) / target.scale) * s0,
    };
    paint();
    transition(true, target, {
      duration: 2100,
      ease: (u) => 1 - Math.pow(1 - u, 3),
    });
    const at = new Map();
    fields.forEach((f, i) => {
      const lit = 560 + i * 170;
      at.set(fieldKey(f.id), lit);
      f.papers.forEach((p, j) => at.set(paperKey(p), lit + 170 + j * 90));
    });
    at.set("loop", 560 + fields.length * 170 + 40);
    for (const [key, delay] of at) {
      const el = nodes.get(key);
      play(el, { opacity: 0 }, delay, 640, "ease-out");
      play(
        el.querySelector(".coin, .star, .loop-glyph"),
        { scale: 0.4 },
        delay,
        820,
        "cubic-bezier(.25,1.35,.35,1)",
      );
      play(
        el.querySelector(".node-label"),
        { opacity: 0, translate: "-50% 6px" },
        delay + 170,
        720,
      );
    }
    for (const e of links.values())
      play(
        e.group,
        { opacity: 0 },
        Math.max(at.get(e.a), at.get(e.b)) + 200,
        900,
        "ease-out",
      );
    const settled = 560 + fields.length * 170 + 420;
    const callout = $("#callout-line");
    for (const el of [
      toolbar,
      tourBar,
      caption,
      card,
      drawer,
      portals,
      callout,
    ])
      if (!el.hidden) play(el, { opacity: 0 }, settled, 760);
  }

  // ── Start ──────────────────────────────────────────────────────────────
  createNodes();
  createLinks();
  translateStatic();
  enter(location.hash);
  if (active.kind !== "theory") railOpen = false;
  measure();
  update(false);
  entrance();
})();
