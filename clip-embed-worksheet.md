# Adding the Video Clips — Step-by-Step Guide

This guide walks you through filling in the **28 missing video clips** in the module case sections. You don't need to be technical — every clip is just **download → rename → drop in a folder → paste one snippet of text**. Work through it one clip at a time; you can stop and come back whenever.

---

## Before you start (read once)

**The two places you'll be working:**

| What | Where it lives on your computer |
|---|---|
| The folder your video files go into | `C:\Users\codyk\Documents\GitHub\NUFSM.CCM_US\modules\gifs\` |
| The module files you'll paste text into | `C:\Users\codyk\Documents\GitHub\NUFSM.CCM_US\modules\` (the files ending in `.qmd`) |

**How to open a `.qmd` file to edit it:** these are just text files. Right-click the file → **Open with** → **Notepad** (or VS Code if you have it). You'll see the module's text. Don't worry about the code around it — you're only ever swapping out one small box.

**What you're looking for inside each module** — a little box that looks exactly like this:

```
::: {.callout-tip}
Loops for interpretation.
:::
```

That's a **placeholder** — a "video goes here" sign. Your job is to replace that whole three-line box with the snippet this guide gives you. (A few placeholders have extra words, like `Loops for interpretation — complete four-window exam.` — replace the whole box anyway.)

**Tip:** To find a placeholder quickly, press **Ctrl+F** in Notepad, type `Loops for interpretation`, and press Enter. It jumps right to it.

---

## The 5 steps for every clip

Each clip entry below gives you three things: **(A)** the video to find, **(B)** the exact filename, and **(C)** the snippet to paste. Here's how to use them:

1. **Open the website link** for that module (I've linked The POCUS Atlas gallery at the top of each module's section). Find the video named in part **(A)**.
2. **Download it.** On the website, right-click the video → **Save video as…** (or **Save image as…**). Save it into the `gifs` folder listed above.
3. **Rename the file** to match part **(B)** *exactly*. ⭐ **Easiest way:** highlight the filename in this guide, copy it (Ctrl+C), then right-click your downloaded file → **Rename** → paste (Ctrl+V). Copying avoids typos — some names contain a long dash (—) that's hard to type.
4. **Write it in your Google Sheet** tracking file (the clip name + which POCUS Atlas page it came from). This has to happen *before* the next step — it's how the credits page stays accurate.
5. **Open the module file** (part C tells you which one), find the `Loops for interpretation.` box for that case, and replace the whole box with the snippet in part **(C)**. Copy the snippet exactly. Save the file.

That's it. When you've done every clip in a module, check it off in `roadmap.md`.

> ⚠️ **If a video downloads as an `.mp4` (a movie file) instead of a `.gif`** — that's fine, just tell me and I'll convert it for you so it matches the filename.

> ⚠️ Some entries are marked **"tricky match"** — the perfect video may not exist on the Atlas. Use the suggested one, or skip it and tell me and we'll hunt elsewhere.

---

## Progress checklist

Copy this and tick off as you go:

- [ ] Module 03 RV — Case 1, Case 3, Case 4
- [ ] Module 04 Pericardium — Cases 1, 2, 3, 4, 5, 6
- [ ] Module 05 IVC — Cases 1, 2, 3, 4
- [ ] Module 06 Lung — Cases 1, 2, 3, 4
- [ ] Module 07 Abdominal — Cases 1, 2, 3, 4
- [ ] Module 08 DVT — Cases 1, 2, 3
- [ ] Module 09 Integration — Cases 1, 3, 4, 5

---

# Module 03 — RV Function

**Website:** <https://www.thepocusatlas.com/right-ventricular-dysfunction>
**Module file to edit:** `modules/03-rv.qmd`

### Clip — Case 1: Massive PE  *(this one uses two videos)*

**(A) Find these two videos:** *Apical 4 Chamber with McConnell sign and clot* **and** *D Sign in Right Heart Strain*

**(B) Save the two files as (copy each line exactly):**
```
A4C - M3 Case 1 Massive PE — McConnell sign and clot in transit.gif
PSX - M3 Case 1 Massive PE — D-sign right heart strain.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/A4C - M3 Case 1 Massive PE — McConnell sign and clot in transit.gif" style="width:100%; border-radius:4px;" alt="Apical four-chamber: severe RV dilation, McConnell's sign, clot in transit — massive PE"/>

<img src="gifs/PSX - M3 Case 1 Massive PE — D-sign right heart strain.gif" style="width:100%; border-radius:4px;" alt="Parasternal short axis: D-sign from RV pressure overload — massive PE"/>
:::
```

### Clip — Case 3: ARDS and RV failure

**(A) Find this video:** *Acute Cor Pulmonale*

**(B) Save the file as:**
```
PSX - M3 Case 3 ARDS acute cor pulmonale — D-sign.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/PSX - M3 Case 3 ARDS acute cor pulmonale — D-sign.gif" style="width:100%; border-radius:4px;" alt="Parasternal short axis: dilated RV with D-sign throughout the cycle — acute cor pulmonale in ARDS"/>
:::
```

### Clip — Case 4: RV infarct

**(A) Find this video:** *McConnell's Sign Due to NSTEMI* (an RV infarct case)

**(B) Save the file as:**
```
A4C - M3 Case 4 RV infarct — free wall hypokinesis.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/A4C - M3 Case 4 RV infarct — free wall hypokinesis.gif" style="width:100%; border-radius:4px;" alt="Apical four-chamber: RV free wall hypokinesis with inferior LV involvement — RV infarct"/>
:::
```

---

# Module 04 — Pericardium

**Website:** <https://www.thepocusatlas.com/pericardial-disease>
**Module file to edit:** `modules/04-pericardium.qmd`

### Clip — Case 1: Post-procedure tamponade

**(A) Find this video:** *Circumferential Pericardial Effusion with Tamponade* (or *Pericardial Tamponade*)

**(B) Save the file as:**
```
Subcostal - M4 Case 1 Tamponade — RV diastolic and RA systolic collapse.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 1 Tamponade — RV diastolic and RA systolic collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: large circumferential effusion with RV diastolic and RA systolic collapse — tamponade"/>
:::
```

### Clip — Case 2: Cancer, very large effusion  *(tricky match)*

**(A) Find this video:** *Cardiac Tamponade with Swinging Heart*. (Note: this one also shows chamber collapse; it's the closest available. Use it, or find a large-effusion-without-collapse loop if you can.)

**(B) Save the file as:**
```
M4 Case 2 Very large effusion — swinging heart.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 2:**
```
::: {.callout-tip}
<img src="gifs/M4 Case 2 Very large effusion — swinging heart.gif" style="width:100%; border-radius:4px;" alt="Very large circumferential pericardial effusion with swinging heart motion"/>
:::
```

### Clip — Case 3: Undifferentiated shock

**(A) Find this video:** *Cardiac Tamponade – Subxiphoid View* (moderate effusion with collapse)

**(B) Save the file as:**
```
Subcostal - M4 Case 3 Moderate effusion — right chamber collapse.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 3 Moderate effusion — right chamber collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: moderate pericardial effusion with right atrial collapse"/>
:::
```

### Clip — Case 4: Dialysis / uremic

**(A) Find this video:** *Subxiphoid View of Pericardial Effusion* (no tamponade)

**(B) Save the file as:**
```
Subcostal - M4 Case 4 Small-moderate posterior effusion — no tamponade.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 4 Small-moderate posterior effusion — no tamponade.gif" style="width:100%; border-radius:4px;" alt="Subcostal: small-to-moderate posterior effusion without chamber collapse — uremic pericarditis"/>
:::
```

### Clip — Case 5: Trauma / hemopericardium

**(A) Find this video:** *Traumatic Tamponade* (effusion with hematoma and RV collapse)

**(B) Save the file as:**
```
Subcostal - M4 Case 5 Traumatic hemopericardium — RV collapse.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 5:**
```
::: {.callout-tip}
<img src="gifs/Subcostal - M4 Case 5 Traumatic hemopericardium — RV collapse.gif" style="width:100%; border-radius:4px;" alt="Subcostal: echo-free stripe anterior to the RV with diastolic collapse — traumatic hemopericardium"/>
:::
```

### Clip — Case 6: Recurrent pericarditis

**(A) Find this video:** *Acute Pericarditis* (small effusion, thickened pericardium)

**(B) Save the file as:**
```
M4 Case 6 Small posterior effusion — normal LV.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 6:**
```
::: {.callout-tip}
<img src="gifs/M4 Case 6 Small posterior effusion — normal LV.gif" style="width:100%; border-radius:4px;" alt="Small posterior pericardial effusion with normal LV function — recurrent pericarditis"/>
:::
```

---

# Module 05 — IVC & Volume Status

**Website:** <https://www.thepocusatlas.com/ivc-abnormal-venous-waveforms>
**Module file to edit:** `modules/05-ivc.qmd`

### Clip — Case 1: Septic, fluid responsive

**(A) Find this video:** *Inferior Vena Cava in Hypovolemia*

**(B) Save the file as:**
```
M5 Case 1 Small collapsible IVC — hypovolemia.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/M5 Case 1 Small collapsible IVC — hypovolemia.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: small diameter with greater-than-70-percent inspiratory collapse"/>
:::
```

### Clip — Case 2: Congested CHF  *(tricky match)*

**(A) Find this video:** *Plethoric IVC in Biventricular Failure*. (The matching Doppler waveforms aren't on this page — that's fine for now. If you want to add them later, tell me and I'll help you find them.)

**(B) Save the file as:**
```
M5 Case 2 Plethoric IVC — venous congestion.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 2:**
```
::: {.callout-tip}
<img src="gifs/M5 Case 2 Plethoric IVC — venous congestion.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: dilated and non-collapsing — venous congestion"/>
:::
```

### Clip — Case 3: Post-arrest, ventilated

**(A) Find this video:** *Significantly Enlarged IVC in Acute Heart Failure*

**(B) Save the file as:**
```
M5 Case 3 Enlarged IVC — low distensibility ventilated.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/M5 Case 3 Enlarged IVC — low distensibility ventilated.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: enlarged with minimal distensibility in a mechanically ventilated patient"/>
:::
```

### Clip — Case 4: Cardiogenic vs septic  *(this one uses two videos)*

**(A) Find these two videos:** *Plethoric Inferior Vena Cava* **and** a severely-reduced-EF LV loop (from the RV/cardiomyopathy galleries)

**(B) Save the two files as:**
```
M5 Case 4 Plethoric IVC — cardiogenic shock.gif
M5 Case 4 Globally hypokinetic LV — severely reduced EF.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/M5 Case 4 Plethoric IVC — cardiogenic shock.gif" style="width:100%; border-radius:4px;" alt="Subcostal IVC: dilated, non-collapsing — cardiogenic shock"/>

<img src="gifs/M5 Case 4 Globally hypokinetic LV — severely reduced EF.gif" style="width:100%; border-radius:4px;" alt="Globally hypokinetic left ventricle with severely reduced ejection fraction"/>
:::
```

---

# Module 06 — Lung Ultrasound

**Website:** <https://www.thepocusatlas.com/lung>
**Module file to edit:** `modules/08-lung.qmd`

### Clip — Case 1: Flash pulmonary edema

**(A) Find this video:** *Confluent B Lines*

**(B) Save the file as:**
```
M6 Case 1 Bilateral confluent B-lines — pulmonary edema.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/M6 Case 1 Bilateral confluent B-lines — pulmonary edema.gif" style="width:100%; border-radius:4px;" alt="Anterior chest: bilateral confluent B-lines — cardiogenic pulmonary edema"/>
:::
```

### Clip — Case 2: Post-intubation hypoxia

**(A) Find this video:** *Bar Code Sign – Pneumothorax* (an M-mode image)

**(B) Save the file as:**
```
M6 Case 2 Absent lung sliding — barcode sign M-mode.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 2:**
```
::: {.callout-tip}
<img src="gifs/M6 Case 2 Absent lung sliding — barcode sign M-mode.gif" style="width:100%; border-radius:4px;" alt="M-mode: barcode sign with absent lung sliding on the left"/>
:::
```

### Clip — Case 3: Trauma pneumothorax

**(A) Find this video:** *Lung Point Finding*

**(B) Save the file as:**
```
M6 Case 3 Lung point — pneumothorax.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/M6 Case 3 Lung point — pneumothorax.gif" style="width:100%; border-radius:4px;" alt="Lung point at the mid-axillary line — pathognomonic for pneumothorax"/>
:::
```

### Clip — Case 4: ICU fever and hypoxia  *(tricky match)*

**(A) Find this video:** *PLAPS consolidation*. (The Atlas clip shows *dynamic* air bronchograms; the case ideally wants *static* ones. It's a fine stand-in — flag it if you later find a static example.)

**(B) Save the file as:**
```
M6 Case 4 Consolidation with air bronchograms — PLAPS.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/M6 Case 4 Consolidation with air bronchograms — PLAPS.gif" style="width:100%; border-radius:4px;" alt="Right PLAPS: consolidation with air bronchograms and a small adjacent effusion"/>
:::
```

---

# Module 07 — Abdominal Ultrasound

**Websites:** <https://www.thepocusatlas.com/trauma> and <https://www.thepocusatlas.com/renal>
**Module file to edit:** `modules/09-abdominal.qmd`

### Clip — Case 1: Positive FAST  *(this one uses three videos)*

**(A) Find these three videos** (all on the trauma page): *Positive FAST – RUQ – Morison's Pouch*, *Positive FAST – LUQ*, and *Positive FAST Pelvis – Transverse*

**(B) Save the three files as:**
```
M7 Case 1 Positive FAST — Morison pouch.gif
M7 Case 1 Positive FAST — splenorenal.gif
M7 Case 1 Positive FAST — pelvis.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/M7 Case 1 Positive FAST — Morison pouch.gif" style="width:100%; border-radius:4px;" alt="RUQ: free fluid in Morison's pouch"/>

<img src="gifs/M7 Case 1 Positive FAST — splenorenal.gif" style="width:100%; border-radius:4px;" alt="LUQ: free fluid in the splenorenal space"/>

<img src="gifs/M7 Case 1 Positive FAST — pelvis.gif" style="width:100%; border-radius:4px;" alt="Suprapubic: large volume of free fluid in the pelvis"/>
:::
```

### Clip — Case 2: Urosepsis / pyonephrosis

**(A) Find this video** (on the renal page): *Pyonephrosis in Setting of Proximal Ureteral Stone*

**(B) Save the file as:**
```
M7 Case 2 Pyonephrosis — hydronephrosis with debris.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 2:**
```
::: {.callout-tip}
<img src="gifs/M7 Case 2 Pyonephrosis — hydronephrosis with debris.gif" style="width:100%; border-radius:4px;" alt="Right kidney: grade 2–3 hydronephrosis with internal echoes (pyonephrosis)"/>
:::
```

### Clip — Case 3: Urinary retention

**(A) Find this video** (on the renal page): *Large Prostate* (full bladder with retention)

**(B) Save the file as:**
```
M7 Case 3 Distended bladder — urinary retention.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/M7 Case 3 Distended bladder — urinary retention.gif" style="width:100%; border-radius:4px;" alt="Suprapubic: markedly distended bladder — urinary retention"/>
:::
```

### Clip — Case 4: Ruptured ectopic  *(this one uses two videos)*

**(A) Find these two videos:** *Subtle RUQ +FAST* (a known-ectopic case) **and** a pelvic free-fluid loop

**(B) Save the two files as:**
```
M7 Case 4 Ruptured ectopic — pelvic free fluid.gif
M7 Case 4 Ruptured ectopic — RUQ free fluid.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/M7 Case 4 Ruptured ectopic — pelvic free fluid.gif" style="width:100%; border-radius:4px;" alt="Pelvis: large free fluid with no intrauterine pregnancy — ruptured ectopic"/>

<img src="gifs/M7 Case 4 Ruptured ectopic — RUQ free fluid.gif" style="width:100%; border-radius:4px;" alt="RUQ: free fluid extending to Morison's pouch — hemoperitoneum"/>
:::
```

---

# Module 08 — Vascular / DVT

**Website:** <https://www.thepocusatlas.com/dvt>
**Module file to edit:** `modules/10-dvt.qmd`

### Clip — Case 1: Submassive PE / proximal DVT

**(A) Find this video:** *Right Femoral DVT* (non-compressible vein with visible clot)

**(B) Save the file as:**
```
M8 Case 1 Non-compressible CFV — echogenic thrombus.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/M8 Case 1 Non-compressible CFV — echogenic thrombus.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: non-compressible with echogenic intraluminal thrombus"/>
:::
```

### Clip — Case 2: ICU unilateral leg swelling  *(this one uses two videos)*

**(A) Find these two videos:** *DVT of Left Common Femoral Vein* **and** *Occlusive DVT of the Left Popliteal Vein*

**(B) Save the two files as:**
```
M8 Case 2 Non-compressible CFV — proximal DVT.gif
M8 Case 2 Non-compressible popliteal — occlusive DVT.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 2:**
```
::: {.callout-tip}
<img src="gifs/M8 Case 2 Non-compressible CFV — proximal DVT.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: non-compressible hypoechoic thrombus"/>

<img src="gifs/M8 Case 2 Non-compressible popliteal — occlusive DVT.gif" style="width:100%; border-radius:4px;" alt="Popliteal vein: non-compressible, occlusive thrombus"/>
:::
```

### Clip — Case 3: Catheter-associated DVT  *(tricky match)*

**(A) Find this video:** *DVT – Common Femoral* (a partially-compressible vein). The "catheter-associated" part is just the patient's story, not something you can see on the image, so this works fine.

**(B) Save the file as:**
```
M8 Case 3 Partially compressible CFV — catheter-associated DVT.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/M8 Case 3 Partially compressible CFV — catheter-associated DVT.gif" style="width:100%; border-radius:4px;" alt="Common femoral vein: partially compressible with posterior-wall thrombus — catheter-associated DVT"/>
:::
```

---

# Module 09 — Shock & Arrest Integration

**Website:** <https://www.thepocusatlas.com/shock> (plus the heart galleries from the earlier modules). These cases show several views at once, so pick the single clip that best captures the main finding.
**Module file to edit:** `modules/06-integration.qmd`

*(Case 2 in this module already has its clip — skip it.)*

### Clip — Case 1: Undifferentiated shock (four-window exam)

**(A) Find this video:** a *plethoric IVC / biventricular failure* loop

**(B) Save the file as:**
```
M9 Case 1 Biventricular failure — plethoric IVC.gif
```

**(C) Paste this in place of the "Loops for interpretation. — complete four-window exam" box under Case 1:**
```
::: {.callout-tip}
<img src="gifs/M9 Case 1 Biventricular failure — plethoric IVC.gif" style="width:100%; border-radius:4px;" alt="Biventricular failure: reduced-EF LV, dilated RV with D-sign, plethoric IVC"/>
:::
```

### Clip — Case 3: Hypoxic respiratory failure

**(A) Find this video:** a *decompensated heart failure* loop (dilated, weak LV)

**(B) Save the file as:**
```
M9 Case 3 Decompensated HF — dilated LV and RV.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 3:**
```
::: {.callout-tip}
<img src="gifs/M9 Case 3 Decompensated HF — dilated LV and RV.gif" style="width:100%; border-radius:4px;" alt="Decompensated heart failure: dilated reduced-EF LV, RV volume overload, plethoric IVC"/>
:::
```

### Clip — Case 4: "Isn't responding" / malignant effusion

**(A) Find this video:** a *pericardial effusion with RV pressure overload (D-sign)* loop

**(B) Save the file as:**
```
M9 Case 4 Pericardial effusion with RV pressure overload.gif
```

**(C) Paste this in place of the "Loops for interpretation." box under Case 4:**
```
::: {.callout-tip}
<img src="gifs/M9 Case 4 Pericardial effusion with RV pressure overload.gif" style="width:100%; border-radius:4px;" alt="Moderate pericardial effusion without tamponade plus RV pressure-overload D-sign"/>
:::
```

### Clip — Case 5: Post-op won't wean  *(tricky match — lowest priority)*

**(A) Find this video:** a post-surgical loop with a small effusion and mildly weak LV. These are hard to find cleanly; it's okay to leave this one for last, or skip it and leave the text placeholder.

**(B) Save the file as:**
```
M9 Case 5 Post-surgical — small effusion mild LV dysfunction.gif
```

**(C) Paste this in place of the "Loops for interpretation. — post-surgical windows" box under Case 5:**
```
::: {.callout-tip}
<img src="gifs/M9 Case 5 Post-surgical — small effusion mild LV dysfunction.gif" style="width:100%; border-radius:4px;" alt="Post-surgical windows: small anterior effusion with mildly reduced LV function"/>
:::
```

---

## The four "tricky match" clips, in one place

If you'd rather come back to the hard ones later, these are the four that don't have a perfect ready-made match. Everything else is straightforward.

| Where | What's hard about it | What to do |
|---|---|---|
| Module 04, Case 2 | The "swinging heart, no collapse" combination is rare | Use the swinging-heart clip, or ask me to help find a better one |
| Module 05, Case 2 | The Doppler waveforms aren't on the Atlas page | Use the plethoric-IVC clip now; add waveforms later |
| Module 06, Case 4 | Case wants *static* bronchograms; Atlas has *dynamic* | Use the Atlas clip, or ask me to help find a static one |
| Module 09, Case 5 | Post-surgical loops are hard to source | Lowest priority — okay to leave as text for now |

---

## One last reminder

Log each clip in the **Google Sheet** before you paste it in, and once you've added clips to a module, let me know — I can update the credits page and the roadmap for you.
