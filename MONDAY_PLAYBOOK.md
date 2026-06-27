# Startup School Paris — Monday 29 June · Station F

**Goal:** 5–8 real conversations · design partner leads · relationships for W27 (apply Sep–Oct)  
**Not the goal:** Close YC referral on the night · deep product demo · hand out decks · pitch seed startups

---

## Logistics

| Item | Detail |
|------|--------|
| **Venue** | Station F, Paris |
| **Arrive** | **11:45–12:00** (doors 12:00 — early = easier check-in + lunch) |
| **Ends** | 8:30 PM |
| **Getting there** | Taxi / Uber — avoid hauling gear on Métro |
| **Bags** | **Avoid if possible.** If needed: small personal bag only, may be searched |
| **Food** | Provided — eat at lunch, snack before happy hour |
| **Bring** | Phone (charged), LinkedIn QR, tiny notebook + pen in **pocket** |
| **Skip** | Laptop, backpack, printed decks |

**Phone setup tonight:**
- Bookmark: https://fold-sooty.vercel.app/
- Bookmark: https://fold-sooty.vercel.app/#calculator (open this if they're engaged)
- LinkedIn app → your QR code ready
- Screenshot this doc's **30s pitch** + **design partner ask** (offline backup)

**Before you leave Monday — check the site:**
- Hero stats must be **honest** (`site-config.js`). If you can't back a number up in conversation, don't show it.
- Safe to say aloud: **private beta**, **2 Q3 design partner slots**, **3×–5× typical** (design session finds real ratio), **API + GC shipping July**.

---

## Your story (memorize)

### 30 seconds — default
> I'm Imogen — building **Fold**. AI companies at Series A and B pile logs, datasets, and training exports on S3 — and the bill **grows with the product**. That shows up as **COGS** and a messy story at the next fundraise. Fold is a dedup layer on **your existing bucket**: we profile your data, design how new stuff lands efficiently, and clean what's already stored — lossless. My co-founder **Siyang** built dedup at **Pure Storage**. Private beta, looking for design partners. **fold-sooty.vercel.app**

### 30 seconds — if they're an operator / YC GP
> We're not selling cheaper S3 — we help **Series A and B AI teams** look **capital-efficient** and **data-mature** before diligence. Same retention, smaller footprint, money back for the team or margin. Private beta — fold-sooty.vercel.app

### 2 minutes (only if they're leaning in)
Add in this order — stop when they interrupt:
1. **Slope:** "Storage often tracks usage quarter over quarter — success makes COGS worse unless you design the pathway."
2. **You:** PM at Ledger (API integrations) · Silicon Valley · applying **YC Winter** once pilots have real numbers.
3. **ICP:** **Late Series A → Series B**, **100 TB+** on own S3 — not seed (too early).
4. **Ask:** Not funding tonight — **design partners or intros** to teams with growing S3 pain.

### Design partner ask (when relevant)
> We're taking **2 more design partners** for Q3 — teams with **real TB-scale** logs, datasets, or training exports on their own S3. We run a **free design session** on your bucket (~2 days): map the data, tune ingest, show your real ratio. Interested?

### Phone demo (60 seconds — happy hour only)
Only if they said "show me" or have clear S3 pain:
1. **#demo** — flip through agent logs / service logs / training export (one tap each).
2. **#calculator** — "If your S3 bill is ~$8k/mo…" drag compression to **5×**, point at **four cards**: save · store more · put back in team · margins.
3. Close: "Upload on the site is a conservative estimate — real number comes from the design session on your bucket."

### Objections

| They say | You say |
|----------|---------|
| **Is it live?** | Landing page + demo live. Production dedup in pilots; full API + GC **July**. |
| **vs gzip?** | gzip per file. We dedup **across** files — same JSON keys, duplicate checkpoints, overlapping logs. |
| **vs Archil / Granica?** | Archil = faster S3. Granica = enterprise/VPC. We're an **API on the bucket you already have**. |
| **What's your compression?** | **3× conservative, ~5× typical, up to ~9×** on repetitive AI workloads — we find yours in the design session. Don't quote 8× unless it's real pilot data. |
| **Who's the buyer?** | **CEO + CTO** heading into Series B — COGS story, not FinOps. |

---

## Who to prioritize

### Tier 1 — Highest value for Fold

| Person | Why | Your angle |
|--------|-----|------------|
| **James Hawkins** (PostHog) | Self-hosted observability = storage pain at scale | "Teams retaining full trace history on own infra — does storage COGS show up in the board deck?" |
| **Paul Copplestone** (Supabase) | Dev-tools GTM; seed→scale | "How did you pick the first developers to obsess over — horizontal vs one painful wedge?" |
| **Tom Blomfield** (YC GP) | AI startups talk + Q&A | One sharp **question** (see below) |
| **Nicolas Dessaigne** (YC GP, Algolia) | Paris, APIs, infra | Brief intro after Q&A if natural |
| **Mathilde Collin** (YC GP, Front) | EU founder, B2B SaaS | Operator advice on EU→US if moment fits |

### Tier 2 — Potential design partners / intros

| Person | Why |
|--------|-----|
| **Stanislas Polu** (Dust) | AI agents → inference logs growing fast |
| **Eric Landau** (Encord) | ML training data at scale |
| **Kyle Galbraith** (Depot) | Infra/devtools buyers |
| **Paul Sinaï** (Blaxel) | Infra for AI |
| **Benjamin Netter** (Riot) | If relevant to your network |

### Tier 3 — Learn / light touch

Olivier Pomel (Datadog) — listen to talk, don't chase 1:1  
Photoroom, Finary, Bitstack, Argil, Oneleet — LinkedIn if conversation flows

### YC Partners block (6:00–6:30 Q&A)
**Prepare ONE question** (pick one, memorize):

> "For AI startups at Series A/B — storage COGS grows with usage. Would you rather see founders **optimize that data plane early**, or is it a 'wait until Series B' problem?"

> "When you diligence AI companies with **100TB+ on S3**, what signals **operational maturity** vs **technical debt** on the data stack?"

---

## Hour-by-hour plan

| Time | Do this |
|------|---------|
| **11:45–12:30** | Check-in, lunch, scout room, sit mid-audience (aisle access) |
| **12:30–1:20** | Light networking — **1–2 intros max**, save energy |
| **1:30–3:00** | **Listen** — Lebrun, **Pomel**, **Hawkins**. Note 1 Hawkins quote for follow-up DM |
| **3:00–3:20** | Break — bathroom, LinkedIn ready, **1 conversation** if natural |
| **3:20–5:00** | Lightning tracks — optional; don't chase every room |
| **5:00–5:30** | **Copplestone** — priority if you can approach after |
| **5:30–6:00** | **Tom Blomfield** — notes for YC story |
| **6:00–6:30** | **YC Q&A** — ask your one question OR brief partner intro after |
| **6:30–8:30** | **HAPPY HOUR = main event** — 3–5 quality convos, **LinkedIn before they leave** |
| **Night** | Follow-ups while fresh (template below) |

**Rule:** Quality > quantity. **5 great conversations** beat 30 elevator pitches.

---

## Conversation flow (happy hour)

1. **Opener** (situation, not pitch): "What brought you to Startup School?" / "What are you building?"
2. **Listen** 30–60 seconds
3. **Fold** 30 seconds **only if** infra, AI, storage, or devtools
4. **Qualify:** "Do you know **Series A or B teams** where S3 is **growing every quarter** with logs or training data?"
5. **Show phone** only if qualified + curious
6. **Close:** LinkedIn + optional design partner ask

**Do NOT:** Ask "will you refer me to YC?" on first meeting  
**DO:** "We're applying to YC this fall once pilots have real metrics — would love to stay in touch."

---

## Tuesday follow-up

```
Great meeting you at Startup School Paris yesterday.

I'm building Fold — we help Series A/B AI teams bend their S3 COGS curve (same bucket, lossless dedup + design session on your data). Private beta; co-founder led dedup at Pure Storage.

[One personal line from your conversation]

Looking for design partners with TB-scale storage pain — or intros welcome.

https://fold-sooty.vercel.app/
```

---

## Prep checklist

### Tonight (Fri)
- [ ] Rehearse **30s pitch 10× aloud** (record once, listen back)
- [ ] Pick **top 3 people** you most want to meet
- [ ] Pick **one YC Q&A question**
- [ ] Verify **site metrics** are honest — update `site-config.js` if needed
- [ ] Outfit: pockets for phone + pen, **no big bag**

### Saturday
- [ ] 30 min: PostHog + Supabase — one informed line each
- [ ] Draft **custom opener** for Hawkins + Copplestone
- [ ] Sync with Siyang: who owns technical depth if someone asks GC/ingest details

### Sunday
- [ ] Rehearse objections table above
- [ ] Charge phone, test LinkedIn QR + calculator bookmark
- [ ] Early night — long day Monday (12:00–20:30)

---

## Mindset

- You're **planting seeds**, not closing deals
- CEO without CTO in room is fine — **own problem + GTM**, defer engine to Siyang
- **No deck, no laptop** — phone + curiosity
- W27 = **Sep–Oct**; Monday = **pipeline + credibility**
- Honest traction only — "private beta, seeking design partners" beats inflated stats

Good luck.
