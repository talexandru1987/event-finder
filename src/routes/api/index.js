const { Router } = require("express");

const { getSearchBySearchKey } = require("../../controllers/api");

const router = Router();

router.get("/search/:searchKey", getSearchBySearchKey);

module.exports = router;
