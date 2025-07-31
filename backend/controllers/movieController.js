const Movie = require("../models/movieModel");
const { v4 } = require("uuid");

module.exports.addMovie = async (req, res, next) => {
  try {
    const {
      name,
      description,
      genres,
      releaseDate,
      runtime,
      certification,
      media,
      movieId,
    } = req.body;

    //check is movie is already added into db
    const lowerCaseName = name.toLowerCase();
    const movie = await Movie.findOne({ movieName: lowerCaseName });

    if (movie)
      return res.json({ status: false, msg: "Movie is already Saved:)" });

    if (!movie) {
      const movieData = {
        movieName: lowerCaseName,
        description,
        genres,
        releaseDate,
        runtime,
        certification,
        media,
        shows: [],
        theatres: [],
        movieId,
      };
      await Movie.create(movieData);

      return res.json({ status: true, msg: "Movie Saved successfully :)" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getMovies = async (req, res, next) => {
  try {
    const { query } = req.query || "";
    const movies = await Movie.find();
    let lowercaseQuery;
    if (query && query.length > 0) {
      lowercaseQuery = query.toLowerCase();
    } else {
      lowercaseQuery = "";
    }
    const filteredMovies = movies.filter((m) => {
      // Handle both movieName and name fields, and ensure the field exists
      const movieName = m.movieName || m.name || "";
      return movieName.toLowerCase().includes(lowercaseQuery);
    });
    return res.status(200).json({ status: true, movies: filteredMovies });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getMovieDetails = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findOne({ movieId });

    return res.json({ status: true, movie });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :)" });
  }
};

module.exports.editMovieDetails = async (req, res) => {
  try {
    const {
      name,
      description,
      genres,
      releaseDate,
      runtime,
      certification,
      media,
    } = req.body;

    const { movieId } = req.params;
    const findMovie = await Movie.findOne({ movieId });

    if (!findMovie) {
      return res.status(403).json({ status: false, msg: "Movie not found!" });
    }

    await Movie.updateOne(
      { movieId },
      {
        $set: {
          movieName: name,
          description,
          genres,
          releaseDate,
          runtime,
          certification,
          media,
          movieId,
        },
      }
    );

    return res.json({ status: true, msg: "Movie Updated successfully :)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const findMovie = await Movie.findOne({ movieId });
    
    if (!findMovie) {
      return res.status(404).json({ status: false, msg: "Movie not found!" });
    }

    await Movie.deleteOne({ movieId });
    
    return res.json({ status: true, msg: "Movie deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Failed to delete movie. Please try again." });
  }
};

module.exports.deleteAllMovies = async (req, res) => {
  try {
    // Get count of movies before deletion for confirmation
    const movieCount = await Movie.countDocuments();
    
    if (movieCount === 0) {
      return res.json({ status: false, msg: "No movies found to delete." });
    }

    // Delete all movies from the database
    const result = await Movie.deleteMany({});
    
    return res.json({ 
      status: true, 
      msg: `Successfully deleted ${result.deletedCount} movies from the database.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Failed to delete all movies. Please try again." });
  }
};
