import React from "react";
import "./style.scss";
import { render } from ".././../host";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Cookies from "js-cookie";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
  closeOnClick: true,
};

const AdminMovies = ({ setEditMovie, movies, loading, onMovieDeleted }) => {
  const Show = ({ data, setEditMovie, onMovieDeleted }) => {
    // Safe destructuring with default values
    const { 
      movieName = '', 
      releaseDate = null, 
      media = '', 
      movieId = '' 
    } = data || {};
    
    const navigate = useNavigate();
    
    // Safe check for movieName before accessing array index
    let displayName;
    if (movieName && typeof movieName === 'string' && movieName.length > 0) {
      displayName = movieName[0].toUpperCase() + movieName.slice(1);
    } else {
      displayName = 'Unknown Movie';
    }
    
    // Safe date formatting
    const formattedDate = releaseDate ? dayjs(releaseDate).format("MMM D, YYYY") : 'No Date';

    const editEvent = (e) => {
      setEditMovie(movieId);
      e.stopPropagation();
    };

    const deleteMovie = async (e) => {
      e.stopPropagation();
      
      if (!movieId) {
        toast.error("Movie ID not found!", toastOptions);
        return;
      }

      // More descriptive confirmation dialog
      const confirmMessage = `⚠️ DELETE MOVIE ⚠️\n\nAre you sure you want to permanently delete "${displayName}"?\n\n⚠️ This will also remove:\n• All associated shows\n• All bookings for this movie\n• All user favorites\n\nThis action CANNOT be undone!`;
      
      if (window.confirm(confirmMessage)) {
        try {
          const adminToken = Cookies.get("adminJwtToken");
          
          if (!adminToken) {
            toast.error("Admin authentication required. Please login again.", toastOptions);
            return;
          }

          toast.info("Deleting movie...", toastOptions);
          
          const response = await axios.delete(`${render}/api/movie/deletemovie/${movieId}`, {
            headers: {
              "auth-token": adminToken,
            },
          });

          if (response.data.status) {
            toast.success(`✅ "${displayName}" deleted successfully!`, toastOptions);
            if (onMovieDeleted) {
              onMovieDeleted(movieId);
            }
          } else {
            toast.error(response.data.msg || "Failed to delete movie", toastOptions);
          }
        } catch (error) {
          console.error("Delete error:", error);
          if (error.response?.status === 401) {
            toast.error("❌ Admin authentication failed. Please login again.", toastOptions);
          } else if (error.response?.status === 404) {
            toast.error("❌ Movie not found. It may have been already deleted.", toastOptions);
          } else {
            toast.error("❌ Failed to delete movie. Please check your connection and try again.", toastOptions);
          }
        }
      }
    };

    return (
      <li
        onClick={() => navigate(`/showdetails/${movieId}`)}
        className="adminShow"
      >
        <div className="imageContainer">
          <div className="actionButtons">
            <div onClick={editEvent} className="edit" title="Edit Movie">
              <MdModeEditOutline />
            </div>
            <div onClick={deleteMovie} className="delete" title="Delete Movie">
              <MdDeleteOutline />
            </div>
            <div
              onClick={(e) => {
                setEditMovie("");
                e.stopPropagation();
              }}
              className="cancel"
              title="Cancel"
            >
              <RxCross1 />
            </div>
          </div>
          <img className="image" src={media || '/placeholder-movie.jpg'} alt={displayName} />
        </div>
        <div className="movieInfo">
          <div className="title">{displayName}</div>
          <div className="infoRow">
            <span className="label">Release Date:</span>
            <span className="value">{formattedDate}</span>
          </div>
          <div className="infoRow">
            <span className="label">Movie ID:</span>
            <span className="value">{movieId || 'N/A'}</span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <ul className="adminMoviesContainer">
          {movies?.map((i) => {
            return <Show setEditMovie={setEditMovie} onMovieDeleted={onMovieDeleted} key={i._id} data={i} />;
          })}
        </ul>
      )}
    </>
  );
};

export default AdminMovies;
