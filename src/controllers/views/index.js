const axios = require("axios");
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
  const savedCardsFromDb = await savedCards.findAll({
    where: {
      userId: req.session.user.id,
    },
    include: [
      {
        model: user_events,
        attributes: ["user_id", "event_id"],
      },
      { model: user, attributes: ["first_name", "last_name"] },
      {
        model: events,
        as: "events",
      },
    ],
    attributes: [
      "id",
      "title",
      "end_date",
      "address",
      "event_link",
      "start_date",
      "description",
    ],
  });
  const savedCards = savedCardsFromDb.map((savedCard) => {
    return savedCard.get({ plain: true });
  });

  return res.render("saved-events", { currentPage: "save-events", savedCards });
};
module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderSaveEventsPage,
};
