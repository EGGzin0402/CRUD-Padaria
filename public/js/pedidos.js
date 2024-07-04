const addBtn = document.getElementById("addBtn");
const itemSelected = document.getElementById("item");

let actualItem;

let itens = [];

const itemMapping = {
  pao_frances: "Pão francês",
  pao_de_forma: "Pão de forma",
  pao_integral: "Pão integral",
  pao_de_milho: "Pão de milho",
  pao_de_centeio: "Pão de centeio",
  pao_de_batata: "Pão de batata",
  pao_de_queijo: "Pão de queijo",
  baguetes: "Baguetes",
  ciabatta: "Ciabatta",
  focaccia: "Focaccia",
  bolo_de_cenoura: "Bolo de cenoura",
  bolo_de_chocolate: "Bolo de chocolate",
  bolo_de_laranja: "Bolo de laranja",
  bolo_de_fuba: "Bolo de fubá",
  bolo_de_iogurte: "Bolo de iogurte",
  torta_de_maca: "Torta de maçã",
  torta_de_limao: "Torta de limão",
  cheesecake: "Cheesecake",
  torta_de_morango: "Torta de morango",
  torta_de_frango: "Torta de frango",
  brigadeiro: "Brigadeiro",
  beijinho: "Beijinho",
  pudim: "Pudim",
  quindim: "Quindim",
  mousse_de_maracuja: "Mousse de maracujá",
  pave: "Pavê",
  churros: "Churros",
  cocada: "Cocada",
  doce_de_leite: "Doce de leite",
  palha_italiana: "Palha italiana",
  coxinha: "Coxinha",
  esfirra: "Esfirra",
  pastel: "Pastel",
  empada: "Empada",
  kibe: "Kibe",
  pao_de_batata_recheado: "Pão de batata recheado",
  salgadinho_de_queijo: "Salgadinho de queijo",
  croquete: "Croquete",
  bolinho_de_bacalhau: "Bolinho de bacalhau",
  paozinho_de_presunto_e_queijo: "Pãozinho de presunto e queijo",
  cafe_expresso: "Café expresso",
  cappuccino: "Cappuccino",
  cha: "Chá",
  suco_natural: "Suco natural",
  chocolate_quente: "Chocolate quente",
  agua_de_coco: "Água de coco",
  refrigerantes: "Refrigerantes",
  smoothies: "Smoothies",
  leite_achocolatado: "Leite achocolatado",
  iogurte: "Iogurte",
  geleias_caseiras: "Geleias caseiras",
  mel: "Mel",
  compotas_de_frutas: "Compotas de frutas",
  pates: "Patês",
  manteiga_artesanal: "Manteiga artesanal",
  queijos_artesanais: "Queijos artesanais",
  molhos_caseiros: "Molhos caseiros",
  conservas: "Conservas",
  bolachas_artesanais: "Bolachas artesanais",
  granola_caseira: "Granola caseira",
  paes_sem_gluten: "Pães sem glúten",
  doces_sem_acucar: "Doces sem açúcar",
  produtos_veganos: "Produtos veganos",
  produtos_sem_lactose: "Produtos sem lactose",
  paes_artesanais: "Pães artesanais",
  produtos_organicos: "Produtos orgânicos",
  sobremesas_fit: "Sobremesas fit",
  lanches_naturais: "Lanches naturais",
  saladas_de_frutas: "Saladas de frutas",
  smoothies_detox: "Smoothies detox",
};


addBtn.addEventListener("click", (event) => {
    const nome = itemMapping[itemSelected.value];
    const novoItem = {
    item: nome,
    quantity: 1,
    };

  itens.push(novoItem);
  actualItem = itens.length - 1;
  console.log(itens);
  console.log(actualItem);
  const itemList = document.getElementById("lista-pedidos");
  const item = document.createElement("li");
  item.className = "list-group-item";
  item.innerHTML = `
    <div class="row align-items-center">
        <div class="col-auto">
            <p>${nome}</p>
        </div>
        <div class="col-auto">
            <div class="vr"></div>
        </div>
        <div class="col-auto">
            <p>Quantidade</p>
        </div>
        <div class="col-auto">
            <input class="form-control" type="number" value="${itens[actualItem].quantity}">
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-danger subBtn" index="${actualItem}"> - </button>
        </div>
        <div class="col-auto">
            <button type="button" class="btn btn-primary addQuantBtn" index="${actualItem}"> + </button>
        </div>
    </div>
    `;
  itemList.appendChild(item);

  // Adicionar eventos aos novos botões
  const subBtn = item.querySelector(".subBtn");
  const addQuantBtn = item.querySelector(".addQuantBtn");
    const input = item.querySelector("input");

    subBtn.addEventListener("click", () => {
        const subindex = subBtn.getAttribute("index");
        if (novoItem.quantity > 1) {
            // Verifica se a quantidade é maior que 0
            novoItem.quantity--;
            input.value = novoItem.quantity;
        }else{
            // Remove o item da lista
            itemList.removeChild(item);
            itens.splice(itens.indexOf(novoItem), 1);
        }
        actualItem = itens.length - 1;
        console.log(itens);
        console.log(actualItem);
    });

    addQuantBtn.addEventListener("click", () => {
        const addindex = addQuantBtn.getAttribute("index");
        itens[addindex].quantity++;
        input.value = itens[addindex].quantity;
    });
});

const pedidoForm = document.getElementById("pedidoForm");
const itensInput = document.getElementById("itensInput");

pedidoForm.addEventListener("submit", (event) => {
  // Atualiza o valor do campo oculto com o JSON do array itens
  itensInput.value = JSON.stringify(itens);
});