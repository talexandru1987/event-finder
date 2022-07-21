const Events = require("./events");
const Friends = require("./friends");
const Invites = require("./invites");
const Messages = require("./messages");
const User = require("./user");
const Search = require("./Search");

// User and Events
Events.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Events, {
  foreignKey: "user_id",
});

Invites.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Invites, {
  foreignKey: "user_id",
});

Invites.belongsTo(Events, {
  foreignKey: "event_id",
});

Events.hasMany(Invites, {
  foreignKey: "event_id",
});

// User.hasMany(Friends);

// User.hasMany(Messages);

// Messages.belongsTo(User);

module.exports = {
  Events,
  Friends,
  Invites,
  Messages,
  User,
  Search,
};
