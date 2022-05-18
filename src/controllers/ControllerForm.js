import {login, pegarDados} from "./ControllerUser.js"

class FormController {
    static handleSubmit(form) {
        const info = {...form};
        const objInfo = {};

        info.forEach((i) => {
            if (i.name != "") {
                objInfo[i.name] = i.value;
                i.value = "";
            }
            return objInfo;
        });
    } 
    
    static loginForm() {
        const body = document.querySelector("body");
        body.innerHTML = "";

        const main = document.createElement("main");
        const title = document.createElement("h1");
        const p1 = document.createElement("p");
        const form = document.createElement("form");
        const email = document.createElement("input");
        const password = document.createElement("input");
        const loginBtn = document.createElement("button");
        const p2 = document.createElement("p");
        const fechar = document.createElement("p");
        const a = document.createElement("a");

        fechar.classList.add("cancelar");
        fechar.addEventListener("click", () => {
            body.removeChild(main);
        });

        title.innerText = "Login";
        p1.innerText = "Faça seu login e boas compras!";
        fechar.innerText = "X";
        fechar.id = "fechar";

        email.name = "email";
        email.type = "email";
        email.placeholder = "Email";

        password.name = "password";
        password.type = "password";
        password.placeholder = "Senha";

        loginBtn.innerText = "Entrar";
        loginBtn.type = "submit";
        loginBtn.id = "botaoLogin";

        p2.innerText = "Ainda não tem um cadastro?";
        a.innerText = "Cadastre-se";

        a.addEventListener("click", () => {
            body.removeChild(main);
            FormController.cadastroForm();
        })

        body.addEventListener("submit", login);

        body.appendChild(main);
        main.appendChild(title);
        main.appendChild(p1);
        main.appendChild(form);
        main.appendChild(p2);
        main.appendChild(fechar);
        main.appendChild(a);
        form.appendChild(email);
        form.appendChild(password);
        form.appendChild(loginBtn);

        form.addEventListener("submit", login);

        return body;
    }

    static cadastroForm() {
        const body = document.querySelector("body");

        const main = document.createElement("main");
        const title = document.createElement("h1");
        const fechar = document.createElement("p");
        const form = document.createElement("form");
        const name = document.createElement("input");
        const email = document.createElement("input");
        const password = document.createElement("input");
        const cadastroBtn = document.createElement("button");

        title.innerText = "Cadastre-se";
        fechar.innerText = "X";
        fechar.id = "fechar";
        
        name.name = "name";
        name.type = "text";
        name.placeholder = "Nome de Usuário";  

        email.name = "email";
        email.type = "email";
        email.placeholder = "Email";

        password.name = "password";
        password.type = "password";
        password.placeholder = "Senha";

        cadastroBtn.innerText = "Cadastrar";
        cadastroBtn.type = "submit";
        cadastroBtn.id = "botaoCadastrar";

        fechar.classList.add("cancelar");
        fechar.addEventListener("click", () => {
            body.removeChild(main);
        });

        body.addEventListener("submit", pegarDados);

        body.append(main);
        main.append(title, fechar, form);
        form.append(name, email, password, cadastroBtn);

        form.addEventListener("submit", pegarDados);

        return body;
    }
}

export default FormController;