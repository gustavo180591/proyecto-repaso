const { User, Post } = require("../db");
const axios = require("axios");

//Con esta función traemos las propiedades de la api que nos interesan.
const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      email: elem.email,
      phone: elem.phone,
      created: false,
    };
  });

const createUser = async (name, email, phone) => {
  
  await User.create({ name, email, phone });
};

// con await estamos diciendo espero que esa promesa se resuelva
//User.create({ name, email, phone }) devuelve una promesa
//Tenemos que darle función async porque nos da la ejecucion de una funcion async nos da una promesa. Esta basado en promesas.
const getUsersById = async (id, source) => {
  const user =
    source === "api"
      ? (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
          .data
      : await User.findByPk(id, {
          include: {
            model: Post,
            attributes: ["title", "body"],
          },
        });
  // {  include:{    model: Post,  }}   ... (Con esta instrucción trae los posteo realizados por el usuario).
  return user;
};

const getAllUsers = async () => {
  // Buscar en bdd
  const databaseUsers = await User.findAll();
  // Buscar en api
  const apiUsersRaw = (
    await axios.get("https://jsonplaceholder.typicode.com/users")
  ).data;

  const apiUsers = cleanArray(apiUsersRaw);
  // Unificar
  return [...databaseUsers, ...apiUsers];
};
const searchUserByName = async (name) => {
  const databaseUsers = await User.findAll({ where: { name: name } });
  const apiUsersRaw = (
    await axios.get("https://jsonplaceholder.typicode.com/users")
  ).data;
  const apiUsers = cleanArray(apiUsersRaw);
  const filteredApi = apiUsers.filter((user) => user.name === name);
  // es la array filteredApi, pero al colocar los ... estamos hablando de los elementos de filteredApi.
  return [...filteredApi, ...databaseUsers];
};

module.exports = { createUser, getUsersById, getAllUsers, searchUserByName };
