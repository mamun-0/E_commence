const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
//middlewares
app.use(express.json());
app.use(cors());
//routers
app.use("/api/user", userRouter);
module.exports = app;
