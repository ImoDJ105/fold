# Fold site — structure & storytelling (draft)

**Status:** Superseded by **`internal/SITE_BRIEF_V2.md`** — do not build from this doc.  
**Principle:** Every section answers **one question** in order. If a block doesn't advance the story, move it down or cut it.

---

## The story spine (one thread)

A Series A/B visitor should feel this arc in **one scroll**:

| Act | Question in their head | Site answers |
|-----|------------------------|--------------|
| **1. Recognition** | "Is this my problem?" | Your AI usage grows → your S3 spend grows with it → that's a COGS / fundraise problem |
| **2. Reframe** | "What do I actually need?" | Not a new storage vendor — a **pathway** for new data + **cleanup** for what's already on S3 |
| **3. Belief** | "Does it work on real data?" | Example workloads + upload — typical ratios from design sessions |
| **4. Personal stakes** | "What does this mean for *us*?" | Calculator — save, store more, put back in team, margins |
| **5. Trust & action** | "Can I trust them? What's next?" | Honest feedback, team, pricing (design session), apply |

**Product category in hero is wrong for this buyer.**  
They don't wake up looking for a "dedup API." They wake up worried that **storage COGS is climbing with the product.**

**Fold's category (internal):** AI data pathway on existing object storage.  
**Fold's promise (external):** Bend the S3 COGS curve — same retention, same bucket, lossless.

---

## Structural change: current → new

### Current page (feature-first, story broken)

```
Hero          → "Dedup API" + compression stats
Integrations  → stack logos
Code snippet  → SDK
Customer results → testimonials + FAKE partner cards  ⚠️ before problem
Problem       → buried mid-page
Product       → generic 3-step flow
Demo
Calculator
Pricing
Team
Waitlist
```

**Why it doesn't cohere:** Proof and product come **before** the problem. Visitor sees claims before context. Two parallel stories (tech API vs savings) fight each other.

### New page (story-first)

```
① HOOK         Hero — problem + promise + who it's for
② PROBLEM      Why the slope hurts (3 beats)
③ HOW IT WORKS Pathway + cleanup (the product IS the story)
④ PROOF        Demo — "see the shrink"
⑤ PAYOFF       Calculator — "see the business impact"
⑥ TRUST        Feedback + team credibility
⑦ COMMIT       Pricing + waitlist
```

**Supporting material moves down or folds in:**
- Integrations → compact strip inside **How it works** ("Same S3 · GCS · R2 — no migration")
- Code snippet → optional accordion under **How it works** (CTO depth, not act 2)
- Hero stats → honest private-beta only, or replace with **ICP line** ("Built for Series A/B · 100 TB+")

---

## Section-by-section: structure + story job

### ① Hero — *Recognition + promise*

**Job:** Stop the right reader. Wrong reader self-selects out.

| Element | Direction |
|---------|-----------|
| **Label** | Private beta · Design partners |
| **H1** | Your AI data grows every quarter. **Your S3 bill shouldn't scale one-for-one.** |
| **Sub** | For teams at **100 TB+** on S3 — where storage COGS matters at the next fundraise. |
| **CTA primary** | See how it works → `#proof` |
| **CTA secondary** | Model your savings → `#payoff` |
| **Remove** | "Dedup API for AI object storage" as H1 · inflated hero stats |

---

### ② Problem — *Deepen recognition*

**Job:** Three pains they already feel — don't introduce Fold yet.

| Card | Headline | Story beat |
|------|----------|------------|
| 1 | **COGS tracks product success** | More inference, training, evals → more retained data → bill grows QoQ |
| 2 | **You can't delete your way out** | Debug, compliance, retraining need full history |
| 3 | **No one designed the pathway** | Duplication across pipelines; sprawl makes the slope worse |

**Optional visual:** Static slope chart from `STORAGE_COGS_SLOPE.md` — bill vs usage over quarters.

**Transition line into next section:**
> You don't need a new storage vendor. You need a pathway for what's coming in — and a cleanup for what's already there.

---

### ③ How it works — *Reframe (this IS the product story)*

**Job:** Replace current `#product` + scattered integration/code blocks with **one coherent mechanism section.**

**H2:** Design your pathway. Clean what's stored.

Two columns or two stacked phases:

| Phase | Title | Copy | Proof point |
|-------|-------|------|-------------|
| **1** | **Design session → pathway on ingest** | We profile your bucket (~2 days at TB scale). New logs, datasets, and exports land optimized. | Starts with *your* data structure |
| **2** | **Cleanup on existing S3** | Background GC on what's piled up. GET still returns full raw files. | Same bucket — no migration |

Below phases:
- Minimal diagram: `Your app → Fold → Your S3`
- Compact integration strip: S3 · GCS · R2 · (tools you already use)
- Code snippet: collapsed / "For engineers" — not a main act

**Rename nav:** Product → **How it works**

---

### ④ Proof — *Belief*

**Job:** CTO needs evidence before CEO trusts the calculator.

**H2:** See it on real workloads

Keep current demo (examples + upload). Bridge copy:
> Typical ratios from design sessions. Upload a sample for a conservative estimate on that file — then model your full bill below.

**Rename nav label:** Demo → **Examples** or keep **Demo**

**Section id:** `#demo` or `#proof` (pick one, update nav anchors)

---

### ⑤ Payoff — *Personal stakes*

**Job:** Translate belief into *their* numbers. Four cards = business story, not feature list.

**H2:** What bending the curve means for your team

Keep calculator as-is (sliders + four outcomes). Intro:
> Illustrative — your real ratio comes from a free design session on your bucket.

**Demo and calculator should feel like one chapter** — minimal gap between sections, shared background or "Step 1 / Step 2" labels:
- Step 1: See the shrink (proof)
- Step 2: Model your bill (payoff)

---

### ⑥ Trust — *Credibility*

**Job:** Social proof **after** they understand problem → mechanism → proof → value.

**H2:** Early design partner feedback (not "Customer results")

| Keep | Change |
|------|--------|
| 1–2 anonymized quotes if defensible | Label **Pilot feedback** |
| Remove | Fake partner cards (Series A RAG 84TB, etc.) until real |
| Remove or soften | Metrics you can't defend in conversation |

Team can stay separate (⑦) or one quote + "Built by dedup engineers from Pure Storage" line here with link to `#team`.

---

### ⑦ Commit — *Pricing + CTA*

**Pricing H2:** Start with a design session on your bucket

Pilot card leads with **free design session**, not "500 GB compressed."

**Waitlist:** 2 design partners · Q3 · TB-scale on own S3

**Team:** After pricing or before waitlist — founders = "why us" for trust act

---

## Nav (matches story, not feature list)

```
How it works · Examples · Calculator · Pricing · Team
```

Request access → `#waitlist` (header CTA unchanged)

Remove **Customer results** from nav — trust lives inside the flow, not as top nav item.

---

## Coherence rules (use when writing any copy)

1. **Problem before product** — never show savings/partners before they feel the slope
2. **Mechanism before math** — demo before calculator
3. **Pathway + cleanup always together** — never sell compression alone
4. **Same bucket, lossless** — repeat once in How it works, not in every section
5. **Design session = on-ramp** — ties proof (typical ratios) to payoff (your ratio)
6. **Honest traction only** — private beta language until real case studies exist
7. **ICP visible early** — Series A/B, 100 TB+, not "all AI startups"

---

## What we're NOT changing (structure-adjacent)

- Calculator UX (sliders, four outcome cards)
- Demo mechanics (examples, upload tiers)
- Pricing tiers layout
- Waitlist / contact forms
- Visual system (dark, typography, gold numbers)

This is **reorder + rewrite + cut**, not a redesign from scratch.

---

## Current vs new — at a glance

```
CURRENT                          NEW
───────                          ───
Hero (API)                   →   Hero (problem)
Integrations                 →   [folded into How it works]
Code                         →   [folded into How it works]
Customer results ⚠️          →   Trust (after calculator)
Problem                      →   Problem (moved up)
Product                      →   How it works (reframed)
Demo                         →   Proof
Calculator                   →   Payoff
Pricing                      →   Commit
Team                         →   Trust / Commit
Waitlist                     →   Commit
```

---

## Implementation order (when you build)

Do **all of this in one pass** — partial reorder alone will feel broken.

1. Reorder `<section>` blocks in `index.html`
2. Rewrite hero + problem + how-it-works copy
3. Merge integrations + code into how-it-works
4. Pair proof + payoff (demo → calculator) with bridge copy
5. Honest-ify trust section
6. Update nav, meta title/description, in-page anchors
7. Push once — not incremental deploys of half a story

**Timing:** After Monday unless you need to remove fake partner cards urgently before people visit the site.

---

## Open decisions

- [ ] Hero H1: problem line (recommended) vs hybrid "AI data pathway"
- [ ] Proof + payoff: one visual section or two adjacent sections?
- [ ] Trust: quotes only vs quotes + team in same act?
- [ ] Slope chart in Problem: yes/no?

---

## Related

- `internal/BUSINESS_CASE.md` — ICP, positioning
- `internal/STORAGE_COGS_SLOPE.md` — Problem section visual
- `internal/SIYANG_SYNC_SHEET.md` — Phase 1 / Phase 2 language
- `MONDAY_PLAYBOOK.md` — current site for Monday; restructure post-Monday
