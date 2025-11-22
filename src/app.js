const express = require("express");
const habitRoutes = require("./routes/habitRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use("/api/habits", habitRoutes);
app.use(errorHandler);

module.exports = app;
