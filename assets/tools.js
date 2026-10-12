"use strict";
// Ferramentas do Clube da Receita. Cada bloco é ativado pelo atributo
// data-tool da página. Não depende de bibliotecas externas.
(() => {
  const q = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, text) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    if (text != null) n.textContent = text;
    return n;
  };
  const norm = (s) =>
    String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  const fmt = (n, d = 1) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: d }).format(n);
  const int = (v, min = 0, max = 100000) =>
    Math.min(max, Math.max(min, Math.round(Number(v) || 0)));
  // site.js (carregado depois) define window.ClubeShopping; acesso tardio.
  const shop = {
    get: () => window.ClubeShopping.get(),
    set: (v) => window.ClubeShopping.set(v),
    add: (v) => window.ClubeShopping.add(v),
  };
  const say = (m) => (window.clubeToast ? window.clubeToast(m) : null);

  // Converte "1 1/2", "½", "0,5", "3/4" em número.
  const FRAC = { "½": 0.5, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 0.25, "¾": 0.75, "⅛": 0.125 };
  function parseAmount(str) {
    let s = String(str).trim().replace(",", ".");
    let total = 0;
    for (const [k, v] of Object.entries(FRAC))
      if (s.includes(k)) {
        total += v;
        s = s.replace(k, " ");
      }
    s.trim()
      .split(/\s+/)
      .filter(Boolean)
      .forEach((p) => {
        if (/^\d+\/\d+$/.test(p)) {
          const [a, b] = p.split("/").map(Number);
          if (b) total += a / b;
        } else if (!isNaN(Number(p))) total += Number(p);
      });
    return total;
  }
  function table(head, rows) {
    const wrap = el("div", { class: "table-wrap" });
    const t = el("table", { class: "data-table" });
    const th = el("tr");
    head.forEach((h) => th.append(el("th", {}, h)));
    t.append(el("thead"));
    t.tHead.append(th);
    const tb = el("tbody");
    rows.forEach((r) => {
      const tr = el("tr");
      r.forEach((c) => tr.append(el("td", {}, c)));
      tb.append(tr);
    });
    t.append(tb);
    wrap.append(t);
    return wrap;
  }
  function chips(container, items, onPick, active) {
    container.replaceChildren();
    items.forEach((it) => {
      const b = el("button", { class: "chip", type: "button", "aria-pressed": String(it === active) }, it);
      b.addEventListener("click", () => onPick(it));
      container.append(b);
    });
  }

  /* ---------- 1. Conversor de medidas ---------- */
  const DENS = {
    // gramas por ml
    "Farinha de trigo": 0.5, "Açúcar refinado": 0.833, "Açúcar mascavo": 0.75,
    "Açúcar de confeiteiro": 0.5, "Chocolate em pó": 0.375, "Cacau em pó": 0.375,
    "Amido de milho": 0.5, "Fubá": 0.54, "Polvilho": 0.625, "Aveia em flocos": 0.375,
    "Farinha de rosca": 0.46, "Farinha de mandioca": 0.6, "Arroz cru": 0.77,
    "Feijão cru": 0.79, "Lentilha crua": 0.8, "Manteiga": 0.946, "Óleo": 0.917,
    "Azeite": 0.917, "Leite": 1.03, "Água": 1, "Creme de leite": 1, "Leite condensado": 1.3,
    "Mel": 1.42, "Iogurte": 1.03, "Coco ralado": 0.33, "Queijo ralado": 0.42,
    "Castanhas picadas": 0.5, "Uvas-passas": 0.62, "Sal refinado": 1.2,
    "Fermento químico": 0.93, "Gotas de chocolate": 0.71,
  };
  const UNITS = {
    "xícara (240 ml)": 240, "copo americano (190 ml)": 190, "colher de sopa (15 ml)": 15,
    "colher de sobremesa (10 ml)": 10, "colher de chá (5 ml)": 5, "colher de café (2,5 ml)": 2.5,
    ml: 1, litro: 1000, gramas: "g", quilos: "kg",
  };
  function initConverter(root) {
    const amount = q("#cv-amount", root), from = q("#cv-from", root), to = q("#cv-to", root);
    const ing = q("#cv-ingredient", root), out = q("#cv-result", root), tbl = q("#cv-table", root);
    Object.keys(UNITS).forEach((u) => {
      from.append(el("option", { value: u }, u));
      to.append(el("option", { value: u }, u));
    });
    Object.keys(DENS).forEach((i) => ing.append(el("option", { value: i }, i)));
    from.value = "xícara (240 ml)";
    to.value = "gramas";
    const toMl = (val, unit, d) =>
      UNITS[unit] === "g" ? val / d : UNITS[unit] === "kg" ? (val * 1000) / d : val * UNITS[unit];
    const fromMl = (ml, unit, d) =>
      UNITS[unit] === "g" ? ml * d : UNITS[unit] === "kg" ? (ml * d) / 1000 : ml / UNITS[unit];
    function update() {
      const d = DENS[ing.value], v = parseAmount(amount.value);
      const res = fromMl(toMl(v, from.value, d), to.value, d);
      out.textContent = v > 0
        ? `${amount.value} ${from.value} de ${ing.value.toLowerCase()} ≈ ${fmt(res, res < 10 ? 2 : 0)} ${to.value}`
        : "Digite uma quantidade.";
      tbl.replaceChildren(
        table(["Medida", "Peso aproximado"], [
          ["1 xícara", fmt(240 * d, 0) + " g"], ["½ xícara", fmt(120 * d, 0) + " g"],
          ["⅓ de xícara", fmt(80 * d, 0) + " g"], ["¼ de xícara", fmt(60 * d, 0) + " g"],
          ["1 copo americano", fmt(190 * d, 0) + " g"], ["1 colher de sopa", fmt(15 * d, 1) + " g"],
          ["1 colher de chá", fmt(5 * d, 1) + " g"], ["100 g equivalem a", fmt(100 / d / 240, 2) + " xícara"],
        ]),
      );
    }
    [amount, from, to, ing].forEach((e) => e.addEventListener("input", update));
    update();
  }

  /* ---------- 2. Calculadora de churrasco ---------- */
  const BBQ = {
    eco: [["Linguiça toscana", 0.35], ["Coxa/sobrecoxa e asinhas de frango", 0.25], ["Fraldinha ou acém", 0.25], ["Costela suína", 0.15]],
    trad: [["Picanha ou maminha", 0.3], ["Fraldinha", 0.2], ["Linguiça toscana", 0.25], ["Frango (asinha/coração)", 0.25]],
    prem: [["Picanha", 0.35], ["Ancho / bife de chorizo", 0.25], ["Cupim ou costela bovina", 0.15], ["Linguiça artesanal", 0.15], ["Coração de frango", 0.1]],
  };
  let lastBbq = [];
  function initBbq(root) {
    const ids = ["bbq-adults", "bbq-kids", "bbq-drinkers", "bbq-duration", "bbq-style"];
    const f = Object.fromEntries(ids.map((i) => [i, q("#" + i, root)]));
    const out = q("#bbq-result", root);
    function update() {
      const a = int(f["bbq-adults"].value, 0, 500), k = int(f["bbq-kids"].value, 0, 500);
      const dr = Math.min(a, int(f["bbq-drinkers"].value, 0, 500));
      const dur = Number(f["bbq-duration"].value), style = f["bbq-style"].value;
      const meatKg = ((a * 0.45 + k * 0.225) * dur * 1.1);
      const rows = BBQ[style].map(([n, p]) => [n, fmt(meatKg * p, 1) + " kg"]);
      const people = a + k;
      const extras = [
        ["Pão de alho", int(a * 1.5 + k) + " unidades"],
        ["Queijo coalho (espetos)", int(people * 0.8) + " unidades"],
        ["Farofa pronta", fmt(people * 0.05, 1) + " kg"],
        ["Arroz (cru)", fmt(people * 0.05, 1) + " kg"],
        ["Vinagrete: tomate", fmt(people * 0.06, 1) + " kg"],
        ["Cerveja", fmt(dr * 1.3 * dur, 0) + " litros (≈ " + int((dr * 1.3 * dur) / 0.35) + " latas)"],
        ["Refrigerante e suco", fmt(people * 0.6 * dur, 0) + " litros"],
        ["Água", fmt(people * 0.5 * dur, 0) + " litros"],
        ["Carvão", int(Math.ceil(meatKg)) + " kg (≈ " + Math.max(1, Math.ceil(meatKg / 5)) + " sacos de 5 kg)"],
        ["Gelo", int(Math.ceil(people / 3) * 1) + " kg (mínimo)"],
        ["Sal grosso", "1 kg"],
      ];
      lastBbq = [...rows, ...extras].map((r) => `${r[1]} — ${r[0]}`);
      out.replaceChildren(
        el("p", { class: "tool-result" }, `Total de carnes: ${fmt(meatKg, 1)} kg para ${people} pessoas (já com 10% de margem).`),
        table(["Carnes", "Quantidade"], rows),
        table(["Acompanhamentos e bebidas", "Quantidade"], extras),
      );
      const share = q("#bbq-share", root);
      share.href = "https://wa.me/?text=" + encodeURIComponent("Lista do churrasco (Clube da Receita):\n" + lastBbq.join("\n"));
    }
    ids.forEach((i) => f[i].addEventListener("input", update));
    q("#bbq-add", root).addEventListener("click", () => {
      shop.add(lastBbq);
      say("Itens enviados para a sua lista de compras.");
    });
    update();
  }

  /* ---------- 3. Calculadora de festa ---------- */
  let lastParty = [];
  function initParty(root) {
    const a = q("#pt-adults", root), k = q("#pt-kids", root), d = q("#pt-duration", root), m = q("#pt-meal", root);
    const out = q("#pt-result", root);
    function update() {
      const A = int(a.value, 0, 1000), K = int(k.value, 0, 1000), D = Number(d.value), M = m.value === "1";
      const salg = Math.ceil(((M ? 6 : 13) * A + (M ? 4 : 8) * K) * D);
      const doces = Math.ceil((5 * A + 6 * K) * D);
      const bolo = (0.12 * A + 0.08 * K);
      const refri = (0.6 * A + 0.5 * K) * D, agua = 0.3 * (A + K) * D;
      const rows = [
        ["Salgados no total", salg + " unidades (≈ " + Math.ceil(salg / 100) + " cento(s))"],
        ["— sugestão: coxinha", Math.round(salg * 0.3) + " un."],
        ["— sugestão: risoles/bolinha de queijo", Math.round(salg * 0.3) + " un."],
        ["— sugestão: esfiha/empadinha", Math.round(salg * 0.2) + " un."],
        ["— sugestão: quibe/enroladinho", Math.round(salg * 0.2) + " un."],
        ["Docinhos", doces + " unidades"],
        ["Bolo", fmt(bolo, 1) + " kg"],
        ["Refrigerante e suco", fmt(refri, 0) + " litros"],
        ["Água", fmt(agua, 0) + " litros"],
        ["Copos descartáveis", (A + K) * 3 + " unidades"],
        ["Guardanapos", (A + K) * 5 + " unidades"],
      ];
      lastParty = rows.filter((r) => !r[0].startsWith("—")).map((r) => `${r[1]} — ${r[0]}`);
      out.replaceChildren(table(["Item", "Quantidade"], rows));
    }
    [a, k, d, m].forEach((e) => e.addEventListener("input", update));
    q("#pt-add", root).addEventListener("click", () => {
      shop.add(lastParty);
      say("Itens enviados para a sua lista de compras.");
    });
    update();
  }

  /* ---------- 4. Substituições ---------- */
  const SUBS = [
    ["Ovo (1 unidade)", "1 colher (sopa) de linhaça moída + 3 colheres (sopa) de água, descanse 10 min", "Bolos, cookies, panquecas"],
    ["Ovo (1 unidade)", "½ banana madura amassada ou ¼ de xícara de purê de maçã", "Bolos doces"],
    ["Ovo (1 unidade)", "3 colheres (sopa) de aquafaba (água do grão-de-bico)", "Merengues, mousses"],
    ["Ovo (1 unidade)", "¼ de xícara de iogurte natural", "Bolos e muffins"],
    ["Leite", "Bebida vegetal sem açúcar (aveia, soja, amêndoa) na mesma quantidade", "Bolos, molhos, vitaminas"],
    ["Leite", "½ xícara de leite em pó + 1 xícara de água", "Qualquer receita"],
    ["Leitelho (buttermilk)", "1 xícara de leite + 1 colher (sopa) de limão ou vinagre, 10 min", "Panquecas, bolos"],
    ["Creme de leite", "¾ de xícara de leite + ¼ de xícara de manteiga derretida", "Molhos e sopas"],
    ["Creme de leite", "Leite de coco ou creme de castanha-de-caju (1:1)", "Versões veganas"],
    ["Manteiga", "Óleo vegetal: use ¾ da quantidade", "Bolos e massas"],
    ["Manteiga", "Margarina (1:1)", "Assados em geral"],
    ["Manteiga", "Purê de abacate (1:1)", "Brownies e bolos de chocolate"],
    ["Óleo", "Manteiga derretida (1¼ da quantidade) ou purê de maçã", "Bolos"],
    ["Fermento químico (1 colher de chá)", "¼ colher (chá) de bicarbonato + ½ colher (chá) de limão ou vinagre", "Bolos e panquecas"],
    ["Fermento biológico seco (10 g)", "30 g de fermento biológico fresco", "Pães"],
    ["Bicarbonato", "3 vezes a quantidade em fermento químico", "Bolos"],
    ["Farinha de trigo (engrossar)", "Metade da quantidade em amido de milho", "Molhos e cremes"],
    ["Farinha de trigo (empanar)", "Farinha de arroz, fubá ou farinha panko", "Empanados"],
    ["Farinha de rosca", "Biscoito de água e sal triturado, aveia ou flocos de milho", "Empanados"],
    ["Amido de milho", "2 vezes a quantidade em farinha de trigo", "Engrossar"],
    ["Açúcar refinado", "Açúcar demerara ou mascavo (1:1, sabor mais caramelado)", "Bolos e biscoitos"],
    ["Açúcar (1 xícara)", "¾ de xícara de mel, reduzindo ¼ de xícara do líquido", "Bolos e pães doces"],
    ["Açúcar de confeiteiro", "Açúcar refinado batido no liquidificador com 1 colher (chá) de amido", "Coberturas"],
    ["Leite condensado (1 lata)", "1 xícara de leite em pó + ½ de açúcar + ½ de água quente + 1 colher de manteiga, batidos", "Doces"],
    ["Chocolate em pó", "Cacau em pó + 1 colher (sopa) de açúcar para cada 3 de cacau", "Bolos e brigadeiros"],
    ["Chocolate meio amargo (30 g)", "3 colheres (sopa) de cacau + 1 colher (sopa) de manteiga + 1 de açúcar", "Ganache e bolos"],
    ["Requeijão", "Cream cheese ou ricota batida com um pouco de leite", "Recheios e molhos"],
    ["Cream cheese", "Ricota batida com iogurte natural", "Recheios, cheesecake mais leve"],
    ["Iogurte natural", "Coalhada ou creme azedo (1:1)", "Molhos e bolos"],
    ["Queijo parmesão", "Queijo meia cura bem ralado", "Gratinados"],
    ["Vinho branco", "Caldo de legumes + 1 colher (sopa) de vinagre de maçã", "Risotos e molhos"],
    ["Vinho tinto", "Caldo de carne + 1 colher (sopa) de vinagre de vinho", "Ensopados"],
    ["Limão", "Vinagre (1:1) em marinadas; laranja em sobremesas", "Marinadas"],
    ["Cebola", "Alho-poró, cebolinha ou 1 colher (chá) de cebola em pó por cebola", "Refogados"],
    ["Alho (1 dente)", "⅛ colher (chá) de alho em pó", "Refogados"],
    ["Ervas frescas (1 colher de sopa)", "1 colher (chá) da erva seca", "Molhos e assados"],
    ["Molho de tomate", "Tomates frescos picados cozidos por 15 min ou extrato diluído", "Massas"],
    ["Extrato de tomate (1 colher)", "3 colheres de molho de tomate reduzido", "Molhos"],
    ["Shoyu", "Molho inglês com uma pitada de sal", "Marinadas"],
    ["Arroz arbóreo", "Arroz agulhinha não lavado (fica menos cremoso)", "Risoto"],
    ["Polvilho azedo", "Polvilho doce (pão de queijo menos crescido)", "Pão de queijo"],
    ["Dendê", "Azeite com colorau (cor, mas sem o mesmo sabor)", "Moquecas"],
    ["Guanciale", "Bacon ou pancetta", "Carbonara"],
  ];
  function initSubs(root) {
    const input = q("#sub-search", root), list = q("#sub-results", root), ch = q("#sub-chips", root);
    const quick = ["Ovo", "Leite", "Manteiga", "Fermento", "Creme de leite", "Açúcar", "Leite condensado", "Farinha"];
    function render() {
      const s = norm(input.value);
      const rows = SUBS.filter((r) => !s || norm(r.join(" ")).includes(s));
      list.replaceChildren(
        rows.length
          ? table(["Ingrediente", "Substitua por", "Funciona em"], rows)
          : el("p", { class: "muted" }, "Nenhuma substituição encontrada. Tente outra palavra."),
      );
      chips(ch, quick, (c) => { input.value = c; render(); }, quick.find((c) => norm(c) === s));
    }
    input.addEventListener("input", render);
    render();
  }

  /* ---------- 5. Forno ↔ air fryer e °C/°F ---------- */
  function initAirfryer(root) {
    const t = q("#af-temp", root), m = q("#af-time", root), dir = q("#af-dir", root), out = q("#af-result", root);
    const c = q("#tc-c", root), f = q("#tc-f", root), tout = q("#tc-result", root);
    function upd() {
      const T = Number(t.value) || 0, M = Number(m.value) || 0;
      if (dir.value === "toAir") {
        const at = Math.round((T - 20) / 5) * 5, am = Math.round(M * 0.8);
        out.textContent = `Air fryer: ${at} °C por cerca de ${am} minutos. Confira a partir de ${Math.max(1, am - 5)} min.`;
      } else {
        const ot = Math.round((T + 20) / 5) * 5, om = Math.round(M * 1.25);
        out.textContent = `Forno convencional: ${ot} °C por cerca de ${om} minutos (preaquecido).`;
      }
    }
    const gas = (C) => (C < 135 ? "½" : C < 150 ? "1" : C > 250 ? "9" : String(Math.round((C - 121) / 14)));
    const label = (C) => (C < 150 ? "forno baixo" : C < 200 ? "forno médio" : C < 230 ? "forno médio-alto" : "forno alto");
    function fromC() {
      const C = Number(c.value) || 0;
      f.value = Math.round((C * 9) / 5 + 32);
      tout.textContent = `${C} °C = ${f.value} °F · gás ${gas(C)} · ${label(C)}`;
    }
    function fromF() {
      const F = Number(f.value) || 0, C = Math.round(((F - 32) * 5) / 9);
      c.value = C;
      tout.textContent = `${F} °F = ${C} °C · gás ${gas(C)} · ${label(C)}`;
    }
    [t, m, dir].forEach((e) => e.addEventListener("input", upd));
    c.addEventListener("input", fromC);
    f.addEventListener("input", fromF);
    upd();
    fromC();
  }

  /* ---------- 6. Timer ---------- */
  function initTimer(root) {
    const list = q("#tm-list", root), presets = q("#tm-presets", root);
    const timers = [];
    let audio;
    const baseTitle = document.title;
    function beep() {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.35, 0.7].forEach((d) => {
          const o = audio.createOscillator(), g = audio.createGain();
          o.frequency.value = 880;
          g.gain.setValueAtTime(0.25, audio.currentTime + d);
          g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + d + 0.3);
          o.connect(g).connect(audio.destination);
          o.start(audio.currentTime + d);
          o.stop(audio.currentTime + d + 0.3);
        });
      } catch { /* sem áudio */ }
      if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
    }
    const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    function add(name, secs) {
      if (secs <= 0) return;
      try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); } catch { /* */ }
      const t = { name: name || "Timer " + (timers.length + 1), total: secs, end: Date.now() + secs * 1000, paused: null, done: false };
      timers.push(t);
      render();
    }
    function left(t) {
      return t.paused ? t.pausedLeft : Math.max(0, Math.ceil((t.end - Date.now()) / 1000));
    }
    function render() {
      list.replaceChildren();
      timers.forEach((t, i) => {
        const s = left(t);
        const row = el("div", { class: "timer-row" + (t.done ? " done" : "") });
        row.append(el("strong", {}, t.name), el("span", { class: "timer-time" }, t.done ? "Pronto!" : mmss(s)));
        const bar = el("span", { class: "timer-bar" });
        bar.style.setProperty("--p", String(1 - s / t.total));
        row.append(bar);
        const pause = el("button", { class: "plain-button", type: "button" }, t.paused ? "Continuar" : "Pausar");
        pause.addEventListener("click", () => {
          if (t.done) return;
          if (t.paused) { t.end = Date.now() + t.pausedLeft * 1000; t.paused = null; }
          else { t.pausedLeft = left(t); t.paused = true; }
          render();
        });
        const del = el("button", { class: "plain-button", type: "button", "aria-label": "Remover " + t.name }, "Remover");
        del.addEventListener("click", () => { timers.splice(i, 1); render(); });
        if (!t.done) row.append(pause);
        row.append(del);
        list.append(row);
      });
      const active = timers.filter((t) => !t.done && !t.paused);
      document.title = active.length ? `⏱ ${mmss(Math.min(...active.map(left)))} · ${baseTitle}` : baseTitle;
    }
    setInterval(() => {
      let changed = false;
      timers.forEach((t) => {
        if (!t.done && !t.paused && left(t) <= 0) {
          t.done = true;
          changed = true;
          beep();
          say(`⏰ ${t.name}: tempo esgotado!`);
          if ("Notification" in window && Notification.permission === "granted")
            new Notification("Clube da Receita", { body: `${t.name}: tempo esgotado!` });
        }
      });
      if (timers.length || changed) render();
    }, 500);
    q("#tm-add", root).addEventListener("click", () => {
      add(q("#tm-name", root).value.trim(), int(q("#tm-min", root).value, 0, 600) * 60 + int(q("#tm-sec", root).value, 0, 59));
      if ("Notification" in window && Notification.permission === "default") Notification.requestPermission().catch(() => {});
    });
    [["Ovo mole", 6], ["Ovo cozido", 12], ["Macarrão", 9], ["Arroz", 18], ["Feijão (pressão)", 30], ["Bolo", 40]].forEach(([n, m]) => {
      const b = el("button", { class: "chip", type: "button" }, `${n} · ${m} min`);
      b.addEventListener("click", () => add(n, m * 60));
      presets.append(b);
    });
  }

  /* ---------- 7. Tempo de cozimento ---------- */
  const COOK = [
    ["Grãos", "Arroz branco", "15–18 min em panela tampada (2 partes de água)"],
    ["Grãos", "Arroz integral", "35–45 min (2½ a 3 partes de água)"],
    ["Grãos", "Arroz parboilizado", "20–25 min"],
    ["Grãos", "Feijão carioca (com molho)", "20–25 min na pressão"],
    ["Grãos", "Feijão preto (com molho)", "25–30 min na pressão"],
    ["Grãos", "Feijão sem molho", "35–50 min na pressão"],
    ["Grãos", "Grão-de-bico (com molho)", "25–30 min na pressão"],
    ["Grãos", "Lentilha", "20 min em panela comum"],
    ["Grãos", "Ervilha seca", "15 min na pressão"],
    ["Grãos", "Quinoa", "15 min (2 partes de água)"],
    ["Grãos", "Canjica", "40 min na pressão (deixe de molho antes)"],
    ["Massas", "Espaguete seco", "8–11 min (veja a embalagem; tire 1 min para al dente)"],
    ["Massas", "Penne / parafuso", "10–12 min"],
    ["Massas", "Massa fresca", "2–4 min"],
    ["Massas", "Nhoque", "Até boiar + 1 min"],
    ["Massas", "Macarrão de arroz", "Hidratar 8–10 min em água morna"],
    ["Legumes", "Batata em cubos", "15–20 min fervendo · 8 min na pressão"],
    ["Legumes", "Batata inteira média", "25–30 min fervendo · 10–12 min na pressão"],
    ["Legumes", "Mandioca", "20–30 min fervendo · 15–20 min na pressão"],
    ["Legumes", "Batata-doce em rodelas", "15 min fervendo · 20 min no vapor"],
    ["Legumes", "Cenoura em rodelas", "8–10 min fervendo · 10 min no vapor"],
    ["Legumes", "Brócolis em floretes", "3–4 min fervendo · 5–6 min no vapor"],
    ["Legumes", "Couve-flor", "5–6 min fervendo · 8 min no vapor"],
    ["Legumes", "Vagem", "4–5 min fervendo · 6 min no vapor"],
    ["Legumes", "Abobrinha", "3 min refogada · 4 min no vapor"],
    ["Legumes", "Abóbora em cubos", "10–12 min fervendo · 25 min assada a 200 °C"],
    ["Legumes", "Beterraba inteira", "40–50 min fervendo · 20 min na pressão"],
    ["Legumes", "Milho verde (espiga)", "20–30 min fervendo · 10 min na pressão"],
    ["Legumes", "Espinafre / couve", "1–2 min refogado"],
    ["Ovos", "Ovo mole", "6 min em água fervente"],
    ["Ovos", "Ovo cremoso", "8 min em água fervente"],
    ["Ovos", "Ovo duro", "12 min em água fervente"],
    ["Ovos", "Ovo poché", "3 min em água quase fervendo"],
    ["Carnes", "Frango em pedaços (forno)", "45–60 min a 200 °C"],
    ["Carnes", "Frango inteiro (1,5 kg)", "1h15–1h30 a 200 °C"],
    ["Carnes", "Peito de frango grelhado", "5–6 min de cada lado"],
    ["Carnes", "Carne de panela (acém, músculo)", "40–50 min na pressão"],
    ["Carnes", "Costela bovina", "1h–1h15 na pressão · 4–6 h no forno a 160 °C"],
    ["Carnes", "Lombo suíno (1 kg)", "1h a 180 °C"],
    ["Carnes", "Pernil (3 kg)", "3–3h30 a 180 °C, coberto e depois descoberto"],
    ["Carnes", "Bife de 2 cm", "2–3 min de cada lado (ao ponto)"],
    ["Carnes", "Filé de peixe", "8–12 min a 200 °C · 3 min de cada lado na frigideira"],
    ["Carnes", "Camarão médio", "2–3 min, até ficar rosado"],
  ];
  function initCooktime(root) {
    const input = q("#ct-search", root), out = q("#ct-table", root), ch = q("#ct-chips", root);
    let cat = "";
    function render() {
      const s = norm(input.value);
      const rows = COOK.filter((r) => (!cat || r[0] === cat) && (!s || norm(r[1]).includes(s))).map((r) => [r[1], r[2]]);
      out.replaceChildren(rows.length ? table(["Alimento", "Tempo"], rows) : el("p", { class: "muted" }, "Nada encontrado."));
      chips(ch, ["Todos", "Grãos", "Massas", "Legumes", "Ovos", "Carnes"], (c) => { cat = c === "Todos" ? "" : c; render(); }, cat || "Todos");
    }
    input.addEventListener("input", render);
    render();
  }

  /* ---------- 8. Validade ---------- */
  const SHELF = [
    ["Carnes", "Carne bovina crua (peça/bife)", "—", "3 a 5 dias", "6 a 12 meses"],
    ["Carnes", "Carne moída crua", "—", "1 a 2 dias", "3 a 4 meses"],
    ["Carnes", "Frango cru", "—", "1 a 2 dias", "9 meses"],
    ["Carnes", "Carne suína crua", "—", "3 a 5 dias", "4 a 6 meses"],
    ["Carnes", "Linguiça fresca", "—", "1 a 2 dias", "1 a 2 meses"],
    ["Carnes", "Peixe cru", "—", "1 a 2 dias", "3 a 6 meses"],
    ["Carnes", "Camarão cru", "—", "1 a 2 dias", "3 a 6 meses"],
    ["Carnes", "Presunto/frios fatiados", "—", "3 a 5 dias após aberto", "1 a 2 meses"],
    ["Carnes", "Bacon", "—", "7 dias após aberto", "1 mês"],
    ["Prontos", "Arroz cozido", "Até 2 h", "3 a 4 dias", "1 a 2 meses"],
    ["Prontos", "Feijão cozido", "Até 2 h", "3 a 5 dias", "3 meses"],
    ["Prontos", "Macarrão cozido", "Até 2 h", "3 a 5 dias", "1 a 2 meses"],
    ["Prontos", "Carnes cozidas e ensopados", "Até 2 h", "3 a 4 dias", "2 a 3 meses"],
    ["Prontos", "Sopas e caldos", "Até 2 h", "3 a 4 dias", "2 a 3 meses"],
    ["Prontos", "Pizza", "Até 2 h", "3 a 4 dias", "1 a 2 meses"],
    ["Prontos", "Lasanha", "Até 2 h", "3 a 5 dias", "3 meses"],
    ["Prontos", "Salada temperada", "Até 2 h", "1 dia", "Não congelar"],
    ["Laticínios", "Leite aberto", "—", "3 a 4 dias", "3 meses (separa ao descongelar)"],
    ["Laticínios", "Iogurte", "—", "5 a 7 dias após aberto", "1 a 2 meses"],
    ["Laticínios", "Queijo fresco (minas, ricota)", "—", "5 a 7 dias", "Não recomendado"],
    ["Laticínios", "Queijo mussarela", "—", "2 a 3 semanas (bloco)", "3 meses (ralado)"],
    ["Laticínios", "Queijo parmesão", "—", "3 a 4 semanas", "6 meses (ralado)"],
    ["Laticínios", "Requeijão/cream cheese aberto", "—", "Até 7 dias", "Não recomendado"],
    ["Laticínios", "Manteiga", "1 a 2 dias", "1 a 3 meses", "6 a 9 meses"],
    ["Laticínios", "Creme de leite aberto", "—", "3 dias", "Não recomendado"],
    ["Laticínios", "Leite condensado aberto", "—", "5 dias (em pote fechado)", "3 meses"],
    ["Ovos", "Ovos crus na casca", "Prefira a geladeira", "3 a 5 semanas", "Não congelar na casca"],
    ["Ovos", "Ovo cozido com casca", "Até 2 h", "7 dias", "Não congelar"],
    ["Ovos", "Claras cruas", "—", "2 a 4 dias", "12 meses"],
    ["Hortifrúti", "Folhas (alface, rúcula)", "—", "3 a 5 dias", "Não congelar"],
    ["Hortifrúti", "Brócolis / couve-flor", "—", "3 a 5 dias", "8 a 12 meses (branqueados)"],
    ["Hortifrúti", "Cenoura", "—", "2 a 3 semanas", "8 a 12 meses (branqueada)"],
    ["Hortifrúti", "Tomate", "Até amadurecer", "Até 1 semana (maduro)", "2 meses (para molho)"],
    ["Hortifrúti", "Batata", "1 a 2 meses (local fresco e escuro)", "Não recomendado", "Só em purê"],
    ["Hortifrúti", "Cebola", "1 a 2 meses", "Cortada: 7 dias", "6 meses (picada)"],
    ["Hortifrúti", "Banana", "3 a 5 dias", "Casca escurece; polpa ok por 5 dias", "6 meses (sem casca)"],
    ["Hortifrúti", "Maçã", "1 semana", "3 a 4 semanas", "8 meses (em fatias)"],
    ["Hortifrúti", "Frutas vermelhas", "—", "2 a 3 dias", "8 a 12 meses"],
    ["Hortifrúti", "Abacate", "Até amadurecer", "3 a 5 dias (maduro)", "4 meses (polpa com limão)"],
    ["Hortifrúti", "Ervas frescas", "—", "5 a 7 dias (em papel úmido)", "6 meses (picadas no azeite)"],
    ["Despensa", "Pão", "2 a 3 dias", "Resseca mais rápido", "3 meses"],
    ["Despensa", "Bolo sem recheio", "2 a 3 dias", "5 dias", "3 meses"],
    ["Despensa", "Arroz cru", "1 a 2 anos (fechado)", "—", "—"],
    ["Despensa", "Feijão cru", "Até 1 ano (cozinha melhor até 6 meses)", "—", "—"],
    ["Despensa", "Farinha de trigo", "6 a 8 meses", "—", "1 ano"],
    ["Despensa", "Molho de tomate aberto", "—", "3 a 5 dias (fora da lata)", "3 meses"],
    ["Despensa", "Azeite", "1 a 2 anos fechado; 3 meses aberto", "—", "—"],
  ];
  function initShelf(root) {
    const input = q("#sh-search", root), out = q("#sh-table", root), ch = q("#sh-chips", root);
    let cat = "";
    function render() {
      const s = norm(input.value);
      const rows = SHELF.filter((r) => (!cat || r[0] === cat) && (!s || norm(r[1]).includes(s))).map((r) => r.slice(1));
      out.replaceChildren(rows.length ? table(["Alimento", "Temperatura ambiente", "Geladeira (≤ 5 °C)", "Freezer (−18 °C)"], rows) : el("p", { class: "muted" }, "Nada encontrado."));
      chips(ch, ["Todos", "Carnes", "Prontos", "Laticínios", "Ovos", "Hortifrúti", "Despensa"], (c) => { cat = c === "Todos" ? "" : c; render(); }, cat || "Todos");
    }
    input.addEventListener("input", render);
    render();
  }

  /* ---------- 9. Lista de compras ---------- */
  const SECTIONS = [
    ["Hortifrúti", /alface|tomate|cebola|alho|batata|cenoura|banana|maç|limao|laranja|fruta|legume|verdura|couve|brocolis|abobr|pimentao|cheiro|salsa|coentro|manjericao|morango|abacate|mandioca|milho verde|pequi|jambu|uva|pepino|berinjela|beterraba|repolho|espinafre|abacaxi/],
    ["Carnes e peixes", /carne|frango|peito|coxa|picanha|alcatra|fraldinha|linguica|bacon|costela|peixe|camarao|file|lombo|pernil|cordeiro|pato|guanciale|presunto|charque|maminha|cupim|ancho|coracao|tilapia|salmao/],
    ["Frios e laticínios", /leite|queijo|manteiga|iogurte|requeijao|creme de leite|cream cheese|mussarela|parmesao|ovo|nata|coalho|pecorino/],
    ["Padaria", /pao|bisnag|torrada|bolo pronto/],
    ["Bebidas", /cerveja|refri|suco|agua|vinho|cafe|cha |gelo|lata/],
    ["Mercearia", /arroz|feijao|farinha|acucar|sal|oleo|azeite|fuba|polvilho|macarrao|massa|molho|extrato|fermento|chocolate|cacau|condensado|tempero|pimenta|oregano|louro|cominho|colorau|aveia|granulado|ketchup|mostarda|vinagre|fuba|amido|grao|lentilha|carvao|farofa|tortilla|achiote|acafrao|tucupi|tapioca|dende|shoyu/],
    ["Limpeza e descartáveis", /detergente|sabao|papel|guardanapo|copo|prato|talher|saco|esponja|alumin|filme/],
  ];
  const section = (t) => (SECTIONS.find(([, r]) => r.test(norm(t))) || ["Outros"])[0];
  function initShopping(root) {
    const form = q("#sl-form", root), input = q("#sl-input", root), list = q("#sl-list", root), count = q("#sl-count", root);
    function textOut(items) {
      return items.map((i) => (i.d ? "✔ " : "• ") + i.t).join("\n");
    }
    function render() {
      const items = shop.get();
      list.replaceChildren();
      const groups = {};
      items.forEach((it, idx) => (groups[section(it.t)] ||= []).push([it, idx]));
      const order = [...SECTIONS.map((s) => s[0]), "Outros"];
      order.filter((g) => groups[g]).forEach((g) => {
        const box = el("div", { class: "shop-group" });
        box.append(el("h3", {}, g));
        groups[g].forEach(([it, idx]) => {
          const row = el("div", { class: "shop-item" + (it.d ? " done" : "") });
          const id = "sl-" + idx;
          const cb = el("input", { type: "checkbox", id });
          cb.checked = !!it.d;
          cb.addEventListener("change", () => { const all = shop.get(); all[idx].d = cb.checked; shop.set(all); render(); });
          const lab = el("label", { for: id }, it.t);
          const rm = el("button", { class: "plain-button", type: "button", "aria-label": "Remover " + it.t }, "×");
          rm.addEventListener("click", () => { const all = shop.get(); all.splice(idx, 1); shop.set(all); render(); });
          row.append(cb, lab, rm);
          box.append(row);
        });
        list.append(box);
      });
      const done = items.filter((i) => i.d).length;
      count.textContent = items.length ? `${items.length} itens · ${done} marcados` : "Sua lista está vazia. Adicione o primeiro item acima.";
      q("#sl-share", root).href = "https://wa.me/?text=" + encodeURIComponent("Minha lista de compras:\n" + textOut(items));
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return;
      shop.add(v.split(/[;\n]/).map((s) => s.trim()).filter(Boolean));
      input.value = "";
      input.focus();
      render();
    });
    q("#sl-copy", root).addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(textOut(shop.get())); say("Lista copiada."); }
      catch { say("Não foi possível copiar. Selecione e copie manualmente."); }
    });
    q("#sl-clear-done", root).addEventListener("click", () => { shop.set(shop.get().filter((i) => !i.d)); render(); });
    q("#sl-clear", root).addEventListener("click", () => { if (confirm("Apagar toda a lista?")) { shop.set([]); render(); } });
    window.addEventListener("storage", render);
    render();
  }

  /* ---------- 10. Ajustar porções ---------- */
  function initScaler(root) {
    const from = q("#sc-from", root), to = q("#sc-to", root), input = q("#sc-input", root), out = q("#sc-output", root);
    const NUM = /^\s*((?:\d+\s+)?\d+\/\d+|\d+(?:[.,]\d+)?(?:\s*[½⅓⅔¼¾⅛])?|[½⅓⅔¼¾⅛])/;
    let lines = [];
    function nice(n) {
      const whole = Math.floor(n), rest = n - whole;
      const fr = [[0.25, "¼"], [1 / 3, "⅓"], [0.5, "½"], [2 / 3, "⅔"], [0.75, "¾"]].find(([v]) => Math.abs(rest - v) < 0.04);
      if (fr && whole < 10) return (whole ? whole + " " : "") + fr[1];
      return fmt(n, n < 10 ? 2 : 0);
    }
    function render() {
      const k = int(to.value, 1, 500) / int(from.value, 1, 200);
      lines = input.value.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
        const m = l.match(NUM);
        if (!m) return l;
        const v = parseAmount(m[1]);
        return v ? nice(v * k) + l.slice(m[0].length) : l;
      });
      out.replaceChildren(...lines.map((l) => el("li", {}, l)));
    }
    [from, to, input].forEach((e) => e.addEventListener("input", render));
    q("#sc-copy", root).addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(lines.join("\n")); say("Resultado copiado."); } catch { say("Não foi possível copiar."); }
    });
    render();
  }

  /* ---------- 11. Ponto da carne ---------- */
  const MEAT = {
    "Bovina": [["Selada / bleu", "46–49 °C", "Por fora selada, por dentro quase crua"], ["Mal passada", "50–54 °C", "Centro vermelho e úmido"], ["Ao ponto para mal", "55–57 °C", "Centro rosado-avermelhado"], ["Ao ponto", "60–63 °C", "Centro rosado; seguro (USDA: 63 °C + 3 min de descanso)"], ["Ao ponto para bem", "65–68 °C", "Pouco rosado"], ["Bem passada", "71 °C ou mais", "Sem rosado"], ["Carne moída (hambúrguer)", "71 °C", "Mínimo seguro"]],
    "Suína": [["Ao ponto (lombo, filé)", "63 °C + 3 min de descanso", "Levemente rosado, suculento e seguro"], ["Bem passada", "71 °C", "Sem rosado"], ["Pernil e costela desfiando", "88–93 °C", "Colágeno derretido, desmancha"], ["Linguiça e carne moída", "71 °C", "Mínimo seguro"]],
    "Frango": [["Peito, coxa, sobrecoxa", "74 °C", "Mínimo seguro em qualquer parte"], ["Coxa e sobrecoxa macias", "80–85 °C", "Mais macias e soltando do osso"], ["Frango moído", "74 °C", "Mínimo seguro"]],
    "Peixe": [["Peixes e frutos do mar", "63 °C", "Carne opaca e soltando em lascas"], ["Salmão e atum ao ponto", "50–52 °C", "Escolha de sabor; use peixe muito fresco"], ["Camarão", "—", "Rosado e opaco, em formato de C"]],
    "Cordeiro": [["Mal passado", "52–55 °C", "Centro vermelho"], ["Ao ponto", "63 °C + 3 min de descanso", "Rosado; seguro"], ["Bem passado", "71 °C", "Sem rosado"], ["Paleta desfiando", "88–93 °C", "Cozimento lento"]],
  };
  function initMeat(root) {
    const ch = q("#mt-chips", root), out = q("#mt-table", root);
    let cur = "Bovina";
    function render() {
      chips(ch, Object.keys(MEAT), (c) => { cur = c; render(); }, cur);
      out.replaceChildren(table(["Ponto", "Temperatura interna", "Como fica"], MEAT[cur]),
        el("p", { class: "small muted" }, "Meça no centro da parte mais grossa, longe do osso. Retire do fogo 2 a 3 °C antes: a temperatura sobe durante o descanso."));
    }
    render();
  }

  /* ---------- 12. Sorteador ---------- */
  const RECIPES = window.CLUBE_RECIPES || [];
  function recipeCard(r) {
    const a = el("a", { class: "pick-card", href: r.file });
    if (r.img) {
      const img = el("img", { src: r.img, alt: r.title, loading: "lazy", width: "500", height: "375" });
      img.addEventListener("error", () => img.remove());
      a.append(img);
    }
    const body = el("div");
    body.append(el("span", { class: "eyebrow" }, r.region), el("h3", {}, r.title), el("p", {}, r.desc), el("span", { class: "small" }, `◷ ${r.timeLabel} · ${r.difficulty}`));
    a.append(body);
    return a;
  }
  function initPicker(root) {
    const out = q("#pk-result", root);
    q("#pk-go", root).addEventListener("click", () => {
      const max = Number(q("#pk-time", root).value), type = q("#pk-type", root).value, ing = norm(q("#pk-ing", root).value);
      const pool = RECIPES.filter((r) => r.minutes <= max && (!type || r.type === type) && (!ing || norm(r.search).includes(ing)));
      if (!pool.length) { out.replaceChildren(el("p", { class: "muted" }, "Nenhuma receita com esses filtros. Tente afrouxar um deles.")); return; }
      const r = pool[Math.floor(Math.random() * pool.length)];
      out.replaceChildren(el("p", { class: "tool-result" }, `Que tal ${r.title.toLowerCase()} hoje?`), recipeCard(r));
    });
  }

  /* ---------- 13. Cardápio semanal ---------- */
  const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const MEALS = ["Almoço", "Jantar"];
  function initPlanner(root) {
    const grid = q("#pl-grid", root), status = q("#pl-status", root);
    const KEY = "clube-planner";
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
    const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* */ } };
    let plan = load();
    const mains = RECIPES.filter((r) => r.type === "salgado");
    function render() {
      grid.replaceChildren();
      DAYS.forEach((d) => {
        const card = el("div", { class: "planner-day" });
        card.append(el("h3", {}, d));
        MEALS.forEach((m) => {
          const key = d + "|" + m;
          const lab = el("label", { class: "field" });
          lab.append(el("span", {}, m));
          const sel = el("select", { class: "input" });
          sel.append(el("option", { value: "" }, "— escolher —"));
          RECIPES.forEach((r) => sel.append(el("option", { value: r.file }, r.title)));
          sel.append(el("option", { value: "sobras" }, "Sobras / marmita"), el("option", { value: "fora" }, "Comer fora"));
          sel.value = plan[key] || "";
          sel.addEventListener("change", () => { plan[key] = sel.value; save(plan); });
          lab.append(sel);
          card.append(lab);
        });
        grid.append(card);
      });
    }
    q("#pl-fill", root).addEventListener("click", () => {
      const pool = [...mains].sort(() => Math.random() - 0.5);
      let i = 0;
      DAYS.forEach((d) => MEALS.forEach((m) => {
        const key = d + "|" + m;
        if (!plan[key]) plan[key] = m === "Jantar" && i % 3 === 2 ? "sobras" : pool[i++ % pool.length].file;
      }));
      save(plan);
      render();
      status.textContent = "Semana sugerida. Troque o que quiser.";
    });
    q("#pl-clear", root).addEventListener("click", () => { plan = {}; save(plan); render(); status.textContent = "Cardápio limpo."; });
    q("#pl-shop", root).addEventListener("click", () => {
      const files = Object.values(plan).filter((f) => f && f.endsWith(".html"));
      const items = [];
      files.forEach((f) => { const r = RECIPES.find((x) => x.file === f); if (r) r.ingredients.forEach((i) => items.push(i + " (" + r.short + ")")); });
      if (!items.length) { status.textContent = "Escolha ao menos uma receita para gerar a lista."; return; }
      shop.add(items);
      status.innerHTML = "";
      status.append(document.createTextNode(`${items.length} ingredientes enviados para a `), el("a", { href: "ferramenta-lista-de-compras.html" }, "lista de compras"), document.createTextNode("."));
    });
    render();
  }

  const INIT = { converter: initConverter, bbq: initBbq, party: initParty, subs: initSubs, airfryer: initAirfryer, timer: initTimer, cooktime: initCooktime, shelf: initShelf, shopping: initShopping, scaler: initScaler, meat: initMeat, picker: initPicker, planner: initPlanner };
  document.addEventListener("DOMContentLoaded", () =>
    document.querySelectorAll("[data-tool]").forEach((n) => {
      try { INIT[n.dataset.tool]?.(n); } catch (e) { console.error(e); }
    }),
  );
})();
