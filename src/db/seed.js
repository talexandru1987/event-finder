//TEMPLATE CODE

// const connection = require("../config/connection");
// const { User, Book } = require("../models");
// const users = require("./users.json");
// const books = require("./books.json");

// const seedUsers = async () => {
//   const promises = users.map((user) => User.create(user));
//   await Promise.all(promises);
//   console.log("Successfully seeded users");
// };

// const seedBooks = async () => {
//   await Book.bulkCreate(books);
//   console.log("Successfully seeded books");
// };

// const init = async () => {
//   try {
//     console.log("Seeding database...");
//     await connection.sync({ force: true });

//     // seed users
//     await seedUsers();

//     // seed books
//     await seedBooks();

//     console.log("Seeding complete!!");
//   } catch (error) {
//     console.log(`[ERROR]: Failed to seed | ${error.message}`);
//   }

//   // kill node process
//   process.exit(0);
// };

// init();
