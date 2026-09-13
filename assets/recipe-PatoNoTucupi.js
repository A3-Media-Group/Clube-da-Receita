(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Tempere o pato com sal e alho amassado por dentro e por fora, e deixe descansar na geladeira por ao menos 2 horas.",
  "Numa panela grande, sele a peça em fogo alto até dourar por igual em toda a superfície.",
  "Cubra com o tucupi e as folhas de louro, e leve ao fogo baixo com a panela semiaberta por cerca de 2 horas, até a carne ficar bem macia.",
  "Nos últimos 10 minutos de cozimento, escalde as folhas de jambu separadamente e adicione ao caldo.",
  "Retire o pato, corte em pedaços e sirva com o caldo de tucupi e jambu, acompanhado de arroz branco e pimenta a gosto."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Pato inteiro (~2kg)", base: 1, kind: "unit", key: "pato" },
  { name: "Tucupi", base: 1500, kind: "ml", key: "tucupi" },
  { name: "Dentes de alho", base: 4, kind: "unit" },
  { name: "Cebola", base: 1, kind: "unit" },
  { name: "Folhas de jambu", base: 2, kind: "unit" },
  { name: "Folhas de louro", base: 2, kind: "unit" },
];
function scale(base, kind, mult) {
  const raw = base * mult;
  if (kind === "unit") return Math.max(1, Math.round(raw));
  if (kind === "ml") return Math.max(50, Math.round(raw / 50) * 50);
  return Math.max(5, Math.round(raw / 5) * 5);
}
function fmt(qty, kind) { if (kind === "ml") return qty + " ml"; return qty + "x"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, pricePato: 28, priceTucupi: 12 };
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
    const patoUnits = ingredients.find(i => i.key === 'pato').qty;
    const tucupiL = ingredients.find(i => i.key === 'tucupi').qty / 1000;
    const total = patoUnits * 2 * this.state.pricePato + tucupiL * this.state.priceTucupi + this.state.servings * 2;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, pricePato: this.state.pricePato, priceTucupi: this.state.priceTucupi,
      setPricePato: (e) => this.setState({ pricePato: Number(e.target.value) || 0 }),
      setPriceTucupi: (e) => this.setState({ priceTucupi: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Pato inteiro (~2kg)","base":1,"kind":"unit","key":"pato"},{"name":"Tucupi","base":1500,"kind":"ml","key":"tucupi"},{"name":"Dentes de alho","base":4,"kind":"unit"},{"name":"Cebola","base":1,"kind":"unit"},{"name":"Folhas de jambu","base":2,"kind":"unit"},{"name":"Folhas de louro","base":2,"kind":"unit"}],"steps":["Tempere o pato com sal e alho amassado por dentro e por fora, e deixe descansar na geladeira por ao menos 2 horas.","Numa panela grande, sele a peça em fogo alto até dourar por igual em toda a superfície.","Cubra com o tucupi e as folhas de louro, e leve ao fogo baixo com a panela semiaberta por cerca de 2 horas, até a carne ficar bem macia.","Nos últimos 10 minutos de cozimento, escalde as folhas de jambu separadamente e adicione ao caldo.","Retire o pato, corte em pedaços e sirva com o caldo de tucupi e jambu, acompanhado de arroz branco e pimenta a gosto."],"servings":6};})();