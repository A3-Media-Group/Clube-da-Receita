// Gera e atualiza o conteúdo do Clube da Receita.
// Uso: node scripts/enrich-site.cjs
// O script é idempotente: pode ser executado de novo após editar os dados em
// scripts/content/*.cjs. O site publicado continua 100% estático.
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const { IMAGES, imgAttrs, absoluteImage, creditHTML, commonsPage } = require("./content/images.cjs");
const NEW_RECIPES = require("./content/recipes-new.cjs");
const EXTRAS = require("./content/recipe-extras.cjs");
const ARTICLES = require("./content/articles.cjs");
const TOOLS = require("./content/tools.cjs");
const { TIPS, IDEAS } = require("./content/tips.cjs");

const BASE = JSON.parse(fs.readFileSync(path.join(ROOT, "site-config.json"), "utf8")).url.replace(/\/?$/, "/");
const VERSION = "20261012";
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => String(s).replace(/<[^>]+>/g, "");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

/* ------------------------------------------------------------------ */
/* Cabeçalho e rodapé compartilhados                                   */
/* ------------------------------------------------------------------ */
const NAV = `<nav id="navigation" aria-label="Navegação principal"><a href="receitas.html">Receitas</a><a href="/#regioes">Pelo Brasil</a><a href="receitas-internacionais.html">Pelo mundo</a><a href="ferramentas.html">Ferramentas</a><a href="dicas-de-cozinha.html">Dicas</a><a href="blog.html">Caderno</a></nav>`;
const FOOTER = `<footer class="footer"><div class="container footer-grid footer-grid-wide"><div><a class="brand" href="/" aria-label="Clube da Receita — início"><span class="brand-mark" aria-hidden="true">♧</span><span>clube da receita<small>BOA COMIDA. BOAS HISTÓRIAS.</small></span></a><p>A cozinha aproxima.<br>Uma boa receita é só o começo.</p></div><div><h3>Explore à vontade</h3><a href="receitas.html">Todas as receitas</a><a href="receitas-mais-buscadas.html">Receitas mais buscadas</a><a href="busca-geladeira.html">O que tem na geladeira?</a><a href="ideias-de-cardapio.html">Ideias de cardápio</a><a href="dicas-de-cozinha.html">Dicas de cozinha</a></div><div><h3>Ferramentas</h3><a href="ferramenta-conversor-de-medidas.html">Conversor de medidas</a><a href="ferramenta-calculadora-de-churrasco.html">Calculadora de churrasco</a><a href="ferramenta-calculadora-de-festa.html">Calculadora de festa</a><a href="ferramenta-lista-de-compras.html">Lista de compras</a><a href="ferramentas.html">Todas as ferramentas</a></div><div><h3>Guias</h3><a href="air-fryer-tempo-e-temperatura.html">Tabela da air fryer</a><a href="quanto-tempo-dura-na-geladeira.html">Validade na geladeira</a><a href="tabela-de-medidas-caseiras.html">Medidas caseiras</a><a href="quanto-tempo-cozinhar-ovo.html">Tempo do ovo cozido</a><a href="blog.html">Todo o caderno</a></div><div><h3>Nosso clube</h3><a href="sobre.html">Sobre o projeto</a><a href="contato.html">Fale com a gente</a><a href="creditos-das-imagens.html">Créditos das imagens</a></div></div><div class="container footer-bottom"><span>© 2026 Clube da Receita · Feito para quem gosta de cozinhar.</span><div><a href="politica-de-privacidade.html">Privacidade</a><a href="termos-de-uso.html">Termos de uso</a></div></div></footer>`;

function head({ title, desc, type = "website", file, image, extra = "", scripts = [] }) {
  const url = BASE + (file === "index.html" ? "" : file);
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Clube da Receita</title><meta name="description" content="${esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#243f35"><meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Clube da Receita"><meta property="og:image" content="${esc(image)}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://commons.wikimedia.org"><link rel="preconnect" href="https://upload.wikimedia.org"><link rel="stylesheet" href="assets/site.css?v=${VERSION}">${scripts.map((s) => `<script defer src="${s}"></script>`).join("")}<script defer src="assets/site.js?v=${VERSION}"></script>${extra}<link rel="canonical" href="${esc(url)}"><meta property="og:url" content="${esc(url)}"></head>`;
}
const BODY_TOP = `<body><a class="skip" href="#conteudo">Pular para o conteúdo</a><div class="topline">UM CONVITE PARA COZINHAR, DESCOBRIR E COMPARTILHAR.</div><header class="header"><div class="container nav"><a class="brand" href="/" aria-label="Clube da Receita — início"><span class="brand-mark" aria-hidden="true">♧</span><span>clube da receita<small>BOA COMIDA. BOAS HISTÓRIAS.</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu ☰</button>${NAV}<a class="saved-link" href="favoritos.html">♡ <span>Meu caderno</span></a></div></header>`;
const page = (h, main) => `${h}${BODY_TOP}<main id="conteudo">${main}</main>${FOOTER}</body></html>`;
const breadcrumbLD = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, f], i) => ({ "@type": "ListItem", position: i + 1, name, item: BASE + (f === "/" ? "" : f) })),
});
const ld = (o) => `<script type="application/ld+json">${json(o)}</script>`;
const crumbs = (items) => `<div class="container breadcrumb">${items.map(([n, f], i) => (i === items.length - 1 ? esc(n) : `<a href="${f}">${esc(n)}</a><span>/</span>`)).join("")}</div>`;

/* ------------------------------------------------------------------ */
/* Catálogo de receitas (20 originais + 10 novas)                       */
/* ------------------------------------------------------------------ */
const toMinutes = (s) => {
  const h = /(\d+)\s*h/.exec(s), m = /(\d+)\s*min/.exec(s);
  return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
};
const minutesLabel = (m) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? " " + (m % 60) + " min" : ""}` : `${m} min`);
const SWEET = new Set(["receita-cheesecake-nova-york.html", "receita-crepes-suzette.html"]);

function parseCatalogue() {
  const html = read("receitas.html");
  const out = [];
  const re = /<article class="recipe-card" data-recipe="([^"]+)" data-search="([^"]*)" data-difficulty="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, file, search, difficulty, inner] = m;
    if (!file.startsWith("receita-")) continue;
    const title = /<h3><a [^>]*>([^<]+)<\/a><\/h3>/.exec(inner)[1];
    const region = /<span class="eyebrow">([^<]+)<\/span>/.exec(inner)[1];
    const desc = /<p>([\s\S]*?)<\/p>/.exec(inner)[1];
    const time = /◷ ([^<]+?) <b>/.exec(inner)[1];
    out.push({ file, title, short: title, region, desc, difficulty, search, minutes: toMinutes(time), timeLabel: time });
  }
  return out;
}
let catalogue;
const cachePath = path.join(__dirname, "content", ".catalogue-original.json");
if (fs.existsSync(cachePath)) catalogue = JSON.parse(fs.readFileSync(cachePath, "utf8"));
else {
  catalogue = parseCatalogue();
  fs.writeFileSync(cachePath, JSON.stringify(catalogue, null, 1));
}
const ORIGINAL = catalogue.map((r) => {
  const x = EXTRAS[r.file] || {};
  const brazil = /NORTE|NORDESTE|SUL|SUDESTE|CENTRO-OESTE/.test(r.region);
  const ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(read(r.file))[1]);
  return {
    ...r,
    original: true,
    cuisine: brazil ? "Brasileira" : ld.recipeCuisine || "Internacional",
    category: x.category || "Pratos principais",
    type: SWEET.has(r.file) ? "doce" : "salgado",
    glutenFree: /SEM GLÚTEN/.test(r.search),
    ingredients: (ld.recipeIngredient || []).map(String),
  };
});
const FRESH = NEW_RECIPES.map((r) => {
  const minutes = r.prep + r.cook;
  return {
    ...r,
    minutes,
    timeLabel: minutesLabel(minutes),
    type: r.category === "Bolos e doces" ? "doce" : "salgado",
    glutenFree: r.tags.includes("SEM GLÚTEN"),
    search: [r.title, r.region, r.difficulty, ...r.tags, r.cuisine, r.category, ...r.ingredients.map((i) => i.name)].join(" "),
    ingredients: r.ingredients.map((i) => (i.base == null ? `${i.name} (${i.kind})` : `${i.base} ${unitLabel(i)} ${i.name}`)),
    rawIngredients: r.ingredients,
  };
});
function unitLabel(i) {
  return { g: "g", ml: "ml", unit: "un.", tbsp: "colher(es) de sopa", tsp: "colher(es) de chá" }[i.kind] || i.kind;
}
const ALL = [...FRESH, ...ORIGINAL];
const byFile = Object.fromEntries(ALL.map((r) => [r.file, r]));
const isBrazil = (r) => r.cuisine === "Brasileira";
const REGION_NAMES = { "regiao-norte.html": "Norte", "regiao-nordeste.html": "Nordeste", "regiao-sul.html": "Sul", "regiao-sudeste.html": "Sudeste", "regiao-centro-oeste.html": "Centro-Oeste" };

function categories(r) {
  const c = [r.type === "doce" ? "doces" : "salgados", isBrazil(r) ? "brasileiras" : "internacionais"];
  if (r.glutenFree) c.push("sem-gluten");
  if (r.minutes <= 45) c.push("rapidas");
  if (/AIR FRYER/.test(r.region + (r.tags || []).join(" "))) c.push("air-fryer");
  if ((r.tags || []).includes("FESTA") || /FESTA|SÃO JOÃO/.test(r.region)) c.push("festa");
  return c.join("|");
}

function cardImg(file, cls = "") {
  const a = imgAttrs(file, "card");
  if (!a) return "";
  return `<img class="${cls}" src="${esc(a.src)}" srcset="${esc(a.srcset)}" sizes="(max-width: 560px) 92vw, (max-width: 1100px) 45vw, 24vw" alt="${esc(a.alt)}" width="500" height="380" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('no-photo');this.remove()">`;
}
function card(r, i = 0) {
  return `<article class="recipe-card" data-recipe="${r.file}" data-search="${esc(r.search)}" data-difficulty="${r.difficulty}" data-category="${categories(r)}"><a class="card-art card-photo tone-${i % 4}" href="${r.file}" tabindex="-1" aria-hidden="true">${cardImg(r.file)}<span class="art-word">${esc(r.short || r.title)}</span></a><div class="card-body"><span class="eyebrow">${esc(r.region)}</span><h3><a href="${r.file}">${esc(r.title)}</a></h3><p>${r.desc}</p><div class="card-bottom"><span>◷ ${esc(r.timeLabel)} <b>·</b> ${r.difficulty}</span><button class="save" data-save="${r.file}" aria-label="Salvar ${esc(r.title)}" aria-pressed="false">♡</button></div></div></article>`;
}
const grid = (list) => `<div class="recipe-grid">${list.map(card).join("")}</div>`;

function replaceGrid(html, list) {
  const start = html.indexOf('<div class="recipe-grid">');
  if (start < 0) return html;
  const sectionEnd = html.indexOf("</section>", start);
  const lastArticle = html.lastIndexOf("</article></div>", sectionEnd);
  if (lastArticle < start) return html;
  return html.slice(0, start) + grid(list) + html.slice(lastArticle + "</article></div>".length);
}

/* ------------------------------------------------------------------ */
/* Atualizações comuns a todas as páginas existentes                   */
/* ------------------------------------------------------------------ */
function modernize(html, file, { title, desc, image } = {}) {
  html = html.replace(/<nav id="navigation"[\s\S]*?<\/nav>/, NAV);
  html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/, FOOTER);
  html = html.replace(/assets\/site\.css(\?v=\d+)?/g, `assets/site.css?v=${VERSION}`).replace(/assets\/site\.js(\?v=\d+)?/g, `assets/site.js?v=${VERSION}`);
  html = html.replace(/<link rel="canonical"[^>]*>|<meta property="og:(url|image)"[^>]*>|<meta name="twitter:card"[^>]*>|<meta name="robots" content="index[^>]*>/g, "");
  if (desc) html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`).replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  if (["favoritos.html", "404.html"].includes(file) && !/noindex/.test(html)) html = html.replace("</head>", '<meta name="robots" content="noindex,follow"></head>');
  const noindex = /noindex/.test(html);
  const url = BASE + (file === "index.html" ? "" : file);
  html = html.replace(
    "</head>",
    `${noindex ? "" : '<meta name="robots" content="index,follow,max-image-preview:large">'}<meta property="og:image" content="${esc(image || BASE + "public/images/institucional/hero-home.webp")}"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${esc(url)}"><meta property="og:url" content="${esc(url)}"></head>`,
  );
  // Cartões de receita com foto em qualquer grade da página.
  html = html.replace(/<a class="card-art (?:card-photo )?tone-(\d)[^"]*" href="([^"]+)" tabindex="-1" aria-hidden="true">([\s\S]*?)<\/a>/g, (m, tone, href) => {
    const r = byFile[href];
    if (!r) return m;
    return `<a class="card-art card-photo tone-${tone}" href="${href}" tabindex="-1" aria-hidden="true">${cardImg(href)}<span class="art-word">${esc(r.short || r.title)}</span></a>`;
  });
  return html;
}

/* ------------------------------------------------------------------ */
/* Seções reutilizáveis                                                */
/* ------------------------------------------------------------------ */
function heroFigure(key, { eager = false } = {}) {
  const a = imgAttrs(key, "hero");
  if (!a) return "";
  return `<figure class="hero-figure"><img src="${esc(a.src)}" srcset="${esc(a.srcset)}" sizes="(max-width: 800px) 100vw, 900px" alt="${esc(a.alt)}" width="960" height="640" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="this.closest('figure').classList.add('no-photo');this.remove()"><figcaption>${creditHTML(key)}</figcaption></figure>`;
}
function relatedRecipes(files, heading = "Receitas para colocar em prática") {
  const list = files.map((f) => byFile[f]).filter(Boolean);
  if (!list.length) return "";
  return `<section class="container section"><div class="section-heading"><div><span class="eyebrow">CONTINUE EXPLORANDO</span><h2>${heading}</h2></div><a class="text-link" href="receitas.html">Todas as receitas ↗</a></div>${grid(list)}</section>`;
}
function toolLinks(files) {
  const list = files.map((f) => TOOLS.find((t) => t.file === f)).filter(Boolean);
  if (!list.length) return "";
  return `<aside class="tool-links"><span class="eyebrow">FERRAMENTAS RELACIONADAS</span><div>${list.map((t) => `<a href="${t.file}"><span aria-hidden="true">${t.icon}</span>${esc(t.name)}</a>`).join("")}</div></aside>`;
}
function faqBlock(faqs) {
  return `<div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
}
function faqLD(faqs) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}
function relatedFor(r) {
  const sameType = ALL.filter((x) => x.file !== r.file && x.type === r.type);
  const sameOrigin = sameType.filter((x) => isBrazil(x) === isBrazil(r));
  const pool = [...sameOrigin.filter((x) => x.category === r.category), ...sameOrigin, ...sameType, ...ALL.filter((x) => x.file !== r.file)];
  const seen = new Set();
  return pool.filter((x) => (seen.has(x.file) ? false : seen.add(x.file))).slice(0, 4);
}
function extrasSection(r, x) {
  return `<!--extras--><section class="container recipe-extras"><div class="extras-grid"><div><span class="eyebrow">O PULO DO GATO</span><h2>Dicas para acertar</h2><ul class="check-list">${x.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div><div><span class="eyebrow">DEPOIS DO PREPARO</span><h2>Como conservar</h2><p>${esc(x.conserve)}</p><p class="small"><a href="quanto-tempo-dura-na-geladeira.html">Veja quanto tempo dura cada alimento na geladeira ↗</a></p></div></div><span class="eyebrow">DÚVIDAS FREQUENTES</span><h2>Perguntas sobre ${esc(r.short || r.title)}</h2>${faqBlock(x.faqs)}${toolLinks(["ferramenta-ajustar-receita.html", "ferramenta-timer-de-cozinha.html", "ferramenta-lista-de-compras.html", "ferramenta-substituicao-de-ingredientes.html"])}</section><!--/extras-->`;
}

/* ------------------------------------------------------------------ */
/* 1. Receitas originais: foto, dados estruturados, dicas e relacionadas */
/* ------------------------------------------------------------------ */
for (const r of ORIGINAL) {
  let html = read(r.file);
  const x = EXTRAS[r.file];
  html = modernize(html, r.file, { image: absoluteImage(r.file, BASE) });
  // Foto principal
  const a = imgAttrs(r.file, "hero");
  html = html.replace(/<div class="recipe-title-art[^"]*"[^>]*>[\s\S]*?<\/div><\/section>/, `<div class="recipe-title-art recipe-photo"><img src="${esc(a.src)}" srcset="${esc(a.srcset)}" sizes="(max-width: 800px) 100vw, 50vw" alt="${esc(a.alt)}" width="960" height="720" fetchpriority="high" decoding="async" onerror="this.parentNode.classList.add('no-photo');this.remove()"><span class="photo-credit">${creditHTML(r.file)}</span></div></section>`);
  // Botão de lista de compras
  if (!html.includes('id="add-to-list"')) html = html.replace('<button class="plain-button" data-print>Imprimir</button>', '<button class="plain-button" data-print>Imprimir</button><button class="plain-button" id="add-to-list">+ Lista de compras</button>');
  // Dados estruturados
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (m, j) => {
    const o = JSON.parse(j);
    if (o["@type"] !== "Recipe") return m;
    o.image = [absoluteImage(r.file, BASE)];
    o.recipeCategory = x.category;
    o.keywords = x.keywords;
    o.author = { "@type": "Organization", name: "Clube da Receita", url: BASE };
    return ld(o);
  });
  html = html.replace(/<script type="application\/ld\+json" data-extra>[\s\S]*?<\/script>/g, "");
  html = html.replace("</head>", `<script type="application/ld+json" data-extra>${json([breadcrumbLD([["Início", "/"], ["Receitas", "receitas.html"], [r.title, r.file]]), faqLD(x.faqs)])}</script></head>`);
  // Dicas, conservação e FAQ
  html = html.replace(/<!--extras-->[\s\S]*?<!--\/extras-->/, "");
  const cont = html.indexOf('<section class="container section"><div class="section-heading"><div><span class="eyebrow">CONTINUE EXPLORANDO');
  const contAlt = cont >= 0 ? cont : html.indexOf("CONTINUE EXPLORANDO") >= 0 ? html.lastIndexOf('<section class="container section">', html.indexOf("CONTINUE EXPLORANDO")) : -1;
  if (contAlt >= 0) {
    html = html.slice(0, contAlt) + extrasSection(r, x) + html.slice(contAlt);
    html = html.slice(0, contAlt) + replaceGrid(html.slice(contAlt), relatedFor(r));
  }
  write(r.file, html);
}

/* ------------------------------------------------------------------ */
/* 2. Receitas novas                                                    */
/* ------------------------------------------------------------------ */
function recipePage(r) {
  const img = absoluteImage(r.file, BASE);
  const a = imgAttrs(r.file, "hero");
  const total = r.prep + r.cook;
  const recipeLD = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: r.title,
    image: [img],
    author: { "@type": "Organization", name: "Clube da Receita", url: BASE },
    description: r.desc,
    prepTime: `PT${r.prep}M`,
    cookTime: `PT${r.cook}M`,
    totalTime: `PT${total}M`,
    recipeYield: `${r.servings} porções`,
    recipeCategory: r.category,
    recipeCuisine: r.cuisine,
    keywords: r.keywords,
    recipeIngredient: r.ingredients,
    recipeInstructions: r.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
  };
  const data = { ingredients: r.rawIngredients.map(({ name, base, kind }) => ({ name, base, kind })), steps: r.steps, servings: r.servings, cost: r.cost };
  const h = head({
    title: `${r.title}: receita fácil passo a passo`,
    desc: r.desc,
    type: "article",
    file: r.file,
    image: img,
    scripts: [`assets/recipe-generic.js?v=${VERSION}`],
    extra: ld(recipeLD) + `<script type="application/ld+json" data-extra>${json([breadcrumbLD([["Início", "/"], ["Receitas", "receitas.html"], [r.title, r.file]]), faqLD(r.faqs)])}</script><script type="application/json" id="recipe-json">${json(data)}</script>`,
  });
  const ingredients = r.rawIngredients
    .map((i, n) => `<li><label><input type="checkbox"><span>${esc(i.name)}</span><strong data-quantity="${n}">${i.base == null ? esc(i.kind) : esc(i.base + " " + unitLabel(i))}</strong></label></li>`)
    .join("");
  const steps = r.steps.map((s, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><p>${esc(s)}</p></li>`).join("");
  const main = `${crumbs([["Início", "/"], ["Receitas", "receitas.html"], [r.title, r.file]])}<section class="container recipe-intro"><div><span class="eyebrow">${esc(r.region)} · ${r.difficulty}</span><h1>${esc(r.title)}</h1><p>${esc(r.desc)}</p><div class="recipe-actions"><a class="button" href="#ingredientes">Ir para a receita ↓</a><button class="button-outline" data-save="${r.file}" aria-pressed="false">♡ Salvar receita</button></div><p class="byline">Por Clube da Receita · ${esc(r.category)}</p></div><div class="recipe-title-art recipe-photo"><img src="${esc(a.src)}" srcset="${esc(a.srcset)}" sizes="(max-width: 800px) 100vw, 50vw" alt="${esc(a.alt)}" width="960" height="720" fetchpriority="high" decoding="async" onerror="this.parentNode.classList.add('no-photo');this.remove()"><span class="recipe-art-name">${esc(r.short)}</span><span class="photo-credit">${creditHTML(r.file)}</span></div></section><div class="container recipe-meta"><div><span>Preparo</span><strong>${minutesLabel(r.prep)}</strong></div><div><span>Cozimento</span><strong>${minutesLabel(r.cook)}</strong></div><div><span>Tempo total</span><strong>${minutesLabel(total)}</strong></div><div><span>Rendimento original</span><strong>${r.servings} porções</strong></div><button class="button-outline" id="cook-start">Modo cozinha ↗</button><button class="plain-button" data-print>Imprimir</button><button class="plain-button" id="add-to-list">+ Lista de compras</button></div><section class="container recipe-layout"><aside id="ingredientes"><div class="ingredient-panel"><span class="eyebrow">SEPARE NA BANCADA</span><h2>Ingredientes</h2><div class="servings"><span>Quantas porções?</span><button id="servings-minus" aria-label="Diminuir porções">−</button><output id="servings-count" aria-live="polite">${r.servings}</output><button id="servings-plus" aria-label="Aumentar porções">+</button></div><ul class="ingredients">${ingredients}</ul><p class="small muted">Marque o que já separou. Quantidades são proporcionais; ajuste os temperos ao seu paladar.</p><details class="cost-panel"><summary>Calculadora de custo</summary><p class="small">Estimativa para a receita original. Atualize com o valor que você pagou nos ingredientes.</p><div class="price-fields"><label>Custo total da receita original (R$)<input type="number" min="0" max="100000" step="0.01" data-price="priceTotal" value="${r.cost}"></label></div><p>Total estimado <strong id="total-cost"></strong></p><p>Por porção <strong id="portion-cost"></strong></p></details></div></aside><article class="method"><span class="eyebrow">AGORA, MÃOS À MASSA</span><h2>Modo de preparo</h2><ol class="steps">${steps}</ol><div class="tip"><strong>Vai cozinhar para mais gente?</strong><p>Ajuste as porções na lista ao lado. Tempo de forno e tamanho da forma podem precisar de adaptação.</p></div></article></section>${extrasSection(r, r)}${relatedRecipes(relatedFor(r).map((x) => x.file), "Seu próximo prato.")}<dialog id="cook-dialog" aria-labelledby="cook-title"><button class="dialog-close" id="cook-close" aria-label="Fechar modo cozinha">×</button><span class="eyebrow">MODO COZINHA</span><h2 id="cook-title">${esc(r.title)}</h2><p id="cook-progress" aria-live="polite"></p><p id="cook-text" aria-live="polite"></p><div class="cook-buttons"><button class="button-outline" id="cook-prev">← Anterior</button><button class="button" id="cook-next">Próximo →</button></div></dialog>`;
  return page(h, main);
}
for (const r of FRESH) write(r.file, recipePage(r));

/* ------------------------------------------------------------------ */
/* 3. Artigos                                                           */
/* ------------------------------------------------------------------ */
function articleShell(a, bodyHTML, { file }) {
  const img = absoluteImage(file, BASE);
  const articleLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.desc,
    image: [img],
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Clube da Receita", url: BASE },
    publisher: { "@type": "Organization", name: "Clube da Receita", logo: { "@type": "ImageObject", url: BASE + "assets/favicon.svg" } },
    mainEntityOfPage: BASE + file,
  };
  const h = head({ title: a.title, desc: a.desc, type: "article", file, image: img, extra: ld([articleLD, breadcrumbLD([["Início", "/"], ["Caderno", "blog.html"], [a.h1, file]])]) });
  const main = `${crumbs([["Início", "/"], ["Caderno", "blog.html"], [a.h1, file]])}<article class="container prose article"><span class="eyebrow">${esc(a.eyebrow)}</span><h1>${esc(a.h1)}</h1><p class="lead">${esc(a.desc)}</p><p class="byline">Por Clube da Receita · leitura de ${a.minutes} min</p>${heroFigure(file, { eager: true })}${bodyHTML}${toolLinks(a.tools || [])}<p class="small muted article-note">Conteúdo informativo, revisado pela equipe editorial do Clube da Receita. Prazos e temperaturas são referências gerais; siga sempre as orientações do rótulo e, em caso de dúvida sobre segurança dos alimentos, descarte.</p><a class="button-outline" href="blog.html">← Voltar ao caderno</a></article>${relatedRecipes(a.recipes || [])}`;
  return page(h, main);
}
for (const a of ARTICLES) write(a.file, articleShell(a, a.body, { file: a.file }));

// Artigos antigos: ganham foto própria, ferramentas e receitas relacionadas.
const OLD_ARTICLES = [
  { file: "blog-guia-temperos.html", title: "Guia de temperos de cada região do Brasil", h1: "Guia de temperos de cada região do Brasil", desc: "Tucupi, jambu, dendê, pequi, queijo minas e erva-mate: conheça os temperos e ingredientes que dão identidade às cozinhas de cada região do Brasil.", eyebrow: "CADERNO · CULTURA & INGREDIENTES", minutes: 4, tools: ["ferramenta-substituicao-de-ingredientes.html"], recipes: ["receita-tacaca.html", "receita-acaraje.html", "receita-arroz-com-pequi.html", "receita-pao-de-queijo.html"] },
  { file: "blog-diferenca-norte-nordeste.html", title: "Norte e Nordeste: duas cozinhas, muitas histórias", h1: "Norte e Nordeste: duas cozinhas, muitas histórias", desc: "Mandioca, tucupi e peixes de rio no Norte; dendê, coco e carne-de-sol no Nordeste. Entenda as diferenças e o que as duas cozinhas compartilham.", eyebrow: "CADERNO · CULTURA À MESA", minutes: 4, tools: [], recipes: ["receita-pato-no-tucupi.html", "receita-tacaca.html", "receita-baiao-de-dois.html", "receita-bolo-de-milho.html"] },
];
const oldBodies = {};
for (const a of OLD_ARTICLES) {
  const src = read(a.file);
  const body = /<article class="container prose[^"]*">([\s\S]*?)<\/article>/.exec(src)[1];
  // Mantém só o texto original (sem cabeçalhos já gerados em execuções anteriores).
  let core = body;
  const h1 = core.indexOf("</h1>");
  if (h1 >= 0) core = core.slice(h1 + 5);
  core = core.replace(/<p class="lead">[\s\S]*?<\/p>|<p class="byline">[\s\S]*?<\/p>|<figure class="hero-figure">[\s\S]*?<\/figure>|<aside class="tool-links">[\s\S]*?<\/aside>|<p class="small muted article-note">[\s\S]*?<\/p>|<a class="button-outline" href="blog\.html">[\s\S]*?<\/a>/g, "");
  oldBodies[a.file] = core.trim();
  write(a.file, articleShell(a, oldBodies[a.file], { file: a.file }));
}

/* ------------------------------------------------------------------ */
/* 4. Caderno (lista de artigos)                                       */
/* ------------------------------------------------------------------ */
const ALL_ARTICLES = [...ARTICLES, ...OLD_ARTICLES];
function storyCard(a) {
  const im = imgAttrs(a.file, "card");
  return `<a class="story-card" href="${a.file}"><img src="${esc(im.src)}" srcset="${esc(im.srcset)}" sizes="(max-width: 700px) 100vw, 30vw" alt="${esc(im.alt)}" width="500" height="340" loading="lazy" decoding="async" onerror="this.remove()"><div><span class="eyebrow">${esc(a.eyebrow)}</span><h3>${esc(a.h1)}</h3><span class="text-link">Ler guia ↗</span></div></a>`;
}
write(
  "blog.html",
  page(
    head({ title: "Caderno de cozinha: guias, técnicas e histórias", desc: "Guias práticos de air fryer, conservação de alimentos, medidas, churrasco e marmitas, além de histórias e ingredientes da culinária brasileira.", file: "blog.html", image: absoluteImage(ARTICLES[0].file, BASE) }),
    `<section class="page-intro container"><span class="eyebrow">O CADERNO DO CLUBE</span><h1>Guias e histórias que dão sabor.</h1><p>Respostas para as dúvidas mais pesquisadas da cozinha — tempos, medidas, conservação e economia — e as histórias por trás dos ingredientes.</p></section><section class="container section story-grid story-grid-3">${ALL_ARTICLES.map(storyCard).join("")}</section>`,
  ),
);

/* ------------------------------------------------------------------ */
/* 5. Ferramentas                                                       */
/* ------------------------------------------------------------------ */
const recipesIndex = ALL.map((r) => ({
  file: r.file, title: r.title, short: r.short || r.title, region: r.region, desc: strip(r.desc), difficulty: r.difficulty,
  minutes: r.minutes, timeLabel: r.timeLabel, type: r.type, search: r.search, ingredients: r.ingredients,
  img: imgAttrs(r.file, "card")?.src || "",
}));
write("assets/recipes-index.js", `window.CLUBE_RECIPES=${json(recipesIndex)};\n`);
write("assets/tips.js", `window.CLUBE_TIPS=${json(TIPS)};\n`);

for (const t of TOOLS) {
  const appLD = { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, description: t.desc, url: BASE + t.file, applicationCategory: "LifestyleApplication", operatingSystem: "Todos", inLanguage: "pt-BR", offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" } };
  const others = TOOLS.filter((x) => x.file !== t.file).slice(0, 12);
  const h = head({ title: t.title, desc: t.desc, file: t.file, image: BASE + "public/images/institucional/ferramentas-bg.webp", scripts: [`assets/recipes-index.js?v=${VERSION}`, `assets/tools.js?v=${VERSION}`], extra: ld([appLD, breadcrumbLD([["Início", "/"], ["Ferramentas", "ferramentas.html"], [t.name, t.file]])]) });
  const main = `${crumbs([["Início", "/"], ["Ferramentas", "ferramentas.html"], [t.name, t.file]])}<section class="page-intro container tool-intro"><span class="eyebrow">FERRAMENTA GRATUITA · SEM CADASTRO</span><h1>${esc(t.title)}</h1><p>${esc(t.lead)}</p></section><section class="container tool-page">${t.widget}<div class="prose tool-content">${t.content}</div></section><section class="container section"><div class="section-heading"><div><span class="eyebrow">OUTRAS FERRAMENTAS</span><h2>Mais ajuda na cozinha.</h2></div><a class="text-link" href="ferramentas.html">Ver todas ↗</a></div><div class="tool-grid tool-grid-small">${others.map(toolCard).join("")}</div></section>`;
  write(t.file, page(h, main));
}
function toolCard(t) {
  return `<a class="tool-card" href="${t.file}"><span class="tool-icon" aria-hidden="true">${t.icon}</span><h3>${esc(t.name)}</h3><p>${esc(t.lead)}</p><span class="text-link">Abrir ↗</span></a>`;
}
write(
  "ferramentas.html",
  page(
    head({ title: "Ferramentas de cozinha online e grátis", desc: "13 ferramentas de cozinha grátis: conversor de medidas, calculadora de churrasco e de festa, timer, lista de compras, validade dos alimentos, cardápio semanal e mais.", file: "ferramentas.html", image: BASE + "public/images/institucional/ferramentas-bg.webp", extra: ld({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: BASE + t.file, name: t.name })) }) }),
    `<section class="page-intro container"><span class="eyebrow">SEU AJUDANTE NA BANCADA</span><h1>Ferramentas que facilitam a cozinha.</h1><p>Calcule, converta, planeje e organize. Todas gratuitas, sem cadastro e funcionando direto no navegador — inclusive no celular.</p></section><section class="container"><div class="editorial-photo"><img src="public/images/institucional/ferramentas-bg.webp" srcset="public/images/institucional/ferramentas-bg-small.webp 640w, public/images/institucional/ferramentas-bg.webp 1280w" sizes="(max-width: 700px) 100vw, 90vw" alt="Utensílios de cozinha em cima de um pano de linho" loading="lazy" decoding="async"></div></section><section class="container section"><div class="tool-grid">${TOOLS.map(toolCard).join("")}</div></section><section class="container section prose"><h2>Guias para usar junto</h2><p>As ferramentas ficam ainda mais úteis com os guias do caderno: <a href="tabela-de-medidas-caseiras.html">tabela de medidas caseiras</a>, <a href="air-fryer-tempo-e-temperatura.html">tempo e temperatura na air fryer</a>, <a href="quanto-de-carne-por-pessoa-churrasco.html">quanto de carne por pessoa</a> e <a href="quanto-tempo-dura-na-geladeira.html">quanto tempo dura cada alimento na geladeira</a>.</p></section>`,
  ),
);

/* ------------------------------------------------------------------ */
/* 6. Dicas, ideias, mais buscadas e créditos                          */
/* ------------------------------------------------------------------ */
{
  const groups = {};
  TIPS.forEach(([c, t]) => (groups[c] ||= []).push(t));
  const main = `${crumbs([["Início", "/"], ["Dicas de cozinha", "dicas-de-cozinha.html"]])}<article class="container prose article"><span class="eyebrow">PARA O DIA A DIA</span><h1>${TIPS.length} dicas de cozinha para o dia a dia</h1><p class="lead">Truques simples para economizar, organizar a rotina, cozinhar com mais segurança e acertar o ponto — reunidos em um só lugar.</p>${heroFigure("dicas-de-cozinha.html", { eager: true })}<div class="tip-day" id="tip-of-day"><span class="eyebrow">DICA DO DIA · <span data-tip-cat></span></span><p data-tip-text></p><button class="plain-button" data-tip-next>Outra dica →</button></div>${Object.entries(groups).map(([c, list]) => `<h2>${esc(c)}</h2><ul class="check-list">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`).join("")}${toolLinks(["ferramenta-validade-dos-alimentos.html", "ferramenta-substituicao-de-ingredientes.html", "ferramenta-timer-de-cozinha.html", "ferramenta-lista-de-compras.html"])}</article>${relatedRecipes(["receita-pao-caseiro.html", "receita-estrogonofe-de-carne.html", "receita-pao-de-queijo.html", "receita-bolo-de-cenoura.html"])}`;
  write("dicas-de-cozinha.html", page(head({ title: "Dicas de cozinha para o dia a dia: truques que funcionam", desc: `${TIPS.length} dicas de cozinha para economizar, organizar a rotina, acertar o ponto e cozinhar com segurança. Truques simples e testados para o dia a dia.`, file: "dicas-de-cozinha.html", image: absoluteImage("dicas-de-cozinha.html", BASE), scripts: [`assets/tips.js?v=${VERSION}`] }), main));
}
{
  const linkName = (f) => byFile[f]?.title || TOOLS.find((t) => t.file === f)?.name || ALL_ARTICLES.find((a) => a.file === f)?.h1 || (REGION_NAMES[f] ? "Receitas do " + REGION_NAMES[f] : f);
  const main = `${crumbs([["Início", "/"], ["Ideias de cardápio", "ideias-de-cardapio.html"]])}<section class="page-intro container"><span class="eyebrow">INSPIRAÇÃO PARA CADA OCASIÃO</span><h1>Ideias de cardápio para cada ocasião.</h1><p>Combinações prontas para o almoço de domingo, festas, dias corridos e viagens gastronômicas sem sair de casa.</p></section><section class="container">${heroFigure("ideias-de-cardapio.html")}</section><section class="container section idea-grid">${IDEAS.map((i) => `<div class="idea-card"><h2>${esc(i.title)}</h2><p>${esc(i.text)}</p><ul>${i.links.map((f) => `<li><a href="${f}">${esc(linkName(f))}</a></li>`).join("")}</ul></div>`).join("")}</section><section class="container section"><div class="tools-banner"><div><span class="eyebrow">PLANEJE A SEMANA</span><h2>Monte seu cardápio em 1 minuto.</h2><p>Escolha almoço e jantar e gere a lista de compras automaticamente.</p></div><a class="button button-light" href="ferramenta-cardapio-semanal.html">Abrir o cardápio semanal ↗</a></div></section>`;
  write("ideias-de-cardapio.html", page(head({ title: "Ideias de cardápio: almoço de domingo, festa, semana e mais", desc: "Ideias de cardápio prontas para almoço de domingo, aniversário, festa junina, jantar rápido, churrasco e semana organizada, com receitas e ferramentas.", file: "ideias-de-cardapio.html", image: absoluteImage("ideias-de-cardapio.html", BASE) }), main));
}
{
  const popular = FRESH.concat(["receita-feijoada.html", "receita-pao-de-queijo.html"].map((f) => byFile[f]));
  const main = `${crumbs([["Início", "/"], ["Receitas", "receitas.html"], ["Mais buscadas", "receitas-mais-buscadas.html"]])}<section class="page-intro container"><span class="eyebrow">O QUE O BRASIL QUER COZINHAR</span><h1>As receitas mais buscadas do Brasil.</h1><p>Bolos caseiros, docinhos de festa, clássicos de domingo e o que mais se faz na air fryer: reunimos as receitas que os brasileiros mais procuram, com passo a passo, dicas e tabela de porções.</p></section><section class="container section">${grid(popular)}</section><section class="container section prose"><h2>Por que essas receitas?</h2><p>Na retrospectiva de buscas do Google no Brasil em 2025, as receitas feitas na air fryer ocuparam boa parte do ranking — batata frita, pudim, bolo e pastel entre elas — ao lado de doces virais e caseiros. Bolo de milho, bolo de cenoura, brigadeiro e pão de queijo aparecem ano após ano entre os favoritos. Para acertar de primeira, use também a <a href="air-fryer-tempo-e-temperatura.html">tabela da air fryer</a> e o <a href="ferramenta-conversor-de-medidas.html">conversor de medidas</a>.</p></section>`;
  write("receitas-mais-buscadas.html", page(head({ title: "Receitas mais buscadas do Brasil: bolo, brigadeiro, pudim e mais", desc: "As receitas que os brasileiros mais procuram: bolo de cenoura, brigadeiro, pudim, bolo de milho, coxinha, lasanha, estrogonofe, pão caseiro e batata na air fryer.", file: "receitas-mais-buscadas.html", image: absoluteImage("receita-bolo-de-cenoura.html", BASE), extra: ld({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: popular.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: BASE + r.file })) }) }), main));
}
{
  const rows = Object.entries(IMAGES)
    .filter(([, im]) => im.type === "commons")
    .map(([k, im]) => `<tr><td><a href="${k}">${esc(byFile[k]?.title || ALL_ARTICLES.find((a) => a.file === k)?.h1 || k)}</a></td><td>${esc(im.author)}</td><td>${esc(im.license)}</td><td><a href="${commonsPage(im.file)}" rel="noopener" target="_blank">${esc(im.file)}</a></td></tr>`)
    .join("");
  const main = `<article class="container prose"><span class="eyebrow">TRANSPARÊNCIA</span><h1>Créditos das imagens</h1><p>As fotografias do Clube da Receita são imagens reais com licenças livres. As fotos abaixo vêm do Wikimedia Commons e são exibidas a partir do próprio Commons, com autoria e licença indicadas. As demais fotos são de bancos de imagens gratuitos (Unsplash e Pixabay), cujas licenças permitem uso sem atribuição obrigatória.</p><div class="table-wrap"><table class="data-table"><thead><tr><th>Conteúdo</th><th>Autor</th><th>Licença</th><th>Arquivo original</th></tr></thead><tbody>${rows}</tbody></table></div><p class="small">Imagens CC BY e CC BY-SA podem ser reutilizadas desde que se dê o crédito ao autor e se indique a licença. Se você é autor de alguma foto e deseja ajustar o crédito, <a href="contato.html">fale com a gente</a>.</p></article>`;
  write("creditos-das-imagens.html", page(head({ title: "Créditos das imagens", desc: "Autoria e licenças das fotografias usadas no Clube da Receita.", file: "creditos-das-imagens.html", image: BASE + "public/images/institucional/hero-home.webp" }), main));
}

/* ------------------------------------------------------------------ */
/* 7. Páginas de listagem existentes                                   */
/* ------------------------------------------------------------------ */
const CATEGORY_SELECT = `<label class="filter-label">Categoria<select id="category"><option value="">Todas</option><option value="doces">Doces e bolos</option><option value="salgados">Salgados e pratos</option><option value="brasileiras">Brasileiras</option><option value="internacionais">Internacionais</option><option value="rapidas">Até 45 minutos</option><option value="festa">Para festa</option><option value="air-fryer">Air fryer</option><option value="sem-gluten">Sem glúten</option></select></label>`;
function listingPage(file, list, { title, desc, intro } = {}) {
  let html = read(file);
  html = modernize(html, file, { desc });
  html = replaceGrid(html, list);
  html = html.replace(/<p id="result-count"[^>]*>[^<]*<\/p>/, `<p id="result-count" class="small muted" aria-live="polite">${list.length} receitas para explorar</p>`);
  if (!html.includes('id="category"')) html = html.replace(/(<label class="filter-label">Dificuldade<select id="difficulty">[\s\S]*?<\/select><\/label>)/, `$1${CATEGORY_SELECT}`);
  if (title) html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)} | Clube da Receita</title>`).replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  if (intro) html = html.replace(/(<section class="page-intro container">[\s\S]*?<h1>[\s\S]*?<\/h1>)<p>[\s\S]*?<\/p>/, `$1<p>${intro}</p>`);
  write(file, html);
}
listingPage("receitas.html", ALL, {
  title: "Receitas fáceis e testadas: brasileiras e do mundo",
  desc: `${ALL.length} receitas com passo a passo, fotos, ajuste de porções e modo cozinha: bolos, doces, pratos brasileiros, clássicos do mundo e receitas na air fryer.`,
  intro: `Encontre receitas por nome, ingrediente ou origem, filtre por categoria e veja as <a href="receitas-mais-buscadas.html">mais buscadas do Brasil</a>.`,
});
listingPage("favoritos.html", ALL);
listingPage("busca-geladeira.html", ALL);
const REGION = { "regiao-norte.html": "NORTE", "regiao-nordeste.html": "NORDESTE", "regiao-sul.html": "SUL", "regiao-sudeste.html": "SUDESTE", "regiao-centro-oeste.html": "CENTRO-OESTE" };
for (const [f, key] of Object.entries(REGION)) listingPage(f, ALL.filter((r) => r.region.startsWith(key)));
listingPage("receitas-internacionais.html", ALL.filter((r) => !isBrazil(r)));

/* ------------------------------------------------------------------ */
/* 8. Página inicial                                                   */
/* ------------------------------------------------------------------ */
for (const f of ["index.html"]) {
  let html = read(f);
  html = modernize(html, f, { desc: "Receitas brasileiras e do mundo com passo a passo e fotos, ferramentas de cozinha grátis (conversor de medidas, calculadora de churrasco, lista de compras) e dicas para o dia a dia." });
  html = html.replace(/(<span class="hero-note">[\s\S]*?<span>)\d+ receitas para explorar\./, `$1${ALL.length} receitas para explorar.`).replace(/\d+ receitas para explorar\.<br>/, `${ALL.length} receitas para explorar.<br>`);
  const featured = ["receita-bolo-de-cenoura.html", "receita-brigadeiro.html", "receita-pudim-de-leite-condensado.html", "receita-estrogonofe-de-carne.html", "receita-lasanha-a-bolonhesa.html", "receita-coxinha-de-frango.html", "receita-feijoada.html", "receita-pao-de-queijo.html"].map((x) => byFile[x]);
  html = replaceGrid(html, featured);
  html = html.replace(/<span class="eyebrow">PARA ABRIR O APETITE<\/span><h2>[^<]*<\/h2><\/div><a class="text-link" href="Receitas\.html">[^<]*<\/a>/, `<span class="eyebrow">PARA ABRIR O APETITE</span><h2>As mais buscadas do Brasil.</h2></div><a class="text-link" href="receitas-mais-buscadas.html">Ver todas as mais buscadas ↗</a>`);
  html = html.replace(/<!--home-extra-->[\s\S]*?<!--\/home-extra-->/g, "");
  const tipBox = `<!--home-extra--><section class="container"><div class="tip-day" id="tip-of-day"><span class="eyebrow">DICA DO DIA · <span data-tip-cat></span></span><p data-tip-text></p><div class="tip-actions"><button class="plain-button" data-tip-next>Outra dica →</button><a class="text-link" href="dicas-de-cozinha.html">Todas as ${TIPS.length} dicas ↗</a></div></div></section><!--/home-extra-->`;
  html = html.replace('<section id="regioes"', tipBox + '<section id="regioes"');
  const toolsSection = `<section class="container section tools-home"><div class="section-heading"><div><span class="eyebrow">MENOS CONTAS. MAIS COZINHA.</span><h2>Ferramentas grátis para a cozinha.</h2></div><a class="text-link" href="ferramentas.html">Todas as ${TOOLS.length} ferramentas ↗</a></div><div class="tool-grid">${["ferramenta-conversor-de-medidas.html", "ferramenta-calculadora-de-churrasco.html", "ferramenta-calculadora-de-festa.html", "ferramenta-lista-de-compras.html", "ferramenta-timer-de-cozinha.html", "ferramenta-o-que-cozinhar-hoje.html"].map((x) => toolCard(TOOLS.find((t) => t.file === x))).join("")}</div></section>`;
  html = html.replace(/<section class="container (?:tools-banner|section tools-home)">[\s\S]*?<\/section>(?=<section class="container section"><div class="section-heading"><div><span class="eyebrow">ALÉM DA RECEITA)/, toolsSection);
  const stories = ["air-fryer-tempo-e-temperatura.html", "quanto-tempo-dura-na-geladeira.html", "quanto-de-carne-por-pessoa-churrasco.html", "tabela-de-medidas-caseiras.html", "blog-guia-temperos.html", "blog-diferenca-norte-nordeste.html"].map((x) => ALL_ARTICLES.find((a) => a.file === x));
  html = html.replace(/<div class="story-grid[^"]*">[\s\S]*?<\/div><\/section><\/main>/, `<div class="story-grid story-grid-3">${stories.map(storyCard).join("")}</div></section></main>`);
  html = html.replace(/<span class="eyebrow">ALÉM DA RECEITA<\/span><h2>[^<]*<\/h2>/, `<span class="eyebrow">ALÉM DA RECEITA</span><h2>Guias para cozinhar melhor.</h2>`);
  if (!html.includes("assets/tips.js")) html = html.replace(`<script defer src="assets/site.js?v=${VERSION}"></script>`, `<script defer src="assets/tips.js?v=${VERSION}"></script><script defer src="assets/site.js?v=${VERSION}"></script>`);
  if (f === "index.html") {
    html = html.replace(/<script type="application\/ld\+json" data-home>[\s\S]*?<\/script>/g, "");
    html = html.replace("</head>", `<script type="application/ld+json" data-home>${json([{ "@context": "https://schema.org", "@type": "WebSite", name: "Clube da Receita", url: BASE, inLanguage: "pt-BR", potentialAction: { "@type": "SearchAction", target: BASE + "receitas.html?q={search_term_string}", "query-input": "required name=search_term_string" } }, { "@context": "https://schema.org", "@type": "Organization", name: "Clube da Receita", url: BASE, logo: BASE + "assets/favicon.svg", email: "contato@clubedareceita.com.br" }])}</script></head>`);
  }
  write(f, html);
}

/* ------------------------------------------------------------------ */
/* 9. Demais páginas institucionais                                    */
/* ------------------------------------------------------------------ */
for (const f of ["sobre.html", "contato.html", "politica-de-privacidade.html", "termos-de-uso.html", "404.html"]) write(f, modernize(read(f), f));

/* ------------------------------------------------------------------ */
/* 10. Sitemap e robots                                                */
/* ------------------------------------------------------------------ */
require("./build-sitemap.cjs");

console.log(`OK: ${ALL.length} receitas, ${ALL_ARTICLES.length} artigos, ${TOOLS.length} ferramentas. Base: ${BASE}`);
