-- POCUS logbook + competency registry schema for Cloudflare D1.
-- Run this once in the D1 console (Storage & Databases → pocus-logbook → Console).

CREATE TABLE IF NOT EXISTS fellows (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  cohort     TEXT NOT NULL DEFAULT 'CCM-1',
  code       TEXT NOT NULL UNIQUE,          -- access code the PD hands to the fellow
  assessment TEXT NOT NULL DEFAULT '{}',    -- JSON: { levels, scans, milestones, notes }
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cases (
  id         TEXT PRIMARY KEY,
  fellow_id  TEXT NOT NULL,
  date       TEXT NOT NULL,                 -- YYYY-MM-DD
  domain     TEXT NOT NULL,                 -- echo | lung | abd | vasc | proc
  views      TEXT NOT NULL DEFAULT '[]',    -- JSON array of view names
  setting    TEXT NOT NULL DEFAULT '',
  findings   TEXT NOT NULL DEFAULT '',
  supervisor TEXT NOT NULL DEFAULT '',
  proctored  INTEGER NOT NULL DEFAULT 0,
  ts         INTEGER NOT NULL               -- last-modified epoch ms
);

CREATE INDEX IF NOT EXISTS idx_cases_fellow ON cases (fellow_id);
CREATE INDEX IF NOT EXISTS idx_cases_proctored ON cases (proctored, fellow_id, domain);
