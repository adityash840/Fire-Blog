const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtube-blog").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
