---
title: Harness Engineering
short: Harness Eng.
order: 11
icon: cable
tier: specialisation
summary: "Build the scaffolding around a model that turns it into a dependable agent: the loop, tools, context management over long runs, sandboxes, permissions and guardrails, human checkpoints, and the evaluation harnesses that prove it works."
updated: 2026-11-07
overview: "A model on its own only predicts text. The **harness** is everything around it that turns those predictions into reliable work: the agent loop that decides when to call the model and when to stop, the tools it can use and how they are described, the way context is managed over hundreds of steps, the sandbox it runs in, the permissions and hooks that keep it safe, the points where a human approves, and the test harness that measures it. Two agents built on the same model can differ hugely in quality because of their harness. Harness engineering is where software engineering, security and AI meet, and it is very close to integration work: connecting agents to real systems through well-designed interfaces such as MCP."
why2027: "The term spread in early 2026. Mitchell Hashimoto described his own practice as *harness engineering* in February 2026, and days later OpenAI published *Harness engineering: leveraging Codex in an agent-first world*, describing a product built with agents writing the code while engineers designed the environment, tools and feedback loops. Anthropic's 2025 engineering posts on tool design, long-running harnesses and Claude Code sandboxing describe the same craft. Demand follows agent adoption: 66% of developers who use AI now use coding agents, and the agentic-AI skill cluster is the fastest-growing in job postings. Every company deploying agents needs engineers who can make them safe, observable and testable."
demand:
  - claim: "66% of developers who use AI use coding agents, and most of them use agents daily."
    source: "Stack Overflow Developer Survey 2026"
    url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
  - claim: "The agentic-AI skill cluster grew about 280% in US job postings in one year."
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
  - claim: "Hashimoto names the practice of building tools and guardrails so agents stop repeating mistakes harness engineering."
    source: "Mitchell Hashimoto, Feb 2026"
    url: "https://mitchellh.com/writing/my-ai-adoption-journey"
prerequisites:
  - "[AI Engineering](/roadmaps/ai-engineering/) Intermediate: you have built tool calling and a small RAG app."
  - "[Context Engineering](/roadmaps/context-engineering/) Beginner–Intermediate: you know what goes into a context window and how it fails."
  - "Comfort with Linux, processes, Docker and the shell; basic networking."
  - "Basic security ideas: least privilege, untrusted input, secrets handling."
diagram: |
  flowchart TB
    P["Prereqs: tool calling · Docker · shell"] --> B
    subgraph B["1 · Beginner — the agent loop"]
      direction LR
      B1["loop + stop conditions"] --> B2["3–5 good tools"] --> B3["traces"]
    end
    subgraph I["2 · Intermediate — tools & context"]
      direction LR
      I1["tool design (ACI)"] --> I2["MCP servers"] --> I3["compaction · notes"]
    end
    subgraph A["3 · Advanced — safety & evaluation"]
      direction LR
      A1["sandbox"] --> A2["permissions · hooks"] --> A3["human approval"] --> A4["eval harness"]
    end
    subgraph E["4 · Expert — long-running systems"]
      direction LR
      E1["multi-session harness"] --> E2["sub-agents"] --> E3["benchmarks · observability"]
    end
    B --> I --> A --> E
    I -.-> CTX["Context Engineering"]
    A -.-> SEC["AI Security & Safety"]
    A -.-> CLOUD["Cloud: IAM · isolation"]
stages:
  - level: Beginner
    hours: 70
    focus: "Write an agent loop yourself, with no framework, so you understand every step: call the model, run tools, feed results back, and stop safely."
    concepts:
      - "The agent loop: model → tool calls → results → model, until a final answer or a budget runs out."
      - "Stop conditions: max steps, max tokens or cost, timeouts, and detecting loops (same call repeated)."
      - "Tool calling formats: JSON schemas, parallel calls, and returning errors to the model as useful messages."
      - "Workflows vs agents: when a fixed pipeline is better than an open loop."
      - "Logging every step: inputs, outputs, tokens, latency and tool results."
      - "Idempotency and side effects: which tools change the world and need extra care."
    projects:
      - title: "Agent loop from scratch"
        detail: "In about 200 lines of Python or TypeScript, build a loop with three tools (read file, search, run a calculation), a step budget and loop detection. No frameworks."
      - title: "Trace viewer"
        detail: "Save each run as JSON and build a tiny HTML viewer that shows every step, tool call and token count. You will use it for everything that follows."
      - title: "Workflow vs agent"
        detail: "Solve one task as a fixed workflow and as an agent. Compare success, cost and how easy each is to debug."
    signals:
      - "Your agent always stops, even when the model misbehaves."
      - "You can replay any run step by step from its trace."
      - "You can explain when you'd *not* use an agent."
  - level: Intermediate
    hours: 110
    focus: "Design the agent-computer interface: tools that are easy for a model to use correctly, MCP servers for real systems, and context that stays clean over many steps."
    concepts:
      - "Agent-computer interface (ACI): tool design affects agent success as much as model choice (SWE-agent)."
      - "Writing tools for agents: clear names, a few high-level tools rather than many thin ones, helpful errors, and concise, paginated outputs."
      - "Evaluating tools: run the agent on real tasks and read where it gets confused."
      - "MCP: servers, clients, tools vs resources vs prompts, transports and authorisation."
      - "Context across steps: truncating tool output, compaction, and a progress file the agent maintains."
      - "Frameworks as options, not foundations: LangGraph, OpenAI Agents SDK and the Claude Agent SDK."
      - "12-factor agents: own your prompts, own your context, keep control flow explicit."
    projects:
      - title: "MCP server for an integration platform"
        detail: "Wrap a real API (for example WSO2 API Manager's admin or publisher API) as an MCP server. Start with read-only tools, write clear descriptions, and test it with two clients."
      - title: "Tool redesign study"
        detail: "Give an agent 12 thin tools, then 4 well-designed ones covering the same tasks. Compare success rate and token use on 30 tasks."
      - title: "Long-task agent with notes"
        detail: "Build an agent that completes a 40+ step task (for example migrating a small codebase) using a progress file and compaction. Measure how often it loses track with and without them."
    signals:
      - "You fix agent failures by improving tools and context, not only by rewording prompts."
      - "Your MCP server is safe to expose: authenticated, scoped and validated."
      - "Your agent can resume a task from its notes after a restart."
  - level: Advanced
    hours: 150
    focus: "Make agents safe to run with real permissions, and build the evaluation harness that tells you whether a change helped."
    concepts:
      - "Sandboxing: containers, gVisor (user-space kernel) and Firecracker microVMs; filesystem and network isolation."
      - "Permissions: allow-lists for commands and paths, scoped credentials, read-only by default."
      - "Hooks and guardrails: checks that run before or after tool calls, and blocking dangerous actions deterministically."
      - "Human-in-the-loop: approval gates for irreversible or external actions; designing clear approval prompts."
      - "Untrusted content: tool results and web pages can contain instructions; the *lethal trifecta* of private data, untrusted content and a way to send data out."
      - "Evaluation harnesses: reproducible environments, task suites, graders, and pass@k vs pass^k for reliability."
      - "Observability: tracing, cost per task, and failure categorisation in production."
    projects:
      - title: "Sandboxed code-running agent"
        detail: "Run an agent's shell commands inside a container or microVM (gVisor, Firecracker or E2B) with no network by default and a mounted work directory. Try to escape it and document what stops you."
      - title: "Permission and hook layer"
        detail: "Add an allow-list, a pre-tool hook that blocks secrets leaving the sandbox, and human approval for writes to external systems. Write tests that prove each guard works."
      - title: "Your own eval harness"
        detail: "Package 30 tasks with a reproducible environment and automatic graders. Report pass@1 and pass^3 (all 3 tries succeed) for two harness versions."
    signals:
      - "You can describe your agent's blast radius: what it could do in the worst case."
      - "Guards are enforced by code, not by asking the model nicely."
      - "Every harness change comes with before/after eval numbers."
  - level: Expert
    hours: 180
    focus: "Build harnesses for long-running, multi-session and multi-agent work, measured on public benchmarks and observed in production."
    concepts:
      - "Long-running harnesses: an initialiser step, a feature list, progress files and clean hand-offs between sessions."
      - "Single vs multi-agent: shared context and coherence (Cognition) vs parallel sub-agents for breadth (Anthropic's research system)."
      - "Sub-agent design: clear task specs, output formats, and limits on spawning."
      - "Benchmarks: SWE-bench, Terminal-Bench and τ-bench; contamination and what they don't measure."
      - "Agentic misalignment and insider-threat style failures; designing harnesses that limit them."
      - "Agent-first engineering: designing repos, docs and feedback loops so agents can work in them (OpenAI's harness-engineering post)."
      - "Cost control at scale: caching, model routing and budget enforcement per task."
    projects:
      - title: "Benchmark submission"
        detail: "Run your harness on a SWE-bench or Terminal-Bench subset. Publish results, cost per task and a failure analysis."
      - title: "Multi-session builder"
        detail: "Build a harness that completes a small app across several sessions using an initialiser, a feature checklist and progress notes. Measure how much work survives each hand-off."
      - title: "Single vs multi-agent study"
        detail: "Solve a research task with one agent and with an orchestrator plus three sub-agents. Compare quality, cost and failure modes, and write it up."
    signals:
      - "You can justify single- vs multi-agent designs with your own data."
      - "Your harness runs unattended for hours and leaves a clear trail."
      - "Other engineers adopt your harness patterns or tools."
connections:
  - track: context-engineering
    text: "The harness implements context policies (compaction, notes, sub-agents) step by step."
  - track: ai-security-safety
    text: "Sandboxes, permissions and prompt-injection defences are where harness design meets security."
  - track: cloud-engineering
    text: "Workload identity, scoped IAM roles and network policy give each agent the least privilege it needs."
  - track: ai-engineering
    text: "Harnesses are the production form of the agents and evals you build in AI engineering."
  - track: software-engineering
    text: "Agents work best in repos with good tests, clear docs and fast CI; that is the environment a harness depends on."
references:
  papers:
    - title: "ReAct: Synergizing Reasoning and Acting in Language Models"
      by: "Yao et al."
      year: 2022
      url: "https://arxiv.org/abs/2210.03629"
      note: "The reason-act-observe loop at the heart of most harnesses."
    - title: "Voyager: An Open-Ended Embodied Agent with Large Language Models"
      by: "Wang et al."
      year: 2023
      url: "https://arxiv.org/abs/2305.16291"
      note: "An agent that builds and reuses a skill library."
    - title: "MemGPT: Towards LLMs as Operating Systems"
      by: "Packer et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.08560"
      note: "Memory management for agents, modelled on an OS."
    - title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
      by: "Jimenez et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.06770"
      note: "The reference benchmark for coding harnesses."
    - title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
      by: "Yang et al."
      year: 2024
      url: "https://arxiv.org/abs/2405.15793"
      note: "Shows interface and tool design drive agent performance."
    - title: "OpenHands: An Open Platform for AI Software Developers as Generalist Agents"
      by: "Wang et al."
      year: 2024
      url: "https://arxiv.org/abs/2407.16741"
      note: "An open, inspectable coding-agent harness."
    - title: "τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains"
      by: "Yao et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.12045"
      note: "Measures reliability over repeated tries (pass^k)."
    - title: "Firecracker: Lightweight Virtualization for Serverless Applications"
      by: "Agache et al."
      year: 2020
      url: "https://www.usenix.org/conference/nsdi20/presentation/agache"
      note: "The microVM design used by many agent sandboxes."
    - title: "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models"
      by: "Zhang et al."
      year: 2025
      url: "https://arxiv.org/abs/2510.04618"
      note: "Evolving context playbooks for agents."
    - title: "Agentic Misalignment: How LLMs Could Be Insider Threats"
      by: "Lynch et al."
      year: 2025
      url: "https://arxiv.org/abs/2510.05179"
      note: "Why harness permissions and oversight matter."
  courses:
    - title: "Hugging Face AI Agents Course"
      by: "Hugging Face"
      year: 2025
      url: "https://huggingface.co/learn/agents-course/unit0/introduction"
      note: "Hands-on introduction to agent loops and frameworks."
  books:
    - title: "AI Engineering: Building Applications with Foundation Models"
      by: "Chip Huyen"
      year: 2025
      url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/"
      note: "The chapters on agents and evaluation are the foundation for harness work."
  articles:
    - title: "Harness engineering: leveraging Codex in an agent-first world"
      by: "Ryan Lopopolo, OpenAI"
      year: 2026
      url: "https://openai.com/index/harness-engineering/"
      note: "The post that made the term mainstream: engineers design the environment, agents write the code."
    - title: "My AI Adoption Journey"
      by: "Mitchell Hashimoto"
      year: 2026
      url: "https://mitchellh.com/writing/my-ai-adoption-journey"
      note: "An early, practical description of harness engineering."
    - title: "Writing effective tools for AI agents"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/research/writing-tools-for-agents"
      note: "How to design, evaluate and improve agent tools."
    - title: "Effective harnesses for long-running agents"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/research/effective-harnesses-for-long-running-agents"
      note: "Initialisers, feature lists and progress files across sessions."
    - title: "Making Claude Code safer with sandboxing"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/research/claude-code-sandboxing"
      note: "Filesystem and network isolation for a real coding agent."
    - title: "How we built our multi-agent research system"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/research/multi-agent-research-system"
      note: "Orchestrator-worker design and its costs."
    - title: "Don't Build Multi-Agents"
      by: "Walden Yan, Cognition"
      year: 2025
      url: "https://cognition.com/blog/dont-build-multi-agents"
      note: "The case for single-threaded agents with shared context."
    - title: "Building agents with the Claude Agent SDK"
      by: "Anthropic"
      year: 2025
      url: "https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk"
      note: "A production harness design: gather context, act, verify."
    - title: "Claude Agent SDK overview"
      by: "Anthropic"
      url: "https://code.claude.com/docs/en/agent-sdk/overview"
      note: "The SDK reference."
    - title: "Claude Code: sandboxing"
      by: "Anthropic"
      url: "https://code.claude.com/docs/en/sandboxing"
      note: "How a production agent enforces filesystem and network limits."
    - title: "Claude Code: hooks"
      by: "Anthropic"
      url: "https://code.claude.com/docs/en/hooks"
      note: "Deterministic checks before and after tool calls."
    - title: "12-Factor Agents"
      by: "Dex Horthy, HumanLayer"
      year: 2025
      url: "https://github.com/humanlayer/12-factor-agents"
      note: "Principles for building production agents you control."
    - title: "Context Engineering for AI Agents: Lessons from Building Manus"
      by: "Yichao 'Peak' Ji"
      year: 2025
      url: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus"
      note: "KV-cache-aware harness design from a production agent."
    - title: "The lethal trifecta for AI agents"
      by: "Simon Willison"
      year: 2025
      url: "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
      note: "Private data, untrusted content and outbound communication: never all three."
    - title: "Model Context Protocol specification"
      by: "MCP project"
      url: "https://modelcontextprotocol.io/specification/latest"
      note: "The protocol for exposing tools and resources to agents."
    - title: "LangGraph overview"
      by: "LangChain"
      url: "https://docs.langchain.com/oss/python/langgraph/overview"
      note: "A framework for stateful agent graphs."
    - title: "OpenAI Agents SDK"
      by: "OpenAI"
      url: "https://openai.github.io/openai-agents-python/"
      note: "Handoffs, guardrails and tracing built in."
    - title: "gVisor documentation"
      by: "Google"
      url: "https://gvisor.dev/docs/"
      note: "A user-space kernel for strong container isolation."
    - title: "E2B documentation"
      by: "E2B"
      url: "https://docs.e2b.dev/"
      note: "Cloud sandboxes for running agent-generated code."
    - title: "Terminal-Bench"
      by: "Stanford & Laude Institute"
      year: 2025
      url: "https://www.tbench.ai/"
      note: "A benchmark for agents working in a real terminal."
---

## What a harness is

Think of the model as an engine and the harness as the rest of the car: steering, brakes, dashboard and seatbelts. The same engine can be safe and useful, or dangerous and useless, depending on what you build around it.

```mermaid
flowchart TB
  START["task"] --> CTX["build context<br/>instructions · notes · tool list"]
  CTX --> M["model step"]
  M --> D{"tool call or done?"}
  D -- "done" --> V["verify<br/>tests · checks · grader"]
  V -- "fails" --> CTX
  V -- "passes" --> END["result + trace"]
  D -- "tool call" --> H1["pre-tool hook<br/>policy · allow-list"]
  H1 -- "blocked" --> CTX
  H1 -- "needs approval" --> HU["human approves?"]
  HU -- "no" --> CTX
  HU -- "yes" --> RUN
  H1 -- "allowed" --> RUN["run tool in sandbox"]
  RUN --> H2["post-tool hook<br/>truncate · redact · log"] --> CMP{"context too big?"}
  CMP -- "yes" --> C["compact · update notes"] --> CTX
  CMP -- "no" --> CTX
```

Every box outside "model step" is harness code you own. That's where reliability comes from.

## Tools are an interface for a model

SWE-agent's key finding was that agents do much better with interfaces designed *for them*: a file viewer that shows 100 lines with line numbers, a search that returns a short summary, an editor that runs a linter after each edit. The same lessons appear in Anthropic's tool-writing guide:

- **Fewer, higher-level tools.** `schedule_meeting` beats `list_users` + `list_events` + `create_event`.
- **Clear names and descriptions.** Write them as if for a new teammate; the description *is* the documentation.
- **Helpful errors.** `"No file at src/app.ts; did you mean src/app.tsx?"` teaches the model; a stack trace doesn't.
- **Concise outputs.** Paginate, truncate and filter by default; offer a "detailed" option.
- **Evaluate the tools.** Run real tasks and read the traces to see where the agent gets confused.

This is also how to think about MCP servers for integration platforms: an MCP server *is* an agent-computer interface. Good API design skills transfer directly.

## Layers of defence

Never rely on the model to police itself. Put deterministic layers between the model and the world, so that each layer limits the damage if the one above fails.

```mermaid
flowchart TB
  subgraph L1["Layer 1 · Instructions"]
    direction LR
    A1["system prompt rules"] --> A2["tool descriptions with limits"]
  end
  subgraph L2["Layer 2 · Harness policy (code)"]
    direction LR
    B1["allow-lists: commands · paths · domains"] --> B2["pre/post tool hooks"] --> B3["human approval for risky actions"]
  end
  subgraph L3["Layer 3 · Sandbox"]
    direction LR
    C1["container / gVisor / microVM"] --> C2["no network by default"] --> C3["scoped work directory"]
  end
  subgraph L4["Layer 4 · Identity & cloud"]
    direction LR
    D1["short-lived scoped credentials"] --> D2["least-privilege IAM role"] --> D3["audit logs"]
  end
  L1 --> L2 --> L3 --> L4
```

Simon Willison's **lethal trifecta** is the quickest risk check: if an agent has (1) access to private data, (2) exposure to untrusted content and (3) a way to send data out, a prompt injection can steal that data. Remove at least one of the three for any risky task.

## Measuring a harness

Agents are stochastic, so one success proves little. Two metrics help:

$$
\text{pass@}k = P(\text{at least one of } k \text{ tries succeeds}) \qquad \text{pass}^k = P(\text{all } k \text{ tries succeed})
$$

pass@k tells you whether the agent *can* solve a task; pass^k (from τ-bench) tells you whether it *reliably* does. If each try succeeds independently with probability $p$, then $\text{pass}^k = p^k$. A 90%-reliable agent passes all of 5 tries only about 59% of the time. Users experience pass^k.

A good eval harness has:

1. **Reproducible environments**: containers or snapshots, so every run starts from the same state.
2. **Automatic graders**: unit tests, state checks, or a validated LLM judge.
3. **Cost and step tracking** per task, not just success.
4. **Failure categories** from reading traces: wrong tool, lost context, gave up early, unsafe action blocked.

## One agent or many?

Cognition argues for single-threaded agents: when sub-agents can't see each other's decisions, they make conflicting choices. Anthropic's research system shows that parallel sub-agents help on broad tasks like research, at several times the token cost. A practical rule: **use sub-agents for read-only exploration that returns a summary; keep writes and decisions in one agent with one shared context.**

## Long-running work

For tasks that span many context windows or sessions, Anthropic's long-running harness pattern is a good template:

- An **initialiser** step sets up the environment, a feature or task list, and a progress file.
- Each session **reads progress first**, works on one item, runs tests, commits, and **updates the progress file** before ending.
- Clean, tested checkpoints mean the next session never inherits a broken state.

It is the same discipline a good engineer uses when handing work to a teammate, written down so an agent can follow it.
