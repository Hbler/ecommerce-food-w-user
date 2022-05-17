import API from "../utils/API.js"

const form = document.getElementById("formularioCadastro");

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
form.addEventListener("submit", pegarDados);

