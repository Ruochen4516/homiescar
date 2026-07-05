# HomiesCar Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, externally presentable one-page website for HomiesCar 汉米武汉小米车友会.

**Architecture:** Use plain HTML, CSS, and JavaScript with local optimized assets. The page is self-contained and can be opened directly from the filesystem.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, local JPEG assets.

---

### Task 1: Prepare Assets

**Files:**
- Create: `assets/site/hero-mountain-convoy.jpg`
- Create: `assets/site/lake-convoy.jpg`
- Create: `assets/site/new-year-group.jpg`
- Create: `assets/site/ski-club.jpg`
- Create: `assets/site/road-trip-line.jpg`
- Create: `assets/site/yellow-su7-field.jpg`

- [x] **Step 1: Select photos from source archive**

Use real photos from `D:\HomiesCar汉米` covering road trips, lakeside convoy, group event, skiing, and field car scenes.

- [x] **Step 2: Compress photos for web**

Create JPEG copies under `assets/site/` with maximum dimensions appropriate for web display.

### Task 2: Create Static Website

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`

- [x] **Step 1: Write `index.html`**

Build the single-page sections: hero, stats, intro, activities, scenes, platforms, join.

- [x] **Step 2: Write `styles.css`**

Implement the dark premium visual system, responsive layout, image treatments, typography, and motion.

- [x] **Step 3: Write `script.js`**

Implement smooth scrolling, intersection reveal, and count-up effects.

### Task 3: Verify Website

**Files:**
- Read: `index.html`
- Read: `styles.css`
- Read: `script.js`

- [x] **Step 1: Check file references**

Run:

```powershell
rg "assets/site|assets/platforms|styles.css|script.js" index.html styles.css script.js
```

Expected: all local references point to existing files.

- [x] **Step 2: Open site in browser**

Open `D:\Codex\HomiesCar\index.html` and visually inspect desktop and mobile widths.

- [x] **Step 3: Fix visual issues**

Adjust spacing, image crops, and typography if text overlaps or the page feels unpolished.
