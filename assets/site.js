"use strict";
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const storage = {
  get(k, f) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? f;
    } catch {
      return f;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch {
      return false;
    }
  },
};
let saved = storage.get("clube-favorites", []);
if (!Array.isArray(saved)) saved = [];
const normalize = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
function toast(s) {
  let t = $(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.append(t);
  }
  t.textContent = s;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.remove(), 3500);
}
function syncSaved() {
  $$("[data-save]").forEach((b) => {
    const yes = saved.includes(b.dataset.save);
    b.setAttribute("aria-pressed", String(yes));
    b.textContent = b.classList.contains("save")
      ? yes
        ? "♥"
        : "♡"
      : yes
        ? "♥ Receita salva"
        : "♡ Salvar receita";
    if (b.classList.contains("save"))
      b.setAttribute(
        "aria-label",
        (yes ? "Remover dos favoritos: " : "Salvar: ") +
          b.closest(".recipe-card").querySelector("h3").textContent,
      );
  });
}
$$("[data-save]").forEach((b) =>
  b.addEventListener("click", () => {
    const f = b.dataset.save;
    saved = saved.includes(f) ? saved.filter((x) => x !== f) : [...saved, f];
    const ok = storage.set("clube-favorites", saved);
    syncSaved();
    filter();
    toast(
      ok
        ? saved.includes(f)
          ? "Receita guardada no seu caderno."
          : "Receita removida do caderno."
        : "Favorito atualizado nesta página. O navegador bloqueou o armazenamento.",
    );
  }),
);
syncSaved();
$(".menu-toggle")?.addEventListener("click", (e) => {
  const open = e.currentTarget.getAttribute("aria-expanded") !== "true";
  e.currentTarget.setAttribute("aria-expanded", String(open));
  $("#navigation").classList.toggle("open", open);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $("#navigation")?.classList.remove("open");
    $(".menu-toggle")?.setAttribute("aria-expanded", "false");
  }
});
function filter() {
  const catalog = $(".catalogue");
  if (!catalog) return;
  const query = normalize($("#catalogue-search").value),
    difficulty = $("#difficulty").value,
    mode = catalog.dataset.mode;
  const terms =
    mode === "fridge"
      ? query
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      : [query];
  let count = 0;
  $$(".recipe-card").forEach((c) => {
    const match =
      terms.every((t) => normalize(c.dataset.search).includes(t)) &&
      (!difficulty || c.dataset.difficulty === difficulty) &&
      (mode !== "saved" || saved.includes(c.dataset.recipe));
    c.hidden = !match;
    if (match) count++;
  });
  $("#result-count").textContent =
    `${count} ${count === 1 ? "receita encontrada" : "receitas encontradas"}`;
  $("#empty-state").hidden = count > 0;
  if (mode === "saved" && count === 0)
    $("#empty-state").textContent =
      "Seu caderno está esperando a primeira receita. Toque no coração das receitas para guardá-las aqui.";
}
if ($("#catalogue-search")) {
  $("#catalogue-search").value =
    new URLSearchParams(location.search).get("q") || "";
  $("#catalogue-search").addEventListener("input", filter);
  $("#difficulty").addEventListener("change", filter);
  filter();
}
$$("[data-print]").forEach((b) =>
  b.addEventListener("click", () => window.print()),
);
window.addEventListener("DOMContentLoaded", () => {
  if (window.recipeLogic) {
    const model = window.recipeLogic,
      data = window.recipeData,
      base = data.servings;
    function update() {
      const v = model.renderVals();
      $("#servings-count").textContent = model.state.servings;
      $$("[data-quantity]").forEach((n) => {
        const i = data.ingredients[Number(n.dataset.quantity)],
          qty = (i.base * model.state.servings) / base,
          unit =
            {
              g: "g",
              ml: "ml",
              unit: "un.",
              tbsp: "colher(es) de sopa",
              tsp: "colher(es) de chá",
            }[i.kind] || i.kind;
        n.textContent = `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(qty)} ${unit}`;
      });
      $("#total-cost").textContent = v.totalCostDisplay;
      $("#portion-cost").textContent = v.perServingCostDisplay;
      $("#servings-minus").disabled = model.state.servings <= 1;
      $("#servings-plus").disabled = model.state.servings >= 24;
    }
    $("#servings-minus").addEventListener("click", () => {
      model.state.servings = Math.max(1, model.state.servings - 1);
      update();
    });
    $("#servings-plus").addEventListener("click", () => {
      model.state.servings = Math.min(24, model.state.servings + 1);
      update();
    });
    $$("[data-price]").forEach((n) =>
      n.addEventListener("input", () => {
        model.state[n.dataset.price] = Math.min(
          100000,
          Math.max(0, Number(n.value) || 0),
        );
        update();
      }),
    );
    update();
    let step = 0;
    const d = $("#cook-dialog");
    function cook() {
      $("#cook-progress").textContent =
        `Passo ${step + 1} de ${data.steps.length}`;
      $("#cook-text").textContent = data.steps[step];
      $("#cook-prev").disabled = step === 0;
      $("#cook-next").textContent =
        step === data.steps.length - 1 ? "Concluir ✓" : "Próximo →";
    }
    $("#cook-start").addEventListener("click", () => {
      step = 0;
      cook();
      d.showModal();
    });
    $("#cook-close").addEventListener("click", () => d.close());
    $("#cook-prev").addEventListener("click", () => {
      step = Math.max(0, step - 1);
      cook();
    });
    $("#cook-next").addEventListener("click", () => {
      if (step === data.steps.length - 1) d.close();
      else {
        step++;
        cook();
      }
    });
    d.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        $("#cook-next").click();
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        $("#cook-prev").click();
        e.preventDefault();
      }
    });
    d.addEventListener("close", () => $("#cook-start").focus());
  }
  if (window.toolsLogic) {
    const model = window.toolsLogic;
    const stored = storage.get("clube-shopping", null);
    if (Array.isArray(stored))
      model.state.shopList = stored.filter((x) => typeof x === "string");
    window.updateTools = () => {
      const v = model.renderVals();
      $$(".tools-content [data-bind-text]").forEach((e) => {
        if (!e.closest("template")) e.textContent = v[e.dataset.bindText] ?? "";
      });
      $$(".tools-content [data-bind-value]").forEach((e) => {
        if (document.activeElement !== e)
          e.value = v[e.dataset.bindValue] ?? "";
      });
      $$(".tools-content [data-bind-class]").forEach((e) => {
        e.className = v[e.dataset.bindClass] ?? "";
        if (e.dataset.onclick?.startsWith("setMeat"))
          e.setAttribute("aria-pressed", String(e.classList.contains("on")));
      });
      $$(".tools-content [data-list]").forEach((e) => {
        const key = e.dataset.list,
          items = v[key] || [];
        e.replaceChildren();
        items.forEach((item, i) => {
          const row = document.createElement("div");
          if (key === "shopList") {
            const label = document.createElement("label"),
              check = document.createElement("input");
            check.type = "checkbox";
            label.append(check, document.createTextNode(" " + item + " "));
            const remove = document.createElement("button");
            remove.textContent = "Remover";
            remove.setAttribute("aria-label", "Remover " + item);
            remove.addEventListener("click", () =>
              model.setState({
                shopList: model.state.shopList.filter((_, j) => j !== i),
              }),
            );
            row.append(label, remove);
          } else if (key === "meatPoints") {
            row.textContent = item.name + " — " + item.temp;
            row.style.padding = "8px 0";
          } else row.textContent = String(item);
          e.append(row);
        });
      });
      storage.set("clube-shopping", model.state.shopList);
    };
    $$(".tools-content [data-onclick],.tools-content [data-onchange]").forEach(
      (e) => {
        const key = e.dataset.onclick || e.dataset.onchange;
        if (e.dataset.onclick) {
          if (e.tagName !== "BUTTON") {
            e.setAttribute("role", "button");
            e.tabIndex = 0;
            e.addEventListener("keydown", (ev) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                e.click();
              }
            });
          }
          e.addEventListener("click", (ev) => {
            model.renderVals()[key]?.(ev);
          });
        } else {
          e.addEventListener(
            e.tagName === "SELECT" ? "change" : "input",
            (ev) => {
              if (e.type === "number" && Number(e.value) < 0) e.value = "0";
              model.renderVals()[key]?.(ev);
            },
          );
        }
      },
    );
    // Tool panels stay expanded for immediate access; no inactive accordion controls.
    $$('.tools-content [data-onclick^="toggle"]').forEach((b) => {
      b.removeAttribute("data-onclick");
      b.disabled = true;
      b.style.opacity = "1";
      b.style.cursor = "default";
    });
    $$(".tools-content input,.tools-content select").forEach((e, i) => {
      if (!e.id) e.id = "tool-field-" + i;
      const lab = e.closest("label");
      if (lab) lab.htmlFor = e.id;
      else e.setAttribute("aria-label", e.dataset.bindValue || "Valor");
      if (e.type === "number") e.min = "0";
    });
    window.updateTools();
  }
});
$("#contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const subject = "Contato pelo Clube da Receita — " + f.get("name");
  const body = `Nome: ${f.get("name")}\nE-mail: ${f.get("email")}\n\n${f.get("message")}`;
  location.href = `mailto:contato@clubedareceita.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $("#contact-status").textContent =
    "Mensagem preparada. Conclua o envio no seu aplicativo de e-mail ou escreva diretamente para o endereço ao lado.";
});
