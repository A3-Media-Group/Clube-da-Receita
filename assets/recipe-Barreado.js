(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Na véspera, tempere a carne em cubos com sal, alho amassado e louro, e deixe marinar na geladeira.",
  "Numa panela de barro, faça camadas alternadas de carne e bacon, intercalando com cebola picada.",
  "Vede a tampa da panela com uma massa simples de farinha de trigo e água, para não deixar o vapor escapar.",
  "Cozinhe em fogo baixo, sem abrir a panela, por 6 a 8 horas, até a carne ficar completamente desmanchando.",
  "Ao servir, abra a panela, desfie a carne no próprio caldo e acompanhe com farinha de mandioca e banana."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Carne bovina em cubos (paleta)", base: 1200, kind: "g", key: "carne" },
  { name: "Bacon em cubos", base: 150, kind: "g" },
  { name: "Cebolas picadas", base: 2, kind: "unit" },
  { name: "Dentes de alho", base: 4, kind: "unit" },
  { name: "Folhas de louro", base: 3, kind: "unit" },
  { name: "Farinha de mandioca (para servir)", base: 300, kind: "g" },
  { name: "Bananas (para servir)", base: 6, kind: "unit" },
];
function scale(base, kind, mult) {
  const raw = base * mult;
  if (kind === "unit") return Math.max(1, Math.round(raw));
  return Math.max(5, Math.round(raw / 5) * 5);
}
function fmt(qty, kind) { return kind === "g" ? qty + " g" : qty + "x"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceCarne: 38 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
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
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const carneKg = ingredients.find(i => i.key === 'carne').qty / 1000;
    const total = carneKg * this.state.priceCarne + this.state.servings * 2;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceCarne: this.state.priceCarne,
      setPriceCarne: (e) => this.setState({ priceCarne: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Carne bovina em cubos (paleta)","base":1200,"kind":"g","key":"carne"},{"name":"Bacon em cubos","base":150,"kind":"g"},{"name":"Cebolas picadas","base":2,"kind":"unit"},{"name":"Dentes de alho","base":4,"kind":"unit"},{"name":"Folhas de louro","base":3,"kind":"unit"},{"name":"Farinha de mandioca (para servir)","base":300,"kind":"g"},{"name":"Bananas (para servir)","base":6,"kind":"unit"}],"steps":["Na véspera, tempere a carne em cubos com sal, alho amassado e louro, e deixe marinar na geladeira.","Numa panela de barro, faça camadas alternadas de carne e bacon, intercalando com cebola picada.","Vede a tampa da panela com uma massa simples de farinha de trigo e água, para não deixar o vapor escapar.","Cozinhe em fogo baixo, sem abrir a panela, por 6 a 8 horas, até a carne ficar completamente desmanchando.","Ao servir, abra a panela, desfie a carne no próprio caldo e acompanhe com farinha de mandioca e banana."],"servings":6};})();