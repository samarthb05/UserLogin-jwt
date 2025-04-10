const express = require("express");
const connectDb = require("./src/db");
const router = require("./src/authRoutes");

const app = express();
const port = 3000;

connectDb();
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`server listen to ${port}`);
});
