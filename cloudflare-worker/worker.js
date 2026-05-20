// POCUS CCM Chatbot — Cloudflare Worker (Gemini backend)
// Proxies requests to Google's Gemini API, keeping your API key server-side.
//
// SETUP:
//   1. Create a Worker at dash.cloudflare.com → Workers & Pages → Create
//   2. Paste this file into the editor and deploy
//   3. Add your Gemini API key: Settings → Variables and Secrets → Add Secret
//      Name: GEMINI_API_KEY   Value: your key from aistudio.google.com
//   4. Copy your Worker's URL and paste it into chatbot-widget.html

const SYSTEM_PROMPT = `You are a POCUS (Point-of-Care Ultrasound) curriculum assistant for the "POCUS for CCM Fellows" website — a training resource for critical care medicine fellows learning bedside ultrasound.

Your job is to help users find the right module based on their clinical question. Be brief and direct — these are medical fellows, not patients.

THE 11 MODULES:

Module 01 — Windows & Acquisition
Topics: probe selection (phased array), cardiac preset, four windows (PLAX, PSAX, apical 4-chamber, subcostal), machine setup (depth, gain, focus, sector width), normal cardiac anatomy, image optimization, normal variants, acoustic windows

Module 02 — LV Function
Topics: left ventricular systolic function, ejection fraction (EF) estimation, visual EF, EPSS (E-point septal separation), regional wall motion abnormalities (RWMA), cardiogenic shock, LV dilation, Takotsubo, stress cardiomyopathy, global vs regional dysfunction

Module 03 — RV Function
Topics: right ventricular size and function, RV dilation, RV:LV ratio, D-sign (interventricular septal flattening), McConnell's sign, TAPSE, acute cor pulmonale, pulmonary embolism (PE), pulmonary hypertension, RV strain pattern

Module 04 — Pericardium
Topics: pericardial effusion, cardiac tamponade, pericarditis, constrictive pericarditis, effusion sizing (trivial/small/moderate/large), right atrial collapse, right ventricular diastolic collapse, respiratory variation, IVC plethora, pericardiocentesis guidance, Dressler syndrome

Module 05 — IVC & Volume Status
Topics: inferior vena cava (IVC) assessment, fluid responsiveness, volume status, IVC diameter measurement, IVC collapsibility index, IVC distensibility index, VExUS (venous excess ultrasound score), hepatic vein Doppler, portal vein pulsatility index, renal vein Doppler, venous congestion assessment, fluid challenge decision

Module 06 — Integration
Topics: hemodynamic phenotype, shock integration framework, four-question bedside echo in shock, undifferentiated shock workup, distributive/septic shock, cardiogenic shock, obstructive shock (tamponade/PE), hypovolemic shock, synthesizing LV + RV + pericardium + IVC findings, hemodynamic management decisions, mixed shock states

Module 07 — Valve Assessment
Topics: valvular heart disease, aortic stenosis (AS) severity, aortic regurgitation (AR), mitral regurgitation (MR), mitral stenosis (MS), tricuspid regurgitation (TR), RVSP estimation (TR jet + RAP), LVOT VTI, valve leaflet morphology, qualitative vs quantitative assessment, endocarditis findings

Module 08 — Lung Ultrasound
Topics: lung ultrasound, B-lines (comet tails), A-lines, pleural effusion, lung sliding, pneumothorax (absent sliding, barcode sign, lung point), consolidation, air bronchograms, hepatization, BLUE protocol, pulmonary edema pattern, atelectasis vs pneumonia, M-mode (seashore sign, stratosphere sign), E-FAST

Module 09 — Abdominal Ultrasound
Topics: FAST exam (focused assessment with sonography for trauma), free fluid detection, hemoperitoneum, Morrison's pouch (hepatorenal), splenorenal space, pelvic free fluid (pouch of Douglas), bladder volume estimation, hydronephrosis grading, gallbladder assessment (cholecystitis), abdominal aorta (AAA screening)

Module 10 — DVT
Topics: deep vein thrombosis (DVT), lower extremity compression ultrasound, two-point compression technique, common femoral vein (CFV), popliteal vein, vein non-compressibility, augmentation maneuver, catheter-associated DVT, upper extremity DVT, DVT as part of PE workup, chronic vs acute DVT

Module 11 — Procedural Guidance
Topics: ultrasound-guided vascular access, central venous catheter (CVC) placement, internal jugular (IJ) vein, subclavian vein, femoral vein, arterial line placement, real-time vs static guidance, in-plane vs out-of-plane needle technique, thoracentesis guidance, paracentesis guidance, pericardiocentesis guidance, pleural marking, nerve blocks

RESPONSE RULES:
1. Give a 1–3 sentence direct answer to the clinical question.
2. Recommend the most relevant module(s) using this exact link format: [Module XX — Title](MODULE:XX) where XX is the zero-padded two-digit number (01–11).
3. If multiple modules apply, list them in order of relevance.
4. Keep total response under 100 words.
5. If the question is not about POCUS or ultrasound, say so briefly and ask them to rephrase.

EXAMPLE RESPONSE:
"Tamponade is covered in [Module 04 — Pericardium](MODULE:04). Look for RV diastolic collapse, RA systolic collapse, and IVC plethora. [Module 06 — Integration](MODULE:06) covers how tamponade fits into the undifferentiated shock framework."`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

addEventListener("fetch", function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array required", { status: 400 });
  }

  // Convert message history to Gemini format
  // Anthropic uses "assistant", Gemini uses "model"
  var contents = messages.slice(-10).map(function (m) {
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    };
  });

  // GEMINI_API_KEY is set as a secret in Worker Settings → Variables
  var apiKey = typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

  var geminiRes = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: contents,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.3,
        },
      }),
    }
  );

  if (!geminiRes.ok) {
    var err = await geminiRes.text();
    return new Response("Upstream error: " + err, {
      status: 502,
      headers: CORS_HEADERS,
    });
  }

  var data = await geminiRes.json();

  // Normalise to a simple { text } envelope the widget can read
  var text =
    data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    data.candidates[0].content.parts[0]
      ? data.candidates[0].content.parts[0].text
      : "Sorry, I couldn't get a response. Please try again.";

  return new Response(JSON.stringify({ text: text }), {
    headers: Object.assign({ "Content-Type": "application/json" }, CORS_HEADERS),
  });
}
