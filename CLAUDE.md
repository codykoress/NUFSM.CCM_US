# CLAUDE.md — NUFSM CCM Ultrasound Curriculum

## Project overview

Quarto-based point-of-care ultrasound (POCUS) curriculum for critical care medicine fellows. 9 standalone modules (display numbers 01–09) covering cardiac windows through shock/arrest integration, each with embedded GIF/AVIF clips, integration cases, and a quiz. Display numbers do **not** match source filenames — see the mapping table in `roadmap.md`.

**Root:** `C:\Users\codyk\Documents\GitHub\NUFSM.CCM_US`

---

## File layout

```
_quarto.yml          # navbar, project config
index.qmd            # home page — links to all 9 modules
credits.qmd          # attribution table by module (sourced from Google Sheets)
modules/
  01-windows.qmd     # display Module 01 — Windows & Image Acquisition
  02-lv.qmd          # display Module 02 — LV Function
  03-rv.qmd          # display Module 03 — RV Function
  04-pericardium.qmd # display Module 04 — Pericardium
  05-ivc.qmd         # display Module 05 — IVC & Volume Status
  06-integration.qmd # display Module 09 — Shock & Arrest Integration
  08-lung.qmd        # display Module 06 — Lung Ultrasound
  09-abdominal.qmd   # display Module 07 — Abdominal Ultrasound
  10-dvt.qmd         # display Module 08 — Vascular / DVT
  gifs/              # ALL clips live here — flat folder, no subfolders
  images/            # SVG probe placement diagrams
styles.css
```

Filenames are leftovers from the old 11-module build (valves `07` and procedural `11` were dropped); do not renumber them — navbar links and cross-references depend on the current names.

---

## Embedding clips

Always use raw HTML `<img>` inside a `callout-tip` block — never Quarto image syntax. This avoids pandoc path-encoding failures with spaces in filenames.

```markdown
::: {.callout-tip}
<img src="gifs/filename.gif" style="max-width:100%;" alt="Description">
:::
```

- Accepted formats: **GIF** (primary) and **AVIF** (when source is only available in that format)
- Path is always relative: `gifs/filename.gif` — works from any module QMD
- Normal acquisition clips are **intentionally duplicated** across Modules 1, 2, and 3 so each module is self-contained

---

## Clip attribution workflow

1. Add metadata to the **Google Sheets** tracking file **before** embedding any new clip:
   https://docs.google.com/spreadsheets/d/1ZGzjWniVL3xUzrFG72n1JV0aBqk3O3MiPBpPk6hh4AE/edit?usp=sharing
   (columns: Module | Title (filename without extension) | Contributors | URL)
2. Then embed in the module QMD
3. Then regenerate the credits section in `credits.qmd`

Clips without confirmed metadata are flagged `*` in the credits page (see `roadmap.md` for the current unresolved count) — resolve existing flags before adding more.

Primary clip source: [The POCUS Atlas](https://www.thepocusatlas.com).

---

## Quiz blocks

Each module ends with a quiz. Format is consistent across all modules — match existing style when adding questions. Do not change quiz widget behavior without testing `quiz-widget.html`.

---

## Key decisions (do not reverse without good reason)

| Topic | Decision |
|---|---|
| Clip format | GIF primary; AVIF accepted |
| Clip embedding | Raw `<img>` in callout-tip blocks |
| Clip storage | `modules/gifs/` flat folder |
| Normal clips | Duplicated across M1/M2/M3 intentionally |
| Integration case clips | Text-only placeholder until scenario-matched clip is sourced — never use a mismatched clip |
| Module 4 scope | Constrictive pericarditis is **out of scope** (the orphaned constrictive GIFs were deleted 2026-07-09) |
| Probe placement diagrams | Custom SVGs only (not photos) — Module 01 (`01-windows.qmd`) |
| Git LFS | Not yet implemented; revisit if GIF total exceeds ~500 MB |

---

## Outstanding work (summary)

See `roadmap.md` for the full breakdown. Top priorities:

- **1 integration-case clip still open** — M09 Case 5 (lowest priority; details below). 88 clips are embedded as of 2026-07-06.
- Resolve the ~54 clips marked `*` in credits (missing per-clip contributor metadata)
- Add References sections to all modules

### Last open clip — M09 Case 5 (post-surgical, won't wean)

Source: a post-surgical loop with a small effusion and mildly weak LV — hard to find cleanly on The POCUS Atlas; OK to leave the text placeholder until a good match turns up. When sourced:

1. Save as `M9 Case 5 Post-surgical — small effusion mild LV dysfunction.gif` in `modules/gifs/`
2. Log it in the Google Sheet
3. In `modules/06-integration.qmd`, replace the `Loops for interpretation. — post-surgical windows` callout under Case 5 with:

```markdown
::: {.callout-tip}
<img src="gifs/M9 Case 5 Post-surgical — small effusion mild LV dysfunction.gif" style="width:100%; border-radius:4px;" alt="Post-surgical windows: small anterior effusion with mildly reduced LV function"/>
:::
```

### Soft-gap clip upgrades (a clip is embedded, but a better match exists)

| Where | Embedded now | Ideal replacement/addition |
|---|---|---|
| M04 Case 2 (very large malignant effusion) | Swinging-heart clip that also shows chamber collapse | Very large effusion *without* collapse |
| M05 Case 2 (congested CHF) | Plethoric IVC only | Add hepatic-vein/portal-vein PW Doppler waveform clips (not on the Atlas IVC page) |
| M06 Case 4 (ICU fever/hypoxia) | PLAPS consolidation with *dynamic* air bronchograms | *Static* air bronchograms |
| M08 Case 3 (catheter-associated DVT) | Generic partially-compressible CFV clip | Explicitly-labeled catheter-associated DVT |
- ~~Scan logbook for fellows~~ done — `case-logbook.html` + `competency-dashboard.html` are backed by the Cloudflare Worker's `/api` (D1 database `pocus-logbook`). Fellows sign in with PD-issued access codes (generated in the registry roster); faculty signs in with the `FACULTY_CODE` worker secret. Proctored counts flow live from logbook to registry. One-time deployment steps are in `cloudflare-worker/worker.js` header; `mock-api.py` mocks the API locally for testing. Fellow data lives only in D1 — never commit it here.
- ~~Decide hosting platform~~ done — GitHub Pages serving `docs/` at https://codykoress.github.io/NUFSM.CCM_US/ (deployed 2026-06-12)

---

## After completing any work

Always update `roadmap.md` to reflect what was done:
- Check off completed items (`- [ ]` → `- [x]`)
- Move newly embedded clips from the "Missing clips" table to the "What's done" section
- Update the rough clip count totals if they change

---

## Do not

- Change the flat `modules/gifs/` structure — relative paths in all module QMDs depend on it
- Use Quarto image syntax (`![](gifs/foo.gif)`) for clips — use raw `<img>` tags
- Embed integration case clips without a scenario-matched source
- Add clips to a module without first logging metadata in Google Sheets
