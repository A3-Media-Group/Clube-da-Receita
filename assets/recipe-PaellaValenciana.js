(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Doure o frango em azeite numa paellera até dourar por igual em toda a superfície.",
  "Adicione o feijão-verde e o tomate picado, refogando bem por alguns minutos.",
  "Junte o arroz e misture para envolver nos temperos por 1 a 2 minutos.",
  "Adicione o caldo de frango quente com o açafrão dissolvido, e cozinhe sem mexer até o arroz absorver o líquido.",
  "Deixe formar a crosta dourada no fundo (o socarrat) e descanse por 5 minutos antes de servir."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Arroz bomba ou arbóreo", base: 400, kind: "g" },
  { name: "Frango em pedaços", base: 500, kind: "g", key: "frango" },
  { name: "Feijão-verde", base: 150, kind: "g" },
  { name: "Tomates", base: 2, kind: "unit" },
  { name: "Açafrão", base: 1, kind: "g", key: "acafrao" },
  { name: "Caldo de frango", base: 1000, kind: "ml" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); if (kind === "ml") return Math.max(50, Math.round(raw / 50) * 50); if (kind === "g" && raw < 10) return Math.max(0.5, Math.round(raw * 2) / 2); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { if (kind === "ml") return qty + " ml"; if (kind === "unit") return qty + "x"; return qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceFrango: 18, priceAcafrao: 2.5 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const frangoKg = ingredients.find(i => i.key === 'frango').qty / 1000;
    const acafraoG = ingredients.find(i => i.key === 'acafrao').qty;
    const total = frangoKg * this.state.priceFrango + acafraoG * this.state.priceAcafrao + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceFrango: this.state.priceFrango, priceAcafrao: this.state.priceAcafrao,
      setPriceFrango: (e) => this.setState({ priceFrango: Number(e.target.value) || 0 }),
      setPriceAcafrao: (e) => this.setState({ priceAcafrao: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Arroz bomba ou arbóreo","base":400,"kind":"g"},{"name":"Frango em pedaços","base":500,"kind":"g","key":"frango"},{"name":"Feijão-verde","base":150,"kind":"g"},{"name":"Tomates","base":2,"kind":"unit"},{"name":"Açafrão","base":1,"kind":"g","key":"acafrao"},{"name":"Caldo de frango","base":1000,"kind":"ml"}],"steps":["Doure o frango em azeite numa paellera até dourar por igual em toda a superfície.","Adicione o feijão-verde e o tomate picado, refogando bem por alguns minutos.","Junte o arroz e misture para envolver nos temperos por 1 a 2 minutos.","Adicione o caldo de frango quente com o açafrão dissolvido, e cozinhe sem mexer até o arroz absorver o líquido.","Deixe formar a crosta dourada no fundo (o socarrat) e descanse por 5 minutos antes de servir."],"servings":6};})();