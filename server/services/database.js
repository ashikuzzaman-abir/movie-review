const mysql = require("mysql");

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "movie-review",
});

conn.connect((err) => {
	if (err) {
		return console.log("database connection error: ", err);
	}
	console.log("database succefully connected");
});

const query = (sql) => {
	return new Promise((resolve, reject) => {
		conn.query(sql, (err, results) => {
			if (err) {
				return reject(err);
			}
			return resolve(JSON.parse(JSON.stringify(results)));
		});
	});
};

const killConnection = () => {
	conn.end((err) => {
		if (err) {
			return console.log("Database End Connection error: ", err);
		}
		console.log("Database connection end succefully");
	});
};

module.exports = { query, killConnection };