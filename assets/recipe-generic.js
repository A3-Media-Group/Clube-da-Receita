"use strict";
// Lógica das receitas geradas a partir de dados (receitas novas).
// Lê o JSON embutido na página e expõe a mesma interface usada por site.js.
(() => {
  const node = document.getElementById("recipe-json");
  if (!node) return;
  const data = JSON.parse(node.textContent);
  const money = (n) => "R$ " + n.toFixed(2).replace(".", ",");
  window.recipeData = data;
  window.recipeLogic = {
    state: { servings: data.servings, priceTotal: data.cost },
    renderVals() {
      const total = (this.state.priceTotal * this.state.servings) / data.servings;
      return {
        totalCostDisplay: money(total),
        perServingCostDisplay: money(total / this.state.servings),
      };
    },
  };
})();
