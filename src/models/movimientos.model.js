const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Movimiento = db.define(
  "movimiento",
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    codigo_unico: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    tipo_cambiosId: {
      type: DataTypes.INTEGER,
      field: "tipo_cambios_id",
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Movimiento;
