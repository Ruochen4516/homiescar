# HomiesCar Activity Recap Implementation Plan

**Goal:** Add a richer activity recap section to the public HomiesCar website.

**Architecture:** Extend the existing static site with a new `#recap` section, CSS card system, and vanilla JavaScript filtering.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, GitHub Pages.

---

### Task 1: Add Recap Content

**Files:**
- Modify: `index.html`

- [x] **Step 1: Add recap navigation**

Add a `回顾` link pointing to `#recap`.

- [x] **Step 2: Add 27 activity cards**

Create one card per activity from the HomiesCar record source, including date, title, category tags, and a short recap sentence.

### Task 2: Add Recap Styling

**Files:**
- Modify: `styles.css`

- [x] **Step 1: Add filter controls**

Style active and inactive filter buttons for year/type browsing.

- [x] **Step 2: Add activity wall layout**

Use a three-column desktop grid, two-column tablet grid, and one-column mobile grid.

### Task 3: Add Interaction

**Files:**
- Modify: `script.js`

- [x] **Step 1: Implement filter buttons**

Filter cards by `all`, year, or activity type using `data-*` attributes.

### Task 4: Verify and Publish

**Files:**
- Read: `index.html`
- Read: `styles.css`
- Read: `script.js`

- [x] **Step 1: Verify references and placeholders**

Run local checks for broken references and placeholder text.

- [x] **Step 2: Preview locally**

Open the local site and inspect desktop/mobile layout.

- [ ] **Step 3: Commit and push**

Commit the recap section and push to GitHub Pages.
