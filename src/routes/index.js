const { Router } = require("express");
const views = require("./views");
const auth = require("./auth");

const router = Router();

router.use("/", views);
router.use("/auth", auth);

module.exports = router;
