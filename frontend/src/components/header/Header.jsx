import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSearch, LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoSunny, IoMoon } from "react-icons/io5";
import { MdOutlineDarkMode, MdLogout } from "react-icons/md";
import { HiOutlineHome, HiOutlineTicket, HiOutlineSparkles } from "react-icons/hi2";
import { ThemeContext } from "../../context/themeContext";
import { searchContext } from "../../context/searchContext";
import Cookies from "js-cookie";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggle, theme } = useContext(ThemeContext);
  const { setQuery } = useContext(searchContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(searchInput);
      setSearchInput("");
      navigate("/");
      setSearch(false);
    }
  };
  
  const handleSearch = () => {
    setQuery(searchInput);
    setSearchInput("");
    navigate("/");
    setSearch(false);
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { icon: HiOutlineHome, label: "Home", action: () => { navigate("/"); setQuery(""); } },
    { icon: HiOutlineTicket, label: "Bookings", action: () => navigate("/bookings") },
    { icon: GrFavorite, label: "Favorites", action: () => navigate("/savedmovies") },
    { icon: CgProfile, label: "Profile", action: () => navigate("/profile") },
  ];

  return (
    <>
      <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <div 
            onClick={() => { navigate("/"); setQuery(""); }}
            className="logo-container"
          >
            <div className="logo-icon">
              <HiOutlineSparkles />
            </div>
            <h1 className="logo">
              <span className="logo-accent">Movie</span>Masti
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-items">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item" onClick={item.action}>
                  <item.icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Search and Actions */}
          <div className="header-actions">
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={handleEnter}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-btn">
                <LuSearch />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                onClick={toggle}
                className="action-btn theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <IoSunny /> : <IoMoon />}
              </button>
              
              <button 
                onClick={() => setSearch(!search)}
                className="action-btn mobile-search"
                aria-label="Search"
              >
                <LuSearch />
              </button>
              
              <button 
                onClick={handleLogout}
                className="action-btn logout-btn"
                aria-label="Logout"
              >
                <MdLogout />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenu(!menu)} 
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menu ? 'active' : ''}`}>
          <ul className="mobile-nav-items">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-nav-item" onClick={() => { item.action(); setMenu(false); }}>
                <item.icon className="mobile-nav-icon" />
                <span className="mobile-nav-label">{item.label}</span>
              </li>
            ))}
            <li className="mobile-nav-item" onClick={() => { toggle(); setMenu(false); }}>
              {theme === "dark" ? <IoSunny className="mobile-nav-icon" /> : <IoMoon className="mobile-nav-icon" />}
              <span className="mobile-nav-label">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </li>
            <li className="mobile-nav-item logout" onClick={() => { handleLogout(); setMenu(false); }}>
              <MdLogout className="mobile-nav-icon" />
              <span className="mobile-nav-label">Logout</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <div className={`mobile-search-overlay ${search ? 'active' : ''}`}>
        <div className="mobile-search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleEnter}
            className="mobile-search-input"
            autoFocus
          />
          <button onClick={handleSearch} className="mobile-search-btn">
            <LuSearch />
          </button>
          <button onClick={() => setSearch(false)} className="mobile-search-close">
            ✕
          </button>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {(menu || search) && <div className="backdrop" onClick={() => { setMenu(false); setSearch(false); }} />}
    </>
  );
};

export default Header;
