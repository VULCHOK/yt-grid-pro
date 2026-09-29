# YouTube Grid Pro

> Firefox extension to optimize the YouTube home feed for **ultrawide and large desktop screens**.

![Version](https://img.shields.io/badge/version-2.0.1-4CAF50?style=flat-square)
![Firefox](https://img.shields.io/badge/Firefox-MV2-orange?style=flat-square&logo=firefox)
![License](https://img.shields.io/badge/license-MPL--2.0-blue?style=flat-square)

---

## Features

- **Videos per row** — set between 2 and 8 videos per row on the home feed
- **Shorts per row** — set between 4 and 12 Shorts per row in the shelf
- **Show/hide Shorts shelf** — toggle the Shorts section on or off
- **Minimum width threshold** — only activates above a chosen browser width (default: 1800px)
- **Toolbar popup** — instant access without opening a settings page
- All settings persist via `browser.storage.local` — no external requests

---

## Screenshots

> Optimized for 5120×1140 ultrawide monitors.

---

## Installation

### Temporary (development)

1. Open `about:debugging#/runtime/this-firefox` in Firefox
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from this folder

### Permanent (signed)

Download the latest `.xpi` from [Releases](../../releases).

---

## Development

```bash
git clone https://github.com/VULCHOK/yt-grid-pro.git
cd yt-grid-pro
# Load as temporary add-on in about:debugging
```

### Structure

```
yt-grid-pro/
├── manifest.json         # Extension manifest (MV2)
├── content/
│   └── content.js        # CSS overrides injected into youtube.com
├── popup/
│   ├── popup.html        # Toolbar popup UI
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup logic + storage
├── icons/
│   ├── icon-48.png
│   ├── icon-96.png
│   └── icon-128.png
└── README.md
```

---

## Defaults

| Setting | Default |
|---|---|
| Videos per row | 5 |
| Shorts per row | 8 |
| Show Shorts | Yes |
| Min. width | 1800px |

---

## License

[Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
