(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Doure o frango em pedaços numa panela até a pele ficar bem crocante, e reserve.",
  "No mesmo óleo, doure o bacon e as cebolas pequenas até dourarem por igual.",
  "Volte o frango à panela, cubra com o vinho tinto e adicione o alho e o louro.",
  "Cozinhe em fogo baixo, tampado, por cerca de 1h30, até o frango ficar bem macio.",
  "Nos últimos 15 minutos, adicione os cogumelos e engrosse o caldo com um pouco de farinha dissolvida em água."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Frango em pedaços", base: 1200, kind: "g", key: "frango" },
  { name: "Vinho tinto", base: 500, kind: "ml", key: "vinho" },
  { name: "Bacon", base: 100, kind: "g" },
  { name: "Cebolas pequenas", base: 200, kind: "g" },
  { name: "Cogumelos", base: 200, kind: "g" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "ml") return Math.max(50, Math.round(raw / 50) * 50); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { return kind === "ml" ? qty + " ml" : qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceFrango: 18, priceVinho: 35 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const kgOf = (key) => { const ing = ingredients.find(i => i.key === key); return ing ? ing.qty / 1000 : 0; };
    const total = kgOf('frango') * this.state.priceFrango + (ingredients.find(i => i.key === 'vinho').qty / 1000) * this.state.priceVinho + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceFrango: this.state.priceFrango, priceVinho: this.state.priceVinho,
      setPriceFrango: (e) => this.setState({ priceFrango: Number(e.target.value) || 0 }),
      setPriceVinho: (e) => this.setState({ priceVinho: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Frango em pedaços","base":1200,"kind":"g","key":"frango"},{"name":"Vinho tinto","base":500,"kind":"ml","key":"vinho"},{"name":"Bacon","base":100,"kind":"g"},{"name":"Cebolas pequenas","base":200,"kind":"g"},{"name":"Cogumelos","base":200,"kind":"g"}],"steps":["Doure o frango em pedaços numa panela até a pele ficar bem crocante, e reserve.","No mesmo óleo, doure o bacon e as cebolas pequenas até dourarem por igual.","Volte o frango à panela, cubra com o vinho tinto e adicione o alho e o louro.","Cozinhe em fogo baixo, tampado, por cerca de 1h30, até o frango ficar bem macio.","Nos últimos 15 minutos, adicione os cogumelos e engrosse o caldo com um pouco de farinha dissolvida em água."],"servings":6};})();