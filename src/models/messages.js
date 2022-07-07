const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

const User = require("./user");

const Events = require("./events");

class Messages extends Model {}

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

  text: {
    type: DataTypes.STRING,
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  modelName: "messages",
};

Messages.init(schema, options);

module.exports = Messages;
