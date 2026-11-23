const CAT = {
  pothen: {
    short: ["Pothen", "Pothen"],
    title: [
      "Pothen：视觉语言模型能认出一件藏品来自哪里吗？",
      "Pothen: Can Vision-Language Models Tell Where a Cultural Object Comes From?",
    ],
    relation: [
      "以馆藏记录核对模型仅凭照片推断的藏品归属。",
      "Museum records test what a model can infer about an object from its photograph.",
    ],
    description: [
      "九个视觉语言模型观察 750 件馆藏的照片，推断名称、文化、时期、产地和创作者。按各字段分别计算时，平均准确率从 36% 到 50%；要求五项同时与馆藏记录相符时，准确率从 2% 到 8%。",
      "Nine vision-language models inferred the title, culture, period, place of origin and creator of 750 objects from museum photographs. Average field accuracy ranged from 36% to 50%, while all five fields matched the museum record for just 2% to 8% of objects.",
    ],
    links: [
      {
        label: ["项目网站", "Project website"],
        url: "https://carolyn-jiang.github.io/Pothen/",
      },
    ],
  },
  polytropos: {
    short: ["Polytropos", "Polytropos"],
    title: [
      "Polytropos：经过视觉语言模型的描述，一件文化物品变成了什么？",
      "Polytropos: What Do Vision-Language Model Descriptions Make of a Cultural Object?",
    ],
    relation: [
      "把描述还原为图像，检验这一件藏品有多少特征留了下来。",
      "Reconstructing an image from a description reveals which details of the individual object survive.",
    ],
    description: [
      "五个模型为 374 件藏品写下描述，再由同一图像生成器据此重建藏品。与原照相比，识别模型更常把重建图归入馆方记录的文化。只有 0.49% 的重建图使识别模型提出具体的藏品身份。",
      "Five models described 374 museum objects, and the same image generator reconstructed them from those descriptions. A separate model recovered the recorded culture more often from reconstructions than from original photographs. It offered a specific identification for only 0.49% of reconstructions.",
    ],
    links: [
      {
        label: ["项目网站", "Project website"],
        url: "https://carolyn-jiang.github.io/Polytropos/",
      },
    ],
  },
  motif: {
    short: ["文化母题", "Cultural motifs"],
    title: ["文化母题", "Cultural motifs"],
    relation: ["文化作品的来源", "Sources of cultural works"],
    description: ["", ""],
    links: [],
  },
  provenance: {
    short: ["来源归属", "Attribution"],
    title: ["来源归属", "Attribution"],
    relation: ["作品的署名与来源", "Authorship and provenance"],
    description: ["", ""],
    links: [],
  },
  composition: {
    short: ["书法创作", "Calligraphic composition"],
    title: ["书法创作", "Calligraphic composition"],
    relation: ["书法的创作实践", "The practice of composing calligraphy"],
    description: ["", ""],
    links: [],
  },
  handwriting: {
    short: ["书写实践", "Writing by hand"],
    title: ["书写实践", "Writing by hand"],
    relation: ["书写与身体动作", "Writing and bodily movement"],
    description: ["", ""],
    links: [],
  },
  qiuniu: {
    short: ["Qiuniu 1.0", "Qiuniu 1.0"],
    title: [
      "Qiuniu 1.0 · 中国传统音乐的表现力理解",
      "Qiuniu 1.0 · Understanding expression in traditional Chinese music",
    ],
    relation: ["音乐如何传达情感", "How music conveys feeling"],
    description: ["", ""],
    links: [],
  },
  interpretation: {
    short: ["音乐诠释", "Musical interpretation"],
    title: ["音乐诠释", "Musical interpretation"],
    relation: ["演奏者对作品的诠释", "How performers interpret a piece"],
    description: ["", ""],
    links: [],
  },
  instrumental: {
    short: ["器乐演奏", "Instrumental performance"],
    title: ["器乐演奏", "Instrumental performance"],
    relation: ["乐器与演奏实践", "Instruments and performance practice"],
    description: ["", ""],
    links: [],
  },
  diting: {
    short: ["谛听", "DITING"],
    title: [
      "谛听：用于网络小说翻译基准评测的多智能体框架",
      "DITING: A Multi-Agent Evaluation Framework for Benchmarking Web Novel Translation",
    ],
    relation: [
      "以网络小说中的习语、称谓和省略成分追问文化意义如何进入译文。",
      "Idioms, culture-specific terms and implicit pronouns reveal which meanings survive translation.",
    ],
    description: [
      "谛听使用超过 18,000 对专家标注的中英句子，从习语翻译、词义歧义等六个维度评测网络小说译文。它的多智能体评估器模拟专家讨论，在七种自动评价方法中，与人工评分的相关性最高。",
      "DITING tests six aspects of web novel translation, including idioms and lexical ambiguity, using over 18,000 expert-annotated Chinese–English sentence pairs. Its multi-agent evaluator models expert deliberation and correlates most closely with human ratings among the seven automatic metrics tested.",
    ],
    links: [
      {
        label: ["论文 PDF", "Paper PDF"],
        url: "https://arxiv.org/pdf/2510.09116",
      },
    ],
  },
  revision: {
    short: ["译文修订", "Translation revision"],
    title: ["译文修订", "Translation revision"],
    relation: ["译文的修改与润色", "The practice of revising a translation"],
    description: ["", ""],
    links: [],
  },
  languages: {
    short: ["去中心化小语种翻译", "Low-resource translation"],
    title: [
      "去中心化小语种翻译",
      "Decentralised translation for lower-resource languages",
    ],
    relation: ["语言间的意义传递", "How meaning travels between languages"],
    description: ["", ""],
    links: [],
  },
};
const ART = {
  athena: "assets/athena.webp?v=2",
  diting: "assets/diting.webp?v=2",
  fuxi: "assets/fuxi.webp?v=2",
  qiuniu: "assets/qiuniu.webp?v=2",
  themis: "assets/themis.webp?v=2",
};
