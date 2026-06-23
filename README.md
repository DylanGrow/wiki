# 🛡️ SecOps Intel - Cybersecure PWA Wiki Platform

[![Security: Strict CSP](https://img.shields.io/badge/Security-Strict%20CSP-emerald?style=for-the-badge)](#)
[![Assets: 100% Self-Hosted](https://img.shields.io/badge/Assets-100%25%20Self--Hosted-blue?style=for-the-badge)](#)
[![Offline: PWA Enabled](https://img.shields.io/badge/PWA-Offline%20First-cyan?style=for-the-badge)](#)
[![Performance: Lighthouse 100+](https://img.shields.io/badge/Lighthouse-100%2B-teal?style=for-the-badge)](#)

Welcome to **SecOps Intel**, a government-grade, zero-telemetry, offline-first personal Wiki system designed for tactical and secure operations. This platform runs completely client-side, enforces strict Content Security Policies, self-hosts 100% of its resources (no Google Fonts or external trackers), and is highly optimized for mobile devices and GitHub Pages.

Live Repository: [github.com/DylanGrow/wiki](https://github.com/DylanGrow/wiki)  
Live Site: [dylangrow.github.io/wiki/](https://dylangrow.github.io/wiki/)

---

## 🔒 Security Baseline (Government-Grade)

This application is built with a **Zero-Trust Client Architecture** enforcing strict browser sandbox limits:

1. **Strict Content Security Policy (CSP)**: Ingested via HTML `<meta>` tag. Completely blocks remote scripts, object injections, cross-site script frames, and external styling.
2. **Clickjacking Frame-Busting Shield**: Prevents UI redressing attacks. The viewport hides (`display: none`) instantly if loaded inside a nested iframe.
3. **No-XSS Markdown Ingestion**: Powered by a custom Markdown rendering pipeline wrapped inside **DOMPurify** to sanitize and whitelist allowed HTML tags and sanitize links.
4. **Panic Purge (Self-Destruct)**: A high-visibility button that instantly clears all local IndexedDB entries, wipes service worker caches, unregisters the PWA, and resets to factory defaults.
5. **Session Idle Lock**: Activates a blur shield and "Terminal Locked" message after 15 minutes of user inactivity, restorable only by manual click confirmation.
6. **No-Referrer Policy**: Enforces `<meta name="referrer" content="no-referrer">` to guarantee internal Wiki slugs and queries are never leaked via browser headers.
7. **Unicode Homoglyph Stripping**: Cleanses text inputs and tag lists to block hidden unicode control codes and zero-width spaces.

---

## 📱 Mobile-Friendly UX Features

* **Adaptive Sidebar Navigation Drawer**: Automatically collapses to a hidden drawer overlay on mobile screens, toggled by a hamburger button. Outside taps or sidebar link selections instantly auto-collapse the drawer.
* **Fluid Typography**: Dynamic text size adjustments scale typography sizes cleanly on mobile viewports to prevent wrapping bugs.
* **iOS Zoom Prevention**: Set all text inputs and textareas to a base font size of `16px` on mobile, preventing iOS Safari from forcing zoom/layout shifts.
* **Stacked Content Headers**: Automatically stacks page titles and action buttons ("Modify", "Purge") on mobile while aligning them in rows on larger viewports.
* **Scrollable Tables**: Markdown tables are wrapped dynamically inside `.overflow-x-auto` wrappers to allow smooth horizontal scrolling on narrow screens without breaking the main layout.
* **Mobile-Optimized Editor**: Employs tabbed writing modes ("Write Source" vs "Preview Ingest") on mobile to maximize viewport typing space.

---

## 🚀 Key Functional Features

* **Wiki Revision History**: Saves preceding page states inside IndexedDB, enabling users to rollback changes to any historical timestamp.
* **Draft Auto-Save Protection**: Restores unsaved changes from the local storage cache if a page is closed or refreshed during editing.
* **Table of Contents (TOC)**: Automatically extracts page heading tags (`#`, `##`, `###`) to construct a dynamic, clickable article outline.
* **Estimated Read Time**: Displays approximate reading time based on article length.
* **Tactical Selector**: Choose between standard "Tactical Dark" operations layout and "Office Light" high-contrast theme (cached locally).
* **Keyword Search Highlighting**: Highlights search queries in real-time within the sidebar list and main body views.
* **Code Block Copy Action**: Securely copies code snippets to the system clipboard with single-click buttons.
* **Sanitization Diagnostic Console**: Displays active telemetry, including sanitization scan counts, database statistics, and CSP configurations.
* **Printer-Friendly CSS**: Uses `@media print` rules to hide UI controls, toolbars, and sidebars for clean paper printing.

---

## 🛠️ Local Development & Operations

### Prerequisites
* **Node.js**: Version 18 or higher.
* **Package Manager**: npm.

### Quick Start
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/DylanGrow/wiki.git
   cd wiki
   npm install
   ```

2. Spin up the development server:
   ```bash
   npm run dev
   ```

3. Build and package the production bundle:
   ```bash
   npm run build
   ```

4. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to GitHub Pages

This project is configured with a base path of `/wiki/` inside [vite.config.ts](vite.config.ts), matching its repo name on GitHub:

### Automatic Deployment (Recommended)
1. Push your code to your GitHub repository:
   ```bash
   git remote add origin https://github.com/DylanGrow/wiki.git
   git branch -M main
   git push -u origin main
   ```
2. Enable GitHub Pages in your repository settings:
   * Go to **Settings > Pages**.
   * Under **Build and deployment**, select **GitHub Actions** as the source.
   * The included Action in `.github/workflows/deploy.yml` (if created) will automatically compile and host the project on every push to the `main` branch.
