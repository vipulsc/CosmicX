import React from "react";
import "./FeatureSummary.css";

const FeatureSummary = () => {
  return (
    <div className="feature-summary-container">
      <h2 className="feature-summary-title">
        🌌 Welcome to the CosmicX Universe 🌌
      </h2>
      <p className="feature-summary-intro">
        Embark on a journey beyond imagination, where technology meets the
        cosmos. Here are the mind-blowing features of our website:
      </p>
      <div className="feature-timeline">
        <div className="feature-timeline-item">
          <div className="feature-icon">🌍</div>
          <div className="feature-content">
            <h3 className="feature-heading">Planets Info</h3>
            <p className="feature-description">
              Explore every corner of the galaxy! With detailed visuals and
              AI-powered simulations, get unparalleled insights into every
              planet in our solar system and beyond.
            </p>
          </div>
        </div>
        <div className="feature-timeline-item">
          <div className="feature-icon">🛰️</div>
          <div className="feature-content">
            <h3 className="feature-heading">News</h3>
            <p className="feature-description">
              Stay updated with interstellar events, cosmic discoveries, and
              galactic breakthroughs. All the latest space news delivered at the
              speed of light!
            </p>
          </div>
        </div>
        <div className="feature-timeline-item">
          <div className="feature-icon">✨</div>
          <div className="feature-content">
            <h3 className="feature-heading">NebulaNotes</h3>
            <p className="feature-description">
              Unearth the secrets of the universe’s past. NebulaNotes takes you
              on a historical journey, connecting the dots between stars,
              nebulae, and the wonders of time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSummary;
