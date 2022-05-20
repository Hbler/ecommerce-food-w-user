import API from "../utils/API.js";
import Produto from "../models/Produto.js";

class ControllerVitrine {
  static async mostrarTodos() {
    let nodePai, produtos;

    if (document.title.includes("Home")) {
      produtos = await API.produtosTodos();
      nodePai = document.querySelector(".vitrine");
    } else if (document.title.includes("Dashboard")) {
      produtos = await API.produtosUsurario();
      nodePai = document.querySelector(".vitrine--dashboard");
    }

    produtos.forEach((obj) => {
      const { id, nome, preco, categoria, descricao, imagem } = obj;
      const item = new Produto(id, nome, preco, categoria, descricao, imagem);

      if (document.title.includes("Home")) {
        const card = item.cardHome();
        nodePai.appendChild(card);
      } else if (document.title.includes("Dashboard")) {
        const card = item.cardHome();
        nodePai.appendChild(card);
      }
    });
  }
}

export default ControllerVitrine;
