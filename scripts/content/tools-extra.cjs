// Conteúdo estático de cada página de ferramenta: introdução, passo a passo, exemplos,
// perguntas frequentes e receitas relacionadas. Os números dos exemplos saem das mesmas
// fórmulas e tabelas de assets/tools.js: ao mudar uma regra lá, revise o exemplo aqui.
// "recipes" também define em quais receitas a ferramenta aparece como "ferramenta relacionada".
module.exports = {
  "ferramenta-conversor-de-medidas.html": {
    intro: "Receitas brasileiras costumam usar xícaras e colheres; receitas profissionais e estrangeiras, gramas. O conversor faz a ponte entre os dois mundos considerando a densidade de cada ingrediente, porque uma xícara de farinha e uma xícara de açúcar ocupam o mesmo volume, mas não pesam o mesmo.",
    howto: [
      "Digite a quantidade. Frações como 1/2, 1 1/2 ou ¾ são aceitas.",
      "Escolha a unidade de origem (xícara, copo americano, colher, ml, litro, gramas ou quilos) e a unidade de destino.",
      "Selecione o ingrediente: são 30 opções, de farinha de trigo a gotas de chocolate.",
      "Leia o resultado e, logo abaixo, a tabela completa daquele ingrediente em xícara, frações de xícara, copo americano e colheres.",
    ],
    examples: `<ul class="prose-list">
<li><strong>1 xícara de farinha de trigo</strong> ≈ 120 g. Já 1 xícara de açúcar refinado ≈ 200 g.</li>
<li><strong>100 g de farinha de trigo</strong> ≈ 0,83 xícara (pouco mais de ¾).</li>
<li><strong>1 colher de sopa de manteiga</strong> ≈ 14,2 g; um tablete de 200 g dá cerca de 14 colheres de sopa.</li>
<li><strong>1 lata de leite condensado (395 g)</strong> ≈ 304 ml.</li>
<li><strong>1 copo americano de polvilho</strong> ≈ 119 g, útil para o <a href="receita-pao-de-queijo.html">pão de queijo mineiro</a>.</li>
</ul>`,
    faqs: [
      ["Quanto mede a xícara usada no conversor?", "A xícara padrão de 240 ml. O copo americano tem 190 ml, a colher de sopa 15 ml, a colher de sobremesa 10 ml, a colher de chá 5 ml e a colher de café 2,5 ml."],
      ["Por que 1 xícara de farinha não pesa 240 g?", "Porque 240 ml é volume, não peso. A farinha de trigo tem cerca de 0,5 g por ml, então a xícara pesa por volta de 120 g. Líquidos como água ficam perto de 1 g por ml."],
      ["Os valores valem para a xícara cheia e apertada?", "Não. Os valores consideram o ingrediente nivelado, sem compactar. Apertar a farinha na xícara pode aumentar o peso em até 30%, por isso a balança é mais precisa em bolos e pães."],
      ["Posso converter gramas para colheres?", "Sim. Escolha gramas como unidade de origem e a colher como destino. O cálculo usa a densidade do ingrediente selecionado."],
    ],
    recipes: ["receita-bolo-de-cenoura.html", "receita-bolo-de-chocolate.html", "receita-bolo-de-milho.html", "receita-pao-caseiro.html", "receita-pao-de-queijo.html", "receita-cheesecake-nova-york.html"],
  },
  "ferramenta-calculadora-de-churrasco.html": {
    intro: "Comprar carne de menos estraga a festa; comprar demais pesa no bolso. A calculadora parte de uma média por adulto e por criança, ajusta pela duração e pelo estilo do churrasco e monta a lista completa: carnes, acompanhamentos, bebidas, carvão e gelo.",
    howto: [
      "Informe o número de adultos, de crianças e de pessoas que bebem álcool.",
      "Escolha a duração (até 3 horas, 3 a 5 horas ou mais de 5 horas) e o estilo: econômico, tradicional ou premium.",
      "Confira o total de carnes, já com 10% de margem, e a divisão por corte.",
      "Envie tudo para a lista de compras, imprima ou compartilhe pelo WhatsApp.",
    ],
    examples: `<p><strong>10 adultos e 2 crianças, 6 bebem álcool, 3 a 5 horas, estilo tradicional:</strong> 5,4 kg de carnes no total — 1,6 kg de picanha ou maminha, 1,1 kg de fraldinha, 1,4 kg de linguiça toscana e 1,4 kg de frango. Acompanham 17 pães de alho, 10 espetos de queijo coalho, 8 litros de cerveja (cerca de 22 latas), 7 litros de refrigerante e suco, 6 litros de água, 6 kg de carvão e pelo menos 4 kg de gelo.</p>
<p><strong>20 adultos e 5 crianças, mais de 5 horas, estilo premium:</strong> 13,9 kg de carnes — 4,9 kg de picanha, 3,5 kg de ancho, 2,1 kg de cupim ou costela, 2,1 kg de linguiça artesanal e 1,4 kg de coração de frango — e 14 kg de carvão (3 sacos de 5 kg).</p>`,
    faqs: [
      ["Quanto de carne por pessoa a calculadora considera?", "450 g por adulto e 225 g por criança em um churrasco de 3 a 5 horas. Para até 3 horas o total cai 15%; acima de 5 horas, sobe 25%. Depois somamos 10% de margem de segurança."],
      ["O que muda entre os estilos econômico, tradicional e premium?", "A divisão dos cortes. O econômico usa mais linguiça, frango, fraldinha ou acém e costela suína; o tradicional combina picanha ou maminha, fraldinha, linguiça e frango; o premium inclui picanha, ancho, cupim ou costela bovina, linguiça artesanal e coração de frango."],
      ["Como é calculada a cerveja?", "1,3 litro por pessoa que bebe álcool, ajustado pela duração. A quantidade de latas considera latas de 350 ml."],
      ["Quanto carvão comprar?", "Cerca de 1 kg de carvão por quilo de carne, arredondado para cima, com a sugestão de sacos de 5 kg."],
    ],
    recipes: ["receita-tacos-al-pastor.html", "receita-batata-frita-na-air-fryer.html", "receita-pao-de-queijo.html", "receita-baiao-de-dois.html"],
  },
  "ferramenta-calculadora-de-festa.html": {
    intro: "Aniversário, chá de bebê, festa junina ou confraternização: a calculadora estima salgados, docinhos, bolo, bebidas, copos e guardanapos a partir do número de convidados, da duração da festa e de haver ou não uma refeição.",
    howto: [
      "Informe quantos adultos e quantas crianças vão à festa.",
      "Escolha a duração e diga se haverá almoço ou jantar — com refeição, a quantidade de salgados cai pela metade.",
      "Veja o total de salgados (com sugestão de divisão por tipo), docinhos, quilos de bolo e litros de bebida.",
      "Envie os itens para a lista de compras com um clique.",
    ],
    examples: `<p><strong>30 adultos e 15 crianças, 3 a 4 horas, sem refeição:</strong> 510 salgados (cerca de 6 centos: 153 coxinhas, 153 risoles ou bolinhas de queijo, 102 esfihas ou empadinhas e 102 quibes ou enroladinhos), 240 docinhos, 4,8 kg de bolo, 26 litros de refrigerante e suco, 14 litros de água, 135 copos e 225 guardanapos.</p>
<p><strong>20 adultos, sem crianças, com jantar:</strong> 120 salgados, 100 docinhos, 2,4 kg de bolo, 12 litros de refrigerante e suco e 6 litros de água.</p>`,
    faqs: [
      ["Quantos salgados por pessoa?", "Sem refeição, 13 por adulto e 8 por criança em uma festa de 3 a 4 horas. Com almoço ou jantar, 6 por adulto e 4 por criança."],
      ["Quantos docinhos e quanto de bolo?", "5 docinhos por adulto e 6 por criança; 120 g de bolo por adulto e 80 g por criança."],
      ["A duração da festa muda o cálculo?", "Sim. Salgados, docinhos e bebidas diminuem 20% em festas de até 3 horas e aumentam 20% nas de mais de 4 horas. O bolo não muda."],
      ["Quanta bebida comprar?", "600 ml de refrigerante e suco por adulto, 500 ml por criança e mais 300 ml de água por pessoa, ajustados pela duração."],
    ],
    recipes: ["receita-coxinha-de-frango.html", "receita-brigadeiro.html", "receita-bolo-de-chocolate.html", "receita-pudim-de-leite-condensado.html", "receita-bolo-de-milho.html", "receita-pao-de-queijo.html"],
  },
  "ferramenta-substituicao-de-ingredientes.html": {
    intro: "Faltou um ingrediente no meio da receita? A ferramenta reúne mais de 40 trocas testadas na cozinha do dia a dia — ovo, leite, manteiga, fermento, creme de leite, açúcar e outros — com a proporção certa e o tipo de preparo em que cada uma funciona.",
    howto: [
      "Digite o ingrediente que faltou ou toque em um dos atalhos (ovo, leite, manteiga, fermento…).",
      "Compare as opções: cada linha traz a troca, a proporção e as receitas em que ela dá certo.",
      "Escolha a substituição que cumpre a mesma função do original na sua receita.",
    ],
    examples: `<ul class="prose-list">
<li><strong>Sem ovo para o bolo:</strong> 1 colher (sopa) de linhaça moída + 3 colheres (sopa) de água, descansando 10 minutos, substitui 1 ovo.</li>
<li><strong>Sem guanciale para a <a href="receita-carbonara.html">carbonara</a>:</strong> use bacon ou pancetta.</li>
<li><strong>Sem fermento químico:</strong> para 1 colher (chá), use ¼ de colher (chá) de bicarbonato + ½ colher (chá) de limão ou vinagre.</li>
<li><strong>Sem creme de leite no <a href="receita-estrogonofe-de-carne.html">estrogonofe</a>:</strong> ¾ de xícara de leite + ¼ de xícara de manteiga derretida.</li>
</ul>`,
    faqs: [
      ["Como saber se uma substituição vai funcionar?", "Pense na função do ingrediente: estrutura (ovo, farinha), gordura (manteiga, óleo), umidade (leite, iogurte), crescimento (fermentos) ou sabor (vinho, limão). Uma troca que cumpre a mesma função costuma dar certo."],
      ["Posso trocar manteiga por óleo no bolo?", "Sim, usando ¾ da quantidade de manteiga em óleo vegetal. O contrário também funciona: 1¼ da quantidade de óleo em manteiga derretida."],
      ["Fermento biológico seco e fresco são equivalentes?", "Não na mesma quantidade: 10 g de fermento biológico seco equivalem a cerca de 30 g de fermento biológico fresco."],
      ["Dá para trocar polvilho azedo por doce no pão de queijo?", "Dá, mas o pão de queijo cresce menos e fica com textura mais densa."],
    ],
    recipes: ["receita-carbonara.html", "receita-estrogonofe-de-carne.html", "receita-pao-de-queijo.html", "receita-acaraje.html", "receita-bolo-de-chocolate.html"],
  },
  "ferramenta-conversor-air-fryer-forno.html": {
    intro: "A air fryer é um forno pequeno com ventilação forte: assa mais rápido e com menos calor. O conversor adapta tempo e temperatura de receitas de forno para a air fryer (e o caminho inverso) e traduz temperaturas em Fahrenheit e marcas de gás de receitas estrangeiras.",
    howto: [
      "Informe a temperatura e o tempo da receita original.",
      "Escolha o sentido: forno → air fryer ou air fryer → forno.",
      "Use o resultado como ponto de partida e confira o ponto alguns minutos antes do fim.",
      "Para receitas estrangeiras, digite a temperatura em °C ou °F e veja a equivalência e a marca de gás.",
    ],
    examples: `<ul class="prose-list">
<li><strong>Forno a 200 °C por 40 min</strong> → air fryer a 180 °C por cerca de 32 min (confira a partir de 27 min).</li>
<li><strong>Forno a 180 °C por 30 min</strong> → air fryer a 160 °C por cerca de 24 min.</li>
<li><strong>Air fryer a 180 °C por 15 min</strong> → forno preaquecido a 200 °C por cerca de 19 min.</li>
<li><strong>Receita americana a 350 °F</strong> = 177 °C, gás 4. 180 °C = 356 °F; 200 °C = 392 °F.</li>
</ul>`,
    faqs: [
      ["Qual é a regra para passar uma receita do forno para a air fryer?", "Reduza a temperatura em cerca de 20 °C e o tempo em 20%. Como a potência varia entre modelos, confira o ponto 5 minutos antes."],
      ["E da air fryer para o forno?", "Aumente a temperatura em cerca de 20 °C e o tempo em 25%, sempre com o forno preaquecido."],
      ["Como converter Celsius em Fahrenheit?", "Multiplique por 9, divida por 5 e some 32. Assim, 180 °C viram 356 °F. Para o caminho inverso, subtraia 32, multiplique por 5 e divida por 9."],
      ["Toda receita de forno funciona na air fryer?", "Massas que crescem muito, assados grandes e preparos líquidos precisam de forma que caiba no cesto e deixe o ar circular. Comece por porções menores."],
    ],
    recipes: ["receita-batata-frita-na-air-fryer.html", "receita-pao-de-queijo.html", "receita-bolo-de-cenoura.html", "receita-lasanha-a-bolonhesa.html"],
  },
  "ferramenta-timer-de-cozinha.html": {
    intro: "Quem cozinha várias coisas ao mesmo tempo precisa de mais de um cronômetro. O timer permite criar quantos alarmes quiser, cada um com nome, e mostra o tempo restante também no título da aba.",
    howto: [
      "Toque em um atalho (ovo mole, ovo cozido, macarrão, arroz, feijão na pressão ou bolo) ou crie um timer com nome, minutos e segundos.",
      "Inicie quantos timers precisar: eles correm em paralelo.",
      "Quando um tempo acaba, o alarme toca e a aba avisa. Mantenha a página aberta e a tela ligada.",
    ],
    examples: `<p>Os atalhos trazem os tempos mais usados: <strong>ovo mole 6 min</strong>, <strong>ovo cozido 12 min</strong>, <strong>macarrão 9 min</strong>, <strong>arroz 18 min</strong>, <strong>feijão na pressão 30 min</strong> e <strong>bolo 40 min</strong>.</p>
<p>Num almoço de domingo, por exemplo: um timer de 18 minutos para o arroz, outro de 30 para o feijão na pressão e um terceiro para a sobremesa — como os 35 a 45 minutos de forno do <a href="receita-bolo-de-cenoura.html">bolo de cenoura</a>.</p>`,
    faqs: [
      ["O alarme toca com o celular bloqueado?", "Não é garantido. O alarme toca enquanto a página estiver aberta; alguns celulares pausam abas em segundo plano. Deixe a tela ligada durante o preparo."],
      ["Posso usar vários timers ao mesmo tempo?", "Sim. Cada timer tem nome próprio e corre em paralelo com os outros."],
      ["Quanto tempo cozinhar o ovo?", "6 minutos em água fervente para gema mole, 8 para cremosa e 12 para ovo duro. Veja o guia completo de tempo do ovo cozido."],
    ],
    recipes: ["receita-pudim-de-leite-condensado.html", "receita-bolo-de-chocolate.html", "receita-pao-caseiro.html", "receita-brigadeiro.html"],
  },
  "ferramenta-tempo-de-cozimento.html": {
    intro: "Uma tabela de consulta rápida com o tempo de cozimento de grãos, massas, legumes, ovos e carnes, em panela comum, pressão, vapor ou forno. Busque pelo alimento ou filtre por categoria.",
    howto: [
      "Digite o alimento (feijão, brócolis, macarrão…) ou escolha uma categoria.",
      "Leia o tempo indicado para o método de cozimento que você vai usar.",
      "Se quiser, abra o timer de cozinha para contar o tempo.",
    ],
    examples: `<ul class="prose-list">
<li><strong>Arroz branco:</strong> 15 a 18 min em panela tampada, com 2 partes de água.</li>
<li><strong>Feijão preto com molho:</strong> 25 a 30 min na pressão — a base da <a href="receita-feijoada.html">feijoada</a>.</li>
<li><strong>Brócolis em floretes:</strong> 3 a 4 min fervendo ou 5 a 6 min no vapor.</li>
<li><strong>Macarrão de arroz:</strong> hidratar 8 a 10 min em água morna, como no <a href="receita-pad-thai.html">pad thai</a>.</li>
</ul>`,
    faqs: [
      ["Na panela de pressão, quando começo a contar?", "A partir do momento em que a panela pega pressão e começa a chiar. Depois, espere a pressão sair naturalmente antes de abrir."],
      ["Os tempos servem para qualquer quantidade?", "São referências para porções domésticas. Quantidades muito maiores ou pedaços maiores pedem mais tempo; confira o ponto."],
      ["Cozinhar no vapor é melhor que ferver?", "Legumes no vapor preservam mais cor, textura e nutrientes do que fervidos, embora levem um pouco mais de tempo."],
    ],
    recipes: ["receita-feijoada.html", "receita-baiao-de-dois.html", "receita-arroz-com-pequi.html", "receita-carbonara.html", "receita-pad-thai.html", "receita-ramen-shoyu.html"],
  },
  "ferramenta-validade-dos-alimentos.html": {
    intro: "Quanto tempo dura o arroz cozido na geladeira? E o frango cru no freezer? A ferramenta reúne prazos de conservação de carnes, pratos prontos, laticínios, ovos, hortifrúti e itens de despensa, em temperatura ambiente, geladeira e freezer.",
    howto: [
      "Digite o alimento ou filtre por categoria (carnes, prontos, laticínios, ovos, hortifrúti ou despensa).",
      "Compare os prazos fora da geladeira, na geladeira (até 5 °C) e no freezer (−18 °C).",
      "Na dúvida — cheiro, cor ou textura diferentes — descarte.",
    ],
    examples: `<ul class="prose-list">
<li><strong>Arroz cozido:</strong> até 2 horas fora da geladeira, 3 a 4 dias na geladeira e 1 a 2 meses no freezer.</li>
<li><strong>Lasanha:</strong> 3 a 5 dias na geladeira e 3 meses no freezer — ótimo para congelar a <a href="receita-lasanha-a-bolonhesa.html">lasanha à bolonhesa</a> em porções.</li>
<li><strong>Frango cru:</strong> 1 a 2 dias na geladeira e 9 meses no freezer.</li>
<li><strong>Ovos crus na casca:</strong> 3 a 5 semanas na geladeira; não congele com casca.</li>
</ul>`,
    faqs: [
      ["Comida pronta pode ficar fora da geladeira?", "Por no máximo 2 horas. Depois disso, guarde na geladeira em pote fechado ou descarte."],
      ["Passou do prazo do freezer: preciso jogar fora?", "Se o alimento ficou sempre congelado a −18 °C, continua seguro, mas perde qualidade de sabor e textura."],
      ["Em que temperatura os prazos foram considerados?", "Geladeira a 5 °C ou menos e freezer a −18 °C, com os alimentos bem fechados."],
    ],
    recipes: ["receita-feijoada.html", "receita-lasanha-a-bolonhesa.html", "receita-estrogonofe-de-carne.html", "receita-coxinha-de-frango.html", "receita-ceviche-classico.html"],
  },
  "ferramenta-lista-de-compras.html": {
    intro: "Uma lista de compras que se organiza sozinha por seção do supermercado — hortifrúti, carnes, laticínios, padaria, bebidas, mercearia e limpeza. Você pode digitar os itens ou enviá-los direto das receitas, da calculadora de churrasco, da calculadora de festa e do cardápio semanal.",
    howto: [
      "Digite um item e toque em Adicionar, ou use o botão “+ Lista de compras” em qualquer receita.",
      "A lista se agrupa automaticamente pelas seções do mercado.",
      "No mercado, marque o que já pegou.",
      "Compartilhe pelo WhatsApp ou imprima. A lista fica salva neste navegador.",
    ],
    examples: `<p>Ao enviar os ingredientes do <a href="receita-estrogonofe-de-carne.html">estrogonofe de carne</a>, a alcatra vai para “Carnes e peixes”, a cebola e o alho para “Hortifrúti”, o creme de leite e a manteiga para “Frios e laticínios” e o ketchup e a mostarda para “Mercearia”.</p>`,
    faqs: [
      ["Preciso criar conta para salvar a lista?", "Não. A lista fica guardada no armazenamento local do seu navegador, sem cadastro. Ela não sincroniza entre aparelhos."],
      ["Como mandar os ingredientes de uma receita para a lista?", "Na página da receita, toque em “+ Lista de compras”. Os ingredientes entram já organizados por seção."],
      ["Posso dividir a lista com outra pessoa?", "Sim, pelo botão de compartilhar no WhatsApp, que envia a lista em texto."],
    ],
    recipes: ["receita-estrogonofe-de-carne.html", "receita-feijoada.html", "receita-lasanha-a-bolonhesa.html", "receita-bolo-de-cenoura.html"],
  },
  "ferramenta-ajustar-receita.html": {
    intro: "A receita rende 4 porções, mas vêm 10 pessoas? Cole a lista de ingredientes e a calculadora recalcula cada quantidade na proporção certa, inclusive frações como 1 1/2 e ¾.",
    howto: [
      "Informe quantas porções a receita rende originalmente e para quantas você quer fazer.",
      "Cole os ingredientes, um por linha, começando pela quantidade.",
      "Copie o resultado. Linhas sem número (como “sal a gosto”) ficam como estão.",
    ],
    examples: `<p><strong>De 4 para 10 porções</strong> (multiplicar por 2,5):</p>
<ul class="prose-list">
<li>2 xícaras de farinha de trigo → <strong>5 xícaras</strong></li>
<li>1 1/2 xícara de açúcar → <strong>3 ¾ xícaras</strong></li>
<li>3 ovos → <strong>7 ½ ovos</strong> (arredonde para 8 ou pese: 1 ovo grande ≈ 50 g sem casca)</li>
<li>1/2 xícara de óleo → <strong>1 ¼ xícara</strong></li>
<li>1 colher (sopa) de fermento → <strong>2 ½ colheres (sopa)</strong></li>
</ul>`,
    faqs: [
      ["Posso simplesmente multiplicar tudo?", "Para a maioria dos ingredientes, sim. Fermento e sal pedem um pouco menos que a conta exata ao dobrar; temperos devem ser ajustados ao paladar no final."],
      ["E o tempo de forno?", "Uma massa maior precisa de forma maior ou de mais tempo de forno. Confira com o palito em vez de confiar só no relógio."],
      ["Quais formatos de número a calculadora entende?", "Inteiros, decimais com vírgula ou ponto, frações como 1/2 e 1 1/2 e os símbolos ½, ⅓, ⅔, ¼, ¾ e ⅛."],
    ],
    recipes: ["receita-bolo-de-cenoura.html", "receita-brigadeiro.html", "receita-feijoada.html", "receita-pao-de-queijo.html"],
  },
  "ferramenta-ponto-da-carne.html": {
    intro: "O jeito mais confiável de acertar o ponto é medir a temperatura no centro da peça. A ferramenta mostra a temperatura interna de cada ponto para carne bovina, suína, frango, peixe e cordeiro, separando o que é escolha de sabor do mínimo seguro recomendado pelo USDA/FSIS.",
    howto: [
      "Escolha o tipo de carne.",
      "Veja a temperatura interna de cada ponto e como a carne fica.",
      "Meça no centro da parte mais grossa, longe do osso, e retire do fogo 2 a 3 °C antes: a temperatura sobe no descanso.",
    ],
    examples: `<ul class="prose-list">
<li><strong>Frango:</strong> 74 °C em qualquer parte. Coxas e sobrecoxas ficam mais macias entre 80 e 85 °C — bom ponto para o <a href="receita-butter-chicken.html">butter chicken</a>.</li>
<li><strong>Lombo suíno:</strong> 63 °C + 3 minutos de descanso; fica levemente rosado e seguro.</li>
<li><strong>Cordeiro ao ponto:</strong> 63 °C + 3 minutos de descanso. Para desfiar, como no <a href="receita-tagine-de-cordeiro.html">tagine</a>, 88 a 93 °C em cozimento lento.</li>
</ul>`,
    faqs: [
      ["Qual é a temperatura segura para frango?", "74 °C no centro, para peito, coxa, sobrecoxa e frango moído, segundo o USDA/FSIS."],
      ["Carne moída precisa de mais temperatura que um bife?", "Sim. Cortes inteiros de boi, porco e cordeiro são seguros a partir de 63 °C com 3 minutos de descanso; carnes moídas precisam de 71 °C."],
      ["Por que tirar a carne do fogo antes da temperatura final?", "Porque a temperatura interna continua subindo 2 a 3 °C durante o descanso."],
    ],
    recipes: ["receita-butter-chicken.html", "receita-coq-au-vin.html", "receita-pato-no-tucupi.html", "receita-tagine-de-cordeiro.html", "receita-tacos-al-pastor.html", "receita-barreado.html"],
  },
  "ferramenta-o-que-cozinhar-hoje.html": {
    intro: "Para quando a pergunta é “o que eu faço hoje?”. O sorteador escolhe uma receita do Clube da Receita dentro dos filtros que você definir: tempo disponível, doce ou salgado e um ingrediente que você tenha em casa.",
    howto: [
      "Escolha o tempo máximo de preparo.",
      "Defina se quer doce ou salgado e, se quiser, digite um ingrediente.",
      "Toque em sortear. Não gostou? Sorteie de novo.",
    ],
    examples: `<p>Com “até 30 minutos” e “salgado”, o sorteio fica entre a <a href="receita-carbonara.html">carbonara</a>, o <a href="receita-ceviche-classico.html">ceviche clássico</a> e o <a href="receita-pad-thai.html">pad thai</a>. Com “frango” no campo de ingrediente, entram opções como o <a href="receita-butter-chicken.html">butter chicken</a>.</p>`,
    faqs: [
      ["De onde vêm as receitas sorteadas?", "Das receitas publicadas no Clube da Receita, com passo a passo completo."],
      ["E se nenhuma receita aparecer?", "Os filtros estão restritos demais. Aumente o tempo máximo ou apague o ingrediente e sorteie de novo."],
    ],
    recipes: ["receita-ceviche-classico.html", "receita-pad-thai.html", "receita-carbonara.html", "receita-estrogonofe-de-carne.html"],
  },
  "ferramenta-cardapio-semanal.html": {
    intro: "Planejar a semana evita compras repetidas e a pergunta diária sobre o que cozinhar. O planejador tem almoço e jantar de segunda a domingo, sugere receitas automaticamente e transforma o cardápio em lista de compras.",
    howto: [
      "Escolha uma receita para cada refeição, ou marque “Sobras / marmita” e “Comer fora”.",
      "Se preferir, toque em preencher a semana: a ferramenta sugere pratos salgados e reserva alguns jantares para sobras.",
      "Gere a lista de compras com todos os ingredientes das receitas escolhidas.",
    ],
    examples: `<p>Uma semana possível: <a href="receita-feijoada.html">feijoada</a> no sábado, sobras no domingo à noite, <a href="receita-baiao-de-dois.html">baião de dois</a> na segunda aproveitando o feijão e <a href="receita-lasanha-a-bolonhesa.html">lasanha</a> congelada em porções para a quarta. Ao gerar a lista, os ingredientes de cada prato vão para a lista de compras com o nome da receita ao lado.</p>`,
    faqs: [
      ["O cardápio fica salvo?", "Sim, neste navegador. Não é preciso criar conta."],
      ["Como evitar desperdício na semana?", "Reaproveite preparos (o feijão de um dia vira baião de dois no outro), reserve um dia para sobras e cozinhe em lote no fim de semana."],
    ],
    recipes: ["receita-feijoada.html", "receita-baiao-de-dois.html", "receita-lasanha-a-bolonhesa.html", "receita-estrogonofe-de-carne.html", "receita-arroz-com-pequi.html"],
  },
};
