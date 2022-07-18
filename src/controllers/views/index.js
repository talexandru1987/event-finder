const axios = require("axios");
const { UserEvents, Events, User } = require("../../models");
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

  return res.render("searchEvents", { events });
};

const renderSaveEventsPage = async (req, res) => {
  const userEventsFromDb = await Events.findAll({
    include: [
      {
        model: User,
        through: UserEvents,
        where: {
          user_id: req.session.user.id,
        },
      },
    ],
  });
  const userEvents = userEventsFromDb.map((userEvent) => {
    return userEvent.get({ plain: true });
  });
  console.log(userEvents);

  return res.render("saved-events", { currentPage: "save-events", savedCards });
};
module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderSaveEventsPage,
};
