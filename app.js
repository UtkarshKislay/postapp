const express = require("express");
const mongoose = require("mongoose");
const ConnectDb = require("./db/connectDb");
const session = require("express-session");
require("./config/passport");
const passport = require("passport");
const auth = require("./routes/auth");
const web = require("./routes/web");
const http = require("http");
const socketIo = require("socket.io");
const MongoStore = require("connect-mongo")(session);
const app = express();
const port = 3000;
const userRoute = require("./routes/user");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs"); //setting template engine
const server = http.createServer(app);
const io = socketIo(server);
ConnectDb();

console.log(MongoStore);
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.io = io;
  next();
});
app.use("/auth", auth);
app.use("/", userRoute);
app.use("/", web); //seting routes
app.use("/*", (req, res) => {
  res.redirect("/");
});

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// server.listen(3000, () => {
//   console.log("App is litening at port 3000");
// });

app.listen(process.env.PORT||port,()=>{
  console.log(`process is running at ${port}`);
});
