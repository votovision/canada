/**
 * Electors on the lists per electoral district at the 2025 general election
 * (Elections Canada, official voting results, table 11). Used by the
 * dashboard map to size ridings by electors.
 *
 * Run: node tools/make_riding_electors.mjs
 * Writes data/ca_riding_electors.json {riding_code: electors}.
 */
import { writeFileSync } from "node:fs";

const URL_TABLE = "https://www.elections.ca/res/rep/off/ovrGE45/62/data_donnees/table_tableau11.csv";

const res = await fetch(URL_TABLE, { headers: { "User-Agent": "votovision-data" } });
if (!res.ok) throw new Error(`${URL_TABLE}: ${res.status}`);
const lines = new TextDecoder("utf-8").decode(await res.arrayBuffer()).replace(/^﻿/, "").trim().split(/\r?\n/);
// Quoted fields may contain commas.
const split = (line) => [...line.matchAll(/("([^"]*)"|[^,]*)(,|$)/g)].map((m) => m[2] ?? m[1]).slice(0, -1);
const head = split(lines[0]);
const iCode = head.findIndex((h) => h.startsWith("Electoral District Number"));
const iElectors = head.findIndex((h) => h.startsWith("Electors"));

const electors = {};
for (const line of lines.slice(1)) {
  const c = split(line);
  if (/^\d{5}$/.test(c[iCode])) electors[c[iCode]] = +c[iElectors];
}
const n = Object.keys(electors).length;
if (n !== 343) throw new Error(`expected 343 ridings, got ${n}`);
writeFileSync(new URL("../data/ca_riding_electors.json", import.meta.url), JSON.stringify(electors));
console.log(`${n} ridings, ${Object.values(electors).reduce((a, b) => a + b, 0)} electors`);
