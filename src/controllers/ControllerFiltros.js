import API from "../utils/API.js";
import ControllerVitrine from "./ControllerVitrine.js";
import Produto from "../models/Produto.js";
class ControllerFiltros {
  static async criarSelecao() {
    let nodePai, produtos;

    if (document.title.includes("Home")) {
      produtos = await API.produtosTodos();
      nodePai = document.querySelector(".filtros");
    } else {
      produtos = await API.produtosUsurario();
      nodePai = document.getElementById("");
    }

    const lista = document.createElement("ul");

    const categorias = Array.from(
      new Set(
        produtos
          .map((obj) => obj.categoria)
          .map((str) => str.toLowerCase().trim())
      )
    );

    categorias.unshift("todos");

    categorias.forEach((str) => {
      const li = document.createElement("li");

      li.innerText = str.slice(0, 1).toUpperCase() + str.slice(1);
      li.addEventListener("click", this.filtrar);
      li.classList.add("filtros__categoria");

      lista.appendChild(li);
    });

    nodePai.appendChild(lista);
  }

  static async filtrar(e) {
    const filtros = e.target.parentElement.childNodes;
    const categoria = ControllerFiltros.ajustarStr(e.target.innerText);
    let nodePai, produtos;

    filtros.forEach((li) => {
      li.classList.remove("ativo");
    });

    this.classList.add("ativo");

    if (document.title.includes("Home")) {
      produtos = await API.produtosTodos();
      nodePai = document.querySelector(".vitrine");
    } else {
      produtos = await API.produtosUsurario();
      nodePai = document.getElementById("");
    }

    nodePai.innerHTML = "";

    if (categoria === "todos") {
      ControllerVitrine.mostrarTodos();
    } else {
      produtos.forEach((obj) => {
        if (ControllerFiltros.ajustarStr(obj.categoria) === categoria) {
          const { id, nome, preco, categoria, descricao, imagem } = obj;
          const item = new Produto(
            id,
            nome,
            preco,
            categoria,
            descricao,
            imagem
          );
          const card = item.cardHome();

          nodePai.appendChild(card);
        }
      });
    }
  }

  static async pesquisar(e) {
    const filtros = document.querySelectorAll(".filtros__categoria");
    filtros.forEach((li) => {
      li.classList.remove("ativo");
    });

    filtros[0].classList.add("ativo");

    const pesquisa = ControllerFiltros.ajustarStr(
      ControllerFiltros.ajustarStr(e.target.value)
    );
    const todos = "todos";

    let nodePai, produtos;

    if (document.title.includes("Home")) {
      produtos = await API.produtosTodos();
      nodePai = document.querySelector(".vitrine");
    } else {
      produtos = await API.produtosUsurario();
      nodePai = document.getElementById("");
    }

    nodePai.innerHTML = "";

    if (todos.includes(pesquisa)) ControllerVitrine.mostrarTodos();
    else {
      produtos.forEach((obj) => {
        if (
          ControllerFiltros.ajustarStr(obj.nome).includes(pesquisa) ||
          ControllerFiltros.ajustarStr(String(obj.preco)).includes(pesquisa) ||
          ControllerFiltros.ajustarStr(obj.categoria).includes(pesquisa) ||
          ControllerFiltros.ajustarStr(obj.descricao).includes(pesquisa)
        ) {
          const { id, nome, preco, categoria, descricao, imagem } = obj;
          const item = new Produto(
            id,
            nome,
            preco,
            categoria,
            descricao,
            imagem
          );
          const card = item.cardHome();

          nodePai.appendChild(card);
        }
      });
    }
  }

  static ajustarStr(str) {
    const nStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return nStr.toLowerCase();
  }
}

export default ControllerFiltros;
