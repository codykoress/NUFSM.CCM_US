# Clip Embed Worksheet — Integration Case Video Slots

Ready-to-paste `<img>` blocks for the **28 empty `Loops for interpretation.` placeholders** across the integration-case sections. All recommended clips are from **The POCUS Atlas** (CC BY-NC — already the project's attributed source).

## How to use this sheet

For each slot below:

1. **Download** the recommended clip from the linked POCUS Atlas gallery.
2. **Save** it into `modules/gifs/` using the exact **Save as** filename listed (the `<img src>` already points to it).
3. **Log** the clip in the Google Sheet tracking file (contributor + Atlas URL) — required *before* embedding per `CLAUDE.md`.
4. **Replace** the placeholder callout in the target QMD:
   ```markdown
   ::: {.callout-tip}
   Loops for interpretation.
   :::
   ```
   with the **Embed block** given for that slot. (Some placeholders have extra descriptive text after the em-dash, e.g. `Loops for interpretation — complete four-window exam.` — replace the whole callout.)
5. When all clips in a module are embedded, tick the module off in `roadmap.md`.

Line numbers are as of this writing; confirm the case heading if they've shifted.

> **Style:** every block uses the project convention — raw `<img>` in a `callout-tip`, `style="width:100%; border-radius:4px;"`. Never Quarto image syntax.

---

## Module 03 — RV Function (`modules/03-rv.qmd`)

Gallery: <https://www.thepocusatlas.com/right-ventricular-dysfunction>

### Case 1 — Massive PE (line ~197)
Recommended Atlas clips: *Apical 4 Chamber with McConnell sign and clot* + *D Sign in Right Heart Strain*

```markdown
::: {.callout-tip}
<img src="gifs/A4C - M3 Case 1 Massive PE — McConnell sign and clot in transit.gif" style="width:100%; border-radius:4px;" alt="Apical four-chamber: severe RV dilation, McConnell's sign, clot in transit — massive PE"/>

<img src="gifs/PSX - M3 Case 1 Massive PE — D-sign right heart strain.gif" style="width:100%; border-radius:4px;" alt="Parasternal short axis: D-sign from RV pressure overload — massive PE"/>
:::
```

### Case 3 — ARDS and RV failure (line ~237)
Recommended Atlas clip: *Acute Cor Pulmonale*

```markdown
::: {.callout-tip}
<img src="gifs/PSX - M3 Case 3 ARDS acute cor pulmonale — D-sign.gif" style="width:100%; border-radius:4px;" alt="Parasternal short axis: dilated RV with D-sign throughout the cycle — acute cor pulmonale in ARDS"/>
:::
```

### Case 4 — RV infarct (line ~256)
Recommended Atlas clip: *McConnell's Sign Due to NSTEMI* (RV infarct, mid-RCA occlusion)

```markdown
::: {.callout-tip}
<img src="gifs/A4C - M3 Case 4 RV infarct — free wall hypokinesis.gif" style="width:100%; border-radius:4px;" alt="Apical four-chamber: RV free wall hypokinesis with inferior LV involvement — RV infarct"/>
:::
```

---

## Module 04 — Pericardium (`modules/04-pericardium.qmd`)

Gallery: <https://www.thepocusatlas.com/pericardial-disease>

### Case 1 — Post-procedure tamponade (line ~207)
Recommended Atlas clip: *Circumferential Pericardial Effusion with Tamponade* (or *Pericardial Tamponade*)

```markdown
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 1 Tamponade — RV diastolic and RA systolic collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: large circumferential effusion with RV diastolic and RA systolic collapse — tamponade"/>
:::
```

### Case 2 — Cancer, very large effusion (line ~226)
Recommended Atlas clip: *Cardiac Tamponade with Swinging Heart* — ⚠️ Atlas clip also shows collapse; closest available for "swinging heart, no collapse." Substitute if you find a large-effusion-without-tamponade loop.

```markdown
::: {.callout-tip}
<img src="gifs/M4 Case 2 Very large effusion — swinging heart.gif" style="width:100%; border-radius:4px;" alt="Very large circumferential pericardial effusion with swinging heart motion"/>
:::
```

### Case 3 — Undifferentiated shock (line ~245)
Recommended Atlas clip: *Cardiac Tamponade – Subxiphoid View* (moderate effusion + RV diastolic collapse)

```markdown
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 3 Moderate effusion — right chamber collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: moderate pericardial effusion with right atrial collapse"/>
:::
```

### Case 4 — Dialysis / uremic (line ~264)
Recommended Atlas clip: *Subxiphoid View of Pericardial Effusion* (no tamponade)

```markdown
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 4 Small-moderate posterior effusion — no tamponade.gif" style="width:100%; border-radius:4px;" alt="Subcostal: small-to-moderate posterior effusion without chamber collapse — uremic pericarditis"/>
:::
```

### Case 5 — Trauma / hemopericardium (line ~283)
Recommended Atlas clip: *Traumatic Tamponade* (effusion + hematoma + RV collapse)

```markdown
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 5 Traumatic hemopericardium — RV collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: echo-free stripe anterior to the RV with diastolic collapse — traumatic hemopericardium"/>
:::
```

### Case 6 — Recurrent pericarditis (line ~302)
Recommended Atlas clip: *Acute Pericarditis* (small effusion, thickened pericardium)

```markdown
::: {.callout-tip}
<img src="gifs/M4 Case 6 Small posterior effusion — normal LV.gif" style="width:100%; border-radius:4px;" alt="Small posterior pericardial effusion with normal LV function — recurrent pericarditis"/>
:::
```

---

## Module 05 — IVC & Volume Status (`modules/05-ivc.qmd`)

Gallery: <https://www.thepocusatlas.com/ivc-abnormal-venous-waveforms>

### Case 1 — Septic, fluid responsive (line ~166)
Recommended Atlas clip: *Inferior Vena Cava in Hypovolemia*

```markdown
::: {.callout-tip}
<img src="gifs/M5 Case 1 Small collapsible IVC — hypovolemia.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: small diameter with greater-than-70-percent inspiratory collapse"/>
:::
```

### Case 2 — Congested CHF (line ~185)
Recommended Atlas clip: *Plethoric IVC in Biventricular Failure*. ⚠️ **Soft gap:** hepatic-vein systolic-flow-reversal + pulsatile-portal Doppler waveforms are not in this gallery — source separately (POCUS 101 VExUS or GrepMed) and add a second `<img>` if desired.

```markdown
::: {.callout-tip}
<img src="gifs/M5 Case 2 Plethoric IVC — venous congestion.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: dilated and non-collapsing — venous congestion"/>
:::
```

### Case 3 — Post-arrest, ventilated (line ~204)
Recommended Atlas clip: *Significantly Enlarged IVC in Acute Heart Failure*

```markdown
::: {.callout-tip}
<img src="gifs/M5 Case 3 Enlarged IVC — low distensibility ventilated.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: enlarged with minimal distensibility in a mechanically ventilated patient"/>
:::
```

### Case 4 — Cardiogenic vs septic (line ~223)
Recommended Atlas clips: *Plethoric Inferior Vena Cava* + a reduced-EF LV loop (from the RV/cardiomyopathy galleries)

```markdown
::: {.callout-tip}
<img src="gifs/M5 Case 4 Plethoric IVC — cardiogenic shock.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: dilated, non-collapsing — cardiogenic shock"/>

<img src="gifs/M5 Case 4 Globally hypokinetic LV — severely reduced EF.gif" style="width:100%; border-radius:4px;" alt="Globally hypokinetic left ventricle with severely reduced ejection fraction"/>
:::
```

---

## Module 09 — Shock & Arrest Integration (`modules/06-integration.qmd`)

Galleries: <https://www.thepocusatlas.com/shock> + the cardiac galleries above. These are multi-window composites — anchor each on the plethoric-IVC / cor-pulmonale / effusion loops.

### Case 1 — Undifferentiated shock, four-window exam (line ~121)
```markdown
::: {.callout-tip}
<img src="gifs/M9 Case 1 Biventricular failure — plethoric IVC.gif" style="width:100%; border-radius:4px;" alt="Biventricular failure: reduced-EF LV, dilated RV with D-sign, plethoric IVC"/>
:::
```

### Case 3 — Hypoxic respiratory failure (line ~167)
```markdown
::: {.callout-tip}
<img src="gifs/M9 Case 3 Decompensated HF — dilated LV and RV.gif" style="width:100%; border-radius:4px;" alt="Decompensated heart failure: dilated reduced-EF LV, RV volume overload, plethoric IVC"/>
:::
```

### Case 4 — "Isn't responding" / malignant effusion (line ~190)
```markdown
::: {.callout-tip}
<img src="gifs/M9 Case 4 Pericardial effusion with RV pressure overload.gif" style="width:100%; border-radius:4px;" alt="Moderate pericardial effusion without tamponade plus RV pressure-overload D-sign"/>
:::
```

### Case 5 — Post-op won't wean (line ~213)
⚠️ Weakest match / lowest priority — post-surgical windows are hard to source cleanly.

```markdown
::: {.callout-tip}
<img src="gifs/M9 Case 5 Post-surgical — small effusion mild LV dysfunction.gif" style="width:100%; border-radius:4px;" alt="Post-surgical windows: small anterior effusion with mildly reduced LV function"/>
:::
```

---

## Module 06 — Lung Ultrasound (`modules/08-lung.qmd`)

Gallery: <https://www.thepocusatlas.com/lung>

### Case 1 — Flash pulmonary edema (line ~284)
Recommended Atlas clip: *Confluent B Lines*

```markdown
::: {.callout-tip}
<img src="gifs/M6 Case 1 Bilateral confluent B-lines — pulmonary edema.gif" style="width:100%; border-radius:4px;" alt="Anterior chest: bilateral confluent B-lines — cardiogenic pulmonary edema"/>
:::
```

### Case 2 — Post-intubation hypoxia (line ~303)
Recommended Atlas clip: *Bar Code Sign – Pneumothorax* (M-mode)

```markdown
::: {.callout-tip}
<img src="gifs/M6 Case 2 Absent lung sliding — barcode sign M-mode.gif" style="width:100%; border-radius:4px;" alt="M-mode: barcode sign with absent lung sliding on the left"/>
:::
```

### Case 3 — Trauma pneumothorax (line ~322)
Recommended Atlas clip: *Lung Point Finding*

```markdown
::: {.callout-tip}
<img src="gifs/M6 Case 3 Lung point — pneumothorax.gif" style="width:100%; border-radius:4px;" alt="Lung point at the mid-axillary line — pathognomonic for pneumothorax"/>
:::
```

### Case 4 — ICU fever and hypoxia (line ~341)
Recommended Atlas clip: *PLAPS consolidation*. ⚠️ Atlas clip shows **dynamic** air bronchograms; the case specifies **static** (mucus plug) — that static-vs-dynamic contrast is the teaching point, so ideally source a static-bronchogram loop.

```markdown
::: {.callout-tip}
<img src="gifs/M6 Case 4 Consolidation with air bronchograms — PLAPS.gif" style="width:100%; border-radius:4px;" alt="Right PLAPS: consolidation with air bronchograms and a small adjacent effusion"/>
:::
```

---

## Module 07 — Abdominal Ultrasound (`modules/09-abdominal.qmd`)

Galleries: <https://www.thepocusatlas.com/trauma> + <https://www.thepocusatlas.com/renal>

### Case 1 — Positive FAST (line ~242)
Recommended Atlas clips: *Positive FAST – RUQ – Morison's Pouch* + *Positive FAST – LUQ* + *Positive FAST Pelvis – Transverse*

```markdown
::: {.callout-tip}
<img src="gifs/M7 Case 1 Positive FAST — Morison pouch.gif" style="width:100%; border-radius:4px;" alt="RUQ: free fluid in Morison's pouch"/>

<img src="gifs/M7 Case 1 Positive FAST — splenorenal.gif" style="width:100%; border-radius:4px;" alt="LUQ: free fluid in the splenorenal space"/>

<img src="gifs/M7 Case 1 Positive FAST — pelvis.gif" style="width:100%; border-radius:4px;" alt="Suprapubic: large volume of free fluid in the pelvis"/>
:::
```

### Case 2 — Urosepsis / pyonephrosis (line ~261)
Recommended Atlas clip: *Pyonephrosis in Setting of Proximal Ureteral Stone*

```markdown
::: {.callout-tip}
<img src="gifs/M7 Case 2 Pyonephrosis — hydronephrosis with debris.gif" style="width:100%; border-radius:4px;" alt="Right kidney: grade 2–3 hydronephrosis with internal echoes (pyonephrosis)"/>
:::
```

### Case 3 — Urinary retention (line ~280)
Recommended Atlas clip: *Large Prostate* (full bladder + retention)

```markdown
::: {.callout-tip}
<img src="gifs/M7 Case 3 Distended bladder — urinary retention.gif" style="width:100%; border-radius:4px;" alt="Suprapubic: markedly distended bladder — urinary retention"/>
:::
```

### Case 4 — Ruptured ectopic (line ~299)
Recommended Atlas clip: *Subtle RUQ +FAST* (known ectopic) + a pelvic free-fluid loop

```markdown
::: {.callout-tip}
<img src="gifs/M7 Case 4 Ruptured ectopic — pelvic free fluid.gif" style="width:100%; border-radius:4px;" alt="Pelvis: large free fluid with no intrauterine pregnancy — ruptured ectopic"/>

<img src="gifs/M7 Case 4 Ruptured ectopic — RUQ free fluid.gif" style="width:100%; border-radius:4px;" alt="RUQ: free fluid extending to Morison's pouch — hemoperitoneum"/>
:::
```

---

## Module 08 — Vascular / DVT (`modules/10-dvt.qmd`)

Gallery: <https://www.thepocusatlas.com/dvt>

### Case 1 — Submassive PE / proximal DVT (line ~189)
Recommended Atlas clip: *Right Femoral DVT* (non-compressible CFV, echogenic thrombus)

```markdown
::: {.callout-tip}
<img src="gifs/M8 Case 1 Non-compressible CFV — echogenic thrombus.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: non-compressible with echogenic intraluminal thrombus"/>
:::
```

### Case 2 — ICU unilateral leg swelling (line ~208)
Recommended Atlas clips: *DVT of Left Common Femoral Vein* + *Occlusive DVT of the Left Popliteal Vein*

```markdown
::: {.callout-tip}
<img src="gifs/M8 Case 2 Non-compressible CFV — proximal DVT.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: non-compressible hypoechoic thrombus"/>

<img src="gifs/M8 Case 2 Non-compressible popliteal — occlusive DVT.gif" style="width:100%; border-radius:4px;" alt="Popliteal vein: non-compressible, occlusive thrombus"/>
:::
```

### Case 3 — Catheter-associated DVT (line ~227)
Recommended Atlas clip: *DVT – Common Femoral* (partial compression). ⚠️ Catheter-association is clinical context, not a distinct imaging appearance — GrepMed has explicitly labeled catheter-DVT loops if you want an exact one.

```markdown
::: {.callout-tip}
<img src="gifs/M8 Case 3 Partially compressible CFV — catheter-associated DVT.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: partially compressible with posterior-wall thrombus — catheter-associated DVT"/>
:::
```

---

## Outstanding soft gaps

| Slot | Gap | Where to source |
|---|---|---|
| M05 Case 2 | Hepatic-vein systolic-flow-reversal + pulsatile-portal Doppler | POCUS 101 VExUS page or GrepMed |
| M06 Case 4 | **Static** (not dynamic) air bronchograms | Search for a mucus-plug/atelectasis loop |
| M08 Case 3 | Explicitly-labeled catheter-associated DVT | GrepMed |
| M09 Case 5 | Post-surgical windows, small effusion + mild LV dysfunction | Lower priority; may stay text-only |

**Reminder:** log every clip in the Google Sheet before embedding, then regenerate the relevant section of `credits.qmd`.
