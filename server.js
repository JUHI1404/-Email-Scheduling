const express = require("express");
require("dotenv").config();
const router = require("./routes/router");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to Juhi's Email Scheduler!</h1>
    <p>Click <a href="/api/scheduled-emails">here</a> to access the API routes.</p>
  `);
});
app.listen(port, () => {
  console.log(`Server is running  on port ${port}`);
});