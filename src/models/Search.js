const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class Search extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  search_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  search_results: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  modelName: "search",
};

Search.init(schema, options);

module.exports = Search;
