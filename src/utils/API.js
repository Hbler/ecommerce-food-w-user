class API {
  static base_URL = "https://api-kenzie-food.herokuapp.com";

  static async loginUsuario(obj) {
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
    const url = API.base_URL + "/products";

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
    const url = API.base_URL + "/my/products";

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
    const url = API.base_URL + "/my/products";

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
    const url = API.base_URL + "/my/products/" + id;

    const res = await fetch(url, {
      method: "DELETE",
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
  static async produtosEditar(id, obj) {
    const url = API.base_URL + "/my/products/" + id;

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

  static async carrinhoSalvo() {
    const url = API.base_URL + "/cart";

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
  static async carrinhoRemover(id) {
    const url = API.base_URL + "/cart/remove" + id;

    const res = await fetch(url, {
      method: "DELETE",
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
  static async carrinhoAdicionar(obj) {
    const url = API.base_URL + "/cart/add";

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
}

export default API;
