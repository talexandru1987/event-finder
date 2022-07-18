const axios = require("axios");
const { Events, User } = require("../../models");
const { getAttributes } = require("../../models/user");

const GOOGLE_EVENTS_URL = "https://serpapi.com/search.json";

const renderHomePage = (req, res) => {
  return res.render("home", { isLoggedIn: req.session.isLoggedIn });
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderSignUpPage = (req, res) => {
  return res.render("signup");
};

const renderSearchEventsPage = async (req, res) => {
  const { q } = req.query;

  const options = {
    params: {
      q: encodeURI(q),
      engine: "google_events",

      api_key: process.env.GOOGLE_API_KEY,
    },
  };

  const { data } = await axios.get(GOOGLE_EVENTS_URL, options);

  const events = data.events_results.map((event) => {
    return { ...event, address: event.address.join(" ") };
  });

  return res.render("searchEvents", {
    events,
    isLoggedIn: req.session.isLoggedIn,
  });
};

const renderMyEventsPage = async (req, res) => {
  const { user } = req.session;

  const eventsFromDb = await Events.findAll({
    where: {
      user_id: user.id,
    },
  });

  const events = eventsFromDb.map((event) => {
    return event.get({ plain: true });
  });

  return res.render("myEvents", {
    currentPage: "my-events",
    events,
    user,
  });
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderMyEventsPage,
};
