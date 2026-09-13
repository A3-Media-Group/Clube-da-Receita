(() => {
  class DCLogic {
    setState(p) {
      Object.assign(this.state, typeof p === "function" ? p(this.state) : p);
    }
  }

  const STEPS = [
    "Cozinhe o espaguete em água bem salgada até ficar al dente, reservando uma xícara da água do cozimento.",
    "Corte o guanciale em tiras finas e frite em fogo baixo, sem óleo, até dourar e soltar a gordura.",
    "Bata os ovos com o queijo pecorino ralado e bastante pimenta preta moída, até formar um creme homogêneo.",
    "Escorra a massa e misture rapidamente com o guanciale, fora do fogo, para não cozinhar o ovo ainda.",
    "Adicione a mistura de ovos e queijo, misturando vigorosamente e usando a água reservada para dar cremosidade, sem deixar formar grumos.",
  ];
  const BASE_SERVINGS = 6;
  const BASE_INGREDIENTS = [
    { name: "Espaguete", base: 500, kind: "g" },
    { name: "Ovos", base: 4, kind: "unit" },
    { name: "Guanciale ou bacon", base: 150, kind: "g", key: "guanciale" },
    { name: "Queijo pecorino ralado", base: 100, kind: "g", key: "pecorino" },
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
      priceGuanciale: 55,
      pricePecorino: 70,
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
        kgOf("guanciale") * this.state.priceGuanciale +
        kgOf("pecorino") * this.state.pricePecorino +
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
        priceGuanciale: this.state.priceGuanciale,
        pricePecorino: this.state.pricePecorino,
        setPriceGuanciale: (e) =>
          this.setState({ priceGuanciale: Number(e.target.value) || 0 }),
        setPricePecorino: (e) =>
          this.setState({ pricePecorino: Number(e.target.value) || 0 }),
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
      { name: "Espaguete", base: 500, kind: "g" },
      { name: "Ovos", base: 4, kind: "unit" },
      { name: "Guanciale ou bacon", base: 150, kind: "g", key: "guanciale" },
      { name: "Queijo pecorino ralado", base: 100, kind: "g", key: "pecorino" },
    ],
    steps: [
      "Cozinhe o espaguete em água bem salgada até ficar al dente, reservando uma xícara da água do cozimento.",
      "Corte o guanciale em tiras finas e frite em fogo baixo, sem óleo, até dourar e soltar a gordura.",
      "Bata os ovos com o queijo pecorino ralado e bastante pimenta preta moída, até formar um creme homogêneo.",
      "Escorra a massa e misture rapidamente com o guanciale, fora do fogo, para não cozinhar o ovo ainda.",
      "Adicione a mistura de ovos e queijo, misturando vigorosamente e usando a água reservada para dar cremosidade, sem deixar formar grumos.",
    ],
    servings: 6,
  };
})();
