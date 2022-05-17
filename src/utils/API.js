class API {
  static token = "";
  static base_URL = "https://api-kenzie-food.herokuapp.com";

  static async produtosTodos() {}

  static async loginUsuario() {}
  static async cadastroUsuario() {}

  static async produtosUsurario() {}
  static async produtosNovo(obj) {}
  static async produtosApagar(id) {}
  static async produtosEditar(id, obj) {}

  static async carrinhoSalvo() {}
  static async carrinhoRemover(id) {}
  static async carrinhoAdicionar(obj) {}
}

export default API;
