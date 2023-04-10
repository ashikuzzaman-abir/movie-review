const Router = require("express").Router();
const { query, killConnection } = require("../services/database.js");
const jwt = require("jsonwebtoken");


Router.get("/", (req, res) => {
  res.send("user route working!")
})

Router.post("/register", async(req, res) => {
  const {firstName, lastName, userName, email, password} = req.body
  try {
    if (firstName && lastName && userName && email && password) {
			const serverReturn = await query(
				`insert into user (firstName, lastName, userName, email, password) values ('${firstName}', '${lastName}', '${userName}', '${email}', '${password}')`
			);
			if (serverReturn) {
        res.status(301).json({
          status: 301,
          message: "user created"
        })
			}
		}
  } catch (err) {
    if (err) {
      console.log(err)
      res.json({
        status: 400,
        message: err.message
      })
    }
  }
})
Router.post("/login", async(req, res) => {
  const {userName, password} = req.body;
  try{
    const serverReturn = await query(`select * from user where userName='${userName}'`);
    if(serverReturn.length > 0){
      if(serverReturn[0].password === password){
        const token = jwt.sign({id: serverReturn[0].ID,userName: serverReturn[0].userName, name: `${serverReturn[0].firstName} ${serverReturn[0].lastName}`}, process.env.SECRET, {
          expiresIn: "24hr"
        })
        res.cookie("token", token).json({
					status: 200,
					token: token,
          message: "user Loged in",
					user: {
						id: serverReturn[0].ID,
						userName: serverReturn[0].userName,
						name: `${serverReturn[0].firstName} ${serverReturn[0].lastName}`
					},
				});
      } else {
        res.json({
					status: 400,
					message: "invalid username or password",
				});
      }
    } else {
      res.json({
        status: 400,
        message: "invalid username or password"
      })
    }

  } catch (err){
    if (err) {
      res.status(400).json({
        status: 400,
        message: err.message
      })
    }
  }
})
Router.get("/logout", (req, res) => {
  res.clearCookie("token").json({
    status: 200,
    message: "User Logout"
  })
})



module.exports = Router;