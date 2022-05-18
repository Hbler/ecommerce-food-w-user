import API from "../utils/API.js";
class ControllerFiltros {
  static async criarSelecaoHome() {
    // trocar pelo correto quando layout estiver pronto
    const nodePai = document.getElementById("filtros");
    const lista = document.createElement("ul");

    const produtos = await API.produtosTodos();
    const categorias = Array.from(
      new Set(
        produtos.map((obj) => obj.categoria).map((str) => str.toLowerCase())
      )
    );

    categorias.unshift("todos");

    categorias.forEach((str) => {
      const li = document.createElement("li");

      li.innerText = str.slice(0, 1).toUpperCase() + str.slice(1);
      // li.addEventListener('click', ControllerFiltros.filtrarProdutos)

      lista.appendChild(li);
    });

    nodePai.appendChild(lista);
  }
}

export default ControllerFiltros;
