# NUFSM CCM Ultrasound Curriculum — Roadmap

---

## 1. What's done

### Site structure
- [x] Quarto project initialized with `_quarto.yml` navbar
- [x] `index.qmd` — home page with links to all 9 modules
- [x] `credits.qmd` — attribution table organized by module, sourced from Google Sheets metadata
- [x] All 9 modules linked in navbar and home page
- [x] Module order finalized: cardiac (1–5) → lung/abdominal/DVT (6–8) → integration (9)

### Module content (written)
- [x] **Module 1** — Windows & Acquisition: four windows, machine setup, 8-question quiz *(normal anatomy/variants section removed — covered in module-specific normal sections)*
- [x] **Module 2** — Left Ventricular Function: systolic dysfunction, RWMA, Takotsubo, cardiogenic shock, 5-question quiz
- [x] **Module 3** — Right Ventricular Function: RV strain, D-sign, McConnell's sign, TAPSE, PE, ARDS cor pulmonale, 5-question quiz
- [x] **Module 4** — Pericardium: effusion sizing, tamponade physiology, loculated effusion, mimics & pitfalls, 6-question quiz *(scope narrowed to effusion/tamponade; pericarditis, myopericarditis, effusive-constrictive, and constrictive content removed)*
- [x] **Module 5** — IVC & Volume Status: fluid responsiveness, distensibility index, VExUS/venous congestion framework, 5-question quiz
- [x] **Module 6** — Lung Ultrasound: B-lines, effusion, pneumothorax, consolidation, BLUE protocol, 5-question quiz
- [x] **Module 7** — Abdominal Ultrasound: FAST, free fluid grading, bladder volume, hydronephrosis, ruptured ectopic, 5-question quiz
- [x] **Module 8** — DVT Compression Ultrasound: two-point compression, augmentation, catheter-associated DVT, 5-question quiz
- [x] **Module 9** — Shock & Arrest Integration: 4-question framework, hemodynamic phenotypes table, 5 complex integration cases, 5-question quiz

### Visual assets
- [x] Probe placement SVG diagrams (×4) for Module 1: subcostal, PLAX, PSAX (with rotation arrow), apical 4C
- [x] 37 GIF clips embedded across Modules 1–8 using `<img>` tags (autoplay, loop, no controls)
- [x] GIF source metadata tracked in Google Sheets; credits page populated with contributor names and POCUS Atlas links
- [x] 9 clips embedded but flagged `*` (missing contributor metadata — to be resolved)

---

## 2. Outstanding

### Clips — still needed

| Module | Missing clips |
|---|---|
| 3 | Normal RV (thin free wall, brisk TAPSE); TAPSE M-mode measurement (normal vs reduced) |
| 4 | Small posterior effusion; normal pericardium (all windows) |
| 5 | Hepatic vein PW Doppler (normal + congestion); portal vein pulsatility |
| 6 | Absent lung sliding / barcode sign (M-mode); lung point |
| 7 | No clips yet — entire visual layer for abdominal module |
| 8 | No clips yet — entire visual layer for DVT module |
| 9 | Scenario-specific loops for all integration cases (most currently text-only); before/after serial exam comparison clip |

### Metadata — credits page
- [ ] Resolve the 9 clips marked `*` (hyperdynamic LV, mod reduced EF ×2, anterior wall hypokinesia, septal flattening in PE, plethoric IVC, septal dyskinesis, ventricular fibrillation)
- [ ] Add two clips in the Google Sheet not yet embedded: *Pericardial Effusion vs Fat Pad* and *Pericardial Tamponade* (Module 4)
- [ ] Add metadata for all future clips to Google Sheet before embedding

### Per-module content gaps
- [ ] All modules: Anki deck links (referenced as "link coming soon" throughout)
- [ ] All modules: References & further reading sections
- [ ] Integration case video slots: replace "Loops for interpretation" with actual clips as they are sourced

### Site / infrastructure
- [ ] Scan logbook and competency assessment tool (referenced on home page — "coming soon")
- [ ] Decide on hosting platform and deploy (GitHub Pages, Quarto Pub, institutional server)
- [ ] Add `.gitignore` entry for large GIF files if repo size becomes an issue; consider Git LFS

---

## 3. Key decisions

| Decision | Choice made | Rationale |
|---|---|---|
| **Clip format** | GIF (not MP4) | Files sourced as GIFs from POCUS Atlas; GIFs autoplay and loop without controls using a plain `<img>` tag — no conversion step needed |
| **Clip embedding** | Raw HTML `<img>` inside callout-tip blocks | Avoids pandoc path-encoding issues with spaces in filenames; renders identically to Quarto image syntax |
| **Clip storage** | `modules/gifs/` flat folder | Simple relative path (`gifs/filename.gif`) from all module QMD files; no subfolders needed |
| **Clip attribution** | Google Sheets → credits.qmd | Metadata maintained in a shared sheet; credits page generated manually from that sheet and organized by module |
| **Curriculum scope** | 9 modules, focused basic POCUS only | Removed Module 7 (valve assessment) and Module 11 (procedural guidance) as beyond the scope of focused basic ultrasound; content trimmed throughout to match |
| **Module order** | Cardiac (1–5) → Lung/Abdominal/DVT (6–8) → Integration (9) | Integration placed last so fellows synthesize all prior modules before the capstone cases |
| **Module 1 scope** | Acquisition only — normal anatomy section removed | Normal anatomy is covered within each subsequent module's normal & variants section; a standalone section in Module 1 duplicated content and added scope |
| **Module 4 scope** | Effusion and tamponade only | Constrictive pericarditis, effusive-constrictive, acute pericarditis, and myopericarditis removed — these require advanced Doppler or are primarily clinical/non-echo diagnoses; bedside echo role is limited |
| **Module 5 scope** | IVC + VExUS venous congestion framework retained | VExUS (IVC, hepatic vein, portal vein) kept as it directly changes management decisions around fluid administration and decongestion in the ICU |
| **Probe placement diagrams** | Custom SVGs (not GIFs or photos) | Allows precise anatomical annotation, indicator arrows, and rotation cues that no single photograph can convey; SVGs scale perfectly at any resolution |
| **PSAX SVG** | Ghost probe + blue rotation arrow | Shows the PLAX-to-PSAX transition explicitly — the 90° CW rotation is the most common technique error |
| **Integration case clips** | Text-only until scenario-matched clips are sourced | Using a mismatched clip is pedagogically worse than no clip; placeholder callouts preserved so slots are easy to fill |
| **Git LFS** | Not yet implemented | Repo is currently manageable; revisit if total GIF weight exceeds ~500 MB |
