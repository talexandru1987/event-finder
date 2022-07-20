const { Router } = require("express");

const { getSearchBySearchKey, createEvent } = require("../../controllers/api");

const router = Router();

router.get("/search/:searchKey", getSearchBySearchKey);
router.post("/event", createEvent);

module.exports = router;
