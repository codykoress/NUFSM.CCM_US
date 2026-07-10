# NUFSM CCM Ultrasound Curriculum — Roadmap

---

## 1. What's done

### Site structure
- [x] Quarto project initialized with `_quarto.yml` navbar
- [x] `index.qmd` — home page with links to all 11 modules
- [x] `credits.qmd` — attribution table organized by module, sourced from Google Sheets metadata
- [x] All 11 modules linked in navbar and home page

### Module content (written)

> **Restructured to 9 modules.** The site now ships **9 modules** (display numbers 01–09). The earlier *Basic Valve Assessment* and *Procedural Guidance* modules (from the old "modules 7–11" build) were dropped/consolidated. Display numbers no longer match the source filenames — the mapping is below.

| Display | Title | Source file |
|---|---|---|
| Module 01 | Windows & Image Acquisition | `modules/01-windows.qmd` |
| Module 02 | Left Ventricular Function | `modules/02-lv.qmd` |
| Module 03 | Right Ventricular Function | `modules/03-rv.qmd` |
| Module 04 | Pericardium | `modules/04-pericardium.qmd` |
| Module 05 | IVC & Volume Status | `modules/05-ivc.qmd` |
| Module 06 | Lung Ultrasound | `modules/08-lung.qmd` |
| Module 07 | Abdominal Ultrasound | `modules/09-abdominal.qmd` |
| Module 08 | Vascular / DVT | `modules/10-dvt.qmd` |
| Module 09 | Shock & Arrest Integration | `modules/06-integration.qmd` |

- [x] **01 Windows & Acquisition** — four windows, machine setup, normal anatomy, normal variants, quiz
- [x] **02 Left Ventricular Function** — systolic dysfunction, RWMA, Takotsubo, cardiogenic shock, quiz
- [x] **03 Right Ventricular Function** — RV strain, D-sign, McConnell's sign, TAPSE, PE, ARDS cor pulmonale, quiz
- [x] **04 Pericardium** — effusion sizing, tamponade, pericarditis (constrictive scoped out), Doppler assessment, quiz
- [x] **05 IVC & Volume Status** — fluid responsiveness, distensibility index, VExUS/venous congestion, quiz
- [x] **06 Lung Ultrasound** — B-lines, effusion, pneumothorax, consolidation, BLUE protocol, quiz
- [x] **07 Abdominal Ultrasound** — FAST, free fluid grading, bladder volume, hydronephrosis, ruptured ectopic, quiz
- [x] **08 Vascular / DVT** — two-point compression, augmentation, catheter-associated DVT, quiz
- [x] **09 Shock & Arrest Integration** — 4-question framework, hemodynamic phenotypes, complex integration cases, quiz

### Visual assets
- [x] Probe placement SVG diagrams (×4) for Module 01: subcostal, PLAX, PSAX (with rotation arrow), apical 4C — chest wall redrawn with life-like shading (skin gradients, pec contours, clavicle ridges, nipples on MCL, umbilicus)
- [x] **88 image clips (87 GIF + 1 AVIF) currently embedded** (2026-07-06), by display module: 01=9, 02=20, 03=13, 04=14, 05=7, 06 Lung=9, 07 Abdominal=7, 08 DVT=4, 09 Integration=5. Every module now has case clips.
- [x] Normal acquisition clips intentionally duplicated across Modules 01, 02, 03 for module self-containment — learner can study each module standalone
- [x] GIF source metadata tracked in Google Sheets; credits page populated with contributor names and POCUS Atlas links
- [x] Module 02 integration cases (1–4) — all loops embedded
- [x] Module 03 Case 2 (submassive PE) — loops embedded
- [x] Module 04 PLAX/subcostal effusion variants and normal mitral inflow Doppler (AVIF) — embedded
- [ ] ~54 clips embedded but flagged `*` (missing individual contributor metadata — to be resolved). Includes the 32 integration-case clips added 2026-07-06, credited to their POCUS Atlas galleries but without per-clip contributor names yet.

### Video lectures
- [x] **15 external lecture link-out cards** added in a "Video lectures" section at the end of Modules 1, 2, 3, 6, 7, 8, 9 — full-length lectures from the University of Utah Echo & Perioperative Ultrasound FoCUS program (`echo.anesthesia.med.utah.edu`). Styled via new `.lecture-card` class in `styles.css`; linked out (not embedded/hosted) to keep traffic and rights on the source site. Attribution added to `credits.qmd`.
- [ ] No matching Utah lecture for Module 4 (Pericardium) or Module 5 (IVC) — none added
- [ ] Utah has a `FoCUS for Valve Disease` lecture with no corresponding module — add if a valve module is created

---

## 2. Outstanding

### Clips — integration case slots

**27 of the 28 integration-case slots are now embedded** (2026-07-06). All clips sourced from The POCUS Atlas; credited in `credits.qmd` (contributors still flagged `*`). *(The step-by-step `clip-embed-worksheet.md` was retired 2026-07-09 — its remaining tasks now live in `CLAUDE.md` → Outstanding work.)*

- [x] 03 RV (`03-rv.qmd`) — Cases 1, 3, 4
- [x] 04 Pericardium (`04-pericardium.qmd`) — Cases 1–6
- [x] 05 IVC (`05-ivc.qmd`) — Cases 1–4 *(Case 4 reuses the Module 2 myocarditis clip for the reduced-EF LV)*
- [x] 06 Lung (`08-lung.qmd`) — Cases 1–4
- [x] 07 Abdominal (`09-abdominal.qmd`) — Cases 1–4
- [x] 08 Vascular / DVT (`10-dvt.qmd`) — Cases 1–3
- [x] 09 Integration (`06-integration.qmd`) — Cases 1, 3, 4

**Still open (1 clip):**
- [ ] **M09 Case 5** — post-surgical windows; clip not yet sourced (lowest priority, placeholder left in place; target filename + embed snippet in `CLAUDE.md` → Outstanding work)

Soft gaps for later refinement (a clip is embedded but a better match exists): M04 Case 2 (very large effusion without collapse), M05 Case 2 (add hepatic-vein/portal Doppler waveforms), M06 Case 4 (static vs dynamic air bronchograms), M08 Case 3 (explicitly-labeled catheter-associated DVT). Details in `CLAUDE.md` → Outstanding work.

### Metadata — credits page
- [ ] Resolve the 22 clips marked `*` (newly-added Module 2 integration case clips, Module 3 Case 2 clips, Module 4 PLAX/subcostal/Doppler additions, Module 7 severe AS, plus the original 8 unresolved placeholders)
- [ ] Add two clips in the Google Sheet not yet sourced or embedded: *Pericardial Effusion vs Fat Pad* and *Pericardial Tamponade* (Module 4)
- [ ] Add metadata for all future clips to Google Sheet before embedding

### Unused files
- [x] Repo cleanup 2026-07-09 — deleted five orphaned GIFs (`constrictive pericarditis.gif`, `constrictive pericarditis subcostal.gif`, `severe aortic stenosis PSX.gif`, and the duplicate normals `Normal PLAX.gif`, `parasternal+long+axis+normal.gif`), the stale `_site/` render (superseded by `docs/`), and `debug.log`; `_site/` and `*.log` now gitignored
- [ ] `credits.qmd` still has rows for two clips no module embeds (`Normal PLAX`, `severe aortic stenosis`) — decide whether to drop the rows or keep them for future re-use

### Per-module content gaps
- [ ] All modules: References & further reading sections
- [ ] Integration case video slots: replace "Loops for interpretation" with actual clips as they are sourced (see Clips table above)
- [ ] Module 6: "Before/after" serial exam comparison clip
- [ ] Credits page: Curriculum development section and Acknowledgments

### Site / infrastructure
- [x] Competency assessment tool — `competency-dashboard.html` (POCUS Competency Registry: fellows × competencies matrix per ACCP/SRLF + LUCC + ACGME 2024; faculty sign in with `FACULTY_CODE`; data lives in Cloudflare D1 via the worker `/api`; edits autosave (debounced); proctored scan counts update live from fellows' logged cases — manual raise allowed, never lowered below the logbook count; roster section manages fellows and their access codes; CSV/JSON export; "Import legacy registry" migrates an old GitHub/localStorage backup)
- [x] Scan logbook for fellows — `case-logbook.html` (fellow-facing case entry: date, domain, views, findings, proctored flag + supervisor; per-domain progress bars vs sign-off targets; fellows sign in once with a PD-issued access code; cases save straight to D1 with an offline queue + retry when the worker is unreachable; faculty code opens a read-only all-fellows view; "Import old logbook" migrates a pre-API JSON backup; linked from navbar and home page)
- [x] Backend — `cloudflare-worker/worker.js` extended with `/api` (cases + fellows + access-code auth) on Cloudflare D1; `schema.sql` for the one-time database setup; `mock-api.py` for local testing. Worker migrated from service-worker to ES-module syntax (required for D1); chatbot + quiz routes unchanged. **Deployed 2026-06-12**: D1 `pocus-logbook` created + schema run, bound as `DB`, `FACULTY_CODE` secret set, `RATE_LIMITER` binding (30 req/60 s per IP, namespace 1001) verified live (429s confirmed). `ALLOWED_ORIGIN` temporarily `*` while the site is undeployed — **tighten to the site origin once hosting is decided**.
- [x] Hosting decided & deployed 2026-06-12 — GitHub Pages serving `docs/` at https://codykoress.github.io/NUFSM.CCM_US/ ; worker `ALLOWED_ORIGIN` locked to `https://codykoress.github.io`
- [x] Chatbot fixed for the 9-module structure (2026-07-09) — worker `SYSTEM_PROMPT` and the widget's `MODULE:XX` path map still described the old 11-module build, so valve/procedural questions produced 404 links; the bot now states those topics have no module. Worker also hardened: CORS fails closed if `ALLOWED_ORIGIN` is unset, and the unauthenticated chat/quiz routes now reject requests from disallowed origins (they proxy the Anthropic API). ⚠️ **Worker redeploy required** — paste `cloudflare-worker/worker.js` into the Cloudflare dashboard for these to take effect; site pages already re-rendered.
- [ ] Add `.gitignore` entry for large GIF files if repo size becomes an issue; consider Git LFS

---

## 3. Key decisions

| Decision | Choice made | Rationale |
|---|---|---|
| **Clip format** | GIF primary; AVIF accepted | Files sourced as GIFs from POCUS Atlas; GIFs autoplay and loop without controls using a plain `<img>` tag. AVIF works identically in modern browsers and is accepted when source material is only available in that format (e.g., mitral inflow PW Doppler clip). |
| **Clip embedding** | Raw HTML `<img>` inside callout-tip blocks | Avoids pandoc path-encoding issues with spaces in filenames; renders identically to Quarto image syntax |
| **Clip storage** | `modules/gifs/` flat folder | Simple relative path (`gifs/filename.gif`) from all module QMD files; no subfolders needed |
| **Clip attribution** | Google Sheets → credits.qmd | Metadata maintained in a shared sheet; credits page generated manually from that sheet and organized by module |
| **Normal acquisition clips** | Intentionally duplicated across Modules 1, 2, and 3 acquisition sections | Each module is designed to be self-contained — a learner reviewing only Module 2 (LV) or Module 3 (RV) should still see the normal reference clips without having to navigate back to Module 1. The few KB cost of duplicate `<img>` references is worth the pedagogical benefit. |
| **Module 1 scope** | Acquisition + anatomy only — no pathology | Pericardial content fully moved to Module 4; Module 1 quiz focuses on window/structure identification |
| **Module 4 scope** | Effusion, tamponade, acute pericarditis, myopericarditis — constrictive pericarditis dropped | Subtitle and intro still reference constrictive disease but no pathology section was written; decision made to scope it out rather than build the section. Two existing `constrictive pericarditis*.gif` files in `modules/gifs/` are now orphaned. |
| **Probe placement diagrams** | Custom SVGs (not GIFs or photos) | Allows precise anatomical annotation, indicator arrows, and rotation cues that no single photograph can convey; SVGs scale perfectly at any resolution |
| **PSAX SVG** | Ghost probe + blue rotation arrow | Shows the PLAX-to-PSAX transition explicitly — the 90° CW rotation is the most common technique error |
| **Integration case clips** | Text-only until scenario-matched clips are sourced | Using a mismatched clip is pedagogically worse than no clip; placeholder callouts preserved so slots are easy to fill. M2 cases 1–4 and M3 Case 2 now have scenario-matched clips embedded. |
| **Git LFS** | Not yet implemented | Repo is currently manageable; revisit if total GIF weight exceeds ~500 MB |
