// Dicas de cozinha para o dia a dia (também alimentam a "Dica do dia" da home)
// e ideias de cardápio.
const TIPS = [
  ["Economia", "Congele o pão que vai sobrar ainda fresco, já fatiado: é só levar à torradeira direto do freezer."],
  ["Economia", "Talos de brócolis, couve e salsinha viram refogados, sopas e farofas — não jogue fora."],
  ["Economia", "Cascas de cebola, cenoura e aparas de legumes rendem um caldo caseiro: ferva por 40 minutos e coe."],
  ["Economia", "Banana muito madura? Descasque, congele e use em vitaminas, bolos e sorvete de banana."],
  ["Economia", "Compare o preço por quilo na etiqueta da gôndola, não o preço da embalagem."],
  ["Economia", "Arroz que sobrou vira bolinho, arroz de forno ou arroz frito com legumes e ovo."],
  ["Organização", "Separe todos os ingredientes antes de ligar o fogo (o “mise en place”): cozinhar fica mais rápido e sem esquecimentos."],
  ["Organização", "Na geladeira, o que vence primeiro vai para a frente. Etiquete potes com nome e data."],
  ["Organização", "Cozinhe feijão uma vez por semana e congele em porções para a semana toda."],
  ["Organização", "Deixe alho descascado e picado em um pote com azeite na geladeira por até 1 semana."],
  ["Organização", "Lave a louça enquanto a comida cozinha: no fim, sobra só a panela."],
  ["Técnica", "Frigideira bem quente antes da carne: é o que forma a crosta dourada. Não mexa no primeiro minuto."],
  ["Técnica", "Sal na água do macarrão só depois que ferver, na proporção de 10 g por litro."],
  ["Técnica", "Guarde uma xícara da água do macarrão: o amido ajuda a deixar o molho cremoso."],
  ["Técnica", "Deixe a carne descansar 5 minutos depois de assar ou grelhar para os sucos se redistribuírem."],
  ["Técnica", "Para cebola dourar e não queimar, comece com fogo médio e uma pitada de sal."],
  ["Técnica", "Bolo: ingredientes em temperatura ambiente se misturam melhor e o bolo cresce mais."],
  ["Técnica", "Não abra o forno nos primeiros 25 minutos de um bolo: a queda de temperatura faz ele solar."],
  ["Técnica", "Faca afiada é mais segura que faca cega: escorrega menos e exige menos força."],
  ["Técnica", "Tempere a salada só na hora de servir para as folhas não murcharem."],
  ["Truque", "Para descascar alho rápido, amasse levemente o dente com a lateral da faca."],
  ["Truque", "Limão rende mais suco se for rolado na bancada ou aquecido 10 segundos no micro-ondas."],
  ["Truque", "Ovo fresco afunda na água; ovo velho boia. Ovos que boiam devem ser descartados."],
  ["Truque", "Molho salgado demais? Acrescente batata em pedaços, um pouco de creme de leite ou mais tomate."],
  ["Truque", "Arroz queimou no fundo? Não raspe: transfira a parte de cima para outra panela."],
  ["Truque", "Feijão sem tempo de molho? Ferva 2 minutos, desligue e deixe tampado por 1 hora."],
  ["Truque", "Para cortar cebola sem chorar, deixe-a 10 minutos na geladeira antes."],
  ["Truque", "Pão amanhecido volta a ficar crocante com um borrifo de água e 3 minutos na air fryer ou no forno."],
  ["Segurança", "Use tábuas diferentes para carnes cruas e para alimentos prontos (saladas, pães)."],
  ["Segurança", "Não descongele carne sobre a pia: use a geladeira, água fria ou o micro-ondas."],
  ["Segurança", "Comida pronta não deve ficar mais de 2 horas fora da geladeira."],
  ["Segurança", "Frango deve atingir 74 °C no centro; use termômetro de cozinha."],
  ["Segurança", "Panela de pressão: nunca encha acima de 2/3 e limpe a válvula regularmente."],
  ["Segurança", "Óleo pegou fogo? Desligue o fogo e abafe com uma tampa. Nunca jogue água."],
  ["Saúde", "Troque metade do sal por ervas frescas, limão, alho e especiarias."],
  ["Saúde", "Monte o prato com metade de legumes e verduras, um quarto de proteína e um quarto de carboidrato."],
  ["Saúde", "Asse legumes com um fio de azeite a 200 °C: ficam doces e crocantes, sem fritura."],
  ["Saúde", "Prefira água, chás e sucos naturais às bebidas açucaradas nas refeições."],
  ["Saúde", "Grão-de-bico, lentilha e feijão são proteínas baratas e ricas em fibras."],
  ["Saúde", "Cozinhar em casa, com alimentos in natura, é a principal recomendação do Guia Alimentar para a População Brasileira."],
];

const IDEAS = [
  {
    title: "Almoço de domingo em família",
    text: "Feijoada ou lasanha como prato principal, salada verde com laranja e pudim de sobremesa.",
    links: ["Receita-Feijoada.dc.html", "receita-lasanha-a-bolonhesa.html", "receita-pudim-de-leite-condensado.html"],
  },
  {
    title: "Festa de aniversário em casa",
    text: "Coxinhas, brigadeiros e bolo de chocolate. Calcule as quantidades antes de comprar.",
    links: ["receita-coxinha-de-frango.html", "receita-brigadeiro.html", "receita-bolo-de-chocolate.html", "ferramenta-calculadora-de-festa.html"],
  },
  {
    title: "Arraiá e festa junina",
    text: "Bolo de milho, pão de queijo e baião de dois para quem quer algo salgado e bem brasileiro.",
    links: ["receita-bolo-de-milho.html", "Receita-PaoDeQueijo.dc.html", "Receita-BaiaoDeDois.dc.html"],
  },
  {
    title: "Jantar rápido de semana (até 30 minutos)",
    text: "Carbonara, pad thai ou estrogonofe com arroz já pronto da marmita.",
    links: ["Receita-Carbonara.dc.html", "Receita-PadThai.dc.html", "receita-estrogonofe-de-carne.html"],
  },
  {
    title: "Café da tarde com cheirinho de casa",
    text: "Bolo de cenoura com cobertura, pão caseiro quentinho e pão de queijo.",
    links: ["receita-bolo-de-cenoura.html", "receita-pao-caseiro.html", "Receita-PaoDeQueijo.dc.html"],
  },
  {
    title: "Noite de volta ao mundo",
    text: "Monte um menu temático: ceviche de entrada, tacos al pastor e crêpes Suzette.",
    links: ["Receita-CevicheClassico.dc.html", "Receita-TacosAlPastor.dc.html", "Receita-CrepesSuzette.dc.html"],
  },
  {
    title: "Churrasco com os amigos",
    text: "Calcule carne, carvão e bebidas, sirva pão de alho e finalize com pudim gelado.",
    links: ["ferramenta-calculadora-de-churrasco.html", "quanto-de-carne-por-pessoa-churrasco.html", "receita-pudim-de-leite-condensado.html"],
  },
  {
    title: "Sabores do Norte",
    text: "Tacacá no fim de tarde e pato no tucupi para uma ocasião especial.",
    links: ["Receita-Tacaca.dc.html", "Receita-PatoNoTucupi.dc.html", "Regiao-Norte.dc.html"],
  },
  {
    title: "Air fryer na rotina",
    text: "Batata frita crocante, coxinha assada e pão de queijo sem óleo extra.",
    links: ["receita-batata-frita-na-air-fryer.html", "air-fryer-tempo-e-temperatura.html", "ferramenta-conversor-air-fryer-forno.html"],
  },
  {
    title: "Semana organizada",
    text: "Planeje 5 marmitas, gere a lista de compras e congele o que sobrar.",
    links: ["marmitas-da-semana.html", "ferramenta-cardapio-semanal.html", "como-congelar-alimentos.html"],
  },
];

module.exports = { TIPS, IDEAS };
