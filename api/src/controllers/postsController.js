const { Post } = require("../db");
const createPost = async (title, body, userId) => {
  const newPost = await Post.create({ title, body });
  //sequelize crea una serie de metodos en base a los nombres de los modelos que estoy relacionando sabe que el post necesita un user.
  // Te da un metodo que puedas setear el usuario en cuestion nos está diciendo que usuario es el que esta haciendo el post.
  // Es solo este usuario y ninguno más.
  await newPost.setUser(userId);
  return newPost;
};

module.exports = { createPost };
