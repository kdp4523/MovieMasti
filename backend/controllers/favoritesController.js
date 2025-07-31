const Favorite = require("../models/favoriteModel");
const Movie = require("../models/movieModel");

module.exports.saveMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const { email } = req.user.userDetails;
    const find = await Favorite.findOne({ movieId, userEmail: email });
    if (find) {
      return res.json({ status: false, msg: "Movie is already saved!" });
    }
    await Favorite.create({
      movieId,
      userEmail: email,
    });
    return res.json({ status: true, msg: "Movie saved successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.unsaveMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { email } = req.user.userDetails;

    await Favorite.deleteOne({
      movieId,
      userEmail: email,
    });
    return res.json({ status: true, msg: "Movie unsaved successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getSavedMovies = async (req, res) => {
  try {
    if (!req.user || !req.user.userDetails || !req.user.userDetails.email) {
      return res.json({ status: false, msg: "User authentication failed. Please login again." });
    }
    
    const { email } = req.user.userDetails;
    
    // Get all favorite movie IDs for this user
    const favMovies = await Favorite.find({ userEmail: email });
    
    if (!favMovies || favMovies.length === 0) {
      return res.json({ status: true, favoriteMoviesData: [] });
    }
    
    // Extract movieIds
    const movieIds = favMovies.map(fav => fav.movieId);
    
    // Get all movies in a single query using $in operator
    const favoriteMoviesData = await Movie.find({ 
      movieId: { $in: movieIds } 
    });

    // Clean up orphaned favorites (favorites pointing to deleted movies)
    if (favoriteMoviesData.length < movieIds.length) {
      const foundMovieIds = favoriteMoviesData.map(movie => movie.movieId);
      const orphanedIds = movieIds.filter(id => !foundMovieIds.includes(id));
      
      if (orphanedIds.length > 0) {
        await Favorite.deleteMany({ 
          userEmail: email,
          movieId: { $in: orphanedIds }
        });
      }
    }

    return res.json({ status: true, favoriteMoviesData });
  } catch (error) {
    console.error("Error in getSavedMovies:", error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};
