const express = require("express");
const mongoose = require("mongoose");
const ConnectDb = require("./db/connectDb");
const session=require('express-session');
require('./config/passport');
const passport = require("passport");
const auth=require('./routes/auth');
const web = require("./routes/web");
const MongoStore=require('connect-mongo')(session);
const app = express();

app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs"); //setting template engine
ConnectDb();

console.log(MongoStore)
app.use(
  session({
  secret:'mysecretkey',
  resave: false,
  saveUninitialized: true,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", web); //seting routes
app.use("/auth",auth);


app.listen(3000, () => {
  console.log("App is litening at port 3000");
});
