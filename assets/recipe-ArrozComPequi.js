(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Cozinhe os pequis em água com sal por cerca de 20 minutos, para abrandar os espinhos internos do caroço.",
  "Numa panela, refogue a cebola e o alho no óleo até dourarem.",
  "Adicione o frango desfiado e deixe dourar levemente junto ao refogado.",
  "Junte o arroz e os pequis cozidos inteiros, refogando por 2 minutos.",
  "Adicione água quente na proporção de duas partes de água para uma de arroz, e cozinhe em fogo baixo até o arroz ficar macio, mexendo ocasionalmente."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Arroz", base: 400, kind: "g" },
  { name: "Pequi", base: 6, kind: "unit", key: "pequi" },
  { name: "Frango desfiado", base: 300, kind: "g", key: "frango" },
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
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, pricePequi: 3, priceFrango: 18 };
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
    const pequiUnits = ingredients.find(i => i.key === 'pequi').qty;
    const frangoKg = ingredients.find(i => i.key === 'frango').qty / 1000;
    const total = pequiUnits * this.state.pricePequi + frangoKg * this.state.priceFrango + this.state.servings * 1;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, pricePequi: this.state.pricePequi, priceFrango: this.state.priceFrango,
      setPricePequi: (e) => this.setState({ pricePequi: Number(e.target.value) || 0 }),
      setPriceFrango: (e) => this.setState({ priceFrango: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Arroz","base":400,"kind":"g"},{"name":"Pequi","base":6,"kind":"unit","key":"pequi"},{"name":"Frango desfiado","base":300,"kind":"g","key":"frango"},{"name":"Cebola picada","base":1,"kind":"unit"},{"name":"Dentes de alho","base":3,"kind":"unit"}],"steps":["Cozinhe os pequis em água com sal por cerca de 20 minutos, para abrandar os espinhos internos do caroço.","Numa panela, refogue a cebola e o alho no óleo até dourarem.","Adicione o frango desfiado e deixe dourar levemente junto ao refogado.","Junte o arroz e os pequis cozidos inteiros, refogando por 2 minutos.","Adicione água quente na proporção de duas partes de água para uma de arroz, e cozinhe em fogo baixo até o arroz ficar macio, mexendo ocasionalmente."],"servings":6};})();