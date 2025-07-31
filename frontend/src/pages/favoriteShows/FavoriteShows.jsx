import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import { TbMovieOff } from "react-icons/tb";
import Loader from "../../components/loader/Loader";
import Show from "../../components/show/Show";
import axios from "axios";
import { render } from "../../host";

// Simple inline styles for favorites page
const styles = {
  favoritesContainer: {
    padding: '20px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: '20px'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: '15px',
    textAlign: 'center'
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  favorites: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
    listStyle: 'none',
    padding: 0
  },
  noShowsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: '15px',
    textAlign: 'center'
  }
};

const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  closeOnClick: true,
};

const FavoriteShows = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFavoriteMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const host = `${render}/api/favorite/getsavedmovies`;
      const jwtToken = Cookies.get("jwtToken");
      
      if (!jwtToken) {
        toast.error("Please login to view favorites", toastOptions);
        setLoading(false);
        return;
      }

      // Add timeout to prevent hanging
      const timeoutId = setTimeout(() => {
        setError("Request timed out. Please try again.");
        setLoading(false);
      }, 10000); // 10 second timeout

      const { data } = await axios.get(host, {
        headers: {
          "auth-token": jwtToken,
        },
        timeout: 8000, // 8 second axios timeout
      });

      clearTimeout(timeoutId);

      if (data?.status) {
        setMoviesData(data?.favoriteMoviesData || []);
      } else {
        setError(data?.msg || "Failed to load favorites");
        toast.error(data?.msg || "Failed to load favorites", toastOptions);
        
        // If it's a JWT authentication error, suggest re-login
        if (data?.errorType === "JWT_INVALID" || data?.msg?.includes("Session expired")) {
          setTimeout(() => {
            toast.info("Please login again to access your favorites", toastOptions);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Favorites loading error:", error);
      setError("Failed to load favorites. Please check your connection.");
      
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.", toastOptions);
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.", toastOptions);
      } else {
        toast.error("Failed to load favorites. Please try again.", toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  const handleRetry = () => {
    getFavoriteMovies();
  };

  return (
    <>
      <div style={styles.favoritesContainer}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <Loader />
            <p>Loading your favorite movies...</p>
          </div>
        ) : error ? (
          <div style={styles.errorContainer}>
            <TbMovieOff size={64} />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={handleRetry} style={styles.retryButton}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            {moviesData.length > 0 ? (
              <>
                <h1>
                  Saved <span style={{color: '#007bff'}}>Movies</span>
                </h1>
                <ul style={styles.favorites}>
                  {moviesData.map((m) => {
                    return <Show key={m.movieId || m._id} data={m} />;
                  })}
                </ul>
              </>
            ) : (
              <div style={styles.noShowsContainer}>
                <TbMovieOff size={64} />
                <h1>No saved movies</h1>
                <p>Start exploring and save your favorite movies!</p>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default FavoriteShows;
