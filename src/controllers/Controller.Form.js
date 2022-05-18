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
    
    
    static loginForm(){
        const body = document.querySelector("body");

        const main = document.createElement("main");
        const title = document.createElement("h1");
        const p1 = document.createElement("p");
        const form = document.createElement("form");
        const email = document.createElement("input");
        const password = document.createElement("input");
        const loginBtn = document.createElement("button");
        const p2 = document.createElement("p");
        const a = document.createElement("a");

        title.innerText = "Login";
        p1.innerText = "Faça seu login e boas compras!";

        email.name = "email";
        email.type = "email";
        email.placeholder = "Email";

        password.name = "password";
        password.type = "password";
        password.placeholder = "Senha";

        loginBtn.value = "Entrar";
        loginBtn.type = "submit";
        loginBtn.id = "botaoLogin";

        p2.innerText = "Caso não tenha um cadastro:";
        a.innerHTML = `"<a href="./index.html">Cadastre-se</a">`;

        body.addEventListener("submit", login);

        body.append(main);
        main.append(title, p1, form, p2, a);
        form.append(email, password, loginBtn);

        return body;
    }


    static cadastroForm(){
        const body = document.querySelector("body");

        const main = document.createElement("main");
        const title = document.createElement("h1");
        const form = document.createElement("form");
        const name = document.createElement("input");
        const email = document.createElement("input");
        const password = document.createElement("input");
        const loginBtn = document.createElement("button");

        title.innerText = "Cadastre-se";

        name.name = "name";
        name.type = "text";
        name.placeholder = "Nome de Usuário";  

        email.name = "email";
        email.type = "email";
        email.placeholder = "Email";

        password.name = "password";
        password.type = "password";
        password.placeholder = "Senha";

        loginBtn.value = "Cadastrar";
        loginBtn.type = "submit";
        loginBtn.id = "botaoCadastrar";

        body.addEventListener("submit", pegarDados);

        body.append(main);
        main.append(title, form);
        form.append(name, email, password, loginBtn);

        return body;
    }
}

export default FormController;