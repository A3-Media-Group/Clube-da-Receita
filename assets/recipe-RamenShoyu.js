(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Prepare um caldo apurado cozinhando ossos de porco ou frango por várias horas com alho e gengibre.",
    "Tempere o caldo com o molho shoyu até equilibrar o sal e o umami.",
    "Cozinhe o macarrão de ramen fresco em água fervente por 1 a 2 minutos, e escorra bem.",
    "Monte a tigela com o macarrão, o caldo bem quente, fatias de chashu e o ovo cozido pela metade.",
    "Finalize com cebolinha picada e uma tira de alga nori antes de servir.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Caldo de porco ou frango", base: 1500, kind: "ml" },
    { name: "Molho shoyu", base: 100, kind: "ml" },
    {
      name: "Macarrão de ramen fresco",
      base: 6,
      kind: "unit",
      key: "macarrao",
    },
    { name: "Chashu (lombo de porco)", base: 300, kind: "g", key: "chashu" },
    { name: "Ovos cozidos", base: 6, kind: "unit" },
  ];
  function scale(base, kind, mult) {
    const raw = base * mult;
    if (kind === "unit") return Math.max(1, Math.round(raw));
    if (kind === "ml") return Math.max(50, Math.round(raw / 50) * 50);
    return Math.max(5, Math.round(raw / 5) * 5);
  }
  function fmt(qty, kind) {
    if (kind === "ml") return qty + " ml";
    if (kind === "unit") return qty + "x";
    return qty + " g";
  }
  class RecipeLogic extends DCLogic {
    state = {
      dark: false,
      servings: BASE_SERVINGS,
      cookMode: false,
      cookStep: 0,
      priceChashu: 45,
      priceMacarrao: 6,
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
      const chashuKg = ingredients.find((i) => i.key === "chashu").qty / 1000;
      const macarraoUnits = ingredients.find((i) => i.key === "macarrao").qty;
      const total =
        chashuKg * this.state.priceChashu +
        macarraoUnits * this.state.priceMacarrao +
        this.state.servings * 1.5;
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
        priceChashu: this.state.priceChashu,
        priceMacarrao: this.state.priceMacarrao,
        setPriceChashu: (e) =>
          this.setState({ priceChashu: Number(e.target.value) || 0 }),
        setPriceMacarrao: (e) =>
          this.setState({ priceMacarrao: Number(e.target.value) || 0 }),
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
      { name: "Caldo de porco ou frango", base: 1500, kind: "ml" },
      { name: "Molho shoyu", base: 100, kind: "ml" },
      {
        name: "Macarrão de ramen fresco",
        base: 6,
        kind: "unit",
        key: "macarrao",
      },
      { name: "Chashu (lombo de porco)", base: 300, kind: "g", key: "chashu" },
      { name: "Ovos cozidos", base: 6, kind: "unit" },
    ],
    steps: [
      "Prepare um caldo apurado cozinhando ossos de porco ou frango por várias horas com alho e gengibre.",
      "Tempere o caldo com o molho shoyu até equilibrar o sal e o umami.",
      "Cozinhe o macarrão de ramen fresco em água fervente por 1 a 2 minutos, e escorra bem.",
      "Monte a tigela com o macarrão, o caldo bem quente, fatias de chashu e o ovo cozido pela metade.",
      "Finalize com cebolinha picada e uma tira de alga nori antes de servir.",
    ],
    servings: 6,
  };
})();
