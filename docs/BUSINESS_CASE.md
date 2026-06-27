# Fold — Business case (refined Jun 27)

**YC apply:** Winter 2027 (~Sep–Oct 2026)  
**Monday:** Private beta + **seeking real design partners**

---

## One sentence (lead with value, not price)

**Fold** helps AI and data-heavy companies **run a tighter data plane on S3** — same bucket, lossless access — so infra spend, gross margin, and diligence story all look better at the **next fundraise**.

*(Cost savings are real; they are the **proof**, not the **product**.)*

---

## The positioning shift (friend challenge → answer)

| Weak pitch | Strong pitch |
|------------|--------------|
| “We cut your S3 bill” | “We make your **AI data stack investor-grade**” |
| Commodity cost line | **Capital efficiency + gross margin + data maturity** |
| Replaceable by next compression tool | **Embedded dedup layer** + design session + ongoing GC |
| “Save $9k/mo” | “**$9k/mo back into product** + cleaner COGS story for Series B deck” |

**Why this matters:** Seed–Series B companies are usually **not profitable**. The buyer is often the **CEO + CTO optimizing for the next round**, not a FinOps team optimizing a line item. They need a story that shows up in **investor diligence**, not just AWS Console.

---

## What investors actually look at (by stage)

Use this to **prioritize who feels pain** and **how to pitch**.

| Stage | What they fund | What they scrutinize | Does S3 / data infra matter? |
|-------|----------------|----------------------|------------------------------|
| **Seed** | Team, vision, early signal | “Can this become big?” | **Rarely.** Bill often **$200–2k/mo**. Pilot **engagement cost > savings**. |
| **Series A** | PMF, growth, unit economics emerging | Burn multiple, gross margin trend, retention | **Starting to.** **50–200 TB** AI cos see real COGS. “Capital efficient” is a **positive signal**. |
| **Series B** | Scale, path to profitability | **Gross margin**, infra COGS, operational maturity, diligence on data/AI stack | **Yes.** **100 TB–1 PB**, **$3k–25k+/mo** storage. Messy data = **technical debt flag** in diligence. |
| **Enterprise** | Efficiency at scale | Vendor consolidation, compliance | Yes — long sales cycle |

**Takeaway:** **Deprioritize seed** for outbound. **Primary ICP: Series A → Series B.** They have enough data **and** a fundraise where infra efficiency **changes the narrative**.

---

## ICP — pragmatic priority (who to go after)

### Tier 1 — **Series A (late) → Series B (early)** ← start here

| Trait | Why |
|-------|-----|
| **100–500 TB** on S3 (AI inference logs, training artifacts, RAG, traces) | Bill **~$2.5k–12k/mo** and **growing fast** |
| Raising or **within 12 mo of Series B/C** | Buyer cares about **deck + diligence**, not FinOps |
| Own S3 / self-hosted observability or ML stack | Fold fits without replacing storage |
| AI-native (not generic horizontal TB — **lead GTM here**) | Ties to “AI data optimization” investor story |

**Examples (archetypes, not clients):** PostHog-scale self-hosters, Series A RAG/agent platforms, ML cos with checkpoint sprawl.

**Why not seed first:** Design session + integration = **real founder time**. At 10–30 TB, savings may be **$500–2k/mo** — hard to justify vs. distraction from fundraising/product.

### Tier 2 — **Series B (established)**

| Trait | Why |
|-------|-----|
| **300 TB – 1 PB** | **$7k–23k+/mo** S3; savings fund **headcount** |
| Preparing **Series C** or profitability push | **COGS reduction** moves valuation multiples |
| Compliance / retention (health, fintech) | Can’t delete; must optimize |

**Motion:** Longer cycle, bigger ACV — pursue after **1–2 Tier 1 references**.

### Tier 3 — **Seed (inbound only)**

Say yes only if: **(a)** warm intro from Monday/YC network, **(b)** already **50+ TB** and growing, **(c)** technical co-founder will run design session **without hand-holding**.

Otherwise: *“Come back at Series A when your S3 line is on the board deck.”*

### Horizontal industries (healthcare, fintech, etc.)

Keep for **Siyang’s demo mock** and **second-wave GTM** — same engine, different buyer language (compliance + retention vs. investor narrative). **Monday AI founders:** lead AI-investor story. **Healthcare mock:** demo proof, not primary ICP for YC networking.

---

## Value created — beyond the S3 line item

Translate savings into what **founders and investors** actually care about.

### Example: **500 TB**, ~**$11.5k/mo** raw S3 → **~$2.3k/mo** after ~80% reduction (illustrative)

| Value lever | What it means | Investor-facing line |
|-------------|---------------|----------------------|
| **Runway** | **~$9k/mo ≈ $108k/yr** not burned on storage | **Burn-dependent:** ~**3 weeks** at **$150k/mo** burn; ~**5 days** at **$600k/mo** — see `VALUE_TRANSLATION.md` |
| **Reinvestment** | **$108k/yr** not sent to AWS → optional headcount/R&D | “**~Half an engineer** (US fully loaded ~$200k+) — not less S3 eng work, **reallocated cash**” |
| **Gross margin** | S3 is part of **COGS**; same revenue, lower COGS → **higher GM%** | “More profit per customer on the **unit economics** slide” — see `VALUE_TRANSLATION.md` |
| **Burn efficiency** | Lower storage spend per **$ ARR** (annual recurring revenue) | “**Capital efficient** — infra doesn’t eat revenue growth” |
| **Data maturity** | Deduped, organized S3 = **operational discipline** | “**AI data plane** under control before diligence” |
| **Retention headroom** | ~**5× compression** → same **$** stores ~**5× more** traces/RAG, or same data at ~**5× lower** bill | “Keep **full retention** without an infra fundraise” |

**Friend’s “1% cost → 1.5% output” framing (use carefully):**  
Don’t claim a universal multiplier. Say: *“Every dollar we take out of passive storage is a dollar you can put into **revenue-generating** R&D or **extend runway** without dilution — at Series B, that’s often worth **more than the savings line** in the room with investors.”*

**Honesty:** Fold does **not** directly increase revenue. It **frees capital and improves metrics investors use** (GM, burn, runway, maturity). That’s the honest version of the friend’s insight.

---

## Product (unchanged core)

| Phase | Product |
|-------|---------|
| **On ingest** | Fold **CRUD POST** — pack/dedup before S3 |
| **Existing bucket** | **`run_garbage_collection`** |

**GET** = full raw file. **Bill** = smaller. **Design session:** TB ~2 days, PB ~1 week.

**Demo:** Siyang **healthcare-shaped mock** for before/after — label **“sample workload”** until real pilot.

---

## AI data wedge (GTM narrative)

**Lead with:** companies generating **AI data debt** on S3:

| Data type | Inference | Training |
|-----------|-----------|----------|
| **Examples** | Traces, JSONL logs, RAG corpora | Checkpoints, datasets, experiment exports |
| **Investor worry** | “Costs scale with usage” | “Are you duplicating terabytes across runs?” |

**CEO line:** “We don’t sell compression. We **optimize the AI data layer** so your **COGS and diligence story** keep up with your model roadmap.”

---

## July MVP

| Component | July |
|-----------|------|
| CRUD API | Yes |
| Garbage collection | Yes |
| Fold UI / system file | Yes (ambitious; API+GC first if slip) |

---

## Traction — honesty rules

| Say | Don’t say |
|-----|-----------|
| Private beta; seeking **Series A/B design partners** | Fake client logos as live |
| Sample workload **~X×** in tests | Guaranteed 8.2× |
| Value = **margin + runway + data maturity**, not just AWS | “We only save money” |

---

## Pilot offer (Tier 1)

**They give:** S3 access + ~2 days for design session  
**They get:** Storage audit, before/after COGS impact, CRUD + GC pilot  
**We get:** Real ratio + **one investor-ready case study metric** (GM or $/yr reinvested)

---

## Monday 30s pitch (investor-value version)

> AI companies are piling traces, RAG data, and checkpoints on S3 — and it shows up as **COGS** and **messy diligence** at Series B. Fold is a dedup layer on **your existing bucket**: we pack new data on ingest and clean what’s already stored, lossless. My co-founder built dedup at Pure Storage. We’re not selling “cheaper storage” — we’re helping **Series A and B teams** look **capital-efficient** and **data-mature** for the next round. Private beta, shipping API and cleanup in July — fold-sooty.vercel.app

---

## Value translation (detail)

Founder-facing math and jargon decoder: **`docs/VALUE_TRANSLATION.md`**

---

## Open with Siyang (Sat)

1. **ICP lock:** Series A/B AI-first outbound; seed inbound only  
2. Mock healthcare = demo only  
3. Case study metric: **$/yr reinvested** or **GM bps** — not just “× compression”  
4. Website: soften placeholder partner metrics before Monday  
