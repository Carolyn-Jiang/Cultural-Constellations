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
      "模型从藏品照片中认出了什么？一件物品变成文字，再由文字重建时，什么被留下？沿三篇研究，追踪文化线索如何改变。",
      "What can a model recognise in a museum photograph? What survives when an object becomes a description and then an image again? Follow three studies through these changes in meaning.",
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
    layer = $("#nodes"),
    card = $("#node-card"),
    theory = $("#theory"),
    drawer = $("#index-drawer"),
    tip = $("#tip");
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
    layoutResult = null,
    lastURL = location.href;
  let noteSize = { w: 0, h: 0 },
    visibleKeys = new Set(),
    currentFocus = "core",
    lastTheory = null;
  const pointers = new Map();
  let drag = null,
    pinch = null;
  const ghostLinks = new Set();
  const arrivals = new WeakMap();
  let noteEntrance = null;
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
          camera: camera ? { ...camera } : null,
          size: surfaceSize,
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
    else if (
      innerWidth <= 680 &&
      stage.getBoundingClientRect().top > innerHeight * 0.68
    )
      stage.scrollIntoView({
        block: "start",
        behavior: reduced.matches ? "instant" : "smooth",
      });
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
      showNote = saved.showNote;
      indexOpen = saved.indexOpen;
    } else {
      indexOpen = location.hash === "#papers";
      active = parse(location.hash);
      materialise(active);
      showNote = ["paper", "concept"].includes(active.kind);
    }
    update(true, saved?.size === surfaceSize ? saved.camera : null);
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
      esc(t("lead")) +
      '</p><div class="start-row">' +
      route("#guide/pothen", t("start"), "primary-action") +
      "</div>";
    $("#home-paths").innerHTML =
      "<span>" +
      esc(t("concepts")) +
      "</span>" +
      concepts.map((v) => route("#theory/" + v, t(v))).join("");
    $("#zoom-in").setAttribute("aria-label", lang ? "Zoom in" : "放大");
    $("#zoom-out").setAttribute("aria-label", lang ? "Zoom out" : "缩小");
    $("#view-all").textContent = lang ? "Fit network" : "全景";
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
        ? lang
          ? "Select an emblem to branch out. Drag to explore."
          : "点选徽记延展分支，拖动画布探索。"
        : active.kind === "field"
          ? l(question[active.id])
          : active.kind === "theory"
            ? lang
              ? "Select a concept to unfold its explanation."
              : "点选理论节点，展开解释。"
            : lang
              ? "Follow a gold line or select a neighbouring node."
              : "触碰金线看关联，点相邻节点继续。";
    for (const f of fields) {
      const el = nodes.get(fieldKey(f.id));
      el.setAttribute("aria-expanded", String(groups.has(f.id)));
      el.querySelector(".switch").textContent = groups.has(f.id) ? "−" : "+";
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
      lens = lenses[id];
    const resources = item.links
      .map(
        (v) =>
          '<a href="' +
          esc(v.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          esc(l(v.label)) +
          "</a>",
      )
      .join("");
    const follow = pairs(id)
      .map(
        (r) =>
          '<a href="#paper/' +
          other(r, id) +
          '"><b>' +
          esc(linkLabel(r, id)) +
          "</b><span>" +
          esc(l(r.label)) +
          "</span></a>",
      )
      .join("");
    card.dataset.anchor = id;
    card.classList.toggle("topic", !pub);
    card.innerHTML =
      '<button type="button" class="card-close" data-close="paper" aria-label="' +
      t("close") +
      '">×</button><h2 id="card-title">' +
      esc(l(item.title)) +
      "</h2>" +
      (pub
        ? "<p>" +
          esc(l(item.description)) +
          '</p><div class="card-links">' +
          resources +
          (lens
            ? route("#theory/" + lens[0] + "/" + lens[1], l(lens[2]))
            : "") +
          '</div><nav class="follow-papers" aria-label="' +
          t("connections") +
          '"><strong>' +
          t("connections") +
          "</strong>" +
          follow +
          "</nav>"
        : "");
    card.scrollTop = 0;
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
        $("#edges").append(group);
        item = {
          group,
          hit,
          ink,
          gleam,
          spark,
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
  function displayNote() {
    const el = !card.hidden ? card : !theory.hidden ? theory : null,
      line = $("#callout-line");
    if (!el || !world[currentFocus]) {
      line.setAttribute("hidden", "");
      return;
    }
    const p = project(world[currentFocus]),
      w = stage.clientWidth,
      h = stage.clientHeight;
    if (p.x < -9 || p.x > w + 9 || p.y < -12 || p.y > h) {
      el.style.visibility = "hidden";
      line.setAttribute("hidden", "");
      return;
    }
    el.style.visibility = "";
    const gap = el === theory ? 46 : 43;
    const x = clamp(p.x - noteSize.w / 2, 6, Math.max(6, w - noteSize.w - 6));
    const below = p.y + gap,
      above = p.y - noteSize.h - gap;
    const y =
      below + noteSize.h > h && above >= 6
        ? above
        : Math.max(5, Math.min(below, h - noteSize.h - 5));
    el.style.left = x + "px";
    el.style.top = y + "px";
    line.removeAttribute("hidden");
    line.setAttribute(
      "d",
      "M" +
        p.x +
        " " +
        p.y +
        "L" +
        clamp(p.x, x + 4, x + noteSize.w - 4) +
        " " +
        (y > p.y ? y : y + noteSize.h),
    );
    return { left: x, right: x + noteSize.w, top: y, bottom: y + noteSize.h };
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
      a.href = "#paper/" + id;
      a.textContent = l(CAT[id].short);
      a.setAttribute("aria-label", l(CAT[id].short) + " · " + l(r.label));
      a.hidden = true;
      nav.append(a);
    }
  }
  function positionPortals(screen, w, h, note) {
    const anchor = screen[currentFocus];
    if (!anchor) return;
    const occupied = [
      {
        left: anchor.x - 56,
        right: anchor.x + 56,
        top: anchor.y - 16,
        bottom: anchor.y + 36,
      },
    ];
    if (note) occupied.push(note);
    for (const portal of $("#portals").children) {
      const target = screen[paperKey(portal.dataset.jump)];
      if (!target) {
        portal.hidden = true;
        continue;
      }
      const px = Math.min(78, w * 0.17),
        py = 26;
      if (
        (target.x >= px &&
          target.x <= w - px &&
          target.y >= py &&
          target.y <= h - 45) ||
        anchor.x < 0 ||
        anchor.y < 0 ||
        anchor.x > w ||
        anchor.y > h
      ) {
        portal.hidden = true;
        continue;
      }
      const dx = target.x - anchor.x,
        dy = target.y - anchor.y;
      const fx =
        dx > 0
          ? (w - px - anchor.x) / dx
          : dx < 0
            ? (px - anchor.x) / dx
            : Infinity;
      const fy =
        dy > 0
          ? (h - 37 - anchor.y) / dy
          : dy < 0
            ? (py - anchor.y) / dy
            : Infinity;
      const u = clamp(Math.min(fx, fy), 0, 1);
      const ideal = {
        x: clamp(anchor.x + dx * u, px, w - px),
        y: clamp(anchor.y + dy * u, py, h - 37),
      };
      const options = [ideal];
      for (let y = py; y <= h - 35; y += 38)
        options.push({ x: px, y }, { x: w - px, y });
      for (let x = px; x <= w - px; x += 80)
        options.push({ x, y: py }, { x, y: h - 35 });
      const distance = (p) => Math.hypot(p.x - ideal.x, p.y - ideal.y);
      options.sort((a, b) => distance(a) - distance(b));
      const halfWidth = Math.min(68, px);
      const pos = options.find((p) =>
        occupied.every(
          (r) =>
            p.x + halfWidth < r.left ||
            p.x - halfWidth > r.right ||
            p.y + 23 < r.top ||
            p.y - 23 > r.bottom,
        ),
      );
      if (!pos) {
        portal.hidden = true;
        continue;
      }
      occupied.push({
        left: pos.x - halfWidth,
        right: pos.x + halfWidth,
        top: pos.y - 18,
        bottom: pos.y + 18,
      });
      portal.hidden = false;
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
      e.group.setAttribute(
        "tabindex",
        mid.x > 0 && mid.x < w && mid.y > 0 && mid.y < h ? "0" : "-1",
      );
    }
    const note = displayNote();
    positionPortals(screen, w, h, note);
  }
  function clearTip() {
    pinned = null;
    tip.hidden = true;
    for (const e of links.values()) {
      e.group.classList.remove("hot");
      e.group.removeAttribute("aria-describedby");
    }
  }
  function showTip(e, pin = false) {
    clearTip();
    if (!e) return;
    if (pin) pinned = e.id;
    e.group.classList.add("hot");
    e.group.setAttribute("aria-describedby", "tip");
    tip.innerHTML = "<strong>" + esc(e.title) + "</strong>" + esc(e.detail);
    tip.hidden = false;
    const a = project(world[e.a]),
      b = project(world[e.b]);
    const x = (a.x + b.x) / 2,
      y = (a.y + b.y) / 2;
    tip.style.left =
      clamp(
        x - tip.offsetWidth / 2,
        6,
        stage.clientWidth - tip.offsetWidth - 6,
      ) + "px";
    tip.style.top =
      clamp(
        y - tip.offsetHeight - 8,
        5,
        stage.clientHeight - tip.offsetHeight - 5,
      ) + "px";
  }
  function noteMetrics() {
    const node = !card.hidden ? card : !theory.hidden ? theory : null;
    noteSize = node
      ? { w: node.offsetWidth, h: node.offsetHeight }
      : { w: 0, h: 0 };
  }
  function compute() {
    const peers = new Set(read);
    for (const id of read) for (const r of pairs(id)) peers.add(other(r, id));
    return window.constellationSpace.layout({
      width: stage.clientWidth,
      height: stage.clientHeight,
      mobile: innerWidth <= 680,
      fields,
      groups,
      peers,
      relations: PAPER_RELATIONS,
      focus: active,
      cardHeight: noteSize.h,
      theoryOpen,
    });
  }
  function transition(animate, savedCamera = null, holdCamera = false) {
    cancelAnimationFrame(frame);
    const result = compute();
    layoutResult = result;
    currentFocus = focusKey(active);
    visibleKeys = new Set(Object.keys(result.points));
    const fromCam = camera ? { ...camera } : { ...result.camera },
      toCam = savedCamera || (holdCamera && camera ? camera : result.camera);
    const previous = world,
      starts = {},
      ends = {},
      leaving = [];
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
        if (!previous[k] && animate && !reduced.matches)
          arrivals.set(
            node,
            node.animate(
              [
                { opacity: 0, offset: 0 },
                { opacity: 0, offset: 0.11 },
                { opacity: 1 },
              ],
              { duration: 370, fill: "backwards" },
            ),
          );
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
    if (!animate || reduced.matches) {
      camera = { ...toCam };
      world = Object.fromEntries(
        [...visibleKeys].map((k) => [k, result.world[k]]),
      );
      paint();
      return;
    }
    const began = performance.now(),
      duration = 570;
    function tick(now) {
      const u = clamp((now - began) / duration, 0, 1),
        e = u * u * (3 - 2 * u);
      camera = {
        x: fromCam.x + (toCam.x - fromCam.x) * e,
        y: fromCam.y + (toCam.y - fromCam.y) * e,
        scale: fromCam.scale + (toCam.scale - fromCam.scale) * e,
      };
      world = {};
      for (const [k, end] of Object.entries(ends)) {
        const s = starts[k],
          v = leaving.includes(k) ? Math.min(1, u * 2.6) : e;
        if (v === 1 && leaving.includes(k)) {
          nodes.get(k).hidden = true;
          continue;
        }
        world[k] = { x: s.x + (end.x - s.x) * v, y: s.y + (end.y - s.y) * v };
      }
      paint(now);
      if (u < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  function update(animate = true, savedCam = null) {
    clearTip();
    for (const g of ghostLinks) g.remove();
    ghostLinks.clear();
    buildControls();
    renderNotes();
    noteMetrics();
    syncPortals();
    $("#atlas").dataset.focus = active.kind;
    $("#atlas").classList.toggle("reading", !!showNote && !indexOpen);
    transition(animate, savedCam, indexOpen || (!animate && !!camera));
    const shown = !drawer.hidden
      ? drawer
      : !card.hidden
        ? card
        : !theory.hidden
          ? theory
          : null;
    noteEntrance?.cancel();
    if (shown && animate && !reduced.matches)
      noteEntrance = shown.animate(
        [
          { opacity: 0, translate: "0 7px" },
          { opacity: 0, translate: "0 7px", offset: 0.24 },
          { opacity: 1, translate: "0 0" },
        ],
        { duration: 480, easing: "ease-out" },
      );
  }
  function stopTravel() {
    cancelAnimationFrame(frame);
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
    if (!groups.size && !read.size && !theoryOpen) {
      transition(true);
      return;
    }
    remember();
    showNote = false;
    indexOpen = false;
    active = { kind: "home" };
    if (location.hash !== "#atlas") {
      history.pushState(
        { depth: (history.state?.depth || 0) + 1 },
        "",
        "#atlas",
      );
      lastURL = location.href;
    }
    const pts = [...visibleKeys].map((k) => layoutResult.world[k]);
    const xs = pts.map((p) => p.x),
      ys = pts.map((p) => p.y),
      w = stage.clientWidth,
      h = stage.clientHeight;
    const loX = Math.min(...xs),
      hiX = Math.max(...xs),
      loY = Math.min(...ys),
      hiY = Math.max(...ys);
    const scale = clamp(
      Math.min((w - 120) / (hiX - loX || 1), (h - 120) / (hiY - loY || 1)),
      0.23,
      1.3,
    );
    update(true, {
      scale,
      x: w / 2 - (scale * (loX + hiX)) / 2,
      y: h * 0.46 - (scale * (loY + hiY)) / 2,
    });
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
    if (item && e.pointerType !== "touch") showTip(item);
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
  layer.addEventListener("pointerover", (e) => trace(e.target, true));
  layer.addEventListener("pointerout", (e) => trace(e.target, false));
  layer.addEventListener("focusin", (e) => trace(e.target, true));
  layer.addEventListener("focusout", (e) => trace(e.target, false));
  function pinchState() {
    const [a, b] = [...pointers.values()];
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  }
  stage.addEventListener("pointerdown", (e) => {
    if (
      e.button !== 0 ||
      e.target.closest("button,a,.edge,#node-card,#theory,#index-drawer")
    )
      return;
    stopTravel();
    const p = local(e);
    pointers.set(e.pointerId, p);
    stage.setPointerCapture(e.pointerId);
    drag = p;
    pinch = pointers.size === 2 ? pinchState() : null;
    stage.classList.add("dragging");
    stage.focus({ preventScroll: true });
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    const p = local(e);
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
    pointers.delete(e.pointerId);
    pinch = null;
    drag = [...pointers.values()][0] || null;
    if (!drag) {
      stage.classList.remove("dragging");
      if (
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
  stage.addEventListener(
    "wheel",
    (e) => {
      if (
        (!e.ctrlKey && !e.metaKey) ||
        e.target.closest("#node-card,#theory,#index-drawer")
      )
        return;
      e.preventDefault();
      zoom(Math.exp(-e.deltaY * 0.01), local(e));
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
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!tip.hidden) clearTip();
    else if (indexOpen) closeIndex();
    else if (showNote) closeReading();
  });
  window.addEventListener("pagehide", remember);
  window.addEventListener("popstate", restore);
  window.addEventListener("hashchange", restore);
  new ResizeObserver(() => {
    const size = stage.clientWidth + "x" + stage.clientHeight;
    if (surfaceSize !== size) {
      surfaceSize = size;
      noteMetrics();
      transition(false);
    }
  }).observe(stage);
  // A theory selection can change the height of its anchored reading without moving the camera.
  const noteObserver = new ResizeObserver(() => {
    noteMetrics();
    if (camera) displayNote();
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
  surfaceSize = stage.clientWidth + "x" + stage.clientHeight;
  update(false);
})();
