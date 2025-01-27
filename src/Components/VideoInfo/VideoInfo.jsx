import React from "react";
import "./VideoInfo.css";

const VideoInfo = () => {
  return (
    <div className="video-info-container">
      {/* Background Star Field */}
      <div className="background-stars"></div>

      {/* Foreground Animated Content */}
      <div className="animated-text">
        <h1 className="main-title">Embark on the Journey</h1>
        <p className="subtitle">
          Explore the cosmos like never before. Your adventure to the stars
          begins here.
        </p>
      </div>

      {/* Shooting Stars Effect */}
      <div className="shooting-stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
    </div>
  );
};

export default VideoInfo;
