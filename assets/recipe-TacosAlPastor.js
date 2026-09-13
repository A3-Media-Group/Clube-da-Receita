(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Marine a carne de porco em tiras com pimentas, achiote e suco de abacaxi por algumas horas na geladeira.",
    "Grelhe a carne em fogo alto até as bordas ficarem bem tostadas, e corte em tiras finas.",
    "Aqueça as tortillas de milho na chapa até ficarem levemente tostadas.",
    "Monte os tacos com a carne, cebola e coentro picados, finalizando com um pedaço de abacaxi grelhado.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Carne de porco em tiras", base: 800, kind: "g", key: "carne" },
    { name: "Abacaxi em cubos", base: 200, kind: "g" },
    { name: "Cebola", base: 1, kind: "unit" },
    { name: "Tortillas de milho", base: 12, kind: "unit", key: "tortilla" },
  ];
  function scale(base, kind, mult) {
    const raw = base * mult;
    if (kind === "unit") return Math.max(1, Math.round(raw));
    return Math.max(5, Math.round(raw / 5) * 5);
  }
  function fmt(qty, kind) {
    return kind === "unit" ? qty + "x" : qty + " g";
  }
  class RecipeLogic extends DCLogic {
    state = {
      dark: false,
      servings: BASE_SERVINGS,
      cookMode: false,
      cookStep: 0,
      priceCarne: 30,
      priceTortilla: 1.2,
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
      const carneKg = ingredients.find((i) => i.key === "carne").qty / 1000;
      const tortillaUnits = ingredients.find((i) => i.key === "tortilla").qty;
      const total =
        carneKg * this.state.priceCarne +
        tortillaUnits * this.state.priceTortilla +
        this.state.servings * 1;
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
        priceCarne: this.state.priceCarne,
        priceTortilla: this.state.priceTortilla,
        setPriceCarne: (e) =>
          this.setState({ priceCarne: Number(e.target.value) || 0 }),
        setPriceTortilla: (e) =>
          this.setState({ priceTortilla: Number(e.target.value) || 0 }),
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
      { name: "Carne de porco em tiras", base: 800, kind: "g", key: "carne" },
      { name: "Abacaxi em cubos", base: 200, kind: "g" },
      { name: "Cebola", base: 1, kind: "unit" },
      { name: "Tortillas de milho", base: 12, kind: "unit", key: "tortilla" },
    ],
    steps: [
      "Marine a carne de porco em tiras com pimentas, achiote e suco de abacaxi por algumas horas na geladeira.",
      "Grelhe a carne em fogo alto até as bordas ficarem bem tostadas, e corte em tiras finas.",
      "Aqueça as tortillas de milho na chapa até ficarem levemente tostadas.",
      "Monte os tacos com a carne, cebola e coentro picados, finalizando com um pedaço de abacaxi grelhado.",
    ],
    servings: 6,
  };
})();
