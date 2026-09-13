(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Misture o biscoito triturado com a manteiga derretida e pressione no fundo de uma forma, formando a base.",
  "Leve a base ao forno por 10 minutos para firmar levemente, e deixe esfriar.",
  "Bata o cream cheese com o açúcar até ficar liso, adicione os ovos um a um e depois o creme de leite e a vanilla.",
  "Despeje o recheio sobre a base e asse em banho-maria a 160°C por cerca de 50 minutos, até as bordas firmarem e o centro ainda tremer levemente.",
  "Deixe esfriar completamente e leve à geladeira por ao menos 4 horas antes de servir."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Biscoito tipo maisena", base: 200, kind: "g" },
  { name: "Manteiga derretida", base: 80, kind: "g" },
  { name: "Cream cheese", base: 600, kind: "g", key: "creamcheese" },
  { name: "Açúcar", base: 180, kind: "g" },
  { name: "Ovos", base: 3, kind: "unit" },
  { name: "Creme de leite fresco", base: 150, kind: "ml" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); if (kind === "ml") return Math.max(10, Math.round(raw / 10) * 10); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { if (kind === "ml") return qty + " ml"; if (kind === "unit") return qty + "x"; return qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceCreamCheese: 48 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const ccKg = ingredients.find(i => i.key === 'creamcheese').qty / 1000;
    const total = ccKg * this.state.priceCreamCheese + this.state.servings * 2;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceCreamCheese: this.state.priceCreamCheese,
      setPriceCreamCheese: (e) => this.setState({ priceCreamCheese: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Biscoito tipo maisena","base":200,"kind":"g"},{"name":"Manteiga derretida","base":80,"kind":"g"},{"name":"Cream cheese","base":600,"kind":"g","key":"creamcheese"},{"name":"Açúcar","base":180,"kind":"g"},{"name":"Ovos","base":3,"kind":"unit"},{"name":"Creme de leite fresco","base":150,"kind":"ml"}],"steps":["Misture o biscoito triturado com a manteiga derretida e pressione no fundo de uma forma, formando a base.","Leve a base ao forno por 10 minutos para firmar levemente, e deixe esfriar.","Bata o cream cheese com o açúcar até ficar liso, adicione os ovos um a um e depois o creme de leite e a vanilla.","Despeje o recheio sobre a base e asse em banho-maria a 160°C por cerca de 50 minutos, até as bordas firmarem e o centro ainda tremer levemente.","Deixe esfriar completamente e leve à geladeira por ao menos 4 horas antes de servir."],"servings":6};})();