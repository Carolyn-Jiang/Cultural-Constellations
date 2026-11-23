(function () {
  "use strict";

  const sources = {
    geertz: [
      "Geertz (1973)",
      "https://faculty.washington.edu/ewebb/R504/Geertz.pdf",
    ],
    latour: ["Latour (2005)", "https://academic.oup.com/book/52349"],
    miller: [
      "Miller (2003)",
      "https://www.cs.princeton.edu/~rit/geo/Miller.pdf",
    ],
    bloom: ["Krathwohl (2002)", "https://doi.org/10.1207/s15430421tip4104_2"],
    goodman: [
      "Goodman (1976)",
      "https://books.google.com/books?id=e4a5-ItuU1oC&pg=PA113",
    ],
    clark: [
      "Clark (1996)",
      "https://web.stanford.edu/~clark/1990s/Using%20language/Clark.Ch4.Using%20Language.96.pdf",
    ],
    nosofsky: ["Nosofsky (1986)", "https://pubmed.ncbi.nlm.nih.gov/2937873/"],
    wolpert: [
      "Wolpert et al. (1995)",
      "https://pubmed.ncbi.nlm.nih.gov/7569931/",
    ],
    marr: [
      "Marr (1982)",
      "https://academic.oup.com/mit-press-scholarship-online/book/13528",
    ],
    geirhos: [
      "Geirhos et al. (2019)",
      "https://github.com/rgeirhos/texture-vs-shape",
    ],
    golan: [
      "Golan et al. (2020)",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC7703564/",
    ],
    gell: ["Gell (1998)", "https://academic.oup.com/book/47329"],
    perez: ["Perez et al. (2025)", "https://arxiv.org/abs/2407.04503"],
    shumailov: [
      "Shumailov et al. (2024)",
      "https://doi.org/10.1038/s41586-024-07566-y",
    ],
  };

  const disciplines = [
    {
      name: ["人类学", "Anthropology"],
      title: [
        "行动对参与者意味着什么？",
        "What does an action mean to its participants?",
      ],
      account: [
        "解释人类学把文化看作公开的符号与实践。理解一种行为，须重建当地人借以区分意图、身份和场合的约定。同样的身体动作因而可能构成不同的社会行动。",
        "Interpretive anthropology treats culture as a public system of symbols and practices. Understanding an act requires reconstructing the conventions through which participants recognise intention, status and occasion. The same physical gesture can therefore constitute different social acts.",
      ],
      evidence: [
        "一只碗可能用于供奉、待客或陈列。比较使用者的称呼、现场观察和地方记录，才能说明谁可以触碰它以及为什么。",
        "A bowl may be used as an offering, for serving a guest or for display. Compare how people name it, who may handle it and what participants say about those conventions.",
      ],
      ref: "geertz",
      role: [
        "把 AI 当作一个新的“群体”来观察，把它的作品当藏品来研究：意义之网与行动者网络是整个课题的起点。",
        "Observe AI as a new group and study its works as museum objects: webs of meaning and actor-networks are where the project begins.",
      ],
      fields: ["museum", "rights"],
    },
    {
      name: ["哲学", "Philosophy"],
      title: [
        "什么确定一件作品的同一性？",
        "What establishes a work’s identity?",
      ],
      account: [
        "古德曼区分两类作品的同一性条件。对于亲笔艺术，制作历史参与确定何者为真迹。对于有充分记谱规则的作品，多次符合谱面的演出可以是同一作品的不同实例。",
        "Goodman distinguishes conditions of identity. In autographic arts, the history of production helps establish authenticity. In arts with an adequate notation, different performances can count as instances of one work through compliance with its score.",
      ],
      evidence: [
        "临摹画可以与原画难以区分。比较外形说明相似程度，判断是否出自原作者之手还须查核制作与流传记录。",
        "A painted copy may be visually indistinguishable from an original. Comparing their surfaces establishes resemblance. Production and provenance records bear on whether they share a maker.",
      ],
      ref: "goodman",
      role: [
        "追问什么才算“理解”、什么才算“创造”：书法里分清“再现类型”与“回应具体”，版权里追问一件作品凭什么是它自己。",
        "Ask what counts as understanding and as creating: in calligraphy, tell reproducing a type from answering a particular work; in provenance, ask what makes a work itself.",
      ],
      fields: ["calligraphy", "rights"],
    },
    {
      name: ["语言学", "Linguistics"],
      title: [
        "交谈的人怎样建立共同理解？",
        "How do speakers reach a shared understanding?",
      ],
      account: [
        "克拉克把语言使用理解为协同行动。共同基础包括交谈双方视为彼此共有的知识、信念和假设。每次言说借用这套基础，又可能改变双方接下来能够合理推断的内容。",
        "Clark understands language use as joint action. Common ground comprises the knowledge, beliefs and assumptions that participants treat as shared. Each utterance draws on that ground and can alter what the participants can reasonably infer next.",
      ],
      evidence: [
        "同一个亲属称谓可以称呼家人或邻居。让熟悉两种场景的说话者比较译法，可以检验对亲疏关系的推断。",
        "A kinship term may address a family member or a neighbour. Ask speakers familiar with both contexts to compare translations and explain the relation each one implies.",
      ],
      ref: "clark",
      role: [
        "每种语言“必须说出”的东西不同：称谓、礼貌、时态。翻译时，哪些必须保留？",
        "Each language obliges its speakers to say different things: forms of address, politeness, tense. Which of them must a translation keep?",
      ],
      fields: ["translation"],
    },
    {
      name: ["心理学", "Psychology"],
      title: [
        "注意怎样改变感知到的相似性？",
        "How does attention shape perceived similarity?",
      ],
      account: [
        "诺索夫斯基的范例模型把分类判断建立在记忆中的具体样本上。注意会给不同特征赋予不同权重，进而改变一个新对象与各已知样本的心理距离。类别判断因此随经验和任务而变。",
        "In Nosofsky’s exemplar model, a category judgement depends on similarities to remembered instances. Attention weights the dimensions of comparison, changing the psychological distance between a new object and each exemplar. Experience and the demands of the task can thus shift a category decision.",
      ],
      evidence: [
        "器形和纹饰可能支持不同分类。用两条线索冲突的新器物，检验形状权重较高的模型是否准确预测逐项混淆。",
        "Make vessel shape and ornament favour different categories. New objects with conflicting cues test whether a shape-weighted model predicts which individual examples observers confuse.",
      ],
      ref: "nosofsky",
      role: [
        "人对一个对象了解不够时，会用“类别”去补；专家评分与人类演奏，是衡量 AI 的那把尺。",
        "When people know too little about an object they fill the gap with its category; expert ratings and human performances are the yardstick for AI.",
      ],
      fields: ["museum", "music"],
    },
    {
      name: ["神经科学", "Neuroscience"],
      title: [
        "身体怎样估计自己正在做什么？",
        "How does the body estimate its own movement?",
      ],
      account: [
        "感觉运动控制的内部模型假设，神经系统结合运动指令与感觉反馈，持续估计身体状态。当反馈滞后或含噪时，预测仍可支持动作调整。行为结果可以约束这种解释，定位神经回路则需要另外的证据。",
        "Internal models of sensorimotor control propose that the nervous system combines motor commands with sensory feedback to estimate bodily state. Prediction can guide adjustments while feedback is delayed or noisy. Behaviour constrains this account. Localising its circuitry requires further evidence.",
      ],
      evidence: [
        "弹弦时可以延迟声音反馈，测量演奏者何时开始纠正动作。若解释涉及某一神经回路，就须再用神经记录或干预加以检验。",
        "In string playing, delayed sound feedback could reveal when a player begins correcting the movement. A claim about a particular circuit would also need neural measurements or intervention.",
      ],
      ref: "wolpert",
      role: [
        "意图怎样变成动作：毛笔的起、行、收，琵琶的触弦。",
        "How intention becomes movement: the start, travel and finish of a brushstroke, the touch on a pipa string.",
      ],
      fields: ["calligraphy", "music"],
    },
    {
      name: ["计算机科学", "Computer science"],
      title: [
        "一种解释如何成为可执行的模型？",
        "What makes an account computational?",
      ],
      account: [
        "计算解释须明确求解目标、信息怎样表征，以及哪些运算把输入变为输出。两种程序即使同样成功，也可能保留不同的信息。将表征和运算写清楚，才可以推导它们在什么条件下会给出不同答案。",
        "A computational account specifies the problem, a representation and the operations that transform inputs into outputs. Two successful procedures can preserve different information. Making those commitments explicit lets us predict when the procedures should disagree.",
      ],
      evidence: [
        "藏品检索系统可能利用轮廓或目录文字。只交换两件藏品的说明，观察哪些检索判断随之改变，可以检验程序依赖哪一种表征。",
        "An object-retrieval system could encode outlines or catalogue text. Swapping the captions while keeping the photographs fixed tests which representation drives its choices.",
      ],
      ref: "marr",
      role: [
        "模型、记忆与规划、评测基准：把以上问题变成可以测量的实验。",
        "Models, memory and planning, and benchmarks turn these questions into experiments that can be measured.",
      ],
      fields: ["museum", "translation", "calligraphy", "music", "rights"],
    },
  ];
  // The position the five fields argue from.
  const stance = [
    {
      name: ["新的描述者", "A new describer"],
      title: [
        "模型保留了文化的类型，丢失了具体的这一件",
        "Models keep the type of a culture and lose the particular object",
      ],
      account: [
        "视觉语言模型的描述正在进入藏品目录、检索结果与下一代模型的训练数据。Pothen 让模型仅凭照片推断藏品的名称、文化、时期、产地与作者，五项同时正确的只有 2% 到 8%；Polytropos 把描述还原成图像，重建图更常被识别为所记录的文化，却只有 0.49% 能被认出是这一件。",
        "Descriptions written by vision-language models are entering catalogues, search results and the training data of the next models. In Pothen, models inferring five catalogue fields from a photograph got all five right for only 2% to 8% of objects. In Polytropos, images rebuilt from model descriptions were placed in the recorded culture more often than the original photographs, yet only 0.49% could be identified as that object.",
      ],
      evidence: [
        "对文化的书写往往把具体之物写成类型；描述者对个体所知少于对其类别时，会用类别填补空缺。",
        "Writing about culture tends to turn particular things into types; when a describer knows less about an individual than about its category, the category fills the gap.",
      ],
      fields: ["museum"],
    },
    {
      name: ["新的创作者", "A new creator"],
      title: [
        "只掌握类型的描述者，在转述与创作时会做什么？",
        "What does a describer that knows only types do when it retells and creates?",
      ],
      account: [
        "三个方向各回答循环中的一环。翻译：AI 在文化之间转述时，保留的是具体的话语，还是它所属的类型？书法：AI 写字时，是在再现已有文化的类型，还是回应这首诗、这件作品？音乐：AI 能否把一首琵琶曲约定的情感与意象，变成听得到的演奏？",
        "Three directions each answer one step of the loop. Translation: when AI carries words between cultures, does it keep the particular utterance or only its type? Calligraphy: when AI writes, does it reproduce a type or answer this poem and this work? Music: can AI turn the feeling and imagery a pipa piece carries into a performance we can hear?",
      ],
      evidence: [
        "盖尔指出，艺术品是行动的痕迹，观者据此推断制作者的意图。AI 的书写与演奏因此也能像藏品一样，被追问由谁、在什么场合、以什么方式做成。",
        "Gell treats an artwork as the trace of an action from which viewers infer intention. AI's writing and playing can therefore be questioned like museum objects: who made it, on what occasion, and how.",
      ],
      ref: "gell",
      fields: ["translation", "calligraphy", "music"],
    },
    {
      name: ["持续认知演化", "Continuing co-evolution"],
      title: [
        "AI 的产出回到人类文化与下一代模型",
        "AI's output returns to human culture and the next models",
      ],
      account: [
        "AI 的描述、译文与作品经引用、学习与再训练，回到人类文化与下一代模型之中；模型偏好的典型形式会在一轮轮复用中被放大。这一循环里，人类文化与 AI 认知共同演化。",
        "AI's descriptions, translations and works are cited, learned from and trained on, returning to human culture and to the next models; the typical forms a model prefers are amplified with each round of reuse. Within this loop, human culture and AI cognition evolve together.",
      ],
      evidence: [
        "在多轮传递中，模型的输出会被吸引到特定的“文化吸引子”；用模型生成的数据递归训练，会让原始分布的尾部逐渐消失。",
        "Across chains of transmission, model outputs drift towards cultural attractors; training recursively on generated data makes the tails of the original distribution disappear.",
      ],
      ref: "perez",
      fields: ["museum", "translation", "calligraphy", "music", "rights"],
    },
  ];
  const processes = [
    {
      name: ["记忆", "Remember"],
      title: ["提取已学过的信息", "Retrieve something previously learned"],
      account: [
        "记忆是从长时记忆中提取与当前问题有关的知识。再认要求判断眼前材料是否与所学相符，回忆要求根据线索重新提取内容。两者给出的答题线索不同。",
        "Remembering retrieves relevant knowledge from long-term memory. Recognition asks whether something presented matches what was learned. Recall requires retrieving the content from a cue. The amount of support available can change the demands of the same question.",
      ],
      evidence: [
        "让读者从四个器名中认出正确答案，再让他在没有选项时说出器名。记录提供了哪些线索，才能解释两次成绩的差别。",
        "Compare choosing a vessel’s name from four options with supplying its name unaided. Record which cues were available before interpreting a difference in performance.",
      ],
    },
    {
      fields: ["museum"],
      name: ["理解", "Understand"],
      title: ["从表达中建构意义", "Construct meaning from an expression"],
      account: [
        "理解涉及从言语、文字或图像中建构意义。解释、比较和推断都要求把新材料与已有概念联系起来。能否说明换一种表达后哪些关系仍然成立，是检验理解的一种方式。",
        "Understanding builds meaning from a message by relating it to concepts already held. Interpretation, comparison and inference each make such a relationship explicit. Explaining what carries over when the wording changes provides evidence of understanding.",
      ],
      evidence: [
        "把译文中的敬称换成名字，请读者结合上下文，说明人物关系听起来有何变化。",
        "Replace an honorific in a translation with a given name. Ask the reader to explain, using the passage, how the relationship now sounds.",
      ],
    },
    {
      name: ["应用", "Apply"],
      title: [
        "在具体情境中执行程序",
        "Carry out a procedure in a particular case",
      ],
      account: [
        "应用把程序性知识用在具体情境。执行强调在熟悉任务中调用既有程序，实施则要求在陌生情境中选出并运用适合的程序。新情境提出什么选择，决定了迁移的难度。",
        "Application puts procedural knowledge to work. Executing calls up a procedure in a familiar task. Implementing requires selecting and using a suitable procedure in an unfamiliar situation. The choices the new case demands determine the extent of transfer.",
      ],
      evidence: [
        "教会学习者一条乐句重音标注规则，再给出节拍不同的乐句。观察他如何选择适用位置，并说明选择理由。",
        "Teach a rule for marking musical accents, then offer a phrase in a different metre. Examine where the learner applies the rule and why.",
      ],
    },
    {
      name: ["分析", "Analyze"],
      title: [
        "分辨部分及其相互关系",
        "Distinguish parts and explain their relationships",
      ],
      account: [
        "分析把材料分解为有作用的部分，识别哪些成分有关、它们怎样组织，以及这种组织体现了什么立场或目的。列出部分之后，还要解释它们怎样共同产生整体效果。",
        "Analysis differentiates relevant parts, establishes their organisation and can identify the purpose or point of view that organisation expresses. Naming the parts is a starting point. The explanation must show how their relationships produce the whole.",
      ],
      evidence: [
        "对照两幅书法作品，分析字距、行轴和墨色怎样引导阅读。试问移走一行会怎样改变整体结构。",
        "Compare character spacing, column alignment and ink density in two calligraphic works. Ask how removing one line would alter their organisation.",
      ],
    },
    {
      fields: ["translation", "music"],
      name: ["评价", "Evaluate"],
      title: ["按明示的标准作判断", "Judge against an explicit criterion"],
      account: [
        "评价依据标准作判断。核查考察一个解释或作品内部是否一致，批评则依照外部准则判断它是否恰当。评价者须说明所用的标准，以及什么证据会改变结论。",
        "Evaluation makes a judgement against criteria. Checking assesses internal consistency. Critiquing tests suitability against an external standard. A reasoned judgement makes clear which criterion governs the decision and what evidence could change it.",
      ],
      evidence: [
        "两种译法可能分别保留节奏与礼貌程度。依据目标读者和翻译目的说明取舍，再用原文支持判断。",
        "Two translations may preserve rhythm and social register differently. State which matters for the intended audience and support the judgement with evidence from the original.",
      ],
    },
    {
      fields: ["calligraphy", "music"],
      name: ["创造", "Create"],
      title: ["组织材料以形成新的整体", "Organise materials into a new whole"],
      account: [
        "创造把已有要素重组为具有内在联系的新整体。提出方案拓展可能性，规划为选定方案安排结构，制作将它实现。成品可以显示整合结果，对构思过程的判断则需要过程证据。",
        "Creation reorganises elements into a coherent new whole. Generating opens alternatives, planning structures a chosen approach, and producing realises it. A finished work can show the resulting integration. Inferring how the maker arrived there calls for evidence of the process.",
      ],
      evidence: [
        "为短诗创作书法时，草稿可记录书体和行序的备选方案。对照草稿、修改与成品，才能追踪创作者怎样处理留白与布局。",
        "For a calligraphic setting of a poem, sketches can record alternative scripts and line orders. Compare drafts, revisions and the finished work to trace how the maker resolved spacing and layout.",
      ],
    },
  ];
  const words = {
    heading: ["人类学如何连接五个领域", "An anthropological foundation"],
    geertzHead: ["厚描与公共意义", "Thick description and public meaning"],
    geertzText: [
      "格尔茨把文化理解为维系公共生活的意义之网。厚描重建人们据以辨认行动的约定、意图和处境。动作的外形可以相同，社会意义却取决于参与者在特定关系中把它理解成什么。",
      "Geertz treats culture as webs of significance sustained in public life. Thick description reconstructs the conventions, intentions and circumstances that make an act intelligible to participants. The same visible movement can have different social meanings within different relationships.",
    ],
    latourHead: ["中介与转译", "Mediation and translation"],
    latourText: [
      "拉图尔把行动能力理解为关系中的效果。行动者网络理论区分按原样传递的环节与在传递中改变行动的中介。人、物、制度和技术都可能参与这种转译。它们各自造成了什么变化，需要沿实际联系逐环追踪。",
      "For Latour, the capacity to act arises through relations. Actor-network theory distinguishes intermediaries that carry something through from mediators that transform it. People, objects, institutions and technologies may all participate in such translations. Their different contributions have to be traced through the associations themselves.",
    ],
    perspectives: ["认知科学的六个学科视角", "Six perspectives on cognition"],
    processes: ["布鲁姆的六类认知过程", "Six cognitive processes"],
    procLead: [
      "安德森、克拉斯沃尔等人的修订版将知识类型与认知操作交叉。事实性、概念性、程序性和元认知知识都可以成为不同操作的对象。一项学习目标因此同时说明学习者处理什么知识，以及怎样处理它。",
      "The revision by Anderson, Krathwohl and colleagues crosses knowledge type with cognitive operation. Factual, conceptual, procedural and metacognitive knowledge can each be the object of different operations. A learning objective therefore specifies both the knowledge involved and what the learner does with it.",
    ],
    question: ["研究问题", "Research question"],
    aiTitle: [
      "人工智能与认知科学如何彼此启发？",
      "How do AI and cognitive science inform each other?",
    ],
    criteria: [
      "关于人的解释，还须在竞争理论给出不同预测之处，用独立的人类数据来检验。",
      "A claim about human cognition needs independent human data from conditions in which competing theories make different predictions.",
    ],
  };
  const paths = [
    {
      from: ["认知科学", "Cognitive science"],
      to: ["人工智能", "AI"],
      label: [
        "把认知理论转成模型约束",
        "Turn cognitive theory into a model constraint",
      ],
      detail: [
        "马尔的三个解释层次分别考察问题及其求解理由、表征与算法，以及这些运算的物理实现。认知假设可以据此约束模型的设计，或预言它在哪些条件下会犯错。算法在机器上有效，仍留下人脑如何实现该功能的问题。",
        "Marr distinguishes the problem a system solves and why, the representations and algorithms it uses, and their physical implementation. A cognitive hypothesis can constrain a model’s design or predict when it will fail. An algorithm’s success on a machine leaves open how a human brain implements that function.",
      ],
      example: [
        "如果轮廓表征支持物体识别，可以保持器形不变、替换表面纹样，观察模型改变了哪些分类。线索冲突能够检验该模型对这组刺激的依赖，结论也受线索制作方式约束。",
        "If contour representations support recognition, hold a vessel’s outline fixed and swap its surface pattern. Changes in categorisation can reveal the model’s reliance on a cue under these test conditions. The inference depends on how the conflicting cues were constructed.",
      ],
      ref: "geirhos",
    },
    {
      from: ["人工智能", "AI"],
      to: ["认知科学", "Cognitive science"],
      label: [
        "用模型区分竞争性解释",
        "Use models to distinguish rival explanations",
      ],
      detail: [
        "相同的行为结果可能与多种机制相容。将每种机制写成可运行模型，可以找出它们作出不同预测的刺激。戈兰等人用这类刺激检验模型对人类判断的预测。独立的人类数据可以区分候选解释，预测较准的模型仍须接受进一步的机制检验。",
        "The same observed behaviour can be compatible with several mechanisms. Implementing the alternatives makes it possible to find stimuli on which their predictions diverge. Golan and colleagues used such stimuli to compare models against human judgements. Independent human data can distinguish candidates while leaving the winning model’s mechanism open to further tests.",
      ],
      example: [
        "分别用轮廓和纹理预测器物分类，固定模型并选择两者预测相反的图像，再请新观察者逐项判断。若要把这种偏好归于特定神经回路，还需要对该回路的测量或干预。",
        "Fit one account of vessel recognition to outline and another to texture. Freeze both models, select images on which they disagree and collect item-level choices from new observers. A proposed neural explanation would also require measurements or interventions at the relevant circuit.",
      ],
      ref: "golan",
    },
  ];

  const vertices = [
    [240, 33],
    [348, 96],
    [348, 221],
    [240, 284],
    [132, 221],
    [132, 96],
  ];
  const screens = {
    stance: {
      selection: null,
      title: [
        "AI 正在成为编织意义之网的行动者",
        "AI is becoming an actor in the web of meaning",
      ],
      intro: [
        "格尔茨说，人编织意义之网，文化就是这张网。拉图尔补充，非人的行动者也在编织这张网。AI 生成的描述、译文与作品一经被引用、临摹、再训练，就成为网中的节点，参与重组人类理解文化的关系。",
        "Geertz: people spin webs of significance, and culture is those webs. Latour: non-human actors weave them too. Once AI's descriptions, translations and works are cited, copied and trained on, they become nodes in the web and reshape how people understand culture.",
      ],
    },
    anthropology: {
      selection: null,
      title: [
        "从意义之网到行动者网络",
        "From webs of meaning to actor-networks",
      ],
      intro: [
        "作品的意义从哪里来，又如何在流转中改变？选择一条理论路径。",
        "Where does a work’s meaning come from, and how does it travel? Choose a line of inquiry.",
      ],
    },
    disciplines: {
      selection: null,
      title: words.perspectives,
      intro: [
        "一个问题可借用若干学科。选择六边形上的一个顶点。",
        "One question can draw on several disciplines. Select a vertex of the hexagon.",
      ],
    },
    processes: {
      selection: null,
      title: words.processes,
      intro: [
        "修订版布鲁姆分类区分知识类型与认知操作。本课题把评测推向上端：评价意义是否被保留，再到创作本身。选择一层，查看它界定的操作。",
        "The revised taxonomy distinguishes types of knowledge from operations on knowledge. This project pushes evaluation towards the top: judging whether meaning survives, and then creating. Select a tier to examine an operation.",
      ],
    },
    ai: {
      selection: null,
      title: ["同源共生，双向启发", "A shared origin, two directions"],
      intro: [
        "20 世纪 50 年代的认知革命中，心理学、认知科学与人工智能几乎同时起步，从此互相借力。AI 开始生产文化之后，它产出了什么、保留了什么、改变了什么，需要人类学、语言学与艺术的眼光来回答。AI + 人文不是跨界，而是回到认知革命的起点。",
        "Psychology, cognitive science and AI began almost together in the cognitive revolution of the 1950s and have borrowed from each other ever since. Now that AI produces culture, what it makes, keeps and changes needs the eyes of anthropology, linguistics and the arts. AI and the humanities are not crossing a border; they are returning to where the cognitive revolution began.",
      ],
    },
  };
  const supporting = {
    anthropology: [
      {
        name: words.geertzHead,
        title: [
          "怎样解释一种行动的意义？",
          "How does an act become intelligible?",
        ],
        account: words.geertzText,
        fields: ["museum", "calligraphy"],
        evidence: [
          "格尔茨借眨眼说明，眼睑一动可能是抽动、暗号，也可能是在模仿别人的暗号。对物品作厚描同样要问，当事人如何区分一次供奉、一次礼赠与一次交易。",
          "Geertz’s wink can be a twitch, a signal or a parody of someone else’s signal. A thick description of an object’s movement likewise asks how participants distinguish an offering, a gift and a sale.",
        ],
        ref: "geertz",
      },
      {
        name: words.latourHead,
        title: [
          "关系怎样赋予行动能力？",
          "How do relations give actors the capacity to act?",
        ],
        account: words.latourText,
        fields: ["translation", "rights"],
        evidence: [
          "口述来历被编目字段压缩为产地，检索系统再按产地分组。对照口述记录、表格和检索结果，可以辨认哪一环改变了后续行动。描述软件的作用之后，仍须分别查证人的意图、决定和责任。",
          "An accession form can compress an oral history into one place of origin, which software then uses to group objects. Compare testimony, records and search results to locate the transformation. Describing the software’s contribution leaves intention and responsibility as distinct questions.",
        ],
        ref: "latour",
      },
    ],
    stance,
    ai: paths.map((p) => ({
      name: [p.from[0] + " → " + p.to[0], p.from[1] + " → " + p.to[1]],
      title: p.label,
      account: p.detail,
      evidence: p.example,
      ref: p.ref,
    })),
    disciplines,
    processes,
  };
  const modes = {
    stance: ["立场", "Stance"],
    anthropology: ["人类学", "Anthropology"],
    disciplines: ["六学科", "Disciplines"],
    processes: ["六层级", "Levels"],
    ai: ["同源共生", "Shared origin"],
  };
  const starts = {
    stance: [0, ["新的描述者看到了什么？", "What does a new describer see?"]],
    anthropology: [
      0,
      ["同一次眨眼可以有几种意义？", "When does a blink become a wink?"],
    ],
    disciplines: [
      2,
      [
        "语言学如何解释一个称谓？",
        "How does a term of address convey a relationship?",
      ],
    ],
    processes: [
      3,
      [
        "怎样从笔画分析一幅作品？",
        "How do individual strokes organise a work?",
      ],
    ],
    ai: [
      1,
      [
        "同样的判断可能来自哪些机制？",
        "Can different mechanisms reach the same judgement?",
      ],
    ],
  };
  const connections = {
    stance: [
      [
        "anthropology",
        1,
        ["从行动者网络理论读起", "Start from actor-network theory"],
      ],
      [
        "disciplines",
        2,
        ["语言学怎样看转述", "How linguistics reads a retelling"],
      ],
      ["processes", 5, ["从评价走向创造", "From evaluating to creating"]],
    ],
    anthropology: [
      [
        "disciplines",
        2,
        [
          "从公共意义到语言的共同基础",
          "Connect shared meaning to common ground",
        ],
      ],
      [
        "processes",
        3,
        ["分析一条记录经过哪些转换", "Analyse how a record changes in transit"],
      ],
    ],
    disciplines: [
      [
        "anthropology",
        0,
        ["追溯格尔茨的厚描", "Trace this account to thick description"],
      ],
      [
        "processes",
        4,
        ["考察判断作品的标准", "Examine the criteria behind a judgement"],
      ],
      [
        "processes",
        1,
        ["理解译文中的社会关系", "Examine how a reader infers meaning"],
      ],
      [
        "ai",
        1,
        ["比较两种分类机制", "Compare rival accounts of categorisation"],
      ],
      [
        "ai",
        1,
        ["区分行为预测与神经机制", "Separate prediction from neural mechanism"],
      ],
      [
        "ai",
        0,
        ["给可执行模型加上认知约束", "Give a model a cognitive constraint"],
      ],
    ],
    processes: [
      [
        "disciplines",
        3,
        ["追问记忆怎样参与分类", "Ask how memory shapes categorisation"],
      ],
      [
        "disciplines",
        2,
        ["用语用学解释称谓", "Interpret a term of address through pragmatics"],
      ],
      [
        "disciplines",
        5,
        ["把程序写成一系列运算", "Specify a procedure as a computation"],
      ],
      [
        "anthropology",
        1,
        [
          "沿着中介关系分析改变",
          "Follow a transformation through its mediators",
        ],
      ],
      [
        "disciplines",
        1,
        ["追问作品判断的依据", "Examine the grounds for judging a work"],
      ],
      [
        "processes",
        4,
        ["用明示标准评价作品", "Judge a work against explicit criteria"],
      ],
    ],
    ai: [
      [
        "disciplines",
        5,
        [
          "考察目标、表征与运算",
          "Examine goals, representations and operations",
        ],
      ],
      [
        "disciplines",
        3,
        [
          "推导分类错误的不同模式",
          "Predict different patterns of classification error",
        ],
      ],
    ],
  };
  const studies = {
    pothen: ["Pothen · 藏品的文化归属", "Pothen · Cultural attribution"],
    polytropos: [
      "Polytropos · 藏品描述与重建",
      "Polytropos · Object descriptions",
    ],
    diting: ["谛听 · 文学翻译评测", "DITING · Literary translation"],
  };
  const studyIds = {
    stance: ["polytropos", "diting", null],
    anthropology: ["pothen", "polytropos"],
    disciplines: ["pothen", "pothen", "diting", "pothen", null, "polytropos"],
    processes: ["pothen", "diting", null, "polytropos", "diting", null],
    ai: ["polytropos", "pothen"],
  };
  function modeNav(view, l) {
    const buttons = Object.entries(modes)
      .map(
        ([key, label]) =>
          `<button type="button" data-view="${key}" class="fw-mode"${key === view ? ' aria-current="page"' : ""}>${label[l]}</button>`,
      )
      .join("");
    return `<nav class="fw-modes" aria-label="${l ? "Theory topics" : "理论主题"}">${buttons}</nav>`;
  }
  const source = (key) => {
    const [label, url] = sources[key];
    return (
      '<a class="fw-source" href="' +
      url +
      '">' +
      label +
      '<span aria-hidden="true"> ↗</span></a>'
    );
  };
  function control(view, i) {
    const active = screens[view].selection;
    return (
      'class="fw-control" data-id="' +
      i +
      '" aria-pressed="' +
      (active === i) +
      '" aria-controls="fw-reading" tabindex="' +
      ((active ?? 0) === i ? 0 : -1) +
      '"'
    );
  }
  function hexagon(l) {
    const outline = vertices.map((p) => p.join(",")).join(" ");
    const rays = vertices
      .map(([x, y]) => '<path d="M240 158L' + x + " " + y + '"/>')
      .join("");
    const verticesUI = vertices
      .map(
        ([x, y], i) =>
          '<g role="button" ' +
          control("disciplines", i) +
          ' transform="translate(' +
          x +
          " " +
          y +
          ')" aria-label="' +
          disciplines[i].name[l] +
          '"><rect class="fw-hit" x="-86" y="-33" width="172" height="75" rx="7"/><circle class="fw-halo" r="12"/><circle class="fw-dot" r="5.3"/><text class="fw-node-name" y="31">' +
          disciplines[i].name[l] +
          "</text></g>",
      )
      .join("");
    return (
      '<svg class="fw-hex" viewBox="0 0 480 317" role="group" aria-label="' +
      words.perspectives[l] +
      '"><g class="fw-rays" aria-hidden="true">' +
      rays +
      '</g><polygon class="fw-outline" aria-hidden="true" points="' +
      outline +
      '"/><text class="fw-centre" x="240" y="161" text-anchor="middle" aria-hidden="true">' +
      words.question[l] +
      "</text>" +
      verticesUI +
      "</svg>"
    );
  }
  function pyramid(l) {
    const bands = processes.map((p, i) => {
      const row = 5 - i;
      const top = 6 + row * 67,
        bottom = top + 63,
        a = row * 23,
        b = (row + 1) * 23;
      const points = [
        [192 - a, top],
        [192 + a, top],
        [192 + b, bottom],
        [192 - b, bottom],
      ]
        .map((v) => v.join(","))
        .join(" ");
      const mid = (top + bottom) / 2,
        leader = 192 + (a + b) / 2;
      return (
        '<g role="button" ' +
        control("processes", i) +
        ' aria-label="' +
        p.name[l] +
        '"><rect class="fw-hit" x="' +
        (192 - b) +
        '" y="' +
        top +
        '" width="' +
        (443 - (192 - b)) +
        '" height="66" rx="4"/><polygon class="fw-band" points="' +
        points +
        '"/><line class="fw-leader" x1="' +
        leader +
        '" x2="335" y1="' +
        mid +
        '" y2="' +
        mid +
        '"/><text class="fw-tier-name" x="345" y="' +
        (mid + 6) +
        '">' +
        p.name[l] +
        "</text></g>"
      );
    });
    return (
      '<svg class="fw-pyramid" viewBox="37 0 430 412" role="group" aria-label="' +
      words.processes[l] +
      '">' +
      bands.reverse().join("") +
      "</svg>"
    );
  }
  function fork(view, l) {
    const captions =
      view === "anthropology"
        ? [
            ["格尔茨", "Geertz"],
            ["拉图尔", "Latour"],
          ]
        : view === "stance"
          ? [
              [
                "前序工作 Pothen · Polytropos",
                "Prior work: Pothen · Polytropos",
              ],
              ["翻译 · 书法 · 音乐", "Translation · calligraphy · music"],
              ["文化与认知的循环", "A loop of culture and cognition"],
            ]
          : [
              [paths[0].label[0], paths[0].label[1]],
              [paths[1].label[0], paths[1].label[1]],
            ];
    const options = supporting[view]
      .map(
        (row, i) =>
          '<button type="button" ' +
          control(view, i) +
          '><span class="fw-fork-title">' +
          row.name[l] +
          "</span><small>" +
          captions[i][l] +
          "</small></button>",
      )
      .join("");
    return (
      '<div class="fw-fork" role="group" aria-label="' +
      screens[view].title[l] +
      '">' +
      options +
      "</div>"
    );
  }
  function nav(view, l, idx) {
    const [start, prompt] = starts[view];
    let related;
    if (idx === null) {
      related = `<button class="fw-start" type="button" data-start="${start}">${prompt[l]} <span aria-hidden="true">→</span></button>`;
    } else {
      const [target, choice, label] = connections[view][idx];
      related = `<button type="button" data-view="${target}" data-choice="${choice}">${label[l]} <span aria-hidden="true">→</span></button>`;
    }
    const id = studyIds[view][idx ?? start];
    const study = id
      ? `<button type="button" class="fw-study" data-paper="${id}">${studies[id][l]} <span aria-hidden="true">↗</span></button>`
      : "";
    return `<nav class="fw-links" aria-label="${l ? "Related paths and research" : "相连的理论与研究"}">${related}${study}</nav>`;
  }
  function narrative(view, index, l, open) {
    if (index === null) return "";
    const item = supporting[view][index];
    const deeper = l ? "Theory and source" : "理论脉络与原典";
    let context = "";
    let commonRef = "";
    if (view === "stance")
      context = l
        ? "The project studies this new group through two kinds of material: AI's descriptions of cultural heritage, read as its understanding and expression, and AI's own creations, treated as museum objects."
        : "本课题以两类材料研究这个新群体：以 AI 对文化遗产的描述作为它的理解与表达，以 AI 的创作作为藏品来研究。";
    if (view === "anthropology")
      context = l
        ? "Anthropology grounds all five fields and also contributes one disciplinary perspective in the cognitive science hexagon."
        : "人类学是五个领域的共同理论基础，在认知科学六边形中也提供一个学科视角。";
    if (view === "disciplines") {
      context = l
        ? "The hexagon revisits a 1978 report on cognitive science. Its vertices mark disciplinary perspectives and can be combined as a question requires."
        : "六边形源自 1978 年的认知科学报告。六个顶点表示可以组合使用的学科视角。";
      commonRef = "miller";
    }
    if (view === "processes") {
      context = words.procLead[l];
      commonRef = "bloom";
    }
    if (view === "ai" && index === 0) commonRef = "marr";
    if (view === "stance" && index === 2) commonRef = "shumailov";
    const role = item.role
      ? '<p class="fw-role"><strong>' +
        (l ? "In this project" : "在本课题中") +
        "</strong>" +
        item.role[l] +
        "</p>"
      : "";
    const reach = (item.fields || [])
      .filter(() => view !== "disciplines" || index !== 5)
      .map(
        (id) =>
          '<button type="button" class="fw-field" data-field="' +
          id +
          '">' +
          (window.fieldName?.(id, l) || id) +
          "</button>",
      )
      .join("");
    return (
      '<span class="fw-eyebrow">' +
      item.name[l] +
      "</span><h4>" +
      item.title[l] +
      "</h4>" +
      role +
      (reach ? '<div class="fw-reach">' + reach + "</div>" : "") +
      "<p>" +
      item.account[l] +
      "</p><details" +
      (open ? " open" : "") +
      "><summary>" +
      deeper +
      "</summary><p>" +
      item.evidence[l] +
      "</p>" +
      (context ? "<p>" + context + "</p>" : "") +
      '<div class="fw-citations">' +
      (item.ref ? source(item.ref) : "") +
      (commonRef ? source(commonRef) : "") +
      "</div></details>"
    );
  }
  function showChoice(root, view, selection, l, focus = false) {
    screens[view].selection = selection;
    root.querySelector(".fw-body").dataset.active = String(selection !== null);
    for (const button of root.querySelectorAll(".fw-control")) {
      const index = Number(button.dataset.id);
      button.setAttribute("aria-pressed", String(index === selection));
      button.setAttribute(
        "tabindex",
        String(index === (selection ?? 0) ? 0 : -1),
      );
      if (focus && index === selection) button.focus({ preventScroll: true });
    }
    const reading = root.querySelector("#fw-reading");
    reading.hidden = selection === null;
    reading.innerHTML = narrative(
      view,
      selection,
      l,
      screens[view].open ?? false,
    );
    root.querySelector(".fw-nav").innerHTML = nav(view, l, selection);
  }
  // Short names let the map name a theory item beside a constellation.
  window.theoryName = (view, index, lang) => {
    const l = lang === 1 ? 1 : 0;
    if (view === "anthropology")
      return [
        ["格尔茨", "Geertz"],
        ["拉图尔", "Latour"],
      ][index]?.[l];
    const row = supporting[view]?.[index];
    return row ? row.name[l] : modes[view]?.[l];
  };
  window.theoryViews = Object.keys(modes);
  window.theorySelected = (view) => screens[view]?.selection ?? null;
  // The constellations an item speaks to, so the map can light them.
  window.theoryFields = (view, index) =>
    Number.isInteger(index) ? supporting[view]?.[index]?.fields || [] : [];
  window.renderTheory = function renderTheory(
    lang,
    view = "stance",
    selection = null,
  ) {
    const root = document.getElementById("theory-inner");
    if (!root || !(view in screens)) return;
    const old = root.querySelector(".fw");
    const float = root.closest(".theory-float");
    const noteScroll = float?.scrollTop ?? 0;
    if (old && screens[old.dataset.view])
      screens[old.dataset.view].open =
        old.querySelector(".fw-reading details")?.open ?? false;
    const l = lang === 1 ? 1 : 0;
    const rows = supporting[view],
      state = screens[view];
    if (
      Number.isInteger(selection) &&
      selection >= 0 &&
      selection < rows.length &&
      state.selection !== selection
    ) {
      state.selection = selection;
      state.open = false;
    }
    let scope = "";
    if (view === "anthropology")
      scope = l
        ? "A shared foundation for the five cultural fields, and one of the six cognitive science disciplines."
        : "五个文化领域共同的理论基础，也是认知科学六个学科之一。";
    if (view === "processes")
      scope = l
        ? "The tiers organise tasks by broad complexity. They can overlap and recur in any order. Neural mechanisms need separate evidence."
        : "层级按任务的大致复杂度排列，可以重叠，也可往返。神经机制需要独立证据。";
    if (view === "ai") scope = words.criteria[l];
    if (view === "stance")
      scope = l
        ? "The five fields unfold along one loop: understand and describe, retell, create, meet people, then return and attribution."
        : "五个领域沿同一条循环展开：理解与描述、转述、创作、与人互动，再回流与归属。";
    const graphics =
      view === "disciplines"
        ? hexagon(l)
        : view === "processes"
          ? pyramid(l)
          : fork(view, l);
    root.innerHTML = `<div class="fw" data-view="${view}" lang="${l ? "en" : "zh-CN"}">${modeNav(view, l)}
        <div class="fw-body">
          <header class="fw-header"><h2>${state.title[l]}</h2><p>${state.intro[l]}</p></header>
          <div class="fw-visual">${graphics}</div>
          <div class="fw-companion">
            ${scope ? '<p class="fw-scope">' + scope + "</p>" : ""}
            <div class="fw-reading" id="fw-reading" aria-live="polite" aria-atomic="true"></div>
            <div class="fw-nav"></div>
          </div>
        </div></div>`;
    showChoice(root, view, state.selection, l);
    const shell = root.querySelector(".fw");
    if (float) float.scrollTop = old?.dataset.view === view ? noteScroll : 0;
    function revealInNote(target, amount, smooth) {
      const top = float.getBoundingClientRect().top + float.clientTop;
      const floor = top + float.clientHeight - 8;
      const header =
        Math.max(
          top,
          shell.querySelector(".fw-modes").getBoundingClientRect().bottom,
        ) + 4;
      const bounds = target.getBoundingClientRect();
      const end = bounds.top + Math.min(amount, bounds.height);
      const delta =
        bounds.top < header ? bounds.top - header : Math.max(0, end - floor);
      if (Math.abs(delta) < 1) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      float.scrollBy({
        top: delta,
        behavior: smooth && !reduced ? "smooth" : "instant",
      });
    }
    function choose(idx, focus, revealFocus = focus) {
      window.onTheorySelect?.(view, idx);
      if (idx !== state.selection) state.open = false;
      else
        state.open = root.querySelector(".fw-reading details")?.open ?? false;
      showChoice(root, view, idx, l, focus);
      root.querySelector("#fw-reading").dataset.choiceEntered = "";
      if (float && revealFocus) {
        revealInNote(
          shell.querySelector('.fw-control[aria-pressed="true"]'),
          Infinity,
          false,
        );
      }
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const marker = shell.querySelector(
          '.fw-control[aria-pressed="true"] :is(.fw-halo,.fw-band,.fw-fork-title)',
        );
        if (marker?.animate) {
          // Restart only this mark if the same option is pressed in quick succession.
          marker
            .getAnimations()
            .find((effect) => effect.id === "fw-choice-pulse")
            ?.cancel();
          marker.animate(
            [{ filter: "brightness(1.65)" }, { filter: "brightness(1)" }],
            {
              duration: 225,
              easing: "cubic-bezier(.2,.7,.25,1)",
              id: "fw-choice-pulse",
            },
          );
        }
      }
    }
    const pointed = (event, on) => {
      const control = event.target.closest(".fw-control");
      if (control)
        window.onTheoryHover?.(view, on ? Number(control.dataset.id) : null);
    };
    shell.addEventListener("pointerover", (event) => pointed(event, true));
    shell.addEventListener("pointerout", (event) => pointed(event, false));
    shell.addEventListener("click", (event) => {
      const field = event.target.closest("[data-field]");
      if (field) {
        window.exploreField?.(field.dataset.field);
        return;
      }
      const origin = event.target.closest(
        ".fw-control,[data-start],[data-paper],button[data-view]",
      );
      if (!origin) return;
      if (origin.matches(".fw-control") || origin.dataset.start !== undefined) {
        const started = origin.dataset.start !== undefined;
        choose(
          Number(started ? origin.dataset.start : origin.dataset.id),
          started,
          started && !event.detail,
        );
        if (event.detail && float) {
          revealInNote(root.querySelector("#fw-reading"), 110, true);
        } else if (
          event.detail &&
          window.matchMedia("(max-width:760px)").matches
        ) {
          const detail = root.querySelector("#fw-reading");
          if (detail.getBoundingClientRect().top > window.innerHeight - 125) {
            detail.scrollIntoView({
              block: "nearest",
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          }
        }
      } else if (origin.dataset.paper)
        window.explorePaper?.(origin.dataset.paper);
      else if (origin.matches(".fw-mode") && origin.dataset.view === view) {
        root
          .querySelector('.fw-control[tabindex="0"]')
          ?.focus({ preventScroll: true });
      } else {
        window.exploreView?.(
          origin.dataset.view,
          origin.dataset.choice === undefined
            ? null
            : Number(origin.dataset.choice),
        );
        if (origin.matches(".fw-mode")) {
          document
            .querySelector("#theory-inner .fw-mode[aria-current=page]")
            ?.focus({ preventScroll: true });
        }
      }
    });
    shell.addEventListener("keydown", (event) => {
      const button = event.target.closest(".fw-control");
      if (!button) return;
      const current = Number(button.dataset.id);
      const up = view === "processes" ? 1 : -1;
      const moves = {
        ArrowRight: 1,
        ArrowLeft: -1,
        ArrowUp: up,
        ArrowDown: -up,
      };
      let index;
      if (event.key in moves)
        index = (current + moves[event.key] + rows.length) % rows.length;
      else if (event.key === "Home") index = 0;
      else if (event.key === "End") index = rows.length - 1;
      else if (
        (event.key === "Enter" || event.key === " ") &&
        button.tagName.toLowerCase() === "g"
      )
        index = current;
      else return;
      event.preventDefault();
      choose(index, true);
    });
  };
})();
