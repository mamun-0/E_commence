require("dotenv/config");
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log("Failed to connect. Try again", err);
  });
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
