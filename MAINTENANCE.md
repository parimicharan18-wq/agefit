# AgeFit Maintenance & Operations Guide

Welcome to the operational maintenance guide for **AgeFit**. This document explains how the application's automated testing, security, dependency maintenance, and continuous deployment systems work under a strict **₹0 budget**.

---

## 1. Automated Testing System
- **Test Runner:** [Vitest](https://vitest.dev/) with `jsdom` testing environment.
- **Run Tests Locally:**
  ```bash
  npm test
  ```
- **What is Tested:**
  1. `RecommendationEngine`: Age group categorization, joint limitation filtering, and adult/senior custom routine generation.
  2. `AutoHealer`: Automatic recovery of missing or corrupted user data, persistent flags (`agefit_voice_enabled`, `agefit_water_auto_sync`).
  3. `AutonomousEngine`: Feature loading, version rotation, and multi-age safety parameters.

---

## 2. Continuous Integration & Security (CI)
- **Workflow File:** `.github/workflows/ci.yml`
- **When It Runs:** Automatically on every push and pull request to the `main` branch.
- **Steps Executed:**
  1. `oxlint`: Static linting and code-smell detection.
  2. `tsc --noEmit`: Strict TypeScript compilation verification.
  3. `vitest run`: Full automated unit test suite.
  4. `vite build`: Production web bundle compilation.

---

## 3. Automated Dependency Updates (Dependabot)
- **Configuration File:** `.github/dependabot.yml`
- **Schedule:** Weekly updates for `npm` packages and `github-actions`.
- **How It Works:** Dependabot automatically opens Pull Requests whenever security patches or updates are released. Pull requests must pass the CI test suite before merging.

---

## 4. Website Monitoring & Uptime
- **Workflow File:** `.github/workflows/website-monitor.yml`
- **Schedule:** Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC).
- **Checks Performed:** Pings `https://parimicharan18-wq.github.io/agefit/` with a 3-attempt retry loop to verify `HTTP 200 OK` status and asset reachability.

---

## 5. Deployment Process
- **Workflow File:** `.github/workflows/deploy-pages.yml`
- **Hosting Platform:** GitHub Pages (100% Free CDN with automatic HTTPS).
- **Live URL:** [https://parimicharan18-wq.github.io/agefit/](https://parimicharan18-wq.github.io/agefit/)

---

## 6. Zero-Cost Architecture Guarantee
- **Total Operating Cost:** ₹0.00 / month.
- **External Paid APIs:** None (No paid OpenAI, Gemini, or Anthropic keys used).
- **Background Engines:** Pure open-source client-side TypeScript daemons running inside the user's browser/desktop.

---

## 7. Troubleshooting Common Issues
| Issue | Cause | Fix |
| :--- | :--- | :--- |
| **Test failure in CI** | Type mismatch or broken assertion | Run `npx vitest` locally to inspect the failure, fix the test, and push. |
| **GitHub Pages 404** | Pages source changed | Go to repo Settings -> Pages -> verify Source is set to **GitHub Actions**. |
| **Port 5173 busy locally** | Zombie Node process | The self-healing `start-app.bat` frees ports automatically on launch. |
