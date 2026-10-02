# Human Dividend

A monthly record of documented cases where AI made a real difference to ordinary people, with a step-by-step account of how each was done and the tools you could use to build something similar.

Built with [Jekyll](https://jekyllrb.com). No plugins and no build tools are needed beyond Jekyll itself.

## Run it locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Project layout

```
_config.yml                 Site title, tagline, description, font URL
_data/
  issues.yml                List of issues, newest first (the first one is "Latest")
  categories.yml            Areas of life used for filters and home-page cards
  cases/
    2026-10.yml             All cases for October 2026 (records, traces, tools)
    2026-09.yml             All cases for September 2026
_layouts/
  default.html              Page shell: head, header, footer, scripts
  issue-cases.html          An issue's case records with area filters
  issue-how.html            An issue's "How it works" two-pane view
_includes/
  head.html  header.html  footer.html  issuebar.html
  case-record.html          One case card
  trace-panel.html          One How-it-works panel (steps, tools, sources)
  css/01-tokens.css …       Stylesheet partials, stitched into assets/css/main.css
  illustrations/*.svg       Inline illustrations and logo (theme-aware)
assets/
  css/main.css              Includes the partials above
  js/filters.js             Case filters
  js/how-it-works.js        Scenario list, keyboard support, #c01 deep links
issues/
  2026-10/cases.html        Front matter only; content comes from _data/cases/2026-10.yml
  2026-10/how-it-works.html
  2026-09/…
index.html  archive.html  about.html  404.html
_templates/new-issue/       Starter files for the next issue (not published)
.github/workflows/pages.yml Deploys to GitHub Pages on push to main
```

Pages contain no case content. Everything about a case lives in one YAML entry, so the cases page, the How it works page, the home page, the archive and the About page's source list all stay in sync.

## Add a new monthly issue

1. Copy `_templates/new-issue/cases.yml` to `_data/cases/YYYY-MM.yml` and fill in one entry per case.
2. Add the issue to the **top** of `_data/issues.yml` (`slug: "YYYY-MM"`, number, month, title, summary, compiled). The top entry becomes the latest release everywhere.
3. Copy `_templates/new-issue/cases.html` and `how-it-works.html` into `issues/YYYY-MM/` and replace `YYYY-MM` and the month name.

That's it. The home page, navigation, issue bar, archive and About page update on their own.

### Source rules

Every case must come from journalism, peer-reviewed research, a university, a public body or a non-profit. Vendor case studies, consultancy reports and LinkedIn posts are not used. Keep a `care` note wherever evidence is early, indirect or company-reported.

## Deploy

- **GitHub Pages:** push to a repository, then in *Settings → Pages* choose *GitHub Actions* as the source. The included workflow builds and publishes on every push to `main`, and sets `baseurl` automatically.
- **Anywhere else:** run `JEKYLL_ENV=production bundle exec jekyll build` and upload the `_site` folder. If the site lives under a sub-path, set `baseurl` in `_config.yml`.

## Troubleshooting

**`Installing Bundler … gem failed with exit code 1` on GitHub Actions.** The workflow is using Ruby 3.1, which the current version of Bundler no longer supports. GitHub's suggested "Jekyll" workflow (`.github/workflows/jekyll.yml`) pins Ruby 3.1. Delete that file and keep `.github/workflows/pages.yml` from this project, which uses Ruby 3.3. If you'd rather keep GitHub's file, change its `ruby-version: '3.1'` to `ruby-version: '3.3'`.

Only one workflow should deploy to Pages, so keep just one of them.
