// MobileNav.js
import React from "react";
import "./MobileNav.css";
import { Link } from "react-router-dom";

const MobileNav = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`mobile-menu ${isOpen ? "active" : ""}`}
      onClick={toggleMenu}
    >
      <div className="mobile-menu-container">
        <Link to="/">
          <img className="logo" src="logo.png" alt="Logo" />
        </Link>
        <div className="mobile-h">
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <Link to="/">Home</Link>
            </li>
            <hr></hr>
            <li className="mobile-menu-item">
              <Link to="/about">Code Crew</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/report">Reports</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/faq">FAQ</Link>
            </li>

            <li className="mobile-menu-item">
              <Link to="/NebulaNotes" className="rocket-button">
                NebulaNotes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
