import ControllerCarrinho from "../controllers/ControllerCarrinho.js";
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
    const botao = this.botaoAdicionarCarrinho();

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
    // tag.addEventListener('click', funcaoFiltrar)
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

  botaoAdicionarCarrinho() {
    const botao = document.createElement("button");

    botao.innerHTML = '<i class="fa-solid fa-cart-arrow-down"></i>';
    botao.id = this.id;
    botao.classList.add("card__botao");
    botao.addEventListener("click", ControllerCarrinho.adicionar);
    return botao;
  }

  cardCarrinho(qtd = 1) {
    const card = document.createElement("article");
    const moldura = document.createElement("figure");
    const info = document.createElement("div");
    const nome = document.createElement("h3");
    const categoria = document.createElement("small");
    const preco = this.formatarPreco();
    const interacao = document.createElement("div");
    const botaoRemover = this.botaoRemoverCarrinho();
    const quantidade = this.inputQuantidade(qtd);

    moldura.style.backgroundImage = `url(${this.imagem})`;
    moldura.classList.add("card__moldura--carrinho");

    nome.innerText = this.nome;
    nome.classList.add("card__nome--carrinho");

    categoria.innerText = this.categoria;
    categoria.classList.add("card__tag--carrinho");

    info.classList.add("card__info--carrinho");
    info.append(nome, categoria, preco);

    interacao.classList.add("card__interacao--carrinho");
    interacao.append(botaoRemover, quantidade);

    card.append(moldura, info, interacao);
    card.classList.add("card--carrinho");
    card.dataset.id = this.id;

    return card;
  }

  botaoRemoverCarrinho() {
    const botao = document.createElement("button");

    botao.innerHTML = '<i class="fa-solid fa-trash"></i>';
    botao.id = this.id;
    botao.classList.add("card__botao--carrinho");
    botao.addEventListener("click", ControllerCarrinho.remover);

    return botao;
  }

  inputQuantidade(num) {
    const input = document.createElement("input");

    input.type = "number";
    input.value = String(num);
    input.min = "1";
    input.classList.add("card__input--carrinho");
    input.dataset.id = this.id;
    input.addEventListener("change", ControllerCarrinho.quantidadeProduto);

    return input;
  }
}

export default Produto;
