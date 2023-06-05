const express = require("express");
const app = express();
const ConnectDb = require("./db/connectDb");
ConnectDb();
const web = require("./routes/web");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs"); //setting template engine
app.use("/", web); //seting routes



app.listen(3000, () => {
  console.log("App is litening at port 3000");
});
