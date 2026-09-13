#!/usr/bin/env node
// Gera scripts/image-fetch-log.txt completo a partir de .fetch-results.json
// (usado depois de rodadas --only, para o log final refletir as 28 imagens
// de uma vez so, nao apenas o ultimo lote reprocessado).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const results = JSON.parse(fs.readFileSync(path.join(__dirname, '.fetch-results.json'), 'utf-8'));

const lines = [];
lines.push('Busca de imagens — Clube da Receita');
lines.push(`Log final consolidado em: ${new Date().toISOString()}`);
lines.push('Chaves configuradas: PEXELS_API_KEY=false | PIXABAY_API_KEY=false');
lines.push('-'.repeat(78));

for (const r of results) {
  const label = `[${r.pasta}/${r.slug}] "${r.query}"`;
  if (r.ok) {
    const webpPath = path.join('public', 'images', r.pasta, `${r.slug}.webp`);
    lines.push(`OK   ${label}`);
    lines.push(`     fonte: ${r.source}`);
    lines.push(`     descricao original (Pixabay): ${r.alt}`);
    lines.push(`     arquivo final: ${webpPath}`);
    lines.push('');
  } else {
    lines.push(`FALHOU ${label}`);
    lines.push(`     erro: ${r.error}`);
    lines.push('');
  }
}

const okCount = results.filter((r) => r.ok).length;
lines.push('-'.repeat(78));
lines.push(`Total: ${okCount}/${results.length} imagens baixadas com sucesso.`);
lines.push('');
lines.push('Observacoes de revisao manual:');
lines.push('- tacaca: Pixabay nao tem foto real de tacaca (prato regional muito');
lines.push('  especifico); usada uma foto generica de caldo/broth amarelado como');
lines.push('  aproximacao visual.');
lines.push('- acaraje: sem foto real de acaraje no banco; usada uma foto de fritter');
lines.push('  frito redondo dourado como aproximacao visual.');
lines.push('- coq-au-vin: Pixabay nao tem nenhuma foto real de coq au vin; usada uma');
lines.push('  foto de ensopado de carne ao vinho (beef stew) como aproximacao —');
lines.push('  visualmente proxima, mas e carne bovina, nao frango.');
lines.push('- Todas as outras 25 imagens sao fotos reais e diretamente');
lines.push('  representativas do prato/paisagem pedido.');

fs.writeFileSync(path.join(__dirname, 'image-fetch-log.txt'), lines.join('\n'), 'utf-8');
console.log('Log final regenerado.');
