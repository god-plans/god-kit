# Security policy

We take security issues affecting **god-kit** seriously. This document describes how to report vulnerabilities and what to expect.

## Supported versions

Security fixes are applied to the **latest minor release** on npm (`latest` dist-tag). Older majors may not receive backports unless documented in release notes.

Check the published version:

```bash
npm view god-kit version
```

## Reporting a vulnerability

**Please do not** open a public GitHub issue for undisclosed security vulnerabilities (that can put users at risk before a fix exists).

Preferred channels:

1. **GitHub Security Advisories** — use **[Report a vulnerability](https://github.com/god-plans/god-kit/security/advisories/new)** for this repository if enabled for your account.
2. **Maintainers** — if private reporting is unavailable, contact repository owners through GitHub with a subject line such as `SECURITY: god-kit` and minimal reproduction details; avoid posting exploit code in public threads.

Include where possible:

- A short description of the issue and its impact
- Affected versions or git revision
- Steps to reproduce or a proof-of-concept (can be shared privately)
- Suggested fix or mitigation (optional)

## Scope

In scope for this policy:

- **Runtime behavior** of published **`god-kit`** packages (Vue components, composables, CLI as shipped on npm)
- **Supply-chain** concerns directly tied to this repository’s release artifacts

Typically out of scope (report to the relevant upstream instead):

- Issues in **consumer applications** that only misuse the API
- **Third-party dependencies** (report to those projects unless god-kit is clearly misusing them)
- **Denial-of-service** via oversized inputs in demo/docs sites unless they reflect default library behavior

We may adjust scope case by case.

## Disclosure

- We aim to acknowledge receipt within a few business days when contact details allow it.
- We coordinate a fix and release as appropriate, then publish **`CHANGELOG.md`** and advisory text proportionate to severity.
- Credit reporters in release notes when they wish to be named.

## Bug bounty

This project does **not** run a paid bug bounty program.

For general non-security bugs and feature requests, use **[Issues](https://github.com/god-plans/god-kit/issues)**.
