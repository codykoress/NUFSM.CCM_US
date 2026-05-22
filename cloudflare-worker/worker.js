// POCUS CCM Chatbot — Cloudflare Worker (Claude Haiku backend)
// Proxies requests to the Anthropic API, keeping your API key server-side.
//
// SETUP:
//   1. Create a Worker at dash.cloudflare.com → Workers & Pages → Create
//   2. Paste this file into the editor and deploy
//   3. Add your Anthropic API key: Settings → Variables and Secrets → Add Secret
//      Name: ANTHROPIC_API_KEY   Value: your sk-ant-... key from console.anthropic.com
//   4. Add your site's URL: Settings → Variables and Secrets → Add Variable
//      Name: ALLOWED_ORIGIN   Value: https://your-site-url.com  (no trailing slash)
//      This restricts the worker to requests from your site only.
//   5. (Recommended) Add rate limiting: dash.cloudflare.com → Security → WAF → Rate Limiting
//      Suggested rule: ≤ 20 requests/minute per IP on the worker route.
//   6. Copy your Worker's URL and paste it into chatbot-widget.html
//
// ROUTES:
//   POST /       — chatbot (conversation history)
//   POST /quiz   — open-answer quiz grader

const QUIZ_GRADING_PROMPT = `You are a POCUS quiz grader for critical care medicine fellows. You will receive a question, the model answer, and a fellow's typed response.

Your feedback must:
1. Acknowledge what they got right (be specific)
2. Identify key concepts that were missed or incomplete
3. Close with one clinical teaching point

Rules: Be direct and concise — 3–5 sentences total. Do not restate the question. Do not use headers or bullet points. Write in plain prose.`;

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

// Max request body size — prevents oversized payload abuse
const MAX_BODY_BYTES = 32 * 1024; // 32 KB

// Returns CORS headers locked to ALLOWED_ORIGIN env var, or "*" if not set.
// Set ALLOWED_ORIGIN in Worker Settings → Variables to your deployed site URL.
function corsHeaders(requestOrigin) {
  var allowed = (typeof ALLOWED_ORIGIN !== "undefined" && ALLOWED_ORIGIN) ? ALLOWED_ORIGIN : "*";
  var effectiveOrigin = (allowed === "*" || requestOrigin === allowed) ? allowed : null;
  if (!effectiveOrigin) return {};
  return {
    "Access-Control-Allow-Origin": effectiveOrigin === "*" ? "*" : requestOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

addEventListener("fetch", function (event) {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  var origin = request.headers.get("Origin") || "";
  var cors = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  var contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
  if (contentLength > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413, headers: cors });
  }

  var url = new URL(request.url);
  if (url.pathname === "/quiz") {
    return handleQuiz(request, cors);
  }

  let body;
  try {
    var raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return new Response("Payload too large", { status: 413, headers: cors });
    }
    body = JSON.parse(raw);
  } catch (e) {
    return new Response("Invalid JSON", { status: 400, headers: cors });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array required", { status: 400 });
  }

  // Keep conversation history bounded (last 10 turns)
  var trimmed = messages.slice(-10);

  // ANTHROPIC_API_KEY is set as a secret in Worker Settings → Variables
  var apiKey = typeof ANTHROPIC_API_KEY !== "undefined" ? ANTHROPIC_API_KEY : "";

  var anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    }),
  });

  if (!anthropicRes.ok) {
    var err = await anthropicRes.text();
    return new Response("Upstream error: " + err, {
      status: 502,
      headers: cors,
    });
  }

  var data = await anthropicRes.json();
  var text = data.content && data.content[0] && data.content[0].text
    ? data.content[0].text
    : "Sorry, I couldn't get a response. Please try again.";

  return new Response(JSON.stringify({ text: text }), {
    headers: Object.assign({ "Content-Type": "application/json" }, cors),
  });
}

async function handleQuiz(request, cors) {
  let body;
  try {
    var raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return new Response("Payload too large", { status: 413, headers: cors });
    }
    body = JSON.parse(raw);
  } catch (e) {
    return new Response("Invalid JSON", { status: 400, headers: cors });
  }

  var question = body.question;
  var correctAnswer = body.correctAnswer;
  var userAnswer = body.userAnswer;

  if (!question || !correctAnswer || !userAnswer) {
    return new Response("question, correctAnswer, and userAnswer are required", {
      status: 400,
      headers: cors,
    });
  }

  var apiKey = typeof ANTHROPIC_API_KEY !== "undefined" ? ANTHROPIC_API_KEY : "";

  var anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: QUIZ_GRADING_PROMPT,
      messages: [
        {
          role: "user",
          content: "Question: " + question + "\n\nModel answer: " + correctAnswer + "\n\nFellow's response: " + userAnswer,
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    var err = await anthropicRes.text();
    return new Response("Upstream error: " + err, {
      status: 502,
      headers: cors,
    });
  }

  var data = await anthropicRes.json();
  var feedback = data.content && data.content[0] && data.content[0].text
    ? data.content[0].text
    : "Unable to generate feedback. Please try again.";

  return new Response(JSON.stringify({ feedback: feedback }), {
    headers: Object.assign({ "Content-Type": "application/json" }, cors),
  });
}
