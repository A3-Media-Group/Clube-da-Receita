// Mapa central de imagens do site.
// - "local": arquivo WebP otimizado dentro do repositório (versão grande + "-small").
// - "commons": foto real do Wikimedia Commons, servida pelo próprio Commons
//   (Special:FilePath gera a miniatura no tamanho pedido). Licenças livres;
//   o crédito aparece junto da foto e na página creditos-das-imagens.html.
// Cada imagem é usada por UM único conteúdo (receita ou artigo): não há repetição.

const commons = (file, author, license, alt) => ({
  type: "commons",
  file,
  author,
  license,
  alt,
});
const local = (path, alt, credit) => ({ type: "local", path, alt, credit });

const IMAGES = {
  // ---------- Receitas: fotos locais conferidas visualmente ----------
  "Receita-ArrozComPequi.dc.html": local("public/images/receitas/arroz-com-pequi", "Arroz amarelo com pequi em tigela de madeira", "Pixabay"),
  "Receita-ButterChicken.dc.html": local("public/images/receitas/butter-chicken", "Butter chicken servido em tigelas de metal", "Pixabay"),
  "Receita-CevicheClassico.dc.html": local("public/images/receitas/ceviche-classico", "Ceviche de peixe branco com cebola e coentro", "Pixabay"),
  "Receita-CheesecakeNY.dc.html": local("public/images/receitas/cheesecake-nova-york", "Fatia de cheesecake de Nova York", "Pixabay"),
  "Receita-CoqAuVin.dc.html": local("public/images/receitas/coq-au-vin", "Coq au vin com legumes em panela escura", "Pixabay"),
  "Receita-CrepesSuzette.dc.html": local("public/images/receitas/crepes-suzette", "Crêpes Suzette com calda de laranja", "Pixabay"),
  "Receita-PadThai.dc.html": local("public/images/receitas/pad-thai", "Pad thai com broto de feijão e ervas", "Pixabay"),
  "Receita-PaellaValenciana.dc.html": local("public/images/receitas/paella-valenciana", "Paella valenciana na panela tradicional", "Pixabay"),
  "Receita-PaoDeQueijo.dc.html": local("public/images/receitas/pao-de-queijo", "Pães de queijo em tigela ao lado de xícara de café", "Pixabay"),
  "Receita-RamenShoyu.dc.html": local("public/images/receitas/ramen-shoyu", "Tigela de ramen shoyu com chashu e ovo", "Pixabay"),
  "Receita-TacosAlPastor.dc.html": local("public/images/receitas/tacos-al-pastor", "Tacos al pastor servidos no prato", "Pixabay"),

  // ---------- Receitas: fotos substituídas (as anteriores não mostravam o prato) ----------
  "Receita-Acaraje.dc.html": commons("Acaraje-Baiana.jpg", "Acarajé da Baiana Cláudia", "Domínio público", "Acarajé recheado com vatapá e camarão seco"),
  "Receita-BaiaoDeDois.dc.html": commons("Baião de dois.jpg", "Wikimedia Commons", "Licença livre (ver página do arquivo)", "Prato de baião de dois com queijo coalho"),
  "Receita-Barreado.dc.html": commons("Barreado.jpg", "Kevin Klop", "CC BY-SA 3.0", "Barreado servido em Morretes, Paraná, com farinha e banana"),
  "Receita-Feijoada.dc.html": commons("Feijoada completa.jpg", "Andre S. Ribeiro", "CC BY 2.0", "Feijoada completa com arroz, couve, farofa e laranja"),
  "Receita-PatoNoTucupi.dc.html": commons("Pato no Tucupi (2113297642).jpg", "marcusrg", "CC BY 2.0", "Pato no tucupi com jambu, em Belém do Pará"),
  "Receita-PizzaMargherita.dc.html": commons("Margherita Originale.JPG", "Mario56", "CC BY-SA 3.0", "Pizza margherita com tomate, mussarela e manjericão"),
  "Receita-Tacaca.dc.html": commons("Tacaca.jpg", "Felipe Baenninger", "CC BY-SA 4.0", "Tacacá servido na cuia com jambu e camarão"),
  "Receita-TagineCordeiro.dc.html": commons("Tajine d'Agneau.JPG", "Wikimedia Commons", "Licença livre (ver página do arquivo)", "Tagine de cordeiro marroquino"),
  "Receita-Carbonara.dc.html": commons("Spaghetti alla carbonara (32998643591).jpg", "Luca Nebuloni", "CC BY 2.0", "Espaguete à carbonara com guanciale e pecorino"),

  // ---------- Receitas novas ----------
  "receita-bolo-de-cenoura.html": commons("Bolo de cenoura com cobertura de chocolate vegano.jpg", "Lucasrb", "Licença livre (ver página do arquivo)", "Bolo de cenoura com cobertura de chocolate"),
  "receita-brigadeiro.html": commons("Brigadeiro brasileiro.jpg", "KamillaRagassi", "CC BY-SA 4.0", "Brigadeiros enrolados no granulado"),
  "receita-pudim-de-leite-condensado.html": commons("Pudim de Leite.jpg", "Josef Schober", "CC BY 3.0", "Pudim de leite condensado com calda de caramelo"),
  "receita-bolo-de-milho.html": commons("Bolo de milho caseiro.jpg", "Wikimedia Commons", "CC BY-SA 4.0", "Fatia de bolo de milho caseiro"),
  "receita-batata-frita-na-air-fryer.html": commons("Frites.JPG", "Wikimedia Commons", "CC BY-SA 3.0", "Batatas fritas douradas e crocantes"),
  "receita-estrogonofe-de-carne.html": commons("Estrogonofe de carne, arroz, batata palha, batata assada, vinagrete.jpg", "Wikimedia Commons", "Licença livre (ver página do arquivo)", "Estrogonofe de carne com arroz e batata palha"),
  "receita-pao-caseiro.html": commons("Homemade bread and flour on a small cutting board.jpg", "TudorTulok", "CC BY-SA 4.0", "Pão caseiro sobre tábua com farinha"),
  "receita-lasanha-a-bolonhesa.html": commons("Lasagna bolognese.jpg", "Sambawamba", "CC BY-SA 4.0", "Lasanha à bolonhesa gratinada"),
  "receita-coxinha-de-frango.html": commons("Coxinha.jpg", "Tom B", "Domínio público", "Coxinhas de frango douradas"),
  "receita-bolo-de-chocolate.html": commons("Chocolate cake.jpg", "Wikimedia Commons", "CC BY 2.0", "Bolo de chocolate com cobertura"),

  // ---------- Artigos do caderno (um por artigo) ----------
  "Blog-GuiaTemperos.dc.html": local("assets/photos/spices", "Colheres com especiarias e ervas frescas", "Unsplash"),
  "Blog-DiferencaNorteNordeste.dc.html": commons("Interior do mercado ver-o-peso em Belém.jpg", "Cayambe", "CC BY-SA 3.0", "Interior do mercado Ver-o-Peso, em Belém do Pará"),
  "air-fryer-tempo-e-temperatura.html": commons("Air Fryer 5458.jpg", "Ashley Pomeroy", "CC BY 4.0", "Air fryer sobre a bancada da cozinha"),
  "quanto-tempo-dura-na-geladeira.html": commons("Open refrigerator with food at night.jpg", "Wikimedia Commons", "CC BY-SA 4.0", "Geladeira aberta com alimentos organizados"),
  "como-congelar-alimentos.html": commons("FrozenBerries.JPG", "Wikimedia Commons", "Licença livre (ver página do arquivo)", "Frutas vermelhas congeladas"),
  "quanto-de-carne-por-pessoa-churrasco.html": local("assets/photos/hero", "Espetos de churrasco com molhos e acompanhamentos", "Unsplash"),
  "como-fazer-arroz-e-feijao.html": local("public/images/receitas/baiao-de-dois", "Tigelas de arroz branco e feijão cozido", "Pixabay"),
  "substituicoes-na-cozinha.html": commons("Ingredients for a lemon cake.jpg", "Wikimedia Commons", "CC BY-SA 4.0", "Ovos, farinha, manteiga e limões sobre a bancada"),
  "tabela-de-medidas-caseiras.html": commons("Measuring cups (¼, ½, 1 cup).jpg", "Wikimedia Commons", "CC BY-SA 4.0", "Xícaras medidoras de 1/4, 1/2 e 1 xícara"),
  "marmitas-da-semana.html": local("assets/photos/table", "Prato com arroz, legumes e grãos pronto para a marmita", "Unsplash"),
  "quanto-tempo-cozinhar-ovo.html": commons("Boiled eggs, increasing in boiling time from left to right.jpg", "Wikimedia Commons", "CC BY-SA 3.0", "Ovos cozidos com tempos crescentes, da gema mole à dura"),
  "frutas-e-legumes-da-estacao.html": commons("Barraca de frutas.jpg", "Lopmed", "Licença livre (ver página do arquivo)", "Barraca de frutas na beira da estrada no Pará"),

  // ---------- Páginas especiais ----------
  "dicas-de-cozinha.html": local("public/images/receitas/acaraje", "Bolinhos dourados em prato esmaltado com cebolinha e alho", "Pixabay"),
  "ideias-de-cardapio.html": local("assets/photos/salad", "Tigela colorida com salada, grão-de-bico e abacate", "Unsplash"),
};

const FILEPATH = "https://commons.wikimedia.org/wiki/Special:FilePath/";
function commonsUrl(file, width) {
  return FILEPATH + encodeURIComponent(file.replace(/ /g, "_")) + "?width=" + width;
}
function commonsPage(file) {
  return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file.replace(/ /g, "_"));
}
// src/srcset para <img>
function imgAttrs(key, kind = "card") {
  const im = IMAGES[key];
  if (!im) return null;
  if (im.type === "local")
    return {
      src: kind === "card" ? im.path + "-small.webp" : im.path + ".webp",
      srcset: `${im.path}-small.webp 640w, ${im.path}.webp 1280w`,
      alt: im.alt,
    };
  return {
    src: commonsUrl(im.file, kind === "card" ? 500 : 960),
    srcset: `${commonsUrl(im.file, 500)} 500w, ${commonsUrl(im.file, 960)} 960w, ${commonsUrl(im.file, 1280)} 1280w`,
    alt: im.alt,
  };
}
function absoluteImage(key, base) {
  const im = IMAGES[key];
  if (!im) return base + "assets/photos/hero.webp";
  return im.type === "local" ? base + im.path + ".webp" : commonsUrl(im.file, 1280);
}
function creditHTML(key) {
  const im = IMAGES[key];
  if (!im) return "";
  if (im.type === "local") return `Foto: ${im.credit} (licença livre)`;
  return `Foto: ${im.author} · <a href="${commonsPage(im.file)}" rel="noopener" target="_blank">Wikimedia Commons</a> · ${im.license}`;
}

module.exports = { IMAGES, imgAttrs, absoluteImage, creditHTML, commonsPage };
