require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blog");
const { checkCookieAuth } = require("./middleware/auth");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkCookieAuth("token"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", { allBlogs, user: req.user });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
