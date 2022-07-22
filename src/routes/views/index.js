const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderMyEventsPage,
  renderMyInvitesPage,
  renderContactPage,
} = require("../../controllers/views");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignUpPage);
router.get("/search-events", renderSearchEventsPage);
router.get("/contact", renderContactPage);
router.get("/my-events", auth, renderMyEventsPage);
router.get("/my-invites", auth, renderMyInvitesPage);
module.exports = router;
