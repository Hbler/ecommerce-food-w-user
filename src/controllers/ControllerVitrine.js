import API from "../utils/API.js";
import Produto from "../models/Produto.js";

class ControllerVitrine {
  static async mostrarTodos() {
    const produtos = await API.produtosTodos();
    const nodePai = document.querySelector(".vitrine");

    produtos.forEach((obj) => {
      const { id, nome, preco, categoria, descricao, imagem } = obj;
      const item = new Produto(id, nome, preco, categoria, descricao, imagem);
      const card = item.cardHome();

      nodePai.appendChild(card);
    });
  }
}

export default ControllerVitrine;
