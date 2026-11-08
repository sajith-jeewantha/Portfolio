---
title: Software Engineering
short: Software Eng.
order: 2
icon: code-xml
tier: foundation
summary: "The base every other track stands on: clean code and design, data structures and algorithms, testing, system design, CI/CD and DevOps — and, new for 2027, working effectively with AI coding agents."
updated: 2026-11-07
overview: "Software engineering is building systems that keep working as they grow, change hands and meet real users. It covers writing clear code (naming, modules, interfaces), choosing the right data structures and algorithms, proving behaviour with tests, designing systems that scale and fail gracefully, and shipping safely through automated pipelines. In 2026 it also means *directing* AI coding agents: writing precise specs, reviewing generated code critically, and building the tests and guardrails that make agent output trustworthy. For an engineer six months in — writing Java, Python, TypeScript and Ballerina at WSO2 — this track turns day-to-day coding into deliberate craft."
why2027: "AI writes more code every month, which makes engineering *judgement* — design, testing, review, debugging and operations — more valuable, not less. In the 2026 Stack Overflow survey, 66% of developers who use AI use coding agents, and 73% of those use them daily, yet trust still depends on verification. GitHub's Octoverse saw more than a million agent-authored pull requests in four months of 2025, and TypeScript became the most-used language on GitHub. The 2026 AI Index also reports that employment for developers aged 22–25 has fallen sharply since 2024, so strong fundamentals and visible, well-tested projects are what set a junior engineer apart."
demand:
  - claim: "66% of AI-using developers use coding agents, 73% of them daily; 79% want to learn more AI skills."
    source: "Stack Overflow Developer Survey 2026"
    url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
  - claim: "Over 1 million agent-created pull requests (May–Sep 2025); TypeScript became GitHub's #1 language."
    source: "GitHub Octoverse 2025"
    url: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/"
  - claim: "Employment of software developers aged 22–25 has fallen nearly 20% since 2024 — fundamentals and proof of skill matter more."
    source: "Stanford HAI, AI Index 2026 takeaways"
    url: "https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report"
prerequisites:
  - "One language you're productive in (Java, Python or TypeScript) — you already have this."
  - "Basic Git: commit, branch, pull request."
  - "Comfort on the command line (the Missing Semester course fills gaps fast)."
diagram: |
  flowchart TB
    P["Prereqs: one language · Git · shell"] --> B
    subgraph B["1 · Beginner — professional habits"]
      direction LR
      B1["clean code & Git flow"] --> B2["core data structures"] --> B3["unit tests"] --> B4["CI pipeline"]
    end
    subgraph I["2 · Intermediate — design & algorithms"]
      direction LR
      I1["algorithms & complexity"] --> I2["module design"] --> I3["integration tests"] --> I4["Docker · deploy"]
    end
    subgraph A["3 · Advanced — systems"]
      direction LR
      A1["system design"] --> A2["data-intensive apps"] --> A3["observability · SLOs"] --> A4["agents in the loop"]
    end
    subgraph E["4 · Expert — leverage"]
      direction LR
      E1["large-scale design"] --> E2["reliability & incidents"] --> E3["dev platform · DORA"] --> E4["mentoring · RFCs"]
    end
    B --> I --> A --> E
    I -.-> ARCH["Software Architecture"]
    A -.-> CLOUD["Cloud Engineering"]
    A -.-> HARN["Harness Engineering"]
stages:
  - level: Beginner
    hours: 120
    focus: "Professional habits: readable code, a solid Git workflow, the core data structures, your first real test suite and a CI pipeline."
    concepts:
      - "Naming, small functions and the *deep module* idea from *A Philosophy of Software Design*."
      - "Git beyond basics: rebasing, interactive history clean-up, writing good commit messages and PR descriptions."
      - "Arrays, hash maps, sets, stacks, queues, linked lists — and Big-O for each operation."
      - "Unit testing with JUnit / pytest / Vitest; arrange–act–assert; test names as documentation."
      - "Debugging deliberately: reproduce, isolate, bisect (`git bisect`), read stack traces."
      - "The shell and tooling: `grep`, pipes, `ssh`, editor fluency, scripting small automations."
      - "Using an AI assistant safely: ask for explanations, then verify against docs and tests."
    projects:
      - title: "Refactor something you wrote six months ago"
        detail: "Pick an early project, add tests first, then refactor for clarity. Write a short post comparing before and after, and what the tests caught."
      - title: "CLI tool with tests and CI"
        detail: "Build a small CLI (e.g. a JSON/CSV converter or a WSO2 config linter) in Python or TypeScript with >80% test coverage, linting and a GitHub Actions workflow that runs on every PR."
      - title: "75 DSA problems, explained"
        detail: "Solve a curated set covering arrays, hashing, two pointers, stacks, BFS/DFS. For each, write a one-paragraph note on the pattern and complexity in a public repo."
    signals:
      - "Your PRs are small, well-described and rarely need structural rework in review."
      - "You write tests before being asked, and CI blocks merges when they fail."
      - "You can state the time and space complexity of the code you write."
  - level: Intermediate
    hours: 180
    focus: "Design and algorithms: classic algorithms and complexity, modular design and interfaces, integration testing, containers and deployment."
    concepts:
      - "Sorting, binary search, recursion, trees and heaps, graphs (BFS, DFS, Dijkstra, topological sort), dynamic programming."
      - "Design principles: cohesion and coupling, interfaces, dependency injection, SOLID read critically, composition over inheritance."
      - "Error handling and API contracts: exceptions vs result types, idempotency, validation at boundaries."
      - "The test pyramid: unit, integration, contract and end-to-end tests; test doubles; testing with real databases in containers."
      - "Concurrency basics: threads, async/await, race conditions, locks and immutability."
      - "Docker images, multi-stage builds, environment config (twelve-factor style), secrets handling."
      - "Code review as a skill: what to look for, how to give and receive feedback."
    projects:
      - title: "REST service, properly tested"
        detail: "Build a Spring Boot or FastAPI service with a Postgres database. Add unit tests, Testcontainers-based integration tests and an OpenAPI contract. Ship it as a Docker image from CI."
      - title: "Integration flow in Ballerina"
        detail: "Write a Ballerina service that calls two external APIs, merges the results and handles timeouts and retries. Test failure paths deliberately. Blog about what Ballerina's type system catches for you."
      - title: "Implement the classics"
        detail: "Implement an LRU cache, a trie-based autocomplete and Dijkstra on a real map dataset, each with property-based tests (Hypothesis / jqwik)."
    signals:
      - "You can design a module's public interface before writing its internals, and defend the trade-offs."
      - "You choose the right test type for a bug and can explain why."
      - "You solve medium algorithm problems in under 30 minutes and can explain the pattern."
  - level: Advanced
    hours: 220
    focus: "Systems: system design, data-intensive applications, observability and reliability — and making AI coding agents a productive, safe part of your workflow."
    concepts:
      - "System design building blocks: load balancers, caches, queues, databases (SQL vs NoSQL), CDNs, rate limiting."
      - "Data-intensive design: replication, partitioning, transactions and isolation levels, consistency trade-offs (DDIA)."
      - "Observability: structured logs, metrics, traces (OpenTelemetry); SLIs, SLOs and error budgets (Google SRE)."
      - "Deployment strategies: blue/green, canary, feature flags, database migrations without downtime."
      - "Performance: profiling, latency percentiles (p50/p99), back-pressure, capacity estimates."
      - "Security basics: OWASP risks, input validation, authn vs authz, secrets management, dependency scanning."
      - "Agent-assisted development: specs and acceptance tests first, small diffs, hooks and CI as guardrails, reviewing generated code."
    projects:
      - title: "Design and build a URL shortener at scale"
        detail: "Write a one-page design doc (requirements, capacity estimate, API, data model, trade-offs), then build it with a cache and rate limiter. Load-test it with k6 and report p99 latency."
      - title: "Observability for your service"
        detail: "Instrument the Intermediate REST service with OpenTelemetry traces and metrics, define two SLOs, and build a dashboard plus an alert that fires on error-budget burn."
      - title: "Agent-built feature, human-grade quality"
        detail: "Use an AI coding agent to implement a feature from a written spec and failing acceptance tests. Measure how many iterations it took and what review caught, then write up a workflow that worked."
    signals:
      - "You can run a 45-minute system design discussion with clear requirements and trade-offs."
      - "You've been on call (or simulated it) and resolved an incident using logs, metrics and traces."
      - "Your agent-assisted PRs are as reliable as your hand-written ones because the tests define done."
  - level: Expert
    hours: 260
    focus: "Leverage: large-scale design, reliability engineering, developer platforms and delivery metrics, and raising the bar for the people around you."
    concepts:
      - "Designing for failure: timeouts, retries with jitter, circuit breakers, bulkheads, graceful degradation."
      - "Delivery performance: the DORA metrics (deployment frequency, lead time, change failure rate, recovery time)."
      - "Developer platforms: paved roads, templates, internal tooling, golden paths for agents and humans."
      - "Large-codebase practices from Google's SWE book: code review culture, dependency management, large-scale changes."
      - "Writing RFCs and design docs that get adopted; leading technical decisions."
      - "Building harnesses for coding agents: repository context files, test oracles, sandboxing and permission policies."
      - "Mentoring and technical leadership."
    projects:
      - title: "Chaos and resilience exercise"
        detail: "Inject failures (latency, dropped dependencies) into a multi-service system and show your resilience patterns working. Publish the results and fixes."
      - title: "Measure and improve DORA metrics"
        detail: "For a team or open-source project, measure the four DORA metrics from CI/CD and Git data, then make one improvement (faster tests, smaller PRs, automated rollback) and re-measure."
      - title: "Paved road for agents"
        detail: "Create a repository template with conventions docs, test commands, lint and pre-commit hooks and CI that lets a coding agent work safely. Show before-and-after success rates on five tasks."
      - title: "Open-source contribution"
        detail: "Land a non-trivial change in a project you use (a WSO2, Ballerina or Python ecosystem repo), including tests and docs."
    signals:
      - "Other engineers seek your design reviews and your docs get reused."
      - "You can quantify engineering performance and justify investments with data."
      - "You make teams (and agents) faster without making systems less safe."
connections:
  - track: software-architecture
    text: "Module design, coupling and system-design practice grow directly into architecture styles and distributed-systems trade-offs."
  - track: cloud-engineering
    text: "CI/CD, containers and observability are the bridge to IaC, IAM-secured deployments and managed cloud services."
  - track: data-engineering
    text: "SQL, data modelling and testing data code are software engineering applied to pipelines."
  - track: harness-engineering
    text: "Specs, tests, hooks and sandboxes that make coding agents reliable are harness engineering in your own repo."
  - track: ai-engineering
    text: "LLM products are still software: APIs, tests, monitoring and deploys — with evals added to the test pyramid."
references:
  papers:
    - title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
      by: "Jimenez et al."
      year: 2023
      url: "https://arxiv.org/abs/2310.06770"
      note: "How coding agents are evaluated on real repositories — and why tests are the oracle."
    - title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
      by: "Yang et al."
      year: 2024
      url: "https://arxiv.org/abs/2405.15793"
      note: "Shows that tool and interface design changes agent performance — relevant to how you set up repos."
  courses:
    - title: "MIT 6.006 Introduction to Algorithms"
      by: "Demaine, Ku & Solomon, MIT OpenCourseWare"
      year: 2020
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
      note: "The standard free algorithms course with lectures and problem sets."
    - title: "The Missing Semester of Your CS Education"
      by: "MIT CSAIL"
      url: "https://missing.csail.mit.edu/"
      note: "Shell, Git, editors, debugging and tooling — fast, high-leverage wins."
  books:
    - title: "A Philosophy of Software Design (2nd ed.)"
      by: "John Ousterhout"
      year: 2021
      url: "https://web.stanford.edu/~ouster/cgi-bin/book.php"
      note: "Managing complexity with deep modules; short and immediately useful."
    - title: "The Pragmatic Programmer (20th Anniversary Edition)"
      by: "David Thomas & Andrew Hunt"
      year: 2019
      url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/"
      note: "Durable habits for a professional career."
    - title: "Introduction to Algorithms (4th ed.)"
      by: "Cormen, Leiserson, Rivest & Stein"
      year: 2022
      url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/"
      note: "The canonical reference to look things up in, alongside 6.006."
    - title: "Software Engineering at Google"
      by: "Winters, Manshreck & Wright (eds.)"
      year: 2020
      url: "https://abseil.io/resources/swe-book"
      note: "Testing, code review and dependency management at scale; free online."
    - title: "Site Reliability Engineering and The Site Reliability Workbook"
      by: "Google"
      url: "https://sre.google/books/"
      note: "SLOs, error budgets, on-call and incident response; free online."
    - title: "Designing Data-Intensive Applications (2nd ed.)"
      by: "Martin Kleppmann & Chris Riccomini"
      year: 2026
      url: "https://dataintensive.net/"
      note: "The core text on data systems: replication, partitioning, consistency."
    - title: "Accelerate"
      by: "Forsgren, Humble & Kim"
      year: 2018
      url: "https://itrevolution.com/product/accelerate/"
      note: "The research behind the DORA delivery metrics."
  articles:
    - title: "The Practical Test Pyramid"
      by: "Ham Vocke, martinfowler.com"
      year: 2018
      url: "https://martinfowler.com/articles/practical-test-pyramid.html"
      note: "How to balance unit, integration and end-to-end tests in real projects."
    - title: "DORA research"
      by: "DORA"
      url: "https://dora.dev/research/"
      note: "Delivery-performance research, including the 2024 report and 2025 State of AI-assisted Software Development."
    - title: "State of AI-assisted Software Development (DORA 2025)"
      by: "DORA"
      year: 2025
      url: "https://dora.dev/research/2025/dora-report/"
      note: "What AI coding tools actually do to delivery performance."
    - title: "The System Design Primer"
      by: "Donne Martin"
      url: "https://github.com/donnemartin/system-design-primer"
      note: "Free, structured system-design study guide with exercises."
    - title: "Stack Overflow Developer Survey 2026 results"
      by: "Stack Overflow"
      year: 2026
      url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
      note: "How developers actually use AI agents, languages and tools today."
    - title: "Octoverse 2025"
      by: "GitHub"
      year: 2025
      url: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/"
      note: "TypeScript's rise and agent-authored pull requests, in numbers."
    - title: "My AI Adoption Journey"
      by: "Mitchell Hashimoto"
      year: 2026
      url: "https://mitchellh.com/writing/my-ai-adoption-journey"
      note: "An experienced engineer's practical path to working with coding agents."
    - title: "Claude Code hooks documentation"
      by: "Anthropic"
      url: "https://code.claude.com/docs/en/hooks"
      note: "Deterministic guardrails (lint, tests, policies) around an AI coding agent."
    - title: "GitHub Actions documentation"
      by: "GitHub"
      url: "https://docs.github.com/en/actions"
      note: "CI/CD for your projects."
    - title: "Docker documentation"
      by: "Docker"
      url: "https://docs.docker.com/"
      note: "Images, multi-stage builds and Compose."
    - title: "Kubernetes documentation"
      by: "The Kubernetes Authors"
      url: "https://kubernetes.io/docs/home/"
      note: "Where containers go next; start with the concepts section."
---

## What "good code" means in practice

Good code is code the next person (often you, in six months) can change safely. Three ideas cover most of it:

1. **Deep modules.** A module should hide a lot of complexity behind a small interface. `Files.readString(path)` is deep; a class that forces you to call five setters in the right order is shallow.
2. **Information hiding.** Each design decision (file format, retry policy, database choice) should live in one place, so changing it touches one module.
3. **Obvious code.** Naming and structure should make behaviour predictable. If a reviewer has to ask "what does this do?", the code (not a comment) needs work.

> **Rule of thumb:** if a change forces edits in many unrelated files, the design has leaked a decision. That's the moment to refactor, with tests in place first.

## Complexity: the one formula to internalise

Big-O describes how cost grows with input size $n$. The jumps between classes are enormous:

| Complexity | $n = 10^3$ | $n = 10^6$ | Typical example |
| --- | --- | --- | --- |
| $O(1)$ | 1 | 1 | hash-map lookup |
| $O(\log n)$ | ~10 | ~20 | binary search, B-tree index |
| $O(n)$ | $10^3$ | $10^6$ | one scan of a list |
| $O(n \log n)$ | ~$10^4$ | ~$2\times10^7$ | sorting |
| $O(n^2)$ | $10^6$ | $10^{12}$ | nested loops over all pairs |

At about $10^8$ simple operations per second, the $O(n^2)$ row at $n = 10^6$ takes hours, while $O(n \log n)$ takes a fraction of a second. Most real-world performance bugs are an accidental $O(n^2)$, such as a list lookup inside a loop or an N+1 query pattern against a database.

## The testing pyramid (with evals on top)

```mermaid
flowchart TB
  E2E["End-to-end · few, slow, realistic"]
  INT["Integration & contract · real DB, real HTTP"]
  UNIT["Unit · many, fast, isolated"]
  EV["Evals · for AI features: datasets + graders"]
  EV --- E2E
  E2E --- INT
  INT --- UNIT
```

Write many fast unit tests, a solid layer of integration tests against real dependencies (Testcontainers makes this easy), and a few end-to-end tests of critical journeys. If your product includes an LLM, add **evals**: datasets of inputs with graders, run in CI like tests (see [AI Engineering](/roadmaps/ai-engineering/)).

Tests matter even more with AI coding agents. **A failing test is the clearest spec you can give an agent**, and a passing suite is how you know its output is done.

## System design: a repeatable method

Use the same five steps for every design question, whether in an interview or at work:

1. **Requirements:** functional ("shorten a URL") and non-functional (latency, availability, scale).
2. **Estimates:** back-of-the-envelope numbers. For example, 100M new URLs/month is about 40 writes/s; at a 10:1 read ratio that's 400 reads/s, and 500 bytes × 100M × 12 months is ~600 GB/year.
3. **API and data model:** endpoints, schemas, keys.
4. **High-level design:** the boxes and arrows.
5. **Deep dives and trade-offs:** the bottleneck, failure modes, consistency choices.

```mermaid
flowchart LR
  C["client"] --> LB["load balancer"]
  LB --> API1["API instance"]
  LB --> API2["API instance"]
  API1 --> CACHE[("cache")]
  API2 --> CACHE
  API1 --> DB[("primary DB")]
  API2 --> DB
  DB --> R[("read replica")]
  API1 -. "async events" .-> Q["queue"] --> W["worker: analytics"]
```

Availability multiplies down a chain of dependencies. Three services in series, each at 99.9%, give about $0.999^3 \approx 99.7\%$, or roughly 26 hours of downtime a year. That's why timeouts, retries, caches and graceful degradation matter.

## Delivery: CI/CD and the DORA metrics

A healthy pipeline builds, tests and deploys every change automatically, and makes rollback boring. DORA's research tracks four metrics that predict team performance: **deployment frequency**, **lead time for changes**, **change failure rate** and **time to restore service**. Small batches, trunk-based development, fast tests and automated deployment improve all four together. Speed and stability are not a trade-off.

## Working with AI coding agents

Treat an agent like a fast, tireless junior colleague who has read everything and remembers nothing about your project:

- **Give it context:** a short conventions file in the repo, the commands to build and test, and links to the relevant modules.
- **Specify with tests:** write the acceptance test first, then ask for the implementation.
- **Keep diffs small:** one concern per task, reviewed like any human PR.
- **Automate the guardrails:** linters, type checks, pre-commit hooks and CI catch mistakes before you have to.
- **Stay the owner:** you're accountable for every line you merge. Read it, run it, understand it.

This is the everyday side of [Harness Engineering](/roadmaps/harness-engineering/), and it's quickly becoming a core professional skill.
