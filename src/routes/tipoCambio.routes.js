const { Router } = require("express");
const { findAllTipoCambio } = require("../controllers/tipoCambio.controllers");

const router = Router();

router.get("/tipos-cambios", findAllTipoCambio);

module.exports = router;
