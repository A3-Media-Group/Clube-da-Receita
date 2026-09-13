(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Misture a farinha, água, fermento biológico e sal até formar uma massa lisa e elástica, e deixe crescer por 1 a 2 horas.",
    "Divida a massa em porções e abra cada uma em discos finos, com a borda um pouco mais grossa.",
    "Espalhe o molho de tomate sobre a massa, deixando a borda livre.",
    "Cubra com a mussarela em pedaços e leve ao forno o mais quente possível, até a borda dourar e o queijo borbulhar.",
    "Retire do forno e finalize com folhas de manjericão fresco e um fio de azeite.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Farinha de trigo", base: 500, kind: "g", key: "farinha" },
    { name: "Água", base: 300, kind: "g" },
    { name: "Fermento biológico", base: 7, kind: "g" },
    { name: "Molho de tomate", base: 300, kind: "g" },
    { name: "Mussarela", base: 300, kind: "g", key: "mussarela" },
  ];
  function scale(base, kind, mult) {
    const raw = base * mult;
    return Math.max(5, Math.round(raw / 5) * 5);
  }
  function fmt(qty) {
    return qty + " g";
  }
  class RecipeLogic extends DCLogic {
    state = {
      dark: false,
      servings: BASE_SERVINGS,
      cookMode: false,
      cookStep: 0,
      priceFarinha: 6,
      priceMussarela: 38,
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
        return { name: i.name, display: fmt(qty), qty, key: i.key };
      });
      const kgOf = (key) => {
        const ing = ingredients.find((i) => i.key === key);
        return ing ? ing.qty / 1000 : 0;
      };
      const total =
        kgOf("farinha") * this.state.priceFarinha +
        kgOf("mussarela") * this.state.priceMussarela +
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
        priceFarinha: this.state.priceFarinha,
        priceMussarela: this.state.priceMussarela,
        setPriceFarinha: (e) =>
          this.setState({ priceFarinha: Number(e.target.value) || 0 }),
        setPriceMussarela: (e) =>
          this.setState({ priceMussarela: Number(e.target.value) || 0 }),
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
      { name: "Farinha de trigo", base: 500, kind: "g", key: "farinha" },
      { name: "Água", base: 300, kind: "g" },
      { name: "Fermento biológico", base: 7, kind: "g" },
      { name: "Molho de tomate", base: 300, kind: "g" },
      { name: "Mussarela", base: 300, kind: "g", key: "mussarela" },
    ],
    steps: [
      "Misture a farinha, água, fermento biológico e sal até formar uma massa lisa e elástica, e deixe crescer por 1 a 2 horas.",
      "Divida a massa em porções e abra cada uma em discos finos, com a borda um pouco mais grossa.",
      "Espalhe o molho de tomate sobre a massa, deixando a borda livre.",
      "Cubra com a mussarela em pedaços e leve ao forno o mais quente possível, até a borda dourar e o queijo borbulhar.",
      "Retire do forno e finalize com folhas de manjericão fresco e um fio de azeite.",
    ],
    servings: 6,
  };
})();
