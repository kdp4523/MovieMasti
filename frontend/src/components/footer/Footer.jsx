import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-brand">
          <div className="footer-logo">
            <HiOutlineSparkles className="logo-icon" />
            <span className="brand-name">
              <span className="logo-accent">Movie</span>Mowa
            </span>
          </div>
          <p className="brand-tagline">
            "Where Every Story Comes Alive"
          </p>
        </div>

        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy Policy</li>
          <li className="menuItem">About Us</li>
          <li className="menuItem">Help Center</li>
          <li className="menuItem">Contact</li>
        </ul>
        
        <div className="infoText">
          Your gateway to extraordinary cinema experiences. From heart-pounding blockbusters 
          to intimate indie gems, MovieMowa brings you closer to the magic of storytelling. 
          <span className="highlight">Book smarter. Watch better. Live the story.</span>
        </div>
        
        <div className="footer-quotes">
          <p className="quote">
            "Cinema is a matter of what's in the frame and what's out" - Martin Scorsese
          </p>
        </div>
        
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 MovieMowa. All rights reserved. | Crafted with ❤️ for movie lovers worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
