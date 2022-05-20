import ControllerVitrine from "./controllers/ControllerVitrine.js";
import ControllerFiltros from "./controllers/ControllerFiltros.js";

ControllerVitrine.mostrarTodos();
await ControllerFiltros.criarSelecao();

const input = document.getElementById("pesquisar");
input.addEventListener("keydown", ControllerFiltros.pesquisar);
