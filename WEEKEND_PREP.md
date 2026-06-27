# Weekend prep — Jun 27–28 → Monday Jun 29

**Event:** YC Startup School Paris · Station F · 12:00–20:30  
**YC apply target:** Winter 2027 (~Sep–Oct 2026) — Monday = pipeline + credibility, not close YC

---

## Order of work (do not skip steps)

```
1. CTO sync notes (you feed in)     → Business + technical alignment
2. Business case one-pager          → Why us, ICP, numbers, wedge
3. Technical primer (CEO level)     → What we build, what we don't
4. Industry landscape (Saturday)    → Credible in any conversation
5. Speaker deep dives (Sunday)      → Custom openers per person
6. Monday execution                 → MONDAY_PLAYBOOK.md
```

---

## Friday 26 June (tonight) — ~1–2h

- [ ] **Send AI:** Notes from Siyang conversation (see template below)
- [ ] Lock **30s pitch** after business case draft (iterate tomorrow)
- [ ] Screenshot / save `MONDAY_PLAYBOOK.md` to phone
- [ ] Sleep — long day Monday

### What to send from CTO chat (copy this structure)

```
## What we're building (Siyang's view)
- Architecture approach:
- Client-side vs server-side:
- What runs in v1 MVP:

## Technical feasibility
- What works now / in 2–3 weeks:
- What's hard / out of scope for v1:
- File types / workloads:

## Integration model
- How customer connects (API shape):
- S3 flow (compress before putObject?):

## Open questions
-

## Traction / pilots (agreed)
-

## Anything that changed from landing page story
-
```

---

## Saturday 27 June — Business + industry

### Morning: Business case (with AI, after Fri notes)

Output: **one page you can recite** — problem, solution, ICP, why now, why us, competition, pilot ask, honest traction.

| Section | Questions to answer |
|---------|---------------------|
| Problem | Who hurts? How much? Why now? |
| Solution | One sentence + 3 bullets |
| ICP | Who we say yes/no to |
| Why us | Imogen + Siyang unfair advantage |
| Competition | gzip, Granica, Archil, UltiHash — one line each |
| Numbers | Only what you can defend (pilots, ratios, $) |
| Pilot | What we offer, what we need from them |

### Afternoon: Technical primer (CEO level, not code)

You should leave Saturday able to explain:

- [ ] What happens on **upload** and **download**
- [ ] Dedup vs compression vs gzip (plain English)
- [ ] What data types we optimize first
- [ ] What Siyang builds vs what you own
- [ ] What we tell customers MVP **can / cannot** do in July

### Evening: Industry landscape (~2h)

Read / discuss with AI:

- [ ] AI data on S3 — what gets stored (RAG, traces, checkpoints)
- [ ] Why storage bills grow (retention, re-indexing, agents)
- [ ] Who pays (seed–Series A, own infra)
- [ ] Observability: Datadog vs self-hosted (PostHog) — where Fold fits
- [ ] 3–5 terms you can use naturally: object storage, dedup, embeddings, JSONL traces, egress

---

## Sunday 28 June — Monday targets

### Morning: Speaker portfolio deep dives

For each **Tier 1** speaker, one card:

| Field | Content |
|-------|---------|
| Company | What they do (1 sentence) |
| Why relevant to Fold | Customer / GTM / YC |
| Their likely pain / interest | |
| Your opener | 1 sentence |
| Your ask | LinkedIn / intro / pilot / nothing |
| Avoid | |

**Tier 1 list:** Hawkins, Copplestone, Tom Blomfield, Nicolas Dessaigne, Mathilde Collin  
**Tier 2:** Dust, Encord, Depot, Blaxel, Polu  
**Tier 3 listen:** Pomel (Datadog) — rapport only

### Afternoon: Rehearsal

- [ ] 30s + 2min pitch aloud × 5
- [ ] Objection drill: no MVP yet, vs gzip, vs Archil, Datadog question
- [ ] Pick **one** Q&A question for YC panel
- [ ] Logistics: outfit, phone, no bag, taxi plan

### Evening: Light review, early sleep

---

## What you carry in your head Monday

**Business:** Problem → Fold → ICP → pilot ask → W27 apply in fall  
**Technical:** Upload path dedup, Siyang engine July, honest about demo vs production  
**Industry:** AI storage on S3 growing; self-hosted observability = sweet spot  
**People:** 5–8 quality convos; Hawkins + Copplestone priority; happy hour = main event

---

## Files in this repo

| File | Use |
|------|-----|
| `WEEKEND_PREP.md` | This plan |
| `MONDAY_PLAYBOOK.md` | Day-of execution |
| `APPLICATION.md` | YC copy (W27 later) |
| `internal/BUSINESS_CASE.md` | Created after CTO notes — Sat (founders only) |
| `SPEAKER_CARDS.md` | Created Sunday |

---

## Next step (now)

**Paste your Siyang conversation notes** using the template above.  
We refine business case + technical story first — then Saturday industry, Sunday speakers.
