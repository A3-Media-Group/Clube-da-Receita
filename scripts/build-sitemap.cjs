// Gera sitemap.xml e robots.txt a partir das páginas publicadas.
// Uso: node scripts/build-sitemap.cjs  (também roda no deploy e no fim de enrich-site.cjs)
//
// Entra no sitemap apenas a página que:
// - é um .html na raiz que não é alvo de redirecionamento no .htaccess (responde 200);
// - não tem <meta name="robots" content="noindex">;
// - tem canonical igual à própria URL.
// <lastmod> é a data do último commit que alterou o arquivo; arquivos com mudanças
// ainda não commitadas usam a data de hoje.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BASE = JSON.parse(fs.readFileSync(path.join(ROOT, "site-config.json"), "utf8")).url.replace(/\/?$/, "/");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const git = (...args) => {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};

const redirected = new Set();
const htaccess = path.join(ROOT, ".htaccess");
if (fs.existsSync(htaccess)) {
  for (const [, src] of fs.readFileSync(htaccess, "utf8").matchAll(/^RewriteRule \^([^$\s]+)\$ \S+ \[R=301/gm)) redirected.add(src.replace(/\\\./g, "."));
}
// A home é servida em "/"; o 301 de index.html só vale quando o próprio cliente pede /index.html.
redirected.delete("index.html");
const dirty = new Set(git("status", "--porcelain", "--", "*.html").split("\n").filter(Boolean).map((l) => l.slice(3).split(" -> ").pop()));
const today = new Date().toISOString().slice(0, 10);
const lastmod = (f) => (dirty.has(f) ? today : git("log", "-1", "--format=%cs", "--", f) || today);

const urls = [];
const skipped = [];
for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith(".html")).sort()) {
  const html = fs.readFileSync(path.join(ROOT, f), "utf8");
  const url = BASE + (f === "index.html" ? "" : f);
  const canonical = (/<link rel="canonical" href="([^"]+)"/.exec(html) || [])[1];
  const why = redirected.has(f) ? "redirecionada" : /<meta name="robots" content="[^"]*noindex/.test(html) ? "noindex" : canonical !== url ? `canonical ${canonical || "ausente"}` : "";
  if (why) skipped.push(`${f} (${why})`);
  else urls.push({ url, lastmod: lastmod(f), home: f === "index.html" });
}
urls.sort((a, b) => b.home - a.home || a.url.localeCompare(b.url));

fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u.url)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /scripts/\n\nSitemap: ${BASE}sitemap.xml\n`);
console.log(`sitemap.xml: ${urls.length} URLs. Fora do sitemap: ${skipped.join(", ") || "nenhuma"}.`);
