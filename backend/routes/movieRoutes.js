const router = require("express").Router();
const fetchUser = require("../middlewares/fetchUser");
const {
  addMovie,
  getMovies,
  getMovieDetails,
  editMovieDetails,
  deleteMovie,
  deleteAllMovies,
} = require("../controllers/movieController");
const fetchAdmin = require("../middlewares/fetchAdmin");

router.post("/addmovie", fetchAdmin, addMovie);
router.get("/getmoviedetails/:movieId", getMovieDetails);
router.get("/getmovies", getMovies);
router.put("/editmovie/:movieId", fetchAdmin, editMovieDetails);
router.delete("/deletemovie/:movieId", fetchAdmin, deleteMovie);
router.delete("/deleteallmovies", fetchAdmin, deleteAllMovies);

module.exports = router;
