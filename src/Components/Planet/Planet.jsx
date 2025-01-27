import React, { useState } from "react";
import "./Planet.css";
import { PLANET } from "../../utils/data";
import PlanetCard from "./PlanetCard/PlanetCard";
import PlanetInfoCard from "./PlanetInfoCard/PlanetInfoCard";

const Planet = () => {
  const [selectSkill, setSelectedSkill] = useState(PLANET[0]);

  const handleSelectSkill = (data) => {
    setSelectedSkill(data);
  };
  return (
    <section className="planet-container">
      <h5>Solar System</h5>{" "}
      {/* Changed heading to represent the solar system */}
      <div className="planet-content">
        <div className="planet">
          {PLANET.map((item) => (
            <PlanetCard
              key={item.title}
              iconUrl={item.icon}
              title={item.title}
              isActive={selectSkill.title == item.title}
              onClick={() => {
                handleSelectSkill(item);
              }}
            />
          ))}
        </div>
        <div className="planet-info">
          <PlanetInfoCard
            heading={selectSkill.title}
            skills={selectSkill.skills}
          ></PlanetInfoCard>
        </div>
      </div>
    </section>
  );
};

export default Planet;
