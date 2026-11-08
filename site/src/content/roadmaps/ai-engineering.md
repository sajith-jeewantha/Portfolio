---
title: AI Engineering
short: AI Eng.
order: 9
icon: sparkles
tier: core
summary: "Build reliable products on top of foundation models: model APIs and structured output, retrieval-augmented generation, agents and tool use (MCP, A2A), evals, and shipping with real cost and latency budgets."
updated: 2026-11-07
overview: "AI engineering is the work of turning a foundation model into a product people can trust. You rarely train the model yourself. Instead you choose one, give it the right context (prompts, retrieved documents, tools), connect it to real systems, and measure whether it actually works. The core skills are software engineering skills applied to a probabilistic component: clean APIs, structured output, retrieval pipelines, agent loops that call tools, **evals** that catch regressions, and the cost, latency and safety trade-offs of running all of it in production. It is the most direct path from a software engineer to an AI role, and it builds naturally on API and integration work."
why2027: "AI engineer is LinkedIn's fastest-growing US role for 2026, and the skills named are the ones in this track: RAG, LangChain-style orchestration and PyTorch. Lightcast data for the 2026 AI Index shows AI skills in a growing share of all postings, with the *agentic AI* cluster growing fastest while plain chatbot skills declined. The work is shifting from demos to dependable systems: agents connected through standards like the Model Context Protocol, evaluated continuously, and deployed inside customers' real environments. That last part is the forward-deployed engineer role, whose postings have grown very quickly. Engineers who can ship *and* measure AI features are in short supply."
demand:
  - claim: "AI engineer is LinkedIn's #1 fastest-growing US role for 2026, with LangChain, RAG and PyTorch among the listed skills."
    source: "Dice on LinkedIn Jobs on the Rise 2026"
    url: "https://www.dice.com/career-advice/ai-related-jobs-top-linkedins-fastest-growing-roles-list-for-2026"
  - claim: "The agentic-AI skill cluster grew roughly 280% in US postings in one year; AI skills overall are in 2.5% of postings, up 55%."
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
  - claim: "Forward-deployed engineer postings in India grew nearly 19× in a year (Indeed data)."
    source: "Analytics India Magazine, Oct 2026"
    url: "https://analyticsindiamag.com/ai-news/forward-deployed-engineer-job-postings-in-india-grew-nearly-19x-in-a-year-report"
prerequisites:
  - "Solid Python or TypeScript, HTTP/REST APIs, JSON and async code ([Software Engineering](/roadmaps/software-engineering/) Beginner–Intermediate)."
  - "Basic SQL and comfort with one database."
  - "A rough mental model of how LLMs work: tokens, context window, sampling. Karpathy's one-hour *Intro to LLMs* talk is enough to start."
  - "An API key for at least one model provider, or a local model through Ollama or llama.cpp."
diagram: |
  flowchart TB
    P["Prereqs: APIs · Python/TS · SQL"] --> B
    subgraph B["1 · Beginner — calling models well"]
      direction LR
      B1["model APIs · tokens"] --> B2["prompts + structured output"] --> B3["tiny eval set"]
    end
    subgraph I["2 · Intermediate — RAG"]
      direction LR
      I1["chunk + embed"] --> I2["hybrid search + rerank"] --> I3["grounded answers + citations"]
    end
    subgraph A["3 · Advanced — agents & evals"]
      direction LR
      A1["tool use · MCP"] --> A2["workflows vs agents"] --> A3["error analysis · LLM judges"] --> A4["CI evals"]
    end
    subgraph E["4 · Expert — production"]
      direction LR
      E1["cost · latency · caching"] --> E2["guardrails · observability"] --> E3["forward-deployed delivery"]
    end
    B --> I --> A --> E
    A -.-> CTX["Context Engineering"]
    A -.-> HAR["Harness Engineering"]
    E -.-> SEC["AI Security & Safety"]
stages:
  - level: Beginner
    hours: 90
    focus: "Learn to call models reliably. Understand tokens, context windows and sampling, get structured output you can parse, and start the habit of testing outputs against a small set of examples."
    concepts:
      - "How LLM APIs work: messages, roles, system prompts, tokens, context window, `temperature`, max tokens, streaming."
      - "Pricing and limits: input vs output tokens, rate limits, retries with exponential backoff."
      - "Structured output: JSON mode or schemas, validating with Pydantic or Zod, repairing bad output."
      - "Prompting basics: clear instructions, examples (few-shot), delimiters, asking for reasoning before the answer."
      - "Tool / function calling: the model proposes a call, *your code* runs it and returns the result."
      - "Local models: running a small open-weight model with llama.cpp or Ollama for privacy and cost."
      - "Hallucination: why models produce confident wrong answers and why you need grounding and evals."
    projects:
      - title: "Structured extractor"
        detail: "Turn messy text (job posts, invoices, emails) into validated JSON with a schema. Track the failure rate on 30 hand-labelled examples and improve it."
      - title: "CLI assistant with one tool"
        detail: "A command-line chat app with streaming, retries and one tool (for example a weather or currency API). Log every request with token counts and cost."
      - title: "Model comparison sheet"
        detail: "Run the same 20 tasks through two hosted models and one local model. Compare quality, latency and cost in a short blog post."
    signals:
      - "You can predict roughly what a request will cost and how long it will take."
      - "Your code never crashes on malformed model output; it validates, retries or falls back."
      - "You keep a small labelled test set and re-run it whenever you change a prompt."
  - level: Intermediate
    hours: 150
    focus: "Build retrieval-augmented generation (RAG) that answers from your own documents, with citations, and measure retrieval quality separately from answer quality."
    concepts:
      - "Why RAG: give the model fresh, private, citable knowledge instead of relying on what it memorised."
      - "Chunking strategies: fixed size with overlap, structure-aware (headings, code blocks), and chunk size trade-offs."
      - "Embeddings: dense vectors (Sentence-BERT, DPR), cosine similarity, choosing and versioning an embedding model."
      - "Vector indexes: approximate nearest neighbour search and HNSW; pgvector or a vector database."
      - "Hybrid search: combine keyword search (BM25) with dense search, then **rerank** with a cross-encoder or late-interaction model (ColBERT)."
      - "Contextual retrieval: add a short document-level summary to each chunk before embedding it."
      - "Retrieval metrics (recall@k, MRR) vs answer metrics (faithfulness, correctness); the *lost in the middle* effect."
    projects:
      - title: "Docs Q&A with citations"
        detail: "RAG over a real documentation set (for example WSO2 or Ballerina docs) with hybrid search, reranking and inline citations. Refuse to answer when nothing relevant is retrieved."
      - title: "Retrieval eval"
        detail: "Write 50 questions with the chunk(s) that should be retrieved. Measure recall@5 before and after adding hybrid search, reranking and contextual retrieval."
      - title: "Chunking ablation"
        detail: "Compare three chunking strategies on the same eval and write up which wins and why."
    signals:
      - "When a RAG answer is wrong, you can tell whether retrieval or generation failed."
      - "You measure retrieval with a labelled set rather than by eye."
      - "You can explain HNSW, hybrid search and reranking to a teammate."
  - level: Advanced
    hours: 220
    focus: "Build agents that use tools safely, and an evaluation practice that tells you whether a change made things better. Prefer simple workflows; use autonomous agents only when they are needed."
    concepts:
      - "Workflows vs agents: prompt chaining, routing, parallelisation, orchestrator-workers and evaluator-optimiser patterns (Anthropic's *Building effective agents*)."
      - "The ReAct loop: reason, call a tool, observe, repeat; stopping conditions and step budgets."
      - "Model Context Protocol (MCP): servers that expose tools, resources and prompts to any client; auth and transport."
      - "Agent-to-agent protocols (A2A) and when multi-agent designs are worth their cost."
      - "Error analysis: read real traces, label failure modes, count them, then fix the biggest one (Hamel Husain's approach)."
      - "LLM-as-a-judge: writing a binary pass/fail rubric, checking it against human labels, and position and length bias."
      - "Eval tooling: Inspect, promptfoo or OpenAI Evals; running evals in CI on every prompt or model change."
    projects:
      - title: "MCP server for a real system"
        detail: "Expose an internal API (for example a WSO2 API Manager or database endpoint) as an MCP server with well-described tools, input validation and read-only defaults. Use it from two different MCP clients."
      - title: "Workflow first, then agent"
        detail: "Solve one task (for example triaging GitHub issues) as a fixed workflow, then as a ReAct agent. Compare success rate, cost and latency on 40 cases."
      - title: "Eval pipeline in CI"
        detail: "Do error analysis on 100 real traces, write a judge prompt for the top two failure modes, check its agreement with your own labels, and run it in GitHub Actions on every pull request."
    signals:
      - "You choose the simplest pattern that works and can justify any agent autonomy."
      - "You have a failure taxonomy for your app based on real traces."
      - "Your LLM judge agrees with your human labels and you know its error rate."
      - "A prompt change that breaks things is caught by CI, not by users."
  - level: Expert
    hours: 260
    focus: "Run AI features in production for real users: cost and latency engineering, guardrails, observability, and delivering AI inside a customer's own systems."
    concepts:
      - "Latency: time to first token, streaming UX, parallel tool calls, smaller models for easy steps, model routing."
      - "Cost: prompt caching, batching, distillation to a smaller model, and per-feature cost dashboards."
      - "Fine-tune or not: when prompting + RAG is enough, and when to fine-tune (see [Deep Learning](/roadmaps/deep-learning/))."
      - "Guardrails: input and output filters, PII handling, least-privilege tools, human approval for risky actions."
      - "Observability: tracing every model and tool call (OpenTelemetry-style), online evals and user feedback loops."
      - "Benchmarks and their limits: SWE-bench, τ-bench, GAIA and BFCL as signals, not truth."
      - "Forward-deployed engineering: discovery with customers, integrating with their data and identity systems, and measuring business outcomes."
    projects:
      - title: "Production-grade assistant"
        detail: "Ship an internal assistant to at least five real users with tracing, cost per conversation, online feedback and a weekly eval report. Write a post-mortem after one month."
      - title: "Cost and latency halving"
        detail: "Take an existing feature and cut cost or p95 latency in half (caching, routing, a smaller model) without lowering your eval score. Document every step."
      - title: "Customer integration case study"
        detail: "Deliver an agent that works inside a real system (an ERP, a ticketing tool, an API gateway) with SSO and scoped permissions. Write it up as a forward-deployed case study."
    signals:
      - "You can give a cost, latency and quality budget for a feature before building it."
      - "You know your production failure rate and what drives it."
      - "Stakeholders trust your evals enough to make go/no-go decisions on them."
connections:
  - track: context-engineering
    text: "Most of AI engineering is deciding what goes into the context window. Context engineering goes deep on that."
  - track: harness-engineering
    text: "Once agents run for many steps, the loop, tools, sandbox and permissions around the model become the product."
  - track: cloud-engineering
    text: "API gateways, IAM, secrets and workload identity decide what your agent's tools are allowed to touch."
  - track: ai-security-safety
    text: "Every RAG document and tool result is untrusted input; prompt injection is the top risk for AI apps."
  - track: deep-learning
    text: "Understanding training and post-training tells you when to fine-tune and why models fail the way they do."
  - track: software-architecture
    text: "AI features are distributed systems: retries, idempotency, queues and fallbacks still apply."
references:
  papers:
    - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
      by: "Lewis et al."
      year: 2020
      url: "https://arxiv.org/abs/2005.11401"
      note: "The original RAG paper."
    - title: "Dense Passage Retrieval for Open-Domain Question Answering"
      by: "Karpukhin et al."
      year: 2020
      url: "https://arxiv.org/abs/2004.04906"
      note: "Dense retrieval with dual encoders — the basis of embedding search."
    - title: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT"
      by: "Khattab & Zaharia"
      year: 2020
      url: "https://arxiv.org/abs/2004.12832"
      note: "Late-interaction retrieval; a strong reranking idea."
    - title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
      by: "Reimers & Gurevych"
      year: 2019
      url: "https://arxiv.org/abs/1908.10084"
      note: "Where practical sentence embeddings came from."
    - title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs"
      by: "Malkov & Yashunin"
      year: 2016
      url: "https://arxiv.org/abs/1603.09320"
      note: "HNSW — the index inside most vector databases."
    - title: "Retrieval-Augmented Generation for Large Language Models: A Survey"
      by: "Gao et al."
      year: 2023
      url: "https://arxiv.org/abs/2312.10997"
      note: "A map of RAG techniques, from naive to modular RAG."
    - title: "Lost in the Middle: How Language Models Use Long Contexts"
      by: "Liu et al."
      year: 2023
      url: "https://arxiv.org/abs/2307.03172"
      note: "Models miss information buried in the middle of long contexts."
    - title: "ReAct: Synergizing Reasoning and Acting in Language Models"
      by: "Yao et al."
      year: 2022
      url: "https://arxiv.org/abs/2210.03629"
      note: "The basic reason-act-observe agent loop."
    - title: "Toolformer: Language Models Can Teach Themselves to Use Tools"
      by: "Schick et al."
      year: 2023
      url: "https://arxiv.org/abs/2302.04761"
      note: "Early self-taught tool use."
    - title: "Reflexion: Language Agents with Verbal Reinforcement Learning"
      by: "Shinn et al."
      year: 2023
      url: "https://arxiv.org/abs/2303.11366"
      note: "Agents that improve by critiquing their own attempts."
    - title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
      by: "Jimenez et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.06770"
      note: "The standard benchmark for coding agents."
    - title: "τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains"
      by: "Yao et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.12045"
      note: "Tests tool-using agents in realistic conversations with policies."
    - title: "GAIA: a benchmark for General AI Assistants"
      by: "Mialon et al."
      year: 2023
      url: "https://arxiv.org/abs/2311.12983"
      note: "Questions easy for humans but hard for assistants."
    - title: "Why Language Models Hallucinate"
      by: "Kalai et al."
      year: 2025
      url: "https://arxiv.org/abs/2509.04664"
      note: "Argues hallucination is rewarded by how models are trained and graded."
  courses:
    - title: "Intro to Large Language Models"
      by: "Andrej Karpathy"
      year: 2023
      url: "https://www.youtube.com/watch?v=zjkBMFhNj_g"
      note: "The best one-hour mental model of LLMs."
    - title: "DeepLearning.AI short courses"
      by: "DeepLearning.AI"
      url: "https://www.deeplearning.ai/courses"
      note: "Free hands-on courses on RAG, agents, MCP and evals."
    - title: "Hugging Face AI Agents Course"
      by: "Hugging Face"
      year: 2025
      url: "https://huggingface.co/learn/agents-course/unit0/introduction"
      note: "A free, project-based agents curriculum."
    - title: "LLM Bootcamp"
      by: "Full Stack Deep Learning"
      year: 2023
      url: "https://fullstackdeeplearning.com/llm-bootcamp/"
      note: "How to ship LLM apps, from prompts to deployment."
  books:
    - title: "AI Engineering: Building Applications with Foundation Models"
      by: "Chip Huyen"
      year: 2025
      url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/"
      note: "The reference book for this track: evals, RAG, agents, fine-tuning, inference."
  articles:
    - title: "Building effective agents"
      by: "Anthropic"
      year: 2024
      url: "https://www.anthropic.com/research/building-effective-agents"
      note: "Workflows vs agents, and the simple patterns that work."
    - title: "Contextual Retrieval"
      by: "Anthropic"
      year: 2024
      url: "https://www.anthropic.com/research/contextual-retrieval"
      note: "Adding context to chunks before indexing to cut retrieval failures."
    - title: "A practical guide to building agents"
      by: "OpenAI"
      year: 2025
      url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf"
      note: "OpenAI's playbook for agent design and guardrails."
    - title: "Your AI Product Needs Evals"
      by: "Hamel Husain"
      year: 2024
      url: "https://hamel.dev/blog/posts/evals/"
      note: "Why evals are the core of AI product work."
    - title: "AI Evals: Everything You Need to Know"
      by: "Hamel Husain"
      year: 2025
      url: "https://hamel.dev/blog/posts/evals-faq/"
      note: "A practical FAQ on error analysis, judges and eval process."
    - title: "Patterns for Building LLM-based Systems & Products"
      by: "Eugene Yan"
      year: 2023
      url: "https://eugeneyan.com/writing/llm-patterns/"
      note: "The classic catalogue: evals, RAG, caching, guardrails, feedback."
    - title: "What We've Learned From A Year of Building with LLMs"
      by: "Yan, Bischof, Frye, Husain, Liu & Shankar"
      year: 2024
      url: "https://applied-llms.org/"
      note: "Tactical, operational and strategic lessons from practitioners."
    - title: "Model Context Protocol specification"
      by: "MCP project"
      url: "https://modelcontextprotocol.io/specification/latest"
      note: "The open standard for connecting models to tools and data."
    - title: "Agent2Agent (A2A) Protocol"
      by: "Linux Foundation A2A project"
      year: 2025
      url: "https://a2a-protocol.org/latest/"
      note: "Interoperability between agents built on different stacks."
    - title: "Berkeley Function Calling Leaderboard"
      by: "Gorilla, UC Berkeley"
      url: "https://gorilla.cs.berkeley.edu/leaderboard.html"
      note: "Compares models on tool-calling accuracy."
    - title: "Inspect"
      by: "UK AI Security Institute"
      url: "https://inspect.aisi.org.uk/"
      note: "An open eval framework used by AI safety institutes."
    - title: "promptfoo documentation"
      by: "promptfoo"
      url: "https://www.promptfoo.dev/docs/intro/"
      note: "Eval and red-team tests you can run in CI."
    - title: "OpenAI Evals"
      by: "OpenAI"
      url: "https://github.com/openai/evals"
      note: "An eval framework and a registry of example evals."
---

## The shape of an AI feature

Almost every AI feature is the same loop: assemble context, call a model, check the output, maybe call a tool, and log everything so you can evaluate it later. The model is one component. Most bugs live in the code and data around it.

```mermaid
flowchart TB
  U["user request"] --> CTX["assemble context<br/>system prompt · history · retrieved docs · tool list"]
  CTX --> M["model call"]
  M --> V{"valid structured output?"}
  V -- "no" --> R["repair / retry / fallback"] --> M
  V -- "tool call" --> T["run tool in your code<br/>validate inputs · least privilege"] --> CTX
  V -- "final answer" --> G["guardrails<br/>PII · policy · citations"] --> OUT["response"]
  M -.-> LOG["trace: tokens · cost · latency"]
  T -.-> LOG
  OUT -.-> LOG
```

## RAG, step by step

RAG has two halves. **Indexing** happens offline; **retrieval and generation** happen per request. Measure the two halves separately: if the right chunk never reaches the model, no prompt will save you.

```mermaid
flowchart TB
  subgraph IDX["Indexing (offline)"]
    direction LR
    D["documents"] --> C["chunk<br/>structure-aware"] --> CC["add context<br/>(contextual retrieval)"] --> EMB["embed"] --> VEC["vector index (HNSW)"]
    CC --> BM["keyword index (BM25)"]
  end
  subgraph QRY["Query time"]
    direction LR
    Q["question"] --> H["hybrid search<br/>dense + BM25"] --> RR["rerank top 50 → top 5"] --> GEN["generate with citations"]
  end
  VEC --> H
  BM --> H
```

Dense retrieval ranks chunks by cosine similarity between the query embedding $q$ and each chunk embedding $d$:

$$
\operatorname{sim}(q, d) = \frac{q \cdot d}{\lVert q \rVert \, \lVert d \rVert}
$$

Dense search finds paraphrases; keyword search finds exact names, error codes and IDs. That is why **hybrid search plus a reranker** beats either alone on most real document sets. Track retrieval with **recall@k**: the share of questions where at least one correct chunk is in the top $k$.

## Workflows before agents

Anthropic's *Building effective agents* makes a simple point: start with the least autonomous design that solves the problem.

| Pattern | What it is | Good for |
| --- | --- | --- |
| Prompt chain | fixed sequence of calls | tasks with clear steps |
| Router | classify, then send to a specialised prompt | mixed request types |
| Parallel | several calls at once, then combine | voting, independent sub-tasks |
| Orchestrator–workers | one model plans, others execute | tasks you can't split in advance |
| Agent | model decides the next step in a loop | open-ended tasks with tools |

Agents cost more, are slower and are harder to test. Use them when the path really can't be known in advance, and give them step and cost budgets.

## Tools and MCP

A tool is just a function with a name, a description and a JSON schema. The model *proposes* a call and your code runs it, so **your code is the security boundary**. Validate arguments, scope credentials to the user, and make destructive tools require confirmation.

The Model Context Protocol standardises this: an MCP *server* exposes tools, resources and prompts, and any MCP *client* (an IDE, a chat app, your own agent) can use them. If you already build APIs and integrations, MCP servers are a natural next step. Treat them like any public API: authentication, rate limits, input validation and audit logs.

## The eval loop

Evals are how you know a change helped. The practice that works is boring and manual at first:

```mermaid
flowchart LR
  T["collect real traces"] --> L["read & label failures<br/>(error analysis)"] --> C["count failure modes"] --> F["fix the biggest one<br/>prompt · retrieval · tool · data"]
  F --> E["automate a check<br/>code assertion or LLM judge"] --> CI["run in CI on every change"] --> T
```

1. **Look at data first.** Read 50–100 traces and write down what went wrong, in your own words.
2. **Prefer code checks** (valid JSON? cited a retrieved chunk? called the right tool?) over judges where you can.
3. **For judges, use binary pass/fail** with a short rubric, and measure agreement with your own labels before trusting them.
4. **Keep a held-out set** you never tune prompts against, so you can tell real improvement from overfitting.

## Cost and latency budgets

A rough per-request cost is

$$
\text{cost} \approx n_{\text{in}} \cdot p_{\text{in}} + n_{\text{out}} \cdot p_{\text{out}}
$$

where $n$ are token counts and $p$ the per-token prices. Output tokens usually cost several times more than input tokens and dominate latency, because they are generated one at a time. The levers, roughly in order of effort: shorter outputs, prompt caching for stable prefixes, a smaller model for easy steps (routing), batching offline work, and only then fine-tuning or distillation.

## The forward-deployed engineer

A fast-growing role combines everything above with customer work: sit with a customer, find the workflow worth automating, connect an agent to their systems (identity, APIs, data), and prove it works with evals they believe. It rewards integration experience, clear writing and the ability to say *no* to an agent when a workflow would do.
