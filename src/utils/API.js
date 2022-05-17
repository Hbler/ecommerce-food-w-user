class API {
  static token = "";
  static base_URL = "https://api-kenzie-food.herokuapp.com";

  static async loginUsuario() {
    const url = API.base_URL + "/auth/login";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    console.log(res);
    return res;
  }
  static async cadastroUsuario(obj) {
    const url = API.base_URL + "/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res;
  }

  static async produtosTodos() {
    const url = API.base_URL + "/produtcs";

    const res = await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res;
  }
  static async produtosUsurario() {
    const url = API.base_URL + "/my/produtcs";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res;
  }
  static async produtosNovo(obj) {
    const url = API.base_URL + "/my/produtcs";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res;
  }
  static async produtosApagar(id) {
    const url = API.base_URL + "/my/produtcs/" + id;

    const res = await fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res;
  }
  static async produtosEditar(id, obj) {}

  static async carrinhoSalvo() {}
  static async carrinhoRemover(id) {}
  static async carrinhoAdicionar(obj) {}
}

export default API;
