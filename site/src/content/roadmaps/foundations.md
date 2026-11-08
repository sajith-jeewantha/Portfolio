---
title: Math & Physics Foundations for ML
short: Foundations
order: 1
icon: sigma
tier: foundation
summary: "The math that deep learning actually uses — linear algebra, multivariable calculus, probability, optimisation, information theory — plus the physics ideas (energy, statistical mechanics, diffusion) behind modern generative models."
updated: 2026-11-07
overview: "Every ML system is a few mathematical ideas wearing engineering clothes. A neural network is a chain of matrix multiplications (linear algebra), trained by following gradients (calculus) of a loss that is really a negative log-likelihood (probability), using an optimiser whose behaviour depends on curvature (optimisation), and judged by quantities like cross-entropy and KL divergence (information theory). Diffusion models, Hopfield networks and Boltzmann machines borrow directly from statistical physics. This track teaches that math *in service of ML*: each topic is paired with the exact place it appears in a model you'll build, so you learn it once, for a reason, and it sticks."
why2027: "As AI tools write more of the routine code, the scarce skill is *understanding* — reading a new paper, debugging a training run, judging whether an eval result is real. All three depend on math. Research-heavy roles (training, post-training, inference optimisation, interpretability) explicitly screen for it, and the 2024 Nobel Prize in Physics, awarded to Hopfield and Hinton, recognised how deeply ML is rooted in physics. You don't need a math degree; you need fluent, working intuition for about a dozen ideas, and the ability to follow a derivation in a paper."
demand:
  - claim: "AI skills now appear in 2.5% of all US job postings, up 55% in a year; Python and ML frameworks lead the specialised skills."
    source: "Lightcast for the Stanford AI Index 2026"
    url: "https://lightcast.io/resources/research/stanford-ai-index-2026"
  - claim: "The 2024 Nobel Prize in Physics went to Hopfield and Hinton for foundational discoveries enabling machine learning with artificial neural networks."
    source: "Nobel Prize press release, 2024"
    url: "https://www.nobelprize.org/prizes/physics/2024/press-release/"
prerequisites:
  - "High-school algebra and functions. Comfort with summation notation is *not* needed yet — we build it."
  - "Python and NumPy, so every idea can be checked numerically."
  - "Patience: work problems with pen and paper, then verify them in code."
diagram: |
  flowchart TB
    P["Prereqs: algebra · Python · NumPy"] --> B
    subgraph B["1 · Beginner — the working toolkit"]
      direction LR
      B1["vectors & matrices"] --> B2["derivatives & chain rule"] --> B3["probability basics"]
    end
    subgraph I["2 · Intermediate — math of training"]
      direction LR
      I1["gradients & Jacobians"] --> I2["MLE · MAP · Bayes"] --> I3["SVD & eigenvalues"] --> I4["gradient descent"]
    end
    subgraph A["3 · Advanced — reading papers"]
      direction LR
      A1["entropy · KL"] --> A2["convexity & curvature"] --> A3["matrix calculus"] --> A4["sampling & Monte Carlo"]
    end
    subgraph E["4 · Expert — physics of generative models"]
      direction LR
      E1["energy-based models"] --> E2["statistical mechanics"] --> E3["SDEs & diffusion"] --> E4["flow matching"]
    end
    B --> I --> A --> E
    I -.-> ML["ML Engineering"]
    A -.-> DL["Deep Learning"]
    E -.-> DL
stages:
  - level: Beginner
    hours: 110
    focus: "Build a working toolkit: vectors, matrices, derivatives and basic probability — always connected to a line of NumPy you can run."
    concepts:
      - "Vectors, dot products, norms and cosine similarity (the math of embeddings and vector search)."
      - "Matrices as linear maps; matrix–vector and matrix–matrix multiplication; shapes and transposes."
      - "Derivatives, the power/product/chain rules, and reading a derivative as *sensitivity*."
      - "Partial derivatives and the gradient as the direction of steepest increase."
      - "Random variables, PMFs/PDFs, expectation and variance; Bernoulli, categorical and Gaussian distributions."
      - "Conditional probability and Bayes' rule."
      - "Logs and exponentials: why we work with log-probabilities."
    projects:
      - title: "Linear algebra in NumPy, by hand first"
        detail: "Implement dot product, matrix multiply and cosine similarity in pure Python, then compare with NumPy for speed and correctness. Visualise 2×2 matrices as transformations of a grid (3Blue1Brown style)."
      - title: "Numerical vs analytic gradients"
        detail: "Write a finite-difference gradient checker and use it to verify hand-derived gradients of `sigmoid(w*x + b)` and of mean-squared error."
      - title: "Simulate the central limit theorem"
        detail: "Sample from uniform, exponential and Bernoulli distributions; plot sample means for growing sample size and watch them become Gaussian."
    signals:
      - "You can explain what a matrix *does* to a vector, not just how to multiply it."
      - "You can differentiate a composition of functions with the chain rule without looking anything up."
      - "You can compute an expectation and a conditional probability for a small example by hand."
  - level: Intermediate
    hours: 150
    focus: "The math of training: gradients of vector functions, likelihood-based losses, matrix decompositions and gradient descent."
    concepts:
      - "Jacobians and the multivariable chain rule; computational graphs and reverse-mode autodiff."
      - "Maximum likelihood estimation; why cross-entropy and MSE *are* negative log-likelihoods."
      - "MAP estimation and priors: L2 weight decay as a Gaussian prior, L1 as a Laplace prior."
      - "Eigenvalues/eigenvectors, symmetric matrices and positive (semi-)definiteness."
      - "Singular value decomposition, rank and low-rank approximation (PCA, LoRA)."
      - "Gradient descent, learning rate, and convergence on a quadratic bowl; condition number."
      - "Softmax, log-sum-exp and numerical stability."
    projects:
      - title: "Logistic regression from scratch"
        detail: "Derive the gradient of the binary cross-entropy loss, implement gradient descent in NumPy, and verify against scikit-learn. Add L2 regularisation and show it equals a Gaussian prior (MAP)."
      - title: "SVD image compression and PCA"
        detail: "Compress an image with truncated SVD at ranks 5, 20, 50; plot reconstruction error vs rank. Then run PCA on MNIST and visualise the top components."
      - title: "Gradient descent on ill-conditioned bowls"
        detail: "Minimise the quadratic `f(x) = 0.5 * x.T @ A @ x` for matrices with condition numbers 1, 10 and 1000. Plot the zig-zag and relate the convergence speed to the eigenvalues of `A`."
    signals:
      - "You can derive the softmax cross-entropy gradient (`p - y`) on paper."
      - "You can explain why a low-rank update `B @ A` has far fewer parameters than a full matrix."
      - "You can say why a badly conditioned problem makes gradient descent slow."
  - level: Advanced
    hours: 170
    focus: "Read ML papers comfortably: information theory, convexity and curvature, matrix calculus, and sampling."
    concepts:
      - "Entropy, cross-entropy and KL divergence; why KL is asymmetric and when that matters."
      - "Mutual information and the information bottleneck intuition; perplexity as exponentiated cross-entropy."
      - "Convex sets and functions, Lagrange multipliers, duality basics (Boyd ch. 2–5)."
      - "Hessians, curvature, saddle points; second-order intuition behind Adam and preconditioning."
      - "Matrix calculus identities: gradients of traces, log-determinants and quadratic forms (Matrix Cookbook)."
      - "Monte Carlo estimation, importance sampling, the reparameterisation trick."
      - "Markov chains, stationary distributions, MCMC (Metropolis–Hastings) basics."
    projects:
      - title: "Derive and implement DPO's loss"
        detail: "Starting from the KL-regularised RLHF objective, follow the DPO paper's derivation of the optimal policy and the resulting loss. Implement it in 20 lines of PyTorch on toy log-probs."
      - title: "Variational autoencoder from scratch"
        detail: "Derive the ELBO, implement a VAE on MNIST with the reparameterisation trick, and plot the KL and reconstruction terms separately during training."
      - title: "Sampling lab"
        detail: "Estimate pi and an integral with Monte Carlo, then sample a 2D banana-shaped density with Metropolis–Hastings. Plot error vs number of samples (it shrinks like one over the square root of n)."
    signals:
      - "You can follow the math section of a typical NeurIPS/ICLR paper and reproduce one derivation."
      - "You can explain the KL penalty in RLHF and what happens if its weight (beta) is too small or too large."
      - "You compute gradients of matrix expressions without element-by-element expansion."
  - level: Expert
    hours: 200
    focus: "The physics behind modern generative models: energy-based models, statistical mechanics, stochastic differential equations and diffusion."
    concepts:
      - "Energy-based models: probability proportional to exp(−energy), partition functions and why they are hard."
      - "Boltzmann distribution, temperature and free energy; softmax as a Boltzmann distribution."
      - "Hopfield networks and their energy; modern Hopfield networks and their equivalence to attention."
      - "Score functions (the gradient of log-density), score matching and Langevin dynamics."
      - "Brownian motion and SDEs; the forward noising process and its reverse-time SDE."
      - "Denoising diffusion (DDPM) as a variational model; probability-flow ODEs; flow matching."
      - "Statistical mechanics of learning: loss landscapes, phase transitions and why physicists study deep nets."
    projects:
      - title: "Hopfield memory and attention"
        detail: "Implement a classical Hopfield network that stores and recovers binary patterns, then a modern (continuous) Hopfield update and show it is one step of softmax attention."
      - title: "Langevin sampler on a 2D mixture"
        detail: "Train a small network with denoising score matching on a 2D Gaussian mixture; sample with annealed Langevin dynamics and animate the particles."
      - title: "Tiny DDPM, then flow matching"
        detail: "Train a DDPM on MNIST or a 2D toy dataset following Ho et al. Then train a flow-matching model on the same data and compare sample quality vs number of steps."
      - title: "Write the explainer"
        detail: "Publish a blog post deriving the DDPM loss from the ELBO in your own notation, with code. Link it from this roadmap."
    signals:
      - "You can explain diffusion as both a Markov chain of Gaussians and as an SDE."
      - "You can relate temperature in sampling to temperature in statistical mechanics."
      - "You can read the score-SDE or flow-matching paper and reimplement its core training loop."
connections:
  - track: deep-learning
    text: "Backprop is the chain rule; attention is softmax over dot products; DPO, RLHF and GRPO are written in the language of KL divergence and expectations."
  - track: ml-engineering
    text: "MLE, regularisation, bias–variance and evaluation statistics (confidence intervals, A/B tests) underpin every classical model you ship."
  - track: inference-gpu
    text: "Quantisation is numerical analysis; rooflines are arithmetic intensity; low-rank and sparsity come straight from linear algebra."
  - track: ai-engineering
    text: "Embeddings, cosine similarity and nearest-neighbour search are linear algebra; eval statistics decide whether a prompt change really helped."
  - track: ai-security-safety
    text: "Interpretability (superposition, sparse autoencoders) is applied linear algebra; adversarial examples are optimisation against the model."
references:
  papers:
    - title: "Neural networks and physical systems with emergent collective computational abilities"
      by: "J. J. Hopfield"
      year: 1982
      url: "https://doi.org/10.1073/pnas.79.8.2554"
      note: "Memory as minima of an energy function — the start of physics-inspired neural nets."
    - title: "A Learning Algorithm for Boltzmann Machines"
      by: "Ackley, Hinton & Sejnowski"
      year: 1985
      url: "https://doi.org/10.1207/s15516709cog0901_7"
      note: "Learning with the Boltzmann distribution; statistical mechanics meets neural networks."
    - title: "A Tutorial on Energy-Based Learning"
      by: "LeCun et al."
      year: 2006
      url: "http://yann.lecun.com/exdb/publis/pdf/lecun-06.pdf"
      note: "One framework that covers many losses as shaping an energy landscape."
    - title: "Deep Unsupervised Learning using Nonequilibrium Thermodynamics"
      by: "Sohl-Dickstein et al."
      year: 2015
      url: "https://arxiv.org/abs/1503.03585"
      note: "The origin of diffusion models, explicitly built on non-equilibrium physics."
    - title: "The Matrix Calculus You Need For Deep Learning"
      by: "Parr & Howard"
      year: 2018
      url: "https://arxiv.org/abs/1802.01528"
      note: "Gradients of vector and matrix functions, explained for practitioners."
    - title: "Generative Modeling by Estimating Gradients of the Data Distribution"
      by: "Song & Ermon"
      year: 2019
      url: "https://arxiv.org/abs/1907.05600"
      note: "Score matching plus Langevin dynamics as a generative model."
    - title: "Denoising Diffusion Probabilistic Models"
      by: "Ho et al."
      year: 2020
      url: "https://arxiv.org/abs/2006.11239"
      note: "DDPM — the simple noise-prediction loss behind modern image models."
    - title: "Hopfield Networks is All You Need"
      by: "Ramsauer et al."
      year: 2020
      url: "https://arxiv.org/abs/2008.02217"
      note: "Modern Hopfield networks' update rule is the Transformer's attention."
    - title: "Score-Based Generative Modeling through Stochastic Differential Equations"
      by: "Song et al."
      year: 2020
      url: "https://arxiv.org/abs/2011.13456"
      note: "Unifies diffusion and score models as forward and reverse-time SDEs."
    - title: "Statistical Mechanics of Deep Learning"
      by: "Bahri et al."
      year: 2020
      url: "https://doi.org/10.1146/annurev-conmatphys-031119-050745"
      note: "Survey of what physics says about loss landscapes, generalisation and dynamics."
    - title: "Flow Matching for Generative Modeling"
      by: "Lipman et al."
      year: 2022
      url: "https://arxiv.org/abs/2210.02747"
      note: "Simulation-free training of continuous flows; the successor to diffusion in many systems."
    - title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
      by: "Rafailov et al."
      year: 2023
      url: "https://arxiv.org/abs/2305.18290"
      note: "A clean, readable derivation that uses KL, Bradley–Terry and a closed-form optimum — great Advanced-stage practice."
  courses:
    - title: "Essence of Linear Algebra"
      by: "3Blue1Brown"
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
      note: "Geometric intuition first. Watch before any textbook."
    - title: "Essence of Calculus"
      by: "3Blue1Brown"
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
      note: "Derivatives and the chain rule as pictures."
    - title: "Neural Networks"
      by: "3Blue1Brown"
      url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi"
      note: "Backprop and Transformers visualised — the bridge from math to models."
    - title: "MIT 18.06 Linear Algebra"
      by: "Gilbert Strang, MIT OpenCourseWare"
      year: 2010
      url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/"
      note: "The classic course; do the problem sets for the Intermediate stage."
    - title: "MIT 18.02SC Multivariable Calculus"
      by: "MIT OpenCourseWare"
      year: 2010
      url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/"
      note: "Partial derivatives, gradients, Jacobians and Lagrange multipliers."
    - title: "Stat 110: Probability"
      by: "Joe Blitzstein, Harvard"
      url: "https://stat110.hsites.harvard.edu/"
      note: "The best introductory probability course, with a free textbook."
  books:
    - title: "Mathematics for Machine Learning"
      by: "Deisenroth, Faisal & Ong"
      year: 2020
      url: "https://mml-book.github.io/"
      note: "The core text for this track — free, and written exactly for ML."
    - title: "Linear Algebra and Learning from Data"
      by: "Gilbert Strang"
      year: 2019
      url: "https://math.mit.edu/~gs/learningfromdata/"
      note: "SVD, low-rank approximation and optimisation aimed at deep learning."
    - title: "Convex Optimization"
      by: "Boyd & Vandenberghe"
      year: 2004
      url: "https://web.stanford.edu/~boyd/cvxbook/"
      note: "Chapters 2–5 for convexity, duality and Lagrange multipliers; free PDF."
    - title: "Elements of Information Theory (2nd ed.)"
      by: "Cover & Thomas"
      year: 2006
      url: "https://www.wiley.com/en-us/Elements+of+Information+Theory%2C+2nd+Edition-p-9780471241959"
      note: "The standard reference on entropy, KL divergence and coding."
    - title: "Information Theory, Inference, and Learning Algorithms"
      by: "David MacKay"
      year: 2003
      url: "https://www.inference.org.uk/itila/book.html"
      note: "Information theory and Bayesian inference together, with wit; free."
    - title: "Pattern Recognition and Machine Learning"
      by: "Christopher Bishop"
      year: 2006
      url: "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/"
      note: "The probabilistic view of ML: MLE, MAP, Bayesian models; free PDF."
    - title: "Probabilistic Machine Learning (Introduction and Advanced Topics)"
      by: "Kevin Murphy"
      year: 2022
      url: "https://probml.github.io/pml-book/"
      note: "Comprehensive modern reference, including diffusion and EBMs; free."
    - title: "Understanding Deep Learning"
      by: "Simon J. D. Prince"
      year: 2023
      url: "https://udlbook.github.io/udlbook/"
      note: "Clear chapters on diffusion, flows and VAEs with just the math you need."
    - title: "The Matrix Cookbook"
      by: "Petersen & Pedersen"
      url: "https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf"
      note: "A lookup table of matrix identities and derivatives — keep it open."
  articles:
    - title: "Calculus on Computational Graphs: Backpropagation"
      by: "Chris Olah"
      year: 2015
      url: "https://colah.github.io/posts/2015-08-Backprop/"
      note: "Why reverse-mode autodiff is efficient, in one short read."
    - title: "The Matrix Calculus You Need For Deep Learning (HTML)"
      by: "Terence Parr & Jeremy Howard"
      url: "https://explained.ai/matrix-calculus/"
      note: "The readable web version of the paper above."
    - title: "Generative Modeling by Estimating Gradients of the Data Distribution (blog)"
      by: "Yang Song"
      year: 2021
      url: "https://yang-song.net/blog/2021/score/"
      note: "The clearest introduction to score-based models and SDEs."
    - title: "What are Diffusion Models?"
      by: "Lilian Weng"
      year: 2021
      url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/"
      note: "Diffusion math derived step by step, with all the notation in one place."
    - title: "The Nobel Prize in Physics 2024 — press release"
      by: "The Royal Swedish Academy of Sciences"
      year: 2024
      url: "https://www.nobelprize.org/prizes/physics/2024/press-release/"
      note: "A short, accessible account of how Hopfield networks and Boltzmann machines came from physics."
---

## The concept map

You don't need all of mathematics. You need these ideas, and you need to see *where each one lives* in a model. Read the map left to right: each box is something you learn, and the arrow points to where it shows up in ML.

```mermaid
flowchart LR
  subgraph LA["Linear algebra"]
    direction TB
    la1["dot product · norms"]
    la2["matrix multiply"]
    la3["eigen · SVD · rank"]
  end
  subgraph CA["Calculus"]
    direction TB
    ca1["chain rule"]
    ca2["gradients · Jacobians"]
    ca3["Hessian · curvature"]
  end
  subgraph PR["Probability & stats"]
    direction TB
    pr1["distributions · expectation"]
    pr2["MLE · MAP · Bayes"]
    pr3["sampling · Monte Carlo"]
  end
  subgraph IT["Information theory"]
    direction TB
    it1["entropy · cross-entropy"]
    it2["KL divergence"]
  end
  subgraph PH["Physics"]
    direction TB
    ph1["energy · Boltzmann"]
    ph2["Langevin · SDEs"]
  end
  la1 --> E1["embeddings · attention scores"]
  la2 --> E2["every layer of a network"]
  la3 --> E3["LoRA · PCA · conditioning"]
  ca1 --> E4["backpropagation"]
  ca3 --> E5["optimisers · learning rates"]
  pr2 --> E6["loss functions · weight decay"]
  pr3 --> E7["VAEs · RL policy gradients"]
  it1 --> E8["LM training loss · perplexity"]
  it2 --> E9["RLHF · DPO · distillation"]
  ph1 --> E10["softmax · temperature · Hopfield"]
  ph2 --> E11["diffusion models"]
```

## Linear algebra: the language of layers

A dense layer is a matrix–vector product plus a bias:

$$
h = \sigma(Wx + b), \qquad W \in \mathbb{R}^{d_\text{out} \times d_\text{in}}
$$

**Why it matters — embeddings and attention.** An embedding is a vector, and "similar meaning" is measured with the dot product or cosine similarity:

$$
\cos(u, v) = \frac{u^\top v}{\lVert u \rVert\, \lVert v \rVert}
$$

That is the whole of vector search in [AI Engineering](/roadmaps/ai-engineering/), and attention scores $QK^\top$ are just a matrix of dot products between queries and keys.

**Why it matters — SVD and LoRA.** Any matrix factorises as $W = U \Sigma V^\top$, where the singular values in $\Sigma$ say how much each direction matters. Keeping only the top $r$ gives the best rank-$r$ approximation (Eckart–Young). LoRA bets that the *change* needed to fine-tune a model is low-rank too:

$$
W' = W + \Delta W = W + BA, \qquad B \in \mathbb{R}^{d \times r},\ A \in \mathbb{R}^{r \times k},\ r \ll \min(d, k)
$$

For a $4096 \times 4096$ matrix and $r = 16$, that's about $131\text{k}$ trainable numbers instead of $16.8\text{M}$, a 128× reduction.

**Why it matters — eigenvalues and conditioning.** For a symmetric matrix, the eigen-decomposition $A = Q\Lambda Q^\top$ tells you how it stretches space. The *condition number* $\kappa = \lambda_\text{max} / \lambda_\text{min}$ of a loss surface's curvature decides how fast gradient descent converges: high $\kappa$ means a long, narrow valley and zig-zagging steps. This is why normalisation layers and adaptive optimisers like Adam exist.

## Calculus: the chain rule *is* backpropagation

For a composition $L = f(g(h(x)))$ the chain rule says

$$
\frac{\partial L}{\partial x} = \frac{\partial f}{\partial g}\cdot\frac{\partial g}{\partial h}\cdot\frac{\partial h}{\partial x}
$$

A neural network is a long composition of layers, so the gradient of the loss with respect to any weight is a product of local derivatives. **Backpropagation** is just computing that product right to left, reusing intermediate results. That's why it costs about as much as one forward pass, rather than one pass *per parameter*.

With vectors, each local derivative becomes a **Jacobian** matrix $J_{ij} = \partial y_i / \partial x_j$, and backprop multiplies vectors by Jacobians ("vector–Jacobian products"). The single most useful result to derive yourself is the softmax cross-entropy gradient. With logits $z$, probabilities $p = \operatorname{softmax}(z)$ and one-hot target $y$:

$$
\frac{\partial}{\partial z}\left(-\sum_k y_k \log p_k\right) = p - y
$$

It's beautifully simple, and it's the gradient at the top of every language model.

**Second order.** The Hessian $H = \nabla^2 L$ describes curvature. Near a minimum, $L(\theta + \delta) \approx L(\theta) + \tfrac12 \delta^\top H \delta$; the largest eigenvalue of $H$ caps the stable learning rate at about $2/\lambda_\text{max}$. Learning-rate warmup and "edge of stability" effects are about this number.

## Probability: every loss is a likelihood

**Maximum likelihood.** Given data $\{x_i\}$ and a model $p_\theta$, MLE picks

$$
\theta^\star = \arg\max_\theta \sum_i \log p_\theta(x_i) = \arg\min_\theta \underbrace{-\frac1n \sum_i \log p_\theta(x_i)}_{\text{negative log-likelihood}}
$$

**Why it matters.** If the model outputs a categorical distribution, the NLL *is* cross-entropy, the loss of every classifier and language model. If it outputs a Gaussian mean with fixed variance, the NLL is (up to constants) mean-squared error. Choosing a loss means choosing a noise model.

**MAP and weight decay.** Adding a prior $p(\theta)$ and maximising the posterior gives MAP:

$$
\arg\max_\theta \left[\log p(\text{data}\mid\theta) + \log p(\theta)\right]
$$

With a Gaussian prior $\theta \sim \mathcal{N}(0, \sigma^2 I)$, $\log p(\theta) = -\frac{1}{2\sigma^2}\lVert\theta\rVert^2 + \text{const}$, which is exactly **L2 weight decay**. A Laplace prior gives L1 (sparsity).

**Statistics for evals.** A benchmark score is an estimate. With $n$ questions and accuracy $\hat p$, the standard error is $\sqrt{\hat p(1-\hat p)/n}$; on 500 questions at 70%, that's about ±2 points (95% interval ≈ ±4). Many "improvements" on small eval sets are noise.

## Optimisation: from gradient descent to Adam

Plain gradient descent is $\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)$. Stochastic gradient descent uses a mini-batch estimate of $\nabla L$, which is noisy but cheap and, helpfully, acts as a regulariser.

Adam keeps running averages of the gradient and its square:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t,\quad v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2,\quad \theta_{t+1} = \theta_t - \eta\,\frac{\hat m_t}{\sqrt{\hat v_t} + \epsilon}
$$

Dividing by $\sqrt{v_t}$ rescales each coordinate. It's a cheap, diagonal stand-in for curvature, which helps on the ill-conditioned surfaces from the linear algebra section.

**Convexity.** For convex problems (linear and logistic regression, SVMs) every local minimum is global, and theory guarantees convergence. Deep networks aren't convex, but convex ideas still guide practice: Lagrange multipliers explain constrained objectives like the KL-constrained RLHF problem, and duality explains why some losses have closed-form optima.

## Information theory: entropy, cross-entropy and KL

The **entropy** of a distribution is its average surprise, $H(p) = -\sum_x p(x)\log p(x)$. The **cross-entropy** of model $q$ under true distribution $p$ is $H(p, q) = -\sum_x p(x)\log q(x)$, and the gap between them is the **KL divergence**:

$$
\mathrm{KL}(p\,\|\,q) = \sum_x p(x)\log\frac{p(x)}{q(x)} = H(p, q) - H(p) \ \ge 0
$$

**Why it matters — three places you'll meet KL:**

1. **Language-model training.** $H(p)$ of the data is fixed, so minimising cross-entropy minimises $\mathrm{KL}(p_\text{data}\,\|\,p_\theta)$. Perplexity $= e^{H}$ is "how many tokens the model is effectively choosing between".
2. **RLHF and DPO.** The objective $\mathbb{E}[r(x,y)] - \beta\,\mathrm{KL}(\pi_\theta\,\|\,\pi_\text{ref})$ rewards good answers but charges for drifting from the reference model. DPO's loss comes straight from the closed-form optimum of this objective (see [Deep Learning](/roadmaps/deep-learning/)).
3. **Distillation and VAEs.** Knowledge distillation minimises KL between teacher and student distributions; a VAE's ELBO contains a KL term that keeps the latent code close to a prior.

KL is *asymmetric*. $\mathrm{KL}(p\|q)$ ("forward", mass-covering) punishes $q$ for missing modes of $p$; $\mathrm{KL}(q\|p)$ ("reverse", mode-seeking) punishes $q$ for putting mass where $p$ has none. The direction you choose changes the behaviour you get.

## Physics I: energy, temperature and the Boltzmann distribution

Statistical mechanics says a system in equilibrium at temperature $T$ occupies state $x$ with probability

$$
p(x) = \frac{e^{-E(x)/T}}{Z}, \qquad Z = \sum_{x'} e^{-E(x')/T}
$$

**Why it matters — softmax is a Boltzmann distribution.** Set the energy to the negative logit, $E_k = -z_k$, and you get $p_k = e^{z_k/T} / \sum_j e^{z_j/T}$: softmax with temperature. That's why sampling "temperature" behaves like physical temperature. $T \to 0$ freezes into the single lowest-energy (highest-logit) token; large $T$ melts toward uniform randomness.

**Energy-based models** define $p_\theta(x) \propto e^{-E_\theta(x)}$ with a learned energy. The hard part is always the partition function $Z$, a sum over every possible $x$. Much of generative modelling is clever ways to avoid computing it: contrastive losses, score matching, and diffusion.

## Physics II: Hopfield networks and attention

A Hopfield network stores patterns as low points of an energy function over binary states $s$:

$$
E(s) = -\tfrac12 \sum_{i,j} w_{ij}\, s_i s_j, \qquad w_{ij} = \sum_\mu \xi_i^\mu \xi_j^\mu
$$

Updating each neuron to lower $E$ slides the state downhill into the nearest stored memory $\xi^\mu$. That is associative memory, and it's part of why Hopfield shared the 2024 Nobel Prize in Physics.

*Modern* Hopfield networks (Ramsauer et al., 2020) use an exponential energy with continuous states, and their one-step update for a query $\xi$ against stored patterns $X$ is

$$
\xi^\text{new} = X\,\operatorname{softmax}\!\left(\beta X^\top \xi\right)
$$

which is exactly Transformer attention with $\beta = 1/\sqrt{d_k}$. Attention can be read as one step of energy minimisation that retrieves the stored pattern best matching the query.

## Physics III: diffusion as a stochastic process

Brownian motion adds Gaussian noise continuously. A **diffusion model** defines a forward process that gradually turns data into noise, in discrete form (DDPM):

$$
q(x_t \mid x_{t-1}) = \mathcal{N}\!\left(x_t;\ \sqrt{1-\beta_t}\,x_{t-1},\ \beta_t I\right)
$$

or in continuous time as a stochastic differential equation, $dx = f(x,t)\,dt + g(t)\,dw$. Remarkably, the process has a **reverse-time SDE** that turns noise back into data, and it needs only the **score** $\nabla_x \log p_t(x)$:

$$
dx = \left[f(x,t) - g(t)^2\,\nabla_x \log p_t(x)\right]dt + g(t)\,d\bar w
$$

A neural network learns that score, which in practice is the same as predicting the added noise. DDPM's training loss is then strikingly simple:

$$
\mathcal{L} = \mathbb{E}_{t,\,x_0,\,\epsilon}\left[\lVert \epsilon - \epsilon_\theta(\sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\epsilon,\ t)\rVert^2\right]
$$

**Langevin dynamics** is the physics behind sampling. Follow the score uphill while adding noise,

$$
x_{k+1} = x_k + \frac{\eta}{2}\nabla_x \log p(x_k) + \sqrt{\eta}\,z_k, \qquad z_k \sim \mathcal{N}(0, I)
$$

and the particles end up distributed according to $p$. **Flow matching** (2022) learns a deterministic velocity field instead, so generation becomes solving an ODE with fewer steps.

```mermaid
flowchart LR
  X0["data x₀"] -- "add noise (forward SDE)" --> XT["pure noise x_T"]
  XT -- "denoise with learned score (reverse SDE)" --> XS["new sample"]
  NN["network ε_θ(x_t, t)<br/>≈ −σ·score"] -.-> XS
```

## How to study this track

1. **Intuition, then formalism, then code.** Watch the 3Blue1Brown video, read the MML chapter, then verify the result numerically in NumPy.
2. **Derive the six workhorse results yourself:** softmax cross-entropy gradient, MSE as Gaussian NLL, L2 as a Gaussian prior, the DPO loss, the ELBO, and the DDPM loss.
3. **Interleave with building.** Study Beginner math alongside the [Deep Learning](/roadmaps/deep-learning/) Beginner stage, so each idea has a model to live in.
4. **Keep a "math I used this week" log** in your notes. Retrieval practice beats rereading.
