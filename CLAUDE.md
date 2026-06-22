# CLAUDE.md — NUFSM CCM Ultrasound Curriculum

## Project overview

Quarto-based point-of-care ultrasound (POCUS) curriculum for critical care medicine fellows. 11 standalone modules covering cardiac windows through procedural guidance, each with embedded GIF/AVIF clips, integration cases, and a quiz.

**Root:** `C:\Users\codyk\Documents\GitHub\NUFSM.CCM_US`

---

## File layout

```
_quarto.yml          # navbar, project config
index.qmd            # home page — links to all 11 modules
credits.qmd          # attribution table by module (sourced from Google Sheets)
modules/
  module-01.qmd … module-11.qmd
  gifs/              # ALL clips live here — flat folder, no subfolders
styles.css
```

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

1. Add metadata to the **Google Sheets** tracking file **before** embedding any new clip
2. Then embed in the module QMD
3. Then regenerate the credits section in `credits.qmd`

Clips without confirmed metadata are flagged `*` in the credits page. There are currently **22 unresolved** — do not add more until existing ones are resolved.

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
| Module 4 scope | Constrictive pericarditis is **out of scope** — two orphaned GIFs (`constrictive pericarditis.gif`, `constrictive pericarditis subcostal.gif`) in `modules/gifs/` can be deleted |
| Probe placement diagrams | Custom SVGs only (not photos) — they live inline in module-01.qmd |
| Git LFS | Not yet implemented; revisit if GIF total exceeds ~500 MB |

---

## Outstanding work (summary)

See `roadmap.md` for the full breakdown. Top priorities:

- **~90 clips still needed** — tiered: M3/M4/M6/M7 high priority (~35), M9/M10/M11 bulk (~39), M1/M2/M5/M8 low (~16)
- Resolve 22 clips marked `*` in credits
- Add References sections to all modules
- ~~Scan logbook for fellows~~ done — `case-logbook.html` + `competency-dashboard.html` are backed by the Cloudflare Worker's `/api` (D1 database `pocus-logbook`). Fellows sign in with PD-issued access codes (generated in the registry roster); faculty signs in with the `FACULTY_CODE` worker secret. Proctored counts flow live from logbook to registry. One-time deployment steps are in `cloudflare-worker/worker.js` header; `mock-api.py` mocks the API locally for testing. Fellow data lives only in D1 — never commit it here.
- Decide hosting platform (GitHub Pages, Quarto Pub, or institutional server)

---

## After completing any work

Always update `roadmap.md` to reflect what was done:
- Check off completed items (`- [ ]` → `- [x]`)
- Move newly embedded clips from the "Missing clips" table to the "What's done" section
- Update the rough clip count totals if they change

---

## Do not

- Change the flat `modules/gifs/` structure — relative paths in all 11 QMDs depend on it
- Use Quarto image syntax (`![](gifs/foo.gif)`) for clips — use raw `<img>` tags
- Embed integration case clips without a scenario-matched source
- Add clips to a module without first logging metadata in Google Sheets
