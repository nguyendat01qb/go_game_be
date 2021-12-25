const Router = require("express");
const {
  getRecharges,
  getRecharge,
  createRecharge,
  updateRecharge,
  deleteRecharge,
} = require("../controllers/recharge.controller");

const router = Router();

router.get("/recharges", getRecharges);

router.get("/recharge/:id", getRecharge);

router.post("/recharge", createRecharge);

router.put("/recharge/update", updateRecharge);

router.delete("/recharge/:id", deleteRecharge);

module.exports = router;
