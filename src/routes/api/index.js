const { Router } = require("express");

const { searchEvents } = require("../../controllers/api");

const router = Router();

router.get("/search-events", searchEvents);

module.exports = router;
