(function () {
  const disciplines = [
    [
      ["人类学", "Anthropology"],
      [
        "一件藏品的来历怎样改变我们对它的解读？",
        "How does an object’s history change our reading of it?",
      ],
    ],
    [
      ["哲学", "Philosophy"],
      [
        "将一件瓷器归入某种风格，是否意味着理解了这件瓷器？",
        "Does recognising a porcelain style amount to understanding a particular vessel?",
      ],
    ],
    [
      ["语言学", "Linguistics"],
      [
        "一句译文如何传达称谓中包含的亲疏关系？",
        "How does a translation convey the relationship implied by a term of address?",
      ],
    ],
    [
      ["心理学", "Psychology"],
      [
        "观察者认不出一件器物时，会用同类器物的哪些特征来补足细节？",
        "When an object is unfamiliar, which details do observers borrow from its category?",
      ],
    ],
    [
      ["神经科学", "Neuroscience"],
      [
        "从一次触弦到一个音，演奏动作与感知如何配合？",
        "How do movement and perception work together when a player plucks a string?",
      ],
    ],
    [
      ["计算机科学", "Computer science"],
      [
        "怎样设计评测，检验从藏品照片写出的描述是否保留了它的特征？",
        "How can a benchmark test which features of a museum object survive in a description?",
      ],
    ],
  ];
  const levels = [
    [
      ["记忆", "Remember"],
      [
        "回忆一件藏品的编目名称。",
        "Recall the catalogue name of a museum object.",
      ],
    ],
    [
      ["理解", "Understand"],
      [
        "解释曲目说明中的一个意象。",
        "Explain an image evoked in a programme note.",
      ],
    ],
    [
      ["应用", "Apply"],
      [
        "在新的句子中恰当地使用一个称谓。",
        "Use a term of address appropriately in a new sentence.",
      ],
    ],
    [
      ["分析", "Analyze"],
      [
        "对照照片与描述，找出两者在形状或纹饰上的差异。",
        "Compare an object’s photograph and description to identify differences in shape or ornament.",
      ],
    ],
    [
      ["评价", "Evaluate"],
      [
        "结合上下文判断两种译法中哪一种更贴合说话者的语气。",
        "Judge which of two translations better conveys a speaker’s tone in context.",
      ],
    ],
    [
      ["创造", "Create"],
      [
        "为一段文字选择书体，写出一件书法作品。",
        "Choose a script for a text and compose a work of calligraphy.",
      ],
    ],
  ];
  const icon = (type) => {
    if (type === "disciplines") {
      return '<svg class="ht-icon" viewBox="0 0 56 56" fill="none" aria-hidden="true"><path d="M28 7 46 18v20L28 49 10 38V18Z M28 7v42 M10 18l36 20 M46 18 10 38" stroke="currentColor" stroke-width="1"/><circle cx="28" cy="28" r="4" fill="currentColor"/></svg>';
    }
    return '<svg class="ht-icon" viewBox="0 0 56 56" fill="none" aria-hidden="true"><g stroke="currentColor"><ellipse cx="28" cy="28" rx="20" ry="9"/><ellipse cx="28" cy="28" rx="20" ry="9" transform="rotate(60 28 28)"/><ellipse cx="28" cy="28" rx="20" ry="9" transform="rotate(120 28 28)"/></g></svg>';
  };
  const copy = [
    {
      label: "理论基础",
      title: "人类学如何连接五个研究领域",
      intro:
        "人类学是五个领域共同的理论基础，也是认知科学六个学科视角之一。谁为一件作品命名，谁使用它，它又在怎样的关系中被传递？这些问题贯穿整张图谱。",
      authors: ["格尔茨 · 1973", "拉图尔 · 2005"],
      heads: ["意义之网", "行动者网络"],
      lens: [
        "一件器物、一个称谓或一段声音，要放回使用它的人群与情境中，才能理解其意义。",
        "创作者、馆藏目录、翻译系统与生成模型都会参与作品的流转。沿着这些关系，可以追踪意义和署名如何变化。",
      ],
      groups: ["六个学科视角", "六种认知过程"],
      leads: [
        "每个项目按问题选用一个或几个视角。同一件器物，在不同学科中可以引出不同的问题。",
        "借用修订版布鲁姆分类描述任务要求。六种过程可以并行或反复出现，没有固定次序。有关神经层级的解释需要另外的证据。",
      ],
      cites: [
        "认知科学六边形 · Sloan（1978）、Miller（2003）",
        "修订版布鲁姆教育目标分类学 · Anderson 与 Krathwohl（2001）",
      ],
      aiTitle: "人工智能与认知科学",
      aiIntro:
        "AI 在五个领域中既是研究对象，也是研究方法。有关人类认知的预测须用独立的人类数据检验。相似的表现可能来自不同机制。",
      paths: [
        [
          "认知科学",
          "人工智能",
          "用记忆理论设计评测",
          "如果记忆会借用同类物品的典型特征，可以给模型看一件没有把手的茶壶，检验它是否在描述中添上把手。",
        ],
        [
          "人工智能",
          "认知科学",
          "用人类数据检验预测",
          "把“记住轮廓”和“记住类别”写成两种模型，预测人们会把哪些器物认错，再对照另一组观察者的实际选择。",
        ],
      ],
    },
    {
      label: "Theoretical foundations",
      title: "Anthropology across five fields",
      intro:
        "Anthropology grounds all five fields and also contributes one of the six disciplinary perspectives in cognitive science. Across the atlas, we ask who names a work, who uses it and how it changes hands.",
      authors: ["Clifford Geertz · 1973", "Bruno Latour · 2005"],
      heads: ["Webs of significance", "Actor-network theory"],
      lens: [
        "Reading a vessel, a term of address or a musical phrase calls for understanding the people who use it and the circumstances in which it appears.",
        "Makers, catalogues, translation systems and generative models all participate in the circulation of a work. Following their connections reveals changes in meaning and credit.",
      ],
      groups: ["Six disciplinary perspectives", "Six cognitive processes"],
      leads: [
        "A project draws on one or more disciplines as its question requires. The same object can prompt different questions in each.",
        "We adapt revised Bloom’s taxonomy to describe task demands. The processes can overlap or recur in any order. Claims about neural hierarchies require separate evidence.",
      ],
      cites: [
        "Cognitive hexagon · Sloan (1978), Miller (2003)",
        "Revised Bloom’s taxonomy · Anderson and Krathwohl (2001)",
      ],
      aiTitle: "AI and cognitive science",
      aiIntro:
        "Across the five fields, AI is both a subject of study and a research method. Predictions about human cognition need independent human data. Similar behaviour can arise from different mechanisms.",
      paths: [
        [
          "Cognitive science",
          "AI",
          "Design a test from memory theory",
          "If memory fills gaps with typical features, show a model a handleless teapot and check whether it adds a handle in its description.",
        ],
        [
          "AI",
          "Cognitive science",
          "Test predictions with human data",
          "Build two models of memory, one based on outlines and one on categories. Predict which objects people will confuse, then compare those predictions with choices made by a new group of observers.",
        ],
      ],
    },
  ];
  window.renderTheory = function renderTheory(lang) {
    const root = document.getElementById("theory-inner");
    if (!root) return;
    const language = lang === 1 ? 1 : 0;
    const c = copy[language];
    const blocks = [disciplines, levels];
    const previous = [...root.querySelectorAll(".ht-panel")].map((panel) =>
      Number(panel.querySelector('[aria-pressed="true"]')?.dataset.index || 0),
    );
    function panel(data, index) {
      const group = index === 0 ? "disciplines" : "levels";
      const active = previous[index] || 0;
      const buttons = data
        .map(
          (row, i) =>
            '<button class="ht-choice" type="button" data-index="' +
            i +
            '" aria-pressed="' +
            (i === active) +
            '" aria-controls="ht-example-' +
            group +
            '">' +
            row[0][language] +
            "</button>",
        )
        .join("");
      return (
        '<article class="ht-panel" data-group="' +
        index +
        '"><div class="ht-title-row">' +
        icon(group) +
        "<h3>" +
        c.groups[index] +
        '</h3></div><p class="ht-intro">' +
        c.leads[index] +
        '</p><div class="ht-options" role="group" aria-label="' +
        c.groups[index] +
        '">' +
        buttons +
        '</div><p class="ht-example" id="ht-example-' +
        group +
        '" aria-live="polite">' +
        data[active][1][language] +
        '</p><p class="ht-cite">' +
        c.cites[index] +
        "</p></article>"
      );
    }
    const expanded = [...root.querySelectorAll(".ht-path details")].map(
      (item) => item.open,
    );
    const paths = c.paths
      .map(
        ([from, to, label, example], i) =>
          `<article class="ht-path"><h4><span>${from}</span><span class="ht-direction">→</span><span>${to}</span></h4><details${expanded[i] ? " open" : ""}><summary>${label}</summary><p>${example}</p></details></article>`,
      )
      .join("");
    const reciprocity = `<section class="ht-reciprocity" aria-labelledby="ht-ai-heading"><div class="ht-reciprocity-head"><h3 id="ht-ai-heading">${c.aiTitle}</h3><p>${c.aiIntro}</p></div><div class="ht-paths">${paths}</div></section>`;
    root.innerHTML =
      '<div class="ht-wrap" lang="' +
      (language ? "en" : "zh-CN") +
      '"><div class="ht-overview"><header class="ht-head"><span class="ht-kicker">' +
      c.label +
      "</span><h2>" +
      c.title +
      "</h2><p>" +
      c.intro +
      '</p></header><div class="ht-lenses">' +
      c.heads
        .map(
          (v, i) =>
            '<article><div class="ht-source">' +
            c.authors[i] +
            "</div><h3>" +
            v +
            "</h3><p>" +
            c.lens[i] +
            "</p></article>",
        )
        .join("") +
      '</div></div><div class="ht-panels">' +
      blocks.map(panel).join("") +
      "</div>" +
      reciprocity +
      "</div>";
    root.querySelectorAll(".ht-panel").forEach((panel, group) => {
      const buttons = [...panel.querySelectorAll(".ht-choice")];
      function select(i) {
        buttons.forEach((button, j) =>
          button.setAttribute("aria-pressed", String(j === i)),
        );
        panel.querySelector(".ht-example").textContent =
          blocks[group][i][1][language];
      }
      buttons.forEach((button, i) => {
        button.addEventListener("click", () => select(i));
        button.addEventListener("keydown", (e) => {
          const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
          if (!step) return;
          e.preventDefault();
          const next = (i + step + buttons.length) % buttons.length;
          buttons[next].focus();
          select(next);
        });
      });
    });
  };
})();
