// Confere, no HTML bruto (sem JavaScript), os links internos <a href> de todas as páginas.
// Uso: node scripts/check-links.cjs
// Falha se algum link apontar para arquivo inexistente, para index.html ou para URLs antigas
// com letras maiúsculas / .dc.html, e lista páginas indexáveis sem nenhum link de entrada.
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));
const errors = [];
const inbound = Object.fromEntries(pages.map((p) => [p, new Set()]));
for (const p of pages) {
  const html = fs.readFileSync(path.join(ROOT, p), "utf8");
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
    const target = href.split(/[?#]/)[0].replace(/^\//, "");
    if (target === "") { inbound["index.html"].add(p); continue; }
    if (/index\.html$/.test(target)) errors.push(`${p}: link para index.html (${href})`);
    if (/[A-Z]|\.dc\.html$/.test(target)) errors.push(`${p}: link para URL fora do padrão (${href})`);
    if (!fs.existsSync(path.join(ROOT, target))) errors.push(`${p}: destino inexistente (${href})`);
    else if (inbound[target] && target !== p) inbound[target].add(p);
  }
}
const orphans = pages.filter((p) => p !== "index.html" && p !== "404.html" && inbound[p].size === 0);
if (orphans.length) errors.push(`Páginas sem links internos de entrada: ${orphans.join(", ")}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${pages.length} páginas, todos os links internos estáticos resolvem.`);
