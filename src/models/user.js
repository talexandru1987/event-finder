const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");

class User extends Model {
  getUser() {
    return {
      id: this.id,
      firstName: this.first_name,
      lastName: this.last_name,
      userName: this.user_name,
      email: this.email,
      profileImgUrl: this.profile_img_url,
      dateOfBirth: this.date_of_birth,
    };
  }

  async checkPassword(password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  }
}

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
      isEmail: true,
    },
  },

  profile_img_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
    defaultValue:
      "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?s=612x612",
  },

  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
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
