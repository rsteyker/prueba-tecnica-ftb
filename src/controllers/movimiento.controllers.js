const csv = require("csv-parser");
const fs = require("fs");
const Movimiento = require("../models/movimientos.model");
const Tipo_cambios = require("../models/tipo_cambios.model");

//Importar movimientos desde un archivo CSV
const uploadMovimientosCSV = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      error: "No se ha proporcionado ningún archivo",
    });
  }

  try {
    const result = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => result.push(data))
      .on("end", async () => {
        //Procesar los datos del archivo CSV
        for (const movimiento of result) {
          //Calcular el monto en soles (PEN) si es (USD)
          if (movimiento.moneda === "USD") {
            const tipoCambio = await Tipo_cambios.findOne({
              where: { fecha: movimiento.fecha },
            });
            movimiento.monto *= tipoCambio.compra;
            movimiento.moneda = "PEN";
          }

          //Guardar el archivo CSV temporal
          await Movimiento.create(movimiento);
        }
        //Eliminar el archivo CSV temporal
        fs.unlinkSync(req.file.path);

        response.status(200).send("Archivo importado exitosamente");
      });
  } catch (error) {
    res.status(500).send("Error al importar el archivo");
  }
};

//Listar todo los movimientos bancarios
const findAllMovimiento = async (req, res) => {
  try {
    const movimientos = await Movimiento.findAll();
    res.json(movimientos);
  } catch (error) {
    res.status(500).send("Error al obtener los movimientos bancarios");
  }
};

//Ruta para editar un movimiento bancario
const updateMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByPk(req.params.id);

    if (movimiento) {
      //Actualizar el movimiento bancario con los nuevos datos
      await movimiento.update(req.body);
      res.status(200).send("Movimiento bancario actualizado exitosamente");
    } else {
      res.status(404).send("Movimiento bancario no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al actualizar el movimiento bancario");
  }
};

//eliminar un movimiento por su ID
const deleteMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByPk(req.params.id);
    if (movimiento) {
      //Eliminar el movimiento bancario
      await movimiento.destroy();
      res.status(200).send("Movimiento bancario eliminado exitosamente");
    } else {
      res.status(404).send("Movimiento bancario no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el movimiento bancario");
  }
};

module.exports = {
  findAllMovimiento,
  uploadMovimientosCSV,
  updateMovimiento,
  deleteMovimiento,
};
