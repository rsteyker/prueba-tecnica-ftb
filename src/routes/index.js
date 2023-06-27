const tipoCambioRouter = require("./tipoCambio.routes");
const movimientoRoouter = require("./movimientos.routes");

const apiRoutes = (app) => {
  app.use(movimientoRoouter);
  app.use(tipoCambioRouter);
};

module.exports = apiRoutes;
