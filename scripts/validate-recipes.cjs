// Valida o JSON-LD Recipe de todas as páginas receita-*.html.
// Uso: node scripts/validate-recipes.cjs [arquivo.html ...]  (sem argumentos: todas as receitas)
// Confere os campos que o Google usa em resultados de receita, o formato ISO 8601 dos tempos,
// os HowToStep (name, text, url com âncora existente na página) e se a imagem local existe.
// aggregateRating, video e nutrition não são exigidos: só entram com dados reais.
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const BASE = JSON.parse(fs.readFileSync(path.join(ROOT, "site-config.json"), "utf8")).url.replace(/\/?$/, "/");
const REQUIRED = ["name", "image", "description", "author", "recipeIngredient", "recipeInstructions", "prepTime", "cookTime", "totalTime", "recipeYield", "recipeCategory", "recipeCuisine", "keywords"];
const DURATION = /^P(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/;
const minutes = (d) => { const m = /T(?:(\d+)H)?(?:(\d+)M)?/.exec(d) || []; return (+m[1] || 0) * 60 + (+m[2] || 0); };

const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(ROOT).filter((f) => /^receita-.*\.html$/.test(f)).sort();
let failed = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(ROOT, file), "utf8");
  const errors = [];
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(([, j]) => {
    try { const d = JSON.parse(j); return Array.isArray(d) ? d : [d]; } catch (e) { errors.push(`JSON inválido: ${e.message}`); return []; }
  });
  const recipes = blocks.filter((b) => b["@type"] === "Recipe");
  if (recipes.length !== 1) errors.push(`esperado 1 Recipe, encontrado ${recipes.length}`);
  const r = recipes[0] || {};
  for (const k of REQUIRED) if (r[k] == null || (Array.isArray(r[k]) && !r[k].length) || r[k] === "") errors.push(`falta ${k}`);
  for (const k of ["prepTime", "cookTime", "totalTime"]) if (r[k] && !DURATION.test(r[k])) errors.push(`${k} fora do ISO 8601: ${r[k]}`);
  if (r.prepTime && r.cookTime && r.totalTime && minutes(r.prepTime) + minutes(r.cookTime) > minutes(r.totalTime)) errors.push("totalTime menor que prepTime + cookTime"); // maior é válido: descanso/geladeira
  for (const img of [].concat(r.image || [])) {
    if (!/^https:\/\//.test(img)) errors.push(`imagem sem URL absoluta https: ${img}`);
    else if (img.startsWith(BASE) && !fs.existsSync(path.join(ROOT, img.slice(BASE.length)))) errors.push(`imagem local inexistente: ${img}`);
  }
  (r.recipeInstructions || []).forEach((s, i) => {
    if (s["@type"] !== "HowToStep" || !s.name || !s.text) errors.push(`passo ${i + 1} sem HowToStep com name e text`);
    const anchor = (s.url || "").split("#")[1];
    if (!s.url || !s.url.startsWith(BASE + file + "#") || !html.includes(`id="${anchor}"`)) errors.push(`passo ${i + 1}: url sem âncora válida (${s.url})`);
  });
  for (const k of ["aggregateRating", "video"]) if (r[k]) errors.push(`${k} presente: confirme que é real`);
  const canonical = (/<link rel="canonical" href="([^"]+)"/.exec(html) || [])[1];
  if (canonical !== BASE + file) errors.push(`canonical ${canonical} difere da URL da página`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) errors.push("página com noindex");
  if (errors.length) { failed++; console.error(`✗ ${file}\n  - ${errors.join("\n  - ")}`); }
  else console.log(`✓ ${file}: ${r.name} · ${r.recipeIngredient.length} ingredientes · ${r.recipeInstructions.length} passos · ${[].concat(r.image)[0]}`);
}
if (failed) process.exit(1);
