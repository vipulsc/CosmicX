import React from "react";
import "./PlanetInfoCard.css";
import Planet from "../Planet";

const PlanetInfoCard = ({ heading, skills }) => {
  return (
    <div className="planet-info-card">
      <h6>{heading}</h6>

      <div className="planet-info-content">
        {skills.map((item, index) => (
          <React.Fragment key={`skill_${index}`}>
            <div className="planet-info">
              <p>{item.skill}</p>
              <p className="percentage">{item.percentage}</p>
            </div>

            <div className="skill-progress-bg">
              <div
                className="skill-progress"
                style={{ width: item.percentage }}
              ></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PlanetInfoCard;
