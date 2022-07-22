const { Router } = require("express");

const {
  getSearchBySearchKey,
  createEvent,
  createInvite,
  acceptFriendInvite,
} = require("../../controllers/api");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/search/:searchKey", getSearchBySearchKey);
router.post("/event", auth, createEvent);
router.post("/invites", auth, createInvite);
router.put("/friend-invite", auth, acceptFriendInvite);

module.exports = router;
