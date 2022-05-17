import API from "./utils/API.js";

const user = {
  email: "six@mail.com",
  password: "123456",
};

const login = await API.loginUsuario(user);
console.log(login);
