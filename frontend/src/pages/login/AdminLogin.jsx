import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "./AdminLogin.scss";
import axios from "axios";
import { render } from "../../host";

const AdminLogin = () => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleValidation = () => {
    const { email, password } = userData;
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (handleValidation()) {
      setIsLoading(true);
      try {
        const host = `${render}/api/auth/admin/login`;
        const response = await axios.post(host, {
          email,
          password,
          admin: true,
        });

        const { data } = response;

        if (data.status) {
          localStorage.setItem("user", JSON.stringify(data.userData));
          Cookie.set("adminJwtToken", data.jwtToken, { expires: 9 });
          setUserData({ password: "", email: "" });
          toast.success("Admin login successful! Welcome!", toastOptions);
          setTimeout(() => navigate("/admin"), 1000);
        } else {
          toast.error(data.msg, toastOptions);
        }
      } catch (error) {
        toast.error("Admin login failed. Please try again.", toastOptions);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="admin-login-card">
        <div className="card-header">
          <div className="logo">
            <span className="logo-icon">👑</span>
            <h1>MovieMasti Admin</h1>
          </div>
          <p className="subtitle">Admin Panel Access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="email" 
                name="email"
                value={userData.email}
                onChange={onChange}
                required 
                className="form-input"
                placeholder="Enter admin email"
              />
              <span className="input-icon">📧</span>
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type={showPass ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={onChange}
                required 
                className="form-input"
                placeholder="Enter admin password"
              />
              <span className="input-icon">🔒</span>
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          
          <div className="form-options">
            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={showPass}
                onChange={(e) => setShowPass(e.target.checked)}
                className="checkbox"
              />
              <span className="checkmark"></span>
              Show Password
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              "Admin Sign In"
            )}
          </button>
        </form>
        
        <div className="card-footer">
          <p className="register-text">
            Don't have an admin account? <Link to="/admin/register" className="register-link">Register Admin</Link>
          </p>
          <div className="divider">
            <span>or</span>
          </div>
          <Link to="/login" className="user-link">
            <span className="user-icon">👤</span>
            User Login
          </Link>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
