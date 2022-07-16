const path = require("path");

const renderHomePage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/index.html");
  return res.sendFile(filePath);
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderSignUpPage = (req, res) => {
  return res.render("signup");
};

const renderSearchEventsPage = (req, res) => {
  return res.render("searchEvents");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
};
