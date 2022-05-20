import { login, pegarDados } from "./ControllerUsuario.js";

class ControllerFormulario {
  static formularioLogin() {
    const body = document.body;

    const fundo = document.createElement("section");
    const modal = document.createElement("form");
    const titulo = document.createElement("h1");
    const fechar = document.createElement("i");
    const mensagem = document.createElement("p");
    const email = document.createElement("input");
    const senha = document.createElement("input");
    const botaoLogin = document.createElement("submit");
    const cadastrar = document.createElement("p");

    titulo.innerText = "Login";
    titulo.classList.add("modal__titulo");

    fechar.classList.add("fechar", "fa-xmark", "fa-solid");
    fechar.addEventListener("click", () => {
      body.removeChild(fundo);
    });

    mensagem.innerText = "Faça seu login e boas compras!";
    mensagem.classList.add("modal__mensagem");

    email.name = "email";
    email.type = "email";
    email.placeholder = "Email";
    email.required = true;

    senha.name = "password";
    senha.type = "password";
    senha.placeholder = "Senha";
    senha.required = true;

    botaoLogin.value = "Fazer Login";
    botaoLogin.type = "submit";

    cadastrar.innerHTML =
      "Ainda não tem um cadastro?\n<span>Clique aqui!</span>";
    cadastrar.classList.add("cadastrar");

    cadastrar.addEventListener("click", () => {
      body.removeChild(fundo);
      ControllerFormulario.formularioCadastro();
    });

    modal.addEventListener("submit", login);
    modal.append(titulo, fechar, mensagem, email, senha, botaoLogin, cadastrar);

    fundo.appendChild(modal);
    body.appendChild(fundo);
  }

  static formularioCadastro() {
    const body = document.body;

    const fundo = document.createElement("section");
    const modal = document.createElement("form");
    const titulo = document.createElement("h1");
    const fechar = document.createElement("i");
    const nome = document.createElement("input");
    const email = document.createElement("input");
    const senha = document.createElement("input");
    const botaoCadastrar = document.createElement("submit");

    titulo.innerText = "Cadastre-se";
    titulo.classList.add("modal__titulo");

    fechar.classList.add("fechar", "fa-xmark", "fa-solid");
    fechar.addEventListener("click", () => {
      body.removeChild(fundo);
    });

    nome.name = "name";
    nome.type = "text";
    nome.placeholder = "Nome de Usuário";
    nome.required = true;

    email.name = "email";
    email.type = "email";
    email.placeholder = "Email";
    email.required = true;

    senha.name = "password";
    senha.type = "password";
    senha.placeholder = "Senha";

    botaoCadastrar.innerText = "Cadastrar";
    botaoCadastrar.type = "submit";

    modal.addEventListener("submit", pegarDados);
    modal.append(titulo, fechar, nome, email, senha, botaoCadastrar);

    fundo.appendChild(modal);
    body.appendChild(fundo);
  }
}

export default ControllerFormulario;
