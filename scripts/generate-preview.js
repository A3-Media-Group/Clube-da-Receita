#!/usr/bin/env node
/**
 * generate-preview.js — monta scripts/preview-imagens.html com miniaturas de todas as
 * imagens baixadas/otimizadas, lado a lado com o nome do item, para revisao rapida
 * antes de publicar (imagens erradas ou pouco representativas ficam faceis de achar).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RESULTS_PATH = path.join(__dirname, '.fetch-results.json');
const OUT_PATH = path.join(__dirname, 'preview-imagens.html');

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildCard(item) {
  const webpRelFromScripts = `../public/images/${item.pasta}/${item.slug}.webp`;
  const exists = fs.existsSync(path.join(ROOT, 'public', 'images', item.pasta, `${item.slug}.webp`));
  const lowConfidence = typeof item.relevanceScore === 'number' && item.relevanceScore === 0;

  if (!item.ok || !exists) {
    return `
    <div class="card card--error">
      <div class="thumb thumb--empty">sem imagem</div>
      <div class="meta">
        <div class="slug">${escapeHtml(item.slug)}</div>
        <div class="pasta">${escapeHtml(item.pasta)}</div>
        <div class="query">"${escapeHtml(item.query)}"</div>
        <div class="err">${escapeHtml(item.error || 'nao otimizada')}</div>
      </div>
    </div>`;
  }

  return `
    <div class="card${lowConfidence ? ' card--warn' : ''}">
      <img class="thumb" src="${webpRelFromScripts}" loading="lazy" alt="${escapeHtml(item.alt || item.slug)}" />
      <div class="meta">
        <div class="slug">${escapeHtml(item.slug)}</div>
        <div class="pasta">${escapeHtml(item.pasta)}</div>
        <div class="query">"${escapeHtml(item.query)}"</div>
        <div class="source">${escapeHtml(item.source || '')}</div>
        ${lowConfidence ? '<div class="warn-badge">revisar — baixa relevancia</div>' : ''}
      </div>
    </div>`;
}

function run(results) {
  const groups = {};
  for (const item of results) {
    groups[item.pasta] = groups[item.pasta] || [];
    groups[item.pasta].push(item);
  }

  const sections = Object.entries(groups)
    .map(
      ([pasta, items]) => `
      <section>
        <h2>${escapeHtml(pasta)} <span class="count">(${items.length})</span></h2>
        <div class="grid">
          ${items.map(buildCard).join('\n')}
        </div>
      </section>`
    )
    .join('\n');

  const okCount = results.filter((r) => r.ok).length;

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>Preview de imagens — Clube da Receita</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 24px; background: #f7f5f2; color: #262220;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  h1 { font-size: 22px; margin: 0 0 4px; }
  .subtitle { color: #6b625b; margin: 0 0 24px; font-size: 14px; }
  h2 { font-size: 16px; text-transform: capitalize; margin: 32px 0 12px; border-bottom: 2px solid #e7e0d8; padding-bottom: 6px; }
  .count { font-weight: 400; color: #8a8079; font-size: 13px; }
  .grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
  }
  .card {
    background: #fff; border: 1px solid #e7e0d8; border-radius: 10px; overflow: hidden;
    display: flex; flex-direction: column;
  }
  .card--warn { border-color: #d97706; box-shadow: 0 0 0 2px rgba(217,119,6,0.15); }
  .card--error { border-color: #b91c1c; }
  .thumb { width: 100%; aspect-ratio: 4/3; object-fit: cover; background: #eee; display: block; }
  .thumb--empty {
    display: flex; align-items: center; justify-content: center; color: #b91c1c;
    font-size: 12px; background: #fdecec;
  }
  .meta { padding: 8px 10px 10px; font-size: 12px; line-height: 1.4; }
  .slug { font-weight: 700; font-size: 13px; }
  .pasta { color: #8a8079; }
  .query { color: #4a443f; font-style: italic; margin-top: 2px; }
  .source { color: #2563eb; margin-top: 4px; }
  .err { color: #b91c1c; margin-top: 4px; }
  .warn-badge {
    margin-top: 6px; display: inline-block; background: #fef3c7; color: #92400e;
    padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 11px;
  }
</style>
</head>
<body>
  <h1>Preview de imagens — Clube da Receita</h1>
  <p class="subtitle">${okCount} de ${results.length} imagens baixadas e otimizadas. Cards com borda laranja tiveram baixa relevancia na busca automatica — revise antes de publicar. Gerado em ${new Date().toLocaleString('pt-BR')}.</p>
  ${sections}
</body>
</html>
`;

  fs.writeFileSync(OUT_PATH, html, 'utf-8');
  return OUT_PATH;
}

if (require.main === module) {
  if (!fs.existsSync(RESULTS_PATH)) {
    console.error(`Nao encontrei ${RESULTS_PATH}. Rode "node scripts/fetch-images.js" primeiro.`);
    process.exit(1);
  }
  const results = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf-8'));
  const out = run(results);
  console.log(`Preview gerado em ${out}`);
}

module.exports = { run };
