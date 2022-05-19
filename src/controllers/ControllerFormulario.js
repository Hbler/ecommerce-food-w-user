import API from "../utils/API.js";
import ControllerProdutos from "./ControllerProdutos.js";

class ControllerFormulario {
  static async produtoUsuario(tipo) {
    const body = document.querySelector("body");

    const produtos = await API.produtosTodos();
    const id = localStorage.getItem("editar") || "";
    const item = produtos.find((obj) => obj.id === id) || "";

    const fundo = document.createElement("section");
    const modal = document.createElement("form");
    const topo = document.createElement("header");
    const fechar = document.createElement("button");
    const titulo = document.createElement("h3");
    const nome = ControllerFormulario.inputNome(tipo, item);
    const descricao = ControllerFormulario.inputDescricao(tipo, item);
    const categoria = await ControllerFormulario.inputCategorias(tipo, item);
    const preco = ControllerFormulario.inputPreco(tipo, item);
    const imagem = ControllerFormulario.inputImagem(tipo, item);
    const interacao = ControllerFormulario.interacao(tipo, item);

    fechar.innerHTML = '<i class="fa-solid fa-x"></i>';
    fechar.classList.add("modal__fechar");
    fechar.addEventListener("click", (e) => {
      e.preventDefault();
      body.removeChild(fundo);
    });

    if (tipo === "cadastrar") titulo.innerText = "Cadastro de Produto";
    else titulo.innerText = "Edição de produto";
    titulo.classList.add("modal__titulo");

    topo.append(titulo, fechar);
    topo.classList.add("modal__topo");

    modal.classList.add("modal--dashboard");
    modal.dataset.tipo = tipo;
    modal.id = item.id || "";
    modal.append(topo, nome, descricao, categoria, preco, imagem, interacao);
    modal.addEventListener("submit", (e) => {
      e.preventDefault();
      const formulario = e.target;
      const id = formulario.id;
      const tipo = formulario.dataset.tipo;
      ControllerProdutos.enviar(formulario, tipo, id);
      body.removeChild(fundo);
    });

    fundo.appendChild(modal);
    fundo.classList.add("modal__fundo");

    body.appendChild(fundo);
  }

  static inputNome(tipo, item) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.innerText = "Nome do Produto";
    label.setAttribute("for", "nome");

    input.type = "text";
    input.required = true;
    input.id = "nome";
    input.name = "nome";
    input.placeholder = "Digitar o Nome";

    if (tipo === "editar") {
      input.value = item.nome;
    }

    div.append(label, input);
    div.classList.add("modal__linha");
    return div;
  }

  static inputDescricao(tipo, item) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.innerText = "Descrição";
    label.setAttribute("for", "descricao");

    input.type = "text";
    input.required = true;
    input.id = "descricao";
    input.name = "descricao";
    input.placeholder = "Digitar a descrição";

    if (tipo === "editar") {
      input.value = item.descricao;
    }

    div.append(label, input);
    div.classList.add("modal__linha");
    return div;
  }

  static inputPreco(tipo, item) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.innerText = "Valor do Produto";
    label.setAttribute("for", "preco");

    input.type = "number";
    input.min = "1";
    input.required = true;
    input.id = "preco";
    input.name = "preco";
    input.placeholder = "Digitar o valor";

    if (tipo === "editar") {
      input.value = item.preco;
    }

    div.append(label, input);
    div.classList.add("modal__linha");
    return div;
  }

  static inputImagem(tipo, item) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.innerText = "Link da Imagem";
    label.setAttribute("for", "imagem");

    input.type = "url";
    input.required = true;
    input.id = "imagem";
    input.name = "imagem";
    input.placeholder = "Inserir o link";

    if (tipo === "editar") {
      input.value = item.imagem;
    }

    div.append(label, input);
    div.classList.add("modal__linha");
    return div;
  }

  static async inputCategorias(tipo, item) {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const select = document.createElement("select");
    const produtos = await API.produtosTodos();
    const opcoes = Array.from(
      new Set(
        produtos.map((obj) => obj.categoria).map((str) => str.toLowerCase())
      )
    );

    opcoes.forEach((str) => {
      const opcao = document.createElement("option");
      opcao.value = str.slice(0, 1).toUpperCase() + str.slice(1);
      opcao.innerText = str.slice(0, 1).toUpperCase() + str.slice(1);

      select.appendChild(opcao);
    });

    label.innerText = "Categoria";
    label.setAttribute("for", "categoria");

    select.name = "categoria";

    if (tipo === "editar") {
      select.value = item.categoria;
    }

    div.append(label, select);
    div.classList.add("modal__linha");
    return div;
  }

  static interacao(tipo, item) {
    const div = document.createElement("div");
    const botao = document.createElement("input");

    botao.type = "submit";
    botao.classList.add("modal__botao--dashboard");

    if (tipo === "cadastrar") {
      botao.value = "Cadastrar Produto";
      botao.id = item.id;
      div.appendChild(botao);
    } else {
      const excluir = document.createElement("h4");
      excluir.innerText = "Excluir";
      excluir.classList.add("modal__excluir");
      excluir.addEventListener("click", (e) => {
        e.preventDefault();
        const body = document.body;
        const fundo = document.querySelector(".modal__fundo");
        body.removeChild(fundo);
        ControllerProdutos.excluir(e, item.id);
      });

      botao.value = "Salvar Alterações";

      div.append(excluir, botao);
    }

    div.classList.add("modal__linha");
    return div;
  }
}

export default ControllerFormulario;
