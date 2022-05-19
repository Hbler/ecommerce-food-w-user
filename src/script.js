import ControllerProdutos from "./controllers/ControllerProdutos.js";
import ControllerFormulario from "./controllers/ControllerFormulario.js";

localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMjNhYTM2LTE2YTItNDc0OC1iNjY0LTkyZmRhOGUyYTVlYSIsImlhdCI6MTY1Mjk5Mzc4NiwiZXhwIjoxNjUzODU3Nzg2LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.d-hCl6K0CP9VCM9sPgpn0V2Pt2yF1svytcM59sEee1E"
);

const btn1 = document.querySelector(".cadastrar");
const btn2 = document.querySelector(".editar");

btn1.addEventListener("click", () => {
  ControllerFormulario.produtoUsuario("cadastrar");
});
btn2.addEventListener("click", ControllerProdutos.editar);
