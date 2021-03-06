const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

const User = require("./user");

class Friends extends Model {}

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

  friend_id: {
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
  modelName: "friends",
};

Friends.init(schema, options);

module.exports = Friends;
