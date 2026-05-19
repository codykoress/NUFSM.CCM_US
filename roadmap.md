# NUFSM CCM Ultrasound Curriculum — Roadmap

---

## 1. What's done

### Site structure
- [x] Quarto project initialized with `_quarto.yml` navbar
- [x] `index.qmd` — home page with links to all 11 modules
- [x] `credits.qmd` — attribution table organized by module, sourced from Google Sheets metadata
- [x] All 11 modules linked in navbar and home page

### Module content (written)
- [x] **Module 1** — Windows & Acquisition: four windows, machine setup, normal anatomy, normal variants, 8-question quiz
- [x] **Module 2** — Left Ventricular Function: systolic dysfunction, RWMA, Takotsubo, cardiogenic shock, 5-question quiz
- [x] **Module 3** — Right Ventricular Function: RV strain, D-sign, McConnell's sign, TAPSE, PE, ARDS cor pulmonale, 5-question quiz
- [x] **Module 4** — Pericardium: effusion sizing, tamponade, pericarditis, constrictive disease, Doppler assessment, 8-question quiz
- [x] **Module 5** — IVC & Volume Status: fluid responsiveness, distensibility index, VExUS/venous congestion, 5-question quiz
- [x] **Module 6** — Shock & Arrest Integration: 4-question framework, hemodynamic phenotypes table, 5 complex integration cases, 5-question quiz
- [x] **Module 7** — Basic Valve Assessment: AS, AR, MR (including flail/Coanda), MS, TR/RVSP estimation, 5-question quiz
- [x] **Module 8** — Lung Ultrasound: B-lines, effusion, pneumothorax, consolidation, BLUE protocol, 5-question quiz
- [x] **Module 9** — Abdominal Ultrasound: FAST, free fluid grading, bladder volume, hydronephrosis, ruptured ectopic, 5-question quiz
- [x] **Module 10** — DVT Compression Ultrasound: two-point compression, augmentation, catheter-associated DVT, 5-question quiz
- [x] **Module 11** — Procedural Guidance: IJ/subclavian/femoral CVC, thoracentesis, paracentesis, pericardiocentesis, 5-question quiz

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
| 1 | Normal studies across body habitus (obese, COPD, post-CABG) |
| 3 | Normal RV (thin free wall, brisk TAPSE); TAPSE M-mode measurement (normal vs reduced) |
| 4 | Small posterior effusion; normal pericardium (all windows); PW Doppler clips — mitral inflow, tricuspid inflow, hepatic vein; acute pericarditis with effusion; myopericarditis; effusive-constrictive pericarditis |
| 5 | Hepatic vein PW Doppler (normal + congestion); portal vein pulsatility |
| 6 | Scenario-specific loops for all integration cases (most currently text-only) |
| 7 | All valve pathology: calcific AS, AR diastolic jet, MR (central + eccentric/flail), MS hockey-stick deformity, TR jet with CW Doppler; color Doppler clips for each |
| 8 | Absent lung sliding / barcode sign (M-mode); lung point |
| 9, 10, 11 | No clips yet — entire visual layer for abdominal, DVT, and procedural modules |

### Metadata — credits page
- [ ] Resolve the 9 clips marked `*` (hyperdynamic LV, mod reduced EF ×2, anterior wall hypokinesia, septal flattening in PE, plethoric IVC, septal dyskinesis, ventricular fibrillation)
- [ ] Add two clips in the Google Sheet not yet embedded: *Pericardial Effusion vs Fat Pad* and *Pericardial Tamponade* (Module 4)
- [ ] Add metadata for all future clips to Google Sheet before embedding

### Per-module content gaps
- [ ] All modules: Anki deck links (referenced as "link coming soon" throughout)
- [ ] All modules: References & further reading sections
- [ ] Integration case video slots: replace "Loops for interpretation" with actual clips as they are sourced
- [ ] Module 6: "Before/after" serial exam comparison clip
- [ ] Credits page: Curriculum development section and Acknowledgments

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
| **Module 1 scope** | Acquisition + anatomy only — no pathology | Pericardial content fully moved to Module 4; Module 1 quiz focuses on window/structure identification |
| **Module 4 scope** | Comprehensive pericardial pathology | Absorbs all effusion/tamponade content from original Module 1 plus advanced pericarditis and constrictive disease |
| **Probe placement diagrams** | Custom SVGs (not GIFs or photos) | Allows precise anatomical annotation, indicator arrows, and rotation cues that no single photograph can convey; SVGs scale perfectly at any resolution |
| **PSAX SVG** | Ghost probe + blue rotation arrow | Shows the PLAX-to-PSAX transition explicitly — the 90° CW rotation is the most common technique error |
| **Integration case clips** | Text-only until scenario-matched clips are sourced | Using a mismatched clip is pedagogically worse than no clip; placeholder callouts preserved so slots are easy to fill |
| **Git LFS** | Not yet implemented | Repo is currently manageable; revisit if total GIF weight exceeds ~500 MB |
