#!/usr/bin/env node
/**
 * optimize-images.js — redimensiona (max 1600px de largura) e converte para .webp
 * as imagens baixadas por fetch-images.js, escrevendo o resultado final em
 * public/images/[pasta]/[slug].webp (mesma estrutura de pastas da lista original).
 *
 * Pode rodar sozinho (le scripts/.fetch-results.json, gerado no ultimo fetch-images.js)
 * ou ser chamado direto por fetch-images.js ao final do download.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_IMAGES_DIR = path.join(ROOT, 'public', 'images');
const RESULTS_PATH = path.join(__dirname, '.fetch-results.json');

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

async function optimizeOne(item) {
  const srcPath = item.originalPath;
  const destPath = path.join(PUBLIC_IMAGES_DIR, item.pasta, `${item.slug}.webp`);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const image = sharp(srcPath);
  const meta = await image.metadata();

  await image
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);

  const outStat = fs.statSync(destPath);
  const outMeta = await sharp(destPath).metadata();

  return {
    slug: item.slug,
    pasta: item.pasta,
    from: `${meta.width}x${meta.height}`,
    to: `${outMeta.width}x${outMeta.height}`,
    outSizeKB: Math.round(outStat.size / 1024),
    destPath,
  };
}

async function run(results) {
  const okItems = results.filter((r) => r.ok);
  const report = [];
  for (const item of okItems) {
    process.stdout.write(`Otimizando [${item.pasta}/${item.slug}] ... `);
    try {
      const r = await optimizeOne(item);
      console.log(`${r.from} -> ${r.to}, ${r.outSizeKB} KB (webp)`);
      report.push(r);
    } catch (e) {
      console.log(`FALHOU (${e.message})`);
    }
  }
  return report;
}

if (require.main === module) {
  if (!fs.existsSync(RESULTS_PATH)) {
    console.error(
      `Nao encontrei ${path.relative(ROOT, RESULTS_PATH)}. Rode "node scripts/fetch-images.js" primeiro.`
    );
    process.exit(1);
  }
  const results = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf-8'));
  run(results).then(() => console.log('\nOtimizacao concluida.'));
}

module.exports = { run, optimizeOne };
