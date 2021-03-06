const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

const User = require("./user");

class Events extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_link: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  map_img_url: {
    type: DataTypes.STRING,
  },
  google_map_link: {
    type: DataTypes.STRING,
  },
  venue: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.DOUBLE,
  },
  reviews: {
    type: DataTypes.INTEGER,
  },
  event_image_url: {
    type: DataTypes.STRING,
  },
  ticket_link: {
    type: DataTypes.STRING,
  },
  more_info_link: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: {
      references: User,
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  modelName: "events",
};

Events.init(schema, options);

module.exports = Events;
