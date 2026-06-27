# Siyang sync — product model (from Imogen + sheet, Jun 2026)

Source: Google Sheet + CTO discussion  
Sheet: `gid=1182872894`

---

## The core analogy (CEO pitch)

**AWS = landlord.** They own the buildings. **S3 = one building — storage only.**

The landlord does the **minimum**: they rent space by the square foot. They don’t clean, dedupe, or organize. More stuff in the building = more rent. That’s the business model.

**Fold = the cleaner / organizer** you hire because the storage room gets messy.

| Phase | Analogy | What Fold does |
|-------|---------|----------------|
| **1. Before storage** | New boxes arrive messy — **arrange before they enter the room** | Pack new files on ingest: merge duplicate content across boxes, drop empty boxes, maximize layout → **less space rented** |
| **2. Inside storage** | Room already full of messy piles — **clean what’s already there** | Background job on existing S3 data (`run_garbage_collection`) → refold in place, same room, fewer square feet billed |

**Customer still rents from the same landlord (same S3 bucket).** Fold doesn’t replace AWS — it reduces how much storage you need to pay for. Everything stays **accessible** (GET = full “raw” box contents); S3 just holds **less**.

**Sheet proof:** ~2,292 KB billed today → ~700 KB after Fold (~3.3× on that JSON set) — shared blocks across files = “same stuff from different boxes into one large box.”

---

## Sheet walkthrough (rows 3–10)

### Left side — **without Fold** (company on S3 today)

- Columns **A3–A9**: original JSON file sizes (e.g. `b_system_*`, `b_system_llm_*`)
- **Total ≈ 2,292 KB (~2 MB)** — what S3 “landlord” charges for today

### Right side — **with Fold** (after dedup)

- **Shared blocks** identified across files (e.g. first files share ~100K patterns)
- **Unique** per file after shared dedup (e.g. 92K, 176K, 8K for early files)
- **C10 ≈ 700 KB** total stored — company only pays **700K** to S3 vs **2,292K** before  
- **~3.3×** on this sample (2,292 → 700)

**Siyang’s expertise:** find **shared data** across files + optimize packing — not generic gzip on each file alone.

---

## Design session (required for each partner)

Before / during pilot:

1. Partner grants **S3 access**
2. Fold analyzes **data patterns** in their bucket
3. Siyang tunes **most optimized** shrink strategy for that workload

| Data scale | Typical design time (Siyang) |
|------------|------------------------------|
| TB-scale | ~**2 days** |
| PB-scale | ~**1 week** |
| Smaller | Few days |

**CEO line:** “We don’t sell a black box — we profile your data first, then run Fold optimized for your files.”

---

## Product surface — two interfaces

### 1. API (CRUD)

Fold exposes **Create, Read, Update, Delete** on files in the Fold layer:

```
POST:   AI_Training_Dataset_01.file
        → "Done — saved 234KB (raw size: 480KB) into S3"

GET:    AI_Training_Dataset_01.file
        → "Got file — raw size 480KB" (app sees original; S3 holds less)
```

- **POST** = smaller bytes on S3, show savings in UI  
- **GET** = transparent decompress — app gets **full original** size/content  

Protocol: pass file name → Fold fetches/serves per Fold protocol → underlying AWS S3.

### 2. UI (future vision)

- Mac Finder sidebar: new location **“Fold”** (like iCloud / disks)
- All Fold-managed files visible there
- **Double-click** to open → goes through Fold Integrated API
- Same savings feedback on POST (“saved X, raw size Y”)

**v1 for pilots:** API first; Finder UI is **vision**, not July MVP unless scoped.

---

## Architecture (CEO one-liner)

```
App  →  Fold API (CRUD + optional GC)  →  Customer’s S3
         ↑ fold on ingest + refold existing
         App always sees RAW size on GET; S3 stores SMALLER
```

---

## Open alignment (discuss with Siyang)

| Topic | Question |
|-------|----------|
| July MVP | API CRUD only, or GC on existing bucket too? |
| UI | Finder integration in v1 or post-pilot? |
| Website | Still “dedup API for AI object storage” or broader? |
| Design session | Productized as “Fold Design Partner Week 1”? |

---

## Next doc section (pending)

- Target pilot data types  
- Typical client file shapes  
- ICP vs healthcare IoT vs AI JSON from sheet  
