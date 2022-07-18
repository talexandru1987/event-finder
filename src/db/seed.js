//TEMPLATE CODE

const connection = require("../config/connection");
const { Events, Friends, Invites, Messages, User } = require("../models");
const events = require("./events.json");
const friends = require("./friends.json");
const invites = require("./invites.json");
const messages = require("./messages.json");
const users = require("./user.json");

const seedUsers = async () => {
  const promises = users.map((user) => User.create(user));
  await Promise.all(promises);
  console.log("Successfully seeded users");
};

const seedFriends = async () => {
  const promises = friends.map((friend) => Friends.create(friend));
  await Promise.all(promises);
  console.log("Successfully seeded friends");
};

const seedEvents = async () => {
  const promises = events.map((event) => Events.create(event));
  await Promise.all(promises);
  console.log("Successfully seeded events");
};

const seedInvites = async () => {
  const promises = invites.map((invite) => Invites.create(invite));
  await Promise.all(promises);
  console.log("Successfully seeded invites");
};

const seedMessages = async () => {
  const promises = messages.map((message) => Messages.create(message));
  await Promise.all(promises);
  console.log("Successfully seeded messages");
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

    // seed invites
    await seedInvites();

    // seed messages
    await seedMessages();

    console.log("Seeding complete!!");
  } catch (error) {
    console.log(`[ERROR]: Failed to seed | ${error.message}`);
  }

  // kill node process
  process.exit(0);
};

init();
