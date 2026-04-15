# Openlang

The **UI Swadesh List** — a community-editable, open-source database of the ~120 most common software interface terms, translated into many languages.

## What is the UI Swadesh List?

In linguistics, a [Swadesh list](https://en.wikipedia.org/wiki/Swadesh_list) is a small, fixed set of universal vocabulary used to compare languages. Openlang applies the same idea to software UI: a fixed, agreed-upon core of terms (Submit, Cancel, Settings, Loading…) that every interface uses. By translating this core once, open-source projects get a free, shared baseline for localization.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Other commands

```bash
npm run build      # production build
npm run preview    # preview the production build
```

## How to contribute translations

1. Run the app locally (or use the deployed instance).
2. Click on any empty cell next to an English term and type the translation. Press Enter to save.
3. Add a new language with the **+ Add Language** button.
4. When you're done, click **Download CSV** and share the file (PR, issue, email — whatever the project prefers).

All data lives in your browser's localStorage — there is no backend yet. Your edits stay on your machine until you export them.

## License

Released under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) — public domain. Use it however you like, no attribution required.

## Sources

The term list and translation methodology draw on:

- OPUS parallel corpora
- Microsoft Terminology Collection
- Apple localization glossaries
- Google Material Design guidelines
- GNOME / KDE / Mozilla Pontoon translation databases
- W3C WAI-ARIA
- Unicode CLDR
