const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const hbs = exphbs.create({});

//const routes = require("./routes");
const connection = require("./config/connection");
const { Events, Friends, Invites, Messages, User } = require("./models");

const app = express();

const PORT = process.env.PORT || 4000;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
// app.use(routes);

const init = async () => {
  try {
    // connect to DB
    await connection.sync({ force: false });

    // server listen on PORT
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};

init();
