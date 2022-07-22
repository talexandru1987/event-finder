const { Search, Events, Invites } = require("../../models");

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
  try {
    const tickets = req.body.ticket_info.find((each) => {
      each.link_type === "tickets";
    });

    const moreInfo = req.body.ticket_info.find((each) => {
      each.link_type === "more info";
    });

    const event = {
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
      ticket_link: tickets?.link,
      description: req.body.description,
      user_id: req.session.user.id,
      more_info_link: moreInfo?.link,
    };

    await Events.create(event);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to save event| ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const createInvite = async (req, res) => {
  try {
    const { event_id, friend_id } = req.body;
    const { id } = req.session.user;

    const invite = {
      user_id: id,
      friend_id,
      event_id,
    };

    await Invites.create(invite);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to save invite | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const acceptFriendInvite = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (status) {
      //accept
      await Invites.update(
        { hasAccepted: true },
        {
          where: {
            id,
          },
        }
      );
    } else {
      //delete
      await Invites.destroy({
        where: {
          id,
        },
      });
    }
    return res.status(200).json({ success: true, status: 0 });
  } catch (error) {
    return res.status(500).json({ success: false, status: 1 });
  }
};

module.exports = {
  getSearchBySearchKey,
  createEvent,
  createInvite,
  acceptFriendInvite,
};
