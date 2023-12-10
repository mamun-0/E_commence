const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
//middlewares
app.use(express.json());
app.use(cors());
//routers
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
// Error accepting middleware
app.use((err, req, res, next) => {
  return res.status(500).send("Something went wrong!");
});
module.exports = app;
