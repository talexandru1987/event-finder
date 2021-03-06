const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const { Events, User, Search, Invites, Friends } = require("../../models");
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

const renderContactPage = (req, res) => {
  return res.render("contact");
};

const renderSearchEventsPage = async (req, res) => {
  try {
    const { q } = req.query;

    const options = {
      params: {
        q: encodeURI(q),
        engine: "google_events",

        api_key: process.env.GOOGLE_API_KEY,
      },
    };

    const { data } = await axios.get(GOOGLE_EVENTS_URL, options);

    const events = data?.events_results?.map((event) => {
      return {
        id: uuidv4(),
        title: event?.title,
        address: event.address.join(" "),
        ticket_info: event?.ticket_info,
        date: `${event?.date?.start_date} | ${event?.date?.when}`,
        rating: event?.venue?.rating,
        reviews: event?.venue?.reviews,
        googleMapImage: event?.event_location_map?.image,
        googleMapLink: event?.event_location_map?.link,
        eventLink: event?.link,
        venue: event?.venue?.name,
        thumbnail: event?.thumbnail,
        description: event?.description,
      };
    });

    const searchKey = uuidv4();

    await Search.create({
      search_key: searchKey,
      search_results: JSON.stringify(events),
    });

    return res.render("searchEvents", {
      events,
      isLoggedIn: req.session.isLoggedIn,
      searchKey,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to render search event page | ${error.message}`);

    return res.render("error");
  }
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

  const friendsFromDb = await Friends.findAll({
    where: {
      user_id: user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "user_name", "profile_img_url"],
      },
    ],
    attributes: [],
  });

  const friends = friendsFromDb.map((friend) => {
    return friend.get({ plain: true }).user;
  });

  return res.render("myEvents", {
    events,
    user,
    friends,
  });
};

const renderMyInvitesPage = async (req, res) => {
  try {
    const invitesFromDb = await Invites.findAll({
      where: {
        friend_id: req.session.user.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "user_name", "profile_img_url"],
        },
        {
          model: Events,
        },
      ],
    });

    const invites = invitesFromDb.map((invite) => {
      return invite.get({ plain: true });
    });

    return res.render("myInvites", { invites });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignUpPage,
  renderSearchEventsPage,
  renderMyEventsPage,
  renderContactPage,
  renderMyInvitesPage,
};
