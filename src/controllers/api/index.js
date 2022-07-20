const { Search, Events } = require("../../models");

const getSearchBySearchKey = async (req, res) => {
  const { searchKey } = req.params;

  const searchResultFromDb = await Search.findOne({
    where: {
      search_key: searchKey,
    },
  });

  const searchResult = searchResultFromDb.get({ plain: true });

  return res.json({
    success: true,
    data: {
      ...searchResult,
      search_results: JSON.parse(searchResult.search_results),
    },
  });
};

const createEvent = async (req, res) => {
  console.log(req.session.user.id);
  console.log(req.session.isLoggedIn);
  try {
    if (!req.session.isLoggedIn) {
      return res.render("login");
    }

    const event = {
      id: req.body.id,
      title: req.body.title,
      address: req.body.address,
      event_link: req.body.eventLink,
      start_date: req.body.date,
      map_img_url: req.body.googleMapImage,
      google_map_link: req.body.googleMapLink,
      venue: req.body.venue,
      rating: req.body.rating,
      reviews: req.body.reviews,
      event_image_url: req.body.thumbnail,
      ticket_link: req.body.ticket_info[0].link,
      description: req.body.description,
      user_id: req.session.user.id,
    };
    await Events.create(event);
  } catch (error) {
    console.log(`[ERROR]: Failed to save event| ${error.message}`);

    return res.status(401).json({ success: false });
  }
};

module.exports = {
  getSearchBySearchKey,
  createEvent,
};
