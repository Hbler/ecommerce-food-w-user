import API from "../utils/API.js";

class ControllerUsuario {
  static async pegarDados(e) {
    e.preventDefault();
    const input = e.target;
    const body = document.body;
    const fundo = document.querySelector(".modal__fundo");

    console.log(input);
    const dados = {};

    for (let i = 0; i < input.length; i++) {
      const { name, value } = input[i];
      if (name) {
        dados[name] = value;
      }
    }

    const resposta = await API.cadastroUsuario(dados);
    console.log(resposta);

    if (resposta.status) {
      ControllerUsuario.modalTemporario("Dados Inválidos!\n Tente novamente.");
    } else if (resposta.id) {
      ControllerUsuario.modalTemporario("Sucesso!\nUsuário cadastrado.");
      body.removeChild(fundo);
    }
  }

  static async login(e) {
    e.preventDefault();
    const input = e.target;
    const body = document.body;
    const fundo = document.querySelector(".modal__fundo");

    const dados = {};

    for (let i = 0; i < input.length; i++) {
      const { name, value } = input[i];
      if (name) {
        dados[name] = value;
      }
    }

    const resposta = await API.loginUsuario(dados);

    if (resposta.error) {
      ControllerUsuario.modalTemporario(
        "Dados Incorretos.\n Verifique, e tente novamente"
      );
    } else if (typeof resposta === "string") {
      ControllerUsuario.modalTemporario("Login realizado com sucesso!");
      body.removeChild(fundo);
    }
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

export default ControllerUsuario;
