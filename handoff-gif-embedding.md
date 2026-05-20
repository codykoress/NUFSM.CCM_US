# Handoff — GIF Embedding for NUFSM CCM Ultrasound Curriculum

**Purpose:** Self-contained instructions for sourcing, adding, and crediting new ultrasound GIF clips across all 11 modules of this Quarto site.

---

## Project context

This is a Quarto static site at `C:\Users\codyk\Documents\GitHub\NUFSM.CCM_US\`. Eleven modules live in `modules/`. All GIF clips are stored flat in `modules/gifs/`. Credits and contributor metadata are tracked in a Google Sheet (link below) and rendered to `credits.qmd`.

---

## How GIFs are embedded

GIFs are embedded as raw HTML `<img>` tags directly inside Quarto callout blocks. Do **not** use Quarto's `![]()` markdown image syntax — filenames contain spaces and special characters that cause path-encoding issues with pandoc.

**Standard embed pattern:**

```html
<img src="gifs/filename.gif" style="width:100%; border-radius:4px;" alt="Descriptive alt text"/>
```

**Where to place it:** Inside the relevant `::: {.callout-tip}` block, after the descriptive text and before the closing `:::`.

**Example — before:**
```markdown
::: {.callout-tip}
**Video slot:** Subcostal four-chamber acquisition — probe position, indicator orientation, fanning technique.
:::
```

**Example — after:**
```markdown
::: {.callout-tip}
**Video slot:** Subcostal four-chamber acquisition — probe position, indicator orientation, fanning technique.

<img src="gifs/normal subcostal view.gif" style="width:100%; border-radius:4px;" alt="Normal subcostal four-chamber view"/>
:::
```

---

## File structure

```
modules/
  gifs/                        ← all GIF files, flat (no subfolders)
  images/                      ← SVG probe placement diagrams (Module 1 only)
  01-windows.qmd
  02-lv.qmd
  ...
credits.qmd                    ← attribution table — update whenever new clips are added
roadmap.md                     ← overall project status
handoff-gif-embedding.md       ← this file
```

---

## Metadata and attribution

**Google Sheet (contributor metadata):**
https://docs.google.com/spreadsheets/d/1ZGzjWniVL3xUzrFG72n1JV0aBqk3O3MiPBpPk6hh4AE/edit?usp=sharing

**All clips currently sourced from:** [The POCUS Atlas](https://www.thepocusatlas.com)
- Echocardiography clips: https://www.thepocusatlas.com/echocardiography-2
- Lung clips: https://www.thepocusatlas.com/pulmonary

**Workflow for each new clip:**
1. Save the GIF to `modules/gifs/` — keep the original filename
2. Add a row to the Google Sheet: Module | Title (filename without .gif) | Contributors | URL
3. Embed the clip in the correct module QMD using the `<img>` pattern above
4. Update `credits.qmd` — add a row to the correct module table

---

## Currently embedded (37 clips)

### Module 1 — Windows & Acquisition (`01-windows.qmd`)
| Filename | Location in file |
|---|---|
| `normal subcostal view.gif` | Subcostal callout |
| `Normal Parasternal Long Axis (PLAX) View.gif` | PLAX callout |
| `Normal Aortic Valve (Parasternal Short-Axis View).gif` | PSAX callout — AV level |
| `Normal Mitral Valve (Parasternal Short-Axis View).gif` | PSAX callout — MV level |
| `Parasternal Short Axis - Normal.gif` | PSAX callout — papillary muscle level |
| `apical+4+normal.gif` | Apical callout |

### Module 2 — LV Function (`02-lv.qmd`)
| Filename | Location in file |
|---|---|
| `Normal Parasternal Long Axis (PLAX) View.gif` | Image acquisition — PLAX callout |
| `Normal Parasternal Short Axis View.gif` | Image acquisition — PSAX callout |
| `apical+4+normal.gif` | Image acquisition — apical callout |
| `normal subcostal view.gif` | Image acquisition — subcostal callout |
| `hyperdynamic short axis.gif` | Normal section callout |
| `Reduced Ejection Fraction (Parasternal Long Axis View).gif` | Pathology — severely reduced EF callout |
| `Decreased EF (Parasternal Short).gif` | Pathology — severely reduced EF callout |
| `moderately reduced EF short axis.gif` | Pathology — mildly/mod reduced EF callout |
| `moderately reduced EF apical 4 chamber.gif` | Pathology — mildly/mod reduced EF callout |
| `anterior wall hypokinesia short axis.gif` | Pathology — RWMA callout |
| `Takotsubo Cardiomyopathy on Apical Two Chamber View.gif` | Pathology — RWMA callout |
| `New Onset Cardiomyopathy with Reduced Ejection Fraction (PLAX).gif` | Pathology — dilated LV callout |
| `Biventricular Failure (apical 4 chamber).gif` | Pathology — dilated LV callout |

### Module 3 — RV Function (`03-rv.qmd`)
| Filename | Location in file |
|---|---|
| `apical+4+normal.gif` | Image acquisition — A4C callout |
| `Normal Parasternal Short Axis View.gif` | Image acquisition — PSAX callout |
| `Normal Parasternal Long Axis (PLAX) View.gif` | Image acquisition — PLAX callout |
| `normal subcostal view.gif` | Image acquisition — subcostal callout |
| `RV Failure.gif` | Pathology — RV dilation callout |
| `Septal Flattening in Saddle Pulmonary Embolism.gif` | Pathology — D-sign callout |
| `McConnell Sign with RV Enlargement.gif` | Pathology — McConnell's callout |

### Module 4 — Pericardium (`04-pericardium.qmd`)
| Filename | Location in file |
|---|---|
| `Chronic+Pericardial+Effusion.gif` | Pathology — moderate/large effusion callout |
| `Cardiac Tamponade (Parasternal Short-Axis View).gif` | Pathology — tamponade callout |
| `Cardiac Tamponade Apical Four.gif` | Pathology — tamponade callout |
| `loculated pericardial effusion.gif` | Pathology — loculated effusion callout |
| `constrictive pericarditis.gif` | Pathology — constrictive pericarditis callout |

### Module 5 — IVC (`05-ivc.qmd`)
| Filename | Location in file |
|---|---|
| `Inferior Vena Cava Emptyting into Right Atrium.gif` | Image acquisition — IVC callout |
| `Inferior Vena Cava in Hypovolemia (Transverse).gif` | Pathology — small collapsible IVC callout |
| `Plethoric Inferior Vena Cava.gif` | Pathology — plethoric IVC callout |

### Module 6 — Integration (`06-integration.qmd`)
| Filename | Location in file |
|---|---|
| `Septal Dyskinesis (Subcostal View).gif` | 4-question framework callout |
| `Ventricular Fibrillation.gif` | Integration Case 2 callout (post-arrest) |

### Module 7 — Valves (`07-valves.qmd`)
| Filename | Location in file |
|---|---|
| `apical+5+normal.gif` | Image acquisition — apical 5C callout |

### Module 8 — Lung Ultrasound (`08-lung.qmd`)
| Filename | Location in file |
|---|---|
| `Normal Lung Sliding.gif` | Normal section callout |
| `A - Lines - Normal Lung.gif` | Normal section callout |
| `B-Lines - Pulmonary Edema.gif` | Pathology — B-lines callout |
| `pleural effusion.gif` | Pathology — pleural effusion callout |
| `air bronchograms pneumonia.gif` | Pathology — consolidation callout |

---

## Missing clips — what still needs to be sourced

Search the POCUS Atlas first. If not available there, note the alternative source and update the Google Sheet accordingly.

### Module 1
- [ ] Normal studies across body habitus (obese patient, COPD, post-CABG)
  → Place in: normal variants section callout (`**Video slots:** Normal studies across body habitus...`)

### Module 3
- [ ] Normal RV on apical 4C — thin free wall, RV clearly smaller than LV
  → Place in: normal section callout (`**Video slots:** Normal RV in apical four-chamber...`)
- [ ] TAPSE M-mode measurement — normal (>17 mm) vs reduced
  → Place in: pathology — reduced TAPSE callout (`**Video slot:** TAPSE measurement by M-mode...`)

### Module 4
- [ ] Small posterior effusion (PLAX) — thin stripe, no chamber collapse
  → Place in: pathology — small effusion callout (`**Video slot:** Small posterior effusion on PLAX...`)
- [ ] Normal pericardium — each window (subcostal, PLAX, A4C)
  → Place in: normal section callout (`**Video slots:** Normal pericardium in each window...`)
- [ ] Mitral inflow PW Doppler — normal E/A; >25% respiratory variation in constriction
  → Place in: image acquisition — mitral inflow callout
- [ ] Tricuspid inflow PW Doppler — reciprocal E-wave variation in constriction
  → Place in: image acquisition — tricuspid inflow callout
- [ ] Hepatic vein PW Doppler — expiratory diastolic flow reversal in constriction
  → Place in: image acquisition — hepatic vein callout (Module 4) and Module 5 hepatic vein callout
- [ ] Acute pericarditis — small/moderate effusion, no tamponade physiology
  → Place in: pathology — acute pericarditis callout
- [ ] Myopericarditis — pericarditis + wall motion abnormality
  → Place in: pathology — myopericarditis callout
- [ ] Effusive-constrictive pericarditis — persistent constrictive physiology after drainage
  → Place in: pathology — effusive-constrictive callout
- [ ] *Pericardial Effusion vs Fat Pad* — already in Google Sheet, file not yet in `modules/gifs/`
- [ ] *Pericardial Tamponade* — already in Google Sheet, file not yet in `modules/gifs/`

### Module 5
- [ ] Hepatic vein PW Doppler — normal flow vs diastolic reversal in venous congestion
  → Place in: image acquisition — hepatic vein callout (`**Video slot:** Hepatic vein PW Doppler...`)
- [ ] Portal vein PW Doppler — monophasic normal vs pulsatile in severe congestion
  → Place in: image acquisition — portal vein callout

### Module 6
- [ ] Scenario-matched loops for all 5 integration cases (currently text-only except Case 2)
  → Place in: each case's `**Video slot:** Loops for interpretation.` callout
- [ ] Before/after serial exam comparison (fluid bolus response)
  → Place in: serial exams section callout (`**Video slot:** Before/after comparison...`)
- [ ] Mixed shock state clip (reduced EF with small IVC)
  → Place in: "When findings conflict" callout

### Module 7 — **Priority: entire pathology layer missing**
- [ ] Calcific aortic stenosis — dense leaflet calcification, reduced opening (PLAX + PSAX)
- [ ] Color Doppler turbulent jet in systole across aortic valve
- [ ] Reduced aortic valve orifice area on PSAX
- [ ] Acute AR — diastolic jet, hyperdynamic LV, premature MV closure
- [ ] Chronic AR — dilated LV, large AR jet (apical 5C or APLAX)
- [ ] Acute MR — eccentric/wall-hugging jet, hyperdynamic LV (flail leaflet)
- [ ] Chronic MR — large central jet, dilated LA
- [ ] Ischemic MR — inferior RWMA with posteriorly directed jet
- [ ] Mitral stenosis — hockey-stick anterior leaflet deformity (PLAX)
- [ ] MS commissural fusion on PSAX — reduced orifice area
- [ ] TR jet on color Doppler (A4C)
- [ ] CW Doppler through TR jet — peak velocity for RVSP calculation
- [ ] Normal aortic, mitral, tricuspid valve 2D + color Doppler (normal variants section)
  → All valve clips: place in respective pathology callouts in `07-valves.qmd`

### Module 8
- [ ] Absent lung sliding — barcode/stratosphere sign on M-mode
- [ ] Lung point — transition from absent to present sliding (pneumothorax confirmed)
  → Place in: pneumothorax callout (`**Video slots:** Absent lung sliding...`)

### Modules 9, 10, 11
No clips embedded yet. Entire visual layer needs sourcing.

**Module 9 — Abdominal (`09-abdominal.qmd`)**
- [ ] FAST — RUQ (Morison's pouch), LUQ, suprapubic, subxiphoid views
- [ ] Free fluid grading (trace, moderate, large)
- [ ] Bladder volume assessment
- [ ] Hydronephrosis (mild, moderate, severe)
- [ ] Ruptured ectopic pregnancy — free fluid + adnexal mass

**Module 10 — DVT (`10-dvt.qmd`)**
- [ ] Two-point compression — compressible vein (normal) vs non-compressible (DVT)
- [ ] Augmentation with calf squeeze
- [ ] Catheter-associated upper extremity DVT
- [ ] Fresh (anechoic) thrombus — the "empty vein" pitfall

**Module 11 — Procedural (`11-procedural.qmd`)**
- [ ] IJ cannulation — short-axis and long-axis approaches
- [ ] Needle tip visualization in short-axis
- [ ] Thoracentesis — pleural fluid targeting
- [ ] Paracentesis — ascites targeting, bowel avoidance
- [ ] Pericardiocentesis — needle trajectory on subcostal view
- [ ] Agitated saline bubble study — confirming pericardial vs pleural entry

---

## Updating credits.qmd after adding new clips

`credits.qmd` has one table per module. Add a new row for each clip embedded:

```markdown
| Clip description | Contributor name, role, institution | [POCUS Atlas](URL) |
```

If contributor metadata is unknown at time of embedding, use `\*` in the contributor cell and flag it for follow-up. Do not leave the row out entirely — an asterisk in the table is easier to find and resolve than a missing entry.

---

## Notes / pitfalls

- **Filenames with `+` signs** (e.g., `apical+4+normal.gif`, `Chronic+Pericardial+Effusion.gif`) — use the filename exactly as-is in the `src` attribute. The `+` is a valid character in HTML src paths.
- **Filenames with spaces** — HTML `<img src="...">` handles spaces in quoted attributes fine. Do not URL-encode them.
- **Parentheses in filenames** (e.g., `Normal Aortic Valve (Parasternal Short-Axis View).gif`) — fine in HTML src.
- **Do not rename existing GIF files** — existing `<img>` tags in the modules reference the current filenames. Renaming a file without updating every reference will break that clip silently.
- **One GIF folder, flat** — do not create subfolders inside `modules/gifs/`. All QMD files reference `gifs/filename.gif` and would need updating if a subfolder is introduced.
- **Integration case clips** — only embed a clip in a case's "Loops for interpretation" slot if it matches the case scenario. A mismatched clip is more confusing than no clip. Leave the text-only placeholder until a scenario-appropriate clip is available.
