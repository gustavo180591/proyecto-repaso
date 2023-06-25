const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes");

const app = express();

// de esta manera (app.use(cors());) estamos diciendole que venga cualquier cliente a querer comunicarse con mi servidor
app.use(cors());
app.use(morgan("dev"));
/* Quiero que vaya, use sirve para darle el camino hacial el lugar donde tiene que estar,
que vaya hacia el lugar donde alguien lo va a recibir y se va a encargar de esta resposabilidad de enviarla
a su endpoint correspondiente */
app.use(express.json());
app.use(mainRouter);


module.exports = app;
