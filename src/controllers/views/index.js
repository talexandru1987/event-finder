const axios = require("axios");

const GOOGLE_EVENTS_URL = "https://serpapi.com/search.json";

const renderHomePage = (req, res) => {
  return res.render("home");
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

  console.log(data.events_results);
  const events = data.events_results;

  const eventCards = data.events_results.map((event) => {
    return ``;
  });

  return res.render("searchEvents");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
};
