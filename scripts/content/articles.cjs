// Artigos do Caderno escolhidos pelos temas que os brasileiros mais procuram
// (air fryer, conservação de alimentos, churrasco, medidas, básicos da cozinha).
// body: HTML simples (h2, p, ul, table). Tabelas usam a classe "data-table".

const t = (head, rows) =>
  `<div class="table-wrap"><table class="data-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;

module.exports = [
  {
    file: "air-fryer-tempo-e-temperatura.html",
    title: "Air fryer: tabela de tempo e temperatura para mais de 30 alimentos",
    h1: "Air fryer: tempo e temperatura de cada alimento",
    desc: "Tabela completa de tempo e temperatura na air fryer para batata, frango, carne, peixe, legumes, pão de queijo e bolo, com dicas para deixar tudo crocante.",
    eyebrow: "GUIA PRÁTICO · AIR FRYER",
    minutes: 7,
    tools: ["ferramenta-conversor-air-fryer-forno.html", "ferramenta-timer-de-cozinha.html"],
    recipes: ["receita-batata-frita-na-air-fryer.html", "receita-pao-de-queijo.html", "receita-coxinha-de-frango.html"],
    body: `
<p>A air fryer virou o eletrodoméstico queridinho das cozinhas brasileiras: em 2025, receitas feitas nela ocuparam metade do ranking de receitas mais buscadas no Google Brasil, com batata frita, pudim, batata-doce, bolo, pastel e peixe. A lógica é simples — uma resistência aquece o ar, e um ventilador faz esse ar circular rapidamente, dourando a superfície dos alimentos como um forno de convecção compacto.</p>
<p>Os tempos abaixo valem para aparelhos de 3 a 5 litros com o cesto preaquecido por 3 minutos. Modelos maiores ou em forma de forno podem precisar de 2 a 5 minutos a mais. Na dúvida, abra o cesto na metade do tempo e confira.</p>
<h2>Tabela de tempo e temperatura na air fryer</h2>
${t(["Alimento", "Temperatura", "Tempo", "Observação"], [
  ["Batata frita fresca (palito)", "200 °C", "20–25 min", "Deixe de molho e seque bem; sacuda a cada 7 min"],
  ["Batata frita congelada", "200 °C", "15–18 min", "Sem óleo extra"],
  ["Batata-doce em cubos", "190 °C", "18–22 min", "1 colher de azeite"],
  ["Batata rústica (gomos)", "190 °C", "25–30 min", "Pré-cozinhe 5 min para ficar mais macia"],
  ["Mandioca cozida", "200 °C", "15–20 min", "Cozinhe antes até ficar macia"],
  ["Coxa e sobrecoxa de frango", "180 °C", "25–30 min", "Pele para baixo primeiro; vire na metade"],
  ["Asinha / tulipa de frango", "200 °C", "20–25 min", "Interna de 74 °C"],
  ["Filé de peito de frango", "180 °C", "12–15 min", "Bata para uniformizar a espessura"],
  ["Frango inteiro (1,5 kg)", "180 °C", "50–60 min", "Só em air fryers grandes"],
  ["Linguiça toscana", "180 °C", "15–20 min", "Fure levemente; interna de 71 °C"],
  ["Hambúrguer (150 g)", "200 °C", "10–12 min", "Vire na metade"],
  ["Bife de contrafilé (2 cm)", "200 °C", "8–12 min", "Ao ponto: 8 min"],
  ["Picanha em fatias", "200 °C", "10–15 min", "Gordura para cima"],
  ["Costelinha suína pré-cozida", "200 °C", "15–20 min", "Pincele molho nos últimos 5 min"],
  ["Filé de tilápia", "180 °C", "10–12 min", "Papel-manteiga perfurado evita grudar"],
  ["Salmão em posta", "180 °C", "10–12 min", "Pele para baixo"],
  ["Camarão médio", "200 °C", "6–8 min", "Não passe do ponto"],
  ["Peixe empanado", "200 °C", "12–15 min", "Borrife óleo"],
  ["Pão de queijo congelado", "180 °C", "15–20 min", "Sem untar"],
  ["Coxinha / salgado congelado", "200 °C", "12–15 min", "Borrife óleo"],
  ["Pastel cru", "200 °C", "8–10 min", "Pincele óleo dos dois lados"],
  ["Nuggets congelados", "200 °C", "10–12 min", "Vire na metade"],
  ["Ovo cozido (na casca)", "160 °C", "13–15 min", "Coloque em água gelada depois"],
  ["Legumes (brócolis, abobrinha, cenoura)", "190 °C", "10–15 min", "Cortes do mesmo tamanho"],
  ["Couve-flor em floretes", "190 °C", "15–18 min", "Com azeite e páprica"],
  ["Grão-de-bico cozido", "200 °C", "15–20 min", "Seque bem antes"],
  ["Pão francês amanhecido", "160 °C", "3–4 min", "Borrife água"],
  ["Bolo simples (forma pequena)", "160 °C", "25–30 min", "Cubra com alumínio se dourar rápido"],
  ["Pudim (forma pequena, coberta)", "150 °C", "35–45 min", "Banho-maria dentro do cesto"],
  ["Banana com canela", "180 °C", "8–10 min", "Sobremesa rápida"],
  ["Reaquecer pizza", "170 °C", "3–5 min", "Massa volta a ficar crocante"],
])}
<h2>Como converter uma receita de forno para a air fryer</h2>
<p>A regra prática é reduzir a temperatura em cerca de 20 °C e o tempo em 20% em relação ao forno convencional. Uma receita que pede 200 °C por 40 minutos fica em torno de 180 °C por 32 minutos. Use nosso <a href="ferramenta-conversor-air-fryer-forno.html">conversor de forno para air fryer</a> para fazer a conta automaticamente.</p>
<h2>7 regras para acertar sempre</h2>
<ul>
<li><strong>Não lote o cesto.</strong> O ar precisa circular. Duas levas rápidas são melhores que uma leva molenga.</li>
<li><strong>Preaqueça.</strong> Três minutos vazios garantem que o alimento comece a dourar imediatamente.</li>
<li><strong>Seque bem.</strong> Umidade na superfície vira vapor e impede a crocância.</li>
<li><strong>Pouco óleo, bem distribuído.</strong> Um borrifador ou pincel resolvem; óleo demais pinga e fumega.</li>
<li><strong>Sacuda ou vire na metade.</strong> O lado de cima doura mais rápido.</li>
<li><strong>Papel-manteiga só com alimento por cima.</strong> Solto, ele pode ser sugado contra a resistência.</li>
<li><strong>Termômetro para carnes.</strong> Frango precisa atingir 74 °C no centro; veja o <a href="ferramenta-ponto-da-carne.html">guia de ponto da carne</a>.</li>
</ul>
<h2>Como limpar a air fryer</h2>
<p>Espere esfriar, retire o cesto e lave com água morna, detergente neutro e esponja macia — palha de aço danifica o antiaderente. Para gordura grudada, deixe de molho com água quente e bicarbonato por 15 minutos. Limpe a resistência com pano úmido, com o aparelho desligado da tomada.</p>`,
  },
  {
    file: "quanto-tempo-dura-na-geladeira.html",
    title: "Quanto tempo dura cada alimento na geladeira: tabela completa",
    h1: "Quanto tempo dura cada alimento na geladeira",
    desc: "Tabela de validade na geladeira para carnes, frango, peixe, arroz, feijão, ovos, laticínios, frutas, legumes e sobras, com dicas para organizar e evitar desperdício.",
    eyebrow: "CONSERVAÇÃO · SEGURANÇA DOS ALIMENTOS",
    minutes: 6,
    tools: ["ferramenta-validade-dos-alimentos.html", "ferramenta-lista-de-compras.html"],
    recipes: ["receita-feijoada.html", "receita-estrogonofe-de-carne.html", "receita-lasanha-a-bolonhesa.html"],
    body: `
<p>Saber quanto tempo cada alimento aguenta na geladeira evita dois problemas ao mesmo tempo: intoxicação alimentar e desperdício. Os prazos abaixo consideram geladeira regulada a <strong>5 °C ou menos</strong>, alimentos bem fechados e manipulados com higiene. Eles são referências seguras e conservadoras, baseadas em orientações de órgãos de segurança dos alimentos como o USDA (Departamento de Agricultura dos EUA) e em práticas recomendadas pela vigilância sanitária.</p>
<p>Importante: as datas de validade da embalagem valem para o produto <em>fechado</em>. Depois de aberto, vale o prazo da tabela ou o indicado no rótulo ("após aberto, consumir em…").</p>
<h2>Carnes, aves e peixes</h2>
${t(["Alimento", "Cru", "Cozido"], [
  ["Carne bovina em peça ou bife", "3 a 5 dias", "3 a 4 dias"],
  ["Carne moída", "1 a 2 dias", "3 a 4 dias"],
  ["Frango (inteiro ou em pedaços)", "1 a 2 dias", "3 a 4 dias"],
  ["Carne suína", "3 a 5 dias", "3 a 4 dias"],
  ["Linguiça fresca", "1 a 2 dias", "3 a 4 dias"],
  ["Peixe e frutos do mar", "1 a 2 dias", "3 a 4 dias"],
  ["Presunto e frios fatiados", "3 a 5 dias após aberto", "—"],
  ["Bacon", "7 dias após aberto", "4 a 5 dias"],
])}
<h2>Pratos prontos e sobras</h2>
${t(["Alimento", "Prazo na geladeira"], [
  ["Arroz cozido", "3 a 4 dias"],
  ["Feijão cozido", "3 a 5 dias"],
  ["Macarrão cozido", "3 a 5 dias"],
  ["Sopas e caldos", "3 a 4 dias"],
  ["Molho de tomate caseiro", "4 a 5 dias"],
  ["Pizza", "3 a 4 dias"],
  ["Saladas temperadas", "1 dia"],
  ["Maionese caseira", "Até 2 dias (ovo pasteurizado)"],
])}
<h2>Ovos e laticínios</h2>
${t(["Alimento", "Prazo"], [
  ["Ovos crus na casca", "3 a 5 semanas (dentro da validade)"],
  ["Ovo cozido com casca", "Até 7 dias"],
  ["Leite aberto", "3 a 4 dias"],
  ["Iogurte aberto", "5 a 7 dias"],
  ["Requeijão e cream cheese abertos", "Até 7 dias"],
  ["Queijo fresco (minas frescal, ricota)", "5 a 7 dias"],
  ["Queijo curado (parmesão)", "3 a 4 semanas"],
  ["Manteiga", "1 a 3 meses"],
  ["Creme de leite aberto", "3 dias"],
])}
<h2>Frutas, legumes e verduras</h2>
${t(["Alimento", "Prazo"], [
  ["Folhas (alface, rúcula) lavadas e secas", "3 a 5 dias"],
  ["Brócolis e couve-flor", "3 a 5 dias"],
  ["Cenoura", "2 a 3 semanas"],
  ["Pimentão, abobrinha, berinjela", "4 a 7 dias"],
  ["Frutas vermelhas", "2 a 3 dias"],
  ["Uva", "5 a 7 dias"],
  ["Maçã", "3 a 4 semanas"],
  ["Limão", "2 a 4 semanas"],
  ["Frutas cortadas", "2 a 3 dias"],
])}
<h2>Onde guardar cada coisa na geladeira</h2>
<ul>
<li><strong>Prateleira de baixo:</strong> carnes cruas, em recipientes fechados, para não pingar sobre outros alimentos.</li>
<li><strong>Prateleiras do meio:</strong> laticínios, ovos e sobras.</li>
<li><strong>Prateleira de cima:</strong> alimentos prontos para consumo.</li>
<li><strong>Gavetas:</strong> frutas e verduras.</li>
<li><strong>Porta:</strong> é a área mais quente. Use para bebidas, molhos e condimentos — não para leite e ovos.</li>
</ul>
<h2>A regra das 2 horas</h2>
<p>Comida cozida não deve ficar mais de 2 horas fora da geladeira (1 hora em dias acima de 32 °C). Não é preciso esperar esfriar totalmente: divida porções grandes em potes rasos para resfriar mais rápido. E lembre: cheiro, cor ou textura estranhos indicam descarte, mesmo dentro do prazo. Consulte qualquer alimento na nossa <a href="ferramenta-validade-dos-alimentos.html">ferramenta de validade dos alimentos</a>.</p>`,
  },
  {
    file: "como-congelar-alimentos.html",
    title: "Como congelar e descongelar alimentos do jeito certo",
    h1: "Como congelar e descongelar alimentos sem perder sabor",
    desc: "Guia completo de congelamento: o que pode e o que não pode congelar, prazos no freezer, como branquear legumes e as formas seguras de descongelar.",
    eyebrow: "CONSERVAÇÃO · FREEZER",
    minutes: 6,
    tools: ["ferramenta-validade-dos-alimentos.html", "ferramenta-cardapio-semanal.html"],
    recipes: ["receita-pao-de-queijo.html", "receita-coxinha-de-frango.html", "receita-pao-caseiro.html"],
    body: `
<p>O freezer é o melhor aliado de quem quer economizar e ganhar tempo. No congelamento a −18 °C, os micro-organismos param de se multiplicar — eles não morrem, mas ficam "dormindo". Por isso, a qualidade do que sai do freezer depende de como o alimento entrou: fresco, bem embalado e etiquetado.</p>
<h2>Freezer ou congelador?</h2>
<p>O congelador comum da geladeira de uma porta costuma ficar entre −6 °C e −12 °C e conserva por poucas semanas. Freezers e geladeiras duplex (com o símbolo de três estrelas ***) chegam a −18 °C e permitem os prazos da tabela abaixo.</p>
<h2>Prazos no freezer (−18 °C)</h2>
${t(["Alimento", "Prazo com boa qualidade"], [
  ["Carne bovina crua em peças", "6 a 12 meses"],
  ["Carne moída crua", "3 a 4 meses"],
  ["Frango cru em pedaços", "9 meses"],
  ["Peixe magro cru", "6 meses"],
  ["Peixe gordo (salmão) cru", "2 a 3 meses"],
  ["Linguiça crua", "1 a 2 meses"],
  ["Pratos cozidos (feijão, molhos, ensopados)", "2 a 3 meses"],
  ["Arroz cozido", "1 a 2 meses"],
  ["Pão e bolo sem recheio", "2 a 3 meses"],
  ["Legumes branqueados", "8 a 12 meses"],
  ["Frutas picadas", "8 a 12 meses"],
  ["Salgados crus empanados", "3 meses"],
])}
<p>Passado esse período, o alimento continua seguro se ficou sempre congelado, mas perde sabor e textura.</p>
<h2>O que não congela bem</h2>
<ul>
<li>Ovo cru na casca (racha) e ovo cozido (a clara fica borrachuda).</li>
<li>Folhas para salada, pepino e rabanete (ficam murchos).</li>
<li>Batata cozida inteira (fica esponjosa) — purê congela bem.</li>
<li>Maionese, cremes com amido de milho e pudins (separam e soltam água).</li>
<li>Gelatina e alimentos com muita água.</li>
</ul>
<h2>Passo a passo para congelar</h2>
<ul>
<li><strong>Esfrie rápido:</strong> divida em porções e leve à geladeira antes do freezer.</li>
<li><strong>Retire o ar:</strong> use sacos próprios ou potes do tamanho certo. Ar provoca a "queimadura de freezer".</li>
<li><strong>Congele achatado:</strong> sacos deitados congelam e descongelam mais rápido e ocupam menos espaço.</li>
<li><strong>Etiquete:</strong> nome, quantidade e data. Parece óbvio, mas evita mistério no fundo do freezer.</li>
<li><strong>Legumes:</strong> branqueie — 2 a 3 minutos em água fervente e depois água com gelo — para manter cor e textura.</li>
<li><strong>Frutas e salgados:</strong> congele espalhados numa assadeira e só depois junte no saco, para não grudarem.</li>
</ul>
<h2>Como descongelar com segurança</h2>
${t(["Método", "Como fazer", "Quando usar"], [
  ["Na geladeira", "Passe do freezer para a geladeira na véspera", "O mais seguro, para carnes e pratos prontos"],
  ["Em água fria", "Saco bem fechado submerso, trocando a água a cada 30 min", "Quando há pressa: cerca de 1 h por kg"],
  ["No micro-ondas", "Função descongelar, em etapas", "Cozinhe imediatamente depois"],
  ["Direto na panela", "Sem descongelar", "Sopas, molhos, legumes e salgados"],
])}
<p>Nunca descongele carnes sobre a pia em temperatura ambiente: a superfície entra na faixa de risco (entre 5 °C e 60 °C) enquanto o centro ainda está congelado. E evite recongelar alimentos crus já descongelados — se foram cozidos depois, aí sim podem voltar ao freezer.</p>`,
  },
  {
    file: "quanto-de-carne-por-pessoa-churrasco.html",
    title: "Quanto de carne por pessoa no churrasco? Guia de quantidades",
    h1: "Quanto de carne por pessoa no churrasco",
    desc: "Saiba quanto comprar de carne, linguiça, frango, pão de alho, carvão, cerveja e refrigerante por pessoa no churrasco, com tabela e calculadora gratuita.",
    eyebrow: "CHURRASCO · PLANEJAMENTO",
    minutes: 5,
    tools: ["ferramenta-calculadora-de-churrasco.html", "ferramenta-ponto-da-carne.html", "ferramenta-lista-de-compras.html"],
    recipes: ["receita-feijoada.html", "receita-pao-caseiro.html", "receita-batata-frita-na-air-fryer.html"],
    body: `
<p>Não existe norma oficial, mas a conta que a maioria dos churrasqueiros usa é de <strong>400 g a 500 g de carnes por adulto</strong> em um churrasco de cerca de 4 horas com acompanhamentos. Crianças comem aproximadamente metade. Se a carne for praticamente o único alimento ou o evento for longo, suba para 600 g.</p>
<p>Quer o cálculo pronto, com lista de compras? Use a <a href="ferramenta-calculadora-de-churrasco.html">calculadora de churrasco</a>: informe adultos, crianças e duração e ela calcula carnes, carvão, bebidas e acompanhamentos.</p>
<h2>Tabela de quantidade por pessoa</h2>
${t(["Item", "Por adulto", "Por criança"], [
  ["Carnes no total", "400–500 g", "200–250 g"],
  ["Carne bovina (picanha, fraldinha, maminha)", "250 g", "120 g"],
  ["Linguiça", "100 g", "50 g"],
  ["Frango (coxinha da asa, coração)", "100 g", "50 g"],
  ["Pão de alho", "1 a 2 unidades", "1 unidade"],
  ["Queijo coalho", "1 espeto", "1 espeto"],
  ["Farofa", "50 g", "30 g"],
  ["Arroz (cru)", "50 g", "30 g"],
  ["Vinagrete", "60 g", "30 g"],
  ["Cerveja", "1 a 1,5 litro", "—"],
  ["Refrigerante / suco", "600 ml", "500 ml"],
  ["Água", "500 ml", "300 ml"],
  ["Carvão", "≈ 1 kg para cada 1 kg de carne", ""],
  ["Gelo", "1 kg para cada 3 pessoas", ""],
])}
<h2>Como dividir os cortes</h2>
<p>Uma boa mistura é 50% de carne bovina, 25% de linguiça e 25% de frango ou porco. Para um churrasco mais econômico, aumente a proporção de linguiça, frango e cortes como fraldinha, acém e costela. Para um churrasco especial, inclua picanha, ancho e cupim.</p>
<h2>Ordem de servir</h2>
<ul>
<li><strong>Começo:</strong> linguiça, pão de alho, queijo coalho e coraçãozinho — ficam prontos rápido e seguram a fome.</li>
<li><strong>Meio:</strong> asinhas, fraldinha e maminha.</li>
<li><strong>Final:</strong> cortes nobres como picanha, que merecem ser servidos com calma.</li>
</ul>
<h2>Dicas de churrasqueiro</h2>
<ul>
<li>Sal grosso só na hora de ir para a grelha; sal fino ou parrilla nos cortes finos.</li>
<li>Brasa pronta é brasa coberta de cinza branca, sem chama alta.</li>
<li>Deixe a carne descansar 5 minutos antes de fatiar.</li>
<li>Frango e linguiça precisam estar bem passados: 74 °C e 71 °C no centro, respectivamente.</li>
<li>Compre 10% a mais para imprevistos — sobras viram farofa, sanduíche ou arroz carreteiro.</li>
</ul>`,
  },
  {
    file: "como-fazer-arroz-e-feijao.html",
    title: "Como fazer arroz soltinho e feijão macio: o básico bem feito",
    h1: "Como fazer arroz soltinho e feijão macio",
    desc: "Proporção de água, tempo de cozimento e truques para arroz branco soltinho e feijão macio e encorpado na panela de pressão — o prato mais brasileiro de todos.",
    eyebrow: "BÁSICOS DA COZINHA",
    minutes: 6,
    tools: ["ferramenta-tempo-de-cozimento.html", "ferramenta-conversor-de-medidas.html"],
    recipes: ["receita-baiao-de-dois.html", "receita-feijoada.html", "receita-arroz-com-pequi.html"],
    body: `
<p>Arroz e feijão estão no prato de quase todos os brasileiros e, justamente por isso, são os primeiros pratos que todo mundo quer acertar. A boa notícia: com a proporção certa e alguns cuidados, eles saem perfeitos todos os dias.</p>
<h2>Arroz branco soltinho</h2>
<p><strong>Proporção:</strong> 1 xícara de arroz agulhinha tipo 1 para 2 xícaras de água fervente (rende 3 a 4 porções).</p>
<ul>
<li>Lave o arroz em uma peneira até a água sair quase transparente — isso remove o excesso de amido que deixa o arroz grudento. (Arroz parboilizado não precisa ser lavado.)</li>
<li>Refogue 1 colher de sopa de óleo com ½ cebola e 1 dente de alho picados até murchar.</li>
<li>Junte o arroz escorrido e frite por 2 minutos, mexendo, até os grãos ficarem esbranquiçados.</li>
<li>Acrescente a água <em>fervente</em> e 1 colher de chá rasa de sal. Quando ferver de novo, baixe o fogo, tampe deixando uma fresta e cozinhe por 15 a 18 minutos.</li>
<li>Quando a água secar e aparecerem furinhos na superfície, desligue, tampe totalmente e deixe descansar por 5 minutos antes de soltar com um garfo.</li>
</ul>
${t(["Tipo de arroz", "Água por xícara", "Tempo"], [
  ["Agulhinha (branco)", "2 xícaras", "15–18 min"],
  ["Parboilizado", "2 a 2½ xícaras", "20–25 min"],
  ["Integral", "2½ a 3 xícaras", "35–45 min"],
  ["Arbóreo (risoto)", "3 a 4 xícaras de caldo, aos poucos", "18–20 min"],
  ["Basmati", "1½ xícara", "12–15 min"],
])}
<h2>Feijão na panela de pressão</h2>
<p><strong>Proporção:</strong> 2 xícaras de feijão para cerca de 6 xícaras de água (a água deve cobrir o feijão dois dedos acima). Nunca ultrapasse 2/3 da capacidade da panela de pressão.</p>
<ul>
<li>Escolha os grãos, retirando pedrinhas e grãos murchos, e lave bem.</li>
<li>Deixe de molho por 8 a 12 horas e descarte a água — isso reduz o tempo de cozimento e ajuda na digestão.</li>
<li>Cozinhe com água limpa e 2 folhas de louro: 25 a 30 minutos após pegar pressão para carioca e preto demolhados (sem molho, 40 a 50 minutos).</li>
<li>Espere a pressão sair naturalmente. Confira se os grãos estão macios.</li>
<li>Tempero: frite bacon ou linguiça (opcional), junte alho e cebola, acrescente duas conchas do feijão, amasse e devolva à panela. Ferva sem tampa por 10 minutos para engrossar e acerte o sal.</li>
</ul>
${t(["Feijão", "Com molho (pressão)", "Sem molho (pressão)"], [
  ["Carioca", "20–25 min", "35–40 min"],
  ["Preto", "25–30 min", "40–50 min"],
  ["Fradinho", "10–15 min", "20–25 min"],
  ["Branco", "20–25 min", "35–45 min"],
  ["Grão-de-bico", "25–30 min", "45–60 min"],
  ["Lentilha", "Não precisa de pressão: 20 min em panela comum", ""],
])}
<h2>Erros mais comuns</h2>
<ul>
<li><strong>Arroz empapado:</strong> excesso de água ou mexer durante o cozimento.</li>
<li><strong>Arroz cru por dentro:</strong> fogo alto demais secou a água antes do grão cozinhar. Junte ¼ de xícara de água quente e tampe.</li>
<li><strong>Feijão duro:</strong> feijão velho (mais de 6 meses) demora muito mais. Sal no início também pode endurecer a casca.</li>
<li><strong>Feijão aguado:</strong> amasse uma concha de grãos e ferva destampado.</li>
</ul>
<p>Feijão cozido congela muito bem por até 3 meses: faça uma panela grande e separe em potes para a semana.</p>`,
  },
  {
    file: "substituicoes-na-cozinha.html",
    title: "Substituições na cozinha: o que usar no lugar de ovo, leite, manteiga e mais",
    h1: "Substituições de ingredientes: guia completo",
    desc: "Acabou o ingrediente? Veja substituições testadas para ovo, leite, manteiga, fermento, creme de leite, açúcar, farinha e mais, com proporções exatas.",
    eyebrow: "GUIA PRÁTICO · INGREDIENTES",
    minutes: 6,
    tools: ["ferramenta-substituicao-de-ingredientes.html", "ferramenta-conversor-de-medidas.html"],
    recipes: ["receita-bolo-de-cenoura.html", "receita-bolo-de-chocolate.html", "receita-carbonara.html"],
    body: `
<p>Faltou um ingrediente no meio da receita? Na maioria dos casos dá para seguir em frente. O segredo é entender a <em>função</em> do ingrediente: ele dá estrutura, umidade, gordura, acidez ou crescimento? Escolha um substituto que cumpra o mesmo papel. Para consultar rapidamente, use a <a href="ferramenta-substituicao-de-ingredientes.html">ferramenta de substituição de ingredientes</a>.</p>
<h2>Ovos</h2>
${t(["Para substituir 1 ovo", "Use", "Melhor em"], [
  ["Linhaça", "1 colher (sopa) de linhaça moída + 3 colheres (sopa) de água, 10 min", "Bolos, cookies, panquecas"],
  ["Chia", "1 colher (sopa) de chia + 3 colheres (sopa) de água", "Bolos e pães integrais"],
  ["Banana", "½ banana madura amassada", "Bolos e panquecas doces"],
  ["Purê de maçã", "¼ de xícara", "Bolos e muffins"],
  ["Iogurte", "¼ de xícara", "Bolos (não vegano)"],
  ["Aquafaba", "3 colheres (sopa) da água do grão-de-bico", "Merengues e mousses"],
])}
<h2>Laticínios</h2>
${t(["Ingrediente", "Substituto", "Proporção"], [
  ["Leite", "Bebida vegetal sem açúcar ou água com 1 colher de manteiga", "1:1"],
  ["Leitelho (buttermilk)", "Leite + 1 colher (sopa) de limão ou vinagre, 10 min", "1 xícara"],
  ["Creme de leite", "Leite + manteiga derretida (¾ de xícara + ¼ de xícara)", "1 xícara"],
  ["Creme de leite (vegano)", "Creme de castanha-de-caju ou leite de coco", "1:1"],
  ["Manteiga (bolos)", "Óleo vegetal", "¾ da quantidade"],
  ["Manteiga (assados)", "Margarina", "1:1"],
  ["Requeijão", "Cream cheese ou ricota batida com um pouco de leite", "1:1"],
  ["Iogurte natural", "Coalhada ou creme azedo", "1:1"],
])}
<h2>Fermentos e farinhas</h2>
${t(["Ingrediente", "Substituto", "Proporção"], [
  ["1 colher (chá) de fermento químico", "¼ colher (chá) de bicarbonato + ½ colher (chá) de limão ou vinagre", "—"],
  ["10 g de fermento biológico seco", "30 g de fermento biológico fresco", "1:3"],
  ["Farinha de trigo (empanar)", "Farinha de arroz, fubá ou amido de milho", "1:1"],
  ["Farinha de rosca", "Biscoito de água e sal triturado, aveia ou flocos de milho", "1:1"],
  ["Amido de milho (engrossar)", "Farinha de trigo", "2 de farinha : 1 de amido"],
])}
<h2>Açúcares e outros</h2>
${t(["Ingrediente", "Substituto", "Proporção"], [
  ["Açúcar refinado", "Açúcar demerara ou mascavo (sabor mais caramelado)", "1:1"],
  ["1 xícara de açúcar", "¾ de xícara de mel (reduza ¼ do líquido)", "—"],
  ["Açúcar de confeiteiro", "Açúcar refinado batido no liquidificador com 1 colher de amido", "1:1"],
  ["Leite condensado (395 g)", "1 xícara de leite em pó + ½ de açúcar + ½ de água quente + 1 colher de manteiga, batidos", "1 lata"],
  ["Vinho no molho", "Caldo + 1 colher (sopa) de vinagre de vinho", "1:1"],
  ["Limão", "Vinagre (em marinadas)", "1:1"],
  ["Cebola", "Cebolinha, alho-poró ou cebola em pó (1 colher de chá = 1 cebola média)", "—"],
])}
<h2>Quando não substituir</h2>
<p>Em receitas de confeitaria muito técnicas (macarons, pão de ló, suspiros), o ovo e o açúcar têm papel estrutural difícil de imitar. Nelas, prefira deixar para outro dia. Para trocas em quantidade, nossa <a href="ferramenta-conversor-de-medidas.html">tabela de medidas</a> ajuda a converter xícaras em gramas.</p>`,
  },
  {
    file: "tabela-de-medidas-caseiras.html",
    title: "Tabela de medidas caseiras: xícara, colher e copo em gramas",
    h1: "Tabela de medidas caseiras: quanto pesa uma xícara?",
    desc: "Quantos gramas tem uma xícara de farinha, açúcar, arroz, manteiga e leite? Tabela de equivalências de xícara, colher de sopa, colher de chá e copo americano.",
    eyebrow: "GUIA PRÁTICO · MEDIDAS",
    minutes: 5,
    tools: ["ferramenta-conversor-de-medidas.html", "ferramenta-ajustar-receita.html"],
    recipes: ["receita-bolo-de-cenoura.html", "receita-pao-caseiro.html", "receita-cheesecake-nova-york.html"],
    body: `
<p>A maior parte das receitas caseiras brasileiras usa medidas de volume: xícara, colher de sopa e copo americano. Mas uma xícara de farinha não pesa o mesmo que uma xícara de açúcar — cada ingrediente tem densidade diferente. Esta tabela usa a <strong>xícara padrão de 240 ml</strong>, a colher de sopa de 15 ml e a colher de chá de 5 ml, com ingredientes nivelados (sem montinho).</p>
<p>Para converter qualquer quantidade automaticamente, use o <a href="ferramenta-conversor-de-medidas.html">conversor de medidas</a>.</p>
<h2>Equivalências de volume</h2>
${t(["Medida", "Mililitros"], [
  ["1 xícara (chá)", "240 ml"],
  ["½ xícara", "120 ml"],
  ["⅓ de xícara", "80 ml"],
  ["¼ de xícara", "60 ml"],
  ["1 copo americano", "190 ml"],
  ["1 colher de sopa", "15 ml"],
  ["1 colher de sobremesa", "10 ml"],
  ["1 colher de chá", "5 ml"],
  ["1 colher de café", "2,5 ml"],
  ["1 lata de leite condensado (como medida)", "≈ 300 ml"],
])}
<h2>Quanto pesa 1 xícara de cada ingrediente</h2>
${t(["Ingrediente", "1 xícara", "1 colher de sopa"], [
  ["Farinha de trigo", "120 g", "7,5 g"],
  ["Açúcar refinado", "200 g", "12,5 g"],
  ["Açúcar mascavo", "180 g", "11 g"],
  ["Açúcar de confeiteiro", "120 g", "7,5 g"],
  ["Chocolate em pó", "90 g", "6 g"],
  ["Amido de milho", "120 g", "8 g"],
  ["Fubá", "130 g", "8 g"],
  ["Polvilho", "150 g", "9 g"],
  ["Aveia em flocos", "90 g", "6 g"],
  ["Arroz cru", "185 g", "12 g"],
  ["Feijão cru", "190 g", "12 g"],
  ["Manteiga", "227 g", "14 g"],
  ["Óleo", "220 g (240 ml)", "13,5 g"],
  ["Leite / água", "240 g (240 ml)", "15 g"],
  ["Mel", "340 g", "21 g"],
  ["Coco ralado", "80 g", "5 g"],
  ["Queijo ralado", "100 g", "6 g"],
  ["Castanhas picadas", "120 g", "7,5 g"],
  ["Sal refinado", "290 g", "18 g"],
  ["Fermento químico", "—", "14 g"],
])}
<h2>Como medir corretamente</h2>
<ul>
<li><strong>Farinhas:</strong> não afunde a xícara no pacote. Coloque a farinha com uma colher e nivele com as costas de uma faca. Afundar compacta e pode colocar até 30% a mais.</li>
<li><strong>Açúcar mascavo:</strong> é medido levemente pressionado.</li>
<li><strong>Líquidos:</strong> use jarra medidora transparente e leia na altura dos olhos.</li>
<li><strong>Manteiga:</strong> um tablete de 200 g equivale a quase 1 xícara.</li>
<li><strong>Melhor de tudo:</strong> uma balança de cozinha. Ela custa pouco e acaba com as dúvidas, especialmente em pães e bolos.</li>
</ul>
<h2>Temperaturas de forno</h2>
${t(["Forno", "Temperatura"], [
  ["Baixo", "150 °C a 160 °C"],
  ["Médio", "170 °C a 190 °C"],
  ["Médio-alto", "200 °C a 220 °C"],
  ["Alto", "230 °C a 250 °C"],
])}`,
  },
  {
    file: "marmitas-da-semana.html",
    title: "Marmitas da semana: como planejar, montar e congelar",
    h1: "Marmitas da semana: guia para economizar tempo e dinheiro",
    desc: "Aprenda a planejar o cardápio, cozinhar em lote no domingo e montar marmitas saudáveis que duram a semana — com cardápio pronto, lista de compras e prazos de conservação.",
    eyebrow: "ORGANIZAÇÃO · DIA A DIA",
    minutes: 7,
    tools: ["ferramenta-cardapio-semanal.html", "ferramenta-lista-de-compras.html", "ferramenta-validade-dos-alimentos.html"],
    recipes: ["receita-estrogonofe-de-carne.html", "receita-baiao-de-dois.html", "receita-butter-chicken.html"],
    body: `
<p>Preparar as refeições da semana de uma vez — o famoso <em>meal prep</em> — economiza tempo, reduz gastos com delivery e ajuda a comer melhor. Com 2 a 3 horas no domingo, dá para deixar almoços prontos de segunda a sexta.</p>
<h2>1. Planeje o cardápio</h2>
<p>Escolha uma estrutura fixa e varie os sabores: <strong>1 carboidrato + 1 proteína + 2 legumes ou verduras</strong>. Use nosso <a href="ferramenta-cardapio-semanal.html">planejador de cardápio semanal</a> para montar a semana e gerar a lista de compras automaticamente.</p>
<h2>2. Cozinhe em lote</h2>
<ul>
<li><strong>Bases:</strong> uma panela de arroz, uma de feijão e uma de grão (lentilha, grão-de-bico).</li>
<li><strong>Proteínas:</strong> duas opções diferentes, por exemplo frango desfiado temperado e carne moída refogada.</li>
<li><strong>Legumes:</strong> uma assadeira de legumes assados (abóbora, cenoura, brócolis, abobrinha) e uma porção cozida no vapor.</li>
<li><strong>Molhos:</strong> molho de tomate caseiro rende várias combinações.</li>
</ul>
<h2>3. Monte as marmitas</h2>
<ul>
<li>Espere esfriar por até 1 hora e feche.</li>
<li>Use potes de vidro com tampa hermética, que vão ao micro-ondas (sem a tampa) e não pegam cheiro.</li>
<li>Guarde de 3 a 4 marmitas na geladeira e congele o restante.</li>
<li>Saladas cruas e folhas vão em potes separados e são temperadas na hora.</li>
</ul>
<h2>Quanto tempo dura a marmita</h2>
${t(["Onde", "Prazo", "Dica"], [
  ["Geladeira (até 5 °C)", "3 a 4 dias", "Coma primeiro as que têm peixe ou frutos do mar"],
  ["Freezer (−18 °C)", "Até 3 meses", "Etiquete com nome e data"],
  ["Bolsa térmica com gelo", "Até 4 horas", "Leve direto da geladeira"],
])}
<h2>O que congela bem e o que evitar</h2>
<p><strong>Congela bem:</strong> arroz, feijão, carnes cozidas e ensopadas, molhos, purês, legumes assados, lasanha, escondidinho e sopas. <strong>Evite congelar:</strong> batata cozida em pedaços, folhas cruas, ovo cozido e maionese.</p>
<h2>Cardápio exemplo para 5 dias</h2>
${t(["Dia", "Marmita"], [
  ["Segunda", "Arroz, feijão, frango desfiado com milho e brócolis"],
  ["Terça", "Arroz, carne moída com abobrinha e cenoura assada"],
  ["Quarta", "Baião de dois com legumes assados"],
  ["Quinta", "Macarrão integral ao molho de tomate com frango e espinafre"],
  ["Sexta", "Arroz, lentilha, carne moída e abóbora assada"],
])}
<h2>Como reaquecer</h2>
<p>No micro-ondas, aqueça por 2 a 3 minutos, mexa na metade e verifique se está bem quente no centro (acima de 74 °C). Marmita congelada: passe para a geladeira na noite anterior ou use a função descongelar antes de aquecer.</p>`,
  },
  {
    file: "quanto-tempo-cozinhar-ovo.html",
    title: "Quanto tempo cozinhar ovo: mole, cremoso e duro",
    h1: "Quanto tempo cozinhar ovo: o ponto certo de cada gema",
    desc: "Tempo exato para ovo cozido mole, cremoso (ovo perfeito) e duro, como descascar fácil, ovo poché, ovo frito e ovo na air fryer.",
    eyebrow: "BÁSICOS DA COZINHA",
    minutes: 4,
    tools: ["ferramenta-timer-de-cozinha.html", "ferramenta-tempo-de-cozimento.html"],
    recipes: ["receita-ramen-shoyu.html", "receita-carbonara.html", "receita-pudim-de-leite-condensado.html"],
    body: `
<p>"Quanto tempo cozinhar ovo" é uma das perguntas mais buscadas na cozinha — e com razão: 2 minutos de diferença transformam uma gema líquida em uma gema esfarelada e esverdeada. Os tempos abaixo são para <strong>ovos grandes, saídos da geladeira e colocados em água já fervendo</strong>.</p>
<p>Use nosso <a href="ferramenta-timer-de-cozinha.html">timer de cozinha</a> com os atalhos de ovo para não errar.</p>
<h2>Tabela de tempo do ovo cozido</h2>
${t(["Tempo", "Resultado", "Uso"], [
  ["5 minutos", "Clara firme, gema totalmente líquida", "Ovo quente com torradas"],
  ["6 minutos", "Gema líquida e quente", "Sobre saladas e arroz"],
  ["6½ minutos", "Gema cremosa, 'ovo perfeito'", "Ramen (ovo marinado)"],
  ["8 minutos", "Gema macia, cremosa nas bordas", "Saladas e lanches"],
  ["10 minutos", "Gema firme, ainda úmida", "Recheios"],
  ["12 minutos", "Ovo duro clássico", "Ovo recheado, maionese de batata"],
  ["15 minutos ou mais", "Gema seca com anel esverdeado", "Evite: passou do ponto"],
])}
<h2>Passo a passo</h2>
<ul>
<li>Ferva água suficiente para cobrir os ovos em 2 cm.</li>
<li>Abaixe o fogo para médio e coloque os ovos com uma escumadeira, delicadamente.</li>
<li>Marque o tempo assim que os ovos entrarem.</li>
<li>Transfira imediatamente para uma tigela com água e gelo por 3 minutos. Isso interrompe o cozimento e facilita descascar.</li>
</ul>
<h2>Como descascar ovo cozido sem grudar</h2>
<p>Ovos muito frescos grudam mais na casca. Ovos com 5 a 7 dias descascam melhor. Depois do choque térmico, bata a base (onde fica a câmara de ar), role o ovo na bancada e descasque debaixo de um fio de água.</p>
<h2>Outros preparos</h2>
${t(["Preparo", "Como fazer"], [
  ["Ovo poché", "Água quase fervendo com 1 colher de vinagre, faça um redemoinho e cozinhe 3 minutos"],
  ["Ovo frito", "Frigideira média com fio de óleo, 2 a 3 minutos; tampe para firmar a clara"],
  ["Ovo mexido cremoso", "Fogo baixo, mexendo sempre; desligue ainda úmido"],
  ["Ovo na air fryer (na casca)", "160 °C por 13 a 15 minutos e água gelada depois"],
  ["Ovo no micro-ondas", "Nunca com casca (explode). Em xícara untada, gema furada, 40 a 60 segundos"],
])}
<h2>Por que a gema fica verde?</h2>
<p>O anel esverdeado é sulfeto de ferro, formado quando o ovo cozinha demais. Não faz mal à saúde, mas indica sabor e textura piores. O choque em água gelada ajuda a evitar.</p>
<h2>Conservação</h2>
<p>Ovo cozido com casca dura até 7 dias na geladeira. Descascado, consuma em até 2 dias. Não congele ovo cozido inteiro: a clara fica borrachuda.</p>`,
  },
  {
    file: "frutas-e-legumes-da-estacao.html",
    title: "Frutas, legumes e verduras da estação: calendário mês a mês",
    h1: "Frutas e legumes da estação: o que comprar em cada mês",
    desc: "Calendário de safra de frutas, legumes e verduras no Brasil, mês a mês, para comprar mais barato, com mais sabor e menos agrotóxico.",
    eyebrow: "FEIRA · ECONOMIA",
    minutes: 5,
    tools: ["ferramenta-lista-de-compras.html", "ferramenta-o-que-cozinhar-hoje.html"],
    recipes: ["receita-arroz-com-pequi.html", "receita-bolo-de-milho.html", "receita-bolo-de-cenoura.html"],
    body: `
<p>Comprar alimentos da estação é a forma mais simples de economizar na feira. Na safra, a oferta é maior, o preço cai e o sabor é melhor, porque o produto é colhido no ponto certo e viaja menos. O calendário abaixo é uma referência geral para o Brasil, baseada nos períodos de maior oferta nas centrais de abastecimento; ele pode variar por região e pelo clima de cada ano.</p>
<h2>Calendário de safra</h2>
${t(["Mês", "Frutas", "Legumes e verduras"], [
  ["Janeiro", "Abacaxi, manga, melancia, pêssego, uva, ameixa", "Abobrinha, berinjela, pepino, pimentão, quiabo, milho verde"],
  ["Fevereiro", "Goiaba, manga, maracujá, melancia, uva, figo", "Abóbora, berinjela, chuchu, jiló, pimentão, quiabo"],
  ["Março", "Banana-prata, caqui, goiaba, maçã, pera, maracujá", "Abóbora, cenoura, chuchu, inhame, pimentão"],
  ["Abril", "Abacate, caqui, kiwi, laranja, maçã, tangerina", "Abóbora, batata-doce, beterraba, cenoura, mandioquinha"],
  ["Maio", "Abacate, banana-nanica, caqui, kiwi, laranja, tangerina", "Batata-doce, beterraba, brócolis, couve-flor, mandioca, mandioquinha"],
  ["Junho", "Abacate, laranja, mexerica, morango, kiwi", "Brócolis, cenoura, couve, ervilha, mandioca, milho, repolho"],
  ["Julho", "Laranja, mexerica, morango, caju (Nordeste)", "Batata, brócolis, couve-flor, espinafre, rabanete, repolho"],
  ["Agosto", "Laranja, morango, tangerina, jabuticaba", "Alho-poró, brócolis, couve-flor, espinafre, rúcula"],
  ["Setembro", "Acerola, carambola, laranja, morango, jabuticaba", "Alface, aspargo, beterraba, cenoura, ervilha"],
  ["Outubro", "Abacaxi, banana-maçã, caju, manga, pequi (Cerrado)", "Abobrinha, alface, beterraba, pepino, vagem"],
  ["Novembro", "Abacaxi, caju, cereja, manga, melão, pêssego", "Abobrinha, berinjela, pepino, pimentão, tomate"],
  ["Dezembro", "Ameixa, cereja, lichia, manga, nectarina, uva", "Berinjela, pepino, pimentão, quiabo, tomate, vagem"],
])}
<h2>Dicas para a feira</h2>
<ul>
<li><strong>Vá no fim da feira</strong> (a "hora da xepa"): muitos feirantes baixam o preço para não levar mercadoria de volta.</li>
<li><strong>Planeje antes:</strong> uma <a href="ferramenta-lista-de-compras.html">lista de compras</a> evita excessos e desperdício.</li>
<li><strong>Compre pelo ponto de consumo:</strong> bananas e abacates em vários estágios de maturação duram a semana toda.</li>
<li><strong>Congele o excedente:</strong> frutas da safra viram polpa para sucos e vitaminas. Veja <a href="como-congelar-alimentos.html">como congelar alimentos</a>.</li>
</ul>
<h2>Como higienizar frutas e verduras</h2>
<p>Retire partes estragadas, lave em água corrente e deixe de molho por 10 a 15 minutos em solução clorada (1 colher de sopa de água sanitária própria para alimentos em 1 litro de água — confira no rótulo se o produto é indicado para esse uso). Depois, enxágue bem em água corrente. Higienize perto do consumo: verduras lavadas duram menos.</p>`,
  },
];
