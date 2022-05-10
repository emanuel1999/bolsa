const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');

const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const ymal = require("js-yaml");
const fs = require("fs");



const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const slideRouter = require("./routes/slide");
const register = require("./routes/register");
const login = require("./routes/login");
const activitiesRouter = require("./routes/activities");
const testimonialsRouter = require("./routes/testimonials");
const authRouter = require("./routes/authRouter");
const membersRouter = require("./routes/members");
const contactsRouter = require("./routes/contacts");
const backofficeRouter = require("./routes/backoffice");

const organizationRouter = require("./routes/organization.js");


// documentation
const swaggerUi = require('swagger-ui-express');
const doc = ymal.load(fs.readFileSync('doc/documentation.yml', 'utf8'));


const newsRouter = require("./routes/news");
const commentsRouter=require("./routes/comments")


const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// express-session
const session = require("express-session");
app.use(
  session({
    secret: "It is a secret!",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/slides", slideRouter);
app.use("/register", register);
app.use("/auth/login", login);
app.use("/auth", authRouter);
app.use("/activities", activitiesRouter);

app.use('/organization',organizationRouter);


app.use('/news', newsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));

app.use("/organization", organizationRouter);
app.use("/members", membersRouter);
app.use("/contacts", contactsRouter)
app.use("/news", newsRouter);
app.use("/comments", commentsRouter);
app.use('/backoffice', backofficeRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;

module.exports = app;