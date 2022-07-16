const bcrypt = require("bcrypt");

const hashPassword = async (user) => {
  // overwrite user password
  user.password = await bcrypt.hash(user.password, 10);

  // return user
  return user;
};

module.exports = { hashPassword };
