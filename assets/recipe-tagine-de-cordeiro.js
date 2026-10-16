(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Doure os cubos de cordeiro numa panela funda até selar por todos os lados.",
  "Adicione a cebola picada e as especiarias (cominho, canela, gengibre, açafrão), refogando até perfumar.",
  "Cubra com caldo ou água e cozinhe em fogo baixo, tampado, por cerca de 2 horas, até a carne ficar bem macia.",
  "Nos últimos 20 minutos, adicione o damasco seco e o grão-de-bico cozido, e sirva com pão ou cuscuz."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Cordeiro em cubos", base: 1000, kind: "g", key: "cordeiro" },
  { name: "Cebolas", base: 2, kind: "unit" },
  { name: "Damasco seco", base: 100, kind: "g" },
  { name: "Grão-de-bico cozido", base: 200, kind: "g" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { return kind === "unit" ? qty + "x" : qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceCordeiro: 55 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const cordeiroKg = ingredients.find(i => i.key === 'cordeiro').qty / 1000;
    const total = cordeiroKg * this.state.priceCordeiro + this.state.servings * 2;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceCordeiro: this.state.priceCordeiro,
      setPriceCordeiro: (e) => this.setState({ priceCordeiro: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Cordeiro em cubos","base":1000,"kind":"g","key":"cordeiro"},{"name":"Cebolas","base":2,"kind":"unit"},{"name":"Damasco seco","base":100,"kind":"g"},{"name":"Grão-de-bico cozido","base":200,"kind":"g"}],"steps":["Doure os cubos de cordeiro numa panela funda até selar por todos os lados.","Adicione a cebola picada e as especiarias (cominho, canela, gengibre, açafrão), refogando até perfumar.","Cubra com caldo ou água e cozinhe em fogo baixo, tampado, por cerca de 2 horas, até a carne ficar bem macia.","Nos últimos 20 minutos, adicione o damasco seco e o grão-de-bico cozido, e sirva com pão ou cuscuz."],"servings":6};})();