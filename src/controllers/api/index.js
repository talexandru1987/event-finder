const path = require("path");

const renderEventsPage = (req, res) => {
  //code for rendering the vents page
  console.log("render the events in the selected city");
  const filePath = path.join(__dirname, "../../../public/index.html");
  return res.sendFile(filePath);
};

const renderSearchEvents = (req, res) => {
  //code for rendering the vents page
  console.log("render the events in the selected city");
  return res.render("login", { currentPage: "login" });
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

module.exports = {
  renderEventsPage,
};
