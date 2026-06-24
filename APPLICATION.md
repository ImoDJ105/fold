# YC Startup School Paris — Submit Tonight

**Form:** https://events.ycombinator.com/yc-paris-sus  
**Event:** Monday, June 29 · Station F, Paris  
**Time budget:** ~15 minutes if you copy-paste below

---

## Submit order (do this in sequence)

1. Open the form while logged in as Imogen Deng
2. Click **IMPORT FROM LINKEDIN** → review/fix work history
3. Add **Education** (LSE — see below)
4. Paste URLs (website, GitHub)
5. Paste **most interesting things built** (required)
6. Paste **startup answer** (optional but do it)
7. Fill Age, Gender, City, Date of Birth
8. Click **REQUEST A SPOT**

---

## Profile fields (fill manually)

| Field | Value |
|-------|-------|
| Name | Imogen Deng |
| Email | dhyes11@gmail.com |
| City | Paris |
| LinkedIn | https://www.linkedin.com/in/haoyedeng/ |
| Personal website | https://fold-sooty.vercel.app/ |
| GitHub | https://github.com/ImoDJ105/fold |
| Twitter | *(leave blank unless you use it)* |

### Education (required — add via form)

Add your LSE entry. Example format (edit year/degree to match your transcript):

> **London School of Economics and Political Science (LSE)**  
> [Your degree, e.g. BSc Management] · [Year]

### Age / Date of birth

Fill accurately — required fields.

### Accomplishments (optional)

**Competitions / awards / papers — paste this:**

```
Winner, Ledger company-wide hackathon — "Ledger Find": a Find-My-iPhone-style feature for hardware wallets, using Bluetooth to locate your device via the public keys it broadcasts.

Overall winner, Cowes Week sailing regatta (2022, 2025).

No published papers.
```

**Shorter (if tight on space):**

```
Ledger company-wide hackathon winner — "Ledger Find" (Bluetooth device locator for hardware wallets). Cowes Week sailing regatta overall winner, 2022 & 2025.
```

**Note:** Ledger DeFi direct connectivity (1inch, Velora, Clear Signing) is **shipped product work**, not a competition — keep it in Question 1 or LinkedIn, not this field.

---

## COPY-PASTE: Most interesting things you've built * (required)

**Recommended (polished):**

```
Fold — a dedup API for AI object storage. I co-founded it with Siyang Chen, Staff Engineer at Everpure and tech lead on deduplication for FlashArray (10 GB → ~1 GB losslessly at Pure Storage).

I own product and GTM: live site, compression demo, waitlist, and pilot outreach. We're in private beta with design partners running production pilots on RAG, observability, and ML workloads — early results show 3–8× compression on AI data shapes vs gzip.

- Live site + demo: https://fold-sooty.vercel.app/
- Source: https://github.com/ImoDJ105/fold
```

**Shorter (if character limit is tight):**

```
Fold — dedup API for AI object storage, co-founded with Siyang Chen (dedup lead at Everpure / ex-Pure Storage). I built the live site, compression demo, and pilot pipeline. Private beta with design partners on RAG, observability, and ML workloads — 3–8× vs gzip on AI data shapes.

https://fold-sooty.vercel.app/ · https://github.com/ImoDJ105/fold
```

---

## COPY-PASTE: Are you working on a startup? (fill this — it's your pitch)

**Your version (recommended — human tone + Fold + Ledger):**

```
Well yes... and that's Fold ;)

The problem we're solving: AI companies are storing embeddings, RAG corpora, observability traces, and training checkpoints on S3 — and storage costs are becoming a real margin problem. Enterprise vendors solve this for Fortune 500 data centers, but AI startups on cloud object storage mostly get gzip, which doesn't understand AI data shapes.

Fold sits between those startups and S3/GCS/R2: data is compressed and deduplicated losslessly before upload, then decompressed on read. No migration, no new storage vendor — just one API call in your existing upload path.

I co-founded Fold with Siyang Chen, Staff Engineer at Everpure and tech lead on deduplication for FlashArray (10 GB → ~1 GB losslessly). The idea started when I was in Silicon Valley last summer, watching the AI wave accelerate — and realising how fast storage needs were outpacing what startups could afford.

By day I'm a Staff Product Manager at Ledger — the Paris-founded hardware wallet startup — where I ship API integrations that connect DeFi apps directly to Ledger hardware wallets, so users get secure, convenient on-chain transactions without relying on software wallets like MetaMask or Rabby. That taught me how to take complex infra and make it a simple integration for developers. Fold is the same playbook, applied to AI storage.

Siyang and I still have our day jobs, but we're building Fold seriously — private beta pilots are live with design partners on RAG, observability, and ML workloads (early results: 3–8× vs gzip). We're focused on seed to Series A teams where S3 is already a real line item.

https://fold-sooty.vercel.app/
```

**Why Ledger goes here (not as the main answer):** YC reads this question as "what startup are *you* building?" — so Fold must lead. One paragraph on Ledger works as **founder credibility** (Paris startup, API integrations, DeFi) without making it sound like you're applying on behalf of Ledger.

**If Siyang prefers not to name Everpure** — swap the co-founder line for:

```
I co-founded Fold with Siyang Chen, who led deduplication engineering for FlashArray at Pure Storage (10 GB → ~1 GB losslessly).
```

**If you want a more formal tone** (no opener / no origin story):

```
Fold is a dedup API for AI object storage.

AI companies are storing embeddings, RAG corpora, observability traces, and training checkpoints on S3 — and storage costs are becoming a real margin problem. Enterprise vendors solve this for Fortune 500 data centers, but AI startups on cloud object storage mostly get gzip.

Fold sits between your app and S3/GCS/R2: data is compressed and deduplicated losslessly before upload, then decompressed on read. No migration, no new storage vendor — one API call in your existing upload path.

I co-founded Fold with Siyang Chen (FlashArray dedup, Everpure). I own product and GTM. We're in private beta with design partners on RAG, observability, and ML workloads — early results show 3–8× compression vs gzip.

https://fold-sooty.vercel.app/
```

---

## What YC is looking for (reminder)

From the [event page](https://events.ycombinator.com/yc-paris-sus):

- Space is **limited and hand-picked**
- You **don't need** a startup already — but having one **helps you stand out**
- Speakers include founders of **Datadog, Supabase, PostHog** — infra/devtools angle fits

Your strongest signals:
1. **Live URL** with demo ✓
2. **GitHub** with real code ✓
3. **Technical co-founder** with enterprise dedup pedigree ✓
4. **You ship** (Ledger API integrations + Fold product/GTM) ✓

---

## One-liner (if asked elsewhere)

**Fold — dedup API that cuts S3 costs for AI companies**

---

## Co-founder reference (not on this form — for your notes)

**Siyang Chen** — Staff SWE at Everpure. Tech lead on deduplication for FlashArray. 7+ years at Everpure/Pure Storage. Duke CS.  
LinkedIn: https://www.linkedin.com/in/siyang-chen/

---

## Competitive positioning (internal — don't paste into form)

If a YC partner asks "who else does this?":

> Enterprise compression filesystems sell 90-day evals to storage teams. Fold is a dedup API for AI startups already on S3 — one integration, built by the team that shipped dedup at Pure Storage.

---

## Final checklist

- [ ] LinkedIn imported and reviewed
- [ ] Education added (LSE)
- [ ] City = Paris
- [ ] Personal website = https://fold-sooty.vercel.app/
- [ ] GitHub = https://github.com/ImoDJ105/fold
- [ ] "Most interesting things built" pasted
- [ ] Startup answer pasted (numbers confirmed with Siyang OR soft version)
- [ ] Age + date of birth filled
- [ ] **REQUEST A SPOT** clicked

---

## After you submit

Nothing else required tonight. If selected, they'll email you with details for June 29 at Station F.
