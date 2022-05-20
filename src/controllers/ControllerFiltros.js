import API from "../utils/API.js";
import ControllerVitrine from "./ControllerVitrine.js";
import Produto from "../models/Produto.js";
class ControllerFiltros {
  static async criarSelecao() {
    let nodePai, produtos;

    // trocar pelo correto quando layout estiver pronto
    if (document.title.includes("Document")) {
      produtos = await API.produtosTodos();
      // trocar pelo correto quando layout estiver pronto
      nodePai = document.getElementById("filtros");
    } else {
      produtos = await API.produtosUsurario();
      nodePai = document.getElementById("");
    }

    const lista = document.createElement("ul");

    const categorias = Array.from(
      new Set(
        produtos.map((obj) => obj.categoria).map((str) => str.toLowerCase())
      )
    );

    categorias.unshift("todos");

    categorias.forEach((str) => {
      const li = document.createElement("li");

      li.innerText = str.slice(0, 1).toUpperCase() + str.slice(1);
      li.addEventListener("click", this.filtrar);

      lista.appendChild(li);
    });

    nodePai.appendChild(lista);
  }

  static async filtrar(e) {
    const categoria = ControllerFiltros.ajustarStr(e.target.innerText);
    let nodePai, produtos;

    // trocar pelo correto quando layout estiver pronto
    if (document.title.includes("Document")) {
      produtos = await API.produtosTodos();
      // trocar pelo correto quando layout estiver pronto
      nodePai = document.getElementById("vitrine");
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
    const pesquisa = ControllerFiltros.ajustarStr(
      ControllerFiltros.ajustarStr(e.target.value)
    );
    const todos = "todos";

    let nodePai, produtos;

    // trocar pelo correto quando layout estiver pronto
    if (document.title.includes("Document")) {
      produtos = await API.produtosTodos();
      // trocar pelo correto quando layout estiver pronto
      nodePai = document.getElementById("vitrine");
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
