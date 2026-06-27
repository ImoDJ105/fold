# Fold — Value translation cheat sheet

**Use when:** a founder asks “so what?” after you mention compression or S3 savings.

**Live tool:** [fold-sooty.vercel.app/#calculator](https://fold-sooty.vercel.app/#calculator) — drag sliders on the site during a call, or send the link after.

**Anchor example (illustrative):** **500 TB** on S3 → ~**$11.5k/mo** storage → Fold ~**80%** reduction → ~**$9k/mo saved** → **~$108k/yr** freed.

Ratios vary by data; design session finds real number. **Math below uses $108k/yr as a worked example.**

---

## Quick map: savings → what founders care about

| Lever | One-line meaning |
|-------|------------------|
| **Runway** | Same cash in bank lasts **longer** because monthly burn is lower |
| **Reinvestment** | Money that went to AWS can go to **people/product** instead |
| **Gross margin** | Each customer becomes **more profitable** on paper |
| **Burn efficiency** | You spend **less infra** for each dollar of revenue |
| **Data maturity** | Your data stack looks **organized** in diligence |
| **Retention headroom** | Same budget holds **more** logs/RAG/checkpoints |

---

## 1. Runway — “How much extra time do we get?”

### What it means

**Runway** = how long until the company runs out of cash at current spending.

If Fold saves **~$9k/mo**, monthly burn drops from e.g. **$150k → $141k**. Same cash in the bank lasts **slightly longer**.

---

### Worked example: **$150k/mo burn** → how do we get **~3 weeks**?

**Step 1 — Annual savings**

```
$9k saved per month × 12 months = $108k per year
```

**Step 2 — “How much runway is $108k worth?”**

Ask: *If I had $108k in the bank and spent **$150k every month**, how long would it last?*

```
$108,000 ÷ $150,000 per month = 0.72 months
```

**Step 3 — Convert months to weeks/days**

```
0.72 months × ~30 days ≈ 22 days ≈ 3 weeks
```

That’s the full calculation behind the table. Same pattern at other burn rates:

| Monthly burn | $108k ÷ burn | In days (~30d/mo) |
|--------------|--------------|-------------------|
| **$150k** | 0.72 mo | **~22 days (~3 weeks)** |
| **$300k** | 0.36 mo | **~11 days** |
| **$600k** | 0.18 mo | **~5 days** |

**Plain English:** At **$150k/mo** burn, the money Fold frees in a year (**$108k**) is enough to run the company for about **three more weeks** — if you spent that lump sum at today’s burn rate.

---

### Slightly more precise: extra runway with cash already in the bank

Real runway extension also depends on **how much cash they have now**. Two ways to see it:

**Way A — Lump sum (easy for conversations):**  
`annual savings ÷ monthly burn` → **~3 weeks** at $150k/mo (above).

**Way B — If they have e.g. $1.5M and 10 months runway left:**

| | Without Fold | With Fold (−$9k/mo) |
|---|--------------|---------------------|
| Monthly burn | $150,000 | $141,000 |
| Runway | $1.5M ÷ $150k = **10.0 mo** | $1.5M ÷ $141k = **10.6 mo** |
| **Extra** | | **~0.6 months ≈ 18 days** |

Rule of thumb when savings are small vs burn:

```
Extra runway ≈ (months of runway left) × (monthly savings ÷ monthly burn)
             ≈ 10 × ($9k ÷ $150k)
             ≈ 10 × 6%
             ≈ 0.6 months ≈ 18 days
```

So **~3 weeks (22 days)** = lump-sum framing; **~2.5 weeks (18 days)** = typical company with **~10 months** runway. Same ballpark — use whichever is easier in the moment.

**Why the numbers differ slightly:** Lump-sum asks “what is $108k worth?” Runway extension asks “how much longer does **existing** cash last if burn is 6% lower?” Both are honest; **lump-sum is simpler to explain on the spot.**

---

### What to say

> “We free about **$9k a month** — **~$108k a year**. At **$150k/mo** total burn, that’s roughly **three weeks** of operating costs you’re not wasting on S3. Even at higher Series B burn, it’s still **~$108k** you can keep for product or the bank — the calendar extension is smaller, but the **cash is the same**.”

**Why founders care:** Next round timing, avoiding a down round, not cutting headcount.

---

## 2. Reinvestment — “Where does half an engineer come from?”

### What it means

**Not** “Fold reduces engineering work to maintain S3.” You’re right: dumping files in S3 is low effort.

**Reinvestment** = the **$108k/yr** you **no longer send to AWS** can be **spent somewhere else**.

### The math

| Use of $108k/yr | Rough equivalent |
|-----------------|------------------|
| US fully-loaded engineer | **~$200–220k/yr** → **~half an engineer** |
| Senior hire (EU / lower COL) | **~0.6–1 FTE** |
| GPU inference budget | **~$9k/mo** of model spend |
| One extra month of a **5-person** eng team | order-of-magnitude |

### What to say

> “Today that **~$9k a month** is rent to AWS — passive. Same budget could be **half an engineer**, more inference, or product work. We don’t replace your S3 upload flow; we **convert storage spend into optional headcount or R&D**.”

**Why founders care:** They’re always trading dollars between infra, hiring, and growth.

---

## 3. Gross margin — plain English

### Jargon decoded

| Term | Meaning |
|------|---------|
| **Revenue** | What customers pay you |
| **COGS** (Cost of Goods Sold) | Direct cost to **serve** customers: hosting, S3, GPUs for inference, etc. |
| **Gross profit** | Revenue − COGS |
| **Gross margin (GM%)** | Gross profit ÷ Revenue (as %) |

**Example — one customer**

| | Before Fold | After Fold (~80% storage cut on storage slice) |
|---|-------------|--------------------------------------------------|
| Customer pays | **$10,000/mo** | **$10,000/mo** |
| COGS (hosting + S3 + inference…) | **$4,000/mo** (incl. **$800 S3**) | **$3,360/mo** (S3 → **$160**) |
| Gross profit | **$6,000** | **$6,640** |
| **GM%** | **60%** | **66.4%** |

Storage was only part of COGS here — so GM moved **+6.4 points**. If storage is a **bigger** slice of COGS (heavy logs/RAG), the GM jump is **larger**.

### “Unit economics slide”

Investors ask: **“For each $1 of revenue, how much do you keep after direct costs?”**

That’s GM%. Higher = **more scalable** — each new customer adds more profit.

### Why investors care

- SaaS at scale often targets **70–80%+ GM**
- AI companies often have **lower GM** (GPUs, storage, inference)
- **Improving GM** = “this can be a **real software business**, not a money furnace”

### Why founders care

Same reason — better GM → **higher valuation multiples** at Series B/C (investors pay more for efficient businesses).

### What to say

> “S3 sits in **COGS** — what it costs you to serve customers. If we cut your storage COGS, **gross margin goes up** on the same revenue. Investors read that on your **unit economics** slide: more profit per customer without raising prices.”

---

## 4. Burn efficiency — “Lower infra per ARR”

### Jargon decoded

| Term | Meaning |
|------|---------|
| **ARR** | **Annual Recurring Revenue** — subscription revenue × 12 (e.g. $500k/mo → **$6M ARR**) |
| **Infra per $ ARR** | How much you spend on infrastructure (S3, cloud, GPUs) per dollar of ARR |
| **Capital efficient** | Growing revenue **without** burning cash proportionally on infra |

### Example

| | Numbers |
|---|---------|
| ARR | **$6M** |
| S3 spend | **$138k/yr** ($11.5k/mo) |
| S3 as % of ARR | **2.3%** |
| After Fold (~80% cut) | **$30k/yr** → **0.5% of ARR** |

### What to say

> “**ARR** is your annual subscription revenue. Investors watch how much **infra you burn per dollar of ARR**. If storage drops from **2% to 0.5% of ARR**, you look **more capital-efficient** — revenue grew but the ‘tax’ of storing AI data didn’t.”

**Why founders care:** “Capital efficient” is a **positive line** in fundraise meetings.

---

## 5. Data maturity

### What it means

Messy S3 (duplicate checkpoints, unbounded trace dumps) signals **technical debt** in diligence.

Fold = **organized, deduplicated, auditable** storage on the **same bucket**.

### What to say

> “Investors and acquirers ask: **‘Is your AI data under control?’** We’re not just shrinking bytes — we’re showing **operational discipline** on the data plane before Series B/C diligence.”

---

## 6. Retention headroom — “5× more traces/RAG”

### What it means

**Yes — your read is correct.**

If Fold achieves **~5× compression** (example; real ratio from design session):

| Choice | Effect |
|--------|--------|
| **Same budget** | Store **~5× more** traces, RAG docs, checkpoints **without** a higher S3 bill |
| **Same data volume** | Pay **~5× less** for storage |

Same physics, two framings:

- **Cost frame:** “We cut your bill ~80%.”
- **Capacity frame:** “Same **$11.5k/mo** budget now holds **~2.5 PB effective** instead of 500 TB.”

### What to say

> “You want **12 months of traces** for debugging and compliance, but S3 cost caps you at **3 months**. If we **~5×** your density, you keep **full retention** without an **infra emergency fundraise**.”

**Why founders care:** Product/compliance wants **long retention**; finance caps **storage spend**. Fold unlocks **both**.

---

## How to use this in a conversation

**Order of pitch (Series A/B AI founder):**

1. **Retention headroom** or **GM** — ties to product + investor deck  
2. **Reinvestment** — $108k → half engineer (concrete)  
3. **Runway** — honest days/weeks at *their* burn  
4. **Data maturity** — diligence angle  
5. **Compression ratio** — proof, not headline  

**Avoid:** Leading with “2–4 weeks runway” to a **$1M/mo burn** Series B — use the table and be precise.

---

## One honest paragraph (memorize)

> “At **500 TB**, you’re probably spending **~$10–12k a month** on S3 alone. We typically see a large reduction after profiling — call it **~$100k+ a year** back. That’s **half an engineer**, or a **meaningful bump to gross margin**, or **several months more trace/RAG retention at the same budget**. You’re not paying AWS for duplicate checkpoints and messy JSON — you’re keeping that money for **product and the next round story**.”

---

## Related

- Founder strategy & product sync: `internal/` (Imogen + Siyang only — not public)
