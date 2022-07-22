const { faker } = require("@faker-js/faker");

const USERS_NUMBER = 50;

const usersArray = new Array(USERS_NUMBER).fill("");

const users = usersArray.map((_, index) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const userName = `${firstName}${lastName}${index}`;
  const password = "Password123!";
  const email = `${firstName}.${lastName}@email.com`;
  const dateOfBirth = faker.date.birthdate();
  const profileImgUrl = faker.image.people();

  return {
    first_name: firstName,
    last_name: lastName,
    user_name: userName,
    password,
    email,
    profile_img_url: profileImgUrl,
    date_of_birth: dateOfBirth,
  };
});

module.exports = users;
