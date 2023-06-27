const express = require("express");
const cors = require('cors');
const iniModel = require("./models/initModel");
const db = require("./utils/database");
const apiRoutes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

iniModel();

const app = express();
app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.send("Servisor funcionando OK");
});

db.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => console.log(error));

//Rutas
apiRoutes(app);

//Validar todas las rutas que no incluya la aplicacion con el app.
app.use("*", (req, res) => {
  return res.status(404).send('El backend se encuentra trabajando pronto se implementará')
})


app.listen(PORT, () => {
  console.log(`Servidor ejecutando en el puerto ${PORT}`);
});
