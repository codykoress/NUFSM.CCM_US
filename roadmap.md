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
- [x] **Module 4** — Pericardium: effusion sizing, tamponade, pericarditis (constrictive disease scoped out), Doppler assessment, 6-question quiz
- [x] **Module 5** — IVC & Volume Status: fluid responsiveness, distensibility index, VExUS/venous congestion, 5-question quiz
- [x] **Module 6** — Shock & Arrest Integration: 4-question framework, hemodynamic phenotypes table, 5 complex integration cases, 5-question quiz
- [x] **Module 7** — Basic Valve Assessment: AS, AR, MR (including flail/Coanda), MS, TR/RVSP estimation, 5-question quiz
- [x] **Module 8** — Lung Ultrasound: B-lines, effusion, pneumothorax, consolidation, BLUE protocol, 5-question quiz
- [x] **Module 9** — Abdominal Ultrasound: FAST, free fluid grading, bladder volume, hydronephrosis, ruptured ectopic, 5-question quiz
- [x] **Module 10** — DVT Compression Ultrasound: two-point compression, augmentation, catheter-associated DVT, 5-question quiz
- [x] **Module 11** — Procedural Guidance: IJ/subclavian/femoral CVC, thoracentesis, paracentesis, pericardiocentesis, 5-question quiz

### Visual assets
- [x] Probe placement SVG diagrams (×4) for Module 1: subcostal, PLAX, PSAX (with rotation arrow), apical 4C
- [x] **55 image clips (54 GIF + 1 AVIF) embedded across Modules 1–8**, distributed as: M1=6, M2=20, M3=9, M4=8, M5=3, M6=2, M7=2, M8=5
- [x] Normal acquisition clips intentionally duplicated across Modules 1, 2, 3 for module self-containment — learner can study each module standalone
- [x] GIF source metadata tracked in Google Sheets; credits page populated with contributor names and POCUS Atlas links
- [x] Module 2 integration cases (1–4) — all loops embedded
- [x] Module 3 Case 2 (submassive PE) — loops embedded
- [x] Module 4 PLAX/subcostal effusion variants and normal mitral inflow Doppler (AVIF) — embedded
- [x] Module 7 severe AS on PSX — embedded
- [ ] 22 clips embedded but flagged `*` (missing contributor metadata — to be resolved)

---

## 2. Outstanding

### Clips — still needed

| Module | Missing clips |
|---|---|
| 1 | Normal studies across body habitus (obese, COPD, post-CABG) |
| 2 | Normal LV in obese patient / patient with LVH (body habitus variants) |
| 3 | Normal RV in A4C (thin free wall, brisk TAPSE); TAPSE M-mode (normal vs reduced); Case 1 (massive PE), Case 3 (ARDS cor pulmonale), Case 4 (RV infarct) loops |
| 4 | Subcostal & A4C acquisition for pericardial assessment; normal pericardium in each window; normal hepatic vein flow; small posterior PLAX effusion; acute pericarditis with effusion; myopericarditis; all 6 integration case loops |
| 5 | Normal IVC + athlete variant; hepatic vein PW Doppler (normal vs congestion); portal vein PW Doppler (monophasic vs pulsatile); venous congestion pattern; all 4 integration case loops |
| 6 | Mixed shock state (reduced EF + small IVC); before/after fluid bolus serial exam; Cases 1, 3, 4, 5 loops |
| 7 | All acquisition slots (PLAX/PSAX/A4C with color Doppler); normal valves library; calcific AS on PLAX + color Doppler turbulent jet; acute AR + chronic AR; acute MR (flail + eccentric) + chronic MR + ischemic MR; MS hockey stick + commissural fusion; TR color jet + CW Doppler for RVSP; Cases 1 and 2 loops |
| 8 | BLUE zone anatomy diagram clip; absent lung sliding / barcode sign (M-mode); lung point; BLUE protocol walkthrough; all 4 integration case loops |
| 9 | Entire visual layer — RUQ/LUQ/suprapubic acquisition, bladder volume, normal kidney, FAST findings (positive vs negative), ascites, urinary retention, hydronephrosis grades 1–3, all 4 case loops |
| 10 | Entire visual layer — CFV/femoral/popliteal acquisition, normal compression + augmentation, non-compressible CFV (echogenic & anechoic thrombus), partial compressibility, absent augmentation, all 3 case loops |
| 11 | Entire visual layer — IJ access (transverse, short-axis, long-axis, wire confirmation), infraclavicular, femoral; pre-procedural + real-time thoracentesis, paracentesis, pericardiocentesis with agitated saline; all 3 case loops |

**Rough total still needed:** ~90 clips. Tiered by priority: high (M3, M4, M6, M7 — partially filled, ~35 clips) → low (M1, M2, M5, M8 — single missing slots, ~16 clips) → medium effort but bulk (M9, M10, M11 — entirely empty, ~39 clips).

### Metadata — credits page
- [ ] Resolve the 22 clips marked `*` (newly-added Module 2 integration case clips, Module 3 Case 2 clips, Module 4 PLAX/subcostal/Doppler additions, Module 7 severe AS, plus the original 8 unresolved placeholders)
- [ ] Add two clips in the Google Sheet not yet sourced or embedded: *Pericardial Effusion vs Fat Pad* and *Pericardial Tamponade* (Module 4)
- [ ] Add metadata for all future clips to Google Sheet before embedding

### Unused files
- [ ] `constrictive pericarditis.gif` and `constrictive pericarditis subcostal.gif` are in `modules/gifs/` but no longer referenced (constrictive section dropped from Module 4) — safe to delete

### Per-module content gaps
- [ ] All modules: Anki deck links (referenced as "link coming soon" throughout)
- [ ] All modules: References & further reading sections
- [ ] Integration case video slots: replace "Loops for interpretation" with actual clips as they are sourced (see Clips table above)
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
