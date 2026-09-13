const fs = require("fs"),
  path = require("path");
const root = path.resolve(__dirname, "..");
const base = (
  process.argv[2] || "https://a3-media-group.github.io/Clube-da-Receita/"
).replace(/\/?$/, "/");
const url = new URL(base);
if (!["https:", "http:"].includes(url.protocol))
  throw Error("Informe uma URL http(s)");
const oldBase = fs.existsSync(path.join(root, "site-config.json"))
  ? JSON.parse(fs.readFileSync(path.join(root, "site-config.json"), "utf8")).url
  : null;
const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
const excluded = [
  "Home.dc.html",
  "404.html",
  "Favoritos.html",
  "Busca-Geladeira.dc.html",
];
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
for (const f of files) {
  let html = fs.readFileSync(path.join(root, f), "utf8");
  if (oldBase) html = html.split(oldBase).join(base);
  html = html
    .replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/g, "")
    .replace(/<meta\b(?=[^>]*\bproperty="og:(url|image)")[^>]*>/g, "");
  const page = base + (f === "index.html" || f === "Home.dc.html" ? "" : f);
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${esc(page)}"><meta property="og:url" content="${esc(page)}"><meta property="og:image" content="${esc(base + "assets/photos/hero.webp")}"></head>`,
  );
  if (f === "Favoritos.html" && !html.includes("noindex"))
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex,follow"></head>',
    );
  fs.writeFileSync(path.join(root, f), html);
}
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    files
      .filter((f) => !excluded.includes(f))
      .map(
        (f) =>
          `  <url><loc>${esc(base + (f === "index.html" ? "" : f))}</loc></url>`,
      )
      .join("\n") +
    "\n</urlset>\n",
);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`,
);
fs.writeFileSync(
  path.join(root, "site-config.json"),
  JSON.stringify(
    { url: base, email: "contato@clubedareceita.com.br" },
    null,
    2,
  ),
);
console.log("SEO configurado para " + base);
