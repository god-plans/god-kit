---
title: Growth metrics
description: KPI framework to track god-kit install growth, onboarding conversion, and discovery performance each week.
outline: [2, 3]
---

# Growth metrics

Track these metrics weekly to improve install conversion.

## KPI set

| KPI | Target | Source |
|-----|--------|--------|
| npm weekly downloads | Upward trend week-over-week | npm package analytics |
| Time-to-first-render | Under 10 minutes | Fresh install test runs |
| Docs landing visits | Increasing traffic to install pages | Web analytics |
| Install issue rate | Downward trend | GitHub issues/support channel |
| Docs -> install conversion | Week-over-week improvement | Link/click analytics |

## Weekly review loop

1. Record weekly KPI snapshot.
2. Identify biggest funnel drop (discovery, install, first render, or retention).
3. Ship one focused change for that drop.
4. Re-measure in the next cycle.

## Suggested dashboard table

| Week | Downloads | TTFR median | Top landing page | Conversion notes | Action |
|------|-----------|-------------|------------------|------------------|--------|
| YYYY-WW |  |  |  |  |  |

Repository template: `marketing/kpi-tracker.csv`

## Adjustment heuristics

- If traffic is flat: improve SEO metadata and distribution cadence.
- If traffic grows but installs do not: simplify README/getting-started.
- If installs happen but TTFR is slow: tighten starter templates and CSS setup docs.
