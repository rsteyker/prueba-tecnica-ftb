const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Tipo_cambios = db.define(
  "tipo_cambios",
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    venta: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    compra: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Tipo_cambios;
