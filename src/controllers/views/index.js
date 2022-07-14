const path = require("path");

const renderHomePage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/index.html");
  return res.sendFile(filePath);
};

const renderLoginPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/login.html");
  return res.sendFile(filePath);
};

const renderSignUpPage = (req, res) => {
  const filePath = path.join(__dirname, "../../../public/signup.html");
  return res.sendFile(filePath);
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
};
