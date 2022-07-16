const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
} = require("../../controllers/views");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignUpPage);
router.get("/search-events", renderSearchEventsPage);

module.exports = router;
