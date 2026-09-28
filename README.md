# Polina Kliuchnikova — portfolio

A static personal site covering ML engineering, applied research, professional projects and conference presentations.

The homepage features four projects. The full catalogue brings together projects and areas of work from Huawei, Sber, VK / MY.GAMES, research and independent work. Earlier detailed descriptions are preserved in expandable original notes on the relevant pages.

## Run locally

Node.js 18+; no package installation is required.

```sh
npm run build
npm run check
npm run preview
```

Open `http://127.0.0.1:4173/tapelich/`. Generated HTML is stored alongside the source data, so GitHub Pages can serve the root directly. The site also works when opened from the filesystem; search works in memory if browser history cannot be updated there.

## Edit content

- `content/projects.mjs`: complete case studies and the four featured projects.
- `content/site.mjs`: profile, experience, publications, skills and talks.
- `content/original-notes.json`: preserved text from the earlier portfolio.
- `css/portfolio.css`: responsive styling.
- `scripts/build.mjs`: static page generation.

See [EDITING.md](EDITING.md) for instructions in Russian, including how to add Cognitive Science 2026 video and slides. Empty media fields produce no inactive buttons.

`npm run check` verifies local references and anchors, project coverage, original-note preservation, metadata and media placeholders. Browser QA covers the catalogue filters, search, mobile menu and responsive pages.

The GPL-3.0 licence is retained. The earlier portfolio used Dopefolio markup and credited Ram Maheshwari; the previous README also referenced Jon Barron’s website.

