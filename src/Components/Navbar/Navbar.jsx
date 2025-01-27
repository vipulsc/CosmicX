import React, { useState } from "react";
import "./Navbar.css";
import MobileNav from "./MobileNav/MobileNav.jsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 100 + "%";
      const y = Math.random() * 100 + "%";
      const size = Math.random() * 2 + "px";
      const delay = Math.random() * 5 + "s";

      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: y,
            left: x,
            width: size,
            height: size,
            animationDelay: delay,
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu}></MobileNav>
      <div className="nav-wrapper">
        <div className="stars">{generateStars()}</div>
        <nav className="nav-content">
          {/* <p className="logo">Logo</p> */}
          <Link to="/">
            <img className="logo" src="logo.png" alt="Logo" />
          </Link>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="/about">Code Crew</Link>
            </li>
            <hr></hr>
            <li>
              <Link to="/report">🚀 Reports</Link>
            </li>
            <Link to="/NebulaNotes" className="rocket-button">
              NebulaNotes
            </Link>
          </ul>

          <button className="menu-btn" onClick={toggleMenu}>
            <span className={"material-symbols-outlined"}>
              {openMenu ? "close" : "menu"}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

// my code
