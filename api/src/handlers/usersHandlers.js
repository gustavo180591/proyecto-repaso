const {
  createUser,
  getUsersById,
  searchUserByName,
  getAllUsers,
} = require("../controllers/usersController");

const getUsersHandler = async (req, res) => {
  const { name } = req.query;

  const results = name ? await searchUserByName(name) : await getAllUsers();
  res.status(200).json(results);
  /* if (name) res.send(`Llamar a la función que busca por nombre`);
  else res.send("Quiero enviar todos los usuarios"); */
  /* console.log(name);
    res.send(name); */
};

const getUserHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";
  // Esto es un ternario isNaN(id) ? "bdd":"api;"
  /* if (isNaN(id)) {
    // Es de la base de datos
    console.log("Tendría que buscar en la base de datos BDD");
  } else {
    // Esto es de la api
    console.log(
      "Tendría que buscar en la Application Programming Interfaces API"
    );
  } */
  try {
    // Yo te cuento donde tenés que ir a buscar esto.
    const user = await getUsersById(id, source);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  /* res.send(`Va a enviar el detalle del usuario de ID ${id}`); */
};

const createUserHandler = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newUser = await createUser(name, email, phone);
    res.status(201).json("Creado exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
  getUsersHandler,
  getUserHandler,
};
