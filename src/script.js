import ControllerVitrine from "./controllers/ControllerVitrine.js";
import ControllerCarrinho from "./controllers/ControllerCarrinho.js";
ControllerCarrinho.mostrarProdutos();

ControllerVitrine.mostrarTodos();

localStorage.setItem("carrinho", "{}");
