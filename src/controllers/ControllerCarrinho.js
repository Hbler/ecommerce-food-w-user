import API from "../utils/API.js";
import Produto from "../models/Produto.js";
class ControllerCarrinho {
  static async mostrarProdutos() {
    const produtos = await API.produtosTodos();

    const nodePai = document.querySelector(".carrinho__produtos");
    nodePai.innerHTML = "";

    try {
      const carrinhoModal = document.querySelector(
        ".carrinho__produtos--modal"
      );
      carrinhoModal.innerHTML = "";
    } catch {}

    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho"));

    if (localStorage.getItem("token")) {
      const salvo = await API.carrinhoSalvo();
      salvo.forEach((obj) => {
        const id = obj.products.id;
        const qtd = obj.quantity;

        if (Object.keys(carrinhoLocal).includes(id)) {
          carrinhoLocal[id] = qtd;
        } else carrinhoLocal[id] = qtd;
      });

      localStorage.setItem("carrinho", JSON.stringify(carrinhoLocal));
    }

    const ids = Object.keys(carrinhoLocal);

    ids.forEach((str) => {
      let qtd = carrinhoLocal[str];

      const produto = produtos.find((obj) => obj.id === str);
      const { id, nome, preco, categoria, descricao, imagem } = produto;
      const item = new Produto(id, nome, preco, categoria, descricao, imagem);
      const card = item.cardCarrinho(qtd);

      nodePai.appendChild(card);

      try {
        const carrinhoModal = document.querySelector(
          ".carrinho__produtos--modal"
        );
        carrinhoModal.appendChild(card);
      } catch {}
    });

    ControllerCarrinho.atualizar();
  }

  static adicionar(e) {
    const id = e.target.id || e.target.closest("BUTTON").id;

    const atual = JSON.parse(localStorage.getItem("carrinho"));

    if (Object.keys(atual).includes(id)) {
      atual[id]++;
    } else atual[id] = 1;

    if (localStorage.getItem("token")) {
      const produto = { product_id: id };
      API.carrinhoAdicionar(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(atual));

    ControllerCarrinho.mostrarProdutos();
  }

  static remover(e) {
    const id = e.target.id || e.target.closest("BUTTON").id;
    console.log(id);

    const atual = JSON.parse(localStorage.getItem("carrinho"));

    if (localStorage.getItem("token")) API.carrinhoRemover(id);

    delete atual[id];

    localStorage.setItem("carrinho", JSON.stringify(atual));

    ControllerCarrinho.mostrarProdutos();
  }

  static async quantidadeProduto(e) {
    const qtd = e.target.value;
    const id = e.target.dataset.id;

    if (localStorage.getItem("token")) {
      const salvo = await API.carrinhoSalvo();

      for (const obj of salvo) {
        const quantidade = obj.quantity;
        const idProduto = obj.products.id;

        if (idProduto === id) {
          if (quantidade < +qtd) {
            const produto = { product_id: idProduto };
            await API.carrinhoAdicionar(produto);
          } else await API.carrinhoRemover(idProduto);
        }
      }
    }

    const atual = JSON.parse(localStorage.getItem("carrinho"));

    atual[id] = +qtd;

    localStorage.setItem("carrinho", JSON.stringify(atual));
    ControllerCarrinho.mostrarProdutos();
  }

  static async atualizar() {
    const produtos = await API.produtosTodos();
    const atual = JSON.parse(localStorage.getItem("carrinho"));
    const resumo = { valorTotal: 0, quantidade: 0 };

    for (let id in atual) {
      const item = produtos.find((obj) => obj.id === id);
      const qtd = atual[id];

      resumo.valorTotal += item.preco * qtd;
      resumo.quantidade += qtd;
    }

    localStorage.setItem("resumo", JSON.stringify(resumo));

    try {
      const qtdModal = document.getElementById("quantidade-modal");
      const valorModal = document.getElementById("valor-modal");

      qtdModal.innerHTML = "";
      valorModal.innerHTML = "";

      qtdModal.innerText = resumo.quantidade;
      valorModal.innerText = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(resumo.valorTotal);
    } catch {}

    const quantidade = document.getElementById("quantidade");
    const valor = document.getElementById("valor");

    quantidade.innerHTML = "";
    valor.innerHTML = "";

    quantidade.innerText = resumo.quantidade;
    valor.innerText = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(resumo.valorTotal);

    const nodeResumo = document.querySelector(".carrinho__resumo");
    if (resumo.quantidade === 0) {
      if (!nodeResumo.classList.contains("vazio"))
        nodeResumo.classList.add("vazio");
    } else {
      nodeResumo.classList.remove("vazio");
    }

    const carrinho = document.querySelector(".carrinho__produtos");
    if (carrinho.innerHTML === "") {
      const div = document.createElement("div");
      const icone = document.createElement("i");
      const mensagem = document.createElement("p");

      icone.classList.add("fa-solid", "fa-basket-shopping");

      mensagem.innerText = "Por enquanto não temos produtos no carrinho";

      div.append(icone, mensagem);
      div.classList.add("carrinho__vazio");

      carrinho.appendChild(div);
      try {
        const carrinhoModal = document.querySelector(
          ".carrinho__produtos--modal"
        );
        if (carrinhoModal.innerHTML === "") carrinhoModal.appendChild(div);
      } catch {}
    }
  }

  static modalCarrinho() {
    const body = document.body;

    const fundo = document.createElement("section");
    const modal = document.createElement("aside");

    fundo.classList.add("modal__fundo");
    modal.classList.add("carrinho", "carrinho--modal");

    const titulo = document.createElement("h3");
    const icone = document.createElement("i");
    const fechar = document.createElement("i");
    let palavra = "Carrinho";

    titulo.classList.add("carrinho__titulo", "carrinho__titulo--modal");
    icone.classList.add("fa-solid", "fa-cart-arrow-down");
    fechar.classList.add("fa-solid", "fa-xmark", "fechar");

    fechar.addEventListener("click", () => {
      body.removeChild(fundo);
    });

    titulo.append(icone, palavra, fechar);

    const produtos = document.createElement("section");
    produtos.classList.add("carrinho__produtos--modal");

    const resumo = document.createElement("section");
    const quantidade = document.createElement("div");
    const tituloQtd = document.createElement("p");
    const valorQtd = document.createElement("p");
    const total = document.createElement("div");
    const tituloTotal = document.createElement("p");
    const valorTotal = document.createElement("p");

    resumo.classList.add("carrinho__resumo--modal");
    quantidade.classList.add("carrinho__resumo--qtd", "modal");
    total.classList.add("carrinho__resumo--total", "modal");

    tituloQtd.innerText = "Quantidade:";
    valorQtd.innerText = 0;
    valorQtd.id = "quantidade-modal";
    tituloTotal.innerText = "Total:";
    valorTotal.innerText = 0;
    valorTotal.id = "valor-modal";

    quantidade.append(tituloQtd, valorQtd);
    total.append(tituloTotal, valorTotal);
    resumo.append(quantidade, total);

    modal.append(titulo, produtos, resumo);
    fundo.appendChild(modal);

    body.appendChild(fundo);
    ControllerCarrinho.mostrarProdutos();
  }
}

export default ControllerCarrinho;
