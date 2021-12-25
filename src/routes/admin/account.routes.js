const Router = require("express");
const {
  signup,
  signin,
} = require("../../controllers/admin/account.controller");

const verifyToken = require("../../services/verify-token");

const router = Router();

router.post("/admin/signup", signup);

router.post("/admin/signin", signin);

module.exports = router;
