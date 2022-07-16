const { Router } = require("express");

const { renderEventsPage } = require("../../controllers/api");

const router = Router();

router.get("/events", renderEventsPage);

module.exports = router;
