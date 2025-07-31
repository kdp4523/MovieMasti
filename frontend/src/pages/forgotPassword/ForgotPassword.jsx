import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isGlowMode, setIsGlowMode] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.", toastOptions);
      return;
    }

    // For now, show a coming soon message since the backend doesn't have this functionality
    toast.info("Forgot Password feature is coming soon! Please contact admin for password reset.", toastOptions);
    
    // Optionally redirect to login after a delay
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="forgot-password-container">
      <div className="glowing-light"></div>
      
      <div className="forgot-password-box">
        <form onSubmit={handleSubmit}>
          <input 
            type="checkbox" 
            className="input-check" 
            id="input-check"
            checked={isGlowMode}
            onChange={(e) => setIsGlowMode(e.target.checked)}
          />
          <label htmlFor="input-check" className="toggle">
            <span className="text off">off</span>
            <span className="text on">on</span>
          </label>
          <div className="light"></div>

          <h2>
            <span className="brand-accent">Movie</span>Mowa
            <span className="subtitle">Forgot Password</span>
          </h2>
          
          <p className="forgot-description">
            Enter your email address and we'll help you reset your password.
          </p>
          
          <div className="input-box">
            <span className="icon">
              <i className="icon-mail"></i>
            </span>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <label>Email Address</label>
            <div className="input-line"></div>
          </div>
          
          <button type="submit">Reset Password</button>
          
          <div className="back-to-login">
            <p>Remember your password? <Link to="/login">Back to Login</Link></p>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
