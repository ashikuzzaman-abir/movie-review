const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	const token = req.cookies.token;
	try {
		if (token) {
			const decoded = await jwt.verify(token, process.env.SECRET);
			if (decoded) {
				req.user = decoded;
				next();
			} else {
				res.json({
					status: 400,
					message: "invalid token",
				});
			}
		} else {
			res.json({
        status: 401,
        message: "Unauthorized"
      });
		}
	} catch (err) {
    console.log(err);
    res.json({
      status:400,
      message: err
    })
  }
};
