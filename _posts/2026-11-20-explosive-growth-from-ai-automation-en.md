---
title: "Explosive growth from AI automation: A review of the arguments"
date: 2026-11-20
lang: en
section: ai
kind: deepread
translation: /posts/2026/11/explosive-growth-from-ai-automation/
source:
  author: "Ege Erdil and Tamay Besiroglu"
  title: "Explosive growth from AI automation: A review of the arguments"
  outlet: "Epoch AI"
  date: "2023-09-23"
  url: "https://epoch.ai/publications/explosive-growth-from-ai-a-review-of-the-arguments"
---

Ege Erdil (Epoch AI) and Tamay Besiroglu (Epoch AI and MIT FutureTech), “Explosive growth from AI automation: A review of the arguments,” [arXiv:2309.11690v3](https://arxiv.org/abs/2309.11690v3), revised July 2024 and first released in 2023. The paper reviews arguments and builds a small model. I found no record of journal publication. Open Philanthropy funded the research. Both authors later co-founded Mechanize, an AI automation company. Keep in mind that their commercial interests now align with the paper's conclusion. [Mechanize's founding announcement](https://www.mechanize.work/announcing-mechanize-inc/)

The conclusion is conditional. **If** AI can broadly substitute for human labor, the authors see roughly even odds of explosive growth this century. Whether such AI will emerge is outside the scope of their argument.

## What is the paper asking?

For more than a century, per capita growth in advanced economies has been about 2% a year. Electricity, cars, and computers failed to raise that figure noticeably. What might make AI different?

The authors give explosive growth a precise definition. Global real output rises more than 30% above its historical peak, implying a growth rate roughly ten times the rate in today's frontier economies. A rebound following a crash does not qualify.

The paper first works through three arguments for explosive growth and calculates the parameters they need. It then examines nine objections, asking how extreme the parameters would have to be for each objection to stop explosive growth. That second part is the main contribution. Hanson, Davidson, and Trammell and Korinek had already argued that AI could produce explosive growth. This review turns objections about a bottleneck somewhere in the economy into questions we can put numbers on.

## Labor is the last input that investment cannot scale

Imagine a factory. If it needs more machines, it can spend some of its profits on them. If it needs electricity, it can invest in a power plant. If it needs workers, the factory cannot spend its profits to produce them. It takes twenty years for a person to grow up and enter the workforce. Labor is the most important input, and reinvesting output cannot directly increase its supply.

Population growth has long constrained economic growth. In semi-endogenous growth theory, technological progress depends on the number of people doing research, and ideas get harder to find. Long-run growth is roughly on the same scale as population growth, which the biology of reproduction limits to a few percent a year. The authors think this helps explain why historical long-run growth has topped out around 3%.

AI that can substitute for workers changes that relationship. This diagram illustrates the feedback loop in the authors' model.

```text
Today, population growth limits the supply of labor.
  Output → investment → machines, power, research → more capacity
  Output → investment ↛ workers who take twenty years to grow up

With AI that can substitute for workers:
  Output → investment → compute → more digital workers
      ↑                                      |
      └────────────── more output ───────────┘
```

A company can use profits to buy GPUs, run AI that does work previously done by people, and use the additional profits to buy more GPUs. Labor becomes part of a loop that can expand through reinvestment.

## Three arguments for explosive growth

**Increasing returns to scale.** This is the strongest argument in the authors' view. Once someone discovers an idea, everyone can use it. Doubling the number of researchers and workers together therefore more than doubles output. Population growth constrains this loop today. If labor can scale through investment, it can start to accelerate. Using Bloom and colleagues' estimate for how much harder ideas are to find (research returns λ/ϕ ≈ 0.32), the authors calculate that growth accelerates along a hyperbolic path if returns to scale in reproducible inputs such as machines and labor are at least 0.68. The usual assumption puts that figure close to 1.

**The supply of digital workers could expand rapidly.** This argument can work even with no technological progress. In the authors' calculation, an H100 costs about $30,000 and uses $30,000 worth of electricity over three years at 40% utilization. Using Carlsmith's best estimate of 10¹⁵ operations per second for the human brain puts the annual cost of a “human-equivalent AI” at about $15,000. The model requires this cost to fall below s^(10/7) × $150,000, where s is the savings rate. At that price, a savings rate of about 20% is enough.

The authors flag the weakness themselves. At the high estimate of 10¹⁶ operations per second for the brain, annual cost rises to $150,000 and the model requires a 100% savings rate. At the hardware prices they used, that is infeasible. One order of magnitude of uncertainty flips the result. Their response is that hardware prices roughly halve every two and a half years, so this constraint may ease with time.

**A one-time jump in output could be enough.** The third argument works even if the long-run growth rate stays the same. The authors regard it as their weakest case and use it as a fallback. The tool they use to make it is the part of the paper most worth keeping.

## How f and ρ determine the cost of a bottleneck

A common objection is that some tasks will remain beyond AI's reach and bottleneck the whole economy. That is the Baumol effect, the way an assembly line runs at the speed of its slowest station. The authors ask how much that would hold output back.

Two parameters matter. The share of tasks that cannot be automated is f. The parameter ρ measures how hard it is to substitute across tasks. More negative values mean substitution is harder. The elasticity of substitution σ is related to it by ρ = (σ−1)/σ. If inputs to automated tasks are virtually unlimited and all workers move into the remaining tasks, the output multiplier is f^((1−ρ)/ρ).

Table 3 (p. 17) gives the resulting output multipliers.

| Share of tasks that cannot be automated, f | ρ = −0.2 | ρ = −0.4 | ρ = −2 |
|---|---|---|---|
| 5% | 6.4 × 10⁷ | 3.6 × 10⁴ | 89 |
| 10% | 10⁶ | 3.2 × 10³ | 32 |
| 25% | 4.1 × 10³ | 128 | 8 |

The numbers are multiples of global output. In the most pessimistic cell, a quarter of tasks can never be automated and tasks are very hard to substitute. Output can still rise eightfold. Concentrated in a short period, that could clear the paper's threshold for explosive growth. Spread evenly over ten years, it is about 23% a year.

Take one cell. Suppose medical decisions, the courts, and politics together account for 10% of tasks and remain in human hands, with ρ = −2. The output increase is 32-fold. The other 90% of tasks no longer need human workers. People can all move to the remaining 10%, increasing output there too.

The authors acknowledge a simplification. Nearly unlimited inputs inflate the numbers. If AI can only add inputs equivalent to nine times the original amount for every task, even full automation raises output by at most tenfold.

The same calculation can help examine bottlenecks such as power, robots, regulatory approval, and human trust. How much of f does the bottleneck represent, and how low is ρ between it and the rest of the economy? Once the claim about power is expressed as a share of f, it becomes something you can test.

## How the authors assess nine objections

The table gives the authors' estimated probability that each objection stops explosive growth (pp. 9–18). In Appendix A's scale, “unlikely” means 10%–33%, and “very unlikely” means 1%–10%.

| Objection | Authors' assessment | Main reasoning |
|---|---|---|
| Regulation | Unlikely | AI regulation looks more like nuclear arms control, with imperfect coordination. Advances in compute and algorithms make enforcement harder. British bans on exporting machinery and skilled workers from the 1780s to the 1840s largely failed. |
| Bottlenecks in land, energy, capital, and other inputs | Unlikely | Energy has roughly 3 orders of magnitude of headroom and land has 2. An outside view gives 40%, revised downward on the internal evidence. |
| Automation proceeds too slowly | Unlikely | The authors regard this as a relatively strong and internally coherent objection. At the slow end, automation takes roughly 30–40 years. |
| Alignment is difficult | Unlikely | Its effect is equivalent to raising f. It remains possible. |
| Research is harder than expected | Very unlikely | Their second argument works without advances in research. |
| Statistics fail to capture it | Unlikely for measurement bias, exceptionally unlikely for actual welfare | Initial GDP estimates have shown no systematic bias historically. |
| People prefer human-made goods and services | Very unlikely | Both f and complementarity would have to be extreme. AI might also become a consumer. |
| Previous technology revolutions did not accelerate growth | Very unlikely | Those technologies left labor supply tied to population. |
| Physical limits | Very unlikely | The limits are still too far away. |

The objection about slow automation has an easy-to-miss implication. In Figure 2, the horizontal axis shows the share of tasks already automated, from 50% to 100%. The vertical axis shows the increase in output from one additional percentage point of automation, assuming full automation raises output a hundredfold. At ρ = −0.5, the curve is relatively flat and peaks around 7%. At ρ = −5, it stays below 5% for much of the range, surges to about 42% near 98% automation, then falls again.

![Global output growth from an additional percentage point of automation at different substitution parameters]({{ '/assets/img/explosive-growth-from-ai-automation-figure-2.png' | relative_url }})

*Figure 2. Ege Erdil and Tamay Besiroglu, [p. 13 of the v3 paper](https://arxiv.org/pdf/2309.11690v3#page=13), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Cropped from the original page with the curves and axes intact.*

Stronger complementarity concentrates more growth toward the end. The first half of automation may barely register in aggregate data, with the large change coming when the last few bottlenecks clear. In the model, “AI is doing a lot and GDP has hardly moved” is compatible with explosive growth later. In our view, that also makes the hypothesis hard to falsify early on. That observation is ours.

## Where the argument is strong and where questions remain

The authors flag an easy mistake. The nine objections are interdependent. Many hinge on the same unknowns, such as how low σ is or how useful it would be to run a great deal of intelligence in parallel. Treating them as independent would overstate the odds that at least one stops explosive growth, since the conditions often hold or fail together. The authors make this explicit in Section 4 and footnote 6.

Several other points deserve more scrutiny.

- **“Unlikely” is a subjective assessment.** The authors revise their 40% outside-view estimate downward without quantifying the basis for the adjustment. They say only that the internal evidence makes the objection less persuasive.
- **The model is being extrapolated.** The authors acknowledge extrapolating into a regime we have never observed. Much of the paper still examines robustness within ranges for individual parameters. Whether the model itself holds in the new regime is a separate question.
- **Institutions receive only a brief discussion.** Section 2.1 mentions institutional explanations from North, Acemoglu, and others, and says the basic account is still persuasive. The population feedback loop is one of several plausible explanations for growth accelerating after the Industrial Revolution. The paper leaves the institutional account untested.
- **The speed of the physical world matters.** China's sustained 10% annual growth and a single year of 15% growth during catch-up are cited to suggest that the rate would only have to double again. China caught up using technology and capital-goods supply chains that already existed. Expanding the global capital stock by 30% a year is a different undertaking.
- **There are rough edges in the draft.** Page 2 contains an unresolved “see Figure ??” reference. Section 3.5 points to Section 3.4 for material in Sections 2.1 and 3.2. Table 2 puts the U.S. labor force at 165 million, while Appendix D uses 180 million. These details leave the main conclusion intact.

## Looking back three years after the first release

As of November 2026, the condition the authors assume (near-complete automation) has yet to arrive. The central conclusion remains untested either way.

Several developments have gone in the direction the paper anticipated, though I have not checked each claim against the data. Compute costs have continued to fall. Countries have yet to coordinate on limits to training, with national-security measures such as export controls doing most of the work, consistent with the comparison to nuclear arms control. The cost of robots, the supply of electricity, and the speed of data center construction were among the most discussed bottlenecks in 2025–2026, corresponding to Section 3.2 and the third open question in the paper. The framework also has successors. Epoch AI's 2025 GATE model builds on the same idea, and Jesús Fernández-Villaverde's *Saving for the Machines* takes up the question from the capital-supply side. [Epoch AI's GATE model](https://epoch.ai/publications/announcing-gate) · [Saving for the Machines](https://www.nber.org/papers/w35964)

## Returning to the opening question

What would make AI different from electricity or computing? Those technologies made workers more productive while leaving the supply of labor tied to population. If a technology makes it possible to expand the supply of labor by investing money, almost all mainstream growth models predict a large acceleration. With reasonable parameters, most objections delay or weaken it, and few stop it.

When debating AI's effect on growth, start by asking whether it augments labor or substitutes for it. Then express a proposed bottleneck in terms of f and ρ and see how extreme it would have to be to stop the acceleration. The central condition stays open. Will AI broadly substitute for workers, and when? The model permits slow growth early on, which makes it difficult to test in the near term.
