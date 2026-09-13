(()=>{class DCLogic{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p);window.updateTools?.()}}

const DENSITY = {
  // grams per cup (240ml), tbsp = cup/16, tsp = cup/48
  farinha: { cup: 120, label: "farinha de trigo" },
  acucar: { cup: 200, label: "açúcar" },
  manteiga: { cup: 227, label: "manteiga" },
  arroz: { cup: 185, label: "arroz cru" },
  agua: { cup: 240, label: "água/leite" },
};
const SUBS = {
  fermento: "1 colher de chá de fermento em pó ≈ 1/4 colher de chá de bicarbonato de sódio + 1/2 colher de chá de suco de limão ou vinagre.",
  manteiga: "Substitua em proporção 1:1 por óleo vegetal (o resultado fica menos aerado e levemente mais úmido).",
  ovo: "Para receitas veganas: 1 ovo ≈ 1 colher de sopa de farinha de linhaça + 3 colheres de sopa de água, hidratadas por 5 minutos.",
  leite: "Substitua em proporção 1:1 por bebida vegetal (aveia, amêndoas ou soja), sem açúcar para não alterar o sabor.",
};
const MEAT = {
  beef: [{ name: "Mal passado", temp: "49–52°C" }, { name: "Ao ponto", temp: "60–63°C" }, { name: "Bem passado", temp: "71°C+" }],
  pork: [{ name: "Ao ponto", temp: "63°C" }, { name: "Bem passado", temp: "71°C+" }],
  chicken: [{ name: "Seguro para consumo", temp: "74°C" }],
  fish: [{ name: "Malpassado (atum/salmão)", temp: "52°C" }, { name: "Bem cozido", temp: "63°C" }],
};

class Component extends DCLogic {
  state = {
    dark: false,
    open1: true, open2: false, open3: false, open4: false, open5: false, open6: false,
    convAmount: 2, convIngredient: 'farinha', convUnit: 'xicara',
    scaleServings: 4, shopInput: '', shopList: ['500 g feijão preto', '2 folhas de louro'],
    subIngredient: 'fermento', ovenC: 180, meat: 'beef',
  };

  renderVals() {
    const d = DENSITY[this.state.convIngredient];
    let grams;
    if (this.state.convUnit === 'xicara') grams = d.cup;
    else if (this.state.convUnit === 'colhersopa') grams = d.cup / 16;
    else grams = d.cup / 48;
    const convResult = (this.state.convAmount * grams).toFixed(0) + ' g';

    const mult = this.state.scaleServings / 4;
    const roundUnit = (n) => Math.max(1, Math.round(n * mult));

    const c = this.state.ovenC;
    const f = Math.round(c * 9 / 5 + 32);
    const gas = c < 140 ? '—' : Math.max(1, Math.round((c - 121) / 14));
    const ovenLabel = c < 150 ? 'Forno baixo' : c < 200 ? 'Forno médio' : 'Forno alto';

    const meatKey = this.state.meat;
    const cls = (k) => 'chip' + (this.state.meat === k ? ' on' : '');

    return {
      dark: this.state.dark, theme: this.state.dark ? 'dark' : 'light',
      toggleTheme: () => this.setState(s => ({ dark: !s.dark })),
      open1: this.state.open1, open2: this.state.open2, open3: this.state.open3,
      open4: this.state.open4, open5: this.state.open5, open6: this.state.open6,
      arrow1: this.state.open1 ? '–' : '+', arrow2: this.state.open2 ? '–' : '+',
      arrow3: this.state.open3 ? '–' : '+', arrow4: this.state.open4 ? '–' : '+',
      arrow5: this.state.open5 ? '–' : '+', arrow6: this.state.open6 ? '–' : '+',
      toggle1: () => this.setState(s => ({ open1: !s.open1 })),
      toggle2: () => this.setState(s => ({ open2: !s.open2 })),
      toggle3: () => this.setState(s => ({ open3: !s.open3 })),
      toggle4: () => this.setState(s => ({ open4: !s.open4 })),
      toggle5: () => this.setState(s => ({ open5: !s.open5 })),
      toggle6: () => this.setState(s => ({ open6: !s.open6 })),

      convAmount: this.state.convAmount,
      setConvAmount: (e) => this.setState({ convAmount: Number(e.target.value) || 0 }),
      convIngredient: this.state.convIngredient,
      setConvIngredient: (e) => this.setState({ convIngredient: e.target.value }),
      convUnit: this.state.convUnit,
      setConvUnit: (e) => this.setState({ convUnit: e.target.value }),
      convResult,
      convIngredientLabel: d.label,

      scaleServings: this.state.scaleServings,
      incScale: () => this.setState(s => ({ scaleServings: Math.min(24, s.scaleServings + 1) })),
      decScale: () => this.setState(s => ({ scaleServings: Math.max(1, s.scaleServings - 1) })),
      scaleEggs: roundUnit(3) + ' un.',
      scaleFlour: Math.max(10, Math.round(240 * mult / 5) * 5) + ' g',
      scaleSugar: Math.max(10, Math.round(150 * mult / 5) * 5) + ' g',

      subIngredient: this.state.subIngredient,
      setSubIngredient: (e) => this.setState({ subIngredient: e.target.value }),
      subResult: SUBS[this.state.subIngredient],

      ovenC: this.state.ovenC,
      setOvenC: (e) => this.setState({ ovenC: Number(e.target.value) || 0 }),
      ovenF: f + '°F', ovenGas: gas, ovenLabel,

      shopInput: this.state.shopInput,
      setShopInput: (e) => this.setState({ shopInput: e.target.value }),
      addShopItem: () => this.state.shopInput.trim() && this.setState(s => ({ shopList: [...s.shopList, s.shopInput.trim()], shopInput: '' })),
      shopList: this.state.shopList,
      print: () => window.print(),

      meatBeefClass: cls('beef'), meatPorkClass: cls('pork'), meatChickenClass: cls('chicken'), meatFishClass: cls('fish'),
      setMeatBeef: () => this.setState({ meat: 'beef' }),
      setMeatPork: () => this.setState({ meat: 'pork' }),
      setMeatChicken: () => this.setState({ meat: 'chicken' }),
      setMeatFish: () => this.setState({ meat: 'fish' }),
      meatPoints: MEAT[meatKey],
    };
  }
}

window.toolsLogic=new Component();})();