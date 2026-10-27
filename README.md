# Skyline Routine website

Static product website for Skyline Routine, intended for GitHub Pages.

## Before publishing

1. Set the Mac App Store product URL after App Review:

```js
const SITE_CONFIG = {
  checkoutUrl: "",
  appStoreUrl: "https://apps.apple.com/app/id...",
  supportEmail: "runningswiftui@gmail.com"
};
```

2. Keep the Windows direct checkout URL in `checkoutUrl` if that license remains available.
3. Replace `assets/settings.png` with a current screenshot when the UI changes.
4. Commit and push.

## Free / Pro model

- Free Mac App Store download: 3 active reminders, 4 aircraft, 2 card styles, one custom path.
- Pro one-time upgrade: unlimited reminders and paths, all 16 aircraft, all 6 card styles, custom images, and 4 Pro themes.
- Suggested pricing: **$4.99 / ¥30** regular, **$2.99 / ¥18** launch.

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
