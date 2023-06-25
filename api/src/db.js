const { Sequelize } = require("sequelize");
const UserModels = require("./models/User");
const PostModels = require("./models/Post");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/repaso`,
  { logging: false } // {logging:false} se utiliza para no recargar con información la terminal.
); // Example for postgres

UserModels(sequelize);
PostModels(sequelize);

const { User, Post } = sequelize.models;

User.hasMany(Post);
Post.belongsTo(User);

/* Team.hasMany(Player);
Player.belongsTo(Team); */

module.exports = { sequelize, ...sequelize.models };
// Al importar ...sequelize.models un spread operator un rec  exporto todo lo que hay dentro del objeto.
// crear la conexión con la base de datos
// definir los modelos
// relacionarlos (en el pi la relacion es de muchos a muchos)
// exportarla
