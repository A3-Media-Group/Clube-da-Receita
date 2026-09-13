(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Deixe o feijão-fradinho de molho por algumas horas e esfregue os grãos entre as mãos, em água corrente, até soltar as peles finas.",
    "Bata o feijão descascado no processador com a cebola picada e uma pitada de sal, até formar uma massa clara e aerada.",
    "Bata a massa novamente com uma colher, incorporando ar, até dobrar de volume e ficar leve.",
    "Aqueça o azeite de dendê numa panela funda e frite porções da massa, moldadas com duas colheres, até dourar por igual.",
    "Corte o acarajé ao meio sem separar as metades e recheie com vatapá, camarão seco e vinagrete de tomate e pimenta a gosto.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Feijão fradinho", base: 500, kind: "g", key: "feijao" },
    { name: "Cebola picada", base: 1, kind: "unit" },
    { name: "Azeite de dendê (fritura)", base: 500, kind: "g", key: "dende" },
    { name: "Camarão seco", base: 100, kind: "g", key: "camarao" },
    { name: "Vatapá para recheio", base: 300, kind: "g" },
  ];
  function scale(base, kind, mult) {
    const raw = base * mult;
    if (kind === "unit") return Math.max(1, Math.round(raw));
    return Math.max(5, Math.round(raw / 5) * 5);
  }
  function fmt(qty, kind) {
    return kind === "g" ? qty + " g" : qty + "x";
  }
  class RecipeLogic extends DCLogic {
    state = {
      dark: false,
      servings: BASE_SERVINGS,
      cookMode: false,
      cookStep: 0,
      priceFeijao: 12,
      priceDende: 30,
      priceCamarao: 70,
    };
    componentDidMount() {
      document.addEventListener("keydown", this.onKey);
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.onKey);
    }
    onKey = (e) => {
      if (!this.state.cookMode) return;
      if (e.key === "ArrowRight") this.nextStep();
      if (e.key === "ArrowLeft") this.prevStep();
      if (e.key === "Escape") this.setState({ cookMode: false });
    };
    nextStep = () =>
      this.setState((s) => ({
        cookStep: Math.min(STEPS.length - 1, s.cookStep + 1),
      }));
    prevStep = () =>
      this.setState((s) => ({ cookStep: Math.max(0, s.cookStep - 1) }));
    renderVals() {
      const mult = this.state.servings / BASE_SERVINGS;
      const ingredients = BASE_INGREDIENTS.map((i) => {
        const qty = scale(i.base, i.kind, mult);
        return { name: i.name, display: fmt(qty, i.kind), qty, key: i.key };
      });
      const kgOf = (key) => {
        const ing = ingredients.find((i) => i.key === key);
        return ing ? ing.qty / 1000 : 0;
      };
      const total =
        kgOf("feijao") * this.state.priceFeijao +
        kgOf("dende") * this.state.priceDende +
        kgOf("camarao") * this.state.priceCamarao +
        this.state.servings * 2;
      const perServing = total / this.state.servings;
      return {
        dark: this.state.dark,
        theme: this.state.dark ? "dark" : "light",
        toggleTheme: () => this.setState((s) => ({ dark: !s.dark })),
        print: () => window.print(),
        servings: this.state.servings,
        incServings: () =>
          this.setState((s) => ({ servings: Math.min(24, s.servings + 1) })),
        decServings: () =>
          this.setState((s) => ({ servings: Math.max(1, s.servings - 1) })),
        ingredients,
        priceFeijao: this.state.priceFeijao,
        priceDende: this.state.priceDende,
        priceCamarao: this.state.priceCamarao,
        setPriceFeijao: (e) =>
          this.setState({ priceFeijao: Number(e.target.value) || 0 }),
        setPriceDende: (e) =>
          this.setState({ priceDende: Number(e.target.value) || 0 }),
        setPriceCamarao: (e) =>
          this.setState({ priceCamarao: Number(e.target.value) || 0 }),
        totalCostDisplay: "R$ " + total.toFixed(2).replace(".", ","),
        perServingCostDisplay: "R$ " + perServing.toFixed(2).replace(".", ","),
        steps: STEPS.map((t, i) => ({ n: i + 1, text: t })),
        cookMode: this.state.cookMode,
        enterCookMode: () => this.setState({ cookMode: true, cookStep: 0 }),
        exitCookMode: () => this.setState({ cookMode: false }),
        cookStepDisplay: this.state.cookStep + 1,
        stepsTotal: STEPS.length,
        currentStepText: STEPS[this.state.cookStep],
      };
    }
  }

  scale = (base, kind, mult) => base * mult;
  window.recipeLogic = new RecipeLogic();
  window.recipeData = {
    ingredients: [
      { name: "Feijão fradinho", base: 500, kind: "g", key: "feijao" },
      { name: "Cebola picada", base: 1, kind: "unit" },
      { name: "Azeite de dendê (fritura)", base: 500, kind: "g", key: "dende" },
      { name: "Camarão seco", base: 100, kind: "g", key: "camarao" },
      { name: "Vatapá para recheio", base: 300, kind: "g" },
    ],
    steps: [
      "Deixe o feijão-fradinho de molho por algumas horas e esfregue os grãos entre as mãos, em água corrente, até soltar as peles finas.",
      "Bata o feijão descascado no processador com a cebola picada e uma pitada de sal, até formar uma massa clara e aerada.",
      "Bata a massa novamente com uma colher, incorporando ar, até dobrar de volume e ficar leve.",
      "Aqueça o azeite de dendê numa panela funda e frite porções da massa, moldadas com duas colheres, até dourar por igual.",
      "Corte o acarajé ao meio sem separar as metades e recheie com vatapá, camarão seco e vinagrete de tomate e pimenta a gosto.",
    ],
    servings: 6,
  };
})();
