import React from "react";
import "./style.scss";

const Genres = ({ data }) => {
  return (
    <div className="genres">
      {data?.map((g, i) => {
        // Safe string manipulation for genre
        const genre = g && typeof g === 'string' && g.length > 0
          ? g[0].toUpperCase() + g.slice(1)
          : 'Unknown Genre';
        return (
          <div key={i} className="genre">
            {genre}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
