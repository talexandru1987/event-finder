const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

const User = require("./user");

const Events = require("./events");

class Invites extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: {
      references: User,
      key: "id",
    },
  },

  friends_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: {
      references: User,
      key: "id",
    },
  },

  events_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: {
      references: Events,
      key: "id",
    },
  },

  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  modelName: "invites",
};

Invites.init(schema, options);

module.exports = Invites;
