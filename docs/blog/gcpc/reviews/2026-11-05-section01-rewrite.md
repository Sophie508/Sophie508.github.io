# 01 节重写稿

配套 `gcpc-review-memo.md`。按备忘 2.1、2.2、4.1 的顺序重写：两个 FAIL → 12 对 22 → Quarter 陷阱 → 透视表差异 → 八格合一 → 引出 requirement。写成六步，一张图随滚动换状态；不做 scrollytelling 的话，同样的文字顺序配六张静态图也成立。所有数字和事实都来自现页面，没有新增；变的只是顺序、说法和每件事说几遍。新正文约 300 词，原 01 节正文约 500 词（估算）。

## 正文

**01 / WHY LOOK BEYOND PASS RATE?**

**Both runs failed. Did they do the same work?**

*Step 1 — 图：两个 FAIL 徽章，Without skill / With skill，下方一行小字 sales-pivot-analysis · SkillsBench v1.1 · gpt-5.2-codex · trial 03*

Here are two runs of the same task. The agent has to turn a population PDF and an income spreadsheet into one Excel report. One run could read an xlsx skill; the other could not. The official verifier rejected both.

*Step 2 — 图：两个徽章展开成各 26 个格子，左 12 绿、右 22 绿*

Before it says FAIL, the verifier runs 26 checks. Lay them out and the two runs stop looking alike. The run without the skill passed 12 of them. The run with the skill passed 22.

*Step 3 — 图：两边都红的那一格高亮，其余压淡*

So why did both fail? One column. The task calls it Quarter, but it means income quartile: each region should be labelled Q1 to Q4 by its median income. Both reports contain the string nan where those labels should be. That one check fails both runs, and nothing else either run did cancels it.

*Step 4 — 图：PivotTable 相关的格子高亮；右侧弹出现在 Fig 3 的草图，Ordinary summary cells 对 SourceData → Pivot cache → PivotTable*

The run with the skill did get much more right. Both runs used pandas to group and sum the data. Without the skill, the agent wrote those sums into ordinary cells. After reading the xlsx guide, it built what Excel itself recognises as a PivotTable: a source-data connection, a pivot cache, row and value fields. The verifier looks for those objects. It finds them in one file and not the other.

*Step 5 — 图：八个列名格子滑到一起，合成一个标 S-06 的框（即现在的 Fig 5）*

But 22 against 12 is not the whole story either. Eight of the 26 tiles check that eight columns exist in the source-data sheet. That is one requirement of the task, counted eight times. Meanwhile the aggregation check confirms that the operation is a sum, but not which field is being summed. A tile count depends on how someone happened to split the tests.

*Step 6 — 图：所有格子重新归组成 S-01 到 S-09 九个框*

A final FAIL hides what was done. A test count depends on how the tests were written. What we want is the task's own list of requirements, with evidence for each one:

> Which requirements are met, which are not, and what evidence supports each judgment?

That list is what the rest of this article builds.

## 图注

主图六个状态共用一条：Fig. 1. Official verifier results for one task, two runs. One tile is one verifier check. Click a tile to compare the same check across both runs.

Step 4 的草图插图：Sketches of the executed code, not workbook screenshots.

原 Fig 3、Fig 4 图注里的其他句子全部移进下面第一个折叠块。

## 本节的折叠块

放在 Step 6 之后、进入 02 节之前，按这个顺序：

1. **What this does not show** — This pair illustrates a distinction. It does not establish a causal or population-level effect of skills. Verifier checks vary in granularity, and a count of them is not a percentage of task completion. A pytest "skipped" is not GCPC's Abstain. Passing the PivotTable checks shows the structure is right, not that every number in it is. Verifier results are not GCPC item judgments.
2. **The task in full** — 原正文第 2 到 4 段（SA2_CODE、STATE、POPULATION_2023、"how many people live in each state"），加上现在 Fig 2 的工作簿示意图，去掉五个 tab，只画 Population by State 一张。
3. **What makes a table an Excel PivotTable?** — 现有内容不动。
4. **How does the script become 26 tiles?** — 现有内容不动。
5. **Original task and source provenance** — 现有内容不动。

## 从原 01 节移走或删掉的内容

| 原内容 | 去向 |
| --- | --- |
| 正文第 2 到 4 段（字段名、五张表的说明） | 折叠块 2 |
| Fig 2 及其五个 tab | 折叠块 2，缩成一张静态图 |
| Fig 3 轮播三组 | 第一组（file structure）成为 Step 4 的插图；第二组（row field）并入 Step 4 正文的 "row and value fields"；第三组（shared error）就是 Step 3 |
| Fig 4 | 成为主图，全节只有这一张图 |
| "Inspect the execution evidence ↓" 和 "From tests to requirements ↓" 两个按钮 | 删，stepper 里滚动就是导航 |
| "Select a tile to see what the final FAIL leaves out." 提示框 | 删，图注已经说了可以点 |
| Fig 4 之后的 nan / Quarter 段 | 成为 Step 3 |
| 结尾两段 caveat（causal、granularity、pytest skipped） | 折叠块 1 |
| "The official subtests already recover part of this information. GCPC asks a further question..." 一段 | 删。Step 5、6 已经把这个意思讲了 |

## 对 02 节开头的连带修改

Step 5 吸收了现在的 Fig 5 和 02 节的前两段，所以 02 节要相应短一截：

- 删 02 节开头 "The verifier above already distinguishes the two runs: 12 tests pass without the skill, and 22 pass with it. So why build a checklist?..." 整段。
- Fig 5 删，或缩成一行回指 Step 5。
- coverage 那段里 aggregation 的句子已在 Step 5 说过，只留 Quarter test 那句和最后的限定。
- 02 节从 "This is why our starting point is the task requirement." 开始正文，标题 "What should count as a unit of progress?" 不变。

## 写法上改了什么（给改稿人核对用）

- 每个数字只在正文出现一次，而且是在图换到那个状态的那一步。
- 字段名（SA2_CODE、POPULATION_2023 等）全部出正文。正文里唯一的代码词是 Quarter 和 nan，因为它们就是故事。
- 每步文字先提问或转折，图回答，文字再说它意味着什么。比如 Step 3 的 "So why did both fail? One column."
- caveat 一句不少，但全部换到一个地方。
- 术语：正文用 check 指 verifier 的单项，用 requirement 指 checklist 的单项，不用 subtest / item / criterion。如果全文统一用别的词，这里跟着改。
- 没有动的：节标题、两段引言中的那一段、五个折叠块里三个的内容。
