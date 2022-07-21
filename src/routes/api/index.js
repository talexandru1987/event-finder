const { Router } = require("express");

const {
  getSearchBySearchKey,
  createEvent,
  createInvite,
} = require("../../controllers/api");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/search/:searchKey", getSearchBySearchKey);
router.post("/event", auth, createEvent);
router.post("/invites", auth, createInvite);

module.exports = router;
