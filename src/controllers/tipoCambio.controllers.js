const Tipo_cambios = require("../models/tipo_cambios.model");

//Ruta para obtener todos los tipos de cambio
const findAllTipoCambio = async (req, res) => {
  try {
    const tipoCambio = await Tipo_cambios.findAll();
    res.json(tipoCambio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos de cambio" });
  }
};

module.exports = { findAllTipoCambio };
