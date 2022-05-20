import ControllerVitrine from "./controllers/ControllerVitrine.js";
import ControllerFiltros from "./controllers/ControllerFiltros.js";

ControllerVitrine.mostrarTodos();
await ControllerFiltros.criarSelecao();

const input = document.querySelector(".pesquisa");
input.addEventListener("keydown", ControllerFiltros.pesquisar);
