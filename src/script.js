import ControllerVitrine from "./controllers/ControllerVitrine.js";

import ControllerFiltros from "./controllers/ControllerFiltros.js";
import ControllerCarrinho from "./controllers/ControllerCarrinho.js";

ControllerVitrine.mostrarTodos();

await ControllerFiltros.criarSelecao();

ControllerCarrinho.mostrarProdutos();
localStorage.setItem("carrinho", "{}");

const input = document.querySelector(".pesquisa");
input.addEventListener("keydown", ControllerFiltros.pesquisar);
