---
title: "Prompt & Context Engineering"
short: Context Eng.
order: 10
icon: messages-square
tier: specialisation
summary: "Decide exactly what a model sees: clear prompts, the right examples, retrieved knowledge, memory and tools, packed into a limited context window. Then optimise and evaluate it like code."
updated: 2026-11-07
overview: "Prompt engineering was about *wording*: how to phrase an instruction so the model does what you want. Context engineering is the bigger job of deciding everything that goes into the model's context window on each call: the system prompt, examples, retrieved documents, conversation history, memory, tool definitions and tool results. The window is finite and attention degrades as it fills, so every token has to earn its place. This track teaches you to write prompts precisely, to understand how and why long contexts fail, to assemble and compress context on purpose, and to treat prompts as code: versioned, tested, and sometimes optimised automatically."
why2027: "In June 2025 Shopify's Tobi Lütke and Andrej Karpathy argued that *context engineering* describes the real skill better than *prompt engineering*. Within months LangChain, Simon Willison and Anthropic had written it up, and Anthropic's September 2025 guide made it a core practice for building agents. As agents run longer and call more tools, the hard problem is no longer one clever prompt; it is managing a context that changes every step without letting it rot. Research such as Chroma's *Context Rot* report and *Lost in the Middle* shows that more context is not automatically better. This is now a core skill for anyone building agents, and the agentic-AI skill cluster is the fastest-growing in job postings."
demand:
  - claim: "The agentic-AI skill cluster grew about 280% in US job postings between 2024 and 2025, while plain chatbot skills declined."
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
  - claim: "Anthropic describes context engineering as the natural progression of prompt engineering for building agents."
    source: "Anthropic Engineering, Sep 2025"
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
prerequisites:
  - "Have built at least one small app that calls an LLM API ([AI Engineering](/roadmaps/ai-engineering/) Beginner stage)."
  - "Know what tokens and a context window are, and roughly how a Transformer attends over its input."
  - "Basic Python for scripting experiments and evals."
diagram: |
  flowchart TB
    P["Prereqs: one LLM app · tokens · Python"] --> B
    subgraph B["1 · Beginner — prompts that work"]
      direction LR
      B1["clear instructions"] --> B2["few-shot examples"] --> B3["structure · XML tags"]
    end
    subgraph I["2 · Intermediate — context, not just prompts"]
      direction LR
      I1["retrieval vs memory vs tools"] --> I2["context budget"] --> I3["failure modes"]
    end
    subgraph A["3 · Advanced — long-running context"]
      direction LR
      A1["compaction · notes"] --> A2["sub-agent isolation"] --> A3["cache-aware layout"]
    end
    subgraph E["4 · Expert — optimise & measure"]
      direction LR
      E1["DSPy · GEPA"] --> E2["prompt evals in CI"] --> E3["context-rot experiments"]
    end
    B --> I --> A --> E
    A -.-> HAR["Harness Engineering"]
    I -.-> AI["AI Engineering"]
    E -.-> SEC["AI Security & Safety"]
stages:
  - level: Beginner
    hours: 50
    focus: "Write prompts that are clear, specific and testable. Learn the techniques that reliably help, and build the habit of checking every prompt against examples."
    concepts:
      - "Be explicit: role, task, constraints, output format, and what to do when unsure."
      - "Few-shot examples: choosing varied, representative examples, and their order."
      - "Chain-of-thought: asking for step-by-step reasoning before the answer, and when reasoning models make it unnecessary."
      - "Structure with delimiters or XML tags to separate instructions, documents and examples."
      - "System prompt vs user message; prefilling or constraining the start of the answer."
      - "Self-consistency: sample several answers and take the majority."
      - "Prompts as code: keep them in version control with a small test set."
    projects:
      - title: "Prompt test bench"
        detail: "Pick one task (for example classifying support tickets). Write 40 labelled examples and a script that scores any prompt against them. Iterate five prompt versions and chart the score."
      - title: "Technique ablation"
        detail: "On the same task, measure zero-shot vs few-shot vs chain-of-thought vs XML-structured prompts. Write up which helped and by how much."
      - title: "Official-guide comparison"
        detail: "Read the Anthropic and OpenAI prompting guides and Google's prompt-engineering whitepaper. Make a one-page cheat sheet of the advice they share and where they differ."
    signals:
      - "You never judge a prompt change by one example; you run your test set."
      - "You can explain why each part of your prompt is there."
      - "You know when a reasoning model makes chain-of-thought prompting redundant."
  - level: Intermediate
    hours: 80
    focus: "Move from writing prompts to assembling context. Learn what to put in the window, what to leave out, and how long contexts fail."
    concepts:
      - "The context window as a budget: system prompt, tools, history, retrieved data and the answer all compete for tokens."
      - "Three ways to add knowledge: retrieval (search on demand), memory (saved facts across sessions) and tools (fetch or act)."
      - "Just-in-time context: give the agent identifiers and tools to look things up, instead of pasting everything in."
      - "Failure modes: context poisoning, distraction, confusion and clash (Breunig)."
      - "Context rot: quality drops as input length grows, even on simple tasks (Chroma)."
      - "Position effects: important information in the middle of a long context is used less well."
      - "Tool definitions are context too: fewer, clearer tools beat many overlapping ones."
    projects:
      - title: "Context-budget logger"
        detail: "Instrument an app to log how many tokens each context component uses per call. Find the biggest waste and cut it without lowering your eval score."
      - title: "Lost-in-the-middle reproduction"
        detail: "Put one key fact at different positions in a long document and measure how often a model finds it. Plot accuracy against position and context length."
      - title: "Retrieval vs paste-everything"
        detail: "Answer questions over a 200-page manual two ways: full document in context vs RAG with a search tool. Compare accuracy, cost and latency."
    signals:
      - "You can say exactly what is in your model's context at each step, and why."
      - "You can name the failure mode behind a bad answer (poisoning, distraction, rot...)."
      - "You reach for retrieval or a tool instead of a bigger context window by default."
  - level: Advanced
    hours: 120
    focus: "Manage context across long, multi-step agent runs: compaction, structured notes, sub-agents with their own clean windows, and layouts that keep prompt caches warm."
    concepts:
      - "Compaction: summarising old turns and tool outputs while keeping decisions, open questions and file paths."
      - "Structured note-taking: the agent writes progress to a file or memory tool and reads it back later."
      - "Sub-agent isolation: a sub-agent explores in its own window and returns only a short summary."
      - "Tool-result hygiene: truncate, paginate and filter large outputs before they enter context."
      - "Prompt caching and KV-cache reuse: keep a stable prefix, append only, and avoid reordering (Manus lessons)."
      - "Keeping mistakes visible: leaving failed attempts in context can help the agent avoid repeating them."
      - "Memory design: what to store, when to retrieve it, and how to expire stale facts."
    projects:
      - title: "Compaction experiment"
        detail: "Run a 50-step agent task with no compaction, naive summarisation, and structured compaction (decisions + TODOs + paths). Compare success rate and tokens used."
      - title: "Cache-aware refactor"
        detail: "Restructure an agent's prompt so the stable parts form a fixed prefix. Measure cache hit rate, cost and latency before and after."
      - title: "Sub-agent research tool"
        detail: "Build a research agent that sends sub-agents to read sources and return 200-word summaries. Compare against a single agent with everything in one window."
    signals:
      - "Your agents finish long tasks without the context filling with stale tool output."
      - "You can show a cache hit rate and explain what breaks it."
      - "You choose between compaction, notes and sub-agents based on the task."
  - level: Expert
    hours: 140
    focus: "Treat prompts and context policies as programs to optimise and measure. Use automatic prompt optimisation, run controlled long-context experiments, and publish what you learn."
    concepts:
      - "Programming, not prompting: declarative LLM pipelines with DSPy signatures and modules."
      - "Automatic prompt search: APE, OPRO, and reflective evolution (GEPA)."
      - "Overfitting prompts: held-out sets, many seeds, and statistical comparison of prompt variants."
      - "Model portability: re-tuning context policies when you change model or provider."
      - "Context engineering against attacks: separating trusted instructions from untrusted data (see [AI Security & Safety](/roadmaps/ai-security-safety/))."
      - "Evolving playbooks: contexts that accumulate and curate strategies over time (Agentic Context Engineering)."
    projects:
      - title: "DSPy vs hand-written"
        detail: "Re-implement one of your pipelines in DSPy and optimise it (for example with GEPA). Compare against your best hand-written prompt on a held-out set and across two models."
      - title: "Your own context-rot study"
        detail: "Design a small benchmark for your domain (for example API docs) that varies context length and distractors. Publish the results and code."
      - title: "Prompt regression suite"
        detail: "Add prompt and context-policy evals to CI with confidence intervals, so a change only merges if it is significantly better or equal."
    signals:
      - "You can prove a prompt change is an improvement, not noise."
      - "You can move a pipeline to a new model and recover quality systematically."
      - "Others reuse your benchmark or write-up."
connections:
  - track: ai-engineering
    text: "RAG, tool use and evals are the building blocks you assemble into context."
  - track: harness-engineering
    text: "Compaction, notes and sub-agents are implemented in the harness; context engineering decides the policy."
  - track: ai-security-safety
    text: "Everything you put in context can carry instructions. Separating trusted and untrusted content is a security boundary."
  - track: deep-learning
    text: "Attention, positional encodings and the KV cache explain why long contexts degrade and why cache-friendly layouts are cheaper."
  - track: inference-gpu
    text: "Prefix caching and KV-cache reuse in serving engines are what make stable prompt prefixes fast and cheap."
references:
  papers:
    - title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
      by: "Wei et al."
      year: 2022
      url: "https://arxiv.org/abs/2201.11903"
      note: "The foundational reasoning prompt."
    - title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
      by: "Wang et al."
      year: 2022
      url: "https://arxiv.org/abs/2203.11171"
      note: "Sample several reasoning paths and take a majority vote."
    - title: "Large Language Models Are Human-Level Prompt Engineers (APE)"
      by: "Zhou et al."
      year: 2022
      url: "https://arxiv.org/abs/2211.01910"
      note: "Letting a model search for better instructions."
    - title: "Large Language Models as Optimizers (OPRO)"
      by: "Yang et al."
      year: 2023
      url: "https://arxiv.org/abs/2309.03409"
      note: "Using an LLM as the optimiser for prompts."
    - title: "Lost in the Middle: How Language Models Use Long Contexts"
      by: "Liu et al."
      year: 2023
      url: "https://arxiv.org/abs/2307.03172"
      note: "Position matters: information in the middle is used less well."
    - title: "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines"
      by: "Khattab et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.03714"
      note: "Write LLM pipelines as programs and let an optimiser tune the prompts."
    - title: "MemGPT: Towards LLMs as Operating Systems"
      by: "Packer et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.08560"
      note: "Paging information in and out of a limited context, like virtual memory."
    - title: "The Prompt Report: A Systematic Survey of Prompt Engineering Techniques"
      by: "Schulhoff et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.06608"
      note: "A taxonomy of prompting techniques and terminology."
    - title: "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning"
      by: "Agrawal et al."
      year: 2025
      url: "https://arxiv.org/abs/2507.19457"
      note: "Prompt optimisation by reflection and evolution."
    - title: "Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models"
      by: "Zhang et al."
      year: 2025
      url: "https://arxiv.org/abs/2510.04618"
      note: "Contexts that grow and curate themselves as playbooks."
  courses:
    - title: "DeepLearning.AI short courses"
      by: "DeepLearning.AI"
      url: "https://www.deeplearning.ai/courses"
      note: "Short, free courses on prompting, RAG and agents."
  books:
    - title: "Prompt Engineering (whitepaper)"
      by: "Lee Boonstra, Google"
      year: 2025
      url: "https://www.kaggle.com/whitepaper-prompt-engineering"
      note: "A practical 68-page guide to prompting techniques and settings."
  articles:
    - title: "Effective context engineering for AI agents"
      by: "Anthropic"
      year: 2025
      url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      note: "Compaction, note-taking, sub-agents and just-in-time context — start here."
    - title: "Context engineering (post on X)"
      by: "Tobi Lütke"
      year: 2025
      url: "https://x.com/tobi/status/1935533422589399127"
      note: "The post that popularised the term."
    - title: "+1 for context engineering (post on X)"
      by: "Andrej Karpathy"
      year: 2025
      url: "https://x.com/karpathy/status/1937902205765607626"
      note: "A widely quoted definition of the craft."
    - title: "Context engineering"
      by: "Simon Willison"
      year: 2025
      url: "https://simonwillison.net/2025/Jun/27/context-engineering/"
      note: "Why the new term fits better than prompt engineering."
    - title: "The rise of context engineering"
      by: "LangChain"
      year: 2025
      url: "https://www.langchain.com/blog/the-rise-of-context-engineering"
      note: "Context engineering as a systems problem for agents."
    - title: "How Long Contexts Fail"
      by: "Drew Breunig"
      year: 2025
      url: "https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html"
      note: "Names the failure modes: poisoning, distraction, confusion, clash."
    - title: "Context Rot: How Increasing Input Tokens Impacts LLM Performance"
      by: "Chroma (Hong, Troynikov & Huber)"
      year: 2025
      url: "https://www.trychroma.com/research/context-rot"
      note: "Experiments showing quality falls as input grows."
    - title: "Context Engineering for AI Agents: Lessons from Building Manus"
      by: "Yichao 'Peak' Ji"
      year: 2025
      url: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus"
      note: "KV-cache-aware layout, masking tools, and using the file system as memory."
    - title: "Prompt engineering overview"
      by: "Anthropic"
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"
      note: "Official guidance for Claude models."
    - title: "Prompt engineering guide"
      by: "OpenAI"
      url: "https://developers.openai.com/api/docs/guides/prompt-engineering"
      note: "Official guidance for OpenAI models."
    - title: "GPT-4.1 Prompting Guide"
      by: "OpenAI"
      year: 2025
      url: "https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide"
      note: "Prompting literal-minded, agentic models."
    - title: "GPT-5 prompting guide"
      by: "OpenAI"
      year: 2025
      url: "https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide"
      note: "Controlling reasoning effort and agentic eagerness."
    - title: "DSPy documentation"
      by: "Stanford NLP"
      url: "https://dspy.ai/"
      note: "The framework for programming (not prompting) language models."
---

## From prompt to context

A prompt is one string. A context is everything the model sees on this call. In a modern agent, the part you wrote by hand is often a small fraction of the window; the rest is history, retrieved data and tool output that changes every step.

```mermaid
flowchart TB
  subgraph STABLE["Stable prefix (cache-friendly)"]
    direction LR
    SYS["system prompt<br/>role · rules · style"] --> TOOLS["tool definitions"] --> EX["few-shot examples"]
  end
  subgraph DYN["Dynamic part (changes every step)"]
    direction LR
    MEM["memory / notes<br/>(loaded on demand)"] --> RET["retrieved documents"] --> HIST["conversation + tool results<br/>(compacted)"] --> Q["current request"]
  end
  STABLE --> DYN --> W["context window"] --> M["model"] --> A["answer or tool call"]
  A -- "tool result" --> HIST
```

Order matters for two reasons. Keeping the **stable parts first** lets the serving engine reuse its KV cache across calls (cheaper and faster). Putting the **current request last**, close to where the model starts generating, avoids it being lost in the middle.

## A context budget

Treat the window like memory in a small device. If the window holds $W$ tokens and you need room for the answer:

$$
T_{\text{system}} + T_{\text{tools}} + T_{\text{examples}} + T_{\text{memory}} + T_{\text{retrieved}} + T_{\text{history}} + T_{\text{answer}} \le W
$$

Fitting is not the goal, though. Quality usually drops well before the limit, so set your own budget for each component (for example "retrieved docs ≤ 8k tokens, history compacted above 30k") and log the actual numbers. A useful signal is the share of the window that is *relevant* to the current step:

$$
\text{signal ratio} = \frac{\text{tokens the step actually needs}}{\text{tokens in context}}
$$

You can't measure the numerator exactly, but asking the question changes your design: fewer tools, shorter tool results, and retrieval on demand instead of pasting everything in.

## Prompting techniques that still matter

- **Be specific about the output.** Give a schema, an example, and what to do when the answer is unknown.
- **Use structure.** Wrap documents, examples and instructions in clear tags so the model can tell them apart.
- **Show, don't just tell.** Two or three varied examples often beat a paragraph of rules.
- **Let it think when it helps.** Chain-of-thought helps non-reasoning models on multi-step problems; reasoning models already do this internally, so focus on clear goals and constraints instead.
- **Test, don't guess.** Every technique helps on some tasks and hurts on others. Your test set decides.

## Why long contexts fail

| Failure | What happens | Typical fix |
| --- | --- | --- |
| Poisoning | a hallucination or error enters context and gets repeated | validate tool results; let the agent re-check facts |
| Distraction | long history makes the model repeat past actions | compaction; fresh sub-agent windows |
| Confusion | irrelevant tools or documents get used | fewer tools; better retrieval; filter results |
| Clash | contradictory information in context | remove outdated facts; mark sources and dates |
| Rot | accuracy falls as length grows, even on easy tasks | keep context short; just-in-time retrieval |

## Managing context over a long run

Three tools cover most cases:

1. **Compaction.** When history grows past a threshold, summarise it, keeping decisions, unresolved issues and exact identifiers (file paths, IDs). Drop raw tool output first.
2. **Notes.** Let the agent write progress to a file or memory store (`NOTES.md`, a TODO list) and read it back. This survives compaction and even new sessions.
3. **Sub-agents.** Send a focused sub-task to a fresh window. The sub-agent may read 50k tokens; the parent receives 500.

## Optimising prompts automatically

Once you have a reliable eval, you can let software search for better prompts. DSPy expresses a pipeline as typed modules and uses optimisers (including GEPA) to choose instructions and examples. The risk is the same as in ML: **overfitting to your dev set**. Keep a held-out set, compare across several runs, and re-check when you switch models.
