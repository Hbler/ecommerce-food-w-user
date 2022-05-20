import ControllerFiltros from "../controllers/ControllerFiltros.js";
class Produto {
  constructor(id, nome, preco, categoria, descricao, imagem) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.descricao = descricao;
    this.imagem = imagem;
  }

  cardHome() {
    const card = document.createElement("article");
    const imagem = this.imgHome();
    const nome = document.createElement("h2");
    const descricao = document.createElement("p");
    const tagCategoria = this.nodeCategoria();
    const preco = this.formatarPreco();
    const botao = this.botaoCarrinho();

    nome.innerText = this.nome;
    nome.classList.add("card__nome");

    descricao.innerText = this.descricao;
    descricao.classList.add("card__descricao");

    card.append(imagem, nome, descricao, tagCategoria, preco, botao);
    card.classList.add("card");
    card.dataset.id = this.id;

    return card;
  }

  imgHome() {
    const moldura = document.createElement("figure");
    const img = this.ajustarTamanho(this.imagem);

    moldura.appendChild(img);
    moldura.classList.add("card__moldura");
    return moldura;
  }

  ajustarTamanho(url) {
    const img = new Image();
    img.addEventListener("load", function () {
      if (this.naturalWidth < this.naturalHeight) this.style.width = "100%";
    });
    img.src = url;
    return img;
  }

  nodeCategoria() {
    const tag = document.createElement("div");
    const categoria = document.createElement("small");

    categoria.innerText = this.categoria;

    tag.appendChild(categoria);
    tag.classList.add("card__tag");
    tag.addEventListener("click", ControllerFiltros.filtrar);
    return tag;
  }

  formatarPreco() {
    const preco = document.createElement("h3");
    const stringPreco = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.preco);

    preco.innerText = stringPreco;
    preco.classList.add("card__preco");
    return preco;
  }

  botaoCarrinho() {
    const botao = document.createElement("button");

    botao.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i>';
    botao.id = this.id;
    botao.classList.add("card__botao");
    //   botao.addEventListener('click', adicionarCarrinho)
    return botao;
  }
}

export default Produto;
