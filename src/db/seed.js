const { Events, Friends, Invites, Messages, User } = require("../models");
const connection = require("../config/connection");

const users = require("./users");

const seedUsers = async () => {
  const promises = users.map((user) => User.create(user));
  await Promise.all(promises);
  console.log("Successfully seeded users");
};

const seedFriends = async () => {
  const users = await User.findAll({});

  const friends = users.reduce((acc, user) => {
    const userId = +user.get("id");

    const MAX_FRIENDS = 5;

    const randomNumberOfFriends = Math.floor(Math.random() * MAX_FRIENDS);

    const friendsArray = new Array(randomNumberOfFriends).fill("");

    const friendIds = [];

    const friends = friendsArray
      .map(() => {
        const randomFriendIndex = Math.floor(Math.random() * users.length);
        const friendId = +users[randomFriendIndex].get("id");

        if (!friendIds.includes(friendId)) {
          friendIds.push(friendId);
          return {
            user_id: userId,
            friend_id: friendId,
          };
        }
      })
      .filter((each) => each);

    return [...acc, ...friends];
  }, []);

  await Friends.bulkCreate(friends);

  console.log("Successfully seeded friends");
};

const seedEvents = async () => {
  const eventsSample = [
    {
      user_id: 1,
      title: "High Tonight Show Season Premiere Festival",
      address: "The Electric Church, 5018 E Cesar Chavez St",
      event_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-4-premiere-tickets-376569067217?aff=ebdssbdestsearch",
      start_date: "2015-03-12T13:37:27+00:00",
      map_img_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      google_map_link:
        "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b42a69357df7:0x2d6762a349719224?sa=X&hl=en",
      venue: "The Electric Church",
      rating: "4.5",
      reviews: "182",
      event_image_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      ticket_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-premiere-festival-tickets-376569067217",
      more_info_link:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToC2AjMBmuhi4hEwDgk1WDJCGfXcFKo9LiXyNcl-rhxw&s",
      description:
        "Join us for The High Tonight Show Season 4 premiere live July 9th at 4:20pm. Free preroll with every ticket purchase.",
    },
    {
      user_id: 1,
      title: "Three Days Grace",
      address: "Stubb's Bar-B-Q, 801 Red River St",
      event_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-4-premiere-tickets-376569067217?aff=ebdssbdestsearch",
      start_date: "2016-03-12T13:37:27+00:00",
      map_img_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      google_map_link:
        "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b42a69357df7:0x2d6762a349719224?sa=X&hl=en",
      venue: "The Electric Church",
      rating: "3.5",
      reviews: "344",
      event_image_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      ticket_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-premiere-festival-tickets-376569067217",
      more_info_link:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToC2AjMBmuhi4hEwDgk1WDJCGfXcFKo9LiXyNcl-rhxw&s",
      description:
        "Canadian metal troops Three Days Grace will perform live at Stubb's Waller Creek Amphitheater on Thu, Aug 11 at 6:00pm.",
    },
    {
      user_id: 2,
      title: "Calum Scott",
      address: "Historic Scoot Inn, 1308 E 4th St",
      event_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-4-premiere-tickets-376569067217?aff=ebdssbdestsearch",
      start_date: "2017-03-12T13:37:27+00:00",
      map_img_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      google_map_link:
        "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b42a69357df7:0x2d6762a349719224?sa=X&hl=en",
      venue: "The Electric Church",
      rating: "1.5",
      reviews: "123",
      event_image_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      ticket_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-premiere-festival-tickets-376569067217",
      more_info_link:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToC2AjMBmuhi4hEwDgk1WDJCGfXcFKo9LiXyNcl-rhxw&s",
      description:
        "Check out Calum Scott at Historic Scoot Inn in Austin on August 14, 2022 and get detailed info for the event - tickets, photos, video and reviews.",
    },
    {
      user_id: 3,
      title: "CUCO 2022 SUMMER TOUR",
      address: "ACL Live, 310 W Willie Nelson Blvd",
      event_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-4-premiere-tickets-376569067217?aff=ebdssbdestsearch",
      start_date: "2017-03-12T13:37:27+00:00",
      map_img_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      google_map_link:
        "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8644b42a69357df7:0x2d6762a349719224?sa=X&hl=en",
      venue: "The Electric Church",
      rating: "5.5",
      reviews: "274",
      event_image_url:
        "https://www.google.com/maps/vt/data=GA2zYAqr3FirdQoRPT_-akW1ppkbu0o9ilCSlHmOxjJxJQZFcMO9Xo6ZfSrayfHrejMZGF-xZ-nCtoa3YQO5-kO2L8ktvT9l375jebBqCLVsgnA1Y2c",
      ticket_link:
        "https://www.eventbrite.com/e/high-tonight-show-season-premiere-festival-tickets-376569067217",
      more_info_link:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToC2AjMBmuhi4hEwDgk1WDJCGfXcFKo9LiXyNcl-rhxw&s",
      description:
        "Sometimes the safest world to reside in–hide in–is the one you create yourself. For his second full-length studio album, Fantasy Gateway, Cuco did just that. The time between Para Mí and now...",
    },
  ];

  const users = await User.findAll({});

  const events = users.map(() => {
    const randomEventIndex = Math.floor(Math.random() * eventsSample.length);
    const randomEvent = eventsSample[randomEventIndex];

    const randomUserIndex = Math.floor(Math.random() * users.length);
    const userId = +users[randomUserIndex].get("id");

    return {
      ...randomEvent,
      user_id: userId,
    };
  });

  await Events.bulkCreate(events);

  console.log("Successfully seeded events");
};

const init = async () => {
  try {
    console.log("Seeding database...");
    await connection.sync({ force: true });

    // seed users
    await seedUsers();

    // seed friends
    await seedFriends();

    // seed events
    await seedEvents();

    console.log("Seeding complete!!");
  } catch (error) {
    console.log(`[ERROR]: Failed to seed | ${error.message}`);
  }

  // kill node process
  process.exit(0);
};

init();
