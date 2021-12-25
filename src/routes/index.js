const express = require("express");
const router = express.Router();
const accountAdmin = require("./admin/account.routes");

const account = require("./account.routes");
const category = require("./category.routes");
const fixLink = require("./fixLink.routes");
const product = require("./product.routes");
const purcharsed = require("./purcharsed.routes");
const recharge = require("./recharge.routes");

router.use("/api", accountAdmin);

router.use("/api", account);
router.use("/api", category);
router.use("/api", fixLink);
router.use("/api", product);
router.use("/api", purcharsed);
router.use("/api", recharge);

module.exports = router;
