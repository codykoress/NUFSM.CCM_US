// POCUS CCM site backend — Cloudflare Worker (ES module syntax)
//
// ROUTES:
//   POST /            — curriculum chatbot (Claude Haiku)
//   POST /quiz        — open-answer quiz grader
//   /api/*            — case logbook + competency registry API (D1 database)
//
// SETUP — one-time, in the Cloudflare dashboard (dash.cloudflare.com):
//   1. Storage & Databases → D1 SQL Database → Create → name it: pocus-logbook
//      Open its Console tab → paste and run the contents of schema.sql
//   2. Workers & Pages → your worker → Settings → Bindings → Add binding →
//      D1 database → Variable name: DB → Database: pocus-logbook
//   3. Settings → Variables and Secrets → add:
//        FACULTY_CODE (secret) — invent a long random string (20+ chars).
//        This is the program director's sign-in code for the Competency
//        Registry. Keep ANTHROPIC_API_KEY (secret) and ALLOWED_ORIGIN (var)
//        from the previous setup.
//   4. Replace the worker code with this file and deploy.
//      NOTE: this file uses module syntax (export default). If the dashboard
//      editor complains, make sure you replaced the ENTIRE previous file.
//
// AUTH MODEL:
//   Every /api request carries "Authorization: Bearer <code>".
//   - code === FACULTY_CODE  → faculty (program director): full access
//   - code matches a row in fellows.code → that fellow: their own cases only
//   Fellows are created by faculty in the Competency Registry, which
//   generates each fellow's access code. No self-signup.

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

const VALID_DOMAINS = ["echo", "lung", "abd", "vasc", "proc"];

function corsHeaders(env, requestOrigin) {
  var allowed = env.ALLOWED_ORIGIN || "*";
  var effectiveOrigin = (allowed === "*" || requestOrigin === allowed) ? allowed : null;
  if (!effectiveOrigin) return {};
  return {
    "Access-Control-Allow-Origin": effectiveOrigin === "*" ? "*" : requestOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
  };
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json" }, cors),
  });
}

export default {
  async fetch(request, env) {
    var origin = request.headers.get("Origin") || "";
    var cors = corsHeaders(env, origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    var url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env, url, cors);
      } catch (e) {
        return json({ error: "server error: " + e.message }, 500, cors);
      }
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: cors });
    }

    var contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response("Payload too large", { status: 413, headers: cors });
    }

    if (url.pathname === "/quiz") {
      return handleQuiz(request, env, cors);
    }
    return handleChat(request, env, cors);
  },
};

/* ===================== chatbot ===================== */

async function readJsonBody(request) {
  var raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return { tooLarge: true };
  try { return { body: JSON.parse(raw) }; } catch (e) { return { invalid: true }; }
}

async function handleChat(request, env, cors) {
  var parsed = await readJsonBody(request);
  if (parsed.tooLarge) return new Response("Payload too large", { status: 413, headers: cors });
  if (parsed.invalid) return new Response("Invalid JSON", { status: 400, headers: cors });
  var body = parsed.body;

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array required", { status: 400, headers: cors });
  }

  var trimmed = messages.slice(-10);

  var anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.ANTHROPIC_API_KEY || "",
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
    return new Response("Upstream error: " + err, { status: 502, headers: cors });
  }

  var data = await anthropicRes.json();
  var text = data.content && data.content[0] && data.content[0].text
    ? data.content[0].text
    : "Sorry, I couldn't get a response. Please try again.";

  return json({ text: text }, 200, cors);
}

async function handleQuiz(request, env, cors) {
  var parsed = await readJsonBody(request);
  if (parsed.tooLarge) return new Response("Payload too large", { status: 413, headers: cors });
  if (parsed.invalid) return new Response("Invalid JSON", { status: 400, headers: cors });
  var body = parsed.body;

  var question = body.question;
  var correctAnswer = body.correctAnswer;
  var userAnswer = body.userAnswer;

  if (!question || !correctAnswer || !userAnswer) {
    return new Response("question, correctAnswer, and userAnswer are required", {
      status: 400,
      headers: cors,
    });
  }

  var anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.ANTHROPIC_API_KEY || "",
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
    return new Response("Upstream error: " + err, { status: 502, headers: cors });
  }

  var data = await anthropicRes.json();
  var feedback = data.content && data.content[0] && data.content[0].text
    ? data.content[0].text
    : "Unable to generate feedback. Please try again.";

  return json({ feedback: feedback }, 200, cors);
}

/* ===================== logbook / registry API ===================== */

async function authenticate(request, env) {
  var h = request.headers.get("Authorization") || "";
  var code = h.indexOf("Bearer ") === 0 ? h.slice(7).trim() : "";
  if (!code) return null;
  if (env.FACULTY_CODE && code === env.FACULTY_CODE) return { role: "faculty" };
  var row = await env.DB.prepare("SELECT id, name, cohort FROM fellows WHERE code = ?1")
    .bind(code).first();
  if (row) return { role: "fellow", fellow: row };
  return null;
}

function genCode() {
  // unambiguous alphabet — no 0/O/1/I/L
  var alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  var buf = new Uint8Array(12);
  crypto.getRandomValues(buf);
  var s = "NU-";
  for (var i = 0; i < 12; i++) {
    s += alphabet[buf[i] % alphabet.length];
    if (i % 4 === 3 && i < 11) s += "-";
  }
  return s;
}

function clip(s, max) { return String(s == null ? "" : s).slice(0, max); }

function parseAssessment(raw) {
  try {
    var a = JSON.parse(raw || "{}");
    return {
      levels: a.levels || {},
      scans: a.scans || {},
      milestones: a.milestones || {},
      notes: a.notes || "",
    };
  } catch (e) {
    return { levels: {}, scans: {}, milestones: {}, notes: "" };
  }
}

async function proctoredCounts(env) {
  // fellow_id → { domain: count } for proctored cases
  var rs = await env.DB.prepare(
    "SELECT fellow_id, domain, COUNT(*) AS n FROM cases WHERE proctored = 1 GROUP BY fellow_id, domain"
  ).all();
  var out = {};
  (rs.results || []).forEach(function (r) {
    out[r.fellow_id] = out[r.fellow_id] || {};
    out[r.fellow_id][r.domain] = r.n;
  });
  return out;
}

function caseRowToJson(r) {
  var views = [];
  try { views = JSON.parse(r.views || "[]"); } catch (e) {}
  return {
    id: r.id, fellowId: r.fellow_id, date: r.date, domain: r.domain,
    views: views, setting: r.setting, findings: r.findings,
    supervisor: r.supervisor, proctored: !!r.proctored, ts: r.ts,
    fellow: r.fellow_name || undefined, cohort: r.fellow_cohort || undefined,
  };
}

async function handleApi(request, env, url, cors) {
  if (!env.DB) return json({ error: "D1 binding 'DB' not configured — see worker.js setup notes" }, 500, cors);

  var who = await authenticate(request, env);
  if (!who) return json({ error: "invalid or missing access code" }, 401, cors);

  var parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean); // ["api", ...]
  var resource = parts[1] || "";
  var resourceId = parts[2] ? decodeURIComponent(parts[2]) : null;
  var method = request.method;

  /* ---- GET /api/me ---- */
  if (resource === "me" && method === "GET") {
    if (who.role === "faculty") return json({ role: "faculty" }, 200, cors);
    return json({ role: "fellow", fellow: who.fellow }, 200, cors);
  }

  /* ---- /api/cases ---- */
  if (resource === "cases") {
    if (method === "GET") {
      var q;
      if (who.role === "faculty") {
        q = env.DB.prepare(
          "SELECT c.*, f.name AS fellow_name, f.cohort AS fellow_cohort FROM cases c JOIN fellows f ON f.id = c.fellow_id ORDER BY c.date DESC, c.ts DESC"
        );
      } else {
        q = env.DB.prepare(
          "SELECT c.* FROM cases c WHERE c.fellow_id = ?1 ORDER BY c.date DESC, c.ts DESC"
        ).bind(who.fellow.id);
      }
      var rs = await q.all();
      return json({ cases: (rs.results || []).map(caseRowToJson) }, 200, cors);
    }

    if (method === "POST") {
      if (who.role !== "fellow") return json({ error: "only fellows log cases" }, 403, cors);
      var parsed = await readJsonBody(request);
      if (parsed.tooLarge) return json({ error: "payload too large" }, 413, cors);
      if (parsed.invalid || !parsed.body) return json({ error: "invalid JSON" }, 400, cors);
      var b = parsed.body;

      if (!b.date || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return json({ error: "date (YYYY-MM-DD) required" }, 400, cors);
      if (VALID_DOMAINS.indexOf(b.domain) === -1) return json({ error: "invalid domain" }, 400, cors);

      var id = clip(b.id, 64) || ("c" + Date.now() + Math.random().toString(36).slice(2, 7));
      // upsert, but never let one fellow overwrite another's case
      var existing = await env.DB.prepare("SELECT fellow_id FROM cases WHERE id = ?1").bind(id).first();
      if (existing && existing.fellow_id !== who.fellow.id) return json({ error: "not your case" }, 403, cors);

      await env.DB.prepare(
        "INSERT OR REPLACE INTO cases (id, fellow_id, date, domain, views, setting, findings, supervisor, proctored, ts) VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)"
      ).bind(
        id, who.fellow.id, b.date, b.domain,
        JSON.stringify(Array.isArray(b.views) ? b.views.slice(0, 12).map(function (v) { return clip(v, 60); }) : []),
        clip(b.setting, 300), clip(b.findings, 2000), clip(b.supervisor, 120),
        b.proctored ? 1 : 0, Date.now()
      ).run();

      var row = await env.DB.prepare("SELECT * FROM cases WHERE id = ?1").bind(id).first();
      return json({ case: caseRowToJson(row) }, 200, cors);
    }

    if (method === "DELETE" && resourceId) {
      var row2 = await env.DB.prepare("SELECT fellow_id FROM cases WHERE id = ?1").bind(resourceId).first();
      if (!row2) return json({ ok: true }, 200, cors); // already gone — idempotent
      if (who.role !== "faculty" && row2.fellow_id !== who.fellow.id) return json({ error: "not your case" }, 403, cors);
      await env.DB.prepare("DELETE FROM cases WHERE id = ?1").bind(resourceId).run();
      return json({ ok: true }, 200, cors);
    }
  }

  /* ---- /api/fellows (faculty only) ---- */
  if (resource === "fellows") {
    if (who.role !== "faculty") return json({ error: "faculty access code required" }, 403, cors);

    if (method === "GET") {
      var rs2 = await env.DB.prepare("SELECT * FROM fellows ORDER BY created_at").all();
      var counts = await proctoredCounts(env);
      var fellows = (rs2.results || []).map(function (f) {
        return {
          id: f.id, name: f.name, cohort: f.cohort, code: f.code,
          assessment: parseAssessment(f.assessment),
          logCounts: counts[f.id] || {},
        };
      });
      return json({ fellows: fellows }, 200, cors);
    }

    if (method === "POST") {
      var parsed2 = await readJsonBody(request);
      if (parsed2.tooLarge) return json({ error: "payload too large" }, 413, cors);
      if (parsed2.invalid || !parsed2.body) return json({ error: "invalid JSON" }, 400, cors);
      var nb = parsed2.body;
      var name = clip(nb.name, 120).trim();
      if (!name) return json({ error: "name required" }, 400, cors);
      var fid = "f" + Date.now() + Math.random().toString(36).slice(2, 7);
      var code = genCode();
      var assessment = JSON.stringify(nb.assessment && typeof nb.assessment === "object" ? nb.assessment : {});
      await env.DB.prepare(
        "INSERT INTO fellows (id, name, cohort, code, assessment) VALUES (?1,?2,?3,?4,?5)"
      ).bind(fid, name, clip(nb.cohort, 40) || "CCM-1", code, assessment).run();
      return json({ fellow: { id: fid, name: name, cohort: clip(nb.cohort, 40) || "CCM-1", code: code, assessment: parseAssessment(assessment), logCounts: {} } }, 200, cors);
    }

    if (method === "PUT" && resourceId) {
      var parsed3 = await readJsonBody(request);
      if (parsed3.tooLarge) return json({ error: "payload too large" }, 413, cors);
      if (parsed3.invalid || !parsed3.body) return json({ error: "invalid JSON" }, 400, cors);
      var ub = parsed3.body;
      var f = await env.DB.prepare("SELECT * FROM fellows WHERE id = ?1").bind(resourceId).first();
      if (!f) return json({ error: "fellow not found" }, 404, cors);
      var newName = ub.name !== undefined ? clip(ub.name, 120).trim() || f.name : f.name;
      var newCohort = ub.cohort !== undefined ? clip(ub.cohort, 40) || f.cohort : f.cohort;
      var newCode = ub.regenerateCode ? genCode() : f.code;
      var newAssessment = ub.assessment !== undefined && typeof ub.assessment === "object"
        ? JSON.stringify(ub.assessment) : f.assessment;
      await env.DB.prepare(
        "UPDATE fellows SET name = ?1, cohort = ?2, code = ?3, assessment = ?4 WHERE id = ?5"
      ).bind(newName, newCohort, newCode, newAssessment, resourceId).run();
      return json({ fellow: { id: resourceId, name: newName, cohort: newCohort, code: newCode, assessment: parseAssessment(newAssessment) } }, 200, cors);
    }

    if (method === "DELETE" && resourceId) {
      await env.DB.prepare("DELETE FROM cases WHERE fellow_id = ?1").bind(resourceId).run();
      await env.DB.prepare("DELETE FROM fellows WHERE id = ?1").bind(resourceId).run();
      return json({ ok: true }, 200, cors);
    }
  }

  return json({ error: "not found" }, 404, cors);
}
