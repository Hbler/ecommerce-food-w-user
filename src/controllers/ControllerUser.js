import API from "../utils/API.js"

const formCadastro = document.getElementById("formularioCadastro");

function pegarDados (event) {
    event.preventDefault();
    const input = event.target;

    const dados = {};
    
    for (let i = 0; i < input.length; i++) {
        const {name, value} = input[i];
        if (name) {
            dados[name] = value;
        }
    }
    
    return API.cadastroUsuario(dados);
}

formCadastro.addEventListener("submit", pegarDados);



const formLogin = document.getElementById("formularioLogin");

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

formLogin.addEventListener("submit", login);