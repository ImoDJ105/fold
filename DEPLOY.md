# Deploy Fold — quick guide

## 1. Push to GitHub

```bash
cd "/Users/haoye.deng/Documents/Cursor projets/Database Project"

# If not already done:
git init
git add .
git commit -m "Initial Fold landing page"

# Create a new repo at https://github.com/new named "fold" (public)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/fold.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel (recommended, ~2 min)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. **Add New Project** → Import your `fold` repo
3. Framework: **Other** (static site, no build command)
4. Click **Deploy**
5. Your site is live at `https://fold-xxx.vercel.app` — add a custom domain later if you want

## 3. Alternative: GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from branch** → `main` → `/ (root)`
3. Live at `https://YOUR_USERNAME.github.io/fold/`

## 4. After deploy

- Put the live URL in `APPLICATION.md` and the YC form
- Put the GitHub URL in the form (Personal website + GitHub field)
- Update `site-config.js` when you have real pilot numbers from Siyang

## Submit timing

**Submit today.** YC reviews on a rolling basis. You can keep iterating the site after — reviewers often re-check your URL.
