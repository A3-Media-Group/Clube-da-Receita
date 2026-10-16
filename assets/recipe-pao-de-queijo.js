(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Numa panela, ferva o leite com o óleo e o sal.",
  "Desligue o fogo e escalde o polvilho azedo com o líquido quente, mexendo até formar uma massa grumosa. Deixe esfriar.",
  "Adicione os ovos um a um, sovando bem entre cada adição, até a massa ficar lisa e elástica.",
  "Misture o queijo minas ralado até incorporar por completo.",
  "Modele bolinhas com as mãos untadas e asse em forno preaquecido a 200°C por cerca de 20 minutos, até dourar por fora."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Polvilho azedo", base: 500, kind: "g", key: "polvilho" },
  { name: "Leite", base: 250, kind: "g" },
  { name: "Óleo", base: 120, kind: "g" },
  { name: "Ovos", base: 2, kind: "unit" },
  { name: "Queijo minas curado ralado", base: 200, kind: "g", key: "queijo" },
  { name: "Sal", base: 1, kind: "tbsp" },
];
function scale(base, kind, mult) {
  const raw = base * mult;
  if (kind === "unit") return Math.max(1, Math.round(raw));
  if (kind === "tbsp") return Math.max(0.5, Math.round(raw * 2) / 2);
  return Math.max(5, Math.round(raw / 5) * 5);
}
function fmt(qty, kind) {
  if (kind === "g") return qty + " g";
  if (kind === "tbsp") return qty + " colher(es) de chá";
  return qty + "x";
}
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, pricePolvilho: 14, priceQueijo: 55 };
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
    const ingredients = BASE_INGREDIENTS.map(i => {
      const qty = scale(i.base, i.kind, mult);
      return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key };
    });
    const kgOf = (key) => { const ing = ingredients.find(i => i.key === key); return ing ? ing.qty / 1000 : 0; };
    const total = kgOf('polvilho') * this.state.pricePolvilho + kgOf('queijo') * this.state.priceQueijo + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light',
      toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(),
      servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients,
      pricePolvilho: this.state.pricePolvilho, priceQueijo: this.state.priceQueijo,
      setPricePolvilho: (e) => this.setState({ pricePolvilho: Number(e.target.value) || 0 }),
      setPriceQueijo: (e) => this.setState({ priceQueijo: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode,
      enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }),
      exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Polvilho azedo","base":500,"kind":"g","key":"polvilho"},{"name":"Leite","base":250,"kind":"g"},{"name":"Óleo","base":120,"kind":"g"},{"name":"Ovos","base":2,"kind":"unit"},{"name":"Queijo minas curado ralado","base":200,"kind":"g","key":"queijo"},{"name":"Sal","base":1,"kind":"tbsp"}],"steps":["Numa panela, ferva o leite com o óleo e o sal.","Desligue o fogo e escalde o polvilho azedo com o líquido quente, mexendo até formar uma massa grumosa. Deixe esfriar.","Adicione os ovos um a um, sovando bem entre cada adição, até a massa ficar lisa e elástica.","Misture o queijo minas ralado até incorporar por completo.","Modele bolinhas com as mãos untadas e asse em forno preaquecido a 200°C por cerca de 20 minutos, até dourar por fora."],"servings":6};})();