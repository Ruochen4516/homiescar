# HomiesCar Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first version of the HomiesCar 汉米资料档案库 from the confirmed organization background and the read-only scan of `D:\HomiesCar汉米`.

**Architecture:** Use a Markdown-first archive with one entry point, focused topic documents, and one file per activity. The archive stores curated summaries and source paths while leaving original media and private documents untouched.

**Tech Stack:** Markdown files in a local Windows workspace.

---

### Task 1: Create Archive Structure

**Files:**
- Create: `README.md`
- Create: `docs/profile.md`
- Create: `docs/timeline.md`
- Create: `docs/assets-index.md`
- Create: `docs/operations.md`
- Create: `docs/activities/README.md`

- [x] **Step 1: Create directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'docs','docs\activities','docs\superpowers\specs','docs\superpowers\plans'
```

Expected: directories exist under `D:\Codex\HomiesCar`.

- [x] **Step 2: Write top-level archive documents**

Create the files listed above with the known organization background, archive purpose, timeline, source index, and operations index.

- [x] **Step 3: Verify top-level files exist**

Run:

```powershell
Get-ChildItem -Recurse -File
```

Expected: Markdown files appear under the project.

### Task 2: Create Activity Files

**Files:**
- Create: `docs/activities/2024-06-08-dragon-boat.md`
- Create: `docs/activities/2024-07-27-homiescar-event.md`
- Create: `docs/activities/2024-08-31-open-party.md`
- Create: `docs/activities/2024-12-21-carnival.md`
- Create: `docs/activities/2025-01-22-little-new-year.md`
- Create: `docs/activities/2025-03-23-spring-mountain-drive.md`
- Create: `docs/activities/2025-05-24-lakeside-camping.md`
- Create: `docs/activities/2025-10-12-camping.md`
- Create: `docs/activities/2025-11-30-trunk-market.md`
- Create: `docs/activities/2025-12-13-winter-ski.md`
- Create: `docs/activities/2026-01-25-new-year-gala.md`
- Create: `docs/activities/2026-04-04-trunk-market.md`
- Create: `docs/activities/2026-04-12-su7-flower-camping.md`
- Create: `docs/activities/2026-04-26-spring-sports-party.md`

- [x] **Step 1: Create one file per identified activity**

Each file records source directory, file count, size, recognized filenames, and fields to fill later.

- [x] **Step 2: Link activity files from `docs/activities/README.md`**

Expected: every created activity file is reachable from the activity index.

### Task 3: Verify Archive

**Files:**
- Read: all created Markdown files

- [x] **Step 1: List generated files**

Run:

```powershell
Get-ChildItem -Recurse -File | Select-Object FullName,Length
```

Expected: the archive contains the README, topic docs, design doc, plan doc, and activity files.

- [x] **Step 2: Search for unresolved implementation placeholders**

Run:

```powershell
rg "TBD|TODO|待补充|待核验" .
```

Expected: only intentional content-completion markers appear in archive docs.
