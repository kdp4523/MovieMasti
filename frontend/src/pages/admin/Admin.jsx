import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "./style.scss";
import { MdMovieFilter } from "react-icons/md";
import Loader from "../../components/loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import useSWR from "swr";
import { BiCameraMovie } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const Admin = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminJwtToken");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const fetcher = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          "auth-token": adminToken,
        },
      });
      if (data?.status) {
        return data?.adminShows;
      } else {
        toast.error("Something went wrong!", toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    loading,
    data: showsData,
    mutate,
  } = useSWR(`${render}/api/shows/getadminshows`, fetcher);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, []);

  showsData?.sort(function (a, b) {
    // Concatenate date and time strings for comparison
    var datetimeA = new Date(a.showdate + "T" + a.showtime + "Z");
    var datetimeB = new Date(b.showdate + "T" + b.showtime + "Z");

    return datetimeA - datetimeB;
  });

  function convertTo12HourFormat(time24) {
    // Split the time string into hours and minutes
    var [hours, minutes] = time24.split(":");

    // Convert hours to integer
    hours = parseInt(hours);

    // Determine AM or PM
    var meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the time string in 12-hour format
    var time12 = hours + ":" + minutes + " " + meridiem;

    return time12;
  }

  const handleDelete = async (showId, movieId) => {
    try {
      const host = `${render}/api/shows/deleteshow/${movieId}/${showId}`;
      const { data } = await axios.delete(host);
      // console.log(data); // Removed for cleaner console output
      if (data?.status) {
        toast.success(data.msg, toastOptions);
        mutate();
      } else {
        toast.error(data.msg, toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminContainer">
      {!loading ? (
        <>
          {showsData?.length > 0 ? (
              <div className="wrapper">
                <h1>
                  MovieMasti <span>Admin</span>
                </h1>
                <ul className="showsContainer">
                  {showsData?.map((s, i) => {
                    // Safe string manipulation for theatre name
                    const upperCaseTheatre = s.theatreName && typeof s.theatreName === 'string' && s.theatreName.length > 0
                      ? s.theatreName[0].toUpperCase() + s.theatreName.slice(1)
                      : 'Unknown Theatre';

                    // Safe string manipulation for movie name  
                    const upperCaseMovie = s.movieName && typeof s.movieName === 'string' && s.movieName.length > 0
                      ? s.movieName[0].toUpperCase() + s.movieName.slice(1)
                      : 'Unknown Movie';

                    return (
                      <li key={i}>
                        <BiCameraMovie />
                        <div className="right">
                          <div>
                            <span>Movie:</span>
                            <p>{upperCaseMovie}</p>
                          </div>
                          <div>
                            <span>Theatre:</span>
                            <p>{upperCaseTheatre}</p>
                          </div>
                          <div>
                            <span>Showdate:</span>
                            <p>{dayjs(s?.showdate).format("MMM D, YYYY")}</p>
                          </div>
                          <div>
                            <span>Showtime:</span>
                            <p>{convertTo12HourFormat(s?.showtime)}</p>
                          </div>

                          <button
                            onClick={() => handleDelete(s.showId, s.movieId)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="noShowsContainer">
                <MdMovieFilter
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/admin/addshow");
                  }}
                />
                <h1>Create a MovieMasti Show</h1>
              </div>
            )}
          </>
        ) : (
          <div className="loadingContainer">
            <Loader />
          </div>
        )}
        <ToastContainer />
      </div>
  );
};

export default Admin;
