const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class User extends Model {}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 40],
    },
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 40],
    },
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 40],
    },
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 60],
      is: ["^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: ["^[w-.]+@([w-]+.)+[w-]{2,4}$"],
    },
  },

  profile_img_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: [
        "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)",
      ],
    },
    default:
      "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?s=612x612",
  },

  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      is: [
        "^(?:(?:31(/|-|.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(/|-|.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]d)?d{2})$|^(?:29(/|-|.)0?2\3(?:(?:(?:1[6-9]|[2-9]d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1d|2[0-8])(/|-|.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]d)?d{2})$",
      ],
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  freezeTableName: true,
  modelName: "user",
};

User.init(schema, options);

module.exports = User;
