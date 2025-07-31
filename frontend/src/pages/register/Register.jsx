import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookie from "js-cookie";
import "./Register.scss";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { render } from "../../host";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = userData;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = userData;

    if (handleValidation()) {
      setIsLoading(true);
      try {
        const host = `${render}/api/auth/register`;
        const response = await axios.post(host, {
          name,
          password,
          email,
        });
        const { data } = response;

        if (data.status) {
          localStorage.setItem("user", JSON.stringify(data.userData));
          Cookie.set("jwtToken", data.jwtToken);
          setUserData({
            name: "",
            password: "",
            email: "",
            confirmPassword: "",
          });
          toast.success("Registration successful! Welcome to MovieMasti!", toastOptions);
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error(data.msg, toastOptions);
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.", toastOptions);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="register-card">
        <div className="card-header">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <h1>MovieMasti</h1>
          </div>
          <p className="subtitle">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="text" 
                name="name"
                value={userData.name}
                onChange={onChange}
                required 
                className="form-input"
                placeholder="Enter your username"
              />
              <span className="input-icon">👤</span>
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type="email" 
                name="email"
                value={userData.email}
                onChange={onChange}
                required 
                className="form-input"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
          
          <div className="form-group">
            <div className="input-wrapper">
              <input 
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={onChange}
                required 
                className="form-input"
                placeholder="Confirm your password"
              />
              <span className="input-icon">🔒</span>
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
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        
        <div className="card-footer">
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link">Sign In</Link>
          </p>
          <div className="divider">
            <span>or</span>
          </div>
          <Link to="/admin/register" className="admin-link">
            <span className="admin-icon">👑</span>
            Register as Admin
          </Link>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Register;
