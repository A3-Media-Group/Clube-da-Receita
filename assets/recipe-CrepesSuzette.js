(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}

const STEPS = [
  "Misture a farinha, o leite e os ovos até obter uma massa lisa e fina, e deixe descansar por 30 minutos.",
  "Frite discos finos numa frigideira untada com manteiga, dourando dos dois lados.",
  "Numa frigideira separada, derreta manteiga com açúcar até caramelizar levemente.",
  "Adicione o suco de laranja à calda e deixe reduzir por alguns minutos.",
  "Dobre os crêpes na calda quente, flambe com o licor de laranja com cuidado e sirva imediatamente."
];
const BASE_SERVINGS = 6;
const BASE_INGREDIENTS = [
  { name: "Farinha de trigo", base: 250, kind: "g" },
  { name: "Leite", base: 500, kind: "ml" },
  { name: "Ovos", base: 3, kind: "unit" },
  { name: "Manteiga", base: 50, kind: "g", key: "manteiga" },
  { name: "Açúcar", base: 80, kind: "g" },
  { name: "Suco de laranja", base: 200, kind: "ml" },
  { name: "Licor de laranja", base: 50, kind: "ml", key: "licor" },
];
function scale(base, kind, mult) { const raw = base * mult; if (kind === "unit") return Math.max(1, Math.round(raw)); if (kind === "ml") return Math.max(10, Math.round(raw / 10) * 10); return Math.max(5, Math.round(raw / 5) * 5); }
function fmt(qty, kind) { if (kind === "ml") return qty + " ml"; if (kind === "unit") return qty + "x"; return qty + " g"; }
class RecipeLogic extends DCLogic {
  state = { dark: false, servings: BASE_SERVINGS, cookMode: false, cookStep: 0, priceManteiga: 40, priceLicor: 90 };
  componentDidMount() { document.addEventListener('keydown', this.onKey); }
  componentWillUnmount() { document.removeEventListener('keydown', this.onKey); }
  onKey = (e) => { if (!this.state.cookMode) return; if (e.key === 'ArrowRight') this.nextStep(); if (e.key === 'ArrowLeft') this.prevStep(); if (e.key === 'Escape') this.setState({ cookMode: false }); };
  nextStep = () => this.setState(s => ({ cookStep: Math.min(STEPS.length - 1, s.cookStep + 1) }));
  prevStep = () => this.setState(s => ({ cookStep: Math.max(0, s.cookStep - 1) }));
  renderVals() {
    const mult = this.state.servings / BASE_SERVINGS;
    const ingredients = BASE_INGREDIENTS.map(i => { const qty = scale(i.base, i.kind, mult); return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key }; });
    const manteigaKg = ingredients.find(i => i.key === 'manteiga').qty / 1000;
    const licorL = ingredients.find(i => i.key === 'licor').qty / 1000;
    const total = manteigaKg * this.state.priceManteiga + licorL * this.state.priceLicor + this.state.servings * 1.5;
    const perServing = total / this.state.servings;
    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light', toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      print: () => window.print(), servings: this.state.servings,
      incServings: () => this.setState(s => ({ servings: Math.min(24, s.servings + 1) })),
      decServings: () => this.setState(s => ({ servings: Math.max(1, s.servings - 1) })),
      ingredients, priceManteiga: this.state.priceManteiga, priceLicor: this.state.priceLicor,
      setPriceManteiga: (e) => this.setState({ priceManteiga: Number(e.target.value) || 0 }),
      setPriceLicor: (e) => this.setState({ priceLicor: Number(e.target.value) || 0 }),
      totalCostDisplay: 'R$ ' + total.toFixed(2).replace('.', ','),
      perServingCostDisplay: 'R$ ' + perServing.toFixed(2).replace('.', ','),
      steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
      cookMode: this.state.cookMode, enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }), exitCookMode: () => this.setState({ cookMode: false }),
      cookStepDisplay: this.state.cookStep + 1, stepsTotal: STEPS.length, currentStepText: STEPS[this.state.cookStep],
    };
  }
}

window.recipeLogic=new RecipeLogic();window.recipeData={"ingredients":[{"name":"Farinha de trigo","base":250,"kind":"g"},{"name":"Leite","base":500,"kind":"ml"},{"name":"Ovos","base":3,"kind":"unit"},{"name":"Manteiga","base":50,"kind":"g","key":"manteiga"},{"name":"Açúcar","base":80,"kind":"g"},{"name":"Suco de laranja","base":200,"kind":"ml"},{"name":"Licor de laranja","base":50,"kind":"ml","key":"licor"}],"steps":["Misture a farinha, o leite e os ovos até obter uma massa lisa e fina, e deixe descansar por 30 minutos.","Frite discos finos numa frigideira untada com manteiga, dourando dos dois lados.","Numa frigideira separada, derreta manteiga com açúcar até caramelizar levemente.","Adicione o suco de laranja à calda e deixe reduzir por alguns minutos.","Dobre os crêpes na calda quente, flambe com o licor de laranja com cuidado e sirva imediatamente."],"servings":6};})();