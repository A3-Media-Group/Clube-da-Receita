(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Numa panela, ferva o tucupi com o alho amassado até reduzir levemente e apurar o sabor. Tempere com sal a gosto.",
    "Dissolva a goma de tapioca em um pouco de água fria, formando uma pasta homogênea.",
    "Adicione a pasta de goma ao tucupi fervente, mexendo sem parar até engrossar levemente e ficar translúcido.",
    "Escalde as folhas de jambu em água fervente por cerca de 1 minuto, até murcharem, e escorra.",
    "Monte na cuia: primeiro a goma, depois o tucupi fervente, o jambu escaldado e o camarão seco. Sirva com pimenta a gosto.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Tucupi", base: 1500, kind: "ml", key: "tucupi" },
    { name: "Goma de tapioca", base: 200, kind: "g" },
    { name: "Camarão seco", base: 150, kind: "g", key: "camarao" },
    { name: "Folhas de jambu", base: 2, kind: "unit" },
    { name: "Dentes de alho", base: 3, kind: "unit" },
  ];
  function scale(base, kind, mult) {
    const raw = base * mult;
    if (kind === "unit") return Math.max(1, Math.round(raw));
    if (kind === "ml") return Math.max(50, Math.round(raw / 50) * 50);
    return Math.max(5, Math.round(raw / 5) * 5);
  }
  function fmt(qty, kind) {
    if (kind === "g") return qty + " g";
    if (kind === "ml") return qty + " ml";
    return qty + "x";
  }
  class RecipeLogic extends DCLogic {
    state = {
      dark: false,
      servings: BASE_SERVINGS,
      cookMode: false,
      cookStep: 0,
      priceTucupi: 12,
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
      const tucupiL = ingredients.find((i) => i.key === "tucupi").qty / 1000;
      const camaraoKg = ingredients.find((i) => i.key === "camarao").qty / 1000;
      const total =
        tucupiL * this.state.priceTucupi +
        camaraoKg * this.state.priceCamarao +
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
        priceTucupi: this.state.priceTucupi,
        priceCamarao: this.state.priceCamarao,
        setPriceTucupi: (e) =>
          this.setState({ priceTucupi: Number(e.target.value) || 0 }),
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
      { name: "Tucupi", base: 1500, kind: "ml", key: "tucupi" },
      { name: "Goma de tapioca", base: 200, kind: "g" },
      { name: "Camarão seco", base: 150, kind: "g", key: "camarao" },
      { name: "Folhas de jambu", base: 2, kind: "unit" },
      { name: "Dentes de alho", base: 3, kind: "unit" },
    ],
    steps: [
      "Numa panela, ferva o tucupi com o alho amassado até reduzir levemente e apurar o sabor. Tempere com sal a gosto.",
      "Dissolva a goma de tapioca em um pouco de água fria, formando uma pasta homogênea.",
      "Adicione a pasta de goma ao tucupi fervente, mexendo sem parar até engrossar levemente e ficar translúcido.",
      "Escalde as folhas de jambu em água fervente por cerca de 1 minuto, até murcharem, e escorra.",
      "Monte na cuia: primeiro a goma, depois o tucupi fervente, o jambu escaldado e o camarão seco. Sirva com pimenta a gosto.",
    ],
    servings: 6,
  };
})();
