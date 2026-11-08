---
title: "Data Engineering"
short: "Data Eng."
order: 5
icon: database
tier: core
summary: "Move, model and trust data at scale: SQL and data modelling, batch and streaming pipelines, lakehouse tables, orchestration and data quality, and the pipelines that feed AI: training-data curation, deduplication and embeddings."
updated: 2026-11-07
overview: "Data engineering builds the systems that turn raw, messy data into reliable, well-modelled datasets that people and models can use. That means ingesting from databases, APIs and event streams; transforming with SQL and Spark; storing in warehouses and open lakehouse tables (Iceberg, Delta); orchestrating it all on a schedule or in real time; and proving it's correct with tests, contracts and monitoring. In the AI era the same craft feeds models: pre-training corpora are filtered and deduplicated at web scale, fine-tuning sets are curated and versioned, and RAG systems depend on chunking-and-embedding pipelines that must stay fresh."
why2027: "Every AI system is only as good as its data, and companies have learned that the hard part of AI projects is usually the data plumbing. The WEF Future of Jobs 2025 report lists AI and big data as the fastest-growing skills, Indeed finds 45% of data and analytics postings now mention AI, and SQL rose to the #2 language in the 2026 Stack Overflow survey. Data engineering is also one of the most direct routes into ML and deep learning work, because data quality decides model quality."
demand:
  - claim: "AI and big data top the fastest-growing skills; big-data specialists are among the fastest-growing roles."
    source: "WEF Future of Jobs 2025 (EU summary)"
    url: "https://digital-skills-jobs.europa.eu/en/latest/news/great-skills-reset-wefs-future-jobs-report-2025-catch-22-future-work"
  - claim: "45% of data and analytics postings mention AI, against a 4.2% average across all postings."
    source: "Indeed Hiring Lab, Jan 2026"
    url: "https://hiringlab.indeed.com/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/"
  - claim: "SQL is now the #2 most-used language (58%) among developers."
    source: "Stack Overflow Developer Survey 2026"
    url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
prerequisites:
  - "Python for scripting and data wrangling (pandas or polars)."
  - "Basic SQL: SELECT, WHERE, GROUP BY, JOIN."
  - "Command line, Git and Docker basics ([Software Engineering](/roadmaps/software-engineering/) Beginner)."
diagram: |
  flowchart TB
    P["Prereqs: Python · basic SQL · Docker"] --> B
    subgraph B["1 · Beginner — SQL & batch basics"]
      direction LR
      B1["advanced SQL"] --> B2["data modelling"] --> B3["ETL / ELT script"]
    end
    subgraph I["2 · Intermediate — pipelines"]
      direction LR
      I1["warehouse + dbt"] --> I2["orchestration"] --> I3["data quality tests"]
    end
    subgraph A["3 · Advanced — scale & streaming"]
      direction LR
      A1["Spark"] --> A2["lakehouse tables"] --> A3["Kafka streaming"] --> A4["CDC"]
    end
    subgraph E["4 · Expert — platforms & data for AI"]
      direction LR
      E1["data contracts"] --> E2["LLM corpus pipeline"] --> E3["embeddings pipeline"] --> E4["cost & governance"]
    end
    B --> I --> A --> E
    E -.-> DL["Deep Learning: pre-training data"]
    E -.-> ML["ML Engineering: features"]
    A -.-> ARCH["Software Architecture"]
stages:
  - level: Beginner
    hours: 100
    focus: "Become fluent in SQL and data modelling, and write your first reliable batch pipeline."
    concepts:
      - "Advanced SQL: window functions, CTEs, `GROUP BY` with `ROLLUP`, anti-joins, deduplication with `ROW_NUMBER()`."
      - "Relational modelling: normalisation, keys, indexes and why `EXPLAIN` matters."
      - "Analytical modelling: facts and dimensions, star schemas, slowly changing dimensions (Kimball)."
      - "OLTP vs OLAP; row vs columnar storage; why Parquet is the default file format."
      - "ETL vs ELT; idempotent loads; incremental loads by watermark."
      - "File formats and encodings: CSV pitfalls, JSON, Parquet, compression."
      - "DuckDB for fast local analytics."
    projects:
      - title: "SQL kata log"
        detail: "Solve 40 SQL problems focused on window functions and joins. Keep your solutions in a repo with a note on each pattern used."
      - title: "Idempotent batch pipeline"
        detail: "Python job that pulls a public API daily, lands raw JSON, converts to Parquet and loads a DuckDB or Postgres star schema. Re-running a day must not duplicate rows."
    signals:
      - "You reach for window functions naturally and can explain a query plan."
      - "You can design a star schema for a business question."
      - "Your pipeline can be re-run safely for any past date."
  - level: Intermediate
    hours: 180
    focus: "Build production-style pipelines: a cloud warehouse, dbt transformations, orchestration, and data-quality checks."
    concepts:
      - "Cloud warehouses (BigQuery, Snowflake, Redshift): separation of storage and compute, partitioning, clustering, cost per query."
      - "dbt: models, refs, incremental models, tests, documentation, lineage."
      - "Orchestration with Airflow or Dagster: DAGs, retries, backfills, sensors, assets."
      - "Data quality: schema, freshness, volume and distribution checks; failing loudly."
      - "Ingestion patterns: full vs incremental, change data capture (CDC) basics, API pagination and rate limits."
      - "Security basics: PII handling, column masking, least-privilege service accounts for pipelines."
    projects:
      - title: "Data Engineering Zoomcamp"
        detail: "Complete the DataTalksClub Zoomcamp end to end and publish your capstone with a README, architecture diagram and dashboard."
      - title: "dbt project with tests"
        detail: "Model a public dataset in dbt with staging → intermediate → marts layers, generic and custom tests, and docs. Run it from Airflow or Dagster with backfills."
    signals:
      - "Your pipelines have tests, retries and alerts, and you know when data is late or wrong."
      - "You can backfill a month of data without manual cleanup."
      - "You can explain a warehouse bill and how to reduce it."
  - level: Advanced
    hours: 240
    focus: "Handle scale and real time: distributed processing with Spark, open lakehouse tables, streaming with Kafka, and CDC."
    concepts:
      - "Spark internals: RDDs vs DataFrames, lazy evaluation, shuffles, partitioning, skew and broadcast joins."
      - "Lakehouse table formats (Iceberg, Delta, Hudi): ACID on object storage, snapshots, time travel, schema evolution, compaction."
      - "Streaming fundamentals: the log as the source of truth, partitions and consumer groups, offsets, delivery semantics."
      - "Event time vs processing time, windows, watermarks and late data."
      - "CDC from databases (e.g. Debezium-style) into Kafka and the lakehouse."
      - "Exactly-once *effects*: idempotent sinks, transactional writes, deduplication keys."
    projects:
      - title: "Lakehouse on object storage"
        detail: "Spark jobs writing Iceberg or Delta tables to S3/GCS/MinIO. Demonstrate schema evolution, time travel and compaction, and query the tables from DuckDB or Trino."
      - title: "Real-time pipeline with CDC"
        detail: "Capture changes from Postgres into Kafka, aggregate them in a streaming job with event-time windows, and land results in the lakehouse. Show correct handling of late events."
    signals:
      - "You can diagnose a slow Spark job from its stages and fix skew."
      - "You can explain the delivery guarantees of your streaming pipeline end to end."
      - "You can choose between batch, micro-batch and streaming for a requirement and defend it."
  - level: Expert
    hours: 300
    focus: "Design data platforms and the pipelines that feed AI: data contracts and governance, LLM training-corpus curation, deduplication at scale, and embeddings pipelines for RAG."
    concepts:
      - "Data contracts and ownership: schemas as APIs between producers and consumers."
      - "Governance: lineage, catalogs, retention, access policies, privacy (PII detection, deletion requests)."
      - "**Data for pre-training**: text extraction, language ID, quality classifiers, heuristic filters, PII scrubbing, toxicity filtering, data mixtures (FineWeb as reference)."
      - "Near-duplicate detection at scale: shingling, MinHash and locality-sensitive hashing (LSH)."
      - "Fine-tuning data: versioned instruction and preference datasets, decontamination against eval sets."
      - "**Embeddings pipelines**: chunking strategies, contextual chunking, embedding models, vector indexes (HNSW), incremental re-indexing and freshness."
      - "Cost engineering: storage tiers, file sizing, compute autoscaling, cost per pipeline run."
    projects:
      - title: "Mini FineWeb"
        detail: "Build a pipeline that takes a few GB of Common Crawl-style text, extracts and filters it, runs MinHash LSH deduplication, and reports what each stage removed. Train a tiny model on before/after data to see the effect (see [Deep Learning](/roadmaps/deep-learning/))."
      - title: "Fresh RAG index"
        detail: "Ingest a changing document source (e.g. a docs site or Confluence export), chunk and embed it incrementally, and keep a vector index in sync with deletions and updates. Measure retrieval quality as the corpus changes."
      - title: "Data contract in CI"
        detail: "Define a contract for an event stream, validate producers in CI, and make a breaking schema change fail the build before it reaches consumers."
    signals:
      - "You can design a platform where teams own their data with clear contracts."
      - "You can explain, with numbers, how your filtering and dedup changed a training corpus."
      - "Your RAG index stays correct when source documents change or are deleted."
connections:
  - track: ml-engineering
    text: "Feature pipelines, training sets and model monitoring are data pipelines with stricter correctness needs."
  - track: deep-learning
    text: "Pre-training quality is mostly data quality: filtering, dedup and mixtures decide what a model learns."
  - track: ai-engineering
    text: "RAG is a data pipeline: chunking, embedding, indexing and keeping it fresh."
  - track: software-architecture
    text: "Logs, replication, partitioning and exactly-once effects are shared distributed-systems ideas."
  - track: cloud-engineering
    text: "Pipelines run on cloud storage and compute with service accounts that should see only their own data."
references:
  papers:
    - title: "Kafka: a Distributed Messaging System for Log Processing"
      by: "Kreps, Narkhede & Rao"
      year: 2011
      url: "https://people.csail.mit.edu/matei/courses/2015/6.S897/readings/kafka.pdf"
      note: "The original Kafka design: a partitioned, replicated log."
    - title: "Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing"
      by: "Zaharia et al."
      year: 2012
      url: "https://www.usenix.org/conference/nsdi12/technical-sessions/presentation/zaharia"
      note: "The idea behind Spark: lineage-based fault tolerance."
    - title: "Delta Lake: High-Performance ACID Table Storage over Cloud Object Stores"
      by: "Armbrust et al."
      year: 2020
      url: "https://www.vldb.org/pvldb/vol13/p3411-armbrust.pdf"
      note: "How ACID transactions work on top of object storage."
    - title: "Lakehouse: A New Generation of Open Platforms that Unify Data Warehousing and Advanced Analytics"
      by: "Armbrust et al."
      year: 2021
      url: "https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf"
      note: "The argument for one open platform instead of lake + warehouse."
    - title: "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale"
      by: "Penedo et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.17557"
      note: "A full, ablated recipe for building an LLM pre-training corpus."
    - title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs"
      by: "Malkov & Yashunin"
      year: 2016
      url: "https://arxiv.org/abs/1603.09320"
      note: "HNSW, the index inside most vector databases."
    - title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
      by: "Reimers & Gurevych"
      year: 2019
      url: "https://arxiv.org/abs/1908.10084"
      note: "Where practical sentence embeddings for retrieval started."
  courses:
    - title: "Data Engineering Zoomcamp"
      by: "DataTalksClub"
      url: "https://github.com/DataTalksClub/data-engineering-zoomcamp"
      note: "Free, hands-on: Docker, Terraform, warehouses, dbt, Spark, Kafka."
  books:
    - title: "Fundamentals of Data Engineering"
      by: "Joe Reis & Matt Housley"
      year: 2022
      url: "https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/"
      note: "The data-engineering lifecycle, tool-agnostic."
    - title: "Designing Data-Intensive Applications (2nd ed.)"
      by: "Martin Kleppmann & Chris Riccomini"
      year: 2026
      url: "https://dataintensive.net/"
      note: "Storage engines, replication, batch and stream processing explained deeply."
    - title: "The Data Warehouse Toolkit (3rd ed.)"
      by: "Ralph Kimball & Margy Ross"
      year: 2013
      url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/"
      note: "The classic on dimensional modelling."
  articles:
    - title: "The Log: What every software engineer should know about real-time data's unifying abstraction"
      by: "Jay Kreps"
      year: 2013
      url: "http://web.archive.org/web/20260612105408/https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying"
      note: "Why the log is the heart of data systems (archived copy)."
    - title: "Apache Spark documentation"
      by: "Apache"
      url: "https://spark.apache.org/docs/latest/"
      note: "DataFrames, SQL, Structured Streaming and tuning."
    - title: "Apache Kafka documentation"
      by: "Apache"
      url: "https://kafka.apache.org/documentation/"
      note: "Topics, partitions, consumer groups and delivery semantics."
    - title: "Apache Iceberg documentation"
      by: "Apache"
      url: "https://iceberg.apache.org/docs/latest/"
      note: "Open table format: snapshots, schema evolution, hidden partitioning."
    - title: "Apache Hudi documentation"
      by: "Apache"
      url: "https://hudi.apache.org/docs/overview/"
      note: "A table format optimised for upserts and incremental processing."
    - title: "dbt documentation"
      by: "dbt Labs"
      url: "https://docs.getdbt.com/"
      note: "SQL transformations with tests, docs and lineage."
    - title: "Apache Airflow documentation"
      by: "Apache"
      url: "https://airflow.apache.org/docs/"
      note: "The most widely used orchestrator."
    - title: "Dagster documentation"
      by: "Dagster Labs"
      url: "https://docs.dagster.io/"
      note: "Asset-centric orchestration with built-in lineage."
    - title: "DuckDB documentation"
      by: "DuckDB"
      url: "https://duckdb.org/docs/"
      note: "In-process analytics; the fastest way to learn columnar SQL."
    - title: "Contextual Retrieval"
      by: "Anthropic"
      year: 2024
      url: "https://www.anthropic.com/research/contextual-retrieval"
      note: "Adding context to chunks before embedding; a data-pipeline fix for RAG quality."
---

## The modern data stack at a glance

Data flows from sources, through ingestion and storage, into transformations that produce trusted datasets for analytics *and* for AI.

```mermaid
flowchart TB
  subgraph SRC["Sources"]
    direction LR
    S1["app databases"] --- S2["APIs / SaaS"] --- S3["event streams"] --- S4["files / web crawl"]
  end
  subgraph ING["Ingest"]
    direction LR
    I1["batch extract"] --- I2["CDC"] --- I3["Kafka"]
  end
  subgraph STORE["Store — lakehouse"]
    direction LR
    R["raw / bronze"] --> C["cleaned / silver"] --> G["modelled / gold"]
  end
  subgraph USE["Use"]
    direction LR
    U1["BI dashboards"] --- U2["ML features"] --- U3["LLM training sets"] --- U4["RAG embeddings"]
  end
  SRC --> ING --> STORE --> USE
  ORCH["orchestration · quality checks · lineage"] -.-> ING
  ORCH -.-> STORE
```

The **medallion** layers (bronze → silver → gold) are just a discipline: keep raw data immutable so you can always rebuild, clean in a separate step, and model for consumers last.

## Idempotency is the whole game

A pipeline will be retried, backfilled and re-run by someone at 2 a.m. Design so that running it twice gives the same result as running it once:

- **Overwrite partitions** (e.g. `date=2026-11-07`) instead of appending blindly.
- **Merge on a key** (`MERGE INTO … ON id`) for upserts.
- **Deduplicate on a stable event ID** in streaming sinks.

```sql
-- Keep the latest version of each order, safe to re-run any time
CREATE OR REPLACE TABLE silver.orders AS
SELECT * EXCLUDE (rn)
FROM (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
  FROM bronze.orders_raw
)
WHERE rn = 1;
```

## Batch, micro-batch or streaming?

| Requirement | Pick | Why |
| --- | --- | --- |
| Daily reports, model retraining | Batch | Simplest and cheapest; easy backfills |
| Dashboards fresh within minutes | Micro-batch | Near-real-time with batch semantics |
| Fraud checks, live features, alerts | Streaming | Event-at-a-time; needs watermarks and state |

Streaming adds real complexity (state, late data, exactly-once effects), so choose it only when the freshness requirement is real.

## Deduplication at web scale: MinHash

Training corpora contain huge numbers of near-duplicates (boilerplate, mirrors, templated pages), which waste compute and encourage memorisation. Comparing every pair of documents is impossible, so pipelines use **MinHash**.

Represent each document as a set of shingles (e.g. 5-word n-grams). The Jaccard similarity of two sets is

$$
J(A,B) = \frac{|A \cap B|}{|A \cup B|}
$$

and for a random hash function $h$, the probability that the minimum hash values match equals that similarity:

$$
\Pr\left[\min h(A) = \min h(B)\right] = J(A,B)
$$

So a signature of $k$ min-hashes estimates $J$ cheaply. **LSH banding** then splits the signature into $b$ bands of $r$ rows; two documents become candidates if any band matches, which happens with probability

$$
P(\text{candidate}) = 1 - \left(1 - s^{r}\right)^{b}
$$

for similarity $s$. Tuning $b$ and $r$ moves the S-shaped threshold, often to around $s \approx 0.8$. The FineWeb paper shows how much these choices matter for the final model.

## Embeddings pipelines for RAG

A RAG index is a derived dataset and should be treated like one: versioned, tested and kept fresh.

```mermaid
flowchart LR
  D["source docs<br/>(changed since last run)"] --> X["extract text<br/>+ metadata"] --> CH["chunk<br/>(+ contextual header)"] --> EM["embed<br/>(batch, versioned model)"] --> UP["upsert into vector index<br/>keyed by doc_id + chunk_no"]
  DEL["deleted docs"] --> RM["delete their chunks"]
  UP --> EV["retrieval evals<br/>recall@k on a fixed query set"]
```

Common failure modes are pipeline bugs, not model bugs: stale chunks from deleted documents, mixing vectors from two embedding-model versions, or chunking that splits tables in half. Key each chunk deterministically, store the embedding model version with it, and run a small retrieval eval after every re-index.
