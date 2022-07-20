const { Router } = require("express");

const { getSearchBySearchKey, createEvent } = require("../../controllers/api");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/search/:searchKey", getSearchBySearchKey);
router.post("/event", auth, createEvent);

module.exports = router;
