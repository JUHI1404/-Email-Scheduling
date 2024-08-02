const express = require("express");
require("dotenv").config();
const router = require("./routes/router");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);



app.listen(port, () => {
  console.log(`Server is running  on port ${port}`);
});