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

const getInfoFromSearch = (data) =>{
  if (data.events_results){
    
    const title = data.title;
    const date= data?.albumOfTrack.date;
    const when= data.when;
    const address= data.address;
    const thumbnail=data.thumbnail;

    const eventCard = `<div class="event-card">
    <div class="event-card-header">
      <img
        src="${thumbnail}"
        alt="rover"
      />
    </div>
    <div class="event-card-body">
      <span class="tag tag-teal">Technology</span>
      <h4>
        ${title}
      </h4>
      <p>
      ${address}
      </p>
      <div class="user">
      <img
        src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
        alt="user"
      />
        <div class="user-info">
          <h5>${date}</h5>
          <small>${when}</small>
        </div>
      </div>
    </div>
  </div>`;

  return eventCard;
  };

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
};
