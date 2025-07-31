import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Layout components
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Lazy load pages
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword/ForgotPassword"));
const Home = lazy(() => import("./pages/home/Home"));
const AddShow = lazy(() => import("./pages/addShow/AddShow"));
const SeatsPage = lazy(() => import("./pages/seatsPage/SeatsPage"));
const AdminLogin = lazy(() => import("./pages/login/AdminLogin"));
const MovieDetails = lazy(() => import("./pages/movieDetails/MovieDetails"));
const AddTheatre = lazy(() => import("./pages/addTheatre/AddTheatre"));
const MovieShows = lazy(() => import("./pages/movieShows/MovieShows"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const AddMovie = lazy(() => import("./pages/addMovie/AddMovie"));
const FavoriteShows = lazy(() => import("./pages/favoriteShows/FavoriteShows"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const AdminRegister = lazy(() => import("./pages/register/AdminRegister"));
const Bookings = lazy(() => import("./pages/bookings/Bookings"));
const EditUserDetails = lazy(() =>
  import("./pages/editUserDetails/EditUserDetails")
);
const ManageMovies = lazy(() => import("./pages/manageMovies/ManageMovies"));

import Loader from "./components/loader/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="loadingContainer">
            <Loader />
          </div>
        }
      >
        <Routes>
          {/* Auth pages - no layout */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          
          {/* User pages - with user layout */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          <Route path="/showdetails/:movieId" element={<UserLayout><MovieDetails /></UserLayout>} />
          <Route path="/movieshows/:movieName" element={<UserLayout><MovieShows /></UserLayout>} />
          <Route path="/seats/:theatreName/:showId" element={<UserLayout><SeatsPage /></UserLayout>} />
          <Route path="/savedmovies" element={<UserLayout><FavoriteShows /></UserLayout>} />
          <Route path="/editprofile" element={<UserLayout><EditUserDetails /></UserLayout>} />
          <Route path="/bookings" element={<UserLayout><Bookings /></UserLayout>} />
          <Route path="/profile" element={<UserLayout><Profile /></UserLayout>} />
          
          {/* Admin pages - with admin layout */}
          <Route path="/admin" element={<AdminLayout><Admin /></AdminLayout>} />
          <Route path="/admin/movies" element={<AdminLayout><ManageMovies /></AdminLayout>} />
          <Route path="/admin/addshow" element={<AdminLayout><AddShow /></AdminLayout>} />
          <Route path="/admin/addtheatre" element={<AdminLayout><AddTheatre /></AdminLayout>} />
          <Route path="/admin/addmovie" element={<AdminLayout><AddMovie /></AdminLayout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
