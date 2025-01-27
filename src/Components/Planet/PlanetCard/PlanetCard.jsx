import React from "react";
import "./PlanetCard.css";
const PlanetCard = ({ title, iconUrl, isActive, onClick }) => {
  return (
    <div
      className={`planet-card ${isActive ? "active" : ""}`}
      onClick={() => onClick()}
    >
      <div className="planet-icon">
        <img src={iconUrl} alt="title" />
      </div>
      <span>{title}</span>
    </div>
  );
};

// const PlanetCard = ({ iconUrl, title, isActive, onClick }) => (
//   <div className={`planet-card ${isActive ? "active" : ""}`} onClick={onClick}>
//     <img src={iconUrl} alt={`${title} icon`} className="planet-card-icon" />
//     <h6 className="planet-card-title">{title}</h6>
//   </div>
// );

export default PlanetCard;
