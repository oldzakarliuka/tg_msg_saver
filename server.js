const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const {
  MONGODB_URL,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  COOKIE,
  PORT,
} = require("./env");

const Msg = require("./models/msg");
const User = require("./models/user");

const Controllers = require("./controllers");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpress = require("@admin-bro/express");
const { GoogleSheets } = require("./services/sheets.service");

const app = express();
app.use(cors());
app.use(morgan("combined"));

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully");
  })
  .on("error", function (err) {
    console.log("Error", err);
  });

const ADMIN = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
  resources: [Msg, User],
};
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "adminbro",
  cookiePassword: COOKIE,
});

app.use(adminBro.options.rootPath, router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.post("/", Controllers.webhookHandler);

app.listen(PORT || 8080, () => {
  console.log(`Server has been started on ${PORT || 8080}`);
});
