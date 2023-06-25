const app = require("./src/app");
const { sequelize } = require("./src/db")

app.listen(3001, () => {
    //sequelize.sync({ force: true }); // FORCE LO QUE HACE ES DROPEAR TODOS LOS DATOS QUE TENGAMOS DENTRO DE LA TABLA COMO ES PRUEBA NO PASA NADA.
    sequelize.sync({ alter: true }); //ALTER USAREMOS PARA ACTUALICE ENTERA USAREMOS UNA VEZ QUE TENGAMOS BIEN DEFINIDO LA 
    console.log("listening on port 3001");
});