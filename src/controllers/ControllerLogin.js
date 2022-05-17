import API from "../utils/API.js"

const form = document.getElementById("formularioLogin");

async function login (event) {
    
    event.preventDefault();
    const input = event.target;

    const dados = {};
    
    for (let i = 0; i < input.length; i++) {
        const {name, value} = input[i];
        if (name) {
            dados[name] = value;
        }
    }
    
    return await API.loginUsuario(dados);
}

form.addEventListener("submit", login);