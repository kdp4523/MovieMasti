import React, { useState } from "react";
import dayjs from "dayjs";
import { MdModeEditOutline, MdStar, MdPlayArrow } from "react-icons/md";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

const Show = ({ data }) => {
  let { movieName, name, releaseDate, media, movieId, genres, runtime, certification } = data;
  const navigate = useNavigate();
  
  // Handle both movieName and name fields from database
  const displayName = movieName || name || "Unknown Movie";
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <li onClick={() => navigate(`/showdetails/${movieId}`)} className="show">
      <div className="movie-card">
        <div className="imageContainer">
          <img className="image" src={media} alt={formattedName} />
          <div className="overlay">
            <div className="play-button">
              <MdPlayArrow />
            </div>
            <div className="movie-info">
              <div className="rating">
                <MdStar />
                <span>8.5</span>
              </div>
              <span className="certification">{certification}</span>
            </div>
          </div>
        </div>
        <div className="movie-details">
          <h3 className="name">{formattedName}</h3>
          <div className="meta-info">
            <p className="release-date">{dayjs(releaseDate).format("MMM D, YYYY")}</p>
            {runtime && <p className="runtime">{runtime} min</p>}
          </div>
          {genres && <p className="genres">{genres}</p>}
        </div>
      </div>
    </li>
  );
};

export default Show;
