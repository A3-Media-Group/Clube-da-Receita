(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Cozinhe o feijão-de-corda em água até ficar macio, mas ainda inteiro. Reserve com um pouco do caldo.",
  "Numa panela larga, refogue a cebola e o alho na manteiga de garrafa até dourarem.",
  "Adicione a carne-de-sol desfiada e deixe dourar levemente junto ao refogado.",
  "Junte o arroz e o feijão cozido com um pouco do caldo, misturando bem, e deixe cozinhar em fogo médio até o arroz ficar macio.",
  "Finalize com o queijo coalho em cubos por cima, deixando derreter levemente antes de servir."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Arroz", base: 300, kind: "g" },
  { name: "Feijão-de-corda", base: 300, kind: "g", key: "feijao" },
  { name: "Queijo coalho em cubos", base: 200, kind: "g", key: "queijo" },
  { name: "Carne-de-sol desfiada", base: 250, kind: "g", key: "carne" },
  { name: "Cebola picada", base: 1, kind: "unit" },
  { name: "Dentes de alho", base: 3, kind: "unit" },
];
function scale(base, kind, mult) {
  const raw = base * mult;
  if (kind === "unit") return Math.max(1, Math.round(raw));
  return Math.max(5, Math.round(raw / 5) * 5);
}
function fmt(qty, kind) { return kind === "g" ? qty + " g" : qty + "x"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceFeijao: 14, priceQueijo: 45, priceCarne: 40 };
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
    const kgOf = (key) => { const ing = ingredients.find(i => i.key === key); return ing ? ing.qty / 1000 : 0; };
    const total = kgOf('feijao') * this.state.priceFeijao + kgOf('queijo') * this.state.priceQueijo + kgOf('carne') * this.state.priceCarne + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceFeijao: this.state.priceFeijao, priceQueijo: this.state.priceQueijo, priceCarne: this.state.priceCarne,
      setPriceFeijao: (e) => this.setState({ priceFeijao: Number(e.target.value) || 0 }),
      setPriceQueijo: (e) => this.setState({ priceQueijo: Number(e.target.value) || 0 }),
      setPriceCarne: (e) => this.setState({ priceCarne: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Arroz","base":300,"kind":"g"},{"name":"Feijão-de-corda","base":300,"kind":"g","key":"feijao"},{"name":"Queijo coalho em cubos","base":200,"kind":"g","key":"queijo"},{"name":"Carne-de-sol desfiada","base":250,"kind":"g","key":"carne"},{"name":"Cebola picada","base":1,"kind":"unit"},{"name":"Dentes de alho","base":3,"kind":"unit"}],"steps":["Cozinhe o feijão-de-corda em água até ficar macio, mas ainda inteiro. Reserve com um pouco do caldo.","Numa panela larga, refogue a cebola e o alho na manteiga de garrafa até dourarem.","Adicione a carne-de-sol desfiada e deixe dourar levemente junto ao refogado.","Junte o arroz e o feijão cozido com um pouco do caldo, misturando bem, e deixe cozinhar em fogo médio até o arroz ficar macio.","Finalize com o queijo coalho em cubos por cima, deixando derreter levemente antes de servir."],"servings":6};})();