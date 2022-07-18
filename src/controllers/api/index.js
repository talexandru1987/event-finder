const path = require("path");

const searchEvents = (req, res) => {};

const renderSearchEvents = (req, res) => {
  //code for rendering the vents page
  console.log("render the events in the selected city");
  return res.render("login", { currentPage: "login" });
};

const renderLoginPage = (req, res) => {
  return res.render("login", { currentPage: "login" });
};

module.exports = {
  searchEvents,
};
