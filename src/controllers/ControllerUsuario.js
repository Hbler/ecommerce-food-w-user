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
      ControllerUsuario.ajustarAcesso();
      setTimeout(() => {
        location.reload();
      }, 2000);
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

  static ajustarAcesso() {
    const token = localStorage.getItem("token");
    const acesso = document.querySelector(".acesso");
    if (token && acesso.childElementCount === 2) {
      const home = document.createElement("li");
      const dashboard = document.createElement("li");
      const logout = document.createElement("li");

      home.innerText = "Home";
      home.classList.add("acesso__home");
      home.addEventListener("click", () => {
        self.location = "../../index.html";
      });

      dashboard.innerText = "Dashboard";
      dashboard.classList.add("acesso__dashboard");
      dashboard.addEventListener("click", () => {
        self.location = "./src/pages/dashboard.html";
      });

      logout.innerText = "Logout";
      logout.classList.add("acesso__logout");
      logout.addEventListener("click", () => {
        localStorage.removeItem("token");
        if (document.title.includes("Home")) location.reload();
        else if (document.title.includes("Dashboard")) history.back();
        ControllerUsuario.ajustarAcesso();
      });

      acesso.append(home, dashboard, logout);
    } else if (!token && acesso.childElementCount === 2) {
      const home = document.querySelector(".acesso__home");
      const dashboard = document.querySelector(".acesso__dashboard");
      const logout = document.querySelector(".acesso__logout");

      acesso.removeChild(home);
      acesso.removeChild(dashboard);
      acesso.removeChild(logout);
    }
  }
}

export default ControllerUsuario;
