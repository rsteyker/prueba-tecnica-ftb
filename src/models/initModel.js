const Movimiento = require("./movimientos.model");
const Tipo_cambios = require("./tipo_cambios.model");
Tipo_cambios;

const initModel = () => {
  Movimiento.belongsTo(Tipo_cambios, { foreignKey: "tipo_cambios_id" });
  Tipo_cambios.hasMany(Movimiento, { foreignKey: "tipo_cambios_id" });
};

module.exports = initModel;
