import ControllerVitrine from "./controllers/ControllerVitrine.js";
import ControllerFiltros from "./controllers/ControllerFiltros.js";
import ContollerFormulario from "./controllers/ControllerFormulario.js";
import ControllerCarrinho from "./controllers/ControllerCarrinho.js";

ControllerVitrine.mostrarTodos();

await ControllerFiltros.criarSelecao();

ControllerCarrinho.mostrarProdutos();
localStorage.setItem("carrinho", "{}");

const input = document.querySelector(".pesquisa");
input.addEventListener("keydown", ControllerFiltros.pesquisar);

const login = document.querySelector(".acesso__login");
const cadastro = document.querySelector(".acesso__cadastro");

login.addEventListener("click", ContollerFormulario.formularioLogin);
cadastro.addEventListener("click", ContollerFormulario.formularioCadastro);

const carrinho = document.querySelector(".carrinho__titulo");
carrinho.addEventListener("click", ControllerCarrinho.modalCarrinho);
