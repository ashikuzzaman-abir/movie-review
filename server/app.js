require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const auth = require("./middleware/auth");



const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie");


const {query, killConnection} = require("./services/database.js")


const app = express();
const PORT= process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.get("/", async (req, res) => {
  res.send("Movie Review api working!")
})
app.use("/user", userRoute);
app.use("/movie", auth, movieRoute);



app.listen(PORT, () => {
  console.log(`server running @ ${PORT}`)
});