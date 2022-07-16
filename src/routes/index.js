const { Router } = require("express");
const views = require("./views");

const router = Router();

router.use("/", views);

module.exports = router;
