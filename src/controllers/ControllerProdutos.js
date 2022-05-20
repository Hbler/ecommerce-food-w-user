import API from "../utils/API.js";
import ControllerFormulario from "./ControllerFormulario.js";

class ControllerProdutos {
  static async enviar(formulario, tipo, id) {
    const dados = [...formulario];
    const objetoAPI = {};
    let resposta;

    dados.forEach((dado) => {
      if (dado.name != "") {
        objetoAPI[dado.name] = dado.value;
        dado.value = "";
      }
    });

    if (tipo === "cadastrar") {
      resposta = await API.produtosNovo(objetoAPI);
    } else {
      const produtos = await API.produtosTodos();
      const item = produtos.find((obj) => obj.id === id);

      for (let key in objetoAPI) {
        if (objetoAPI[key] === String(item[key])) delete objetoAPI[key];
      }

      resposta = await API.produtosEditar(id, objetoAPI);

      console.log(resposta);
    }

    if (resposta.id || resposta === "Produto Atualizado") {
      ControllerProdutos.modalTemporario("Operação realizada com sucesso!");
    } else if (resposta.error) {
      ControllerProdutos.modalTemporario(
        "Erro! Todos os campos são obrigatórios."
      );
    } else if (resposta.msg) {
      ControllerProdutos.modalTemporario("Erro! Tente Novamente.");
    }
  }

  static async editar(e) {
    const id = e.target.id;

    localStorage.setItem("editar", id);

    ControllerFormulario.produtoUsuario("editar");
  }

  static excluir(e, produto) {
    const id = e.target.id || produto;

    const body = document.querySelector("body");

    const fundo = document.createElement("section");
    const confirmar = document.createElement("div");
    const topo = document.createElement("header");
    const fechar = document.createElement("button");
    const titulo = document.createElement("h3");
    const mensagem = document.createElement("p");
    const interacao = document.createElement("div");
    const sim = document.createElement("h4");
    const nao = document.createElement("h4");

    fechar.innerHTML = '<i class="fa-solid fa-x"></i>';
    fechar.classList.add("modal__fechar");
    fechar.addEventListener("click", (e) => {
      e.preventDefault();
      body.removeChild(fundo);
    });

    titulo.innerText = "Exclusão de produto";
    titulo.classList.add("modal__titulo");

    topo.append(titulo, fechar);
    topo.classList.add("modal__topo");

    mensagem.innerText = "Tem certeza que desja excluir esse produto?";

    sim.innerText = "Sim";
    sim.classList.add("modal__excluir");
    sim.addEventListener("click", () => {
      API.produtosApagar(id);
      body.removeChild(fundo);
      ControllerProdutos.modalTemporario("Produto Excluído!");
    });

    nao.innerText = "Não";
    nao.classList.add("modal__excluir");
    nao.addEventListener("click", (e) => {
      body.removeChild(fundo);
    });

    interacao.append(sim, nao);
    interacao.classList.add("modal_linha");

    confirmar.classList.add("modal--dashboard", "modal__dashboard--excluir");
    confirmar.append(topo, mensagem, interacao);

    fundo.appendChild(confirmar);
    fundo.classList.add("modal__fundo");

    body.appendChild(fundo);
  }

  static modalTemporario(str) {
    const body = document.body;
    const fundo = document.createElement("section");
    const modal = document.createElement("div");
    const mensagem = document.createElement("p");

    mensagem.innerText = str;

    modal.appendChild(mensagem);
    modal.classList.add("modal__temporario");

    fundo.appendChild(modal);
    fundo.classList.add("modal__fundo");

    setTimeout(() => {
      body.removeChild(fundo);
    }, 3000);

    body.appendChild(fundo);
  }
}

export default ControllerProdutos;
