const Router = require("express").Router();
const auth = require("../middleware/auth");
const config = require("../lib/config");
const axios = require("axios");
const { query, killConnection } = require("../services/database");

const { root: movieUrl, apiKey } = config.moviesAPI;

// Router.get("/", auth, (req, res) => {
//   res.json({
//     status: 200,
//     message: "user varified",
//     userId: req.user?.id
//   })
// } )

//topRatedMovies
Router.get("/top-rated", async (req, res) => {
	try {
		const page = req.query.page;
		console.log(page);
		const movies = await axios.get(
			`${movieUrl}/top_rated?api_key=${apiKey}&language=en-US&page=${
				page ? page : 1
			}`
		);
		if (movies.status === 200) {
			res.json({
				status: 200,
				data: movies.data.results,
			});
		} else {
			res.json({
				status: 500,
				message: " movies have not fetched",
			});
		}
		// console.log(movies);
	} catch (err) {
		console.log(err);
	}
});

//single movie route
Router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const movie = await axios.get(
			`${movieUrl}/${id}?api_key=${apiKey}&language=en-US`
		);
		const allRatings = await query(
			`select * from reviews where movieId='${id}'`
		);
		let avg = 0;
		if (allRatings.length !== 0) {
			const sum = allRatings?.reduce((total, obj) => {
				return Number(total) + Number(obj.rating);
			}, 0);
			avg = sum / allRatings.length;
		}

		if (movie.status === 200) {
			res.json({
				status: 200,
				data: { ...movie.data, ourRating: avg },
			});
		} else {
			res.json({
				status: 500,
				message: " movie has not fetched",
			});
		}
		// console.log(movie.data);
	} catch (err) {
		console.log(err);
	}
});

//post user rating
Router.post("/:id", auth, async (req, res) => {
	try {
		const movieId = req.params.id;
		const userId = req.user.id;
		const { rate, comment } = req.body;
		if (rate) {
			const serverReturn = await query(`
      insert into reviews (userId, rating , comment, movieId) values ('${userId}', '${rate}', '${comment}' , '${movieId}')
    `);

    if(serverReturn){
      res.json({
        status: 200,
        message: `movie ${movieId} is rated ${rate} by userID ${userId}`
      })
    } else {
      res.json({
        status: 500,
        message: "internal server error"
      })
    }
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = Router;
