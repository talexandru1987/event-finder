const { Router } = require("express");

const { renderHomePage, renderLoginPage, renderSignUpPage } = require("../../controllers/views");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignUpPage);

module.exports = router;
