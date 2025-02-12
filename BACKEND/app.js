const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-errors");
const createError = require("http-errors");
// require('express-async-errors');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const shopRouter = require("./app/routes/shop.route");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/shop", shopRouter);

app.use(
  "/api/shop/product/img/",
  express.static(path.join(__dirname, "app/store/img/product"))
);
app.use(
  "/api/shop/brand/img/",
  express.static(path.join(__dirname, "app/store/img/brand"))
);
app.use(
  "/api/shop/user/img/",
  express.static(path.join(__dirname, "app/store/img/user"))
);

// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to shop application" });
});

// app.js

module.exports = app;
