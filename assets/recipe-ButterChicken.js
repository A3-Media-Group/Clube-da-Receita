(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Marine o frango em iogurte com especiarias (garam masala, cominho, páprica, alho e gengibre) por ao menos 1 hora.",
  "Grelhe ou asse o frango marinado até dourar bem por fora.",
  "Prepare o molho refogando alho e gengibre na manteiga, adicionando a polpa de tomate e as especiarias, e cozinhe por 15 minutos.",
  "Finalize o molho com o creme de leite, junte o frango grelhado e cozinhe por mais 10 minutos até incorporar bem."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Peito de frango em cubos", base: 700, kind: "g", key: "frango" },
  { name: "Iogurte natural", base: 200, kind: "g" },
  { name: "Manteiga", base: 60, kind: "g", key: "manteiga" },
  { name: "Creme de leite", base: 200, kind: "ml" },
  { name: "Polpa de tomate", base: 400, kind: "g" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "ml") return Math.max(10, Math.round(raw / 10) * 10); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { return kind === "ml" ? qty + " ml" : qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceFrango: 22, priceManteiga: 40 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const frangoKg = ingredients.find(i => i.key === 'frango').qty / 1000;
    const manteigaKg = ingredients.find(i => i.key === 'manteiga').qty / 1000;
    const total = frangoKg * this.state.priceFrango + manteigaKg * this.state.priceManteiga + this.state.servings * 2;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceFrango: this.state.priceFrango, priceManteiga: this.state.priceManteiga,
      setPriceFrango: (e) => this.setState({ priceFrango: Number(e.target.value) || 0 }),
      setPriceManteiga: (e) => this.setState({ priceManteiga: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Peito de frango em cubos","base":700,"kind":"g","key":"frango"},{"name":"Iogurte natural","base":200,"kind":"g"},{"name":"Manteiga","base":60,"kind":"g","key":"manteiga"},{"name":"Creme de leite","base":200,"kind":"ml"},{"name":"Polpa de tomate","base":400,"kind":"g"}],"steps":["Marine o frango em iogurte com especiarias (garam masala, cominho, páprica, alho e gengibre) por ao menos 1 hora.","Grelhe ou asse o frango marinado até dourar bem por fora.","Prepare o molho refogando alho e gengibre na manteiga, adicionando a polpa de tomate e as especiarias, e cozinhe por 15 minutos.","Finalize o molho com o creme de leite, junte o frango grelhado e cozinhe por mais 10 minutos até incorporar bem."],"servings":6};})();