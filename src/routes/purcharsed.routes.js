const Router = require("express");
const {
  getPurcharsed,
  getOnePurcharsed,
  createPurcharsed,
  updatePurcharsed,
  deletePurcharsed,
} = require("../controllers/purcharsed.controller");

const router = Router();

router.get("/purcharsed", getPurcharsed);

router.get("/purcharsed/:id", getOnePurcharsed);

router.post("/purcharsed", createPurcharsed);

router.put("/purcharsed/update", updatePurcharsed);

router.delete("/purcharsed/:id", deletePurcharsed);

module.exports = router;
