const express = require("express");
const app = express();
const { PORT, SECRET } = require("./util/config");
const { connectToDatabase, sequelize } = require("./util/db");
const middleware = require("./util/middleware");
const blogsRouter = require("./controllers/blogs");
const authorsRouter = require("./controllers/authors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const readinglistsRouter = require("./controllers/readinglists");
require("express-async-errors");

// Sessions
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const myStore = new SequelizeStore({
  db: sequelize,
  //table: "sessions",
  modelKey: "Session",
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000,
});
//console.log(myStore)
app.use(
  session({
    secret: SECRET,
    store: myStore,
    resave: false,
    proxy: true,
    saveUninitialized: true
  }),
);
myStore.sync()

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/readinglists", readinglistsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
