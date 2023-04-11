const Router = require("express").Router();
const auth = require("../middleware/auth");


// Router.get("/", auth, (req, res) => {
//   res.json({
//     status: 200,
//     message: "user varified",
//     userId: req.user?.id
//   })
// } )

Router.get("/", (req, res) => {
  
})


module.exports = Router;