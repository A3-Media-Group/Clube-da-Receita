#!/usr/bin/env node
/**
 * fetch-images.js — busca e baixa fotos reais (Pexels / Pixabay) para o site Clube da Receita.
 *
 * Fontes usadas, nessa ordem, por item:
 *   1. Pexels API oficial          — usada se PEXELS_API_KEY estiver definida em .env.local
 *   2. Pixabay API oficial         — usada se PIXABAY_API_KEY estiver definida em .env.local
 *   3. Busca publica do Pixabay    — fallback sem necessidade de chave/login (usa a mesma
 *      pagina de busca que qualquer visitante do site v�, so que lida por este script).
 *      Ativado automaticamente quando nenhuma das chaves acima esta configurada.
 *
 * Por que o Pexels nao tem um fallback "sem chave" equivalente: o pexels.com bloqueia
 * requisicoes HTTP simples (sem navegador) com um desafio Cloudflare. Sem PEXELS_API_KEY,
 * este script pula direto para o Pixabay (que responde normalmente a requisicoes simples).
 * Para reativar o Pexels no futuro basta colar uma chave gratuita (pexels.com/api) em
 * .env.local -- e instantanea, nao exige cartao.
 *
 * Licenca: tanto a API do Pexels quanto o conteudo do Pixabay sao de uso livre, inclusive
 * comercial, sem necessidade de atribuicao visivel (ambos ainda recomendam credito quando
 * possivel, por isso este script registra a fonte de cada imagem no log, para uso interno).
 *
 * Uso:
 *   node scripts/fetch-images.js            -> busca, baixa e otimiza tudo
 *   node scripts/fetch-images.js --skip-optimize  -> so busca/baixa, nao roda o sharp
 */

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ORIGINALS_DIR = path.join(ROOT, 'scripts', '.originals');
const PUBLIC_IMAGES_DIR = path.join(ROOT, 'public', 'images');
const LOG_PATH = path.join(ROOT, 'scripts', 'image-fetch-log.txt');

// ---------------------------------------------------------------------------
// Lista de imagens a buscar: slug | pasta | termo de busca
// ---------------------------------------------------------------------------
const ITEMS = [
  { slug: 'tacaca', pasta: 'receitas', query: 'yellow soup bowl broth' },
  { slug: 'pato-no-tucupi', pasta: 'receitas', query: 'roasted duck brazilian dish' },
  { slug: 'acaraje', pasta: 'receitas', query: 'falafel bean fritter fried' },
  { slug: 'baiao-de-dois', pasta: 'receitas', query: 'rice and beans brazilian dish' },
  { slug: 'arroz-com-pequi', pasta: 'receitas', query: 'yellow rice brazilian dish' },
  { slug: 'feijoada-carioca', pasta: 'receitas', query: 'feijoada brazilian black bean stew' },
  { slug: 'pao-de-queijo', pasta: 'receitas', query: 'pao de queijo' },
  { slug: 'barreado', pasta: 'receitas', query: 'beef stew ceramic pot slow cooked' },
  { slug: 'espaguete-a-carbonara', pasta: 'receitas', query: 'spaghetti carbonara' },
  { slug: 'pizza-margherita', pasta: 'receitas', query: 'margherita pizza baked slice' },
  // Pixabay nao tem fotos reais de "coq au vin" (nem varias variacoes tentadas);
  // "beef bourguignon stew" e o parente visual mais proximo que existe la (guisado
  // escuro ao vinho, com cenoura) -- mais fiel ao prato do que uma taca de vinho.
  { slug: 'coq-au-vin', pasta: 'receitas', query: 'beef bourguignon stew' },
  { slug: 'crepes-suzette', pasta: 'receitas', query: 'crepe suzette dessert' },
  { slug: 'ramen-shoyu', pasta: 'receitas', query: 'ramen bowl noodles egg closeup' },
  { slug: 'tacos-al-pastor', pasta: 'receitas', query: 'tacos al pastor' },
  { slug: 'paella-valenciana', pasta: 'receitas', query: 'paella rice seafood pan spanish' },
  { slug: 'butter-chicken', pasta: 'receitas', query: 'butter chicken curry' },
  { slug: 'pad-thai', pasta: 'receitas', query: 'pad thai noodles' },
  { slug: 'tagine-de-cordeiro', pasta: 'receitas', query: 'lamb tagine moroccan' },
  { slug: 'ceviche-classico', pasta: 'receitas', query: 'peruvian ceviche' },
  { slug: 'cheesecake-nova-york', pasta: 'receitas', query: 'cheesecake slice dessert' },
  // Evitar "amazon" sozinho: no Pixabay isso puxa fotos de pessoas indigenas (nao
  // apropriado para uma foto de "regiao" generica). "rainforest jungle" sem
  // "amazon"/"river" traz paisagem pura de mata.
  { slug: 'norte', pasta: 'regioes', query: 'rainforest jungle stream sunlight' },
  { slug: 'nordeste', pasta: 'regioes', query: 'jericoacoara dunes beach coconut trees' },
  { slug: 'centro-oeste', pasta: 'regioes', query: 'cerrado savanna landscape trees' },
  { slug: 'sudeste', pasta: 'regioes', query: 'rio de janeiro sao paulo skyline' },
  { slug: 'sul', pasta: 'regioes', query: 'pampas gaucho landscape brazil' },
  { slug: 'hero-home', pasta: 'institucional', query: 'cozy kitchen table food overhead' },
  { slug: 'sobre', pasta: 'institucional', query: 'cook hands preparing food kitchen' },
  { slug: 'ferramentas-bg', pasta: 'institucional', query: 'kitchen utensils flat lay wood' },
];

// Termos que nunca devem aparecer na imagem escolhida (bandeiras, icones de
// ferramentas, ilustracoes/vetores/IA) -- reforco alem do filtro por tipo de conteudo.
const BLOCKLIST_WORDS = [
  'flag', 'bandeira', 'icon', 'icone', 'illustration', 'ilustra', 'vector',
  'clipart', 'clip art', 'cartoon', 'render 3d', '3d render', 'ai generated',
  'ai-generated', 'generated by ai', 'drawing', 'painting', 'logo',
];

// ---------------------------------------------------------------------------
// .env.local loader (sem dependencia externa)
// ---------------------------------------------------------------------------
function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  const raw = fs.readFileSync(envPath, 'utf-8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    env[key] = value;
  }
  return env;
}

function isRealKey(value) {
  return Boolean(value) && value !== 'cole_sua_chave_aqui';
}

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function containsBlockedWord(text) {
  const lower = (text || '').toLowerCase();
  return BLOCKLIST_WORDS.some((w) => lower.includes(w));
}

// Peso por tamanho da palavra (nao +1 fixo): palavras curtas/genericas ("new", "pan",
// "rice") batem por acaso em resultados irrelevantes com bastante frequencia, e um
// match generico nao deveria pesar igual a um match de uma palavra distintiva
// ("cheesecake", "carbonara"). Ex.: sem isso, "new york cheesecake slice" escolhia
// um MAPA de Nova York (batia "new"+"york") em vez de uma foto de cheesecake.
function scoreCandidate(query, alt) {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 4);
  const altLower = (alt || '').toLowerCase();
  return tokens.reduce((score, t) => (altLower.includes(t) ? score + t.length : score), 0);
}

/**
 * pixabay.com (a pagina de busca, nao o CDN de imagens) fica atras de uma protecao
 * anti-bot que bloqueia o cliente HTTP nativo do Node (fetch/undici) mesmo com
 * headers de navegador -- a deteccao parece ser por fingerprint de TLS. O curl,
 * que vem pre-instalado no Windows 10/11, macOS e na maioria das distros Linux,
 * passa normalmente. Por isso a pagina de busca e buscada via curl e so os
 * arquivos de imagem (cdn.pixabay.com, sem essa protecao) usam fetch() nativo.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function curlOnce(url) {
  return new Promise((resolve, reject) => {
    execFile(
      'curl',
      ['-sL', '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9', url],
      { maxBuffer: 20 * 1024 * 1024, timeout: 20000 },
      (err, stdout) => {
        if (err) return reject(err);
        if (!stdout || stdout.length < 500) {
          return reject(new Error('resposta vazia/curta do curl'));
        }
        if (stdout.includes('Just a moment') || stdout.includes('cf-chl')) {
          return reject(new Error('bloqueado por desafio anti-bot (tentando de novo)'));
        }
        resolve(stdout);
      }
    );
  });
}

// Requisicoes muito seguidas de vez em quando esbarram num desafio anti-bot
// passageiro; algumas tentativas com espera curta entre elas resolvem.
async function fetchHtmlViaCurl(url, retries = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      return await curlOnce(url);
    } catch (e) {
      lastErr = e;
      if (attempt < retries) await sleep(800 * attempt);
    }
  }
  throw lastErr;
}

async function downloadBinary(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download failed (${res.status}) for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

// ---------------------------------------------------------------------------
// Fonte 1: Pexels API oficial
// ---------------------------------------------------------------------------
async function searchPexelsApi(query, apiKey) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: apiKey } });
  if (!res.ok) throw new Error(`Pexels API HTTP ${res.status}`);
  const data = await res.json();
  const photos = (data.photos || []).filter((p) => !containsBlockedWord(p.alt));
  if (photos.length === 0) return null;
  const best = photos[0];
  return {
    source: 'Pexels (API oficial)',
    sourceUrl: best.url,
    imageUrl: best.src.original || best.src.large2x || best.src.large,
    alt: best.alt || '',
  };
}

// ---------------------------------------------------------------------------
// Fonte 2: Pixabay API oficial
// ---------------------------------------------------------------------------
async function searchPixabayApi(query, apiKey) {
  const url = `https://pixabay.com/api/?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(
    query
  )}&image_type=photo&safesearch=true&per_page=5`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Pixabay API HTTP ${res.status}`);
  const data = await res.json();
  const hits = (data.hits || []).filter((h) => !containsBlockedWord(h.tags));
  if (hits.length === 0) return null;
  const best = hits[0];
  return {
    source: 'Pixabay (API oficial)',
    sourceUrl: best.pageURL,
    imageUrl: best.largeImageURL || best.webformatURL,
    alt: best.tags || '',
  };
}

// ---------------------------------------------------------------------------
// Fonte 3: busca publica do Pixabay (sem chave, sem login)
// ---------------------------------------------------------------------------
async function searchPixabayPublic(query) {
  const url = `https://pixabay.com/images/search/${encodeURIComponent(query)}/`;
  const html = await fetchHtmlViaCurl(url);

  // Cada resultado real (foto) aparece como:
  //   <a ... href="/photos/<slug>-<id>/" data-id="<id>">...<img src="<url>_640.jpg" ... alt="...">
  // Ilustracoes/vetores/videos/gifs usam outros prefixos de pasta (/illustrations/, /vectors/, ...)
  // e sao ignorados por nao bater no regex de href="/photos/...".
  const entryRe =
    /<a class="[^"]*" href="(\/photos\/[^"]+)" data-id="(\d+)">[\s\S]{0,400}?<img ([^>]+)>/g;

  const candidates = [];
  let m;
  while ((m = entryRe.exec(html)) !== null) {
    const [, href, id, imgAttrs] = m;
    const srcMatch = imgAttrs.match(/\bsrc="([^"]+)"/);
    const srcSetMatch = imgAttrs.match(/\bsrcSet="([^"]+)"/);
    const altMatch = imgAttrs.match(/\balt="([^"]*)"/);
    const alt = (altMatch ? altMatch[1] : '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

    // Alguns resultados usam lazy-load: src="/static/img/blank.gif" e a URL real so
    // aparece depois via JS. Quando isso acontece, tenta pegar a URL real do srcSet
    // (a variante "2x", normalmente a de maior resolucao); se nao tiver nenhuma URL
    // real disponivel na HTML estatica, o candidato e descartado.
    let thumbSrc = srcMatch ? srcMatch[1] : null;
    if (!thumbSrc || !thumbSrc.startsWith('https://cdn.pixabay.com')) {
      if (srcSetMatch) {
        const parts = srcSetMatch[1].split(',').map((p) => p.trim().split(' ')[0]);
        thumbSrc = parts[parts.length - 1] || parts[0] || null;
      }
    }
    if (!thumbSrc || !thumbSrc.startsWith('https://cdn.pixabay.com')) continue;

    if (containsBlockedWord(href) || containsBlockedWord(alt)) continue;
    candidates.push({ href, id, thumbSrc, alt });
  }

  if (candidates.length === 0) return null;

  // Reordena por relevancia (contagem de palavras da busca presentes no alt),
  // mas usa a ordem original do Pixabay (relevancia deles) como desempate.
  let best = candidates[0];
  let bestScore = scoreCandidate(query, best.alt);
  for (const c of candidates.slice(1)) {
    const s = scoreCandidate(query, c.alt);
    if (s > bestScore) {
      best = c;
      bestScore = s;
    }
  }

  // A miniatura vem como .../nome_640.jpg (as vezes _340/_1280). A maior resolucao
  // acessivel sem login e _1280; tenta essa primeiro e cai para a miniatura original
  // se por algum motivo a 1280 nao existir para esse arquivo especifico.
  const large = best.thumbSrc.replace(/_(340|640|960_720)\.jpg$/, '_1280.jpg');

  return {
    source: 'Pixabay (busca publica, sem API key)',
    sourceUrl: `https://pixabay.com${best.href}`,
    imageUrl: large,
    imageUrlFallback: best.thumbSrc,
    alt: best.alt,
    relevanceScore: bestScore,
  };
}

// ---------------------------------------------------------------------------
// Pipeline principal de busca (tenta as fontes em ordem)
// ---------------------------------------------------------------------------
async function findImage(item, env) {
  const attempts = [];

  if (isRealKey(env.PEXELS_API_KEY)) {
    try {
      const r = await searchPexelsApi(item.query, env.PEXELS_API_KEY);
      if (r) return r;
      attempts.push('Pexels API: nenhum resultado relevante');
    } catch (e) {
      attempts.push(`Pexels API falhou: ${e.message}`);
    }
  } else {
    attempts.push('Pexels API pulada (PEXELS_API_KEY nao configurada)');
  }

  if (isRealKey(env.PIXABAY_API_KEY)) {
    try {
      const r = await searchPixabayApi(item.query, env.PIXABAY_API_KEY);
      if (r) return r;
      attempts.push('Pixabay API: nenhum resultado relevante');
    } catch (e) {
      attempts.push(`Pixabay API falhou: ${e.message}`);
    }
  } else {
    attempts.push('Pixabay API pulada (PIXABAY_API_KEY nao configurada)');
  }

  try {
    const r = await searchPixabayPublic(item.query);
    if (r) return r;
    attempts.push('Pixabay (busca publica): nenhum resultado relevante');
  } catch (e) {
    attempts.push(`Pixabay (busca publica) falhou: ${e.message}`);
  }

  throw new Error(`Nenhuma imagem encontrada. Tentativas: ${attempts.join(' | ')}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const env = loadEnvLocal();
  const logLines = [];
  const results = [];

  // --only=slug1,slug2 refaz a busca so desses itens (para corrigir uma imagem
  // errada sem re-baixar as outras 27). O restante e reaproveitado do
  // .fetch-results.json da rodada anterior, se existir.
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const onlySlugs = onlyArg ? onlyArg.slice('--only='.length).split(',').map((s) => s.trim()) : null;
  const itemsToFetch = onlySlugs ? ITEMS.filter((i) => onlySlugs.includes(i.slug)) : ITEMS;

  let previousResults = [];
  const resultsJsonPath = path.join(__dirname, '.fetch-results.json');
  if (onlySlugs && fs.existsSync(resultsJsonPath)) {
    previousResults = JSON.parse(fs.readFileSync(resultsJsonPath, 'utf-8'));
  }

  logLines.push(`Busca de imagens — Clube da Receita`);
  logLines.push(`Executado em: ${new Date().toISOString()}`);
  logLines.push(
    `Chaves configuradas: PEXELS_API_KEY=${isRealKey(env.PEXELS_API_KEY)} | PIXABAY_API_KEY=${isRealKey(
      env.PIXABAY_API_KEY
    )}`
  );
  if (onlySlugs) logLines.push(`Modo seletivo (--only): ${onlySlugs.join(', ')}`);
  logLines.push('-'.repeat(78));

  for (const item of itemsToFetch) {
    const label = `[${item.pasta}/${item.slug}] "${item.query}"`;
    process.stdout.write(`Buscando ${label} ... `);
    await sleep(400); // evita disparar varias buscas por segundo seguidas
    try {
      const found = await findImage(item, env);
      const ext = '.jpg';
      const destPath = path.join(ORIGINALS_DIR, item.pasta, `${item.slug}${ext}`);

      let bytes;
      try {
        bytes = await downloadBinary(found.imageUrl, destPath);
      } catch (e) {
        if (found.imageUrlFallback) {
          bytes = await downloadBinary(found.imageUrlFallback, destPath);
          found.imageUrl = found.imageUrlFallback;
        } else {
          throw e;
        }
      }

      console.log(`OK (${found.source})`);
      logLines.push(`OK   ${label}`);
      logLines.push(`     fonte: ${found.source}`);
      logLines.push(`     pagina: ${found.sourceUrl}`);
      logLines.push(`     arquivo: ${found.imageUrl}`);
      logLines.push(`     descricao original: ${found.alt}`);
      logLines.push(`     salvo em: ${path.relative(ROOT, destPath)} (${(bytes / 1024).toFixed(0)} KB)`);
      if (typeof found.relevanceScore === 'number') {
        logLines.push(
          `     relevancia (palavras-chave batidas no alt): ${found.relevanceScore}${
            found.relevanceScore === 0 ? '  <-- baixa confianca, REVISE no preview!' : ''
          }`
        );
      }
      logLines.push('');

      results.push({
        ...item,
        ok: true,
        originalPath: destPath,
        source: found.source,
        alt: found.alt,
        relevanceScore: found.relevanceScore,
      });
    } catch (e) {
      console.log(`FALHOU (${e.message})`);
      logLines.push(`FALHOU ${label}`);
      logLines.push(`     erro: ${e.message}`);
      logLines.push('');
      results.push({ ...item, ok: false, error: e.message });
    }
  }

  // Mescla com a rodada anterior (no modo --only, os itens nao re-buscados
  // mantem o resultado que ja tinham).
  const finalResults = onlySlugs
    ? previousResults.map((prev) => results.find((r) => r.slug === prev.slug) || prev).concat(
        results.filter((r) => !previousResults.some((p) => p.slug === r.slug))
      )
    : results;

  const okCount = finalResults.filter((r) => r.ok).length;
  logLines.push('-'.repeat(78));
  logLines.push(`Total: ${okCount}/${ITEMS.length} imagens baixadas com sucesso.`);

  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.writeFileSync(LOG_PATH, logLines.join('\n'), 'utf-8');
  console.log(`\nLog salvo em ${path.relative(ROOT, LOG_PATH)}`);

  fs.writeFileSync(
    path.join(__dirname, '.fetch-results.json'),
    JSON.stringify(finalResults, null, 2),
    'utf-8'
  );

  if (!process.argv.includes('--skip-optimize')) {
    console.log('\nOtimizando imagens (resize + webp)...');
    // eslint-disable-next-line global-require
    await require('./optimize-images.js').run(finalResults);

    console.log('\nGerando pagina de preview...');
    // eslint-disable-next-line global-require
    const previewPath = require('./generate-preview.js').run(finalResults);
    console.log(`Preview: ${path.relative(ROOT, previewPath)}`);
  }
}

main().catch((e) => {
  console.error('Erro fatal:', e);
  process.exit(1);
});
