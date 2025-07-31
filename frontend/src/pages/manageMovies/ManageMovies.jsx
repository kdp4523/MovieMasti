import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import AdminMovies from "../adminMovies/AdminMovies";
import { render } from "../../host";
import "./style.scss";

const ManageMovies = () => {
  const [editMovie, setEditMovie] = useState("");
  const adminToken = Cookies.get("adminJwtToken");

  const fetchMovies = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          "auth-token": adminToken,
        },
      });
      if (data.status) {
        return data.movies;
      }
      return [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const { data: movies, isLoading: loading, mutate } = useSWR(
    `${render}/api/movie/getmovies`,
    fetchMovies
  );

  const handleMovieDeleted = (deletedMovieId) => {
    // Refresh the movies list after deletion
    mutate();
    // Clear edit mode if we were editing the deleted movie
    if (editMovie === deletedMovieId) {
      setEditMovie("");
    }
  };

  return (
    <>
      <div className="manageMoviesContainer">
        <h1 className="pageTitle">
          Manage <span className="accent">Movies</span>
        </h1>
        <p className="pageDescription">
          View, edit, and delete movies from your cinema collection
        </p>
        
        {movies?.length > 0 ? (
          <AdminMovies
            movies={movies}
            loading={loading}
            setEditMovie={setEditMovie}
            onMovieDeleted={handleMovieDeleted}
          />
        ) : (
          <div className="noMoviesMessage">
            <h2>No Movies Found</h2>
            <p>Start by adding your first movie to the collection.</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ManageMovies;
