# Dual GitHub setup — Lillycat123 (work) + ImoDJ105 (Fold)

One MacBook, two GitHub accounts, no conflicts. Uses **SSH** so you never swap Keychain passwords again.

| Account | Use for | SSH host alias |
|---------|---------|----------------|
| **Lillycat123** | Ledger work repos | `github.com` (default) |
| **ImoDJ105** | Fold + personal | `github.com-imodj` |

---

## Part 1 — Create two SSH keys (~5 min)

Run in Terminal:

```bash
# Work key (use your Ledger GitHub email if different)
ssh-keygen -t ed25519 -C "your-ledger-email@ledger.com" -f ~/.ssh/id_ed25519_lilycat -N ""

# Personal key (Fold)
ssh-keygen -t ed25519 -C "dhyes11@gmail.com" -f ~/.ssh/id_ed25519_imodj -N ""
```

Copy each public key:

```bash
echo "=== Lillycat123 — add to github.com/settings/keys ==="
cat ~/.ssh/id_ed25519_lilycat.pub

echo "=== ImoDJ105 — add to github.com/settings/keys ==="
cat ~/.ssh/id_ed25519_imodj.pub
```

**Add keys to GitHub:**

1. Sign in as **Lillycat123** → https://github.com/settings/ssh/new → paste `id_ed25519_lilycat.pub`
2. Sign in as **ImoDJ105** → https://github.com/settings/ssh/new → paste `id_ed25519_imodj.pub`

---

## Part 2 — SSH config (~2 min)

Create or edit `~/.ssh/config`:

```
# Ledger / work (default)
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_lilycat
  IdentitiesOnly yes

# Fold / personal
Host github.com-imodj
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_imodj
  IdentitiesOnly yes
```

Set permissions:

```bash
chmod 600 ~/.ssh/config
```

Test both:

```bash
ssh -T git@github.com
# Expected: Hi Lillycat123!

ssh -T git@github.com-imodj
# Expected: Hi ImoDJ105!
```

---

## Part 3 — Point Fold repo at personal SSH (~1 min)

```bash
cd "/Users/haoye.deng/Documents/Cursor projets/Database Project"

git remote set-url origin git@github.com-imodj:ImoDJ105/fold.git

# Optional: set commit author for this repo only (Fold)
git config user.name "Imogen Deng"
git config user.email "dhyes11@gmail.com"

git push
```

Ledger repos stay as normal `git@github.com:LedgerOrg/some-repo.git` — they automatically use the Lillycat key.

---

## Part 4 — Clone new repos correctly

| Repo type | Clone URL pattern |
|-----------|-------------------|
| **Ledger (work)** | `git@github.com:ORG/repo.git` |
| **Fold / personal** | `git@github.com-imodj:ImoDJ105/repo.git` |

---

## What stays the same (nothing breaks)

- **Fold on GitHub** — still at https://github.com/ImoDJ105/fold
- **Vercel** — still connected to ImoDJ105; auto-deploys on push to `main`
- **YC application** — unchanged
- **HTTPS Keychain** — ignored once you use SSH; can leave or clear later

---

## Vercel — two accounts on one Mac

Fold is already deployed under **ImoDJ105** on Vercel. Nothing changes for the live site.

| Account | Vercel use | How to access on one laptop |
|---------|------------|------------------------------|
| **ImoDJ105** | Fold (`fold-sooty.vercel.app`) | Browser signed in as ImoDJ105, or Chrome profile "Personal" |
| **Lillycat123** | Ledger work projects (if any) | Separate browser profile, or sign out/in at vercel.com |

**Tips:**
- Easiest: **two browser profiles** (Chrome Personal vs Work) — each stays logged into different Vercel/GitHub accounts
- Fold deploys automatically when you `git push` to `ImoDJ105/fold` — no Vercel login needed for daily pushes

### Siyang (engineer)

| What | How |
|------|-----|
| **Ship code** | Add as **GitHub collaborator** on `ImoDJ105/fold` → he pushes → Vercel auto-deploys |
| **Vercel dashboard** | Optional — invite on [vercel.com/account](https://vercel.com/account) → Teams (may need Pro for multiple seats) |

For now: **GitHub collaborator is enough.** He does not need his own Vercel account to update the site.

---


## Troubleshooting

| Error | Fix |
|-------|-----|
| `Permission denied (publickey)` | Wrong SSH key — check `Host` in remote URL |
| `denied to Lillycat123` on Fold push | Remote should use `github.com-imodj`, not `github.com` |
| `denied to ImoDJ105` on Ledger push | Remote should use `github.com`, not `github.com-imodj` |
| Still using HTTPS / Keychain | Run `git remote -v` and switch to SSH URLs |

---

## Quick reference

```bash
# Where am I pushing?
git remote -v

# Fold push test
cd "/Users/haoye.deng/Documents/Cursor projets/Database Project" && git push

# Which GitHub am I?
ssh -T git@github.com          # Lillycat123
ssh -T git@github.com-imodj    # ImoDJ105
```
