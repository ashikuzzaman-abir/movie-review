const Router = require("express").Router();

Router.get("/",(req, res) => {
  res.json({
    status: 200,
    message: "user varified",
    userId: req.user?.id
  })
} )


module.exports = Router;