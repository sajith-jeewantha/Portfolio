---
title: "Inference Optimization & GPU Programming"
short: "Inference & GPU"
order: 8
icon: cpu
tier: specialisation
summary: "Make models fast and cheap: the roofline model, KV caches, batching, speculative decoding, quantisation, FlashAttention, CUDA and Triton kernels, serving engines — and running models on-device."
updated: 2026-11-07
overview: "Inference engineering is about one question: how do you get the most useful tokens per second per dollar out of a model without hurting quality? It joins systems thinking and hardware. You learn why LLM decoding is limited by memory bandwidth rather than FLOPs, how the KV cache dominates memory, how serving engines like vLLM batch thousands of requests, how quantisation and speculative decoding cut cost, and eventually how to write GPU kernels in Triton and CUDA yourself. The same principles, applied to tight memory and power budgets, drive on-device AI on phones and laptops."
why2027: "To be honest about the evidence: aggregate hiring data for inference and GPU-kernel roles is thin, and most openings are senior (individual postings ask for CUDA, CUTLASS and Triton experience). It is still worth a place in this set. Serving is where AI spend goes: the CNCF reports that 66% of organisations hosting generative-AI models use Kubernetes for inference, and every cost and latency target lands on the serving stack. It is also the natural deepening of the user's interest in *efficient training and inference*. Treat it as a specialisation you grow into after the [Deep Learning](/roadmaps/deep-learning/) Advanced stage, not a first job target."
demand:
  - claim: "66% of organisations hosting generative-AI models use Kubernetes for inference."
    source: "CNCF Annual Cloud Native Survey (Jan 2026)"
    url: "https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/"
  - claim: "38% of organisations set usage limits on AI — cost per token is now a business constraint."
    source: "Stack Overflow Developer Survey 2026"
    url: "https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/"
prerequisites:
  - "[Deep Learning](/roadmaps/deep-learning/) Intermediate stage: you have written a GPT and understand attention and the KV cache."
  - "Comfortable Python and PyTorch; basic C or C++ helps for the CUDA stages."
  - "Computer-architecture basics: memory hierarchy, caches, threads (the [Software Engineering](/roadmaps/software-engineering/) fundamentals)."
  - "Access to an NVIDIA GPU (Colab, Kaggle or a rented cloud GPU) from the Intermediate stage onward."
diagram: |
  flowchart TB
    P["Prereqs: GPT from scratch · PyTorch · C basics"] --> B
    subgraph B["1 · Beginner — measure first"]
      direction LR
      B1["GPU memory hierarchy"] --> B2["roofline model"] --> B3["profile a model"]
    end
    subgraph I["2 · Intermediate — serving LLMs"]
      direction LR
      I1["KV cache"] --> I2["continuous batching"] --> I3["vLLM / SGLang"] --> I4["quantisation"]
    end
    subgraph A["3 · Advanced — kernels"]
      direction LR
      A1["Triton kernels"] --> A2["CUDA matmul"] --> A3["fused attention"] --> A4["speculative decoding"]
    end
    subgraph E["4 · Expert — systems & edge"]
      direction LR
      E1["disaggregated serving"] --> E2["FP8 & co-design"] --> E3["on-device: ExecuTorch · MLX · llama.cpp"]
    end
    B --> I --> A --> E
    I -.-> CLOUD["Cloud: GPU autoscaling"]
    A -.-> DL["Deep Learning: FlashAttention in training"]
    E -.-> AIE["AI Engineering: latency & cost budgets"]
stages:
  - level: Beginner
    hours: 100
    focus: "Build the mental model before optimising anything: how GPUs work, why memory bandwidth matters, and how to measure where time goes."
    concepts:
      - "GPU architecture: SMs, warps, threads; HBM vs shared memory vs registers; tensor cores."
      - "The three costs: compute, memory bandwidth and overhead (Horace He's framing)."
      - "The roofline model and arithmetic intensity: when a kernel is memory-bound vs compute-bound."
      - "Precision formats: fp32, bf16, fp16, int8, fp8 — range, precision and speed."
      - "Profiling: `torch.profiler`, CUDA events for timing, Nsight Systems basics; warm-up and synchronisation pitfalls."
      - "Latency vs throughput: time-to-first-token, inter-token latency, tokens/s per GPU."
    projects:
      - title: "Roofline of your laptop or GPU"
        detail: "Measure peak matmul FLOP/s and memory bandwidth with simple PyTorch benchmarks. Plot a roofline and place matmuls of different shapes on it."
      - title: "Profile your GPT"
        detail: "Profile your from-scratch GPT's forward pass. Find the top five kernels by time, classify each as memory- or compute-bound, and try `torch.compile` to see what changes."
    signals:
      - "You can predict whether an operation is memory- or compute-bound before you measure it."
      - "Your benchmarks warm up, synchronise and report variance."
      - "You can explain why batch-1 LLM decoding barely uses a GPU's FLOPs."
  - level: Intermediate
    hours: 160
    focus: "Serve LLMs efficiently: KV-cache management, batching, serving engines and post-training quantisation, measured under realistic load."
    concepts:
      - "Prefill vs decode: compute-bound prompt processing vs bandwidth-bound token generation."
      - "KV cache memory and why it limits batch size and context length; GQA and MLA as fixes."
      - "PagedAttention and prefix caching (vLLM, SGLang RadixAttention)."
      - "Continuous (in-flight) batching vs static batching (Orca)."
      - "Weight quantisation: LLM.int8(), GPTQ, AWQ; activation quantisation with SmoothQuant; measuring quality loss."
      - "Serving engines and their knobs: vLLM, SGLang, TensorRT-LLM, llama.cpp; tensor parallelism for serving."
      - "Load testing: request distributions, SLOs on p95 TTFT and ITL, cost per million tokens."
    projects:
      - title: "Serve and load-test an open model"
        detail: "Serve a ~1–8B model with vLLM on one GPU. Load-test it at increasing concurrency and plot throughput vs p95 latency. Find the knee of the curve."
      - title: "Quantisation shoot-out"
        detail: "Compare bf16, int8, GPTQ and AWQ versions of the same model on memory, tokens/s and a small eval suite. Report quality loss next to speed-up."
      - title: "KV-cache calculator"
        detail: "Write a small tool that computes KV-cache size and maximum concurrent sequences for a given model config, GPU and context length. Check it against vLLM's logs."
    signals:
      - "You can size a GPU deployment from a model config, context length and target concurrency."
      - "You report quality alongside speed for every optimisation."
      - "You can explain what continuous batching and PagedAttention each fix."
  - level: Advanced
    hours: 240
    focus: "Write and optimise kernels: Triton first, then CUDA, then fused attention and speculative decoding."
    concepts:
      - "Triton programming model: blocks, masks, autotuning; fused element-wise and reduction kernels."
      - "CUDA fundamentals: grids, blocks, warps, shared memory, coalescing, bank conflicts, occupancy."
      - "Tiled matmul optimisation step by step (Simon Boehm's worklog) and tensor-core usage."
      - "FlashAttention: tiling, online softmax, recomputation; what FlashAttention-2 and -3 add."
      - "Speculative decoding: draft-and-verify, acceptance rates, Medusa and EAGLE-style heads."
      - "Kernel fusion and `torch.compile` / Inductor; when hand-written kernels are worth it."
    projects:
      - title: "Fused kernels in Triton"
        detail: "Write fused softmax, RMSNorm and a matmul in Triton (follow the official tutorials). Benchmark against PyTorch and explain each speed-up with the roofline."
      - title: "CUDA matmul worklog"
        detail: "Re-implement the progression from naive to tiled to register-blocked CUDA matmul. Publish your own worklog with a GFLOP/s table vs cuBLAS."
      - title: "Speculative decoding from scratch"
        detail: "Implement draft-model speculative decoding for your GPT with a smaller draft model. Measure acceptance rate and speed-up and check outputs match greedy decoding exactly."
    signals:
      - "You can read a profiler trace and turn it into a kernel optimisation plan."
      - "Your Triton or CUDA kernel reaches a respectable fraction of the vendor library."
      - "You can explain FlashAttention's online-softmax trick on a whiteboard."
  - level: Expert
    hours: 300
    focus: "Design inference systems at scale and on the edge: disaggregated serving, hardware–model co-design, and running models on phones and laptops."
    concepts:
      - "Disaggregated prefill/decode (DistServe, Mooncake) and KV-cache transfer and storage."
      - "Partitioning for inference: tensor, pipeline and expert parallelism; the maths in *Efficiently Scaling Transformer Inference*."
      - "Model–hardware co-design: MLA, MoE and FP8 in DeepSeek-V3; choosing architectures for serving cost."
      - "Autoscaling GPU fleets on Kubernetes, multi-model serving, routing by prompt length and cache hits."
      - "On-device AI: distillation, MobileLLM-style small models, 4-bit and lower quantisation, NPUs."
      - "Edge runtimes: ExecuTorch, LiteRT, Core ML, MLX, llama.cpp/GGUF, ONNX Runtime; Apple's Foundation Models framework and Gemini Nano."
      - "LLM-written kernels and benchmarks (KernelBench) — where the field is heading."
    projects:
      - title: "Prefill/decode split experiment"
        detail: "Using vLLM or SGLang features for disaggregation (or a simulation), compare co-located vs split prefill and decode under a mixed long/short prompt workload. Report goodput under latency SLOs."
      - title: "On-device assistant"
        detail: "Distil or pick a sub-1B model, quantise it to 4-bit, and run it on a phone or laptop with ExecuTorch, MLX or llama.cpp. Measure tokens/s, memory and battery or power, and compare with the cloud."
      - title: "Inference cost report"
        detail: "Write a blog post estimating cost per million tokens for one model across three deployment options (cloud GPU with vLLM, a managed API, on-device), with your measured numbers."
    signals:
      - "You can design a serving architecture for a given traffic shape, latency SLO and budget."
      - "You've shipped a model to an edge device and know which quality you traded for size."
      - "You can read a new serving or kernel paper and reproduce its key result."
connections:
  - track: deep-learning
    text: "Training choices (GQA, MoE, context length, precision) set serving cost; FlashAttention and kernels speed up training too."
  - track: cloud-engineering
    text: "GPU node pools, autoscaling, networking for tensor parallelism and secure model storage are cloud engineering."
  - track: ai-engineering
    text: "Latency and cost budgets shape every product decision: model choice, prompt length, caching and streaming."
  - track: ml-engineering
    text: "Model servers, canaries and monitoring from MLOps are how optimised models reach users safely."
  - track: foundations
    text: "Linear algebra (matmul shapes) and numerics (floating-point precision) explain quantisation and kernel behaviour."
references:
  papers:
    - title: "Roofline: An Insightful Visual Performance Model for Multicore Architectures"
      by: "Williams, Waterman & Patterson"
      year: 2009
      url: "https://doi.org/10.1145/1498765.1498785"
      note: "The model you'll use for every performance question: compute- vs memory-bound."
    - title: "Distilling the Knowledge in a Neural Network"
      by: "Hinton, Vinyals & Dean"
      year: 2015
      url: "https://arxiv.org/abs/1503.02531"
      note: "Knowledge distillation — how small, fast models learn from big ones."
    - title: "Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding"
      by: "Han, Mao & Dally"
      year: 2015
      url: "https://arxiv.org/abs/1510.00149"
      note: "Pruning, quantisation and coding: the origin of model-compression thinking."
    - title: "MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications"
      by: "Howard et al."
      year: 2017
      url: "https://arxiv.org/abs/1704.04861"
      note: "Architecture design for mobile constraints."
    - title: "Orca: A Distributed Serving System for Transformer-Based Generative Models"
      by: "Yu et al."
      year: 2022
      url: "https://www.usenix.org/conference/osdi22/presentation/yu"
      note: "Introduced iteration-level (continuous) batching."
    - title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
      by: "Dettmers et al."
      year: 2022
      url: "https://arxiv.org/abs/2208.07339"
      note: "Why outlier features break naive int8, and how to handle them."
    - title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
      by: "Frantar et al."
      year: 2022
      url: "https://arxiv.org/abs/2210.17323"
      note: "Second-order post-training weight quantisation to 3–4 bits."
    - title: "SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models"
      by: "Xiao et al."
      year: 2022
      url: "https://arxiv.org/abs/2211.10438"
      note: "Moves quantisation difficulty from activations to weights for W8A8."
    - title: "Efficiently Scaling Transformer Inference"
      by: "Pope et al."
      year: 2022
      url: "https://arxiv.org/abs/2211.05102"
      note: "The partitioning and memory maths of large-model inference."
    - title: "Fast Inference from Transformers via Speculative Decoding"
      by: "Leviathan et al."
      year: 2022
      url: "https://arxiv.org/abs/2211.17192"
      note: "Draft-then-verify decoding with identical outputs."
    - title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
      by: "Dao et al."
      year: 2022
      url: "https://arxiv.org/abs/2205.14135"
      note: "IO-aware attention; the canonical example of kernel thinking."
    - title: "Accelerating Large Language Model Decoding with Speculative Sampling"
      by: "Chen et al."
      year: 2023
      url: "https://arxiv.org/abs/2302.01318"
      note: "DeepMind's independent speculative-sampling formulation."
    - title: "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
      by: "Lin et al."
      year: 2023
      url: "https://arxiv.org/abs/2306.00978"
      note: "Protect the salient weights; widely used 4-bit method."
    - title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"
      by: "Dao"
      year: 2023
      url: "https://arxiv.org/abs/2307.08691"
      note: "Better work partitioning across warps and blocks."
    - title: "Efficient Memory Management for Large Language Model Serving with PagedAttention"
      by: "Kwon et al."
      year: 2023
      url: "https://arxiv.org/abs/2309.06180"
      note: "vLLM: virtual-memory-style paging for the KV cache."
    - title: "SGLang: Efficient Execution of Structured Language Model Programs"
      by: "Zheng et al."
      year: 2023
      url: "https://arxiv.org/abs/2312.07104"
      note: "RadixAttention for automatic KV-cache reuse across requests."
    - title: "Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads"
      by: "Cai et al."
      year: 2024
      url: "https://arxiv.org/abs/2401.10774"
      note: "Speculative decoding without a separate draft model."
    - title: "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving"
      by: "Zhong et al."
      year: 2024
      url: "https://arxiv.org/abs/2401.09670"
      note: "Why prefill and decode belong on different GPUs."
    - title: "MobileLLM: Optimizing Sub-billion Parameter Language Models for On-Device Use Cases"
      by: "Liu et al., Meta"
      year: 2024
      url: "https://arxiv.org/abs/2402.14905"
      note: "Deep-and-thin architectures for sub-1B on-device models."
    - title: "Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving"
      by: "Qin et al."
      year: 2024
      url: "https://arxiv.org/abs/2407.00079"
      note: "Serving designed around storing and moving the KV cache."
    - title: "FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision"
      by: "Shah et al."
      year: 2024
      url: "https://arxiv.org/abs/2407.08608"
      note: "Hopper-specific asynchrony and FP8."
    - title: "DeepSeek-V3 Technical Report"
      by: "DeepSeek-AI"
      year: 2024
      url: "https://arxiv.org/abs/2412.19437"
      note: "MLA, MoE and FP8: architecture co-designed with inference cost."
    - title: "EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test"
      by: "Li et al."
      year: 2025
      url: "https://arxiv.org/abs/2503.01840"
      note: "A state-of-the-art speculative decoding method."
    - title: "Apple Intelligence Foundation Language Models: Tech Report 2025"
      by: "Apple"
      year: 2025
      url: "https://arxiv.org/abs/2507.13575"
      note: "How a production on-device model stack is designed."
  courses:
    - title: "GPU MODE lectures"
      by: "GPU MODE community"
      url: "https://github.com/gpu-mode/lectures"
      note: "The best community course on writing and profiling GPU kernels."
    - title: "MIT 6.5940: TinyML and Efficient Deep Learning Computing"
      by: "Song Han, MIT"
      year: 2024
      url: "https://hanlab.mit.edu/courses/2024-fall-65940"
      note: "Quantisation, pruning, distillation and efficient LLM inference."
  books:
    - title: "Programming Massively Parallel Processors (4th ed.)"
      by: "Hwu, Kirk & El Hajj"
      year: 2022
      url: "https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0"
      note: "The CUDA textbook."
    - title: "How to Scale Your Model"
      by: "Google DeepMind (Austin et al.)"
      year: 2025
      url: "https://jax-ml.github.io/scaling-book/"
      note: "Rooflines and the arithmetic of serving at scale."
    - title: "TinyML"
      by: "Pete Warden & Daniel Situnayake"
      year: 2019
      url: "https://www.oreilly.com/library/view/tinyml/9781492052036/"
      note: "ML on microcontrollers: the extreme end of on-device."
  articles:
    - title: "Making Deep Learning Go Brrrr From First Principles"
      by: "Horace He"
      url: "https://horace.io/brrr_intro.html"
      note: "Compute, memory and overhead — the essay to read first."
    - title: "How to Optimize a CUDA Matmul Kernel for cuBLAS-like Performance"
      by: "Simon Boehm"
      year: 2022
      url: "https://siboehm.com/articles/22/CUDA-MMM"
      note: "A step-by-step kernel worklog to follow and reproduce."
    - title: "GPU Glossary"
      by: "Modal"
      url: "https://modal.com/gpu-glossary"
      note: "Plain-language definitions of GPU hardware and software terms."
    - title: "CUDA Programming Guide"
      by: "NVIDIA"
      url: "https://docs.nvidia.com/cuda/cuda-programming-guide/"
      note: "The official reference for the CUDA programming model."
    - title: "Triton tutorials"
      by: "Triton"
      url: "https://triton-lang.org/main/getting-started/tutorials/index.html"
      note: "Write GPU kernels in Python: vector add → fused softmax → matmul."
    - title: "vLLM documentation"
      by: "vLLM project"
      url: "https://docs.vllm.ai/"
      note: "The most widely used open LLM serving engine."
    - title: "SGLang documentation"
      by: "SGLang project"
      url: "https://docs.sglang.io/"
      note: "Fast serving with prefix caching and structured generation."
    - title: "TensorRT-LLM documentation"
      by: "NVIDIA"
      url: "https://nvidia.github.io/TensorRT-LLM/"
      note: "NVIDIA's optimised inference library."
    - title: "llama.cpp"
      by: "ggml-org"
      url: "https://github.com/ggml-org/llama.cpp"
      note: "CPU and edge inference with GGUF quantisation."
    - title: "ExecuTorch documentation"
      by: "PyTorch"
      url: "https://docs.pytorch.org/executorch/stable/index.html"
      note: "PyTorch's on-device runtime for phones and embedded."
    - title: "LiteRT"
      by: "Google AI Edge"
      url: "https://ai.google.dev/edge/litert"
      note: "The successor to TensorFlow Lite for on-device inference."
    - title: "MLX documentation"
      by: "Apple ml-explore"
      url: "https://ml-explore.github.io/mlx/build/html/index.html"
      note: "Array framework for Apple silicon; great for local LLMs."
    - title: "Core ML"
      by: "Apple"
      url: "https://developer.apple.com/documentation/coreml"
      note: "Deploy models in Apple apps."
    - title: "ONNX Runtime documentation"
      by: "Microsoft"
      url: "https://onnxruntime.ai/docs/"
      note: "Cross-platform inference runtime."
    - title: "KernelBench"
      by: "Stanford Scaling Intelligence Lab"
      url: "https://github.com/ScalingIntelligence/KernelBench"
      note: "Can LLMs write fast GPU kernels? A benchmark to watch."
---

## Where inference time goes

An LLM request has two phases with very different performance:

```mermaid
flowchart TB
  subgraph PRE["Prefill — process the whole prompt at once"]
    direction LR
    P1["prompt tokens"] --> P2["big matmuls<br/>compute-bound"] --> P3["write KV cache"]
  end
  subgraph DEC["Decode — one token at a time"]
    direction LR
    D1["read all weights<br/>+ KV cache"] --> D2["tiny matmuls<br/>memory-bound"] --> D3["next token"]
  end
  PRE -- "time to first token" --> DEC
  D3 -- "repeat until done" --> D1
```

**Prefill** processes many tokens in parallel, so it keeps the tensor cores busy. **Decode** generates one token per step but must stream every weight (and the KV cache) from memory each time. Most serving tricks attack decode's memory problem: batching more sequences together, shrinking the weights (quantisation), shrinking the KV cache (GQA, MLA, paging), or producing several tokens per weight-read (speculative decoding).

## The roofline model

The **arithmetic intensity** of an operation is the work done per byte moved:

$$
I = \frac{\text{FLOPs}}{\text{bytes moved}}
$$

A GPU has a peak compute $P$ (FLOP/s) and a memory bandwidth $B$ (bytes/s). Achievable performance is

$$
\text{performance} = \min\left(P,\ I \cdot B\right)
$$

The crossover point $I^\star = P / B$ is the *ridge point*. For a modern data-centre GPU with roughly $10^{15}$ bf16 FLOP/s and about $3 \times 10^{12}$ bytes/s of HBM bandwidth, $I^\star \approx 300$ FLOPs per byte. A matrix–vector product at batch size 1 has $I \approx 1$, so it uses well under 1% of the compute. That's why batching helps so much: a batch of $b$ sequences reuses each weight $b$ times and raises intensity roughly $b$-fold.

## The KV cache is the memory budget

During decoding each layer stores a key and a value vector for every previous token. Its size is

$$
\text{KV bytes} = 2 \cdot n_{\text{layers}} \cdot n_{\text{kv heads}} \cdot d_{\text{head}} \cdot L_{\text{seq}} \cdot b \cdot \text{bytes per element}
$$

**Example:** a Llama-3-8B-style model has 32 layers, 8 KV heads (thanks to GQA) and $d_{\text{head}} = 128$. In bf16 that's $2 \cdot 32 \cdot 8 \cdot 128 \cdot 2 = 131{,}072$ bytes ≈ 128 KiB **per token**. A batch of 16 sequences at 8k tokens needs about 16 GiB, the same order as the 16 GB of weights. Without GQA (32 KV heads) it would be four times larger. This is why PagedAttention (no wasted, fragmented cache memory) and prefix caching (share the cache for common system prompts) give such large throughput gains.

## A quick upper bound on decode speed

At small batch sizes, each decode step reads all the weights once, so

$$
\text{tokens/s} \lesssim \frac{B}{\text{bytes of weights}}
$$

An 8B-parameter model in bf16 is about 16 GB; with about 3 TB/s of bandwidth that's at most roughly 190 tokens/s for a single sequence, whatever the FLOPs. Quantising to 4-bit cuts the bytes about 4×, which is why int4 models feel so much faster on the same hardware. The same formula explains on-device speeds: a laptop with 100–400 GB/s of memory bandwidth running a 4 GB model tops out around 25–100 tokens/s.

## Kernels: from Triton to CUDA

Start in **Triton**: you write block-level Python and the compiler handles threads and shared memory. Fused kernels such as softmax and RMSNorm give big wins because they cut round-trips to HBM. Move to **CUDA** when you need full control. Work through a matmul from naive to tiled to register-blocked, and learn coalescing, shared-memory tiling and occupancy along the way. FlashAttention is the capstone: it uses the same tiling ideas plus an *online softmax* that lets attention run block by block without ever storing the full $T \times T$ score matrix.

## On-device and edge AI

Running models on phones and laptops is the same discipline under tighter limits: a few GB of memory, a power budget, and an NPU or GPU that's shared with the rest of the device.

| Lever | What it does | Tools |
| --- | --- | --- |
| Smaller architecture | deep-and-thin sub-1B models | MobileLLM, Gemma 3n |
| Distillation | small model learns from a big one | Hinton et al. 2015 |
| Low-bit quantisation | 4-bit or lower weights | GGUF (llama.cpp), MLX, ExecuTorch |
| Runtime | uses the device's NPU/GPU | ExecuTorch, LiteRT, Core ML, ONNX Runtime |
| Platform models | OS-provided on-device LLMs | Apple Foundation Models framework, Gemini Nano |

The hybrid pattern is becoming standard: a small on-device model handles private, low-latency tasks and routes hard requests to the cloud. Designing that routing (latency, privacy, cost) is where the inference and [AI Engineering](/roadmaps/ai-engineering/) tracks meet.
