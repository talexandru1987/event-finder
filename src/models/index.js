const Events = require("./events");
const Friends = require("./friends");
const Invites = require("./invites");
const Messages = require("./messages");
const User = require("./user");
const UserEvents = require("./user_events");

// define associations

User.hasMany(Friends);

User.belongsToMany(Events, {
  through: UserEvents,
});

User.hasMany(Messages);

Messages.belongsTo(User);

User.hasMany(Invites);

Invites.belongsTo(User);

module.exports = {
  Events,
  Friends,
  Invites,
  Messages,
  User,
};
