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
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
for (const f of files) {
  let html = fs.readFileSync(path.join(root, f), "utf8");
  if (oldBase) html = html.split(oldBase).join(base);
  html = html
    .replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/g, "")
    .replace(/<meta\b(?=[^>]*\bproperty="og:(url|image)")[^>]*>/g, "");
  const page = base + (f === "index.html" ? "" : f);
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${esc(page)}"><meta property="og:url" content="${esc(page)}"><meta property="og:image" content="${esc(base + "assets/photos/hero.webp")}"></head>`,
  );
  if (f === "favoritos.html" && !html.includes("noindex"))
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex,follow"></head>',
    );
  fs.writeFileSync(path.join(root, f), html);
}
fs.writeFileSync(
  path.join(root, "site-config.json"),
  JSON.stringify(
    { url: base, email: "contato@clubedareceita.com.br" },
    null,
    2,
  ),
);
// sitemap.xml e robots.txt são gerados a partir do novo endereço.
require("./build-sitemap.cjs");
console.log("SEO configurado para " + base);
