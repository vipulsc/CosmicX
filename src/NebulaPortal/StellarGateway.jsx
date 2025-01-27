import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./StellarGateway.css";

const StellarGateway = () => {
  const [showGalaxy, setShowGalaxy] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [message, setMessage] = useState("");
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [planetSuggestion, setPlanetSuggestion] = useState("");
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const planets = [
    {
      id: 1,
      name: "Mercury",
      fact: "Closest planet to the Sun. It's so hot, even the Sun gets jealous!",
    },
    {
      id: 2,
      name: "Venus",
      fact: "The hottest planet in the solar system. Not a place to visit unless you like being roasted.",
    },
    {
      id: 3,
      name: "Earth",
      fact: "The only planet known to support life. It's the only one with pizza!",
    },
    {
      id: 4,
      name: "Mars",
      fact: "Known as the Red Planet. It might be a desert, but it has the best sunsets.",
    },
    {
      id: 5,
      name: "Jupiter",
      fact: "The largest planet in the solar system. It's so big, you could fit 1,300 Earths inside!",
    },
    {
      id: 6,
      name: "Saturn",
      fact: "Famous for its beautiful rings. It's like the planet went shopping and bought the best accessory.",
    },
    {
      id: 7,
      name: "Uranus",
      fact: "It rotates on its side. A true trendsetter, making all the other planets look boring.",
    },
    {
      id: 8,
      name: "Neptune",
      fact: "The farthest planet from the Sun. It's so far, even the Sun has to squint to see it.",
    },
  ];

  const stars = [
    {
      id: 1,
      name: "Sun",
      fact: "The center of our solar system. It's a massive ball of burning gas.",
    },
    {
      id: 2,
      name: "Moon",
      fact: "Earth's only natural satellite. It controls the tides and provides a beautiful night view.",
    },
  ];

  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet);
    setMessage(`🌌 ${planet.name}: ${planet.fact}`);
  };

  const handleStarHover = (star) => {
    setHoveredPlanet(star);
    setMessage(`⭐ ${star.name}: ${star.fact}`);
  };

  const handleExploreClick = () => {
    setShowGalaxy(true);
  };

  const handleExitClick = () => {
    setShowGalaxy(false);
    setHoveredPlanet(null);
    setMessage("");
  };

  return (
    <div className="stellar-gateway-container">
      <div className="stellar-background">
        {[...Array(200)].map((_, index) => (
          <motion.div
            key={index}
            className="stellar-star"
            initial={{
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
              x: Math.random() * 2000 - 1000,
              y: Math.random() * 2000 - 1000,
            }}
            animate={{
              opacity: Math.random(),
              scale: Math.random() * 1.5,
              x: Math.random() * 2000 - 1000,
              y: Math.random() * 2000 - 1000,
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="stellar-title"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <span className="stellar-neon-text">Stellar Gateway</span>
      </motion.h1>

      {!showGalaxy && (
        <motion.div
          className="stellar-interaction-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="stellar-prompt">
            Unleash the cosmos! Hover over planets or dive into the galaxy.
          </p>
          <motion.button
            className="stellar-explore-button"
            whileHover={{ scale: 1.3, boxShadow: "0 0 25px #00ff77" }}
            onClick={handleExploreClick}
          >
            Enter the Gateway
          </motion.button>
        </motion.div>
      )}

      {showGalaxy && (
        <motion.div
          className="stellar-galaxy-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="stellar-galaxy-title">Explore the Planets & Stars</h2>
          <div className="stellar-planet-grid">
            {planets.map((planet) => (
              <Link
                to={`/${planet.name}`}
                key={planet.id}
                className="stellar-planet-link"
              >
                <motion.div
                  className="stellar-planet-card"
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 30px #00ff77",
                  }}
                  onMouseEnter={() => handlePlanetHover(planet)}
                >
                  {planet.name}
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="stellar-star-grid">
            {stars.map((star) => (
              <Link
                to={`/${star.name}`}
                key={star.id}
                className="stellar-star-link"
              >
                <motion.div
                  className="stellar-star-card"
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 30px #00ff77",
                  }}
                  onMouseEnter={() => handleStarHover(star)}
                >
                  {star.name}
                </motion.div>
              </Link>
            ))}
          </div>
          {hoveredPlanet && (
            <motion.div
              className="stellar-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.div>
          )}
          <motion.button
            className="stellar-exit-button"
            whileHover={{ scale: 1.2, boxShadow: "0 0 25px #ff6347" }}
            onClick={handleExitClick}
          >
            Exit the Gateway
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default StellarGateway;
