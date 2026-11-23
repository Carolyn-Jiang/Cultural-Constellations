const PAPER_RELATIONS = Object.freeze(
  [
    {
      a: "pothen",
      b: "polytropos",
      label: ["从照片到重建图", "From photograph to reconstruction"],
      text: [
        "Pothen 询问一张原照能透露哪些馆藏信息。Polytropos 让描述再变成图像，追问哪些线索还能指向原来的那件藏品。",
        "Pothen asks which catalogue details a model can infer from a photograph. Polytropos asks which clues to the individual object survive when a description is turned back into an image.",
      ],
    },
    {
      a: "polytropos",
      b: "diting",
      label: ["转述保留了什么？", "What survives retelling?"],
      text: [
        "Polytropos 检查藏品细节在图像与文字之间的往返，谛听检查文化含义在中英译文间的传递。一件器物的纹饰与小说里的一句习语，各有哪些细节容易在转述中消失？",
        "Polytropos follows object details from image to words and back. DITING follows cultural meaning from Chinese into English. What can disappear when an ornament is described or an idiom translated?",
      ],
    },
    {
      a: "pothen",
      b: "provenance",
      label: ["外观与来源证据", "Appearance and evidence of origin"],
      text: [
        "Pothen 用馆藏记录核对模型从外观推断的产地与创作者。如果两地的器物风格相似，还可以用哪些记录查明它们各自的来历？",
        "Pothen checks visually inferred origins and creators against museum records. If objects from two places look alike, what records could establish where each came from?",
      ],
    },
    {
      a: "diting",
      b: "revision",
      label: ["修订中的言外之意", "Recovering implied meaning"],
      text: [
        "谛听关注习语和省略代词等翻译难点。修订一句读起来通顺的译文时，什么线索能提示说话的人或话里的意思已经变了？",
        "DITING examines idioms and implicit pronouns. When revising a fluent translation, what clues reveal that the speaker or the implied meaning has changed?",
      ],
    },
    {
      a: "revision",
      b: "languages",
      label: ["谁来判断这一处修改？", "Who can judge an edit?"],
      text: [
        "面对参考译本稀少的语言，熟悉两种语言的读者如何判断一次修改是否贴近原意？",
        "Where published translations are scarce, how can readers who know both languages judge whether an edit brings a passage closer to its source?",
      ],
    },
    {
      a: "languages",
      b: "motif",
      label: ["母题的跨语际流传", "Motifs across languages"],
      text: [
        "当一个当地故事被译成另一种语言，读者靠哪些名称、形象或情节认出同一母题？",
        "When a local story is told in another language, which names, images or episodes help readers recognise the same motif?",
      ],
    },
    {
      a: "motif",
      b: "provenance",
      label: ["同一母题，不同来历", "Tracing versions of a motif"],
      text: [
        "两件作品使用同一母题时，哪些署名、年代或流传记录有助于辨认各自的版本？",
        "When two works use the same motif, which credits, dates or records of circulation help distinguish their versions?",
      ],
    },
    {
      a: "motif",
      b: "composition",
      label: ["同一题材的不同写法", "Writing a familiar subject anew"],
      text: [
        "两幅书法取材于同一段故事时，字形和布局怎样引导观者注意不同细节？",
        "When two calligraphic works draw on the same story, how do letterforms and layout draw attention to different details?",
      ],
    },
    {
      a: "composition",
      b: "handwriting",
      label: ["从笔势到章法", "From a stroke to a composition"],
      text: [
        "一笔的方向、力度与收势如何影响下一字的位置，以及整幅书写的疏密？",
        "How do the direction, pressure and finish of a stroke affect the next character’s position and the spacing of the whole piece?",
      ],
    },
    {
      a: "handwriting",
      b: "instrumental",
      label: ["手势留下的痕迹", "What a gesture leaves behind"],
      text: [
        "同样是手指轻重的变化，书写者怎样让它在纸上可见，演奏者又怎样让它在声音里可听？",
        "How does a change in finger pressure become visible on the page for a calligrapher and audible on an instrument for a musician?",
      ],
    },
    {
      a: "instrumental",
      b: "qiuniu",
      label: ["如何听出表现力？", "Hearing expression in technique"],
      text: [
        "听同一段旋律时，触弦的轻重、音色或停顿怎样影响听者对音乐情感的理解？",
        "When the melody stays the same, how do touch, tone and pauses change the emotion a listener hears?",
      ],
    },
    {
      a: "qiuniu",
      b: "interpretation",
      label: ["同一乐句的不同情感", "Different readings of a phrase"],
      text: [
        "两位演奏者处理同一乐句时，听者凭什么听出一种诠释偏向平静，另一种却显得紧张？",
        "When two musicians play the same phrase, what lets a listener hear calm in one reading and tension in the other?",
      ],
    },
    {
      a: "interpretation",
      b: "composition",
      label: ["留白与停顿", "Space and silence"],
      text: [
        "书法中的一处留白与演奏中的一次停顿，怎样分别改变观者与听者对下一笔、下一音的期待？",
        "How does a space on the page, or a pause in a performance, shape anticipation of the next stroke or note?",
      ],
    },
    {
      a: "interpretation",
      b: "revision",
      label: ["节奏与语气", "Rhythm and tone"],
      text: [
        "演奏者延长一拍、译者改变一句的停顿时，听者和读者对作品语气的理解会如何变化？",
        "When a musician holds a beat or a translator changes where a sentence pauses, how does the tone shift for the listener or reader?",
      ],
    },
  ].map(({ a, b, label, text }) =>
    Object.freeze({
      a,
      b,
      label: Object.freeze(label),
      text: Object.freeze(text),
    }),
  ),
);
