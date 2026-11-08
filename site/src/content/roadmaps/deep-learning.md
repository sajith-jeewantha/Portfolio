---
title: Deep Learning Engineering
short: Deep Learning
order: 7
icon: brain-circuit
tier: specialisation
summary: "Build language models from scratch: data pipelines, tokenizers, Transformer architecture, pre-training, post-training (SFT, DPO, RL with verifiable rewards), distributed training, scaling laws and evaluation."
updated: 2026-11-07
overview: "Deep learning engineering is the craft of turning data and compute into a capable model, and then into a *useful* one. You own the whole training stack: collecting and filtering data, training a tokenizer, designing the architecture, running stable pre-training at scale, then post-training with supervised fine-tuning (SFT), preference optimisation (DPO and relatives) and reinforcement learning, and finally measuring what you built with honest evals. It is where math, systems engineering and empirical science meet, and the open-source ecosystem (nanoGPT, nanochat, TorchTitan, TRL, open reports such as Llama 3, DeepSeek-V3 and Tulu 3) now makes it possible to learn on a single GPU what labs do on thousands."
why2027: "The frontier moved from *bigger pre-training* to *post-training and reasoning*: DeepSeek-R1 (2025) showed reinforcement learning with verifiable rewards can teach reasoning, and since then GRPO-style RL, distillation and synthetic data have become standard recipes. Companies increasingly fine-tune and post-train open-weight models instead of only calling APIs, so engineers who understand the training stack end to end are scarce. AI skills appear in a fast-growing share of postings, with PyTorch named among the top skills for AI engineers. Deep training skills also make you a far better AI, inference and harness engineer, because you know *why* models behave as they do."
demand:
  - claim: "AI engineer is LinkedIn's fastest-growing US role for 2026; PyTorch is among the most-listed skills."
    source: "Dice on LinkedIn Jobs on the Rise 2026"
    url: "https://www.dice.com/career-advice/ai-related-jobs-top-linkedins-fastest-growing-roles-list-for-2026"
  - claim: "AI skills now appear in 2.5% of all US job postings, up 55% year over year."
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
prerequisites:
  - "Comfortable Python and NumPy; you can read and debug other people's code."
  - "[Foundations](/roadmaps/foundations/) Beginner stage: vectors and matrices, derivatives and the chain rule, basic probability."
  - "[ML Engineering](/roadmaps/ml-engineering/) Beginner concepts: train/validation/test splits, overfitting, loss functions."
  - "Access to a GPU: a free Colab or Kaggle GPU is enough until the Advanced stage."
diagram: |
  flowchart TB
    P["Prereqs: Python · linear algebra · calculus"] --> B
    subgraph B["1 · Beginner — neural nets from scratch"]
      direction LR
      B1["autograd & backprop"] --> B2["MLP · CNN"] --> B3["clean training loop"]
    end
    subgraph I["2 · Intermediate — Transformers"]
      direction LR
      I1["BPE tokenizer"] --> I2["GPT from scratch"] --> I3["LoRA fine-tune"]
    end
    subgraph A["3 · Advanced — the LLM stack"]
      direction LR
      A1["data pipeline"] --> A2["pre-train 124M"] --> A3["SFT → DPO"] --> A4["evals"]
    end
    subgraph E["4 · Expert — scale & reasoning"]
      direction LR
      E1["FSDP · TP · PP"] --> E2["scaling-law sweep"] --> E3["GRPO / RLVR"] --> E4["tech report"]
    end
    B --> I --> A --> E
    A -.-> INF["Inference & GPU"]
    A -.-> CLOUD["Cloud: secure training"]
    E -.-> SAFE["AI Security & Safety"]
stages:
  - level: Beginner
    hours: 140
    focus: "Understand learning as optimisation. Build a tiny autograd engine, then train MLPs and CNNs in PyTorch with a clean, reproducible training loop."
    concepts:
      - "Tensors, broadcasting and shapes; reading `einsum`."
      - "Computational graphs, the chain rule and reverse-mode autodiff (backprop)."
      - "Loss functions: MSE, cross-entropy, and cross-entropy as negative log-likelihood."
      - "SGD, momentum, Adam and AdamW; learning-rate schedules (warmup + cosine)."
      - "Initialisation, activations (ReLU, GELU), normalisation (BatchNorm, LayerNorm)."
      - "Overfitting, regularisation (weight decay, dropout), train/val curves."
      - "PyTorch essentials: `nn.Module`, `DataLoader`, `torch.compile`, mixed precision basics, checkpoints."
    projects:
      - title: "Micrograd from scratch"
        detail: "Re-implement a scalar autograd engine and a small MLP (follow Karpathy's Zero to Hero lecture 1). Verify gradients against PyTorch and finite differences."
      - title: "Makemore character model"
        detail: "Bigram → MLP language model on a names dataset. Plot loss, tune LR and batch size, and show the effect of initialisation on activations."
      - title: "CNN image classifier with an experiment log"
        detail: "CIFAR-10 to >85% accuracy with a reproducible config (seeds, configs, metrics in Weights & Biases or TensorBoard). Write a short post explaining what moved the needle."
    signals:
      - "You can derive and code backprop for a linear layer + softmax cross-entropy by hand."
      - "You debug a training run from its loss curve (LR too high, data bug, overfitting)."
      - "You write a PyTorch training loop from memory, with eval, checkpointing and mixed precision."
  - level: Intermediate
    hours: 220
    focus: "Master the Transformer. Write a tokenizer and a GPT from scratch, understand every line, then fine-tune an open model with LoRA."
    concepts:
      - "Tokenization: byte-level BPE, vocabulary size trade-offs, special tokens, chat templates."
      - "Embeddings, scaled dot-product attention, causal masking, multi-head attention."
      - "The modern decoder block: pre-norm, RMSNorm, SwiGLU, RoPE, residual stream."
      - "Language-model training: next-token prediction, perplexity, teacher forcing, sampling (temperature, top-p)."
      - "KV cache, grouped-query attention (GQA) and why they matter for inference."
      - "Parameter-efficient fine-tuning: LoRA and QLoRA; instruction data formats."
      - "Reading papers: reproduce one figure from a paper rather than just reading it."
    projects:
      - title: "BPE tokenizer"
        detail: "Implement byte-level BPE training + encode/decode (Karpathy's minbpe lecture). Compare compression on English vs Sinhala text and explain the difference."
      - title: "GPT from scratch"
        detail: "Write a ~10M-parameter GPT (nanoGPT style) on TinyStories or Shakespeare. Then swap in RoPE, RMSNorm and SwiGLU and measure the loss difference in an ablation table."
      - title: "LoRA fine-tune an open model"
        detail: "Use Hugging Face TRL + PEFT to LoRA-fine-tune a ~1B open-weight model on a small instruction dataset. Evaluate before/after on a held-out set you wrote yourself."
    signals:
      - "You can explain attention's shapes at every step and why the causal mask is needed."
      - "Your from-scratch GPT trains stably and you can explain each architectural choice."
      - "You can read a modern model card or config (Llama, Qwen, Gemma) and know what each field does."
  - level: Advanced
    hours: 320
    focus: "Run the full LLM pipeline yourself: curated data → pre-training → SFT → preference optimisation → evals. Small models, real methodology."
    concepts:
      - "Pre-training data: web crawl filtering, deduplication (MinHash), quality classifiers, data mixtures (FineWeb is the reference)."
      - "Training stability: loss spikes, gradient clipping, z-loss, LR warmup, weight-decay placement."
      - "Efficiency: bf16 mixed precision, FlashAttention, activation checkpointing, `torch.compile`, gradient accumulation, MFU."
      - "Scaling laws: Kaplan vs Chinchilla, compute-optimal tokens per parameter, why modern models over-train."
      - "SFT: chat templates, loss masking on the prompt, packing, data quality over quantity."
      - "Preference optimisation: reward models, RLHF with PPO, DPO and its relatives (IPO, KTO, ORPO, SimPO)."
      - "Evaluation: benchmarks (MMLU-style, HumanEval pass@k), contamination, LLM-as-a-judge biases, using lm-evaluation-harness."
    projects:
      - title: "Reproduce GPT-2 (124M)"
        detail: "Follow Karpathy's *Let's reproduce GPT-2* on FineWeb-Edu with a rented 8×GPU node or a long single-GPU run. Track tokens/sec, MFU and HellaSwag over time."
      - title: "Train your own chat model end to end"
        detail: "Use nanochat as the reference: tokenizer → pre-train → mid-train → SFT → RL. Write up every stage's cost, data and metrics."
      - title: "SFT then DPO, measured"
        detail: "On your model (or a ~1B open model), run SFT, then DPO on a preference dataset. Compare SFT vs SFT+DPO on win-rate (LLM judge with swapped positions) and a capability benchmark. Look for the alignment tax."
      - title: "Eval harness"
        detail: "Add your model to lm-evaluation-harness, write one custom task (e.g. Sinhala QA), and check for contamination against your training data."
    signals:
      - "You can estimate the compute (FLOPs ≈ 6ND), memory and wall-clock time of a training run before launching it."
      - "You've diagnosed and fixed at least one real training instability."
      - "You can explain the DPO loss and when you'd choose DPO, KTO or online RL."
      - "Your eval results come with confidence intervals and a contamination check."
  - level: Expert
    hours: 420
    focus: "Scale and reasoning: multi-GPU parallelism, scaling-law experiments, RL with verifiable rewards, and publishing reproducible results."
    concepts:
      - "Parallelism: DDP, FSDP/ZeRO stages, tensor, pipeline, sequence/context and expert parallelism; when to combine them (3D/4D parallelism)."
      - "Mixture-of-Experts: routing, load-balancing losses, expert parallelism, DeepSeek-V3 style MoE + MLA."
      - "Low-precision training (FP8), new optimisers (Muon), μP and hyperparameter transfer across scales."
      - "RL for reasoning: GRPO, RLVR, DAPO / Dr. GRPO fixes, reward hacking, length bias, verifiers."
      - "Distillation and synthetic data: generating, filtering and verifying training data with stronger models."
      - "Long context: RoPE scaling, context-extension training, needle-in-a-haystack and its limits."
      - "Research practice: ablations, seeds and variance, compute budgeting, writing a clear technical report."
    projects:
      - title: "Scale out with FSDP and TorchTitan"
        detail: "Train a ~350M–1B model on 2–8 GPUs with FSDP2 (TorchTitan as reference). Profile and report MFU, memory per GPU and throughput for DDP vs FSDP vs FSDP + activation checkpointing."
      - title: "Mini scaling-law study"
        detail: "Train 5–7 models from 5M to 150M parameters at several token budgets. Fit a loss-vs-compute power law and compare your compute-optimal ratio to Chinchilla's ~20 tokens per parameter."
      - title: "GRPO on verifiable math"
        detail: "Use TRL's GRPO trainer on a small model with a math dataset and an exact-match reward. Track accuracy, response length and reward hacking; try one DAPO / Dr. GRPO fix and measure it."
      - title: "Publish a technical report"
        detail: "Write up one project like a mini lab report (setup, ablations, negative results, compute used) on your blog, with code and weights on GitHub and Hugging Face."
    signals:
      - "You can choose a parallelism strategy for a given model size and cluster, and justify it with memory math."
      - "You've run an RL post-training loop and caught a reward-hacking failure."
      - "Others can reproduce your results from your repo and report."
      - "You can read a new frontier tech report and say what's genuinely new."
connections:
  - track: foundations
    text: "The chain rule *is* backprop, KL divergence sits inside DPO and RLHF, and diffusion is a physics-inspired stochastic process. Foundations make papers readable."
  - track: data-engineering
    text: "Pre-training quality is mostly data quality: crawling, dedup, filtering and mixtures are data-pipeline engineering at scale."
  - track: inference-gpu
    text: "KV caches, quantisation, FlashAttention and kernels decide what training choices (GQA, MoE, context length) cost at serving time."
  - track: cloud-engineering
    text: "Real training runs need GPU clusters, object storage, least-privilege IAM for data buckets and secure model registries."
  - track: ai-engineering
    text: "Knowing post-training helps you decide when to prompt, when to RAG and when to fine-tune, and how to evaluate the result."
  - track: ai-security-safety
    text: "RLHF, reward hacking, Constitutional AI and evals are where training meets alignment and safety."
references:
  papers:
    - title: "Attention Is All You Need"
      by: "Vaswani et al."
      year: 2017
      url: "https://arxiv.org/abs/1706.03762"
      note: "The Transformer. Read it twice: once now, once after you've built a GPT."
    - title: "Language Models are Unsupervised Multitask Learners (GPT-2)"
      by: "Radford et al., OpenAI"
      year: 2019
      url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
      note: "Decoder-only pre-training at scale gives zero-shot ability; the model you'll reproduce."
    - title: "Language Models are Few-Shot Learners (GPT-3)"
      by: "Brown et al."
      year: 2020
      url: "https://arxiv.org/abs/2005.14165"
      note: "In-context learning emerges with scale."
    - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
      by: "Devlin et al."
      year: 2018
      url: "https://arxiv.org/abs/1810.04805"
      note: "The encoder-side counterpart; masked-language modelling is still used for embeddings and classifiers."
    - title: "Neural Machine Translation of Rare Words with Subword Units"
      by: "Sennrich et al."
      year: 2015
      url: "https://arxiv.org/abs/1508.07909"
      note: "Byte-pair encoding for NLP — the tokenizer you'll implement."
    - title: "SentencePiece: A simple and language independent subword tokenizer and detokenizer"
      by: "Kudo & Richardson"
      year: 2018
      url: "https://arxiv.org/abs/1808.06226"
      note: "Language-agnostic tokenization; important for non-English text like Sinhala."
    - title: "Adam: A Method for Stochastic Optimization"
      by: "Kingma & Ba"
      year: 2014
      url: "https://arxiv.org/abs/1412.6980"
      note: "The default optimiser; understand its two moment estimates."
    - title: "Decoupled Weight Decay Regularization (AdamW)"
      by: "Loshchilov & Hutter"
      year: 2017
      url: "https://arxiv.org/abs/1711.05101"
      note: "Why LLMs use AdamW rather than Adam + L2."
    - title: "Root Mean Square Layer Normalization"
      by: "Zhang & Sennrich"
      year: 2019
      url: "https://arxiv.org/abs/1910.07467"
      note: "RMSNorm — the cheaper normalisation in modern LLMs."
    - title: "RoFormer: Enhanced Transformer with Rotary Position Embedding"
      by: "Su et al."
      year: 2021
      url: "https://arxiv.org/abs/2104.09864"
      note: "RoPE, now the standard position encoding."
    - title: "GLU Variants Improve Transformer"
      by: "Shazeer"
      year: 2020
      url: "https://arxiv.org/abs/2002.05202"
      note: "The SwiGLU feed-forward block used by most open models."
    - title: "Scaling Laws for Neural Language Models"
      by: "Kaplan et al."
      year: 2020
      url: "https://arxiv.org/abs/2001.08361"
      note: "Loss follows power laws in parameters, data and compute."
    - title: "Training Compute-Optimal Large Language Models (Chinchilla)"
      by: "Hoffmann et al."
      year: 2022
      url: "https://arxiv.org/abs/2203.15556"
      note: "Revised the ratio to ~20 tokens per parameter; the basis of compute budgeting."
    - title: "Mixed Precision Training"
      by: "Micikevicius et al."
      year: 2017
      url: "https://arxiv.org/abs/1710.03740"
      note: "Half-precision training with loss scaling."
    - title: "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models"
      by: "Rajbhandari et al."
      year: 2019
      url: "https://arxiv.org/abs/1910.02054"
      note: "Sharding optimiser state, gradients and weights — the idea behind FSDP."
    - title: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism"
      by: "Shoeybi et al."
      year: 2019
      url: "https://arxiv.org/abs/1909.08053"
      note: "Tensor parallelism inside Transformer layers."
    - title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
      by: "Dao et al."
      year: 2022
      url: "https://arxiv.org/abs/2205.14135"
      note: "Thinking in memory hierarchy, not FLOPs. Follow with FlashAttention-2 (2023)."
    - title: "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
      by: "Ainslie et al."
      year: 2023
      url: "https://arxiv.org/abs/2305.13245"
      note: "Smaller KV cache, faster inference — a training choice made for serving."
    - title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
      by: "Fedus et al."
      year: 2021
      url: "https://arxiv.org/abs/2101.03961"
      note: "Simplified Mixture-of-Experts routing."
    - title: "LLaMA: Open and Efficient Foundation Language Models"
      by: "Touvron et al."
      year: 2023
      url: "https://arxiv.org/abs/2302.13971"
      note: "The modern open-model recipe (RMSNorm, SwiGLU, RoPE) in one place."
    - title: "The Llama 3 Herd of Models"
      by: "Grattafiori et al."
      year: 2024
      url: "https://arxiv.org/abs/2407.21783"
      note: "A complete frontier pre- and post-training report; read it as a checklist."
    - title: "DeepSeek-V3 Technical Report"
      by: "DeepSeek-AI"
      year: 2024
      url: "https://arxiv.org/abs/2412.19437"
      note: "MoE, multi-head latent attention, FP8 training and multi-token prediction."
    - title: "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale"
      by: "Penedo et al."
      year: 2024
      url: "https://arxiv.org/abs/2406.17557"
      note: "How pre-training data is filtered and deduplicated, with ablations."
    - title: "Deep reinforcement learning from human preferences"
      by: "Christiano et al."
      year: 2017
      url: "https://arxiv.org/abs/1706.03741"
      note: "The origin of RLHF."
    - title: "Proximal Policy Optimization Algorithms"
      by: "Schulman et al."
      year: 2017
      url: "https://arxiv.org/abs/1707.06347"
      note: "The RL algorithm behind classic RLHF."
    - title: "Training language models to follow instructions with human feedback (InstructGPT)"
      by: "Ouyang et al."
      year: 2022
      url: "https://arxiv.org/abs/2203.02155"
      note: "The canonical SFT → reward model → PPO pipeline."
    - title: "Constitutional AI: Harmlessness from AI Feedback"
      by: "Bai et al."
      year: 2022
      url: "https://arxiv.org/abs/2212.08073"
      note: "RL from AI feedback guided by written principles."
    - title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions"
      by: "Wang et al."
      year: 2022
      url: "https://arxiv.org/abs/2212.10560"
      note: "The start of synthetic SFT data."
    - title: "LoRA: Low-Rank Adaptation of Large Language Models"
      by: "Hu et al."
      year: 2021
      url: "https://arxiv.org/abs/2106.09685"
      note: "Fine-tune by training a low-rank update; where you'll start fine-tuning."
    - title: "QLoRA: Efficient Finetuning of Quantized LLMs"
      by: "Dettmers et al."
      year: 2023
      url: "https://arxiv.org/abs/2305.14314"
      note: "LoRA on a 4-bit base model — fine-tuning on one consumer GPU."
    - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
      by: "Rafailov et al."
      year: 2023
      url: "https://arxiv.org/abs/2305.18290"
      note: "Preference tuning without RL or a separate reward model."
    - title: "KTO: Model Alignment as Prospect Theoretic Optimization"
      by: "Ethayarajh et al."
      year: 2024
      url: "https://arxiv.org/abs/2402.01306"
      note: "Learns from thumbs-up/down data instead of pairs."
    - title: "ORPO: Monolithic Preference Optimization without Reference Model"
      by: "Hong et al."
      year: 2024
      url: "https://arxiv.org/abs/2403.07691"
      note: "SFT and preference optimisation in one stage."
    - title: "SimPO: Simple Preference Optimization with a Reference-Free Reward"
      by: "Meng et al."
      year: 2024
      url: "https://arxiv.org/abs/2405.14734"
      note: "Length-normalised, reference-free DPO variant."
    - title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models"
      by: "Shao et al."
      year: 2024
      url: "https://arxiv.org/abs/2402.03300"
      note: "Introduced GRPO — RL without a value network."
    - title: "Tulu 3: Pushing Frontiers in Open Language Model Post-Training"
      by: "Lambert et al."
      year: 2024
      url: "https://arxiv.org/abs/2411.15124"
      note: "A fully open post-training recipe; introduced RL with verifiable rewards (RLVR)."
    - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
      by: "DeepSeek-AI"
      year: 2025
      url: "https://arxiv.org/abs/2501.12948"
      note: "Reasoning emerging from RL with rule-based rewards; the 2025 turning point."
    - title: "DAPO: An Open-Source LLM Reinforcement Learning System at Scale"
      by: "Yu et al."
      year: 2025
      url: "https://arxiv.org/abs/2503.14476"
      note: "Practical fixes to GRPO (clip-higher, dynamic sampling, token-level loss)."
    - title: "Understanding R1-Zero-Like Training: A Critical Perspective (Dr. GRPO)"
      by: "Liu et al."
      year: 2025
      url: "https://arxiv.org/abs/2503.20783"
      note: "Finds GRPO's length and normalisation biases — read before trusting long responses."
    - title: "Muon is Scalable for LLM Training"
      by: "Liu et al., Moonshot AI"
      year: 2025
      url: "https://arxiv.org/abs/2502.16982"
      note: "An orthogonalised-update optimiser that challenges AdamW at scale."
    - title: "Kimi K2: Open Agentic Intelligence"
      by: "Kimi Team"
      year: 2025
      url: "https://arxiv.org/abs/2507.20534"
      note: "Trillion-parameter MoE trained with MuonClip; agentic post-training at scale."
    - title: "Measuring Massive Multitask Language Understanding (MMLU)"
      by: "Hendrycks et al."
      year: 2020
      url: "https://arxiv.org/abs/2009.03300"
      note: "The classic knowledge benchmark — and a lesson in saturation."
    - title: "Evaluating Large Language Models Trained on Code (HumanEval)"
      by: "Chen et al."
      year: 2021
      url: "https://arxiv.org/abs/2107.03374"
      note: "Defines pass@k for code evaluation."
    - title: "Holistic Evaluation of Language Models (HELM)"
      by: "Liang et al."
      year: 2022
      url: "https://arxiv.org/abs/2211.09110"
      note: "Evaluation as many metrics × many scenarios."
    - title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
      by: "Zheng et al."
      year: 2023
      url: "https://arxiv.org/abs/2306.05685"
      note: "When model judges agree with humans, and their position and verbosity biases."
  courses:
    - title: "Neural Networks: Zero to Hero"
      by: "Andrej Karpathy"
      url: "https://karpathy.ai/zero-to-hero.html"
      note: "Start here: micrograd → makemore → GPT → tokenizer, all from scratch."
    - title: "Let's build GPT: from scratch, in code, spelled out"
      by: "Andrej Karpathy"
      year: 2023
      url: "https://www.youtube.com/watch?v=kCc8FmEb1nY"
      note: "Your Intermediate-stage project, line by line."
    - title: "Let's reproduce GPT-2 (124M)"
      by: "Andrej Karpathy"
      year: 2024
      url: "https://www.youtube.com/watch?v=l8pRSuU81PU"
      note: "A real pre-training run with every efficiency trick explained."
    - title: "Stanford CS336: Language Modeling from Scratch"
      by: "Stanford"
      url: "https://cs336.stanford.edu/"
      note: "The best university course on building LLMs; do the assignments."
    - title: "Stanford CS224N: Natural Language Processing with Deep Learning"
      by: "Stanford"
      url: "https://web.stanford.edu/class/cs224n/"
      note: "NLP and Transformer fundamentals with strong lectures."
    - title: "Stanford CS231n: Deep Learning for Computer Vision"
      by: "Stanford"
      url: "https://cs231n.stanford.edu/"
      note: "The classic backprop and training-practice course."
    - title: "Practical Deep Learning for Coders"
      by: "fast.ai"
      url: "https://course.fast.ai/"
      note: "Code-first, top-down — good alongside the from-scratch path."
    - title: "Hugging Face LLM Course"
      by: "Hugging Face"
      url: "https://huggingface.co/learn/llm-course"
      note: "The HF ecosystem: tokenizers, Transformers, fine-tuning."
    - title: "The Ultra-Scale Playbook: Training LLMs on GPU Clusters"
      by: "Hugging Face (nanotron)"
      year: 2025
      url: "https://huggingface.co/spaces/nanotron/ultrascale-playbook"
      note: "Data, tensor, pipeline and context parallelism plus ZeRO, explained with benchmarks."
    - title: "The Smol Training Playbook"
      by: "Hugging Face"
      year: 2025
      url: "https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook"
      note: "An honest end-to-end log of training a small LLM, including what failed."
  books:
    - title: "Understanding Deep Learning"
      by: "Simon J. D. Prince"
      year: 2023
      url: "https://udlbook.github.io/udlbook/"
      note: "Modern, clear and free — the best first textbook."
    - title: "Build a Large Language Model (From Scratch)"
      by: "Sebastian Raschka"
      year: 2024
      url: "https://www.manning.com/books/build-a-large-language-model-from-scratch"
      note: "A GPT built step by step, through fine-tuning."
    - title: "Dive into Deep Learning"
      by: "Zhang, Lipton, Li & Smola"
      url: "https://d2l.ai/"
      note: "Interactive, code-heavy, free."
    - title: "Deep Learning: Foundations and Concepts"
      by: "Christopher M. Bishop & Hugh Bishop"
      year: 2024
      url: "https://www.bishopbook.com/"
      note: "Rigorous modern textbook for the math-minded."
    - title: "Deep Learning"
      by: "Goodfellow, Bengio & Courville"
      year: 2016
      url: "https://www.deeplearningbook.org/"
      note: "The classic theory reference (pre-Transformer, still valuable)."
    - title: "How to Scale Your Model"
      by: "Google DeepMind (Austin et al.)"
      year: 2025
      url: "https://jax-ml.github.io/scaling-book/"
      note: "Rooflines, sharding and the arithmetic of training and serving at scale."
    - title: "Reinforcement Learning: An Introduction (2nd ed.)"
      by: "Sutton & Barto"
      year: 2018
      url: "http://incompleteideas.net/book/the-book-2nd.html"
      note: "RL foundations for RLHF and GRPO; free."
    - title: "Reinforcement Learning from Human Feedback"
      by: "Nathan Lambert"
      url: "https://rlhfbook.com/"
      note: "The free, up-to-date book on post-training."
  articles:
    - title: "nanoGPT"
      by: "Andrej Karpathy"
      url: "https://github.com/karpathy/nanoGPT"
      note: "Minimal, readable GPT training code."
    - title: "nanochat"
      by: "Andrej Karpathy"
      url: "https://github.com/karpathy/nanochat"
      note: "The full ChatGPT-style pipeline (tokenizer → pre-train → SFT → RL) for about $100."
    - title: "llm.c"
      by: "Andrej Karpathy"
      url: "https://github.com/karpathy/llm.c"
      note: "LLM training in raw C/CUDA — where the Expert stage meets GPU programming."
    - title: "The Annotated Transformer"
      by: "Harvard NLP"
      url: "https://nlp.seas.harvard.edu/annotated-transformer/"
      note: "The paper, interleaved with runnable code."
    - title: "The Illustrated Transformer"
      by: "Jay Alammar"
      url: "https://jalammar.github.io/illustrated-transformer/"
      note: "Visual intuition for attention."
    - title: "RLHF: Reinforcement Learning from Human Feedback"
      by: "Chip Huyen"
      year: 2023
      url: "https://huyenchip.com/2023/05/02/rlhf.html"
      note: "A clear tour of the pipeline."
    - title: "Reward Hacking in Reinforcement Learning"
      by: "Lilian Weng"
      year: 2024
      url: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/"
      note: "How RL post-training goes wrong, and what to watch for."
    - title: "Understanding Reasoning LLMs"
      by: "Sebastian Raschka"
      year: 2025
      url: "https://magazine.sebastianraschka.com/p/understanding-reasoning-llms"
      note: "The four main ways reasoning models are built."
    - title: "The State of Reinforcement Learning for LLM Reasoning"
      by: "Sebastian Raschka"
      year: 2025
      url: "https://magazine.sebastianraschka.com/p/the-state-of-llm-reasoning-model-training"
      note: "GRPO and the papers that followed, summarised."
    - title: "Muon: An optimizer for hidden layers in neural networks"
      by: "Keller Jordan"
      year: 2024
      url: "https://kellerjordan.github.io/posts/muon/"
      note: "The original Muon write-up."
    - title: "TRL documentation"
      by: "Hugging Face"
      url: "https://huggingface.co/docs/trl/index"
      note: "SFT, DPO, GRPO and PPO trainers you'll use for post-training."
    - title: "TorchTitan"
      by: "PyTorch"
      url: "https://github.com/pytorch/torchtitan"
      note: "PyTorch-native reference for large-scale pre-training (FSDP2, TP, PP)."
    - title: "PyTorch FSDP documentation"
      by: "PyTorch"
      url: "https://docs.pytorch.org/docs/stable/fsdp.html"
      note: "Sharded data parallelism in practice."
    - title: "lm-evaluation-harness"
      by: "EleutherAI"
      url: "https://github.com/EleutherAI/lm-evaluation-harness"
      note: "The standard open evaluation framework."
---

## The training pipeline at a glance

Every modern LLM goes through the same broad stages. Labs differ in the details (data, scale, the RL recipe), but the shape is the same. The roadmap above has you build each box yourself, at small scale.

```mermaid
flowchart TB
  subgraph DATA["1 · Data"]
    direction LR
    D1["crawl / collect"] --> D2["filter · dedup · quality"] --> D3["mixture + tokenize"]
  end
  subgraph PT["2 · Pre-training"]
    direction LR
    P1["next-token prediction<br/>trillions of tokens"] --> P2["mid-training<br/>long context · code · math"]
  end
  subgraph POST["3 · Post-training"]
    direction LR
    S1["SFT"] --> S2["preference optimisation<br/>RLHF · DPO"] --> S3["RL with verifiable rewards<br/>GRPO"]
  end
  subgraph EVAL["4 · Evaluate & ship"]
    direction LR
    E1["benchmarks · judges · red-team"] --> E2["quantise · serve"]
  end
  DATA --> PT --> POST --> EVAL
  EVAL -. "regressions become new data" .-> DATA
```

## Learning is optimisation

A model with parameters $\theta$ takes a token sequence $x_{1:T}$ and is trained to predict each next token. Pre-training minimises the average **negative log-likelihood** (the cross-entropy):

$$
\mathcal{L}(\theta) = -\frac{1}{T}\sum_{t=1}^{T} \log p_\theta\left(x_t \mid x_{<t}\right)
$$

Perplexity is just $\exp(\mathcal{L})$. Gradient descent updates $\theta \leftarrow \theta - \eta \nabla_\theta \mathcal{L}$, and backpropagation computes $\nabla_\theta \mathcal{L}$ by applying the chain rule backwards through the computational graph. That's why building micrograd comes first: once you've written backprop yourself, `loss.backward()` stops being magic.

> **Rule of thumb:** when a run misbehaves, check in this order: data (look at real batches), learning rate, initialisation and normalisation, then numerics (overflow in fp16, missing loss scaling).

## Attention in one equation

Each token produces a query $q$, key $k$ and value $v$. Stacked into matrices, scaled dot-product attention is:

$$
\operatorname{Attention}(Q,K,V) = \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}} + M\right)V
$$

$M$ is the causal mask ($-\infty$ above the diagonal), so a token can't see the future. The $\sqrt{d_k}$ keeps the dot products from growing with dimension and saturating the softmax. A modern decoder block wraps this as:

```mermaid
flowchart TB
  X["residual stream x"] --> N1["RMSNorm"] --> ATT["causal self-attention<br/>RoPE on q,k · GQA"] --> ADD1(("+"))
  X --> ADD1
  ADD1 --> N2["RMSNorm"] --> MLP["SwiGLU MLP"] --> ADD2(("+"))
  ADD1 --> ADD2
  ADD2 --> OUT["to next block"]
```

Attention costs $O(T^2)$ in sequence length. FlashAttention doesn't change that count; it reorganises the computation so the $T \times T$ matrix never sits in slow GPU memory. That's why reading the [Inference & GPU](/roadmaps/inference-gpu/) track pays off here.

## Back-of-the-envelope compute and memory

You should be able to estimate a run before launching it. For a dense Transformer with $N$ parameters trained on $D$ tokens:

$$
C_{\text{train}} \approx 6ND \ \text{FLOPs}
$$

The 6 is 2 FLOPs per parameter per token for the forward pass and about 4 for the backward pass. **Example:** GPT-2 small ($N \approx 124\text{M}$) on $D = 10\text{B}$ tokens needs about $7.4 \times 10^{18}$ FLOPs. At an achieved 40% of a GPU's ~1 PFLOP/s bf16 peak, that's roughly five GPU-hours.

Memory for mixed-precision training with AdamW is roughly **16 bytes per parameter** before activations: bf16 weights (2) + bf16 grads (2) + fp32 master weights (4) + two fp32 Adam moments (8). So a 7B model needs ~112 GB for weights and optimiser state alone. That's why ZeRO/FSDP sharding exists.

| Parallelism | What is split | Use it when |
| --- | --- | --- |
| Data (DDP) | the batch | the model fits on one GPU |
| FSDP / ZeRO-3 | weights, grads, optimiser state | the model *nearly* fits; the default first step |
| Tensor (TP) | matrices inside a layer | layers are too big; needs fast NVLink within a node |
| Pipeline (PP) | groups of layers | many nodes; accept pipeline "bubbles" |
| Context / sequence | the sequence dimension | very long contexts |
| Expert (EP) | MoE experts | Mixture-of-Experts models |

## Scaling laws: spend compute wisely

Kaplan et al. (2020) found loss falls as a power law in parameters, data and compute. Chinchilla (2022) fitted

$$
L(N, D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}
$$

and showed that, for a fixed budget, parameters and tokens should grow together: about **20 tokens per parameter**. Modern open models deliberately "over-train" far past that (Llama 3 8B saw ~15T tokens) because a smaller, longer-trained model is cheaper to *serve*. Training-optimal and deployment-optimal are different questions, and the Expert-stage scaling-law project makes this concrete.

## Post-training: from SFT to RL

**SFT** is the same next-token loss, applied only to the response tokens of curated (prompt, response) pairs in a chat template. It teaches format and behaviour.

**RLHF** (InstructGPT) trains a reward model $r_\phi$ on human preference pairs, then optimises the policy with PPO while a KL penalty keeps it near the SFT reference model:

$$
\max_{\pi_\theta}\ \mathbb{E}_{x,\,y\sim\pi_\theta}\left[r_\phi(x,y)\right] - \beta\, \mathrm{KL}\left(\pi_\theta(\cdot\mid x)\,\|\,\pi_{\text{ref}}(\cdot\mid x)\right)
$$

**DPO** shows this objective has a closed-form optimal policy, so you can skip the reward model and RL loop and train directly on preferred ($y_w$) and rejected ($y_l$) answers:

$$
\mathcal{L}_{\text{DPO}} = -\log \sigma\left(\beta \log\frac{\pi_\theta(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)} - \beta \log\frac{\pi_\theta(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}\right)
$$

**GRPO** (DeepSeekMath, then DeepSeek-R1) drops PPO's value network. For each prompt it samples a *group* of $G$ answers, scores them (often with a verifiable reward: did the math answer match? did the tests pass?) and uses the group-normalised score as the advantage:

$$
\hat{A}_i = \frac{r_i - \operatorname{mean}(r_{1..G})}{\operatorname{std}(r_{1..G})}
$$

This is RL with verifiable rewards (RLVR), the recipe behind 2025-era reasoning models. Its failure modes are worth studying as much as its successes: reward hacking, exploding response length, and the normalisation biases that DAPO and Dr. GRPO correct.

```mermaid
flowchart LR
  B["base model"] --> SFT["SFT<br/>demonstrations"]
  SFT --> PREF{"preference data?"}
  PREF -- "pairs" --> DPO["DPO / SimPO"]
  PREF -- "thumbs up/down" --> KTO["KTO"]
  PREF -- "reward model + online RL" --> PPO["RLHF (PPO)"]
  SFT --> RLVR["GRPO / RLVR<br/>verifiable tasks"]
  DPO --> M["aligned model"]
  KTO --> M
  PPO --> M
  RLVR --> M
```

## Evaluation is part of training

A training run without evals is a vibe. Build the habit early:

1. **Track held-out loss and a few cheap downstream evals during training**, not just at the end.
2. **Check for contamination:** n-gram overlap between your training data and benchmark test sets.
3. **Report uncertainty.** Small benchmarks have wide confidence intervals; run several seeds where you can.
4. **Use LLM judges carefully:** swap answer positions, control for length, and spot-check by hand (MT-Bench paper).
5. **Write at least one eval nobody else has**, such as Sinhala QA or your domain's tasks. Public benchmarks saturate; private evals tell you the truth.
