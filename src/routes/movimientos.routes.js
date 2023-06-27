const { Router } = require("express");
const {
  findAllMovimiento,
  deleteMovimiento,
  uploadMovimientosCSV,
  updateMovimiento,
} = require("../controllers/movimiento.controllers");
const upload = require("../utils/multer");

const router = Router();

router.post("/importar", upload.single("archivo"), uploadMovimientosCSV);
router.get("/movimientos", findAllMovimiento);
router.put("/movimientos/:id", updateMovimiento);
router.delete("/movimientos/:id", deleteMovimiento);

module.exports = router;
