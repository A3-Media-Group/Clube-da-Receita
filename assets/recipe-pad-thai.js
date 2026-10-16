(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Hidrate o macarrão de arroz em água morna até ficar flexível, e escorra bem.",
  "Numa wok bem quente, refogue o camarão ou frango até cozinhar por completo.",
  "Empurre para a lateral, quebre os ovos na wok e misture até cozinhar parcialmente.",
  "Adicione o macarrão hidratado e o molho de tamarindo, peixe e açúcar, misturando em fogo alto. Finalize com broto de feijão e amendoim picado."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Macarrão de arroz", base: 300, kind: "g", key: "macarrao" },
  { name: "Camarão ou frango", base: 300, kind: "g", key: "camarao" },
  { name: "Ovos", base: 2, kind: "unit" },
  { name: "Broto de feijão", base: 100, kind: "g" },
  { name: "Amendoim torrado", base: 50, kind: "g" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { return kind === "unit" ? qty + "x" : qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceCamarao: 35, priceMacarrao: 14 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const camaraoKg = ingredients.find(i => i.key === 'camarao').qty / 1000;
    const macarraoKg = ingredients.find(i => i.key === 'macarrao').qty / 1000;
    const total = camaraoKg * this.state.priceCamarao + macarraoKg * this.state.priceMacarrao + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceCamarao: this.state.priceCamarao, priceMacarrao: this.state.priceMacarrao,
      setPriceCamarao: (e) => this.setState({ priceCamarao: Number(e.target.value) || 0 }),
      setPriceMacarrao: (e) => this.setState({ priceMacarrao: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Macarrão de arroz","base":300,"kind":"g","key":"macarrao"},{"name":"Camarão ou frango","base":300,"kind":"g","key":"camarao"},{"name":"Ovos","base":2,"kind":"unit"},{"name":"Broto de feijão","base":100,"kind":"g"},{"name":"Amendoim torrado","base":50,"kind":"g"}],"steps":["Hidrate o macarrão de arroz em água morna até ficar flexível, e escorra bem.","Numa wok bem quente, refogue o camarão ou frango até cozinhar por completo.","Empurre para a lateral, quebre os ovos na wok e misture até cozinhar parcialmente.","Adicione o macarrão hidratado e o molho de tamarindo, peixe e açúcar, misturando em fogo alto. Finalize com broto de feijão e amendoim picado."],"servings":6};})();