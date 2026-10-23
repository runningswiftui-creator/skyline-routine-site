# Skyline Routine website

Static product website for Skyline Routine, intended for GitHub Pages.

## Before publishing

1. Create the Lemon Squeezy product and copy its checkout URL.
2. Open `site.js` and set:

```js
const SITE_CONFIG = {
  checkoutUrl: "https://your-store.lemonsqueezy.com/checkout/buy/...",
  supportEmail: "runningswiftui@gmail.com"
};
```

3. Replace the screenshot in `assets/` if needed:
   - `settings.png`
4. Commit and push.

## GitHub Pages

In the repository settings:

```text
Settings → Pages
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

The site URL will be:

```text
https://runningswiftui-creator.github.io/skyline-routine-site/
```

Use that URL as the Website URL in Lemon Squeezy.

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Share pages

- `zh.html` — Chinese product introduction with copyable links.
- `en.html` — English product introduction with copyable links.
- `links.html` — bilingual link hub with copy buttons.
- `downloads/` — public Chinese and English user guide PDFs.
