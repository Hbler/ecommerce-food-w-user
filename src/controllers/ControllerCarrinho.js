import API from "../utils/API.js";
import Produto from "../models/Produto.js";
class ControllerCarrinho {
  static async mostrarProdutos() {
    const produtos = await API.produtosTodos();

    // temporário
    const cart = JSON.parse(localStorage.getItem("carrinho"));
    produtos.forEach((obj) => {
      cart[obj.id] = 1;
    });
    localStorage.setItem("carrinho", JSON.stringify(cart));
    //

    const nodePai = document.getElementById("carrinho");
    nodePai.innerHTML = "";

    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho"));
    const ids = Object.keys(carrinhoLocal);
    ids.forEach((str) => {
      let qtt = carrinhoLocal[str];

      const obj = produtos.filter((obj) => obj.id === str);
      const { id, nome, preco, categoria, descricao, imagem } = obj[0];
      const item = new Produto(id, nome, preco, categoria, descricao, imagem);
      const card = item.cardCarrinho(qtt);

      nodePai.appendChild(card);
    });
  }
}

export default ControllerCarrinho;
