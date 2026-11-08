---
title: "ML Engineering & MLOps"
short: "ML Eng."
order: 6
icon: workflow
tier: core
summary: "Turn models into reliable products: classical ML done right, feature pipelines, experiment tracking, automated training pipelines, model serving and monitoring for drift."
updated: 2026-11-07
overview: "ML engineering is the discipline of getting machine learning out of notebooks and into production, and keeping it working there. It starts with solid classical ML (problem framing, honest validation, gradient-boosted trees that still win on tabular data) and grows into the systems around the model: reproducible feature pipelines, experiment tracking, automated retraining, model registries, low-latency serving and monitoring that notices when the world drifts away from your training data. Google's well-known observation is that the model is a small box in a much larger system, and this track is about that larger system."
why2027: "Most companies adopting AI are not training frontier models. They need engineers who can ship and operate models, both classical and LLM-based, with the same rigour as any other production service. Kubernetes has become the default platform for this: the CNCF reports that 66% of organisations hosting generative-AI models use it for inference. MLOps skills (pipelines, registries, serving, monitoring) carry straight over to LLMOps, and the data and evaluation discipline from this track is what makes AI engineering and deep learning work trustworthy."
demand:
  - claim: "66% of organisations hosting generative-AI models use Kubernetes for inference; 82% of container users run Kubernetes in production."
    source: "CNCF Annual Cloud Native Survey (Jan 2026)"
    url: "https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/"
  - claim: "45% of data and analytics job postings on Indeed now mention AI."
    source: "Indeed Hiring Lab, Jan 2026"
    url: "https://hiringlab.indeed.com/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness/"
prerequisites:
  - "Python, pandas and NumPy; comfortable with Git and the command line."
  - "[Foundations](/roadmaps/foundations/) Beginner stage: basic statistics and probability, vectors and matrices."
  - "[Software Engineering](/roadmaps/software-engineering/) Beginner stage: testing, packaging, Docker basics."
  - "SQL for pulling and joining data (see [Data Engineering](/roadmaps/data-engineering/))."
diagram: |
  flowchart TB
    P["Prereqs: Python · stats · SQL · Docker"] --> B
    subgraph B["1 · Beginner — classical ML done right"]
      direction LR
      B1["framing & metrics"] --> B2["sklearn pipelines"] --> B3["honest validation"]
    end
    subgraph I["2 · Intermediate — reproducible ML"]
      direction LR
      I1["gradient boosting"] --> I2["experiment tracking"] --> I3["model as an API"]
    end
    subgraph A["3 · Advanced — production pipelines"]
      direction LR
      A1["feature pipelines"] --> A2["automated training"] --> A3["registry & CI/CD"] --> A4["monitoring & drift"]
    end
    subgraph E["4 · Expert — ML platforms"]
      direction LR
      E1["feature store"] --> E2["scalable serving"] --> E3["online experiments"] --> E4["platform design"]
    end
    B --> I --> A --> E
    A -.-> DL["Deep Learning"]
    E -.-> CLOUD["Cloud: secure serving"]
    E -.-> AIE["AI Engineering: LLMOps"]
stages:
  - level: Beginner
    hours: 110
    focus: "Learn to frame problems and evaluate models honestly. Classical ML with scikit-learn, where most real-world bugs are data and evaluation bugs."
    concepts:
      - "Problem framing: is ML even needed? Choosing a target, a baseline and a business metric."
      - "Supervised learning: linear and logistic regression, decision trees, k-NN; bias–variance trade-off."
      - "Train/validation/test splits, cross-validation, and time-based splits for temporal data."
      - "Metrics: accuracy vs precision/recall/F1, ROC-AUC vs PR-AUC for imbalanced data, MAE vs RMSE, calibration."
      - "Data leakage: target leakage, train/test contamination, preprocessing fitted on the full dataset."
      - "scikit-learn `Pipeline` and `ColumnTransformer` so preprocessing is part of the model."
    projects:
      - title: "Tabular baseline, done properly"
        detail: "Pick a public tabular dataset (e.g. credit default). Build a dummy baseline, logistic regression and a random forest inside sklearn Pipelines with cross-validation. Write up which metric you chose and why."
      - title: "Find the leak"
        detail: "Deliberately add a leaky feature (something computed from the target or the future), show how it inflates validation scores, then fix the split and pipeline. Explain the lesson in a short blog post."
    signals:
      - "You choose a metric from the business problem, not from habit."
      - "You can spot at least three kinds of data leakage in someone else's notebook."
      - "Every model you train is compared against a simple baseline."
  - level: Intermediate
    hours: 160
    focus: "Make ML reproducible and shippable: gradient boosting, tuning, experiment tracking, packaging a model behind an API with tests."
    concepts:
      - "Gradient-boosted trees (XGBoost, LightGBM): why they dominate tabular data; key hyperparameters."
      - "Hyperparameter search: random search, Bayesian optimisation, early stopping; avoiding overfitting the validation set."
      - "Experiment tracking and model registries with MLflow: params, metrics, artefacts, model versions."
      - "Reproducibility: pinned environments, seeds, data versioning, configs instead of hard-coded values."
      - "Feature engineering for tabular and text data; handling missing values and categories."
      - "Serving basics: batch vs online prediction, a REST API with FastAPI, input validation, latency budgets."
      - "Testing ML code: unit tests for features, data validation, smoke tests for the trained model."
    projects:
      - title: "XGBoost vs the baseline, tracked"
        detail: "Re-run your Beginner project with XGBoost and a tuning sweep, logging every run to MLflow. Register the best model and compare it to the baseline with confidence intervals."
      - title: "Model as a service"
        detail: "Wrap the registered model in a FastAPI service with Pydantic validation, health checks and tests. Containerise it with Docker and load-test it to report p50/p95 latency."
      - title: "Made With ML walkthrough"
        detail: "Work through the Made With ML course end to end and adapt its structure (configs, tests, CI) to your own project."
    signals:
      - "Anyone can re-run your training and get the same model from a single command."
      - "Your model ships as a tested, containerised API with documented inputs and outputs."
      - "You can explain why a boosted tree beat (or lost to) a neural network on your data."
  - level: Advanced
    hours: 220
    focus: "Build production ML pipelines: automated training, CI/CD for models, feature pipelines that match between training and serving, and monitoring."
    concepts:
      - "MLOps maturity levels 0–2 (Google): manual → pipeline automation → CI/CD of pipelines."
      - "Training–serving skew and how shared feature code and feature stores prevent it."
      - "Orchestrated pipelines: data validation → training → evaluation → registry → deployment gates."
      - "Deployment strategies: shadow, canary, blue/green, rollback; model approval workflows."
      - "Monitoring: data drift, concept drift, prediction drift, delayed labels, alerting thresholds (Evidently)."
      - "ML technical debt: glue code, pipeline jungles, hidden feedback loops, undeclared consumers."
      - "The ML Test Score rubric as a production-readiness checklist."
    projects:
      - title: "End-to-end retraining pipeline"
        detail: "Build a scheduled pipeline (Airflow, Dagster or Kubeflow Pipelines) that validates new data, retrains, evaluates against the current production model and only promotes on improvement."
      - title: "Drift dashboard"
        detail: "Simulate drift in incoming data, detect it with Evidently, raise an alert and trigger retraining. Document what thresholds you chose and why."
      - title: "Score yourself on the ML Test Score"
        detail: "Audit your pipeline against the ML Test Score rubric, fix the three weakest areas, and write up before/after scores."
    signals:
      - "Your models retrain and redeploy without you touching a notebook."
      - "You can show that training and serving compute features identically."
      - "You find out about model degradation from an alert, not from a user."
  - level: Expert
    hours: 300
    focus: "Design ML platforms for many teams and models: feature stores, scalable serving on Kubernetes, online experimentation, cost and governance."
    concepts:
      - "Feature stores (Feast): offline/online stores, point-in-time correct joins, feature reuse."
      - "Scalable serving on Kubernetes with KServe, BentoML or Ray Serve: autoscaling, GPU sharing, batching, model mesh."
      - "Online evaluation: A/B tests, interleaving, guardrail metrics, sample-size and novelty effects."
      - "Distributed training and data processing with Ray for classical and deep models."
      - "LLMOps: prompt and model versioning, eval gates in CI, tracing, cost per request — the same ideas applied to LLM apps."
      - "Governance: model cards, lineage, access control on data and models, audit trails."
      - "Platform design trade-offs: build vs buy, golden paths, self-service for data scientists."
    projects:
      - title: "Mini ML platform on Kubernetes"
        detail: "On a local cluster (kind or k3d), deploy MLflow, Feast and KServe. Serve two models with canary rollout and autoscaling, with features served from the online store."
      - title: "A/B test simulator"
        detail: "Build a small simulator that routes traffic between two model versions, computes the needed sample size and reports significance and guardrail metrics."
      - title: "Platform write-up"
        detail: "Write an architecture post (with an ADR) explaining your platform's choices, failure modes, cost and what you'd change at 10× scale."
    signals:
      - "You can design an ML platform for a team and defend each component against simpler alternatives."
      - "You treat models like any other service: SLOs, on-call, rollbacks, cost tracking."
      - "You can run and interpret an online experiment and avoid the common statistical traps."
connections:
  - track: data-engineering
    text: "Feature pipelines are data pipelines: reliable ingestion, data quality checks and point-in-time correctness come from data engineering."
  - track: deep-learning
    text: "Experiment tracking, honest evaluation and reproducibility are what make training runs trustworthy at any scale."
  - track: cloud-engineering
    text: "Model serving is a cloud workload: Kubernetes, autoscaling, IAM for model registries and least-privilege access to training data."
  - track: ai-engineering
    text: "LLMOps reuses MLOps: versioning, eval gates in CI, monitoring and rollback — applied to prompts, retrieval and models."
  - track: foundations
    text: "Statistics underpins validation, confidence intervals, drift tests and A/B testing."
references:
  papers:
    - title: "Machine Learning: The High Interest Credit Card of Technical Debt"
      by: "Sculley et al."
      year: 2014
      url: "https://research.google/pubs/machine-learning-the-high-interest-credit-card-of-technical-debt/"
      note: "The first warning that ML systems accumulate hidden debt."
    - title: "Hidden Technical Debt in Machine Learning Systems"
      by: "Sculley et al."
      year: 2015
      url: "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems"
      note: "The model is a tiny box in a big system — the founding text of MLOps."
    - title: "XGBoost: A Scalable Tree Boosting System"
      by: "Chen & Guestrin"
      year: 2016
      url: "https://arxiv.org/abs/1603.02754"
      note: "Why gradient-boosted trees became the default for tabular data."
    - title: "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction"
      by: "Breck et al."
      year: 2017
      url: "https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/"
      note: "A concrete checklist for tests and monitoring; use it to audit your own pipelines."
    - title: "TFX: A TensorFlow-Based Production-Scale Machine Learning Platform"
      by: "Baylor et al."
      year: 2017
      url: "https://research.google/pubs/tfx-a-tensorflow-based-production-scale-machine-learning-platform/"
      note: "A reference design for an end-to-end ML platform."
  courses:
    - title: "Machine Learning Specialization"
      by: "Andrew Ng, DeepLearning.AI & Stanford"
      url: "https://www.coursera.org/specializations/machine-learning-introduction"
      note: "The gentlest solid introduction to supervised and unsupervised learning."
    - title: "Machine Learning in Production"
      by: "DeepLearning.AI"
      url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops"
      note: "Deployment, data drift and the ML project lifecycle."
    - title: "CS 329S: Machine Learning Systems Design"
      by: "Chip Huyen, Stanford"
      url: "https://stanford-cs329s.github.io/"
      note: "Lecture notes on designing real ML systems."
    - title: "Made With ML"
      by: "Goku Mohandas"
      url: "https://madewithml.com/"
      note: "End-to-end MLOps course with tests, CI and serving."
    - title: "Full Stack Deep Learning"
      by: "FSDL"
      url: "https://fullstackdeeplearning.com/"
      note: "How to ship deep-learning products, from data to deployment."
  books:
    - title: "Designing Machine Learning Systems"
      by: "Chip Huyen"
      year: 2022
      url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/"
      note: "The core book for this track: data, features, deployment, monitoring."
    - title: "Hands-On Machine Learning with Scikit-Learn and PyTorch"
      by: "Aurélien Géron"
      year: 2025
      url: "https://ageron.github.io/"
      note: "The practical classic, now with PyTorch."
    - title: "An Introduction to Statistical Learning (ISLR / ISLP)"
      by: "James, Witten, Hastie, Tibshirani & Taylor"
      url: "https://www.statlearning.com/"
      note: "Free, clear statistical foundations with R and Python labs."
    - title: "The Elements of Statistical Learning"
      by: "Hastie, Tibshirani & Friedman"
      year: 2009
      url: "https://hastie.su.domains/ElemStatLearn/"
      note: "The deeper, mathematical reference (free)."
  articles:
    - title: "Rules of Machine Learning"
      by: "Martin Zinkevich, Google"
      url: "https://developers.google.com/machine-learning/guides/rules-of-ml"
      note: "43 hard-won rules; start with rule #1 — don't be afraid to launch without ML."
    - title: "MLOps: Continuous delivery and automation pipelines in machine learning"
      by: "Google Cloud"
      url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning"
      note: "Defines MLOps maturity levels 0, 1 and 2."
    - title: "scikit-learn User Guide"
      by: "scikit-learn"
      url: "https://scikit-learn.org/stable/user_guide.html"
      note: "The best free reference for classical ML, with pitfalls sections."
    - title: "MLflow documentation"
      by: "MLflow"
      url: "https://mlflow.org/docs/latest/"
      note: "Experiment tracking, model registry and LLM tracing."
    - title: "Feast documentation"
      by: "Feast"
      url: "https://docs.feast.dev/"
      note: "Open-source feature store; learn point-in-time joins here."
    - title: "KServe"
      by: "KServe"
      url: "https://kserve.github.io/website/"
      note: "Model serving on Kubernetes, including LLM runtimes."
    - title: "BentoML documentation"
      by: "BentoML"
      url: "https://docs.bentoml.com/"
      note: "Package and serve models as APIs with batching."
    - title: "Ray documentation"
      by: "Anyscale / Ray"
      url: "https://docs.ray.io/en/latest/"
      note: "Distributed training, tuning and Ray Serve."
    - title: "Kubeflow documentation"
      by: "Kubeflow"
      url: "https://www.kubeflow.org/docs/"
      note: "ML pipelines and training operators on Kubernetes."
    - title: "Evidently documentation"
      by: "Evidently AI"
      url: "https://docs.evidentlyai.com/"
      note: "Data and prediction drift reports and monitoring."
---

## The model is the small box

The most useful picture in MLOps comes from Google's *Hidden Technical Debt* paper: the ML code is a small part of a real ML system. Around it sit data collection, validation, feature extraction, serving, monitoring and configuration. Most production failures happen in those surrounding boxes.

```mermaid
flowchart TB
  subgraph OFF["Offline: training"]
    direction LR
    D["raw data"] --> V["validate"] --> F["feature pipeline"] --> T["train & tune"] --> EV["evaluate vs prod"] --> R["model registry"]
  end
  subgraph ON["Online: serving"]
    direction LR
    REQ["request"] --> OF["online features"] --> M["model server"] --> RESP["prediction"]
  end
  subgraph MON["Monitor"]
    direction LR
    L["log inputs & outputs"] --> DR["drift & quality checks"] --> AL["alert / retrain"]
  end
  R -- "approved version" --> M
  F -. "same feature code" .-> OF
  RESP --> L
  AL -. "trigger" .-> T
```

The dotted "same feature code" line matters most. If training computes a feature one way and serving computes it another way (**training–serving skew**), the model quietly gets worse while every offline metric looks fine.

## Honest evaluation

Your validation score only means something if the validation data looks like the future the model will face.

- **Random splits** are fine for independent, identically distributed rows.
- **Time-based splits** are required when you predict the future: train on the past, validate on the period after it.
- **Group splits** keep all rows from one user or patient on the same side, so the model can't memorise individuals.

For imbalanced problems, precision and recall tell you more than accuracy:

$$
\text{precision} = \frac{TP}{TP + FP}, \qquad \text{recall} = \frac{TP}{TP + FN}, \qquad F_1 = \frac{2\,\text{precision}\cdot\text{recall}}{\text{precision} + \text{recall}}
$$

A fraud model with 99.9% accuracy can catch zero fraud if only 0.1% of transactions are fraudulent. Always report a baseline, and add confidence intervals (bootstrap the test set) before claiming one model beats another.

## MLOps maturity in three levels

Google's MLOps guide describes three levels. Use them to describe where a team is and what the next step is.

| Level | What it looks like | Typical pain |
| --- | --- | --- |
| 0 — manual | notebooks, hand-run training, models copied to servers | nobody can reproduce last month's model |
| 1 — pipeline automation | an orchestrated training pipeline retrains on new data | pipeline code changes are still deployed by hand |
| 2 — CI/CD of pipelines | pipeline code is tested and deployed automatically; models promoted by gates | needs platform investment and discipline |

Most teams should aim for level 1 first. Level 2 pays off once several models and people share the platform.

## Drift: when the world moves

Two kinds of change break deployed models:

- **Data drift:** the input distribution $p(x)$ changes, for example a new customer segment.
- **Concept drift:** the relationship $p(y \mid x)$ changes, for example fraudsters adapting.

A common drift score for one feature is the Population Stability Index across bins $i$, comparing the expected (training) share $e_i$ with the actual (production) share $a_i$:

$$
\text{PSI} = \sum_i (a_i - e_i)\,\ln\frac{a_i}{e_i}
$$

As a rule of thumb, PSI above about 0.2 deserves a look. Drift alerts are only useful if someone owns them, so decide who gets paged and which retraining or rollback playbook they follow before you turn alerts on.

## From MLOps to LLMOps

LLM applications reuse almost everything here: version the prompt, retrieval index and model together; put eval suites in CI as deployment gates; trace every request; watch cost per request alongside latency. The difference is that "accuracy" becomes a set of task-specific evals, which the [AI Engineering](/roadmaps/ai-engineering/) track covers.
