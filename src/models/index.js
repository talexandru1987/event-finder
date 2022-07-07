const Events = require("./events");
const Friends = require("./friends");
const Invites = require("./invites");
const Messages = require("./messages");
const User = require("./user");

// define associations

User.belongsTo(Friends);

User.belongsTo(Invites);

User.belongsToMany(Events);

module.exports = {
  Events,
  Friends,
  Invites,
  Messages,
  User,
};
