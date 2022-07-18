const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderSaveEventsPage,
} = require("../../controllers/views");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignUpPage);
router.get("/search-events", renderSearchEventsPage);
router.get("/my-events", auth, renderSaveEventsPage);
module.exports = router;
