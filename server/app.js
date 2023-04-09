require("dotenv").config();
const express = require("express");


const {query, killConnection} = require("./services/database.js")

const app = express();
const PORT= process.env.PORT || 5000;

app.get("/", async (req, res) => {
  const data = await query("select * from user");
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`server running @ ${PORT}`)
});