"""In-memory mock of the worker's /api routes, for local testing of
case-logbook.html and competency-dashboard.html without deploying.

  python mock-api.py            # serves http://localhost:8743
  faculty code: TEST-FACULTY-CODE

Point the pages at it from the browser console:
  localStorage.setItem("nufsm-api-url", "http://localhost:8743/api"); location.reload();
Remove the override when done:
  localStorage.removeItem("nufsm-api-url"); location.reload();
"""
import json
import random
import re
import string
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

FACULTY_CODE = "TEST-FACULTY-CODE"
VALID_DOMAINS = {"echo", "lung", "abd", "vasc", "proc"}

FELLOWS = {}   # id -> {id, name, cohort, code, assessment}
CASES = {}     # id -> {id, fellow_id, date, domain, views, setting, findings, supervisor, proctored, ts}


def gen_code():
    alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
    raw = "".join(random.choice(alphabet) for _ in range(12))
    return "NU-" + "-".join(raw[i:i + 4] for i in range(0, 12, 4))


def case_json(c, include_fellow=False):
    out = dict(c)
    out["fellowId"] = out.pop("fellow_id")
    out["proctored"] = bool(out["proctored"])
    if include_fellow:
        f = FELLOWS.get(out["fellowId"])
        if f:
            out["fellow"] = f["name"]
            out["cohort"] = f["cohort"]
    return out


def log_counts():
    counts = {}
    for c in CASES.values():
        if c["proctored"]:
            counts.setdefault(c["fellow_id"], {})
            counts[c["fellow_id"]][c["domain"]] = counts[c["fellow_id"]].get(c["domain"], 0) + 1
    return counts


class Handler(BaseHTTPRequestHandler):
    def _send(self, data, status=200):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _auth(self):
        h = self.headers.get("Authorization", "")
        code = h[7:].strip() if h.startswith("Bearer ") else ""
        if not code:
            return None
        if code == FACULTY_CODE:
            return {"role": "faculty"}
        for f in FELLOWS.values():
            if f["code"] == code:
                return {"role": "fellow", "fellow": {"id": f["id"], "name": f["name"], "cohort": f["cohort"]}}
        return None

    def _body(self):
        n = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(n) or b"{}")

    def do_OPTIONS(self):
        self._send({}, 200)

    def _route(self):
        path = self.path.split("?")[0].rstrip("/")
        parts = [p for p in path.split("/") if p]
        if not parts or parts[0] != "api":
            return self._send({"error": "not found"}, 404)
        who = self._auth()
        if not who:
            return self._send({"error": "invalid or missing access code"}, 401)
        resource = parts[1] if len(parts) > 1 else ""
        rid = parts[2] if len(parts) > 2 else None
        m = self.command

        if resource == "me" and m == "GET":
            return self._send(who if who["role"] == "fellow" else {"role": "faculty"})

        if resource == "cases":
            if m == "GET":
                if who["role"] == "faculty":
                    cs = [case_json(c, True) for c in CASES.values()]
                else:
                    cs = [case_json(c) for c in CASES.values() if c["fellow_id"] == who["fellow"]["id"]]
                cs.sort(key=lambda c: (c["date"], c["ts"]), reverse=True)
                return self._send({"cases": cs})
            if m == "POST":
                if who["role"] != "fellow":
                    return self._send({"error": "only fellows log cases"}, 403)
                b = self._body()
                if not re.match(r"^\d{4}-\d{2}-\d{2}$", b.get("date", "")):
                    return self._send({"error": "date (YYYY-MM-DD) required"}, 400)
                if b.get("domain") not in VALID_DOMAINS:
                    return self._send({"error": "invalid domain"}, 400)
                cid = b.get("id") or ("c%d%s" % (time.time() * 1000, "".join(random.choices(string.ascii_lowercase, k=5))))
                existing = CASES.get(cid)
                if existing and existing["fellow_id"] != who["fellow"]["id"]:
                    return self._send({"error": "not your case"}, 403)
                CASES[cid] = {
                    "id": cid, "fellow_id": who["fellow"]["id"], "date": b["date"], "domain": b["domain"],
                    "views": b.get("views", [])[:12], "setting": str(b.get("setting", ""))[:300],
                    "findings": str(b.get("findings", ""))[:2000], "supervisor": str(b.get("supervisor", ""))[:120],
                    "proctored": 1 if b.get("proctored") else 0, "ts": int(time.time() * 1000),
                }
                return self._send({"case": case_json(CASES[cid])})
            if m == "DELETE" and rid:
                c = CASES.get(rid)
                if c and who["role"] != "faculty" and c["fellow_id"] != who["fellow"]["id"]:
                    return self._send({"error": "not your case"}, 403)
                CASES.pop(rid, None)
                return self._send({"ok": True})

        if resource == "fellows":
            if who["role"] != "faculty":
                return self._send({"error": "faculty access code required"}, 403)
            if m == "GET":
                counts = log_counts()
                return self._send({"fellows": [
                    {"id": f["id"], "name": f["name"], "cohort": f["cohort"], "code": f["code"],
                     "assessment": f["assessment"], "logCounts": counts.get(f["id"], {})}
                    for f in FELLOWS.values()
                ]})
            if m == "POST":
                b = self._body()
                name = str(b.get("name", "")).strip()[:120]
                if not name:
                    return self._send({"error": "name required"}, 400)
                fid = "f%d%s" % (time.time() * 1000, "".join(random.choices(string.ascii_lowercase, k=5)))
                f = {"id": fid, "name": name, "cohort": str(b.get("cohort") or "CCM-1")[:40],
                     "code": gen_code(),
                     "assessment": b.get("assessment") if isinstance(b.get("assessment"), dict) else {}}
                FELLOWS[fid] = f
                return self._send({"fellow": {**f, "logCounts": {}}})
            if m == "PUT" and rid:
                f = FELLOWS.get(rid)
                if not f:
                    return self._send({"error": "fellow not found"}, 404)
                b = self._body()
                if "name" in b and str(b["name"]).strip():
                    f["name"] = str(b["name"]).strip()[:120]
                if "cohort" in b and b["cohort"]:
                    f["cohort"] = str(b["cohort"])[:40]
                if b.get("regenerateCode"):
                    f["code"] = gen_code()
                elif "code" in b:
                    custom = str(b["code"]).strip()[:80]
                    if len(custom) < 12:
                        return self._send({"error": "custom code must be at least 12 characters"}, 400)
                    if custom == FACULTY_CODE:
                        return self._send({"error": "that code is reserved"}, 400)
                    if any(x["code"] == custom for x in FELLOWS.values() if x["id"] != rid):
                        return self._send({"error": "that code is already assigned to another fellow"}, 409)
                    f["code"] = custom
                if isinstance(b.get("assessment"), dict):
                    f["assessment"] = b["assessment"]
                return self._send({"fellow": f})
            if m == "DELETE" and rid:
                FELLOWS.pop(rid, None)
                for cid in [k for k, c in CASES.items() if c["fellow_id"] == rid]:
                    CASES.pop(cid)
                return self._send({"ok": True})

        return self._send({"error": "not found"}, 404)

    do_GET = do_POST = do_PUT = do_DELETE = _route

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print("mock API on http://localhost:8743  (faculty code: %s)" % FACULTY_CODE)
    HTTPServer(("127.0.0.1", 8743), Handler).serve_forever()
