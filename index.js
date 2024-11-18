const express = require("express");
const app = express();
const port = 3000;
const connectDb = require("./db");
const router = require("./routes");

connectDb();
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`server listen to ${port}`);
});
