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
  const question = {
    museum: [
      "一张照片能告诉我们一件藏品来自哪里吗？",
      "What can one photograph tell us about an object’s origins?",
    ],
    rights: [
      "一件作品不断被复制，怎样追溯它的来源？",
      "As a work is copied, what can still be traced to its source?",
    ],
    calligraphy: [
      "当笔迹变成图像，哪些书写动作还能被看见？",
      "When handwriting becomes an image, which gestures remain visible?",
    ],
    music: [
      "同一段旋律，为什么会被听成不同的表达？",
      "How can the same melody carry different expressions?",
    ],
    translation: [
      "一个故事换一种语言，哪些文化含义容易改变？",
      "Which cultural meanings change when a story moves between languages?",
    ],
  };
  const tour = ["pothen", "polytropos", "diting"];
  const steps = {
    pothen: ["从照片辨认来源", "Read an object’s origins"],
    polytropos: ["从描述重建藏品", "Reconstruct an object"],
    diting: ["追踪翻译中的文化意义", "Trace meaning in translation"],
  };
  const ui = {
    fieldsNav: ["领域", "Fields"],
    papersNav: ["论文与主题", "Research index"],
    theoryNav: ["理论", "Theory"],
    changeField: ["切换领域", "Change field"],
    back: ["上一步", "Back"],
    lead: [
      "从{museum:一件藏品}、{calligraphy:一幅墨迹}或{music:一段旋律}出发，追踪文化意义如何改变。",
      "Begin with {museum:a museum object}, {calligraphy:a brushstroke} or {music:a melody}, and trace how its meaning changes.",
    ],
    start: ["开始论文导览", "Start the paper trail"],
    published: ["公开论文", "Public papers"],
    topic: ["研究主题", "Research topics"],
    connections: ["沿研究关联继续", "Follow a research connection"],
    tourName: ["三篇论文导览", "Three-paper trail"],
    free: ["退出导览", "Leave trail"],
    end: ["完成 · 浏览研究索引", "Finish · Browse the index"],
    allPapers: ["查看论文与主题", "Browse the research index"],
    concepts: ["循理论探索", "Explore the concepts"],
    prompt: [
      "点选徽记，展开该领域的研究",
      "Select an emblem to open its field",
    ],

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
    paperKind: ["公开论文", "Public paper"],
    topicKind: ["研究主题", "Research topic"],
    nextStop: ["下一篇 · ", "Next · "],
    tourKeys: ["← → 切换导览论文", "← → to move along the trail"],
    searchKey: ["论文与主题（快捷键 /）", "Research index (shortcut /)"],
    homeGuide: [
      "点选徽记展开，拖动漫游，滚轮、双指或双击缩放。",
      "Choose an emblem to explore. Drag to move • Scroll, pinch or double-click to zoom.",
    ],
    theoryGuide: [
      "点选理论节点，展开解释。",
      "Select a concept to unfold its explanation.",
    ],
    conceptGuide: [
      "触碰金线看关联，点相邻节点继续。",
      "Follow a gold line or select a neighbouring node.",
    ],
    paperGuide: [
      "点金线上的圆结阅读关联，或点相邻星点继续。",
      "Select a knot on a gold line to read a connection, or a neighbouring star to continue.",
    ],
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
    mast = $("#mast"),
    atlas = $("#atlas"),
    header = $(".head"),
    toolbar = $(".sky-controls"),
    tourBar = $("#guided-route"),
    sky = $(".night-sky"),
    map = $("#map"),
    layer = $("#nodes"),
    card = $("#node-card"),
    theory = $("#theory"),
    drawer = $("#index-drawer"),
    caption = $("#field-caption"),
    tip = $("#tip");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const concepts = ["anthropology", "disciplines", "processes", "ai"];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
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
  const fieldKey = (id) => "field-" + id,
    paperKey = (id) => "paper-" + id,
    theoryKey = (id) => "theory-" + id;
  const pairs = (id) => PAPER_RELATIONS.filter((r) => r.a === id || r.b === id);
  const other = (r, id) => (r.a === id ? r.b : r.a);
  const nodes = new Map(),
    links = new Map();
  let groups = new Set(),
    read = new Set(),
    theoryOpen = false,
    active = { kind: "home" },
    indexOpen = false,
    showNote = false;
  let camera = null,
    world = {},
    frame = 0,
    surfaceSize = "",
    pinned = null,
    previewKey = null,
    layoutResult = null,
    lastURL = location.href;
  let introDismissed = false;
  let insets = { left: 0, right: 0, top: 0, bottom: 0 };
  let homeInsets = {};
  const viewportInsets = () => insets;
  let noteSize = { w: 0, h: 0 },
    visibleKeys = new Set(),
    currentFocus = "core",
    lastTheory = null;
  const pointers = new Map();
  let drag = null,
    pinch = null;
  const ghostLinks = new Set();
  const arrivals = new WeakMap(),
    blooms = new WeakMap();
  let noteEntrance = null,
    captionEntrance = null,
    surfacing = [],
    travelling = false;
  const easeInOut = (u) =>
    u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
  const easeOut = (u) => 1 - Math.pow(1 - u, 3);
  const focusKey = (a) =>
    a.kind === "paper"
      ? paperKey(a.id)
      : a.kind === "field"
        ? fieldKey(a.id)
        : a.kind === "concept"
          ? theoryKey(a.id)
          : "core";
  const linkLabel = (a, b) => l(CAT[other(a, b)].short);
  function parse(hash) {
    const [kind, id, index] = hash.replace(/^#/, "").split("/");
    if (
      (kind === "paper" && owner[id]) ||
      (kind === "guide" && tour.includes(id))
    )
      return { kind: "paper", id, guided: kind === "guide" };
    if (kind === "field" && fieldById[id]) return { kind: "field", id };
    if (kind === "theory")
      return concepts.includes(id)
        ? {
            kind: "concept",
            id,
            index: /^[0-5]$/.test(index || "") ? +index : null,
          }
        : { kind: "theory" };
    return { kind: "home" };
  }
  function remember() {
    history.replaceState(
      {
        ...history.state,
        skyMap: {
          groups: [...groups],
          read: [...read],
          theoryOpen,
          active,
          showNote,
          indexOpen,
          introDismissed,
          camera: camera ? { ...camera } : null,
          size: stage.clientWidth + "x" + stage.clientHeight,
        },
      },
      "",
      location.href,
    );
  }
  function materialise(a) {
    if (a.kind === "field") groups.add(a.id);
    if (a.kind === "paper") {
      groups.add(owner[a.id].id);
      read.add(a.id);
    }
    if (a.kind === "theory" || a.kind === "concept") theoryOpen = true;
  }
  function navigate(hash) {
    if (hash === "#atlas") introDismissed = false;
    if (location.hash === hash) {
      if (hash === "#papers") {
        closeIndex();
        return;
      }
      showNote = ["paper", "concept"].includes(active.kind);
      update(true);
      return;
    }
    remember();
    history.pushState({ depth: (history.state?.depth || 0) + 1 }, "", hash);
    lastURL = location.href;
    indexOpen = hash === "#papers";
    if (!indexOpen) {
      active = parse(hash);
      materialise(active);
      showNote = ["concept", "paper"].includes(active.kind);
    }
    update(!indexOpen);
    if (indexOpen)
      drawer.querySelector("input")?.focus({ preventScroll: true });
  }
  function closeIndex() {
    if (!indexOpen) return;
    if (history.state?.depth > 0) {
      history.back();
      return;
    }
    indexOpen = false;
    active = { kind: "home" };
    history.replaceState(null, "", "#atlas");
    lastURL = location.href;
    update(true);
  }
  function restore() {
    if (lastURL === location.href) return;
    lastURL = location.href;
    const saved = history.state?.skyMap;
    if (saved) {
      groups = new Set(saved.groups);
      read = new Set(saved.read);
      theoryOpen = saved.theoryOpen;
      active = saved.active;
      introDismissed = !!saved.introDismissed;
      showNote = saved.showNote;
      indexOpen = saved.indexOpen;
    } else {
      introDismissed = false;
      indexOpen = location.hash === "#papers";
      active = parse(location.hash);
      materialise(active);
      showNote = ["paper", "concept"].includes(active.kind);
    }
    update(
      true,
      saved?.size === stage.clientWidth + "x" + stage.clientHeight
        ? saved.camera
        : null,
    );
  }
  window.explorePaper = (id) => {
    if (owner[id]) navigate("#paper/" + id);
  };
  window.exploreView = (view, idx = null) => {
    if (view === "fields") navigate("#atlas");
    else if (concepts.includes(view))
      navigate("#theory/" + view + (Number.isInteger(idx) ? "/" + idx : ""));
  };
  function makeNode(key, cls, action) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = cls;
    el.hidden = true;
    el.addEventListener("click", action);
    layer.append(el);
    nodes.set(key, el);
    return el;
  }
  function createNodes() {
    const core = makeNode("core", "foundation", () => navigate("#theory"));
    core.dataset.key = "core";
    for (const f of fields) {
      const el = makeNode(fieldKey(f.id), "dnode", () => {
        if (active.kind === "field" && active.id === f.id && groups.has(f.id)) {
          groups.delete(f.id);
          for (const p of f.papers) read.delete(p);
          navigate("#atlas");
          return;
        }
        navigate("#field/" + f.id);
      });
      el.dataset.domain = f.id;
      el.dataset.key = fieldKey(f.id);
      for (const id of f.papers) {
        const btn = makeNode(
          paperKey(id),
          "pnode " + (CAT[id].links.length ? "public" : "topic"),
          () => {
            if (active.kind === "paper" && active.id === id && !indexOpen) {
              showNote = !showNote;
              update(false);
            } else window.explorePaper(id);
          },
        );
        btn.dataset.project = id;
        btn.dataset.key = paperKey(id);
        btn.setAttribute("aria-controls", "node-card");
      }
    }
    for (const id of concepts) {
      const el = makeNode(theoryKey(id), "tnode", () => window.exploreView(id));
      el.dataset.concept = id;
      el.dataset.key = theoryKey(id);
      el.setAttribute("aria-controls", "theory");
    }
  }
  function translateStatic() {
    document.documentElement.lang = lang ? "en" : "zh-Hans";
    document.title = t("title") + " · Cultural Constellations";
    document
      .querySelectorAll("[data-i]")
      .forEach((el) => (el.textContent = t(el.dataset.i)));
    $("#en").setAttribute("aria-pressed", String(!!lang));
    $("#zh").setAttribute("aria-pressed", String(!lang));
    const title = lang
      ? "How Does AI <em>Interpret</em> and Reshape Culture?"
      : "AI 如何解读<br>并<em>重塑文化</em>？";
    $("#mast").innerHTML =
      '<h1 id="site-title">' +
      title +
      '</h1><p class="home-lead">' +
      esc(t("lead")).replace(
        /\{(\w+):([^}]+)\}/g,
        (_, id, words) =>
          '<a class="lead-link" href="#field/' +
          id +
          '" data-field="' +
          id +
          '">' +
          words +
          "</a>",
      ) +
      '</p><div class="start-row">' +
      route("#guide/pothen", t("start"), "primary-action") +
      "</div>";
    $("#zoom-in").setAttribute("aria-label", lang ? "Zoom in" : "放大");
    $("#zoom-out").setAttribute("aria-label", lang ? "Zoom out" : "缩小");
    $("#view-all").textContent = lang ? "Fit network" : "全景";
    // Shortcuts are announced where they act, and shown on hover.
    $("#zoom-in").title = (lang ? "Zoom in" : "放大") + " (+)";
    $("#zoom-out").title = (lang ? "Zoom out" : "缩小") + " (−)";
    $("#view-all").title =
      (lang ? "Show the whole network" : "显示完整图谱") + " (Home)";
    const indexLink = $('#explore-nav a[data-mode="papers"]');
    indexLink.title = t("searchKey");
    indexLink.setAttribute("aria-keyshortcuts", "/");
    tourBar.setAttribute("aria-label", t("tourName"));
    $("#trail").setAttribute(
      "aria-label",
      lang ? "Exploration path" : "探索路径",
    );
    $("#back-step").textContent = "‹ " + t("back");
    $("#back-step").setAttribute("aria-label", t("back"));
    drawer.querySelector("h2").textContent = t("papersNav");
    for (const b of document.querySelectorAll(".float-close")) {
      b.textContent = "×";
      b.setAttribute("aria-label", t("close"));
    }
    const core = nodes.get("core");
    core.innerHTML =
      "<b>" + t("foundation") + "</b><span>" + t("anthropology") + "</span>";
    for (const f of fields) {
      const el = nodes.get(fieldKey(f.id));
      el.setAttribute("aria-label", l(f.name));
      el.innerHTML =
        '<span class="coin"><img alt="" draggable="false" src="' +
        ART[f.art] +
        '"></span><span class="switch" aria-hidden="true"></span><span class="node-label"><b>' +
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
    for (const id of concepts) {
      const el = nodes.get(theoryKey(id));
      el.innerHTML =
        '<span class="theory-dot" aria-hidden="true"></span><span class="node-label">' +
        esc(t(id)) +
        "</span>";
      el.setAttribute("aria-label", t(id));
    }
    stage.setAttribute("aria-label", t("graph"));
    stage.tabIndex = 0;
  }
  function buildControls() {
    const activeField =
      active.kind === "paper" ? owner[active.id] : fieldById[active.id];
    const theoryFocus = ["theory", "concept"].includes(active.kind);
    const mode = indexOpen ? "papers" : theoryFocus ? "framework" : "fields";
    for (const b of document.querySelectorAll("#explore-nav a")) {
      if (b.dataset.mode === mode) b.setAttribute("aria-current", "location");
      else b.removeAttribute("aria-current");
    }
    const crumbs = [route("#atlas", t("fieldsNav"))];
    if (indexOpen) crumbs.push(esc(t("papersNav")));
    else if (activeField) {
      crumbs.push(
        active.kind === "paper"
          ? route("#field/" + activeField.id, l(activeField.name))
          : esc(l(activeField.name)),
      );
      if (active.kind === "paper") crumbs.push(esc(l(CAT[active.id].short)));
    } else if (theoryFocus) {
      if (active.kind === "concept")
        crumbs.push(route("#theory", t("theoryNav")), esc(t(active.id)));
      else crumbs.push(esc(t("theoryNav")));
    }
    $("#trail").innerHTML = crumbs.join('<i aria-hidden="true">/</i>');
    const back = $("#back-step");
    back.hidden = !(
      history.state?.depth ||
      active.kind !== "home" ||
      indexOpen
    );
    const guided = $("#guided-route");
    guided.hidden = !active.guided || indexOpen;
    $("#mast").querySelector(".start-row").hidden =
      !!active.guided && !indexOpen;
    if (active.guided && !indexOpen) {
      const i = tour.indexOf(active.id),
        next = tour[i + 1];
      guided.innerHTML =
        '<div class="tour-heading"><strong>' +
        t("tourName") +
        "</strong>" +
        route("#paper/" + active.id, t("free"), "leave-route") +
        '</div><div class="tour-links">' +
        tour
          .map(
            (id, n) =>
              '<a href="#guide/' +
              id +
              '" ' +
              (n === i ? 'aria-current="step"' : "") +
              '><span class="route-no">' +
              (n + 1) +
              "</span>" +
              esc(l(CAT[id].short)) +
              "</a>",
          )
          .join("<i></i>") +
        '</div><div class="tour-forward">' +
        route(
          next ? "#guide/" + next : "#papers",
          next
            ? (lang ? "Next · " : "下一篇 · ") + l(CAT[next].short)
            : t("end"),
          "next-stop",
        ) +
        "</div>";
    }
    $("#graph-guide").textContent =
      active.kind === "home"
        ? t("homeGuide")
        : active.kind === "field"
          ? t("pick")
          : active.kind === "theory"
            ? t("theoryGuide")
            : active.kind === "concept"
              ? t("conceptGuide")
              : active.guided && finePointer.matches
                ? t("paperGuide") + " " + t("tourKeys")
                : t("paperGuide");
    for (const f of fields) {
      const el = nodes.get(fieldKey(f.id));
      el.setAttribute("aria-expanded", String(groups.has(f.id)));
      el.querySelector(".switch").textContent = groups.has(f.id) ? "−" : "+";
      // A faint ring marks papers already opened in this visit.
      for (const id of f.papers)
        nodes
          .get(paperKey(id))
          .classList.toggle(
            "is-read",
            read.has(id) && !(active.kind === "paper" && active.id === id),
          );
    }
    for (const [key, el] of nodes) {
      const selected = key === focusKey(active);
      el.classList.toggle("is-focus", selected);
      if (el.matches(".pnode,.tnode"))
        el.setAttribute(
          "aria-expanded",
          String(selected && showNote && !indexOpen),
        );
    }
  }
  function renderNotes() {
    const paper = active.kind === "paper" && showNote && !indexOpen,
      concept = active.kind === "concept" && showNote && !indexOpen;
    card.hidden = !paper;
    theory.hidden = !concept;
    drawer.hidden = !indexOpen;
    if (indexOpen) {
      window.renderPaperIndex($("#paper-index"), lang, fields);
      return;
    }
    if (concept) {
      const stamp = [lang, active.id, active.index ?? ""].join("/");
      if (stamp !== lastTheory) {
        lastTheory = stamp;
        window.renderTheory(lang, active.id, active.index ?? null);
        theory.scrollTop = 0;
      }
    }
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
    // data-pair lets a hovered row light up its gold line in the sky.
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
          esc(linkLabel(r, id)) +
          "</b><span>" +
          esc(l(r.label)) +
          "</span></a>",
      )
      .join("");
    let trail = "";
    if (active.guided) {
      const i = tour.indexOf(id),
        prev = tour[i - 1],
        next = tour[i + 1];
      trail =
        '<nav class="card-tour" aria-label="' +
        esc(t("tourName")) +
        '"><span class="card-step">' +
        (i + 1) +
        " / " +
        tour.length +
        "</span>" +
        (prev
          ? route("#guide/" + prev, "‹ " + l(CAT[prev].short), "tour-prev")
          : "") +
        route(
          next ? "#guide/" + next : "#papers",
          next ? t("nextStop") + l(CAT[next].short) + " ›" : t("end"),
          "tour-next",
        ) +
        "</nav>";
    }
    card.dataset.anchor = id;
    card.classList.toggle("topic", !pub);
    card.innerHTML =
      '<button type="button" class="card-close" data-close="paper" aria-label="' +
      t("close") +
      '">×</button><p class="card-eyebrow">' +
      route("#field/" + home.id, l(home.name)) +
      "<span>" +
      esc(t(pub ? "paperKind" : "topicKind")) +
      '</span></p><h2 id="card-title">' +
      esc(l(item.title)) +
      "</h2>" +
      // Unpublished work shows only its topic; its links stay in the sky around it.
      (pub
        ? "<p>" +
          esc(l(item.description)) +
          '</p><div class="card-links">' +
          resources +
          (lens
            ? route(
                "#theory/" + lens[0] + "/" + lens[1],
                l(lens[2]),
                "card-lens",
              )
            : "") +
          '</div><nav class="follow-papers" aria-label="' +
          t("connections") +
          '"><strong>' +
          t("connections") +
          "</strong>" +
          follow +
          "</nav>" +
          trail
        : "");
    card.scrollTop = 0;
  }
  // A field's question surfaces beside its emblem, on the side facing the centre.
  function renderCaption() {
    const f =
      active.kind === "field" && !indexOpen ? fieldById[active.id] : null;
    caption.hidden = !f;
    if (f) caption.textContent = l(question[f.id]);
  }
  function placeCaption(screen, w, h) {
    if (caption.hidden) return;
    const key = fieldKey(active.id),
      p = screen[key],
      el = nodes.get(key);
    if (!p || !el || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
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
    const centre = screen.core || { x: w / 2, y: h / 2 };
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
    const ax = cx + dx * (exit + 16),
      ay = cy + dy * (exit + 16);
    const align = dx > 0.45 ? "left" : dx < -0.45 ? "right" : "center";
    if (caption.dataset.align !== align) {
      caption.dataset.align = align;
      caption.style.textAlign = align;
    }
    const cw = caption.offsetWidth,
      ch = caption.offsetHeight,
      room = readingBounds(w, h);
    // Lean the text away from the emblem: an edge touches the anchor unless the
    // direction is nearly perpendicular, in which case the text centres on it.
    const x = dx > 0.45 ? ax : dx < -0.45 ? ax - cw : ax - cw / 2;
    const y = dy > 0.45 ? ay : dy < -0.45 ? ay - ch : ay - ch / 2;
    caption.style.left =
      clamp(x, room.left, Math.max(room.left, room.right - cw)) + "px";
    caption.style.top =
      clamp(y, room.top, Math.max(room.top, room.bottom - ch)) + "px";
    caption.style.visibility = "";
  }
  const SVG = "http://www.w3.org/2000/svg";
  function svg(tag, attrs = {}) {
    const el = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }
  function graphLinks(keys) {
    const all = [];
    function add(a, b, id, title, detail, kind) {
      if (keys.has(a) && keys.has(b))
        all.push({ a, b, id, title, detail, kind });
    }
    for (const f of fields)
      for (const p of f.papers)
        add(
          fieldKey(f.id),
          paperKey(p),
          p,
          l(CAT[p].short),
          l(CAT[p].relation),
          "field",
        );
    for (const r of PAPER_RELATIONS)
      if (read.has(r.a) || read.has(r.b))
        add(
          paperKey(r.a),
          paperKey(r.b),
          r.a + "--" + r.b,
          l(r.label),
          l(r.text),
          "paper",
        );
    if (theoryOpen)
      for (const id of concepts)
        add(
          "core",
          theoryKey(id),
          "lens-" + id,
          t(id),
          t("concepts"),
          "theory",
        );
    if (active.kind === "concept" || theoryOpen)
      for (const id of read) {
        const lens = lenses[id];
        if (lens)
          add(
            paperKey(id),
            theoryKey(lens[0]),
            "theory-paper-" + id,
            l(lens[2]),
            l(CAT[id].short),
            "theory",
          );
      }
    return all;
  }
  function syncLinks(data, animate) {
    const retained = new Set(data.map((e) => e.id));
    for (const [id, e] of links)
      if (!retained.has(id)) {
        if (animate && !reduced.matches) {
          const path = e.ink.cloneNode();
          path.setAttribute("class", "folding-link");
          path.setAttribute("pathLength", "1");
          map.prepend(path);
          ghostLinks.add(path);
          const anim = path.animate(
            [
              { strokeDashoffset: 0, opacity: 0.7 },
              { strokeDashoffset: 1, opacity: 0 },
            ],
            { duration: 240, easing: "ease-in" },
          );
          anim.onfinish = () => {
            path.remove();
            ghostLinks.delete(path);
          };
        }
        e.group.remove();
        links.delete(id);
      }
    for (const dataLink of data) {
      let item = links.get(dataLink.id);
      if (!item) {
        const group = svg("g", {
          class: "edge " + dataLink.kind + "-edge",
          role: "button",
          tabindex: "0",
          "data-id": dataLink.id,
        });
        group.setAttribute(
          dataLink.kind === "paper" ? "data-pair" : "data-edge",
          dataLink.id,
        );
        const hit = svg("path", { class: "hit" }),
          ink = svg("path", { class: "domain-link" }),
          gleam = svg("path", { class: "gleam", pathLength: 100 }),
          spark = svg("circle", { class: "travel-light", r: 3 });
        group.append(hit, ink, gleam, spark);
        // A knot at the midpoint shows that a paper-to-paper line can be read.
        const knot =
          dataLink.kind === "paper"
            ? svg("circle", { class: "knot", r: 5.5 })
            : null;
        if (knot) group.append(knot);
        $("#edges").append(group);
        item = {
          group,
          hit,
          ink,
          gleam,
          spark,
          knot,
          ...dataLink,
          born: animate ? performance.now() : -10000,
        };
        links.set(dataLink.id, item);
      } else Object.assign(item, dataLink);
      item.group.setAttribute("aria-label", dataLink.title);
      item.group.classList.toggle(
        "focus-link",
        item.a === currentFocus || item.b === currentFocus,
      );
    }
  }
  function project(w, cam = camera) {
    return { x: w.x * cam.scale + cam.x, y: w.y * cam.scale + cam.y };
  }
  function readingBounds(w, h) {
    const cut = viewportInsets();
    const margin = 7;
    const left = clamp(cut.left + margin, 0, w - 1);
    const top = clamp(cut.top + margin, 0, h - 1);
    return {
      left,
      top,
      right: Math.max(left + 1, w - cut.right - margin),
      bottom: Math.max(top + 1, h - cut.bottom - margin),
    };
  }
  function overlaps(a, b, gap = 0) {
    return (
      a.left < b.right + gap &&
      a.right > b.left - gap &&
      a.top < b.bottom + gap &&
      a.bottom > b.top - gap
    );
  }
  function displayNote() {
    const el = !card.hidden ? card : !theory.hidden ? theory : null;
    const line = $("#callout-line");
    if (!el || !world[currentFocus]) {
      line.setAttribute("hidden", "");
      return;
    }
    const p = project(world[currentFocus]);
    const w = stage.clientWidth,
      h = stage.clientHeight;
    if (p.x < -9 || p.x > w + 9 || p.y < -12 || p.y > h) {
      el.style.visibility = "hidden";
      line.setAttribute("hidden", "");
      return;
    }
    const room = readingBounds(w, h);
    const usableWidth = room.right - room.left,
      usableHeight = room.bottom - room.top;
    const topic = el === card && el.classList.contains("topic");
    el.style.maxWidth =
      Math.floor(topic ? Math.min(380, usableWidth) : usableWidth) + "px";
    const width = el.offsetWidth;
    const gap = el === theory ? 42 : 40;
    const baseHeight = Math.min(
      usableHeight,
      el === theory ? Math.min(540, h * 0.71) : h * 0.67,
    );
    const naturalHeight = Math.min(
      baseHeight,
      el.scrollHeight + el.offsetHeight - el.clientHeight,
    );
    const below = room.bottom - p.y - gap,
      above = p.y - gap - room.top;
    const right = room.right - p.x - gap,
      left = p.x - gap - room.left;
    let side = "bottom",
      limit = baseHeight;
    if (below < naturalHeight) {
      if (above >= naturalHeight) side = "top";
      else if (Math.max(right, left) >= width)
        side = right >= left ? "right" : "left";
      else side = below >= above ? "bottom" : "top";
    }
    // Reserve a usable scroll viewport on a small phone even with the anchor near mid-screen.
    if (side === "top" || side === "bottom") {
      const slot = side === "top" ? above : below;
      const minimum = Math.min(usableHeight, el === theory ? 230 : 170);
      limit = Math.min(baseHeight, Math.max(minimum, slot));
    }
    el.style.maxHeight = Math.max(1, Math.floor(limit)) + "px";
    const height = el.offsetHeight;
    let x = p.x - width / 2;
    let y = side === "top" ? p.y - gap - height : p.y + gap;
    if (side === "left" || side === "right") {
      x = side === "left" ? p.x - gap - width : p.x + gap;
      y = p.y - height / 2;
    }
    x = clamp(x, room.left, Math.max(room.left, room.right - width));
    y = clamp(y, room.top, Math.max(room.top, room.bottom - height));
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.visibility = "";
    const rect = { left: x, right: x + width, top: y, bottom: y + height };
    const lineX = clamp(p.x, rect.left, rect.right),
      lineY = clamp(p.y, rect.top, rect.bottom);
    if (Math.hypot(lineX - p.x, lineY - p.y) < 2)
      line.setAttribute("hidden", "");
    else {
      line.removeAttribute("hidden");
      line.setAttribute("d", "M" + p.x + " " + p.y + "L" + lineX + " " + lineY);
    }
    return rect;
  }
  function syncPortals() {
    const nav = $("#portals");
    nav.replaceChildren();
    nav.setAttribute("aria-label", t("connections"));
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
      nav.append(a);
    }
  }
  function positionPortals(screen, w, h, note) {
    const portals = $("#portals").children,
      anchor = screen[currentFocus];
    if (!portals.length || !anchor) return;
    const room = readingBounds(w, h);
    const occupied = [
      {
        left: anchor.x - 56,
        right: anchor.x + 56,
        top: anchor.y - 16,
        bottom: anchor.y + 36,
      },
    ];
    if (note) occupied.push(note);
    for (const portal of portals) {
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
      if (
        !target ||
        (inRoom && !(note && overlaps(nodeRect, note))) ||
        anchor.x < 0 ||
        anchor.x > w ||
        anchor.y < 0 ||
        anchor.y > h
      ) {
        portal.hidden = true;
        continue;
      }
      portal.hidden = false;
      portal.style.width = "max-content";
      portal.style.maxWidth =
        Math.min(128, Math.floor(room.right - room.left)) + "px";
      const hw = portal.offsetWidth / 2,
        hh = portal.offsetHeight / 2;
      const xmin = room.left + hw,
        xmax = room.right - hw;
      const ymin = room.top + hh,
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
      const options = [
        ideal,
        { x: xmin, y: ymax },
        { x: xmax, y: ymax },
        { x: xmax, y: ymin },
      ];
      for (let y = ymin; y <= ymax; y += Math.max(12, hh))
        options.push({ x: xmin, y }, { x: xmax, y });
      for (let x = xmin; x <= xmax; x += Math.max(22, hw))
        options.push({ x, y: ymin }, { x, y: ymax });
      const d = (p) => Math.hypot(p.x - ideal.x, p.y - ideal.y);
      options.sort((a, b) => d(a) - d(b));
      const rect = (p) => ({
        left: p.x - hw,
        right: p.x + hw,
        top: p.y - hh,
        bottom: p.y + hh,
      });
      const pos = options.find((p) =>
        occupied.every((r) => !overlaps(rect(p), r, 5)),
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
  function paint(now = performance.now()) {
    const w = stage.clientWidth,
      h = stage.clientHeight,
      screen = {};
    if (sky && !reduced.matches) {
      const shift = (value) => (14 * Math.tanh(value / 460)).toFixed(2) + "px";
      sky.style.setProperty("--sky-pan-x", shift(camera.x - w / 2));
      sky.style.setProperty("--sky-pan-y", shift(camera.y - h / 2));
    }
    stage.classList.toggle("distant", camera.scale < 0.5);
    for (const [k, p] of Object.entries(world)) {
      const v = project(p);
      screen[k] = v;
      const el = nodes.get(k);
      if (!el) continue;
      el.style.transform =
        "translate3d(" +
        v.x.toFixed(2) +
        "px," +
        v.y.toFixed(2) +
        "px,0) translate(-50%,-50%)";
      el.tabIndex =
        visibleKeys.has(k) &&
        v.x >= 10 &&
        v.x < w - 10 &&
        v.y >= 8 &&
        v.y < h - 10
          ? 0
          : -1;
    }
    const vertices = [0, 2, 4, 1, 3].map((i) => screen[fieldKey(fields[i].id)]);
    if (vertices.every(Boolean))
      $("#pentagram").setAttribute(
        "d",
        vertices.map((v, i) => (i ? "L" : "M") + v.x + " " + v.y).join(" ") +
          "Z",
      );
    for (const e of links.values()) {
      const a = screen[e.a],
        b = screen[e.b];
      if (!a || !b) continue;
      const duration = reduced.matches ? 0 : 495,
        u = duration ? clamp((now - e.born) / duration, 0, 1) : 1;
      const direction = active.kind === "paper" && e.b === currentFocus,
        from = direction ? b : a,
        to = direction ? a : b;
      const tx = from.x + (to.x - from.x) * u,
        ty = from.y + (to.y - from.y) * u;
      const d = "M" + from.x + " " + from.y + "L" + tx + " " + ty;
      for (const path of [e.hit, e.ink, e.gleam]) path.setAttribute("d", d);
      e.spark.style.opacity = u < 1 ? Math.sin(Math.PI * u) : 0;
      e.spark.setAttribute("cx", tx);
      e.spark.setAttribute("cy", ty);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (e.knot) {
        e.knot.setAttribute("cx", mid.x);
        e.knot.setAttribute("cy", mid.y);
        e.knot.style.opacity = u < 1 ? 0 : "";
      }
      e.group.setAttribute(
        "tabindex",
        mid.x > 0 && mid.x < w && mid.y > 0 && mid.y < h ? "0" : "-1",
      );
    }
    const note = displayNote();
    positionPortals(screen, w, h, note);
    placeCaption(screen, w, h);
  }
  function clearTip() {
    pinned = null;
    previewKey = null;
    tip.hidden = true;
    tip.classList.remove("node-tip");
    for (const e of links.values()) {
      e.group.classList.remove("hot");
      e.group.removeAttribute("aria-describedby");
    }
  }
  function showTip(e, pin = false) {
    clearTip();
    if (!e || !world[e.a] || !world[e.b]) return;
    if (pin) pinned = e.id;
    e.group.classList.add("hot");
    e.group.setAttribute("aria-describedby", "tip");
    tip.innerHTML = "<strong>" + esc(e.title) + "</strong>" + esc(e.detail);
    const room = readingBounds(stage.clientWidth, stage.clientHeight);
    tip.style.maxWidth = Math.min(285, room.right - room.left) + "px";
    tip.style.maxHeight = Math.floor(room.bottom - room.top) + "px";
    tip.style.overflowY = "auto";
    tip.hidden = false;
    const width = tip.offsetWidth,
      height = tip.offsetHeight;
    const scrollable = pin && tip.scrollHeight > tip.clientHeight + 1;
    tip.style.pointerEvents = scrollable ? "auto" : "";
    tip.style.touchAction = scrollable ? "pan-y" : "";
    tip.tabIndex = scrollable ? 0 : -1;
    tip.onpointerdown = tip.onwheel = scrollable
      ? (event) => event.stopPropagation()
      : null;
    const a = project(world[e.a]),
      b = project(world[e.b]);
    const mid = {
      x: clamp((a.x + b.x) / 2, room.left, room.right),
      y: clamp((a.y + b.y) / 2, room.top, room.bottom),
    };
    const note = !card.hidden ? card : !theory.hidden ? theory : null;
    const avoid = [];
    const noteRect =
      note && note.style.visibility !== "hidden"
        ? {
            left: note.offsetLeft,
            right: note.offsetLeft + note.offsetWidth,
            top: note.offsetTop,
            bottom: note.offsetTop + note.offsetHeight,
          }
        : null;
    if (noteRect) avoid.push(noteRect);
    const around = (p, r) => ({
      left: p.x - r,
      right: p.x + r,
      top: p.y - r,
      bottom: p.y + r,
    });
    avoid.push(around(a, 22), around(b, 22), around(mid, 9));
    const candidates = [
      { x: mid.x - width / 2, y: mid.y - height - 10 },
      { x: mid.x - width / 2, y: mid.y + 10 },
      { x: mid.x + 12, y: mid.y - height / 2 },
      { x: mid.x - width - 12, y: mid.y - height / 2 },
    ];
    for (const f of [0.25, 0.75]) {
      const q = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
      candidates.push(
        { x: q.x - width / 2, y: q.y - height - 10 },
        { x: q.x - width / 2, y: q.y + 10 },
      );
    }
    if (noteRect) {
      const r = noteRect;
      candidates.push(
        { x: mid.x - width / 2, y: r.top - height - 6 },
        { x: mid.x - width / 2, y: r.bottom + 6 },
        { x: r.left - width - 6, y: mid.y - height / 2 },
        { x: r.right + 6, y: mid.y - height / 2 },
      );
    }
    const fits = candidates.map((p) => {
      const x = clamp(p.x, room.left, Math.max(room.left, room.right - width));
      const y = clamp(p.y, room.top, Math.max(room.top, room.bottom - height));
      return { left: x, right: x + width, top: y, bottom: y + height };
    });
    const pos =
      fits.find((r) => avoid.every((n) => !overlaps(r, n, 3))) || fits[0];
    tip.style.left = pos.left + "px";
    tip.style.top = pos.top + "px";
  }
  // Hovering a node previews what selecting it would open.
  function previewOf(key) {
    if (key === "core") return [t("foundation"), t("anthropology"), t("intro")];
    if (key.startsWith("field-")) {
      const f = fieldById[key.slice(6)];
      return f && [l(f.guardian), l(f.name), l(question[f.id])];
    }
    if (key.startsWith("paper-")) {
      const item = CAT[key.slice(6)];
      return (
        item && [
          t(item.links.length ? "paperKind" : "topicKind"),
          l(item.title),
          l(item.relation),
        ]
      );
    }
    return null;
  }
  function showPreview(el) {
    const key = el?.dataset.key;
    if (!key || key === previewKey || pinned || dragging || travelling) return;
    if (key === currentFocus && active.kind !== "home") return;
    const info = previewOf(key);
    if (!info) return;
    clearTip();
    previewKey = key;
    tip.classList.add("node-tip");
    tip.innerHTML =
      "<small>" +
      esc(info[0]) +
      "</small><strong>" +
      esc(info[1]) +
      "</strong>" +
      esc(info[2]);
    const room = readingBounds(stage.clientWidth, stage.clientHeight);
    tip.style.maxWidth = Math.min(300, room.right - room.left) + "px";
    tip.style.maxHeight = "";
    tip.style.overflowY = "";
    tip.style.pointerEvents = "";
    tip.tabIndex = -1;
    tip.hidden = false;
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
    const width = tip.offsetWidth,
      height = tip.offsetHeight,
      cx = (box.left + box.right) / 2,
      cy = (box.top + box.bottom) / 2;
    const note = !card.hidden ? card : !theory.hidden ? theory : null;
    const avoid = [box];
    if (note && note.style.visibility !== "hidden")
      avoid.push({
        left: note.offsetLeft,
        right: note.offsetLeft + note.offsetWidth,
        top: note.offsetTop,
        bottom: note.offsetTop + note.offsetHeight,
      });
    const fits = [
      { x: cx - width / 2, y: box.top - height - 8 },
      { x: cx - width / 2, y: box.bottom + 8 },
      { x: box.right + 10, y: cy - height / 2 },
      { x: box.left - width - 10, y: cy - height / 2 },
    ].map((p) => {
      const x = clamp(p.x, room.left, Math.max(room.left, room.right - width));
      const y = clamp(p.y, room.top, Math.max(room.top, room.bottom - height));
      return { left: x, right: x + width, top: y, bottom: y + height };
    });
    const pos =
      fits.find((r) => avoid.every((n) => !overlaps(r, n, 2))) || fits[0];
    tip.style.left = pos.left + "px";
    tip.style.top = pos.top + "px";
  }
  function hidePreview() {
    if (!previewKey) return;
    previewKey = null;
    tip.hidden = true;
    tip.classList.remove("node-tip");
  }
  // Rows in the reading surfaces light up the line and star they lead to.
  function linkPreview(target, on) {
    const row = target.closest?.("[data-paper],[data-field]");
    if (!row || row.closest("#theory")) return;
    if (row.dataset.field) {
      nodes
        .get(fieldKey(row.dataset.field))
        ?.classList.toggle("is-preview", on);
      return;
    }
    const id = row.dataset.paper;
    links.get(row.dataset.pair || id)?.group.classList.toggle("linked", on);
    nodes.get(paperKey(id))?.classList.toggle("is-preview", on);
  }
  function clearLinkPreviews() {
    for (const e of links.values()) e.group.classList.remove("linked");
    for (const n of nodes.values()) n.classList.remove("is-preview");
  }
  function noteMetrics() {
    const node = !card.hidden ? card : !theory.hidden ? theory : null;
    noteSize = node
      ? { w: node.offsetWidth, h: node.offsetHeight }
      : { w: 0, h: 0 };
  }
  function measureViewport() {
    const w = stage.clientWidth,
      h = stage.clientHeight;
    const headRect = header.getBoundingClientRect();
    const footRect = toolbar.getBoundingClientRect();
    const tourBottom = tourBar.hidden
      ? 0
      : tourBar.getBoundingClientRect().bottom;
    insets = {
      left: Math.min(16, headRect.left),
      right: Math.min(16, w - headRect.right),
      top: Math.ceil(Math.max(headRect.bottom, tourBottom) + 8),
      bottom: Math.ceil(h - footRect.top + 8),
    };
    const stacked = w <= 680 && h > w * 0.9;
    homeInsets = mast.inert
      ? {}
      : stacked
        ? { top: mast.offsetTop + mast.offsetHeight + 5 }
        : { left: Math.round(mast.offsetLeft + mast.offsetWidth * 0.77) };
    atlas.style.setProperty("--map-safe-top", insets.top + "px");
    atlas.style.setProperty("--map-safe-bottom", insets.bottom + "px");
    surfaceSize = [
      w,
      h,
      insets.top,
      insets.bottom,
      homeInsets.top || 0,
      homeInsets.left || 0,
    ].join("/");
  }
  function syncIntro() {
    const visible = active.kind === "home" && !indexOpen && !introDismissed;
    mast.inert = !visible;
    atlas.classList.toggle("has-intro", visible);
  }
  function dismissIntro() {
    if (mast.inert) return;
    introDismissed = true;
    syncIntro();
    measureViewport();
  }
  function compute() {
    const peers = new Set(read);
    for (const id of read) for (const r of pairs(id)) peers.add(other(r, id));
    return window.constellationSpace.layout({
      width: stage.clientWidth,
      height: stage.clientHeight,
      mobile: innerWidth <= 680,
      viewportInsets: viewportInsets(),
      homeInsets,
      fields,
      groups,
      peers,
      relations: PAPER_RELATIONS,
      focus: active,
      cardHeight: noteSize.h,
      theoryOpen,
    });
  }
  // A camera flight follows van Wijk and Nuij's smooth zoom: a long move widens
  // the view slightly, travels, then settles, so the visual centre glides.
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
      at = (t) => [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
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
      at = (t) => {
        const s = rho * t * S + r0;
        const u = (w0 / (rho2 * d1)) * (c0 * Math.tanh(s) - Math.sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, (w0 * c0) / Math.cosh(s)];
      };
    }
    const linear = (t) => ({
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t,
      scale: from.scale + (to.scale - from.scale) * t,
    });
    if (!Number.isFinite(S)) return { duration: 570, camAt: linear };
    return {
      duration: clamp((Math.abs(S) * 1000 * rho) / Math.SQRT2, 560, 1100),
      camAt(t) {
        if (t >= 1) return { ...to };
        const [cx, cy, width] = at(t),
          scale = W / width;
        const cam = { scale, x: W / 2 - cx * scale, y: H / 2 - cy * scale };
        return Number.isFinite(cam.x + cam.y + cam.scale) ? cam : linear(t);
      },
    };
  }
  function transition(animate, savedCamera = null, holdCamera = false) {
    cancelAnimationFrame(frame);
    const result = compute();
    layoutResult = result;
    currentFocus = focusKey(active);
    visibleKeys = new Set(Object.keys(result.points));
    const fromCam = camera ? { ...camera } : { ...result.camera },
      toCam =
        savedCamera === "fit"
          ? result.fitCamera
          : savedCamera || (holdCamera && camera ? camera : result.camera);
    const previous = world,
      starts = {},
      ends = {},
      leaving = [],
      delays = {},
      siblings = {};
    const path = flight(fromCam, toCam);
    for (const [k, node] of nodes) {
      if (visibleKeys.has(k)) {
        const parent = node.dataset.project
          ? fieldKey(owner[node.dataset.project].id)
          : "core";
        const bornAt =
          active.kind === "paper" &&
          node.dataset.project &&
          node.dataset.project !== active.id
            ? currentFocus
            : parent;
        starts[k] =
          previous[k] ||
          previous[bornAt] ||
          result.world[bornAt] ||
          result.world[k];
        ends[k] = result.world[k];
        node.hidden = false;
        node.inert = false;
        if (arrivals.has(node)) {
          arrivals.get(node).cancel();
          arrivals.delete(node);
        }
        blooms.get(node)?.cancel();
        if (!previous[k] && animate && !reduced.matches) {
          // Siblings unfold one after another rather than all at once.
          const order = (siblings[bornAt] = (siblings[bornAt] ?? -1) + 1);
          delays[k] = Math.min(0.3, order * 0.085);
          const delay = delays[k] * path.duration;
          arrivals.set(
            node,
            node.animate(
              [
                { opacity: 0, offset: 0 },
                { opacity: 0, offset: 0.11 },
                { opacity: 1 },
              ],
              { duration: 420, delay, fill: "backwards" },
            ),
          );
          const mark = node.querySelector(".coin,.star,.theory-dot");
          if (mark)
            blooms.set(
              node,
              mark.animate(
                [{ scale: 0.3 }, { scale: 1.14, offset: 0.68 }, { scale: 1 }],
                {
                  duration: 560,
                  delay,
                  easing: "cubic-bezier(.2,.7,.3,1)",
                  fill: "backwards",
                },
              ),
            );
        }
      } else if (previous[k] && animate && !reduced.matches) {
        const parent = node.dataset.project
          ? fieldKey(owner[node.dataset.project].id)
          : "core";
        starts[k] = previous[k];
        ends[k] = result.world[parent] || previous[k];
        leaving.push(k);
        node.inert = true;
        arrivals.get(node)?.cancel();
        arrivals.set(
          node,
          node.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            fill: "forwards",
          }),
        );
      } else node.hidden = true;
      if (visibleKeys.has(k))
        for (const anim of node.getAnimations())
          if (anim.playState === "finished") anim.cancel();
    }
    syncLinks(graphLinks(visibleKeys), animate);
    travelling = animate && !reduced.matches;
    if (!travelling) {
      camera = { ...toCam };
      world = Object.fromEntries(
        [...visibleKeys].map((k) => [k, result.world[k]]),
      );
      paint();
      return;
    }
    const began = performance.now(),
      duration = path.duration;
    function tick(now) {
      const u = clamp((now - began) / duration, 0, 1),
        e = easeInOut(u);
      camera = path.camAt(e);
      world = {};
      for (const [k, end] of Object.entries(ends)) {
        const s = starts[k],
          d = delays[k] || 0,
          v = leaving.includes(k)
            ? Math.min(1, u * 2.6)
            : k in delays
              ? easeOut(clamp((u - d) / (1 - d), 0, 1))
              : e;
        if (v === 1 && leaving.includes(k)) {
          nodes.get(k).hidden = true;
          continue;
        }
        world[k] = { x: s.x + (end.x - s.x) * v, y: s.y + (end.y - s.y) * v };
      }
      paint(now);
      if (u < 1) frame = requestAnimationFrame(tick);
      else travelling = false;
    }
    frame = requestAnimationFrame(tick);
  }
  function update(animate = true, savedCam = null) {
    clearTip();
    clearLinkPreviews();
    for (const g of ghostLinks) g.remove();
    ghostLinks.clear();
    atlas.dataset.focus = active.kind;
    atlas.classList.toggle("index-open", indexOpen);
    syncIntro();
    buildControls();
    renderCaption();
    renderNotes();
    measureViewport();
    noteMetrics();
    syncPortals();
    atlas.classList.toggle("reading", !!showNote && !indexOpen);
    transition(
      animate,
      savedCam,
      indexOpen || (!animate && !!camera && mast.inert),
    );
    const shown = !drawer.hidden
      ? drawer
      : !card.hidden
        ? card
        : !theory.hidden
          ? theory
          : null;
    noteEntrance?.cancel();
    captionEntrance?.cancel();
    for (const part of surfacing) part.cancel();
    surfacing = [];
    if (!animate || reduced.matches) return;
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
          : shown === theory
            ? theory.querySelectorAll(
                ".fw-modes,.fw-header,.fw-visual,.fw-companion",
              )
            : drawer.querySelectorAll(".drawer-heading,.pi-toolbar,.pi-group");
      parts.forEach((part, i) =>
        surfacing.push(
          part.animate(
            [
              { opacity: 0, translate: "0 9px", filter: "blur(2px)" },
              { opacity: 1, translate: "0 0", filter: "blur(0)" },
            ],
            {
              duration: 480,
              delay: 170 + Math.min(i, 6) * 70,
              easing: "cubic-bezier(.2,.7,.2,1)",
              fill: "backwards",
            },
          ),
        ),
      );
    }
    if (!caption.hidden)
      captionEntrance = caption.animate(
        [
          { opacity: 0, translate: "0 8px", filter: "blur(3px)" },
          { opacity: 1, translate: "0 0", filter: "blur(0)" },
        ],
        {
          duration: 640,
          delay: 320,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        },
      );
  }
  function stopTravel() {
    cancelAnimationFrame(frame);
    travelling = false;
    if (!layoutResult || !camera) return;
    world = Object.fromEntries(
      [...visibleKeys].map((k) => [k, world[k] || layoutResult.world[k]]),
    );
    for (const [k, n] of nodes) if (!visibleKeys.has(k)) n.hidden = true;
    for (const e of links.values()) e.born = -10000;
    clearTip();
  }
  function local(e) {
    const rect = stage.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function zoom(factor, at, smooth = false) {
    if (!camera) return;
    dismissIntro();
    stopTravel();
    const old = camera.scale,
      scale = clamp(old * factor, 0.23, 2.4),
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
  function fit() {
    if (!layoutResult) return;
    remember();
    showNote = false;
    indexOpen = false;
    active = { kind: "home" };
    introDismissed = !!(groups.size || read.size || theoryOpen);
    if (location.hash !== "#atlas") {
      history.pushState(
        { depth: (history.state?.depth || 0) + 1 },
        "",
        "#atlas",
      );
      lastURL = location.href;
    }
    update(true, introDismissed ? "fit" : null);
  }
  function setLanguage(n) {
    if (n === lang) return;
    if (active.kind === "concept") {
      const selected = theory.querySelector(".fw-control[aria-pressed=true]");
      if (selected) active.index = Number(selected.dataset.id);
    }
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
  function closeReading() {
    showNote = false;
    update(false);
    nodes.get(focusKey(active))?.focus({ preventScroll: true });
  }
  document.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close]");
    if (close) {
      if (close.dataset.close === "index") closeIndex();
      else closeReading();
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
    if (history.state?.depth) {
      history.back();
      return;
    }
    if (indexOpen) {
      closeIndex();
      return;
    }
    if (active.kind === "paper") navigate("#field/" + owner[active.id].id);
    else navigate("#atlas");
  };
  $("#view-all").onclick = fit;
  $("#zoom-in").onclick = () =>
    zoom(1.24, { x: stage.clientWidth / 2, y: stage.clientHeight / 2 }, true);
  $("#zoom-out").onclick = () =>
    zoom(
      1 / 1.24,
      { x: stage.clientWidth / 2, y: stage.clientHeight / 2 },
      true,
    );
  const getEdge = (target) => links.get(target.closest(".edge")?.dataset.id);
  map.addEventListener("pointerover", (e) => {
    const item = getEdge(e.target);
    if (item && e.pointerType !== "touch" && !travelling) showTip(item);
  });
  map.addEventListener("pointerout", (e) => {
    const item = getEdge(e.target);
    if (item && !item.group.contains(e.relatedTarget) && !pinned) clearTip();
  });
  map.addEventListener("focusin", (e) => {
    const edge = getEdge(e.target);
    if (edge) showTip(edge);
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
  for (const host of [card, mast, drawer, $("#portals")]) {
    host.addEventListener("pointerover", (e) => linkPreview(e.target, true));
    host.addEventListener("pointerout", (e) => linkPreview(e.target, false));
    host.addEventListener("focusin", (e) => linkPreview(e.target, true));
    host.addEventListener("focusout", (e) => linkPreview(e.target, false));
  }
  function pinchState() {
    const [a, b] = [...pointers.values()];
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  }
  let dragging = false,
    ignoreClick = false;
  const readingSurface = "#node-card,#theory,#index-drawer,#tip";
  function beginDrag() {
    if (dragging) return;
    dragging = true;
    ignoreClick = true;
    stopTravel();
    dismissIntro();
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
      const wasDragging = dragging;
      dragging = false;
      stage.classList.remove("dragging");
      if (
        wasDragging &&
        [...visibleKeys].some(
          (k) =>
            Math.abs((world[k]?.x ?? 0) - layoutResult.world[k].x) > 1 ||
            Math.abs((world[k]?.y ?? 0) - layoutResult.world[k].y) > 1,
        )
      )
        transition(true, { ...camera });
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
      dismissIntro();
      camera.x += directions[e.key][0];
      camera.y += directions[e.key][1];
      paint();
    } else if (["+", "=", "-"].includes(e.key)) {
      e.preventDefault();
      zoom(e.key === "-" ? 0.8 : 1.25, {
        x: stage.clientWidth / 2,
        y: stage.clientHeight / 2,
      });
    } else if (e.key === "Home") {
      e.preventDefault();
      fit();
    }
  });
  // Double-click the open sky to zoom in there; Shift + double-click zooms out.
  stage.addEventListener("dblclick", (e) => {
    if (e.target.closest(readingSurface + ",button,a,.edge")) return;
    e.preventDefault();
    zoom(e.shiftKey ? 1 / 1.6 : 1.6, local(e), true);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!tip.hidden) clearTip();
    else if (indexOpen) closeIndex();
    else if (showNote) closeReading();
  });
  // Shortcuts that work wherever the visitor is not typing or using a theory diagram.
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
    if (target === stage || target.closest(readingSurface + ",.fw")) return;
    if (["+", "=", "-"].includes(e.key)) {
      e.preventDefault();
      zoom(
        e.key === "-" ? 1 / 1.24 : 1.24,
        { x: stage.clientWidth / 2, y: stage.clientHeight / 2 },
        true,
      );
      return;
    }
    if (!active.guided || indexOpen) return;
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    const next = step && tour[tour.indexOf(active.id) + step];
    if (next) {
      e.preventDefault();
      navigate("#guide/" + next);
    }
  });
  window.addEventListener("pagehide", remember);
  window.addEventListener("popstate", restore);
  window.addEventListener("hashchange", restore);
  const viewportObserver = new ResizeObserver(() => {
    const previous = surfaceSize;
    measureViewport();
    if (previous !== surfaceSize) {
      noteMetrics();
      transition(false);
    }
  });
  for (const el of [stage, mast, header, toolbar, tourBar])
    viewportObserver.observe(el);
  // A theory selection can change the height of its anchored reading without moving the camera.
  const noteObserver = new ResizeObserver(() => {
    noteMetrics();
    if (camera) paint();
  });
  noteObserver.observe(card);
  noteObserver.observe(theory);
  reduced.addEventListener("change", () => transition(false));
  createNodes();
  translateStatic();
  active = parse(location.hash);
  materialise(active);
  indexOpen = location.hash === "#papers";
  showNote = ["paper", "concept"].includes(active.kind);
  update(false);
})();
