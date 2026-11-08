---
title: "Cloud Engineering & IAM"
short: "Cloud & IAM"
order: 4
icon: cloud-cog
tier: core
summary: "Design, secure and run systems in the cloud: compute, networking, storage, API gateways, infrastructure as code and cost, with identity and access management (IAM) in depth, from least-privilege policies to keyless workload identity and federation."
updated: 2026-11-07
overview: "Cloud engineering is the discipline of building on rented infrastructure *well*: picking the right compute (VMs, containers, serverless, GPUs), wiring private networks, choosing storage, exposing services safely through API gateways, and describing all of it as code so it can be reviewed, repeated and torn down. Underneath every one of those decisions sits **identity and access management**: who (or *what*) can do which action on which resource, under which conditions. Most real cloud breaches are not exotic exploits; they are over-broad permissions, long-lived keys checked into Git, or a public bucket. This track therefore treats IAM as the core skill: policies and their evaluation logic, temporary credentials, workload identity, OIDC federation, policy-as-code and zero trust."
why2027: "AI workloads are moving into production on cloud platforms, and they are attractive targets: model weights, training data and inference endpoints all need protecting. The ISC2 2025 workforce study ranks cloud security as the second-largest skill gap, right after AI skills, and the CNCF reports Kubernetes is now the default platform for running generative-AI inference. Agents make it sharper still: an AI agent holding credentials is a new kind of principal, and least privilege, short-lived tokens and auditable federation are exactly the skills needed to keep it safe. Being the engineer who can say *this service gets exactly these permissions, with no static keys* is valuable in every team."
demand:
  - claim: "Cloud security is the #2 skill gap (36%) after AI skills (41%); 95% of teams report at least one gap."
    source: "ISC2 Cybersecurity Workforce Study 2025"
    url: "https://www.isc2.org/insights/2025/12/isc2-publishes-2025-cybersecurity-workforce-study"
  - claim: "82% of container users run Kubernetes in production; 66% of orgs hosting generative-AI models use it for inference."
    source: "CNCF Annual Cloud Native Survey"
    url: "https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/"
prerequisites:
  - "Linux command line, SSH, processes and file permissions ([Missing Semester](https://missing.csail.mit.edu/) covers it)."
  - "Networking basics: IP addresses, ports, DNS, HTTP and TLS at a conceptual level."
  - "[Software Engineering](/roadmaps/software-engineering/) Beginner stage: Git, a backend in Python or Java, Docker basics."
  - "A free-tier AWS or Google Cloud account with a **billing alert set on day one**."
diagram: |
  flowchart TB
    P["Prereqs: Linux · networking · Docker"] --> B
    subgraph B["1 · Beginner — core services"]
      direction LR
      B1["compute · storage"] --> B2["VPC basics"] --> B3["IAM users, roles, policies"]
    end
    subgraph I["2 · Intermediate — build it as code"]
      direction LR
      I1["Terraform / OpenTofu"] --> I2["private networking"] --> I3["API gateway"] --> I4["CI/CD with OIDC"]
    end
    subgraph A["3 · Advanced — identity in depth"]
      direction LR
      A1["policy evaluation"] --> A2["workload identity"] --> A3["federation · OAuth/OIDC"] --> A4["Kubernetes RBAC"]
    end
    subgraph E["4 · Expert — platform & zero trust"]
      direction LR
      E1["multi-account guardrails"] --> E2["policy-as-code"] --> E3["zero trust · SPIFFE"] --> E4["FinOps · incident response"]
    end
    B --> I --> A --> E
    A -.-> SERVE["Secure model serving"]
    E -.-> SEC["AI Security & Safety"]
    I -.-> ARCH["Software Architecture"]
stages:
  - level: Beginner
    hours: 120
    focus: "Learn the core building blocks of one cloud (AWS or Google Cloud) and the IAM basics, then deploy something real and cheap."
    concepts:
      - "Regions, availability zones and the shared-responsibility model."
      - "Compute options: VMs (EC2 / Compute Engine), containers (ECS, Cloud Run), serverless functions (Lambda, Cloud Run functions)."
      - "Storage: object (S3 / GCS), block, file; storage classes and lifecycle rules."
      - "Networking 101: VPC, CIDR ranges, public vs private subnets, route tables, internet and NAT gateways, security groups / firewall rules."
      - "DNS and TLS: domains, records, certificates (ACM / Certificate Manager), HTTPS load balancers."
      - "IAM basics: principals (users, groups, roles, service accounts), policies as JSON, `Allow` vs `Deny`, the root account and MFA."
      - "Why long-lived access keys are dangerous; prefer roles and temporary credentials."
      - "Billing: budgets, alerts, the free tier and how surprise bills happen."
    projects:
      - title: "The Cloud Resume Challenge"
        detail: "Static site on object storage + CDN, a visitor counter API (function + database), DNS and HTTPS. Follow cloudresumechallenge.dev and blog each step."
      - title: "Deploy a containerised API"
        detail: "Put a small Spring Boot or FastAPI service on Cloud Run or ECS Fargate behind HTTPS. It reads from a bucket using a *role / service account*, not a key."
      - title: "IAM lab notebook"
        detail: "Create a role that can only read one bucket prefix. Prove it with the CLI: allowed read works, list of another bucket fails. Write down why for each result."
    signals:
      - "You can draw your deployment: VPC, subnets, load balancer, service, storage, and where the identity comes from."
      - "No static access keys exist in your code, laptop config or CI for these projects."
      - "You can read an IAM policy and say in plain words what it allows."
      - "Your monthly bill is predictable and you have alerts."
  - level: Intermediate
    hours: 200
    focus: "Describe everything as code, build private networks, put an API gateway in front of services, and deploy from CI without any stored secrets."
    concepts:
      - "Infrastructure as code with Terraform / OpenTofu: providers, state, remote backends and locking, modules, `plan` review, drift."
      - "Private networking: private subnets, VPC endpoints / Private Service Connect, private DNS, peering vs transit, egress control."
      - "Load balancing: L4 vs L7, health checks, TLS termination, WAF basics."
      - "API gateways: routing, authentication (API keys, OAuth 2.0 / JWT validation), rate limiting, quotas, versioning; AWS API Gateway, Apigee and **WSO2 API Manager**."
      - "Secrets management: Secrets Manager / Secret Manager, rotation, never in env files in Git."
      - "CI/CD to the cloud with **OIDC federation**: GitHub Actions gets a short-lived token, the cloud trusts it via a role / workload identity pool."
      - "Observability: logs, metrics, traces, audit logs (CloudTrail / Cloud Audit Logs)."
      - "Containers on Kubernetes: Deployments, Services, Ingress, ConfigMaps, namespaces."
    projects:
      - title: "Terraform a three-tier app"
        detail: "VPC with public and private subnets, a load balancer, a private service and a managed database, all in Terraform with a remote state backend. `terraform destroy` must leave nothing behind."
      - title: "Keyless CI/CD"
        detail: "GitHub Actions deploys to AWS (AssumeRoleWithWebIdentity) or GCP (Workload Identity Federation). Restrict the trust policy to one repo *and* one branch via the token's `sub` claim."
      - title: "Gateway in front of your API"
        detail: "Publish your API through WSO2 API Manager or AWS API Gateway with OAuth 2.0 / JWT validation, a rate-limit policy and an API key tier. Load-test the limits."
    signals:
      - "You can rebuild your whole environment from an empty account with one `apply`."
      - "Your CI has no cloud secrets at all; trust is scoped to a specific repo and branch."
      - "You can explain why the database sits in a private subnet and how the service still reaches it."
      - "You can explain where authentication happens: gateway, service, or both."
  - level: Advanced
    hours: 280
    focus: "Go deep on identity: how policies are evaluated, how workloads get identity without keys, how federation and OAuth fit together, and how to prove least privilege."
    concepts:
      - "**AWS policy evaluation logic**: explicit deny wins; SCPs and RCPs set the outer limit; permission boundaries and session policies cap a principal; identity and resource policies grant."
      - "Policy conditions: `aws:PrincipalOrgID`, `aws:SourceVpce`, `aws:SecureTransport`, tags (ABAC) and why conditions beat long resource lists."
      - "Cross-account access: role trust policies vs resource policies, the confused-deputy problem and `sts:ExternalId`."
      - "Least privilege in practice: IAM Access Analyzer (external, unused and policy generation), last-accessed data, deny-by-default guardrails."
      - "Temporary credentials: STS `AssumeRole`, `AssumeRoleWithWebIdentity`, session duration and session tags."
      - "Workload identity: EKS IRSA and EKS Pod Identity, GKE Workload Identity Federation, Microsoft Entra Workload ID; no node-level keys."
      - "OAuth 2.0 and OIDC: grant types, scopes, ID token vs access token, JWT validation (`iss`, `aud`, `exp`, signature), token exchange (RFC 8693), the OAuth security BCP (RFC 9700)."
      - "Kubernetes RBAC: Roles, ClusterRoles, bindings, service accounts, and mapping them to cloud IAM."
    projects:
      - title: "Policy evaluation playground"
        detail: "In a sandbox account, build scenarios where an SCP, a permission boundary and a session policy each block an otherwise-allowed action. Use the IAM policy simulator and write a table of results."
      - title: "Least-privilege report"
        detail: "Run Access Analyzer policy generation on a role from CloudTrail activity, replace `*` permissions with the generated policy, and show unused access before/after."
      - title: "Keyless model access from Kubernetes"
        detail: "On EKS (Pod Identity) or GKE (Workload Identity Federation), a pod reads model weights from one bucket prefix. Prove another pod in another namespace cannot."
      - title: "OIDC login in front of an internal tool"
        detail: "Add OIDC login (WSO2 Identity Server, Keycloak or a managed IdP) to a small web app, validate JWTs properly at the gateway, and test expired, wrong-audience and tampered tokens."
    signals:
      - "Given a denied request, you can work out which policy layer denied it."
      - "None of your workloads use static keys; you can explain the token chain for each."
      - "You can explain the difference between an ID token and an access token, and what `aud` protects against."
      - "You've cut a real role's permissions with evidence, not guesswork."
  - level: Expert
    hours: 360
    focus: "Design a secure multi-account platform: organisation guardrails, policy-as-code, zero-trust service identity, cost governance and incident response, including for AI workloads."
    concepts:
      - "Landing zones: multi-account / multi-project structure, organisation policies, SCPs and RCPs as guardrails, centralised logging and security accounts."
      - "Authorization models: RBAC vs ABAC vs ReBAC; Google Zanzibar and its descendants; Cedar and OPA/Rego for application authorization."
      - "Zero trust: BeyondCorp, NIST SP 800-207, identity-aware proxies, mTLS between services, SPIFFE/SPIRE identities."
      - "Network security at depth: egress control, private endpoints everywhere, eBPF-based policy (Cilium), WAF and bot protection."
      - "Security for AI workloads: protecting model weights and training data, scoped credentials for agents and tools, isolating GPU workloads, audit trails for model access."
      - "FinOps: unit economics, tagging, commitments vs on-demand vs spot, GPU cost per training run / per 1k inferences."
      - "Detection and response: GuardDuty / Security Command Center, alerting on risky IAM changes, break-glass access, post-incident reviews."
      - "Certification-level breadth: AWS Solutions Architect Associate, then Security Specialty or Google Professional Cloud Architect."
    projects:
      - title: "Mini landing zone"
        detail: "Terraform an organisation with dev/prod/security accounts, SCP guardrails (deny leaving the org, deny disabling CloudTrail, region restriction) and central audit logs. Document it with ADRs."
      - title: "Policy-as-code for an API"
        detail: "Move a service's authorization rules into Cedar or OPA, with unit tests for the policies in CI, and a ReBAC model (owner / editor / viewer) for a shared resource."
      - title: "Secure model-serving platform"
        detail: "API gateway → private inference service on Kubernetes → model bucket, with workload identity, mTLS, rate limits, audit logs and a cost dashboard per model. Write it up as a reference architecture."
      - title: "Game-day"
        detail: "Simulate a leaked CI token or an over-permissive role. Detect it from logs, contain it, and write a blameless incident review."
    signals:
      - "You can design guardrails that stop a whole class of mistakes across every account."
      - "Authorization rules are code with tests, reviewed like any other code."
      - "You can explain your platform's trust model end to end: users, services, CI and AI agents."
      - "You can state the monthly cost of a workload and the three levers to cut it."
connections:
  - track: software-engineering
    text: "IaC, CI/CD and testing are software engineering applied to infrastructure. Treat Terraform like application code."
  - track: software-architecture
    text: "Well-Architected reviews, private networking and resilience patterns are architecture decisions with cloud prices attached."
  - track: deep-learning
    text: "Training runs need GPU clusters, data buckets and model registries, each guarded by least-privilege IAM and keyless workload identity."
  - track: inference-gpu
    text: "Model serving runs on Kubernetes with GPUs. Autoscaling, cost per token and private endpoints are cloud skills."
  - track: ai-engineering
    text: "Production AI apps sit behind API gateways with OAuth, quotas and secret management for model-provider keys."
  - track: ai-security-safety
    text: "Agents holding cloud credentials are the new confused deputies. Scoped, short-lived, audited access is the main defence."
references:
  papers:
    - title: "BeyondCorp: A New Approach to Enterprise Security"
      by: "Ward & Beyer, Google"
      year: 2014
      url: "https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/"
      note: "Where zero trust became practice: no trusted network, every request authenticated."
    - title: "Zanzibar: Google's Consistent, Global Authorization System"
      by: "Pang et al."
      year: 2019
      url: "https://www.usenix.org/conference/atc19/presentation/pang"
      note: "Relationship-based access control (ReBAC) at planet scale."
    - title: "NIST SP 800-207: Zero Trust Architecture"
      by: "Rose et al., NIST"
      year: 2020
      url: "https://csrc.nist.gov/pubs/sp/800/207/final"
      note: "The reference definition of zero-trust architecture."
    - title: "Cedar: A New Language for Expressive, Fast, Safe, and Analyzable Authorization"
      by: "Cutler et al."
      year: 2024
      url: "https://arxiv.org/abs/2403.04651"
      note: "How a verified, analysable policy language is designed."
    - title: "RFC 6749: The OAuth 2.0 Authorization Framework"
      by: "IETF"
      year: 2012
      url: "https://www.rfc-editor.org/rfc/rfc6749"
      note: "The base OAuth spec; learn the roles and grant types."
    - title: "RFC 7519: JSON Web Token (JWT)"
      by: "IETF"
      year: 2015
      url: "https://www.rfc-editor.org/rfc/rfc7519"
      note: "The token format behind OIDC and most gateways."
    - title: "RFC 8693: OAuth 2.0 Token Exchange"
      by: "IETF"
      year: 2020
      url: "https://www.rfc-editor.org/rfc/rfc8693"
      note: "Delegation and impersonation; the basis of workload token exchange."
    - title: "RFC 9700: Best Current Practice for OAuth 2.0 Security"
      by: "IETF"
      year: 2025
      url: "https://www.rfc-editor.org/rfc/rfc9700"
      note: "Today's OAuth hardening rules: PKCE, no implicit grant, sender-constrained tokens."
    - title: "OpenID Connect Core 1.0"
      by: "OpenID Foundation"
      url: "https://openid.net/specs/openid-connect-core-1_0.html"
      note: "ID tokens and the identity layer that makes keyless federation work."
  courses:
    - title: "The Cloud Resume Challenge"
      by: "Forrest Brazeal"
      url: "https://cloudresumechallenge.dev/"
      note: "The best first hands-on cloud project."
    - title: "AWS Certified Solutions Architect – Associate"
      by: "AWS"
      url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
      note: "A structured tour of core services; good Intermediate milestone."
    - title: "AWS Certified Security – Specialty"
      by: "AWS"
      url: "https://aws.amazon.com/certification/certified-security-specialty/"
      note: "Deep IAM, logging and incident response; an Expert milestone."
    - title: "Google Cloud Professional Cloud Architect"
      by: "Google Cloud"
      url: "https://cloud.google.com/learn/certification/cloud-architect"
      note: "The GCP equivalent for design breadth."
    - title: "The Missing Semester of Your CS Education"
      by: "MIT CSAIL"
      url: "https://missing.csail.mit.edu/"
      note: "Shell, SSH and tooling fluency you need before touching cloud."
  books:
    - title: "Site Reliability Engineering & The Site Reliability Workbook"
      by: "Google"
      url: "https://sre.google/books/"
      note: "SLOs, error budgets and incident response, free online."
    - title: "Designing Data-Intensive Applications (2nd ed.)"
      by: "Kleppmann & Riccomini"
      year: 2026
      url: "https://dataintensive.net/"
      note: "The data-systems knowledge behind choosing cloud storage and databases."
  articles:
    - title: "Policy evaluation logic"
      by: "AWS IAM User Guide"
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
      note: "The single most important IAM page. Read until you can draw it."
    - title: "Security best practices in IAM"
      by: "AWS"
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"
      note: "Least privilege, temporary credentials and guardrails."
    - title: "IAM Access Analyzer"
      by: "AWS"
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html"
      note: "Find external and unused access; generate policies from activity."
    - title: "AssumeRoleWithWebIdentity"
      by: "AWS STS API Reference"
      url: "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html"
      note: "The OIDC federation primitive behind keyless CI and IRSA."
    - title: "IAM roles for service accounts (IRSA)"
      by: "Amazon EKS"
      url: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html"
      note: "Pod-level AWS identity via OIDC."
    - title: "EKS Pod Identity"
      by: "Amazon EKS"
      url: "https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html"
      note: "The newer, simpler alternative to IRSA."
    - title: "IAM overview"
      by: "Google Cloud"
      url: "https://cloud.google.com/iam/docs/overview"
      note: "Principals, roles and the resource hierarchy on GCP."
    - title: "Workload Identity Federation"
      by: "Google Cloud"
      url: "https://cloud.google.com/iam/docs/workload-identity-federation"
      note: "Keyless access to GCP from GitHub, AWS, Azure or any OIDC provider."
    - title: "About Workload Identity Federation for GKE"
      by: "Google Cloud"
      url: "https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity"
      note: "Kubernetes service accounts acting as IAM principals."
    - title: "Microsoft Entra Workload ID"
      by: "Microsoft"
      url: "https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview"
      note: "Azure's workload identity model."
    - title: "Security hardening with OpenID Connect"
      by: "GitHub Docs"
      url: "https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect"
      note: "How CI gets short-lived cloud tokens instead of stored secrets."
    - title: "SPIFFE overview"
      by: "SPIFFE project"
      url: "https://spiffe.io/docs/latest/spiffe-about/overview/"
      note: "Vendor-neutral workload identity for zero-trust service meshes."
    - title: "Using RBAC Authorization"
      by: "Kubernetes"
      url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      note: "Roles, bindings and service accounts inside the cluster."
    - title: "Open Policy Agent documentation"
      by: "OPA"
      url: "https://www.openpolicyagent.org/docs/latest/"
      note: "Policy-as-code with Rego, for Kubernetes and apps."
    - title: "Cedar policy language"
      by: "Cedar project"
      url: "https://www.cedarpolicy.com/"
      note: "Try Cedar policies interactively."
    - title: "Terraform documentation"
      by: "HashiCorp"
      url: "https://developer.hashicorp.com/terraform/docs"
      note: "The most common IaC tool; learn state and modules properly."
    - title: "OpenTofu documentation"
      by: "OpenTofu"
      url: "https://opentofu.org/docs/"
      note: "The open-source Terraform fork."
    - title: "AWS CDK v2 Developer Guide"
      by: "AWS"
      url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html"
      note: "IaC in TypeScript, Python or Java."
    - title: "Amazon API Gateway Developer Guide"
      by: "AWS"
      url: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
      note: "Managed gateway: authorizers, throttling, private APIs."
    - title: "WSO2 API Manager documentation"
      by: "WSO2"
      url: "https://apim.docs.wso2.com/en/latest/"
      note: "Full API lifecycle management, key management and rate limiting."
    - title: "Apigee documentation"
      by: "Google Cloud"
      url: "https://cloud.google.com/apigee/docs"
      note: "Google's API management platform."
    - title: "Envoy proxy documentation"
      by: "Envoy"
      url: "https://www.envoyproxy.io/docs/envoy/latest/"
      note: "The proxy under many gateways and service meshes."
    - title: "Cilium documentation"
      by: "Cilium"
      url: "https://docs.cilium.io/en/stable/"
      note: "eBPF networking and identity-aware network policy for Kubernetes."
    - title: "OWASP API Security Top 10 (2023)"
      by: "OWASP"
      year: 2023
      url: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/"
      note: "The API threat model; broken object-level authorization is #1."
    - title: "AWS Well-Architected: Security Pillar"
      by: "AWS"
      url: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"
      note: "Security design principles applied to real workloads."
    - title: "FinOps Framework"
      by: "FinOps Foundation"
      url: "https://www.finops.org/framework/"
      note: "Cost management as an engineering practice."
    - title: "CIS Benchmarks"
      by: "Center for Internet Security"
      url: "https://www.cisecurity.org/cis-benchmarks"
      note: "Hardening baselines for cloud accounts, Kubernetes and OSes."
---

## The shape of a secure cloud deployment

Before the details, keep one picture in mind. Traffic enters through a few controlled doors (load balancer, API gateway). Services live in private subnets. Every service has its **own identity**, and that identity gets exactly the permissions it needs, nothing else. Credentials are short-lived and issued on demand.

```mermaid
flowchart TB
  U["users / client apps"] --> GW["API gateway<br/>OAuth / JWT · rate limits · WAF"]
  subgraph VPC["VPC — private subnets"]
    direction LR
    SVC["inference service<br/>(Kubernetes pod)"] --> MODEL["model server<br/>GPU node pool"]
  end
  GW -- "private link / internal LB" --> SVC
  SVC -. "workload identity<br/>short-lived token" .-> STS["cloud IAM / STS"]
  STS -. "scoped credentials" .-> SVC
  SVC -- "read-only, one prefix" --> BUCKET[("model bucket<br/>encrypted")]
  SVC --> LOGS["audit logs · metrics"]
  GW --> LOGS
```

Read the arrows as questions you must be able to answer: *who is calling, how is that proven, and what exactly can they do?*

## IAM vocabulary across clouds

The ideas are shared; the names are not.

| Concept | AWS | Google Cloud | Azure |
| --- | --- | --- | --- |
| Human identity | IAM Identity Center user / IAM user | Google account / Cloud Identity | Entra ID user |
| Workload identity | IAM role (assumed) | Service account | Managed identity / workload identity |
| Permission bundle | Policy (JSON) | Role (set of permissions) | Role definition |
| Granting | Attach policy to principal or resource | IAM binding on a resource | Role assignment at a scope |
| Org-wide guardrail | SCP / RCP | Organization policy / deny policy | Azure Policy |
| Keyless federation | `AssumeRoleWithWebIdentity` | Workload Identity Federation | Federated identity credentials |
| Audit trail | CloudTrail | Cloud Audit Logs | Activity log |

## How AWS decides: policy evaluation

When a request arrives, AWS gathers every policy that applies and evaluates them together. The rules are simple to state and easy to get wrong:

1. Everything starts as **implicitly denied**.
2. An **explicit `Deny`** in any policy ends the evaluation: denied.
3. Guardrails (**SCPs** and **RCPs** from AWS Organizations) must allow the action, or it's denied.
4. **Permission boundaries** and **session policies** cap what the principal can do.
5. An **identity-based** or (within an account) **resource-based** policy must actually grant it.

```mermaid
flowchart TB
  R["request: principal · action · resource · context"] --> D{"explicit Deny<br/>in any policy?"}
  D -- yes --> DENY["❌ Deny"]
  D -- no --> O{"SCPs and RCPs<br/>allow it?"}
  O -- no --> DENY
  O -- yes --> RB{"resource-based policy<br/>allows it?"}
  RB -- "yes (same account)" --> ALLOW["✅ Allow"]
  RB -- no --> PB{"permission boundary<br/>allows it?"}
  PB -- no --> DENY
  PB -- yes --> SP{"session policy<br/>allows it?"}
  SP -- no --> DENY
  SP -- yes --> ID{"identity-based policy<br/>allows it?"}
  ID -- yes --> ALLOW
  ID -- no --> IMPL["❌ implicit deny"]
```

This is a simplified view. Cross-account requests need both sides to allow, and some resource-policy cases differ, so keep the [official evaluation-logic page](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html) open while you learn. The habit that matters: when something is denied, walk the layers in order instead of adding `*` until it works.

## Least privilege, written down

A good policy names specific actions, specific resources and conditions. This one lets an inference service read model files under one prefix, only over TLS and only through the VPC endpoint:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadModelWeights",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::acme-models/sentiment/v3/*",
      "Condition": {
        "Bool": { "aws:SecureTransport": "true" },
        "StringEquals": { "aws:SourceVpce": "vpce-0abc123def4567890" }
      }
    },
    {
      "Sid": "ListOnlyThatPrefix",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::acme-models",
      "Condition": { "StringLike": { "s3:prefix": ["sentiment/v3/*"] } }
    }
  ]
}
```

Notice what's missing: no `s3:*`, no `PutObject`, no other buckets. To get there in practice, start broad in a sandbox, let IAM Access Analyzer generate a policy from real CloudTrail activity, then tighten and test the denials too.

## Keyless CI/CD with OIDC federation

The old way stored an access key as a CI secret: long-lived, copyable, and rarely rotated. The modern way lets the CI platform *prove who it is* with a signed OIDC token and swaps that token for short-lived cloud credentials.

```mermaid
sequenceDiagram
  autonumber
  participant GH as GitHub Actions job
  participant OIDC as GitHub OIDC provider
  participant STS as AWS STS
  participant S3 as AWS resources
  GH->>OIDC: request ID token (audience sts.amazonaws.com)
  OIDC-->>GH: signed JWT (iss, sub = repo:org/app:ref:refs/heads/main, aud)
  GH->>STS: AssumeRoleWithWebIdentity(role ARN, JWT)
  STS->>STS: verify signature via provider JWKS · check trust policy conditions on aud and sub
  STS-->>GH: temporary credentials (expire in ~1 hour)
  GH->>S3: deploy using temporary credentials
```

The security lives in the role's **trust policy**: it must check `aud` and pin `sub` to your repository *and* branch (or environment). A trust policy that only checks the issuer would let any GitHub repository assume your role. Google Cloud's Workload Identity Federation follows the same pattern with an attribute condition on the pool provider.

The same idea powers workload identity inside Kubernetes: EKS (IRSA or Pod Identity) and GKE Workload Identity Federation let a pod's service account become a cloud principal, so no node ever holds a key.

## OAuth 2.0, OIDC and JWTs in one page

- **OAuth 2.0** is about *delegated authorization*: a client gets an **access token** to call an API on someone's behalf, with limited **scopes**.
- **OpenID Connect** adds *authentication* on top: an **ID token** (a JWT) says who the user is, for the client to read.
- A **JWT** is `header.payload.signature`. Validating it means checking the signature against the issuer's keys, and `iss`, `aud`, `exp` (and `nbf`). Skipping `aud` lets a token minted for another app be replayed against yours.
- **Token exchange** (RFC 8693) lets a service trade one token for another with narrower scope or a different audience. That's useful when an agent or service calls a downstream API *on behalf of* a user.
- Follow **RFC 9700**: use authorization code + PKCE, no implicit grant, short-lived tokens, exact redirect-URI matching.

API gateways such as WSO2 API Manager, Apigee and AWS API Gateway do this validation at the edge, but services behind them should still check the claims they rely on.

## Authorization beyond IAM: RBAC, ABAC, ReBAC

Cloud IAM protects cloud resources. Your *application* needs its own authorization model:

- **RBAC:** permissions attached to roles (`admin`, `editor`). Simple, but role explosion follows.
- **ABAC:** decisions on attributes (`department == resource.department`). Flexible, harder to audit.
- **ReBAC:** decisions on relationships (*user is editor of folder, folder contains doc*). This is Google Zanzibar's model, and it fits sharing features well.

Keep these rules out of `if` statements scattered through the code. Put them in a policy engine (**OPA/Rego** or **Cedar**), test them in CI, and log every decision.

## Availability and cost: the arithmetic

Components in series multiply their availabilities; redundant replicas in parallel multiply their *failure* probabilities:

$$
A_{\text{series}} = \prod_{i} A_i \qquad\qquad A_{\text{parallel}} = 1 - \prod_{i} \left(1 - A_i\right)
$$

A gateway (99.95%) → service (99.9%) → database (99.95%) chain gives about 99.8%, or roughly 17.5 hours of downtime a year. Two independent service replicas at 99.9% each give 99.9999% for that tier.

For cost, think in **unit economics**, not monthly totals:

$$
\text{cost per 1k requests} = \frac{\text{instance cost per hour}}{\text{requests served per hour}} \times 1000
$$

Unit costs make the levers obvious: right-size the instance, raise utilisation (batching, autoscaling), or buy cheaper capacity (commitments, spot). For GPU inference, the same formula with tokens instead of requests drives most decisions in the [Inference & GPU](/roadmaps/inference-gpu/) track.

## Zero trust in practice

Zero trust is not a product. It is three habits:

1. **Never trust the network.** Being inside the VPC grants nothing; every call carries an identity (mTLS with SPIFFE IDs, or signed tokens).
2. **Verify explicitly, every time.** Authenticate and authorise each request using identity, device and context.
3. **Assume breach.** Small blast radius per identity, short-lived credentials, full audit logs, and practised incident response.

BeyondCorp showed this works for a whole company; NIST SP 800-207 is the vocabulary for designing it. For AI agents, it becomes the rule that an agent gets its *own* scoped identity, never a human's broad credentials.
