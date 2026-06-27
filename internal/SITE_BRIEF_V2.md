# Fold site — V2 brief (locked from Imogen, Mar 2026)

**Status:** V2 built locally — review before push to Vercel

---

## Audience & goal

| | |
|---|---|
| **Primary reader** | AI or infra person at a growth-stage company (often the one who owns S3 / ML data pipelines). CTO possible; narrow ICP is the **AI guy** who thinks *"can this save us?"* |
| **Secondary** | Investors skimming portfolio tools — not written for them |
| **Main action** | **Contact us** — apply for design partner or join waitlist |
| **Secondary engagement** | Play with demo + calculator (interactive, but keep copy short) |
| **Tone** | Simple, scannable, product landing — **not** founder/investor jargon. No Series A/B, COGS, fundraise, or diligence language on the site |
| **ICP** | Implied (data-heavy AI workloads on S3) — **never** labeled in hero |

---

## Hero — promise-first

**Job:** Eye-catching sales promise that implies the problem without jargon.

**Direction (refine wording when building):**
> Cut your AI storage costs — optimize what you keep on S3, and put the savings back into your team.

Variants to A/B in copy:
- *"Save on AI storage. Keep every log, dataset, and export you need."*
- *"Optimize AI data on S3 — spend less, store smarter, reinvest the rest."*

**Include (from old site — liked):**
- Clean hero layout
- Stats row (placeholder metrics OK until Siyang confirms — same as current Vercel)
- CTAs: **Request access / design partner** primary · **Try calculator** or **See examples** secondary

**Exclude from hero:**
- "Dedup API" as headline
- Design session callout
- Series A/B · 100 TB+ · COGS curve
- Storage-unit analogy

---

## Product spine (order matters — Siyang)

**Not:** pathway first because new data takes time to show impact.  
**Yes:** cleanup first → immediate visible savings → then pathway for new data.

| Step | What | Why |
|------|------|-----|
| **1. Design session** | Call + bucket access — understand their data structure | Part of process; **not hero** — lives in pricing/pilot copy |
| **2. Cleanup existing S3** | Optimized dedup on what's already stored | **Immediate** impact — "here's how much you save" |
| **3. Pathway for new data** | Tune ingest so new AI data lands efficiently | Impact compounds over time |

**Plain language for "same bucket":**
> Same S3 you already use — same files, full access. We shrink what's stored, not what you can retrieve.

**Storage-unit analogy:** calls only — **not on website**.

**Simple visual (required for V2):**
One diagram — easy to grasp, not wordy:
```
  New + existing data  →  [ Fold cleans & packs ]  →  Organized storage on S3
                               (less space, same access)
```
Think: messy data in → cleaned/organized closet out. No landlord analogy on page.

**Future vision (optional one line, not a section):**
System file on laptop — double-click to open through Fold. Post-pilot / roadmap hint only.

---

## Proof + payoff — one combined block (try first)

Merge **demo** and **calculator** into a single section with two clear parts:

| Part | Content |
|------|---------|
| **See the shrink** | Example workloads (agent / service / training) + upload sample |
| **Model your savings** | Full calculator — four outcome cards unchanged |

If combined layout feels cramped → fall back to two separate sections (current Vercel layout).

**Remove from site:**
- Slope chart ("2 years · 20% QoQ") — stays in `internal/STORAGE_COGS_SLOPE.md` only
- "Step 1 / Step 2" labels if they feel gimmicky

**Keep both:** examples + upload in demo.

---

## Code snippet

**Keep** — Datadog-style, scannable. Place after product diagram or after proof block (short, not hero).

---

## Integrations — two categories, show both (YC vision + honest launch)

The old section mixed **two different things**. Split them mentally and on the page:

### Category A — Object storage (same problem, same Fold)

| Provider | Product | Same category? |
|----------|---------|----------------|
| **Amazon S3** | AWS object storage | ✅ Launch focus |
| **Google Cloud Storage** | GCP object storage | ✅ Yes |
| **Azure Blob Storage** | Microsoft object storage | ✅ Yes — **include Azure** |
| **Cloudflare R2** | S3-compatible object storage | ✅ Yes |

Fold’s core wedge is **“layer on the bucket you already rent”** — whether that bucket is S3, GCS, Azure Blob, or R2. Siyang’s engine is storage-backend shaped; adding GCS/Azure when a design partner needs it is **credible**, not fantasy.

**YC “dream big”:** Show all major object stores as **where Fold works** — you’re building the default dedup layer for cloud object storage, not “an S3 plugin.”

**Honesty line (one sentence under logos):**
> *Shipping with Amazon S3 in pilots — GCS, Azure Blob, and R2 as we onboard design partners.*

That’s ambitious **and** defensible: tomorrow’s GCS client → you prioritize GCS. No fake “live on all clouds today.”

### Category B — AI stack / ecosystem (not on integrations row for V2)

LangChain, Langfuse, Lambda — mention in roadmap/SDK copy if needed; **not** in the logo row. Keeps one line, one message: object storage.

### V2 approach (revised — keep integrations)

- **One row only** — no second row (drop LangChain, Langfuse, Lambda from this block for now)
- **Four logos, same line:** **Amazon S3 · Google Cloud Storage · Azure Blob · Cloudflare R2**
- These are the biggest object-storage surfaces; one clean row reads better than two
- Short headline + one honesty line under the row
- Copy: *Works with your object storage* — not *We replace your stack*

**Honesty line (under logos):**
> *Shipping with Amazon S3 in pilots — GCS, Azure Blob, and R2 as we onboard design partners.*

**Placement:** After product diagram or after code snippet — compact, not hero-adjacent

---

## Page order (V2)

```
1. Hero              promise + stats + CTAs
2. How it works      short copy + simple diagram (cleanup → pathway)
3. Proof + savings   combined demo + calculator (or split if needed)
4. Code snippet      compact
5. Pricing           before social proof (Imogen's gut)
6. Social proof      revert to Vercel-style testimonials + metrics
7. Team
8. Waitlist / CTA
```

**Pricing before social proof — why it works:**
AI infra reader sees product + numbers first, hits **free pilot**, then testimonials reinforce. Social proof validates; pricing converts.

---

## Social proof rules (until real pilots)

- Keep **Vercel version** tone: testimonials + metric cards + partner-style cards (know numbers aren't defensible yet — update when Siyang returns)
- **1–2 anonymized pilot feedback** quotes OK
- Ask Siyang when back: any TB optimized, ratio, or partner count safe to publish
- Do not invent new case studies in V2 rewrite

---

## What to keep from current Vercel site

- Clean hero + stats
- Clear section boundaries (one job per section)
- Demo + calculator mechanics
- Pricing grid
- Team section
- Overall visual system (dark, gold numbers)

## What NOT to carry from rejected local draft

- Problem-first hero with COGS language
- Slope viz on page
- Long editorial copy / story steps
- Phase cards + accordion + arch diagram overload
- "Early feedback" replacing full social proof section
- ICP pills in hero

---

## Open for Siyang (when back)

- [ ] Any metric safe for hero stats?
- [ ] Confirm cleanup-first → pathway-second messaging matches product
- [ ] S3 first in pilots — OK to show GCS, **Azure Blob**, R2 on site with honest “shipping / onboarding” line?

---

## Build checklist (next session)

1. [ ] Hero promise copy (3 variants, pick one)
2. [ ] Simple product diagram (SVG or CSS — closet / pipeline visual)
3. [ ] Combined demo+calculator section — prototype; split if messy
4. [ ] Product copy: cleanup first, pathway second, plain "same S3"
5. [ ] Code snippet placement
6. [ ] Pricing copy: design session in pilot card, not hero
7. [ ] Restore social proof block from Vercel content
8. [ ] Review on mobile — must stay scannable in &lt;2 min scroll

---

## Related

- `internal/SITE_STORY.md` — earlier 5-act plan (superseded by this brief)
- `internal/STORAGE_COGS_SLOPE.md` — internal only
- Vercel live: pre-restructure commit `c0e18f9`
