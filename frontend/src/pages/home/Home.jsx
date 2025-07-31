import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import { HiOutlineSparkles, HiOutlineFire } from "react-icons/hi2";
import { IoPlay, IoArrowForward } from "react-icons/io5";
import "./style.scss";

const Home = () => {
  const { query, setQuery } = useContext(searchContext);
  const navigate = useNavigate();
  const { resData, error, loading } = useFetch(`/api/movie/getmovies`, { query });

  const featuredMovie = resData?.data?.movies?.[0];
  const isSearching = query && query.trim() !== "";

  const handleWatchMovie = () => {
    if (featuredMovie?.movieId) {
      navigate(`/showdetails/${featuredMovie.movieId}`);
    } else {
      navigate("/");
    }
  };

  const handleExploreMovies = () => {
    const moviesSection = document.querySelector('.movies-section');
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (setQuery) setQuery("");
  };

  return (
    <div className="masti-home-bg">
      <div className="masti-hero">
        <div className="masti-hero-glass">
          <div className="masti-hero-content">
            <div className="masti-logo-row">
              <span className="masti-logo-icon">🍿</span>
              <h1 className="masti-logo-title">MovieMasti</h1>
            </div>
            <h2 className="masti-hero-headline">
              Dive Into <span className="masti-gradient">Cinematic Magic</span>
            </h2>
            <p className="masti-hero-desc">
              Discover trending movies, book your seats, and experience the thrill of MovieMasti!<br/>
              <span className="masti-highlight">Your next adventure is just a click away.</span>
            </p>
            <div className="masti-hero-actions">
              <button className="masti-btn masti-btn-primary" onClick={handleExploreMovies}>
                <IoPlay /> Explore Movies
              </button>
              <button className="masti-btn masti-btn-secondary" onClick={handleWatchMovie}>
                <HiOutlineSparkles /> {featuredMovie ? `Book ${featuredMovie.movieName}` : 'Browse All Movies'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="masti-features">
        <div className="masti-feature-card">
          <span className="masti-feature-icon">🎬</span>
          <h3>Blockbuster Collection</h3>
          <p>Handpicked hits, classics, and new releases—always something for everyone.</p>
        </div>
        <div className="masti-feature-card">
          <span className="masti-feature-icon">💺</span>
          <h3>Seamless Booking</h3>
          <p>Book your favorite seats in seconds with our ultra-fast, intuitive system.</p>
        </div>
        <div className="masti-feature-card">
          <span className="masti-feature-icon">🍔</span>
          <h3>Snacks & More</h3>
          <p>Order snacks and drinks right from your seat for the ultimate movie night.</p>
        </div>
      </div>

      <div className="movies-section">
        <div className="masti-movies-header">
          <h2>
            <HiOutlineFire className="masti-movies-icon" />
            Trending <span className="masti-gradient">Movies</span>
          </h2>
          <button className="masti-btn masti-btn-link" onClick={handleExploreMovies}>
            View All <IoArrowForward />
          </button>
        </div>
        {loading ? (
          <div className="masti-loader-wrap"><Loader /></div>
        ) : (
          <div className="masti-movies-grid">
            {resData?.data?.movies && resData.data.movies.length > 0 ? (
              resData.data.movies.slice(0, 8).map((movie, idx) => (
                <div className="masti-movie-card" key={movie._id} style={{ '--delay': `${idx * 0.1}s` }}>
                  <img src={movie.poster} alt={movie.movieName} className="masti-movie-poster" />
                  <div className="masti-movie-info">
                    <h4>{movie.movieName}</h4>
                    <button className="masti-btn masti-btn-mini" onClick={() => navigate(`/showdetails/${movie.movieId}`)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="masti-no-movies">No movies found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
