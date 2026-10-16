(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Corte o peixe fresco em cubos pequenos e coloque numa tigela bem gelada.",
  "Cubra completamente com o suco de limão fresco e deixe curar por 5 a 10 minutos, até a carne ficar opaca.",
  "Misture a cebola roxa em fatias finas, a pimenta e o coentro picado.",
  "Tempere com sal a gosto e sirva imediatamente, acompanhado de milho cozido e batata-doce."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Peixe branco fresco", base: 600, kind: "g", key: "peixe" },
  { name: "Suco de limão", base: 300, kind: "ml" },
  { name: "Cebola roxa", base: 1, kind: "unit" },
  { name: "Pimenta e coentro", base: 1, kind: "unit" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); if (kind === "ml") return Math.max(10, Math.round(raw / 10) * 10); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { if (kind === "ml") return qty + " ml"; if (kind === "unit") return qty + "x"; return qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, pricePeixe: 60 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const peixeKg = ingredients.find(i => i.key === 'peixe').qty / 1000;
    const total = peixeKg * this.state.pricePeixe + this.state.servings * 1;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, pricePeixe: this.state.pricePeixe,
      setPricePeixe: (e) => this.setState({ pricePeixe: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Peixe branco fresco","base":600,"kind":"g","key":"peixe"},{"name":"Suco de limão","base":300,"kind":"ml"},{"name":"Cebola roxa","base":1,"kind":"unit"},{"name":"Pimenta e coentro","base":1,"kind":"unit"}],"steps":["Corte o peixe fresco em cubos pequenos e coloque numa tigela bem gelada.","Cubra completamente com o suco de limão fresco e deixe curar por 5 a 10 minutos, até a carne ficar opaca.","Misture a cebola roxa em fatias finas, a pimenta e o coentro picado.","Tempere com sal a gosto e sirva imediatamente, acompanhado de milho cozido e batata-doce."],"servings":6};})();