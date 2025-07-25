const express = require("express");
const urlRouter = require("./routes/url.route");
const connectToMongoDB = require("./connection");
const path = require("path");
const staticRouter = require("./routes/static.route");
const userRouter = require("./routes/user.route");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth.guard");
const cookieParser = require('cookie-parser')

connectToMongoDB("mongodb://127.0.0.1:27017/shortURL")
  .then(() => console.log("Connected to mongoDB."))
  .catch((err) => console.log(`Error to connecting mongoDB ${err}.`));

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictTo(['NORMAL']) , urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server has started on ${PORT} port.`));
