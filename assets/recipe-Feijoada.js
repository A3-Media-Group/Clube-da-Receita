(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Na véspera, deixe o feijão preto de molho em água fria. Escorra e reserve. Se as carnes salgadas estiverem muito curadas, deixe-as também de molho, trocando a água uma ou duas vezes.",
  "Cozinhe as carnes salgadas separadamente em água até ficarem macias, escorrendo e trocando a água ao menos uma vez para controlar o sal. Corte em pedaços médios.",
  "Numa panela grande, cozinhe o feijão em água até ficar macio, mas ainda inteiro. Junte as carnes cozidas e o bacon em cubos, e deixe cozinhar em fogo baixo.",
  "Numa frigideira à parte, doure a cebola e o alho num fio de azeite até ficarem translúcidos, e junte as folhas de louro.",
  "Misture o refogado ao feijão com as carnes e deixe cozinhar em fogo baixo, mexendo de vez em quando, até o caldo engrossar e as carnes soltarem do osso.",
  "Ajuste o sal se necessário e sirva bem quente, acompanhado de arroz branco, couve refogada, farofa e rodelas de laranja."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Feijão preto", base: 500, kind: "g", key: "feijao" },
  { name: "Carne seca (charque)", base: 300, kind: "g", key: "carneSeca" },
  { name: "Costela de porco salgada", base: 250, kind: "g", key: "costela" },
  { name: "Linguiça calabresa", base: 200, kind: "g", key: "linguica" },
  { name: "Bacon em cubos", base: 150, kind: "g" },
  { name: "Cebola picada", base: 1, kind: "unit" },
  { name: "Dentes de alho", base: 4, kind: "unit" },
  { name: "Folhas de louro", base: 2, kind: "unit" },
  { name: "Azeite", base: 2, kind: "tbsp" },
  { name: "Arroz branco cozido (para servir)", base: 600, kind: "g" },
  { name: "Couve refogada (para servir)", base: 300, kind: "g" },
  { name: "Laranja em rodelas (para servir)", base: 1, kind: "unit" },
];

function scale(base, kind, mult) {
  const raw = base * mult;
  if (kind === "unit") return Math.max(1, Math.round(raw));
  if (kind === "tbsp") return Math.max(0.5, Math.round(raw * 2) / 2);
  return Math.max(5, Math.round(raw / 5) * 5);
}
function fmt(qty, kind) {
  if (kind === "g") return qty + " g";
  if (kind === "tbsp") return qty + " colher(es) de sopa";
  return qty + "x";
}

class RecipeLogic extends DCLogic {
  state = {
    dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0,
    priceFeijao: 8, priceCarneSeca: 42, priceCostela: 20, priceLinguica: 24,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKey);
  }
  onKey = (e) => {
    if (!this.state.cookMode) return;
    if (e.key === 'ArrowRight') this.nextStep();
    if (e.key === 'ArrowLeft') this.prevStep();
    if (e.key === 'Escape') this.setState({ cookMode: false });
  };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));

  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => {
      const qty = scale(i.base, i.kind, mult);
      return { name: i.name, display: fmt(qty, i.kind), qty, kind: i.kind, key: i.key };
    });
    const kgOf = (key) => {
      const ing = ingredients.find(i => i.key === key);
      return ing ? ing.qty / 1000 : 0;
    };
    const total = kgOf('feijao') * this.state.priceFeijao
      + kgOf('carneSeca') * this.state.priceCarneSeca
      + kgOf('costela') * this.state.priceCostela
      + kgOf('linguica') * this.state.priceLinguica
      + this.state.servings * 3; // outros ingredientes e temperos, estimado
    const perServing = total / this.state.servings;

    return {
      dark: this.state.dark,
      theme: this.state.dark ? 'dark' : 'light',
      toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(),
      servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients,
      priceFeijao: this.state.priceFeijao,
      priceCarneSeca: this.state.priceCarneSeca,
      priceCostela: this.state.priceCostela,
      priceLinguica: this.state.priceLinguica,
      setPriceFeijao: (e) => this.setState({ priceFeijao: Number(e.target.value) || 0 }),
      setPriceCarneSeca: (e) => this.setState({ priceCarneSeca: Number(e.target.value) || 0 }),
      setPriceCostela: (e) => this.setState({ priceCostela: Number(e.target.value) || 0 }),
      setPriceLinguica: (e) => this.setState({ priceLinguica: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      kcalDisplay: 650,
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode,
      enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }),
      exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1,
      stepsTotal: STEPS.length,
      currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Feijão preto","base":500,"kind":"g","key":"feijao"},{"name":"Carne seca (charque)","base":300,"kind":"g","key":"carneSeca"},{"name":"Costela de porco salgada","base":250,"kind":"g","key":"costela"},{"name":"Linguiça calabresa","base":200,"kind":"g","key":"linguica"},{"name":"Bacon em cubos","base":150,"kind":"g"},{"name":"Cebola picada","base":1,"kind":"unit"},{"name":"Dentes de alho","base":4,"kind":"unit"},{"name":"Folhas de louro","base":2,"kind":"unit"},{"name":"Azeite","base":2,"kind":"tbsp"},{"name":"Arroz branco cozido (para servir)","base":600,"kind":"g"},{"name":"Couve refogada (para servir)","base":300,"kind":"g"},{"name":"Laranja em rodelas (para servir)","base":1,"kind":"unit"}],"steps":["Na véspera, deixe o feijão preto de molho em água fria. Escorra e reserve. Se as carnes salgadas estiverem muito curadas, deixe-as também de molho, trocando a água uma ou duas vezes.","Cozinhe as carnes salgadas separadamente em água até ficarem macias, escorrendo e trocando a água ao menos uma vez para controlar o sal. Corte em pedaços médios.","Numa panela grande, cozinhe o feijão em água até ficar macio, mas ainda inteiro. Junte as carnes cozidas e o bacon em cubos, e deixe cozinhar em fogo baixo.","Numa frigideira à parte, doure a cebola e o alho num fio de azeite até ficarem translúcidos, e junte as folhas de louro.","Misture o refogado ao feijão com as carnes e deixe cozinhar em fogo baixo, mexendo de vez em quando, até o caldo engrossar e as carnes soltarem do osso.","Ajuste o sal se necessário e sirva bem quente, acompanhado de arroz branco, couve refogada, farofa e rodelas de laranja."],"servings":6};})();