---
title: "Software Architecture"
short: "Architecture"
order: 3
icon: blocks
tier: core
summary: "Reason about structure and trade-offs: architecture styles and patterns, distributed systems (replication, consensus, consistency), integration and event-driven design, documenting decisions, and architecting LLM-based systems."
updated: 2026-11-07
overview: "Software architecture is the set of decisions that are expensive to change later: how a system is split into parts, how those parts talk, where data lives, and which qualities (latency, availability, cost, security, evolvability) win when they conflict. It isn't about drawing boxes. It's about **trade-off reasoning**: knowing that every choice buys one quality by spending another, and making that bargain on purpose and in writing. The track moves from modular design inside one service, through the patterns and failure modes of distributed systems, to integration and event-driven architecture, and finally to how LLM-based systems change the picture."
why2027: "AI hasn't removed the need for architecture; it has raised the stakes. Coding agents generate code quickly, and the scarce skill is deciding *what* to build and *how the pieces fit*. AI products are themselves distributed systems: model providers, vector stores, tool servers (MCP), queues and evaluation pipelines, each with its own latency, cost and failure modes. Teams increasingly need engineers who can reason about those trade-offs and write them down clearly, which is also how you progress from junior to senior."
demand:
  - claim: 'The "Agentic AI" skill cluster grew ≈280% in US postings in one year; agents are distributed systems of models, tools and state.'
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
  - claim: "66% of AI users now use coding agents, which shifts human effort toward design, review and verification."
    source: "Stack Overflow Developer Survey 2026"
    url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
prerequisites:
  - "[Software Engineering](/roadmaps/software-engineering/) Intermediate stage: you've built and deployed a backend with a database and tests."
  - "Basic SQL and HTTP APIs; you know what a transaction and a status code are."
  - "Some exposure to Docker and a cloud platform ([Cloud & IAM](/roadmaps/cloud-engineering/) Beginner)."
diagram: |
  flowchart TB
    P["Prereqs: a deployed backend · SQL · HTTP"] --> B
    subgraph B["1 · Beginner — design inside one service"]
      direction LR
      B1["modularity · coupling"] --> B2["layered / hexagonal"] --> B3["design patterns"]
    end
    subgraph I["2 · Intermediate — systems & trade-offs"]
      direction LR
      I1["quality attributes"] --> I2["caching · queues · LBs"] --> I3["ADRs · C4"]
    end
    subgraph A["3 · Advanced — distributed systems"]
      direction LR
      A1["replication · partitioning"] --> A2["consistency · CAP/PACELC"] --> A3["Raft consensus"] --> A4["event-driven · sagas"]
    end
    subgraph E["4 · Expert — architecture at scale"]
      direction LR
      E1["evolutionary architecture"] --> E2["platform & integration"] --> E3["LLM system design"] --> E4["lead reviews"]
    end
    B --> I --> A --> E
    A -.-> CLOUD["Cloud & IAM"]
    A -.-> DATA["Data Engineering"]
    E -.-> AIE["AI Engineering"]
stages:
  - level: Beginner
    hours: 100
    focus: "Learn to structure code inside one service so it stays easy to change: modules, boundaries, dependencies and the classic design patterns."
    concepts:
      - "Complexity, coupling and cohesion; *deep modules* with simple interfaces (Ousterhout)."
      - "Layered vs hexagonal (ports and adapters) vs clean architecture; dependency inversion."
      - "SOLID principles as heuristics, not laws."
      - "Classic design patterns you'll meet daily: Strategy, Factory, Adapter, Decorator, Observer, Repository."
      - "API design: resource naming, idempotency, pagination, versioning, error models."
      - "Domain modelling basics: entities, value objects, bounded contexts (DDD vocabulary)."
    projects:
      - title: "Refactor to ports and adapters"
        detail: "Take one of your existing services and isolate the domain from the web framework and database behind interfaces. Swap the database for an in-memory fake in tests."
      - title: "Design review of your own API"
        detail: "Write a one-page review of an API you built: naming, idempotency of POSTs, pagination, error format. Fix the top three issues."
    signals:
      - "You can explain why a module is hard to change, and fix it, without a framework doing it for you."
      - "Your domain logic can be unit-tested without a database or HTTP server."
      - "You recognise common patterns in library code you read."
  - level: Intermediate
    hours: 180
    focus: "Think in systems: quality attributes, the standard building blocks (caches, queues, load balancers, databases), and writing decisions down."
    concepts:
      - "Quality attributes (the -ilities): performance, scalability, availability, security, cost, evolvability; how they conflict."
      - "Building blocks: load balancers, caches (and invalidation), message queues, object storage, CDNs, read replicas."
      - "Back-of-the-envelope estimation: QPS, storage growth, bandwidth, Little's law."
      - "Synchronous vs asynchronous communication; retries, timeouts, idempotency keys, backpressure."
      - "Stability patterns: circuit breaker, bulkhead, timeouts, rate limiting (Release It!)."
      - "Monolith vs modular monolith vs microservices, and why most teams should start modular."
      - "Documenting: Architecture Decision Records (ADRs) and the C4 model (context, container, component, code)."
      - "Cloud reference frameworks: AWS and Google Cloud Well-Architected pillars."
    projects:
      - title: "System design write-ups"
        detail: "Do five classic problems from the System Design Primer (URL shortener, rate limiter, news feed, chat, file storage). For each: estimates, C4 container diagram, and the two hardest trade-offs."
      - title: "ADR log for a real project"
        detail: "Add `docs/adr/` to one of your repos and record at least five real decisions (database, auth, hosting, sync vs async, monorepo) with context and consequences."
      - title: "Resilience under failure"
        detail: "Put a queue and a circuit breaker between two services. Kill the downstream service and measure what users see with and without the patterns."
    signals:
      - "Given a feature, you can name the quality attributes that matter most and the trade-offs you're making."
      - "You estimate load and storage before choosing technology."
      - "Your decisions are written as ADRs that a new teammate can follow."
  - level: Advanced
    hours: 240
    focus: "Understand distributed systems properly: replication, partitioning, consistency models, consensus, and the event-driven and integration patterns built on them."
    concepts:
      - "Replication: leader-follower, multi-leader, leaderless; replication lag and read-your-writes."
      - "Partitioning / sharding: key-range vs hash, hot spots, rebalancing."
      - "Consistency models: linearizability, causal, eventual; CAP and the more useful PACELC framing."
      - "Time and order: physical vs logical clocks, Lamport timestamps, vector clocks."
      - "Consensus: why it's hard, how Raft does leader election and log replication."
      - "Transactions across services: two-phase commit vs sagas, the outbox pattern, exactly-once *effects* via idempotency."
      - "Event-driven architecture: events vs commands, event sourcing, CQRS, schema evolution."
      - "Enterprise integration: API-led connectivity, message transformation and routing, the gateway/mediator role (WSO2 Micro Integrator, Ballerina)."
    projects:
      - title: "MIT 6.5840 Raft lab"
        detail: "Implement Raft leader election and log replication (the 6.5840 labs) and make it pass the tests under network partitions."
      - title: "Order saga with an outbox"
        detail: "Order, payment and inventory services coordinated by a saga over Kafka or RabbitMQ, using the transactional outbox. Inject failures and show compensation works."
      - title: "Read the classics, write the summaries"
        detail: "Read Dynamo, GFS, MapReduce, Spanner and Raft. Blog a one-page summary of each: the problem, the key idea, the trade-off accepted."
    signals:
      - "You can explain what consistency a system offers and what anomaly users might see."
      - "Your services survive partial failure without duplicate side effects."
      - "You can read a distributed-systems paper and explain its key trade-off."
  - level: Expert
    hours: 320
    focus: "Shape architecture over time across teams: evolutionary architecture, platforms and integration at scale, and LLM-based systems; lead design reviews."
    concepts:
      - "Evolutionary architecture: fitness functions, strangler-fig migrations, reversible decisions."
      - "Socio-technical design: Conway's law, team topologies, ownership boundaries."
      - "Trade-off analysis for distributed data: data ownership, granularity of services, contracts (Software Architecture: The Hard Parts)."
      - "Platform thinking: internal developer platforms, golden paths, API management as a product."
      - "**LLM system architecture**: model gateway, prompt/version management, retrieval layer, tool servers (MCP), agent orchestration, eval and observability pipelines, caching and fallbacks."
      - "Non-determinism as a design constraint: evals in CI, guardrails, human-in-the-loop, cost and latency budgets per request."
      - "Security architecture: trust boundaries, threat modelling (STRIDE), least privilege across services and agents."
    projects:
      - title: "Architecture of an AI assistant"
        detail: "Design and build an assistant with a model gateway (fallback across two providers), RAG, two MCP tool servers and an eval pipeline. Document it with C4 diagrams, ADRs and a threat model."
      - title: "Strangler-fig migration"
        detail: "Take a monolith (your own or open source), carve out one bounded context behind a gateway route, and migrate traffic gradually with metrics proving no regression."
      - title: "Run a design review"
        detail: "Write an RFC for a non-trivial change at work or in open source, collect feedback, and record the outcome as an ADR."
    signals:
      - "Others ask you to review their designs, and your reviews change outcomes."
      - "You can plan a migration that keeps the system running and every step reversible."
      - "You can explain the latency, cost and failure budget of an LLM feature before it ships."
connections:
  - track: software-engineering
    text: "Architecture is only as good as the code and tests that implement it; deep modules start at the function level."
  - track: cloud-engineering
    text: "Well-Architected reviews, networking and IAM are where architecture decisions meet real infrastructure and cost."
  - track: data-engineering
    text: "Replication, partitioning and event logs are the shared foundation of databases, streams and lakehouses."
  - track: ai-engineering
    text: "RAG pipelines, model gateways and agents are distributed systems with non-deterministic components."
  - track: harness-engineering
    text: "Agent harnesses apply architecture ideas: isolation, retries, state management and clear tool contracts."
references:
  papers:
    - title: "Time, Clocks, and the Ordering of Events in a Distributed System"
      by: "Leslie Lamport"
      year: 1978
      url: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf"
      note: "Logical clocks and causality, the foundation of distributed-systems thinking."
    - title: "The Google File System"
      by: "Ghemawat, Gobioff & Leung"
      year: 2003
      url: "https://research.google/pubs/the-google-file-system/"
      note: "Designing storage around failure as the normal case."
    - title: "MapReduce: Simplified Data Processing on Large Clusters"
      by: "Dean & Ghemawat"
      year: 2004
      url: "https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/"
      note: "A simple programming model that hides distribution."
    - title: "Bigtable: A Distributed Storage System for Structured Data"
      by: "Chang et al."
      year: 2006
      url: "https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/"
      note: "The wide-column store design behind HBase and Cassandra-style systems."
    - title: "Dynamo: Amazon's Highly Available Key-value Store"
      by: "DeCandia et al."
      year: 2007
      url: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf"
      note: "Leaderless replication, quorums and choosing availability on purpose."
    - title: "Spanner: Google's Globally-Distributed Database"
      by: "Corbett et al."
      year: 2012
      url: "https://research.google/pubs/spanner-googles-globally-distributed-database-2/"
      note: "Global consistency using TrueTime; the other side of the CAP trade-off."
    - title: 'CAP Twelve Years Later: How the "Rules" Have Changed'
      by: "Eric Brewer"
      year: 2012
      url: "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/"
      note: "The CAP theorem's author on what it really means in practice."
    - title: "In Search of an Understandable Consensus Algorithm (Raft)"
      by: "Ongaro & Ousterhout"
      year: 2014
      url: "https://raft.github.io/raft.pdf"
      note: "Consensus designed for understandability; the one to implement."
  courses:
    - title: "MIT 6.5840: Distributed Systems"
      by: "MIT PDOS"
      url: "https://pdos.csail.mit.edu/6.824/"
      note: "Paper-driven lectures with the famous Raft labs."
    - title: "The System Design Primer"
      by: "Donne Martin"
      url: "https://github.com/donnemartin/system-design-primer"
      note: "Free study guide with worked system-design problems."
  books:
    - title: "Designing Data-Intensive Applications (2nd ed.)"
      by: "Martin Kleppmann & Chris Riccomini"
      year: 2026
      url: "https://dataintensive.net/"
      note: "The single best book on replication, partitioning, consistency and streams."
    - title: "Fundamentals of Software Architecture (2nd ed.)"
      by: "Mark Richards & Neal Ford"
      year: 2025
      url: "https://www.oreilly.com/library/view/fundamentals-of-software/9781098175504/"
      note: "Architecture styles, characteristics and the architect's role."
    - title: "Software Architecture: The Hard Parts"
      by: "Ford, Richards, Sadalage & Dehghani"
      year: 2021
      url: "https://www.oreilly.com/library/view/software-architecture-the/9781492086888/"
      note: "Trade-off analysis for distributed architectures and data."
    - title: "Building Microservices (2nd ed.)"
      by: "Sam Newman"
      year: 2021
      url: "https://samnewman.io/books/building_microservices_2nd_edition/"
      note: "When microservices help, when they hurt, and how to split well."
    - title: "Release It! (2nd ed.)"
      by: "Michael Nygard"
      year: 2018
      url: "https://pragprog.com/titles/mnee2/release-it-second-edition/"
      note: "Stability patterns from production war stories."
    - title: "A Philosophy of Software Design (2nd ed.)"
      by: "John Ousterhout"
      year: 2021
      url: "https://web.stanford.edu/~ouster/cgi-bin/book.php"
      note: "Deep modules and managing complexity: architecture in the small."
  articles:
    - title: "Microservices"
      by: "James Lewis & Martin Fowler"
      year: 2014
      url: "https://martinfowler.com/articles/microservices.html"
      note: "The article that defined the style; read its caveats too."
    - title: "Documenting Architecture Decisions"
      by: "Michael Nygard"
      year: 2011
      url: "https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions"
      note: "The origin of ADRs, in one short post."
    - title: "The C4 model"
      by: "Simon Brown"
      url: "https://c4model.com/"
      note: "A simple, consistent way to draw architecture at four zoom levels."
    - title: "Cloud Design Patterns"
      by: "Azure Architecture Center"
      url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/"
      note: "Catalogue of patterns (Saga, CQRS, Strangler Fig, Circuit Breaker) with trade-offs."
    - title: "AWS Well-Architected Framework"
      by: "AWS"
      url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
      note: "Six-pillar lens for reviewing any cloud architecture."
    - title: "Google Cloud Well-Architected Framework"
      by: "Google Cloud"
      url: "https://cloud.google.com/architecture/framework"
      note: "Google's equivalent, with AI/ML-specific guidance."
    - title: "Jepsen analyses"
      by: "Kyle Kingsbury"
      url: "https://jepsen.io/"
      note: "Real databases tested under partitions, showing which consistency claims hold."
    - title: "Building effective agents"
      by: "Anthropic"
      year: 2024
      url: "https://www.anthropic.com/research/building-effective-agents"
      note: "Workflow vs agent architectures for LLM systems; start simple."
    - title: "Patterns for Building LLM-based Systems & Products"
      by: "Eugene Yan"
      year: 2023
      url: "https://eugeneyan.com/writing/llm-patterns/"
      note: "Evals, RAG, caching, guardrails and feedback as architectural patterns."
    - title: "WSO2 API Manager documentation"
      by: "WSO2"
      url: "https://apim.docs.wso2.com/en/latest/"
      note: "API-led integration and gateway patterns in an enterprise product."
---

## Architecture is trade-offs, written down

Every architecture decision trades one quality for another. A cache buys latency and costs consistency. Microservices buy independent deployment and cost operational complexity. Async messaging buys resilience and costs debuggability. The work is to **name the trade** and **record it**.

An ADR is a short Markdown file in the repo:

```markdown
# ADR 007: Use a transactional outbox for order events

## Status
Accepted — 2026-11-07

## Context
Order service writes to Postgres and must publish OrderPlaced to Kafka.
Dual writes can lose or duplicate events when one side fails.

## Decision
Write events to an `outbox` table in the same transaction; a relay publishes them.

## Consequences
+ No lost events; consumers must be idempotent (at-least-once delivery).
− One more table and a relay process to operate; small publish delay.
```

## Draw at the right zoom level

The C4 model gives four zoom levels: **Context** (the system and its users), **Container** (deployable units and data stores), **Component** (modules inside a container) and **Code**. Most conversations need only the first two. Here is a container view of a typical AI-enabled service:

```mermaid
flowchart TB
  user["Customer (web / mobile)"] --> gw["API gateway<br/>auth · rate limits"]
  subgraph sys["Support assistant system"]
    direction LR
    api["Assistant API<br/>(Java / Ballerina)"] --> orch["Agent orchestrator"]
    orch --> rag["Retrieval service"]
    rag --> vec[("vector index")]
    orch --> tools["MCP tool servers<br/>orders · tickets"]
    api --> db[("Postgres<br/>conversations")]
  end
  gw --> api
  orch --> llm["LLM provider(s)<br/>via model gateway"]
  tools --> erp["Existing ERP / CRM<br/>(integration layer)"]
  orch --> evals["traces · evals · cost"]
```

## Numbers you should be able to estimate

Rough estimation beats guessing. Two tools cover most cases.

**Little's law**, where $L$ is concurrent requests in the system, $\lambda$ the arrival rate and $W$ the time each spends inside:

$$
L = \lambda W
$$

At 200 requests/s and 1.5 s per LLM-backed request, you have about 300 requests in flight. That sizes your connection pools, worker counts and provider rate limits.

**Quorums** in leaderless replication (Dynamo-style), with $N$ replicas, $W$ write acknowledgements and $R$ replicas read:

$$
R + W > N \quad\Rightarrow\quad \text{every read overlaps the latest write}
$$

With $N = 3$, choosing $W = 2, R = 2$ tolerates one slow or failed node on both paths. $W = 1, R = 1$ is faster but can return stale data.

## CAP, and why PACELC is more useful

CAP says: during a network **P**artition you must choose **C**onsistency or **A**vailability. True, but partitions are rare. PACELC adds what matters day to day: **E**lse (no partition), you trade **L**atency against **C**onsistency.

| System style | During a partition | Normal operation | Example |
| --- | --- | --- | --- |
| PA/EL | stay available | favour low latency | Dynamo-style stores |
| PC/EC | stay consistent | pay latency for consistency | Spanner-style databases |
| PC/EL | consistent when it matters | fast reads from replicas | many leader-follower SQL setups |

Ask of any datastore: *what will my users see during a partition, and what does a normal read cost?*

## Consensus in one picture

Raft keeps a replicated log consistent across servers. A leader takes writes, replicates entries, and commits once a majority acknowledges. If the leader fails, followers time out and elect a new one, which must have every committed entry.

```mermaid
sequenceDiagram
  participant C as Client
  participant L as Leader
  participant F1 as Follower 1
  participant F2 as Follower 2
  C->>L: write x=5
  L->>F1: AppendEntries(term 3, x=5)
  L->>F2: AppendEntries(term 3, x=5)
  F1-->>L: ack
  Note over L: majority (2 of 3) → commit
  L-->>C: ok
  F2-->>L: ack (late)
```

With $2f+1$ servers, Raft tolerates $f$ failures. That's why clusters come in sizes 3 and 5.

## Integration and event-driven design

Most enterprise work is integration: connecting systems that were never designed to talk. That's the world of WSO2 Micro Integrator, Ballerina and API managers. The core patterns:

- **API-led layers:** system APIs wrap backends, process APIs combine them, experience APIs serve each client.
- **Messaging patterns:** content-based router, message translator, aggregator, dead-letter channel.
- **Events vs commands:** an event says *this happened* (many consumers); a command says *do this* (one owner).
- **Sagas:** a long business transaction as local steps plus compensations, coordinated by orchestration or choreography.
- **Outbox + idempotent consumers:** the practical way to get exactly-once *effects* on top of at-least-once delivery.

## What changes with LLM systems

LLM components are slow, costly, non-deterministic and sometimes wrong. Architecture absorbs that:

1. **Model gateway:** one place for provider keys, routing, fallbacks, caching, rate limits and cost tracking.
2. **Evals as fitness functions:** run evaluation suites in CI, just as you run tests, and block regressions.
3. **Budgets per request:** latency, tokens and tool calls are part of the contract.
4. **Trust boundaries:** retrieved documents and tool outputs are untrusted input. See [AI Security & Safety](/roadmaps/ai-security-safety/).
5. **Workflows before agents:** prefer a fixed pipeline when the steps are known; reach for autonomous agents only where flexibility pays for the added risk.
