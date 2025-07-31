import React, { useEffect, useState } from "react";
import axios from "axios";
import { render } from "../../host";
import { toast } from "react-toastify";
import "./style.scss";
import Loader from "../../components/loader/Loader";
import { FaMasksTheater } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Theatres = ({ setTheatreEdit, theatres, loading }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const editEvent = (id) => {
    setTheatreEdit(id);
  };

  const Theatre = ({ data }) => {
    // Safe destructuring with default values
    const { 
      theatreId = '', 
      theatreName = '', 
      location = '' 
    } = data || {};
    
    // Safe check for theatreName before accessing array index
    let displayName;
    if (theatreName && typeof theatreName === 'string' && theatreName.length > 0) {
      displayName = theatreName[0].toUpperCase() + theatreName.slice(1);
    } else {
      displayName = 'Unknown Theatre';
    }
    
    return (
      <li className="theatre">
        <div className="left">
          <FaMasksTheater className="mask" />
        </div>

        <div className="right">
          <p>
            Theatre: <span>{displayName}</span>
          </p>
          <p>
            Location: <span>{location || 'Unknown Location'}</span>
          </p>
          <div className="row">
            <MdModeEditOutline
              className="edit"
              onClick={() => editEvent(theatreId)}
            />
            <RxCross1 className="cancel" onClick={() => editEvent("")} />
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
        <div className="theatresContainer">
          <h1 className="theatresTitle">
            Available Theatres
          </h1>
          <ul className="theatres">
            {theatres?.map((t) => (
              <Theatre data={t} key={t.theatreId || t._id} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Theatres;
