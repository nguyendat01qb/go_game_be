const Router = require("express");
const {
  getFixLinks,
  getFixLink,
  createFixLink,
  updateFixLink,
  deleteFixLink,
} = require("../controllers/fixLink.controller");

const router = Router();

router.get("/fixLinks", getFixLinks);

router.get("/fixLink/:id", getFixLink);

router.post("/fixLink", createFixLink);

router.put("/fixLink/update", updateFixLink);

router.delete("/fixLink/:id", deleteFixLink);

module.exports = router;
