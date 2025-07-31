import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { HiOutlineUser, HiOutlineTicket, HiOutlineCog, HiOutlineHome } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import "./style.scss";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData && userData !== "undefined") {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const profileOptions = [
    {
      icon: HiOutlineHome,
      label: "Back to Home",
      action: () => navigate("/"),
      color: "#ffd700"
    },
    {
      icon: HiOutlineTicket,
      label: "My Bookings",
      action: () => navigate("/bookings"),
      color: "#ff6b35"
    },
    {
      icon: HiOutlineUser,
      label: "Edit Profile",
      action: () => navigate("/editprofile"),
      color: "#667eea"
    },
    {
      icon: FiLogOut,
      label: "Logout",
      action: handleLogout,
      color: "#ef4444"
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <IoPersonCircle />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">
              {user?.name || "MovieMasti User"}
            </h2>
            <p className="profile-email">
              {user?.email || "user@moviemasti.com"}
            </p>
            <div className="profile-badge">
              <span>🎬</span>
              <span>MovieMasti Member</span>
            </div>
          </div>
        </div>

        <div className="profile-options">
          {profileOptions.map((option, index) => (
            <div
              key={index}
              className="profile-option"
              onClick={option.action}
              style={{ '--option-color': option.color }}
            >
              <div className="option-icon">
                <option.icon />
              </div>
              <span className="option-label">{option.label}</span>
              <div className="option-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="profile-footer">
          <p className="footer-text">
            Welcome to MovieMasti - Your Ultimate Movie Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
