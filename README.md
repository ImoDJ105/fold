# Fold

Dedup API for AI object storage. Landing page + live compression demo.

**Live site:** https://[deploy-url]  
**GitHub:** https://github.com/ImoDJ105/fold

## Quick start

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Deploy

### Vercel (recommended)
1. Push to GitHub
2. Import repo at vercel.com
3. Deploy (zero config — static site)

### GitHub Pages
1. Push to GitHub
2. Settings → Pages → Deploy from main branch
3. Site live at `https://[username].github.io/fold`

## Stack

Static HTML/CSS/JS — no build step. Live compression demo uses browser `CompressionStream` API.
