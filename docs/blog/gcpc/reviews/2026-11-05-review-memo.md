# GCPC blog 评审备忘

2026-11-05

对象：https://sophie508.github.io/blog/gcpc/（页面自标 DRAFT，2026-11-05 读取）。总判断：页面设计和渐进披露做得扎实，Fig 10、Fig 12 两个交互是真正起作用的；主要问题是文字和图各讲一遍同一件事，高潮被实现细节和免责声明稀释，所以读起来谨慎有余、吸引力不足。下面每条都写了页面上的位置、依据的原则和建议的改法；"建议"都是建议，不是定稿。

01 节按这份备忘重写的参考稿见同目录 `gcpc-section01-rewrite.md`。

## 1. 文图分工：文字和图在重复同一件事

这是全篇最大的冗余来源，也是"交互图和内容没有相辅相成"的直接原因。模式很固定：正文先把结论和数字说一遍，图再展示一遍，图注再解释一遍，下一节开头再回顾一遍。读者每个事实要读三到四次，而真正该让图去"揭示"的时刻，因为正文已经剧透，变成了确认。

依据：Mayer 多媒体学习的冗余原则（redundancy principle）：同一信息用两种形式并列呈现时，学习效果反而下降，因为读者要花认知资源去核对两边是否一致。Tufte 的"证据整合"主张图和文各自承担不可替代的部分，而不是互为备份。Distill 式文章的通行做法是：图承载主张和数字，文字承载论证和过渡，一个数字在正文里只出现一次，而且是在图揭示它的那一刻，或者干脆不出现在正文里。

页面上的具体实例：

| 位置 | 正文已经说了什么 | 图又展示了什么 | 后面还重复了什么 | 建议 |
| --- | --- | --- | --- | --- |
| 01 节，Fig 3 之前 | "The official verifier detects this difference. It cannot find the required PivotTables in the first file. In the second, it finds them..." | Fig 3 两栏对比：Ordinary summary cells vs Native PivotTable | Fig 3 图注再说一次 "structural sketches represent executed code" | 删正文那一段，让 Fig 3 自己说；正文只留一句过渡："Here is what the two runs actually built." |
| 01 节，Fig 4 | 正文没有预告 12 / 22，这里是对的 | Fig 4 格子图显示 12 pass / 22 pass | 02 节开头又写 "12 tests pass without the skill, and 22 pass with it" | 02 节的重复删掉，改成指代："The verifier already separates the two runs. So why build a checklist?" |
| 03 节，Fig 8 | 正文："Most reuse a test that already exists; some identify a missing executable check; a small fraction require judgment." | Fig 8 三根条：82.3% / 14.9% / 2.8% | 图注再解释一次 713 items | 二选一。建议留图删句，或者把句子改成图的标题 |
| 04 节，Fig 9 | 正文先定义了三种情况：met / not met / too little evidence | Fig 9 三张卡片 Yes / No / Abstain 再定义一遍 | Fig 9 图注再说 "An agent saying done is not sufficient" | 正文那段删掉，三张卡片就是定义。"saying done is not enough" 这句保留，它是有信息量的 |
| 04 节，Fig 10 之后 | Fig 10 已经让读者亲手看到 score 和 coverage 怎么变 | | 正文又写 "The score answers... Coverage answers..."，图注再写 "Read both numbers together" | 正文保留一句，指出高分低覆盖的陷阱即可；图注删到一句 |
| 05 节，Fig 11 | 正文在图后重复 "GCPC agreed... 73.0%... compared with 61.3%" | Fig 11 条形图已显示 73.0 / 69.1 / 61.3 / 56.9 | 正文接着解释 "73.0% is preference agreement, not a correlation" | 数字从正文删掉，正文只讲 0.382 vs 0.218 这组图里没有的数，以及"这是偏好一致率不是任务成功率"这个区分 |
| 05 节，Fig 12 | 正文在图之前就写了 "20.9% improved... 18.7% regressed... median change was zero" | Fig 12 的切换按钮承诺 "see what this single label hides"，但读者已经知道答案 | Fig 12 下方的文字再写一遍 20.9% 和 18.7% | 这是最可惜的一处。把 20.9 / 18.7 从正文全部拿掉，正文只说 879 对都是 FAIL，然后让切换按钮揭示。这个交互的价值全靠惊讶 |

一条可以直接执行的规则，建议改稿时逐图过一遍：每张图回答一个问题，这个问题由图前面的正文提出，答案只在图里出现一次，图注只写读图方法不写结论。图后面的正文只做两件事：说这个答案意味着什么，引出下一个问题。

## 2. 叙事与结构

**2.1 高潮来得太晚，前面挡着四段实现细节**

位置：01 节开头到 Fig 4。读者点了 "Start with an example" 之后，要先读关于 SA2_CODE、STATE、POPULATION_2023 的三段正文，再看一张五个 tab 的 Fig 2 示意图，再过 Fig 3 轮播，才在 Fig 4 看到真正的爆点：同样 FAIL，一个过 12 项、一个过 22 项。页面高度上这大约是三屏半。

依据：新闻写作的倒金字塔（先给结论再给背景）；Sweller 认知负荷理论里的外在负荷（extraneous load）：列名、字段名对理解"两次运行做了不同的工作"这个论点没有贡献，却占用工作记忆；Pinker 说的知识诅咒（curse of knowledge）：作者对这个 benchmark 太熟，把实现层的词当成了读者层的词。

建议顺序：两个 FAIL 徽章 → 格子图 12 对 22 → "所以它们到底各做了什么"→ 这时才讲任务，而且只讲到"合并两张表，做四张透视表"这个粒度。列名一律从正文移进折叠块或图里。

**2.2 最生动的细节被埋在中段**

位置：01 节 Fig 4 之后的一段普通正文：Quarter 这一列名字叫季度，实际指收入四分位，两次运行都在这里留下了 nan。这是全篇唯一一个有人情味的瞬间，一个命名陷阱让两个 agent 都翻车，而且它解释了为什么两次都 FAIL。

依据：叙事可视化研究（Segel & Heer 2010）和所有故事写作的共识：读者记住的是具体的意外，不是抽象的区分。

建议：把 Quarter 陷阱提到 01 节的主线上："为什么两次都 FAIL？因为一个叫 Quarter 的列。"然后才是"但除此之外，两次运行做的事完全不同"。Fig 4 里那个两边都红的格子可以默认高亮，就是它。

**2.3 免责声明密度太高**

位置：几乎每张图的图注。Fig 3 图注一句里三个 "not"；Fig 4 图注先说不是 checklist item，再说不是完成百分比；01 节结尾专门一段：不能证明因果、subtest 粒度不一、pytest 的 skipped 不是 GCPC 的 Abstain；Fig 11、Fig 12 图注同样。科学上每句都对，但读者每读一句正文就被拉回来警告一次。

依据：Mayer 的一致性原则（coherence principle）：删掉与当前论点无关的材料学习效果更好；Nielsen 的"美观与最小化设计"启发式：每一个多余单元都在和相关单元争注意力。这不是要删 caveat，是要换位置。

建议：图注一句话，只讲怎么读图。每节所有 caveat 收进一个折叠块，标题统一叫 "What this does not show"。页面已经有 34 个折叠块的基础设施，这个改动成本低。

**2.4 首屏的圆点图是装饰，不是内容**

位置：Fig 1。它是读者看到的第一个也是最大的视觉元素，编码的是每个任务的 checklist 条数。图注要专门写 "Darker = more checklist items, not a higher score"，说明作者自己也知道读者会误读。

依据：Tufte 的 data-ink 原则：不承载信息的墨水是 chartjunk；一个需要图注来纠正直觉的编码，是在和读者的预期对抗。Shneiderman 的 "overview first" 要求概览图呈现的是读者关心的变量。

建议（二选一）：用 879 对 FAIL→FAIL 的点阵替换，默认全灰，滚动或悬停时分成绿 / 灰 / 红三色，把全篇的结论在首屏预演一遍；或者缩小成辅助元素，把两个 FAIL 徽章放到首屏。

**2.5 文字干净，但没有声音**

位置：全篇。句子都短、都准，但没有一处"我们当时没料到"或者一个具体画面。唯一有语气的地方是两段引言（"Which requirements are met..." 和 "Keep the final verdict."）。

依据：Mayer 的个性化原则（personalization principle）：对话体比正式体学习效果更好。Olah & Carter 在 Distill 的 Research Debt 一文里讲的"蒸馏"，核心就是把作者的理解过程替读者走一遍，而不是把结论排好。

建议：每节允许一句第一人称或一个具体画面。比如 05 节的 SWE-bench 部分可以写成"我们以为换个 benchmark 也能用，结果 42% 的条目判不了"。这不是改文风，是给读者一个跟着走的人。

## 3. 交互与界面

**3.1 交互分两种：有揭示的，和只有操作的**

标准：一个控件被点之后，是否改变了一个读者已经在意的数字或结论。依据：Bret Victor 的 Explorable Explanations：反应式文档的价值在于读者改一个输入就看到结论跟着变，否则交互只是玩具。

| 图 | 交互 | 点了之后变了什么 | 判断 | 建议 |
| --- | --- | --- | --- | --- |
| Fig 1 | 悬停 / 选中圆点 | 显示条数，跳到任务 | 只有操作 | 见 2.4 |
| Fig 2 | 五个 tab | 同样的结构换个字段名再显示一遍 | 只有操作 | 去掉 tab，只画 Population by State 一张，其余四张一句话带过 |
| Fig 3 | 轮播 1/3，Prev / Next | 换一组对比 | 只有操作，且藏内容 | 三组平铺，或合并进 3.4 说的单图 |
| Fig 4 | 点格子 | 显示该 subtest 在两次运行的结果 | 有揭示，但弱 | 默认高亮 Quarter 那一格，让读者不点也能得到最重要的一条 |
| Fig 6 | 展开条目高亮来源 | 看到每条要求引自任务文本哪里 | 有揭示 | 保留。这是"grounded"这个词的视觉证据 |
| Fig 10 | 选 R5 的结果 | score 和 coverage 跟着变 | 有揭示，全篇最好 | 保留，作为其他交互的模板 |
| Fig 12 | 切换 Final / Checklist | 一块 FAIL 分成三段 | 有揭示，但被正文剧透 | 见 1 节最后一行 |

**3.2 轮播和 tab 藏内容**

Fig 3 要点两次 Next 才知道后面还有什么。依据：Nielsen Norman Group 对轮播的可用性研究：用户很少看第一帧之后的内容；Nielsen 启发式"识别优于回忆"：读者不应该要记住上一帧来和这一帧比。建议：对比类内容平铺，轮播只用于可跳过的补充材料。

**3.3 术语互相打架**

item / requirement / criterion 三个词在说同一个东西；verifier subtest 和 checklist item 的区别文章自己在 Fig 4、Fig 5、01 节结尾重复强调三次。另外还有 PASS/FAIL、Abstain、skip、assertion route、generated route、judge route、evidence coverage、GCPC with official outcome、TICK、holistic judge。

依据：Mayer 的预训练原则（pre-training principle）：关键概念先单独定义一次，后面的讲解才不被打断；Cowan 对工作记忆的估计是同时大约四个块，读者记不住十个术语的区分。

建议：全文统一用 requirement；subtest 与 requirement 的区别在 Fig 5 用图定义一次，之后不再提醒；三种 route 的名字只在 Fig 8 出现，正文用白话。

**3.4 四张图讲一个例子，读者要在图之间来回对照**

Fig 2（要求的结构）、Fig 3（两次运行建了什么）、Fig 4（26 个 subtest）、Fig 5（subtest 归并成 requirement）讲的是同一个 Excel 任务的四个切面，分布在两节、大约八屏里。读者看到 Fig 5 的时候要回忆 Fig 4 的格子长什么样。

依据：Mayer 的空间邻近和时间邻近原则：相关的图和文字要在同一时间同一位置出现；Segel & Heer 的 "martini glass" 结构里，作者驱动的那段通常是一个固定的视觉对象随文字步进地变化。具体做法见 4.1。

## 4. 从上四分之一到顶级：三件结构性的事

前面两节是局部修改，做完之后这篇会更顺，但还是一篇"排得很好的论文配套页"。跟 Distill、The Pudding、Bartosz Ciechanowski 那一档的差距不在细节，在下面三件事。这三件都是建议，工作量从大到小排列。

**4.1 把 Fig 2 到 Fig 5 合并成一张随滚动变化的图（scrollytelling）**

现在的做法是四张静态图分布在八屏里。顶级做法是一张图固定在屏幕右侧或上方，左侧文字分成五到六步，每滚到一步图就换一个状态。这样文字和图不可能重复，因为文字就是图的动态图注。

建议的步骤（图的主体始终是那 26 个格子，左右两列对应两次运行）：

1. 两个 FAIL 徽章。文字：两次运行，同一个任务，都失败。
2. 徽章展开成 26 个格子，12 绿对 22 绿。文字：但它们做的工作量差很远。
3. 高亮两边都红的那一格。文字：为什么都 FAIL？一个叫 Quarter 的列。
4. 高亮 PivotTable 相关的格子，右侧弹出现在 Fig 3 的结构草图。文字：差在哪？一个建了真正的透视表。
5. 八个列名格子收缩成一个框，标 S-06。文字：但数格子也有问题，这八个其实是一条要求。这就是现在的 Fig 5。
6. 所有格子收缩成 9 条 requirement。文字：所以我们换一个计数单位。进入 03 节。

依据：Mayer 的分段原则（segmenting）和时间邻近原则；Segel & Heer 的作者驱动叙事；Bret Victor 说的"让读者看到变化的过程而不是前后两帧"。The Pudding 和 NYT 的大多数长文用的就是这个 stepper 模式。

代价：这是一次重写，不是修改。不过四张图的素材已经都在，缺的是把它们放进同一个坐标系和一个滚动监听。

**4.2 给每个交互定一条契约：点了必须改变一个读者在意的数**

Fig 10 已经是这个样子，把它当模板。按这条契约审一遍，达不到的交互要么改成静态图，要么删。具体清单在 3.1 的表里。另外一条：每个交互的默认状态就应该是最有信息量的那一帧，读者不点也能拿到结论，点了拿到更多。依据：Krug 的 Don't Make Me Think，以及 Victor 对"交互式玩具"的批评。

**4.3 把作者驱动的部分压到 1,800 词以内，其余进折叠块或单独的 Limits 节**

现在正文约 3,100 词，其中 01 到 05 节是作者驱动的叙事，06 节是读者驱动的探索工具。这个分法本身是对的，就是 Segel & Heer 的 martini glass：先带读者走一条窄的线，再放开让他们自己探索。问题是窄的那段太长。

建议的删减来源（删了不损失论证）：1 节表里的重复数字和复述；2.3 的 caveat 收折；05 节 "Where the approach stops" 三段收成一个折叠块或改成一张小表（benchmark × 结果）；03 节 Fig 6 里的完整任务文本默认折叠，只展开被高亮的那几行。字数目标是建议值，不是硬指标；Distill 上多数文章的主线文字在这个量级。

## 5. 建议的改稿顺序

按收益除以工作量排，前三条一个下午能做完，效果已经会很明显。

1. 文图去重（1 节的表）。纯删字，不动代码。重点是 Fig 12 前面那段把 20.9 / 18.7 拿掉。
2. 图注瘦身，caveat 收进每节一个折叠块（2.3）。
3. 01 节重排：先 FAIL 徽章和 12 对 22，再 Quarter 陷阱，再讲任务（2.1、2.2）。列名出正文。
4. 术语统一为 requirement（3.3）。全局替换加人工过一遍。
5. Fig 2 去 tab，Fig 3 平铺，Fig 4 默认高亮 Quarter 格（3.1、3.2）。
6. 首屏 Fig 1 替换或降级（2.4）。
7. Fig 2 到 Fig 5 合并成 scrollytelling（4.1）。这条工作量最大，建议在前六条做完、看过效果之后再决定要不要做。

待确认的前提：这篇的定位是给论文读者的配套页，还是给更广读者的 blog？页面自己的标签是 interactive research article。如果是前者，第 6、7 条可以不做；如果是后者，第 7 条是拉开差距的那一步。

## 6. 保留不动的部分

- 标题下的那个问句："What did the agent get right, even when the task failed?"
- 用一个 Excel 任务、两次 FAIL 作为切入口的选择。
- 导航栏六个锚点和每节的 "01 / WHY ..." 编号。
- 34 个折叠块的渐进披露结构。改稿是往里面多放东西，不是拆掉。
- Fig 6 的来源高亮。这是 "grounded" 的视觉证据。
- Fig 10。全篇的标杆。
- Fig 12 的切换机制本身。
- 两段引言和 05 节结尾的诚实局限说明。诚实是这篇的资产，要改的是它出现的位置和密度。
- 06 节的任务浏览器作为文章结尾的开放探索。

## 7. 未验证与待确认

- 没有在手机宽度下看过。首屏左文右图的布局、Fig 3 的双栏对比、Fig 4 的 13 列格子在窄屏上怎么折行，需要单独查。
- 没有测键盘导航和读屏器。Fig 1 图注写了 "Hover or focus"，说明作者考虑过，但没验证。
- 没有测加载性能。页面有 273 个按钮和全部 checklist 数据，首次加载体积未知。
- 没有看过源码。上面所有"成本低"的判断都是从页面行为推的，改稿人需要按实际代码结构重新估。
- 字数、高度、折叠块数是 2026-11-05 用浏览器脚本数的，页面标 DRAFT，之后可能变。
- 论文本身没读。这份备忘只评页面怎么讲，不评它讲得对不对。

## 8. 依据的理论与来源

上面引用的都是常见教材级的参考，不是为这篇专门找的。列在这里方便改稿人核对我有没有用错。

| 原则 | 出处 | 本文用在哪 |
| --- | --- | --- |
| 冗余、一致性、分段、预训练、空间/时间邻近、个性化原则 | Mayer, Multimedia Learning（2009 第二版；2020 第三版） | 1、2.3、2.5、3.3、3.4、4.1 |
| 内在 / 外在 / 相关认知负荷 | Sweller 1988；Sweller, van Merriënboer & Paas 1998 | 2.1 |
| data-ink ratio、chartjunk、证据整合 | Tufte, The Visual Display of Quantitative Information（1983）；Beautiful Evidence（2006） | 1、2.4 |
| overview first, zoom and filter, details on demand | Shneiderman 1996 | 2.4 |
| 作者驱动 / 读者驱动叙事，martini glass | Segel & Heer, Narrative Visualization: Telling Stories with Data（IEEE TVCG 2010） | 2.2、3.4、4.1、4.3 |
| 反应式文档，交互不是玩具 | Bret Victor, Explorable Explanations（2011） http://worrydream.com/ExplorableExplanations/ | 3.1、4.1、4.2 |
| 研究蒸馏 | Olah & Carter, Research Debt（Distill 2017） https://distill.pub/2017/research-debt/ | 2.5 |
| 识别优于回忆，美观与最小化设计 | Nielsen 十条启发式（1994） | 2.3、3.2 |
| 轮播可用性 | Nielsen Norman Group 关于 carousel 的研究文章 | 3.2 |
| 工作记忆约四个块 | Cowan 2001 | 3.3 |
| 知识诅咒 | Pinker, The Sense of Style（2014） | 2.1 |
| Don't Make Me Think | Krug 2000 | 4.2 |

标杆样本（改稿人可以对照看）：Distill 上的 Building Blocks of Interpretability；The Pudding 的任意一篇 scrollytelling 长文；Bartosz Ciechanowski 的交互式文章（ciechanow.ski）。三者共同点：一张图跟着文字演化，数字只出现一次，每个控件点了都有后果。
