require("dotenv").config();
const express = require("express");


const app = express();
const PORT= process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello I'm fahim ")
})

app.listen(PORT, () => {
  console.log(`server running @ ${PORT}`)
});