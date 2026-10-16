// Ferramentas interativas. Cada uma tem página própria (boa para SEO) e um
// widget que é ativado por assets/tools.js através do atributo data-tool.
const t = (head, rows) =>
  `<div class="table-wrap"><table class="data-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;

module.exports = [
  {
    file: "ferramenta-conversor-de-medidas.html",
    icon: "⚖",
    name: "Conversor de medidas",
    title: "Conversor de medidas culinárias: xícara, colher e gramas",
    desc: "Converta xícaras, colheres, copo americano, ml e gramas para 30 ingredientes, com densidade específica de cada um. Grátis e sem cadastro.",
    lead: "Transforme xícaras e colheres em gramas (e o contrário) usando a densidade real de cada ingrediente.",
    widget: `<div class="tool-panel" data-tool="converter">
<div class="field-row">
<label class="field"><span>Quantidade</span><input class="input" type="text" inputmode="decimal" id="cv-amount" value="1"></label>
<label class="field"><span>De</span><select class="input" id="cv-from"></select></label>
<label class="field"><span>Para</span><select class="input" id="cv-to"></select></label>
</div>
<label class="field"><span>Ingrediente</span><select class="input" id="cv-ingredient"></select></label>
<p class="tool-result" id="cv-result" aria-live="polite"></p>
<p class="small muted">Aceita frações como 1/2, 1 1/2 ou ¾. Valores para ingrediente nivelado, sem compactar.</p>
<h3>Tabela completa do ingrediente</h3>
<div id="cv-table"></div>
</div>`,
    content: `<h2>Como usar o conversor</h2>
<p>Escolha a quantidade, a unidade de origem, a unidade de destino e o ingrediente. O cálculo usa a xícara padrão de 240 ml, a colher de sopa de 15 ml, a colher de chá de 5 ml e o copo americano de 190 ml. Como cada ingrediente tem uma densidade diferente, uma xícara de farinha (120 g) pesa bem menos que uma xícara de açúcar (200 g).</p>
<h2>Por que pesar é mais preciso</h2>
<p>A forma de encher a xícara muda o resultado em até 30%. Para bolos e pães, uma balança de cozinha garante o mesmo resultado sempre. Veja a <a href="tabela-de-medidas-caseiras.html">tabela de medidas caseiras</a> com dicas de como medir cada ingrediente.</p>`,
  },
  {
    file: "ferramenta-calculadora-de-churrasco.html",
    icon: "🔥",
    name: "Calculadora de churrasco",
    title: "Calculadora de churrasco: carne, bebida e carvão por pessoa",
    desc: "Calcule quanto comprar de carne, linguiça, frango, pão de alho, cerveja, refrigerante, carvão e gelo para o seu churrasco. Gera lista de compras.",
    lead: "Informe quantas pessoas vão e quanto tempo dura a festa: a calculadora monta a lista completa.",
    widget: `<div class="tool-panel" data-tool="bbq">
<div class="field-row">
<label class="field"><span>Adultos</span><input class="input" type="number" min="0" max="500" id="bbq-adults" value="10"></label>
<label class="field"><span>Crianças</span><input class="input" type="number" min="0" max="500" id="bbq-kids" value="2"></label>
<label class="field"><span>Bebem álcool</span><input class="input" type="number" min="0" max="500" id="bbq-drinkers" value="6"></label>
</div>
<div class="field-row">
<label class="field"><span>Duração</span><select class="input" id="bbq-duration"><option value="0.85">Até 3 horas</option><option value="1" selected>3 a 5 horas</option><option value="1.25">Mais de 5 horas</option></select></label>
<label class="field"><span>Estilo</span><select class="input" id="bbq-style"><option value="eco">Econômico</option><option value="trad" selected>Tradicional</option><option value="prem">Premium</option></select></label>
</div>
<div id="bbq-result" aria-live="polite"></div>
<div class="tool-actions"><button class="button" id="bbq-add">Enviar para a lista de compras</button><button class="button-outline" data-print>Imprimir</button><a class="button-outline" id="bbq-share" target="_blank" rel="noopener">Compartilhar no WhatsApp</a></div>
</div>`,
    content: `<h2>Como a calculadora funciona</h2>
<p>A base é de 450 g de carnes por adulto e 225 g por criança em um churrasco de 3 a 5 horas, ajustada para menos em eventos curtos e para mais em eventos longos. O estilo muda a divisão dos cortes: o econômico usa mais linguiça, frango e fraldinha; o premium inclui picanha e ancho. Somamos 10% de margem de segurança.</p>
<p>Quer entender as quantidades em detalhe? Leia o guia <a href="quanto-de-carne-por-pessoa-churrasco.html">quanto de carne por pessoa no churrasco</a> e confira as temperaturas no <a href="ferramenta-ponto-da-carne.html">guia de ponto da carne</a>.</p>`,
  },
  {
    file: "ferramenta-calculadora-de-festa.html",
    icon: "🎉",
    name: "Calculadora de festa",
    title: "Calculadora de festa: salgados, doces, bolo e bebidas por convidado",
    desc: "Quantos salgados, docinhos, quilos de bolo, refrigerante e água comprar para festa de aniversário infantil ou adulta. Calculadora grátis.",
    lead: "Aniversário, chá de bebê ou confraternização: descubra quantos salgados, doces e bebidas comprar.",
    widget: `<div class="tool-panel" data-tool="party">
<div class="field-row">
<label class="field"><span>Adultos</span><input class="input" type="number" min="0" max="1000" id="pt-adults" value="30"></label>
<label class="field"><span>Crianças</span><input class="input" type="number" min="0" max="1000" id="pt-kids" value="15"></label>
</div>
<div class="field-row">
<label class="field"><span>Duração</span><select class="input" id="pt-duration"><option value="0.8">Até 3 horas</option><option value="1" selected>3 a 4 horas</option><option value="1.2">Mais de 4 horas</option></select></label>
<label class="field"><span>Haverá refeição?</span><select class="input" id="pt-meal"><option value="0">Não, só salgados</option><option value="1">Sim (jantar/almoço)</option></select></label>
</div>
<div id="pt-result" aria-live="polite"></div>
<div class="tool-actions"><button class="button" id="pt-add">Enviar para a lista de compras</button><button class="button-outline" data-print>Imprimir</button></div>
</div>`,
    content: `<h2>Referências usadas</h2>
${t(["Item", "Por adulto", "Por criança"], [
  ["Salgados (sem refeição)", "12 a 15", "8"],
  ["Salgados (com refeição)", "6", "4"],
  ["Docinhos", "4 a 6", "6"],
  ["Bolo", "120 g", "80 g"],
  ["Refrigerante e suco", "600 ml", "500 ml"],
  ["Água", "300 ml", "300 ml"],
])}
<p>Faça os salgados em casa: veja nossa <a href="receita-coxinha-de-frango.html">coxinha de frango</a> e o <a href="receita-brigadeiro.html">brigadeiro tradicional</a>.</p>`,
  },
  {
    file: "ferramenta-substituicao-de-ingredientes.html",
    icon: "⇄",
    name: "Substituição de ingredientes",
    title: "Substituição de ingredientes: o que usar no lugar de cada um",
    desc: "Acabou o ovo, o leite ou o fermento? Busque entre mais de 40 substituições com proporções exatas para bolos, pães, molhos e receitas veganas.",
    lead: "Digite o ingrediente que faltou e veja as melhores trocas, com proporção e em que receitas funcionam.",
    widget: `<div class="tool-panel" data-tool="subs">
<label class="field"><span>Qual ingrediente faltou?</span><input class="input" type="search" id="sub-search" placeholder="ex.: ovo, leite condensado, fermento"></label>
<div class="chip-row" id="sub-chips"></div>
<div id="sub-results" aria-live="polite"></div>
</div>`,
    content: `<h2>Como escolher a melhor substituição</h2>
<p>Pense na função do ingrediente: estrutura (ovo, farinha), gordura (manteiga, óleo), umidade (leite, iogurte), crescimento (fermentos) ou sabor (vinho, limão). Uma troca que cumpre a mesma função dá certo. Leia o guia completo de <a href="substituicoes-na-cozinha.html">substituições na cozinha</a>.</p>`,
  },
  {
    file: "ferramenta-conversor-air-fryer-forno.html",
    icon: "♨",
    name: "Conversor forno ↔ air fryer",
    title: "Conversor de forno para air fryer e de °C para °F",
    desc: "Converta tempo e temperatura de receitas de forno para air fryer (e vice-versa), além de Celsius, Fahrenheit e marcas de gás.",
    lead: "Adapte qualquer receita de forno para a air fryer e converta temperaturas de receitas estrangeiras.",
    widget: `<div class="tool-panel" data-tool="airfryer">
<h3>Forno → air fryer</h3>
<div class="field-row">
<label class="field"><span>Temperatura do forno (°C)</span><input class="input" type="number" min="50" max="300" id="af-temp" value="200"></label>
<label class="field"><span>Tempo no forno (min)</span><input class="input" type="number" min="1" max="600" id="af-time" value="40"></label>
<label class="field"><span>Sentido</span><select class="input" id="af-dir"><option value="toAir">Forno → air fryer</option><option value="toOven">Air fryer → forno</option></select></label>
</div>
<p class="tool-result" id="af-result" aria-live="polite"></p>
<h3>Celsius, Fahrenheit e gás</h3>
<div class="field-row">
<label class="field"><span>Celsius (°C)</span><input class="input" type="number" id="tc-c" value="180"></label>
<label class="field"><span>Fahrenheit (°F)</span><input class="input" type="number" id="tc-f" value="356"></label>
</div>
<p class="tool-result" id="tc-result" aria-live="polite"></p>
</div>`,
    content: `<h2>A regra da conversão</h2>
<p>A air fryer concentra o calor em um espaço pequeno, com ventilação forte. Por isso, a regra prática é reduzir a temperatura em cerca de 20 °C e o tempo em 20% em relação ao forno convencional. Confira o resultado alguns minutos antes, pois a potência varia entre modelos.</p>
<p>Veja a <a href="air-fryer-tempo-e-temperatura.html">tabela de tempo e temperatura na air fryer</a> para mais de 30 alimentos.</p>
${t(["Forno", "°C", "°F", "Gás"], [
  ["Muito baixo", "120–140", "250–275", "½–1"],
  ["Baixo", "150–160", "300–325", "2–3"],
  ["Médio", "170–190", "340–375", "3–5"],
  ["Alto", "200–220", "400–425", "6–7"],
  ["Muito alto", "230–250", "450–480", "8–9"],
])}`,
  },
  {
    file: "ferramenta-timer-de-cozinha.html",
    icon: "◷",
    name: "Timer de cozinha",
    title: "Timer de cozinha online com vários alarmes",
    desc: "Timer de cozinha grátis com vários cronômetros ao mesmo tempo, atalhos para ovo, arroz, macarrão e feijão, alarme sonoro e aviso no título da aba.",
    lead: "Vários cronômetros ao mesmo tempo, com nome e alarme. Mantenha esta aba aberta enquanto cozinha.",
    widget: `<div class="tool-panel" data-tool="timer">
<div class="field-row">
<label class="field"><span>Nome</span><input class="input" id="tm-name" placeholder="ex.: bolo no forno"></label>
<label class="field"><span>Minutos</span><input class="input" type="number" min="0" max="600" id="tm-min" value="10"></label>
<label class="field"><span>Segundos</span><input class="input" type="number" min="0" max="59" id="tm-sec" value="0"></label>
</div>
<div class="tool-actions"><button class="button" id="tm-add">Iniciar timer</button></div>
<div class="chip-row" id="tm-presets"></div>
<div id="tm-list" aria-live="polite"></div>
</div>`,
    content: `<h2>Atalhos úteis</h2>
<p>Os botões rápidos já trazem os tempos mais usados: ovo mole (6 min), ovo cozido (12 min), macarrão al dente (9 min), arroz (18 min) e feijão na pressão (30 min). Para o ponto exato de cada ovo, veja <a href="quanto-tempo-cozinhar-ovo.html">quanto tempo cozinhar ovo</a>.</p>
<p>O alarme toca enquanto esta página estiver aberta. Em alguns celulares, o navegador pausa abas em segundo plano; deixe a tela ligada durante o preparo.</p>`,
  },
  {
    file: "ferramenta-tempo-de-cozimento.html",
    icon: "⏲",
    name: "Tempo de cozimento",
    title: "Tabela de tempo de cozimento: grãos, massas, legumes e carnes",
    desc: "Consulte o tempo de cozimento de arroz, feijão na pressão, macarrão, legumes no vapor, ovos e carnes no forno. Busca rápida e timer integrado.",
    lead: "Busque o alimento e veja o tempo em panela comum, pressão, vapor ou forno.",
    widget: `<div class="tool-panel" data-tool="cooktime">
<label class="field"><span>Buscar alimento</span><input class="input" type="search" id="ct-search" placeholder="ex.: feijão, brócolis, macarrão"></label>
<div class="chip-row" id="ct-chips"></div>
<div id="ct-table"></div>
</div>`,
    content: `<h2>Sobre os tempos</h2>
<p>Os tempos são referências para porções domésticas. Na panela de pressão, conte a partir do momento em que ela pega pressão (começa a chiar) e espere a pressão sair naturalmente. Legumes cozidos no vapor preservam mais cor, textura e nutrientes do que fervidos.</p>
<p>Leia também <a href="como-fazer-arroz-e-feijao.html">como fazer arroz soltinho e feijão macio</a>.</p>`,
  },
  {
    file: "ferramenta-validade-dos-alimentos.html",
    icon: "❄",
    name: "Validade dos alimentos",
    title: "Quanto tempo dura? Validade na geladeira e no freezer",
    desc: "Consulte por quanto tempo carnes, sobras, laticínios, frutas e legumes duram na geladeira, no freezer e fora dela. Busca rápida por alimento.",
    lead: "Busque um alimento para ver quanto tempo ele dura na despensa, na geladeira e no freezer.",
    widget: `<div class="tool-panel" data-tool="shelf">
<label class="field"><span>Buscar alimento</span><input class="input" type="search" id="sh-search" placeholder="ex.: arroz cozido, frango, queijo"></label>
<div class="chip-row" id="sh-chips"></div>
<div id="sh-table"></div>
</div>`,
    content: `<h2>Como interpretar os prazos</h2>
<p>Os prazos consideram geladeira a 5 °C ou menos e freezer a −18 °C, com alimentos bem fechados. No freezer, passado o prazo, o alimento continua seguro se nunca descongelou, mas perde qualidade. Na dúvida, descarte: cheiro, cor e textura alterados são sinais de alerta.</p>
<p>Guias completos: <a href="quanto-tempo-dura-na-geladeira.html">quanto tempo dura na geladeira</a> e <a href="como-congelar-alimentos.html">como congelar alimentos</a>.</p>`,
  },
  {
    file: "ferramenta-lista-de-compras.html",
    icon: "☑",
    name: "Lista de compras",
    title: "Lista de compras online organizada por seção do mercado",
    desc: "Monte sua lista de compras, organizada automaticamente por seção do supermercado, marque o que já pegou e compartilhe pelo WhatsApp. Grátis.",
    lead: "Adicione itens (ou envie os ingredientes de uma receita) e a lista se organiza por seção do mercado.",
    widget: `<div class="tool-panel" data-tool="shopping">
<form class="field-row" id="sl-form">
<label class="field grow"><span>Item</span><input class="input" id="sl-input" placeholder="ex.: 1 kg de feijão preto" autocomplete="off"></label>
<button class="button" type="submit">Adicionar</button>
</form>
<p class="small muted" id="sl-count" aria-live="polite"></p>
<div id="sl-list"></div>
<div class="tool-actions"><button class="button-outline" id="sl-copy">Copiar lista</button><a class="button-outline" id="sl-share" target="_blank" rel="noopener">WhatsApp</a><button class="button-outline" data-print>Imprimir</button><button class="plain-button" id="sl-clear-done">Remover marcados</button><button class="plain-button" id="sl-clear">Limpar tudo</button></div>
</div>`,
    content: `<h2>Dicas para gastar menos no mercado</h2>
<ul class="prose-list">
<li>Planeje as refeições da semana antes de comprar — use o <a href="ferramenta-cardapio-semanal.html">cardápio semanal</a>.</li>
<li>Confira a despensa e a geladeira antes de sair.</li>
<li>Prefira frutas e legumes da estação: veja o <a href="frutas-e-legumes-da-estacao.html">calendário de safra</a>.</li>
<li>Compare o preço por quilo ou por litro, não o preço da embalagem.</li>
</ul>
<p>A lista fica salva neste navegador. Nas receitas, use o botão “Adicionar à lista de compras” para enviar os ingredientes direto para cá.</p>`,
  },
  {
    file: "ferramenta-ajustar-receita.html",
    icon: "✕",
    name: "Ajustar porções",
    title: "Calculadora de porções: aumente ou diminua qualquer receita",
    desc: "Cole os ingredientes de qualquer receita e recalcule as quantidades para mais ou menos porções. Entende frações como 1/2 e ¾.",
    lead: "Cole a lista de ingredientes de qualquer receita e recalcule para o número de pessoas que você precisa.",
    widget: `<div class="tool-panel" data-tool="scaler">
<div class="field-row">
<label class="field"><span>Rende originalmente</span><input class="input" type="number" min="1" max="200" id="sc-from" value="4"></label>
<label class="field"><span>Quero fazer para</span><input class="input" type="number" min="1" max="500" id="sc-to" value="10"></label>
</div>
<label class="field"><span>Ingredientes (um por linha)</span><textarea class="input" id="sc-input" rows="7">2 xícaras de farinha de trigo
1 1/2 xícara de açúcar
3 ovos
1/2 xícara de óleo
1 colher (sopa) de fermento</textarea></label>
<h3>Resultado</h3>
<ul class="scaled-list" id="sc-output" aria-live="polite"></ul>
<div class="tool-actions"><button class="button-outline" id="sc-copy">Copiar resultado</button></div>
</div>`,
    content: `<h2>Cuidados ao multiplicar receitas</h2>
<ul class="prose-list">
<li><strong>Fermento e sal:</strong> ao dobrar, use um pouco menos que o dobro e prove.</li>
<li><strong>Ovos:</strong> arredonde para cima e, se precisar, pese (1 ovo grande ≈ 50 g sem casca).</li>
<li><strong>Forma e tempo:</strong> uma massa maior precisa de forma maior ou mais tempo de forno. Confira com palito.</li>
<li><strong>Temperos:</strong> ajuste ao paladar no final.</li>
</ul>
<p>Precisa converter as medidas? Use o <a href="ferramenta-conversor-de-medidas.html">conversor de medidas</a>.</p>`,
  },
  {
    file: "ferramenta-ponto-da-carne.html",
    icon: "🌡",
    name: "Ponto da carne",
    title: "Ponto da carne: temperatura interna de cada tipo e ponto",
    desc: "Temperaturas internas seguras para carne bovina, suína, frango, peixe e cordeiro, do mal passado ao bem passado, com tempo de descanso.",
    lead: "Escolha a carne e veja a temperatura interna de cada ponto, medida com termômetro no centro da peça.",
    widget: `<div class="tool-panel" data-tool="meat">
<div class="chip-row" id="mt-chips" role="group" aria-label="Tipo de carne"></div>
<div id="mt-table" aria-live="polite"></div>
</div>`,
    content: `<h2>Temperaturas seguras</h2>
<p>Segundo o USDA/FSIS, cortes inteiros de carne bovina, suína e de cordeiro são seguros a partir de 63 °C no centro, seguidos de 3 minutos de descanso. Carnes moídas precisam de 71 °C; aves inteiras ou moídas, de 74 °C; peixes, de 63 °C. Pontos abaixo disso (como o mal passado bovino) são escolhas de sabor em cortes inteiros, com risco maior para gestantes, crianças, idosos e imunossuprimidos.</p>
<p>Fonte: <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart" rel="noopener" target="_blank">USDA/FSIS — Safe Minimum Internal Temperature Chart</a>.</p>`,
  },
  {
    file: "ferramenta-o-que-cozinhar-hoje.html",
    icon: "🎲",
    name: "O que cozinhar hoje?",
    title: "O que cozinhar hoje? Sorteador de receitas",
    desc: "Sem ideia para o almoço ou jantar? Filtre por tempo, tipo e ingrediente e sorteie uma receita do Clube da Receita.",
    lead: "Sem ideia? Escolha alguns filtros e deixe a sorte decidir o cardápio de hoje.",
    widget: `<div class="tool-panel" data-tool="picker">
<div class="field-row">
<label class="field"><span>Tempo máximo</span><select class="input" id="pk-time"><option value="9999">Qualquer</option><option value="30">Até 30 min</option><option value="60">Até 1 hora</option><option value="120">Até 2 horas</option></select></label>
<label class="field"><span>Tipo</span><select class="input" id="pk-type"><option value="">Qualquer</option><option value="salgado">Salgado</option><option value="doce">Doce</option></select></label>
<label class="field"><span>Tenho em casa</span><input class="input" id="pk-ing" placeholder="ex.: frango"></label>
</div>
<div class="tool-actions"><button class="button" id="pk-go">Sortear receita 🎲</button></div>
<div id="pk-result" aria-live="polite"></div>
</div>`,
    content: `<h2>Mais formas de decidir</h2>
<p>Tem ingredientes sobrando? Use a <a href="busca-geladeira.html">busca por ingredientes da geladeira</a>. Quer planejar a semana inteira? Experimente o <a href="ferramenta-cardapio-semanal.html">cardápio semanal</a> e confira as <a href="ideias-de-cardapio.html">ideias de cardápio</a>.</p>`,
  },
  {
    file: "ferramenta-cardapio-semanal.html",
    icon: "▦",
    name: "Cardápio semanal",
    title: "Planejador de cardápio semanal com lista de compras",
    desc: "Monte o cardápio da semana com almoço e jantar, preencha automaticamente com receitas do site e gere a lista de compras com um clique.",
    lead: "Planeje almoço e jantar de cada dia. O planejamento fica salvo neste navegador.",
    widget: `<div class="tool-panel" data-tool="planner">
<div class="tool-actions"><button class="button" id="pl-fill">Sugerir semana completa</button><button class="button-outline" id="pl-shop">Gerar lista de compras</button><button class="button-outline" data-print>Imprimir</button><button class="plain-button" id="pl-clear">Limpar</button></div>
<div class="planner-grid" id="pl-grid"></div>
<p class="small muted" id="pl-status" aria-live="polite"></p>
</div>`,
    content: `<h2>Como planejar sem complicar</h2>
<ul class="prose-list">
<li>Reaproveite: o feijão de segunda vira baião de dois na quarta.</li>
<li>Reserve um dia para sobras e um para algo especial.</li>
<li>Cozinhe em lote no fim de semana — veja o guia de <a href="marmitas-da-semana.html">marmitas da semana</a>.</li>
</ul>`,
  },
];
