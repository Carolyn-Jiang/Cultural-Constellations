(() => {
  const ui = {
    atlas: ["研究星图", "Research atlas"],
    theory: ["理论框架", "Framework"],
    ey: ["CULTURAL CONSTELLATIONS", "CULTURAL CONSTELLATIONS"],
    title: [
      "AI 如何解读并重塑文化？",
      "How Does AI Interpret and Reshape Culture?",
    ],
    intro: [
      "从一件器物、一段旋律或一句译文出发，探索 AI 如何参与文化意义的形成与流传。",
      "Start with an object, a melody or a translated line. Trace what happens to cultural meaning when AI enters the picture.",
    ],
    plot: ["五个领域的研究星图", "Five fields of inquiry"],
    rel: ["领域与项目", "Field–project relation"],
    pr: ["公开项目", "Public work"],
    hint: [
      "选择领域或项目查看详情，触碰虚线可阅读关联。",
      "Select a field or project. Hover, focus or tap a dashed line to read its connection.",
    ],
    gold: ["◇ 研究主题", "◇ Research topic"],
    back: ["回到星图", "Back to atlas"],
    folio: ["星图索引", "Atlas index"],
    domain: ["研究领域", "Research field"],
    projects: ["子项目与论文", "Projects and papers"],
    foundation: ["人类学", "Anthropology"],
    common: ["共同理论基础", "Shared foundation"],
    foundationText: [
      "同一件物品的意义会随讲述者、用途和流转经历而改变。五个研究领域都从人、物与实践之间的关系出发，追问 AI 介入之后，哪些意义被保存，哪些被改写。",
      "An object’s meaning changes with its uses, its interpreters and its journey. Across all five fields we ask which meanings endure, and which are remade, when AI becomes part of those relationships.",
    ],
    openFramework: ["探索理论框架", "Explore the framework"],
    mapName: [
      "文化研究五芒星知识图谱",
      "Pentagram knowledge graph of cultural research",
    ],
    openMap: ["展开项目星点", "Show project stars"],
    closeMap: ["收起项目星点", "Hide project stars"],
    source: ["公开研究", "Public research"],
    topic: ["研究主题", "Research topic"],
  };
  const domains = [
    {
      id: "museum",
      art: "athena",
      name: ["博物馆藏品", "Museum objects"],
      guardian: ["雅典娜与猫头鹰", "Athena & the owl"],
      desc: [
        "面对一件藏品，模型能辨认它来自哪里吗？当描述被重新画成图像时，这件物品的哪些细节还能被认出来？",
        "What can a model infer about an object’s origins from one photograph? When a description becomes an image again, which details still identify that particular object?",
      ],
      projects: ["pothen", "polytropos"],
    },
    {
      id: "rights",
      art: "themis",
      name: ["版权与来源归属", "Copyright & provenance"],
      guardian: ["忒弥斯与天平", "Themis & the scales"],
      desc: [
        "作品被临摹、生成或再次传播时，谁的贡献仍然可见？这一领域关注文化作品的署名、来源及其在流转中的变化。",
        "When a work is copied, generated or circulated again, whose contribution remains visible? This field follows credit and provenance as cultural works move between contexts.",
      ],
      projects: ["motif", "provenance"],
    },
    {
      id: "calligraphy",
      art: "fuxi",
      name: ["书法", "Calligraphy"],
      guardian: ["负屃 · Fùxì", "Fùxì"],
      desc: [
        "同一个字可以有许多种写法。一笔的轻重、行间的疏密，如何记录书写动作，又如何影响人们对这件作品的理解？",
        "The same character can be written in many ways. How do the weight of a stroke and the space between lines preserve a gesture and shape a reading?",
      ],
      projects: ["composition", "handwriting"],
    },
    {
      id: "music",
      art: "qiuniu",
      name: ["音乐", "Music"],
      guardian: ["囚牛 · Qiúniú", "Qiúniú"],
      desc: [
        "听者怎样从音色、停顿和演奏动作中听出表现力？这一领域关注中国传统音乐如何被聆听、诠释和演奏。",
        "How do listeners hear expression in a timbre, a pause or a player’s gesture? This field explores how Chinese traditional music is heard, interpreted and performed.",
      ],
      projects: ["qiuniu", "interpretation", "instrumental"],
    },
    {
      id: "translation",
      art: "diting",
      name: ["翻译", "Translation"],
      guardian: ["谛听 · Dìtīng", "Dìtīng"],
      desc: [
        "一个称谓、一句成语离开原来的语境，如何让另一种语言的读者听懂其中的人情与分寸？这一领域探讨翻译中的文化意义。",
        "When a term of address or an idiom travels into another language, how does a reader recover the relationship it implies? Translation brings these small acts of cultural interpretation into focus.",
      ],
      projects: ["diting", "revision", "languages"],
    },
  ];
  const satellites = {
    pothen: [311, 54],
    polytropos: [689, 54],
    motif: [863, 161],
    provenance: [909, 330],
    composition: [864, 491],
    handwriting: [774, 634],
    qiuniu: [151, 468],
    interpretation: [140, 575],
    instrumental: [296, 645],
    diting: [139, 143],
    revision: [102, 259],
    languages: [126, 378],
  };
  const mid = [500, 331],
    radius = 224;
  const located = domains.map((d, i) => {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    return {
      ...d,
      x: mid[0] + radius * Math.cos(a),
      y: mid[1] + radius * Math.sin(a),
    };
  });
  const byDomain = Object.fromEntries(located.map((d) => [d.id, d]));
  const owner = Object.fromEntries(
    located.flatMap((d) => d.projects.map((id) => [id, d])),
  );
  const $ = (selector) => document.querySelector(selector);
  const map = $("#map"),
    panel = $("#details"),
    tip = $("#tip"),
    plot = $("#plot");
  let lang = 1;
  const initialLang = new URLSearchParams(location.search).get("lang");
  if (initialLang === "zh" || initialLang === "en")
    lang = Number(initialLang === "en");
  else {
    try {
      let saved = localStorage.getItem("atlas-language");
      if (saved) lang = Number(saved === "en");
      else lang = Number(!navigator.language.toLowerCase().startsWith("zh"));
    } catch {}
  }
  let selection = { kind: "domain", id: "museum" },
    pinned = null;
  const choose = (pair) => pair[lang];
  const t = (k) => choose(ui[k]);
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const fmt = (value) => Number(value.toFixed(2));
  function sky() {
    let seed = 6197;
    const random = () =>
      ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const dust = Array.from({ length: 247 }, () => {
      const x = fmt(13 + 974 * random()),
        y = fmt(14 + 654 * random()),
        r = fmt(0.37 + 1.02 * random() ** 3),
        opacity = fmt(0.23 + 0.47 * random());
      return (
        '<circle cx="' +
        x +
        '" cy="' +
        y +
        '" r="' +
        r +
        '" fill="#c2c6ba" opacity="' +
        opacity +
        '"/>'
      );
    }).join("");
    const tick = Array.from({ length: 120 }, (_, k) => {
      const a = (k * Math.PI) / 60,
        major = k % 6 === 0,
        r1 = 243,
        r2 = major ? 251 : 246;
      return (
        '<path d="M' +
        fmt(500 + r1 * Math.cos(a)) +
        " " +
        fmt(331 + r1 * Math.sin(a)) +
        "L" +
        fmt(500 + r2 * Math.cos(a)) +
        " " +
        fmt(331 + r2 * Math.sin(a)) +
        '" stroke="#b4a581" stroke-width="' +
        (major ? 1.25 : 0.8) +
        '" opacity="' +
        (major ? 0.47 : 0.31) +
        '"/>'
      );
    }).join("");
    const points = [0, 2, 4, 1, 3, 0]
      .map((i) => fmt(located[i].x) + "," + fmt(located[i].y))
      .join(" ");
    const crosses = [
      [39, 51],
      [215, 77],
      [769, 52],
      [931, 85],
      [46, 411],
      [703, 611],
      [506, 648],
      [946, 517],
    ]
      .map(
        ([x, y]) =>
          '<path transform="translate(' +
          x +
          " " +
          y +
          ')" d="M-4 0 0 -.8 0 -6 .9 0 4 0 0 .9 0 6 -.9 0Z" fill="#d9c291" opacity=".8"/>',
      )
      .join("");
    return (
      '<g class="starplot">' +
      dust +
      crosses +
      '<g class="gridline"><ellipse cx="500" cy="331" rx="462" ry="150" transform="rotate(-20 500 331)"/><ellipse cx="500" cy="331" rx="320" ry="299" transform="rotate(34 500 331)" stroke-dasharray="2 9"/><ellipse cx="500" cy="331" rx="298" ry="261" transform="rotate(34 500 331)"/></g><circle class="ring" cx="500" cy="331" r="242"/>' +
      tick +
      '<circle class="ring" cx="500" cy="331" r="173"/><circle class="ring" cx="500" cy="331" r="94" stroke-dasharray="2 6"/><polyline class="outline" points="' +
      points +
      '"/></g>'
    );
  }
  const defs =
    '<defs><linearGradient id="goldLine"><stop stop-color="#e0aa56"/><stop offset=".43" stop-color="#fff2bc"/><stop offset=".7" stop-color="#d6a054"/><stop offset="1" stop-color="#f3c781"/></linearGradient><clipPath id="portraitClip"><circle r="47"/></clipPath></defs>';
  function fieldMarkup(d) {
    const title = esc(choose(d.name)),
      guardian = esc(choose(d.guardian));
    return (
      '<g class="dnode" role="button" tabindex="0" data-domain="' +
      d.id +
      '" aria-label="' +
      title +
      '" transform="translate(' +
      fmt(d.x) +
      " " +
      fmt(d.y) +
      ')"><circle class="edge-ring" r="53"/><circle class="coin" r="49"/><image x="-48" y="-48" width="96" height="96" href="' +
      ART[d.art] +
      '" clip-path="url(#portraitClip)"/><g text-anchor="middle" class="folio"><text class="dname" y="73">' +
      title +
      '</text><text class="dgen" y="90">' +
      guardian +
      "</text></g></g>"
    );
  }
  function projectMarkup(id) {
    const [x, y] = satellites[id],
      item = CAT[id],
      published = !!item.links.length;
    return (
      '<g class="pnode ' +
      (published ? "public" : "topic") +
      '" role="button" tabindex="0" data-project="' +
      id +
      '" aria-label="' +
      esc(choose(item.title)) +
      '" transform="translate(' +
      x +
      " " +
      y +
      ')"><rect class="tap" x="-67" y="-12" width="134" height="40" rx="10"/><path class="diamond" d="M0 -5 5 0 0 5 -5 0Z"/><text y="23" text-anchor="middle">' +
      esc(choose(item.short)) +
      "</text></g>"
    );
  }
  function edgeMarkup(id) {
    const d = owner[id],
      [x, y] = satellites[id],
      path = "M" + fmt(d.x) + " " + fmt(d.y) + "L" + x + " " + y;
    return (
      '<g class="edge" role="button" tabindex="0" aria-label="' +
      esc(choose(d.name) + " · " + choose(CAT[id].short)) +
      '" data-edge="' +
      id +
      '"><path class="hit" d="' +
      path +
      '"/><path class="domain-link" d="' +
      path +
      '"/><path class="gleam" pathLength="145" d="' +
      path +
      '"/></g>'
    );
  }
  function foundationMarkup() {
    const petals = Array.from(
      { length: 16 },
      (_, i) =>
        '<path d="M0 -55v-' +
        (i % 4 === 0 ? 10 : 4) +
        '" transform="rotate(' +
        i * 22.5 +
        ')" stroke="#d3b779" opacity=".75"/>',
    ).join("");
    return (
      '<g class="foundation" data-foundation="true" role="button" tabindex="0" aria-label="' +
      t("foundation") +
      '" transform="translate(500 331)"><circle r="68" fill="#11202a" stroke="#8b7956"/><circle r="53" fill="none" stroke="#82724f" stroke-width=".8"/>' +
      petals +
      '<path d="M-10 -30 0 -33 10 -30 0 -27Z" fill="#c2a773"/><text class="centertitle" y="2" text-anchor="middle">' +
      t("foundation") +
      '</text><text class="centersub" y="24" text-anchor="middle">' +
      t("common") +
      "</text></g>"
    );
  }
  function showPanel() {
    const { kind, id } = selection,
      d = kind === "domain" ? byDomain[id] : owner[id],
      isProject = kind === "project";
    let content;
    if (kind === "foundation") {
      content =
        '<div class="panelbody"><div class="label">' +
        t("common") +
        "</div><h2>" +
        t("foundation") +
        "</h2><p>" +
        t("foundationText") +
        '</p><div class="links"><a href="#theory">' +
        t("openFramework") +
        "</a></div></div>";
    } else {
      const plate =
        '<div class="plate"><img src="' +
        ART[d.art] +
        '" alt="' +
        esc(choose(d.guardian)) +
        '"><div class="frame"></div></div>';
      if (!isProject) {
        const rows = d.projects
          .map(
            (key) =>
              '<button type="button" class="projectrow" data-open="' +
              key +
              '"><span>' +
              esc(choose(CAT[key].short)) +
              "</span><small>" +
              t(CAT[key].links.length ? "source" : "topic") +
              "</small></button>",
          )
          .join("");
        content =
          plate +
          '<div class="panelbody"><div class="label">' +
          t("domain") +
          " · " +
          esc(choose(d.guardian)) +
          "</div><h2>" +
          esc(choose(d.name)) +
          "</h2><p>" +
          esc(choose(d.desc)) +
          '</p><hr><div class="listtitle">' +
          t("projects") +
          "</div>" +
          rows +
          "</div>";
      } else {
        const item = CAT[id],
          anchors = item.links
            .map(
              (link) =>
                '<a href="' +
                esc(link.url) +
                '" target="_blank" rel="noopener noreferrer">' +
                esc(choose(link.label)) +
                "</a>",
            )
            .join("");
        content =
          plate +
          '<div class="panelbody"><button class="crumb" type="button" data-parent="' +
          d.id +
          '">‹ ' +
          esc(choose(d.name)) +
          '</button><h2 class="project-name">' +
          esc(choose(item.title)) +
          "</h2>" +
          (anchors
            ? "<p>" +
              esc(choose(item.description)) +
              '</p><div class="links">' +
              anchors +
              "</div>"
            : "") +
          "</div>";
      }
    }
    if (kind === "domain" || (isProject && CAT[id].links.length)) {
      const lenses = {
        museum: [5, 3],
        rights: [1, 4],
        calligraphy: [0, 5],
        music: [3, 1],
        translation: [2, 4],
        pothen: [5, 3],
        polytropos: [5, 4],
        diting: [2, 4],
      };
      const perspectives = [
        ["人类学", "Anthropology"],
        ["哲学", "Philosophy"],
        ["语言学", "Linguistics"],
        ["心理学", "Psychology"],
        ["神经科学", "Neuroscience"],
        ["计算机科学", "Computer science"],
      ];
      const processes = [
        ["记忆", "Remember"],
        ["理解", "Understand"],
        ["应用", "Apply"],
        ["分析", "Analyze"],
        ["评价", "Evaluate"],
        ["创造", "Create"],
      ];
      const [view, activity] = lenses[id];
      const guide = choose(["从这个视角阅读", "A lens for reading"]);
      content +=
        '<div class="lenspath"><div class="label">' +
        guide +
        '</div><a href="#theory" data-view="' +
        view +
        '" data-activity="' +
        activity +
        '">' +
        choose(perspectives[view]) +
        " × " +
        choose(processes[activity]) +
        "</a></div>";
    }
    panel.innerHTML =
      '<div class="panelhead"><span>' +
      t("folio") +
      '</span><span class="rosette" aria-hidden="true">✧</span></div>' +
      content;
    map.querySelectorAll(".dnode,.pnode,.foundation").forEach((node) => {
      const matches =
        kind === "foundation"
          ? node.hasAttribute("data-foundation")
          : kind === "domain"
            ? node.dataset.domain === id
            : node.dataset.project === id;
      node.classList.toggle("selected", matches);
      node.setAttribute("aria-pressed", String(matches));
    });
  }
  function hideTip() {
    map.querySelectorAll(".edge.on").forEach((el) => {
      el.classList.remove("on");
      el.removeAttribute("aria-describedby");
    });
    tip.hidden = true;
  }
  function showTip(el) {
    hideTip();
    const key = el.dataset.edge,
      item = CAT[key],
      p = el.querySelector(".hit");
    el.classList.add("on");
    el.setAttribute("aria-describedby", "tip");
    tip.innerHTML =
      "<strong>" +
      esc(choose(owner[key].name)) +
      " · " +
      esc(choose(item.short)) +
      "</strong>" +
      esc(choose(item.relation));
    tip.hidden = false;
    const m = p
      .getPointAtLength(p.getTotalLength() * 0.64)
      .matrixTransform(p.getScreenCTM());
    const box = tip.parentElement.getBoundingClientRect(),
      half = tip.offsetWidth * 0.5 + 4;
    tip.style.left =
      Math.max(half, Math.min(box.width - half, m.x - box.left)) + "px";
    const anchorY = m.y - box.top;
    const topBranch = satellites[key][1] < 110;
    tip.style.top =
      (topBranch
        ? Math.min(box.height - 6, anchorY + tip.offsetHeight + 17)
        : Math.max(tip.offsetHeight + 8, anchorY - 10)) + "px";
  }
  function select(kind, id, fromMap = false) {
    pinned = null;
    hideTip();
    selection = { kind, id };
    showPanel();
    if (fromMap && window.matchMedia("(max-width:820px)").matches)
      panel.scrollIntoView({ block: "nearest" });
  }
  function updateViewBox() {
    const compact =
      window.matchMedia("(max-width:600px)").matches &&
      !plot.classList.contains("expanded");
    map.setAttribute("viewBox", compact ? "120 34 760 610" : "0 0 1000 685");
    $("#zoom").setAttribute(
      "aria-expanded",
      String(plot.classList.contains("expanded")),
    );
    $("#zoom").textContent = t(
      plot.classList.contains("expanded") ? "closeMap" : "openMap",
    );
  }
  function render() {
    hideTip();
    pinned = null;
    document.documentElement.lang = lang ? "en" : "zh-Hans";
    document.title = t("title") + " · Cultural Constellations";
    document
      .querySelectorAll("[data-i]")
      .forEach((el) => (el.textContent = t(el.dataset.i)));
    $("#zh").setAttribute("aria-pressed", String(!lang));
    $("#en").setAttribute("aria-pressed", String(!!lang));
    map.setAttribute("aria-label", t("mapName"));
    const ids = located.flatMap((d) => d.projects);
    map.innerHTML =
      defs +
      sky() +
      ids.map(edgeMarkup).join("") +
      foundationMarkup() +
      located.map(fieldMarkup).join("") +
      ids.map(projectMarkup).join("");
    updateViewBox();
    showPanel();
    window.renderTheory(lang);
  }
  function setLanguage(n) {
    lang = n;
    try {
      localStorage.setItem("atlas-language", lang ? "en" : "zh");
    } catch {}
    render();
  }
  $("#zh").onclick = () => setLanguage(0);
  $("#en").onclick = () => setLanguage(1);
  $("#zoom").onclick = () => {
    plot.classList.toggle("expanded");
    updateViewBox();
    pinned = null;
    hideTip();
  };
  window
    .matchMedia("(max-width:600px)")
    .addEventListener("change", updateViewBox);
  map.addEventListener("pointerover", (e) => {
    const el = e.target.closest(".edge");
    if (el && e.pointerType !== "touch") showTip(el);
  });
  map.addEventListener("pointerout", (e) => {
    const el = e.target.closest(".edge");
    if (el && !el.contains(e.relatedTarget))
      pinned ? showTip(pinned) : hideTip();
  });
  map.addEventListener("focusin", (e) => {
    const el = e.target.closest(".edge");
    if (el) showTip(el);
  });
  map.addEventListener("focusout", (e) => {
    if (e.target.closest(".edge")) pinned ? showTip(pinned) : hideTip();
  });
  function activate(el) {
    if (el.dataset.edge) {
      if (pinned === el) {
        pinned = null;
        hideTip();
      } else {
        pinned = el;
        showTip(el);
      }
      return;
    }
    if (el.dataset.domain) select("domain", el.dataset.domain, true);
    if (el.dataset.project) select("project", el.dataset.project, true);
    if (el.hasAttribute("data-foundation")) select("foundation", null, true);
  }
  map.addEventListener("click", (e) => {
    const el = e.target.closest('[role="button"]');
    if (el) activate(el);
    else {
      pinned = null;
      hideTip();
    }
  });
  map.addEventListener("keydown", (e) => {
    if (["Enter", " "].includes(e.key) && e.target.matches('[role="button"]')) {
      e.preventDefault();
      activate(e.target);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      pinned = null;
      hideTip();
    }
  });
  panel.addEventListener("click", (e) => {
    const route = e.target.closest("[data-view]");
    if (route) {
      document
        .querySelector(
          '.ht-panel[data-group="0"] [data-index="' + route.dataset.view + '"]',
        )
        .click();
      document
        .querySelector(
          '.ht-panel[data-group="1"] [data-index="' +
            route.dataset.activity +
            '"]',
        )
        .click();
      return;
    }
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.open) {
      select("project", b.dataset.open);
      panel.querySelector(".crumb").focus({ preventScroll: true });
    }
    if (b.dataset.parent) {
      const old = selection.id;
      select("domain", b.dataset.parent);
      panel
        .querySelector('[data-open="' + old + '"]')
        .focus({ preventScroll: true });
    }
  });
  render();
})();
